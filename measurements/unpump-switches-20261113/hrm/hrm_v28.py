# hrm_v28.py - tiny HRM on held-out 5x5 mazes; saves the first HRM checkpoint. See SPEC-HRM-V28.hbp (sealed first).
import os, sys, random, types, hashlib, time, math
from collections import deque
os.environ.setdefault("WANDB_MODE", "disabled"); os.environ.setdefault("CUDA_VISIBLE_DEVICES", "")
sys.path.insert(0, r"D:\Asolaria-HRM")
import torch, torch.nn.functional as F
OUT = r"D:/asolaria-unpump-20261113/hrm"


def shim():
    def flash_attn_func(q, k, v, causal=False):
        return F.scaled_dot_product_attention(q.transpose(1, 2), k.transpose(1, 2), v.transpose(1, 2),
                                              is_causal=causal).transpose(1, 2).contiguous()
    for n in ("flash_attn_interface", "flash_attn"):
        m = types.ModuleType(n); m.flash_attn_func = flash_attn_func; sys.modules[n] = m


shim()
from models.hrm.hrm_act_v1 import HierarchicalReasoningModel_ACTV1
CH = {"S": 1, ".": 2, "#": 3, "G": 4}
STEPS4 = ((1, 0), (-1, 0), (0, 1), (0, -1))


def solve(g):
    dist = {(0, 0): 0}; ways = {(0, 0): 1}; q = deque([(0, 0)])
    while q:
        r, c = q.popleft()
        for dr, dc in STEPS4:
            a, b = r + dr, c + dc
            if 0 <= a < 5 and 0 <= b < 5 and g[a][b] != "#":
                if (a, b) not in dist:
                    dist[(a, b)] = dist[(r, c)] + 1; ways[(a, b)] = ways[(r, c)]; q.append((a, b))
                elif dist[(a, b)] == dist[(r, c)] + 1:
                    ways[(a, b)] += ways[(r, c)]
    if (4, 4) not in dist or ways[(4, 4)] != 1:
        return None
    path = {(4, 4)}; cur = (4, 4)
    while cur != (0, 0):
        r, c = cur
        for dr, dc in STEPS4:
            p = (r + dr, c + dc)
            if p in dist and dist[p] == dist[cur] - 1:
                cur = p; path.add(p); break
    return path


rng = random.Random(28001); seen = set(); data = []
while len(data) < 2560:
    g = [["#" if rng.random() < 0.3 else "." for _ in range(5)] for _ in range(5)]; g[0][0] = "S"; g[4][4] = "G"
    key = "".join("".join(r) for r in g)
    if key in seen:
        continue
    p = solve(g)
    if p is None:
        continue
    seen.add(key)
    data.append(([CH[x] for r in g for x in r], [5 if (i // 5, i % 5) in p else 6 for i in range(25)]))
train, test = data[:2048], data[2048:]
X = torch.tensor([d[0] for d in train]); Y = torch.tensor([d[1] for d in train])
XT = torch.tensor([d[0] for d in test]); YT = torch.tensor([d[1] for d in test])
CFG = {"batch_size": 64, "seq_len": 25, "puzzle_emb_ndim": 0, "num_puzzle_identifiers": 1, "vocab_size": 10,
       "H_cycles": 1, "L_cycles": 1, "H_layers": 1, "L_layers": 1, "hidden_size": 32, "expansion": 2, "num_heads": 4,
       "pos_encodings": "learned", "halt_max_steps": 1, "halt_exploration_prob": 0.0, "forward_dtype": "float32"}


def predict(model, xs):
    model.eval(); out = []
    with torch.no_grad():
        for i in range(0, len(xs), 64):
            xb = xs[i:i + 64]
            if len(xb) < 64:
                xb = torch.cat([xb, xs[:64 - len(xb)]])
            b = {"inputs": xb, "labels": torch.zeros_like(xb), "puzzle_identifiers": torch.zeros((64,), dtype=torch.int64)}
            _c, o = model(model.initial_carry(b), b); out.append(o["logits"].argmax(-1))
    return torch.cat(out)[:len(xs)]


def run(labels, steps=3000):
    torch.manual_seed(1337); random.seed(1337); torch.set_num_threads(2)
    model = HierarchicalReasoningModel_ACTV1(CFG); opt = torch.optim.AdamW(model.parameters(), lr=1e-2)
    g = torch.Generator().manual_seed(1337); t0 = time.time(); loss = None
    for _step in range(steps):
        idx = torch.randint(0, len(X), (64,), generator=g)
        b = {"inputs": X[idx], "labels": labels[idx], "puzzle_identifiers": torch.zeros((64,), dtype=torch.int64)}
        model.train(); opt.zero_grad(set_to_none=True)
        _c, o = model(model.initial_carry(b), b)
        loss = F.cross_entropy(o["logits"].reshape(-1, 10), labels[idx].reshape(-1)); loss.backward(); opt.step()
    pt = predict(model, XT); ptr = predict(model, X)
    res = dict(loss_last_milli=int(loss.item() * 1000), secs=int(time.time() - t0),
               train_tok=int((ptr == Y).sum()), train_exact=int((ptr == Y).all(1).sum()),
               test_tok=int((pt == YT).sum()), test_exact=int((pt == YT).all(1).sum()))
    return model, pt, res


base_tok = int((YT == 6).sum())
nparam = sum(p.numel() for p in HierarchicalReasoningModel_ACTV1(CFG).parameters())
print("HRMV28HDR|train=%d|test=%d|params=%d|test_cells=%d|baseline_off_path_correct=%d|json=0"
      % (len(train), len(test), nparam, YT.numel(), base_tok), flush=True)
model, pt, r = run(Y)
print("HRMV28|arm=real|loss_last_milli=%d|seconds=%d|train_cells_correct=%d_of_%d|train_exact=%d_of_2048|test_cells_correct=%d_of_%d|test_exact=%d_of_512|json=0"
      % (r["loss_last_milli"], r["secs"], r["train_tok"], Y.numel(), r["train_exact"], r["test_tok"], YT.numel(), r["test_exact"]), flush=True)
ck = os.path.join(OUT, "hrm-tiny-maze-v28.pt"); torch.save(model.state_dict(), ck)
m2 = HierarchicalReasoningModel_ACTV1(CFG); m2.load_state_dict(torch.load(ck)); pt2 = predict(m2, XT)
print("HRMV28CKPT|file=%s|bytes=%d|sha256=%s|reloaded_predictions_equal=%d|json=0"
      % (ck, os.path.getsize(ck), hashlib.sha256(open(ck, "rb").read()).hexdigest(), int(torch.equal(pt, pt2))), flush=True)
# exact integer export: every float32 as mantissa:exponent, value = mantissa * 2^exponent exactly
tot = 0; nan = 0
with open(os.path.join(OUT, "hrm-tiny-maze-v28.exact-int.hbp"), "w", newline="\n") as f:
    for name, t in model.state_dict().items():
        vals = t.detach().to(torch.float64).flatten().tolist(); cells = []
        for v in vals:
            tot += 1
            if v != v or v in (float("inf"), float("-inf")):
                nan += 1; cells.append("NAN"); continue
            if v == 0:
                cells.append("0:0"); continue
            fr, ex = math.frexp(v); m = int(fr * (1 << 53)); e = ex - 53
            while m % 2 == 0:
                m //= 2; e += 1
            cells.append("%d:%d" % (m, e))
        f.write("W|name=%s|shape=%s|n=%d|v=%s|json=0\n" % (name, "x".join(map(str, t.shape)) or "1", len(vals), ",".join(cells)))
print("HRMV28EXACT|values=%d|not_a_number=%d|file=hrm-tiny-maze-v28.exact-int.hbp|json=0" % (tot, nan), flush=True)
perm = torch.randperm(len(Y), generator=torch.Generator().manual_seed(99))
_m, _p, rs = run(Y[perm])
print("HRMV28|arm=shuffled_labels|test_cells_correct=%d_of_%d|test_exact=%d_of_512|json=0"
      % (rs["test_tok"], YT.numel(), rs["test_exact"]), flush=True)
