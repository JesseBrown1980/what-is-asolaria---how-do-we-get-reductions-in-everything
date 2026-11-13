# wall_witness_v32.py - GPT-6's point: more candidate cells than wall sums shows the LINEAR system is not unique,
# but the body is made of non-negative whole numbers, which could still pin it. So look for a witness: a second
# non-negative whole-number body with exactly the same nine walls. Integers only.
# A pattern whose sum along every line of every one of the nine directions is zero is the coefficient array of
# prod_d (X^d - 1). Adding it to the body changes no wall. If it can be added somewhere without going negative,
# that is a second body with the same nine walls.
import sys
from collections import defaultdict
N = 64
DIRS = [(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 0), (1, -1, 0), (1, 0, 1), (1, 0, -1), (0, 1, 1), (0, 1, -1)]


def key(d, p):
    dx, dy, dz = d; x, y, z = p
    return (dy * z - dz * y, dz * x - dx * z, dx * y - dy * x)


pat = {(0, 0, 0): 1}
for d in DIRS:
    nxt = defaultdict(int)
    for p, c in pat.items():
        nxt[(p[0] + d[0], p[1] + d[1], p[2] + d[2])] += c
        nxt[p] -= c
    pat = {p: c for p, c in nxt.items() if c}
mn = [min(p[i] for p in pat) for i in range(3)]; pat = {(p[0] - mn[0], p[1] - mn[1], p[2] - mn[2]): c for p, c in pat.items()}
ext = [max(p[i] for p in pat) + 1 for i in range(3)]
# check the pattern: every line sum in every direction is zero
bad = 0
for d in DIRS:
    w = defaultdict(int)
    for p, c in pat.items():
        w[key(d, p)] += c
    bad += sum(1 for v in w.values() if v)
neg = {p: -c for p, c in pat.items() if c < 0}
print("PATTERN|cells=%d|box=%dx%dx%d|largest_coefficient=%d|negative_cells=%d|nonzero_line_sums=%d|json=0"
      % (len(pat), ext[0], ext[1], ext[2], max(abs(c) for c in pat.values()), len(neg), bad), flush=True)

raw = open(sys.argv[1], "rb").read(); n = len(raw) // 3; cube = defaultdict(int)
for i in range(n):
    cube[(raw[3 * i] >> 2, raw[3 * i + 1] >> 2, raw[3 * i + 2] >> 2)] += 1
negl = sorted(neg.items(), key=lambda t: -t[1])
found = None; tried = 0
for tx in range(N - ext[0] + 1):
    for ty in range(N - ext[1] + 1):
        for tz in range(N - ext[2] + 1):
            tried += 1
            ok = True
            for (px, py, pz), need in negl:
                if cube.get((px + tx, py + ty, pz + tz), 0) < need:
                    ok = False; break
            if ok:
                found = (tx, ty, tz); break
        if found: break
    if found: break
if not found:
    # the mirrored pattern (subtracting) is the other sign
    pos = sorted(((p, c) for p, c in pat.items() if c > 0), key=lambda t: -t[1])
    for tx in range(N - ext[0] + 1):
        for ty in range(N - ext[1] + 1):
            for tz in range(N - ext[2] + 1):
                if all(cube.get((px + tx, py + ty, pz + tz), 0) >= need for (px, py, pz), need in pos):
                    found = (tx, ty, tz, "minus"); break
            if found: break
        if found: break
if not found:
    print("WITNESS|body=%s|true_cells=%d|found=0|translations_tried=%d|meaning=this_one_pattern_does_not_fit;_ambiguity_among_non-negative_bodies_is_NOT_shown_by_this_test|json=0" % (sys.argv[2], len(cube), tried))
    sys.exit(0)
sign = -1 if len(found) == 4 else 1; t = found[:3]
body2 = defaultdict(int, cube)
for p, c in pat.items():
    body2[(p[0] + t[0], p[1] + t[1], p[2] + t[2])] += sign * c
mnv = min(body2.values()); diff = sum(1 for p in set(cube) | set(body2) if cube.get(p, 0) != body2.get(p, 0))
same = 0
for d in DIRS:
    w1 = defaultdict(int); w2 = defaultdict(int)
    for p, v in cube.items(): w1[key(d, p)] += v
    for p, v in body2.items():
        if v: w2[key(d, p)] += v
    same += int({k: v for k, v in w1.items() if v} == {k: v for k, v in w2.items() if v})
print("WITNESS|body=%s|true_cells=%d|found=1|translation=%s|sign=%+d|second_body_min_value=%d|cells_that_differ=%d|walls_identical=%d_of_9|mass_equal=%d|meaning=two_different_non-negative_whole-number_bodies_share_all_nine_walls|json=0"
      % (sys.argv[2], len(cube), t, sign, mnv, diff, same, int(sum(cube.values()) == sum(body2.values()))))
