# surgery_step1_read.py - step 1 of the HRM surgery: read the held-out failures of hrm-tiny-maze-v28.pt.
# Read-only on the checkpoint. Regenerates the same mazes (seed 28001) and compares failed with solved.
import os, sys, random, types
from collections import deque, Counter
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


def bfs(g):
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
    return dist, ways


def solve(g):
    dist, ways = bfs(g)
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


rng = random.Random(28001); seen = set(); data = []; grids = []
while len(data) < 2560:
    g = [["#" if rng.random() < 0.3 else "." for _ in range(5)] for _ in range(5)]; g[0][0] = "S"; g[4][4] = "G"
    key = "".join("".join(r) for r in g)
    if key in seen:
        continue
    p = solve(g)
    if p is None:
        continue
    seen.add(key)
    data.append(([CH[x] for r in g for x in r], [5 if (i // 5, i % 5) in p else 6 for i in range(25)])); grids.append((g, p))
test = data[2048:]; tg = grids[2048:]; trg = grids[:2048]
XT = torch.tensor([d[0] for d in test]); YT = torch.tensor([d[1] for d in test])
CFG = {"batch_size": 64, "seq_len": 25, "puzzle_emb_ndim": 0, "num_puzzle_identifiers": 1, "vocab_size": 10,
       "H_cycles": 1, "L_cycles": 1, "H_layers": 1, "L_layers": 1, "hidden_size": 32, "expansion": 2, "num_heads": 4,
       "pos_encodings": "learned", "halt_max_steps": 1, "halt_exploration_prob": 0.0, "forward_dtype": "float32"}
model = HierarchicalReasoningModel_ACTV1(CFG); model.load_state_dict(torch.load(os.path.join(OUT, "hrm-tiny-maze-v28.pt"))); model.eval()
preds = []; margins = []
with torch.no_grad():
    for i in range(0, 512, 64):
        xb = XT[i:i + 64]
        b = {"inputs": xb, "labels": torch.zeros_like(xb), "puzzle_identifiers": torch.zeros((64,), dtype=torch.int64)}
        _c, o = model(model.initial_carry(b), b); lg = o["logits"]
        preds.append(lg.argmax(-1)); margins.append((lg[..., 5] - lg[..., 6]))
P = torch.cat(preds); M = torch.cat(margins)
ok = (P == YT).all(1)
fail = [i for i in range(512) if not ok[i]]


def feats(g, p):
    walls = sum(row.count("#") for row in g)
    dist, _ = bfs(g)
    reach = len(dist)
    turns = 0
    order = sorted(p, key=lambda c: dist[c])
    for a, b, c in zip(order, order[1:], order[2:]):
        if (b[0] - a[0], b[1] - a[1]) != (c[0] - b[0], c[1] - b[1]):
            turns += 1
    off_reach = reach - len(p)                       # open reachable cells that are not on the path (side branches)
    back = sum(1 for a, b in zip(order, order[1:]) if b[0] < a[0] or b[1] < a[1])   # steps going up or left
    return dict(plen=len(p) - 1, walls=walls, turns=turns, side=off_reach, back=back)


def mean_milli(v):
    return 1000 * sum(v) // max(1, len(v))


FS = [feats(*tg[i]) for i in range(512)]
print("STEP1HDR|test=512|solved=%d|failed=%d|json=0" % (int(ok.sum()), len(fail)))
for k in ("plen", "walls", "turns", "side", "back"):
    a = [FS[i][k] for i in fail]; s = [FS[i][k] for i in range(512) if ok[i]]
    print("FEATURE|k=%s|failed_mean_milli=%d|solved_mean_milli=%d|failed_min=%d|failed_max=%d|solved_min=%d|solved_max=%d|json=0"
          % (k, mean_milli(a), mean_milli(s), min(a), max(a), min(s), max(s)))
# solve rate by path length and by 'back' steps
for k in ("plen", "back", "side"):
    c_all = Counter(FS[i][k] for i in range(512)); c_f = Counter(FS[i][k] for i in fail)
    print("RATE|by=%s|%s|json=0" % (k, "|".join("%d:%d_of_%d_failed" % (v, c_f.get(v, 0), c_all[v]) for v in sorted(c_all))))
# how often each path-length occurs in training
ctr = Counter(len(p) - 1 for _g, p in trg)
print("TRAINDIST|plen|%s|json=0" % "|".join("%d:%d" % (v, ctr[v]) for v in sorted(ctr)))
# kinds of error
miss = extra = 0; ecount = Counter(); epos = Counter()
for i in fail:
    w = (P[i] != YT[i]).nonzero().flatten().tolist(); ecount[len(w)] += 1
    for j in w:
        epos[j] += 1
        if YT[i][j] == 5: miss += 1
        else: extra += 1
print("ERRORS|wrong_cells_total=%d|missed_path_cells=%d|extra_path_cells=%d|wrong_cells_per_failed_maze=%s|json=0"
      % (miss + extra, miss, extra, dict(sorted(ecount.items()))))
print("ERRORPOS|cell_index:count|%s|json=0" % "|".join("%d:%d" % (j, c) for j, c in sorted(epos.items())))
# confidence: margin on the wrong cells versus right cells
wm = [abs(float(M[i][j])) for i in fail for j in range(25) if P[i][j] != YT[i][j]]
rm = [abs(float(M[i][j])) for i in range(512) for j in range(25) if P[i][j] == YT[i][j]]
print("MARGIN|wrong_cells_mean_milli=%d|right_cells_mean_milli=%d|wrong_below_1.0=%d_of_%d|json=0"
      % (mean_milli(wm), mean_milli(rm), sum(1 for x in wm if x < 1.0), len(wm)))
# is the predicted path at least a connected valid path? (a different, longer route)
valid_alt = 0
for i in fail:
    g, p = tg[i]; cells = {(j // 5, j % 5) for j in range(25) if P[i][j] == 5}
    if (0, 0) in cells and (4, 4) in cells and all(g[r][c] != "#" for r, c in cells):
        seen2 = {(0, 0)}; q = deque([(0, 0)])
        while q:
            r, c = q.popleft()
            for dr, dc in STEPS4:
                n = (r + dr, c + dc)
                if n in cells and n not in seen2:
                    seen2.add(n); q.append(n)
        if (4, 4) in seen2 and seen2 == cells:
            valid_alt += 1
print("ALTPATH|failed_predictions_that_are_a_connected_wall-free_route_from_S_to_G=%d_of_%d|json=0" % (valid_alt, len(fail)))
for i in fail[:6]:
    g, p = tg[i]
    rows = []
    for r in range(5):
        s = ""
        for c in range(5):
            j = r * 5 + c; t = int(YT[i][j]); q = int(P[i][j])
            s += g[r][c] if g[r][c] == "#" else ("o" if t == 5 and q == 5 else "M" if t == 5 else "X" if q == 5 else ".")
        rows.append(s)
    print("MAZE|test_index=%d|plen=%d|back=%d|rows=%s|key=o_correct_path,M_missed,X_extra,#_wall|json=0" % (i, FS[i]["plen"], FS[i]["back"], "/".join(rows)))
