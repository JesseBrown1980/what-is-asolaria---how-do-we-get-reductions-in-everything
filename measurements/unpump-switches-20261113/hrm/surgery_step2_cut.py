# surgery_step2_cut.py - step 2 of the HRM surgery: one direction edit on the output head.
# The output head has no bias, so a constant on/off shift is written as an edit of ONE ROW (32 weights):
#   row_off += s * mu / (mu.mu),  mu = mean hidden vector on the TRAINING mazes.
# Order enforced here: choose s on training mazes only -> write the prediction file -> only then read the held-out score.
import os, sys, random, types, hashlib, math
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
X = torch.tensor([d[0] for d in data[:2048]]); Y = torch.tensor([d[1] for d in data[:2048]])
XT = torch.tensor([d[0] for d in data[2048:]]); YT = torch.tensor([d[1] for d in data[2048:]])
CFG = {"batch_size": 64, "seq_len": 25, "puzzle_emb_ndim": 0, "num_puzzle_identifiers": 1, "vocab_size": 10,
       "H_cycles": 1, "L_cycles": 1, "H_layers": 1, "L_layers": 1, "hidden_size": 32, "expansion": 2, "num_heads": 4,
       "pos_encodings": "learned", "halt_max_steps": 1, "halt_exploration_prob": 0.0, "forward_dtype": "float32"}
SRC = os.path.join(OUT, "hrm-tiny-maze-v28.pt")
model = HierarchicalReasoningModel_ACTV1(CFG); model.load_state_dict(torch.load(SRC)); model.eval()


def hidden(xs):
    """the hidden vectors that enter the output head, for every cell"""
    grabbed = []
    h = model.inner.lm_head.register_forward_pre_hook(lambda mod, inp: grabbed.append(inp[0].detach().to(torch.float64)))
    with torch.no_grad():
        for i in range(0, len(xs), 64):
            xb = xs[i:i + 64]
            b = {"inputs": xb, "labels": torch.zeros_like(xb), "puzzle_identifiers": torch.zeros((64,), dtype=torch.int64)}
            model(model.initial_carry(b), b)
    h.remove()
    return torch.cat(grabbed)[:, -25:, :]


W = model.inner.lm_head.weight.detach().to(torch.float64).clone()


def score(Z, labels, Wm):
    pred = (Z @ Wm.T).argmax(-1)
    return int((pred == labels).all(1).sum()), int((pred == labels).sum())


ZTR = hidden(X)
mu = ZTR.reshape(-1, 32).mean(0); mm = float(mu @ mu)
proj = (ZTR.reshape(-1, 32) @ mu) / mm                  # how constant is the direction across cells
print("STEP2HDR|edit=row_6_(off-path)_of_inner.lm_head.weight_plus_s*mu/(mu.mu)|weights_touched=32_of_58850|mu_norm_milli=%d|projection_mean_milli=%d|projection_std_milli=%d|json=0"
      % (int(1000 * math.sqrt(mm)), int(1000 * float(proj.mean())), int(1000 * float(proj.std()))), flush=True)
base_tr = score(ZTR, Y, W)
grid = [k / 4 for k in range(-12, 13)]
best = None; rows = []
for s in grid:
    Wm = W.clone(); Wm[6] += s * mu / mm
    ex, tok = score(ZTR, Y, Wm); rows.append((s, ex, tok))
    if best is None or (ex, tok, -abs(s)) > (best[1], best[2], -abs(best[0])):
        best = (s, ex, tok)
print("TRAINSWEEP|" + "|".join("%+.2f:%d" % (s, ex) for s, ex, _t in rows) + "|json=0", flush=True)
s_star, ex_star, tok_star = best
gain_tr = ex_star - base_tr[0]
pred_test = 489 + round(gain_tr * 512 / 2048)
spec = ("SPECSTEP2|written_before_any_held-out_read=1|chosen_on=training_mazes_only|s=%+.2f|train_exact_before=%d|train_exact_after=%d|train_gain=%d"
        "|predicted_test_exact=%d|band=plus_or_minus_4|seat_expectation_written_in_the_office_before_the_run=test_exact_between_487_and_495|json=0\n"
        % (s_star, base_tr[0], ex_star, gain_tr, pred_test))
open(os.path.join(OUT, "SPEC-SURGERY-STEP2.hbp"), "w", newline="\n").write(spec)
print(spec.strip(), flush=True)
print("SPECSHA|sha256=%s|json=0" % hashlib.sha256(spec.encode()).hexdigest(), flush=True)
# ---- only now the held-out mazes ----
ZTE = hidden(XT)
b_te = score(ZTE, YT, W)
We = W.clone(); We[6] += s_star * mu / mm
a_te = score(ZTE, YT, We)
pb = (ZTE @ W.T).argmax(-1); pa = (ZTE @ We.T).argmax(-1)
okb = (pb == YT).all(1); oka = (pa == YT).all(1)
print("HELDOUT|before_exact=%d_of_512|after_exact=%d_of_512|before_cells=%d|after_cells=%d|fixed=%d|broken=%d|json=0"
      % (b_te[0], a_te[0], b_te[1], a_te[1], int((~okb & oka).sum()), int((okb & ~oka).sum())), flush=True)
# save the edited checkpoint (float32, as the model runs) and the exact-integer record of the 32 changed weights
sd = torch.load(SRC); old = sd["inner.lm_head.weight"].clone()
sd["inner.lm_head.weight"][6] = We[6].to(torch.float32)
dst = os.path.join(OUT, "hrm-tiny-maze-v28-edit1.pt"); torch.save(sd, dst)
m2 = HierarchicalReasoningModel_ACTV1(CFG); m2.load_state_dict(torch.load(dst)); m2.eval()
with torch.no_grad():
    outs = []
    for i in range(0, 512, 64):
        xb = XT[i:i + 64]
        b = {"inputs": xb, "labels": torch.zeros_like(xb), "puzzle_identifiers": torch.zeros((64,), dtype=torch.int64)}
        _c, o = m2(m2.initial_carry(b), b); outs.append(o["logits"].argmax(-1))
pm = torch.cat(outs)
print("EDITEDCKPT|file=hrm-tiny-maze-v28-edit1.pt|sha256=%s|run_through_the_model_exact=%d_of_512|changed_weights=%d|json=0"
      % (hashlib.sha256(open(dst, "rb").read()).hexdigest(), int((pm == YT).all(1).sum()),
         int((sd["inner.lm_head.weight"] != old).sum())), flush=True)


def exact(v):
    if v == 0:
        return "0:0"
    fr, ex = math.frexp(v); m = int(fr * (1 << 53)); e = ex - 53
    while m % 2 == 0:
        m //= 2; e += 1
    return "%d:%d" % (m, e)


with open(os.path.join(OUT, "hrm-tiny-maze-v28-edit1.patch.hbp"), "w", newline="\n") as f:
    f.write("PATCHHDR|base_sha256=%s|tensor=inner.lm_head.weight|row=6|cells=32|form=mantissa:exponent_exact|json=0\n"
            % hashlib.sha256(open(SRC, "rb").read()).hexdigest())
    for j in range(32):
        f.write("PATCH|col=%d|before=%s|after=%s|json=0\n" % (j, exact(float(old[6][j])), exact(float(sd["inner.lm_head.weight"][6][j]))))
print("PATCHFILE|file=hrm-tiny-maze-v28-edit1.patch.hbp|rows=32|json=0", flush=True)
