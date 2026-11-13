# rime_walls_v29.py - how many 2D walls rebuild the 3D body exactly? Integers only. See SPEC-RIME-2D-TO-3D-V29.hbp.
import sys
from collections import defaultdict
P = 1000081
N = 64
AXES = [(1, 0, 0), (0, 1, 0), (0, 0, 1)]
FACE = [(1, 1, 0), (1, -1, 0), (1, 0, 1), (1, 0, -1), (0, 1, 1), (0, 1, -1)]
SPACE = [(1, 1, 1), (1, 1, -1), (1, -1, 1), (1, -1, -1)]
SETS = [("3_axes", AXES), ("9_axes_and_face_diagonals", AXES + FACE), ("13_all", AXES + FACE + SPACE)]


def line_key(d, p):
    dx, dy, dz = d; x, y, z = p
    return (dy * z - dz * y, dz * x - dx * z, dx * y - dy * x)


def body(path):
    raw = open(path, "rb").read(); n = len(raw) // 3; cube = defaultdict(int)
    for i in range(n):
        cube[(raw[3 * i] >> 2, raw[3 * i + 1] >> 2, raw[3 * i + 2] >> 2)] += 1
    return cube, n


def rank_and_solve(rows, ncols, rhs):
    """Gaussian elimination mod P on sparse rows (dict col->val). Returns rank and, if full column rank, the solution."""
    piv = {}                                   # col -> (row dict, rhs)
    for r, b in zip(rows, rhs):
        r = dict(r); b %= P
        while r:
            c = min(r)
            if c in piv:
                pr, pb = piv[c]; f = r[c]
                for k, v in pr.items():
                    nv = (r.get(k, 0) - f * v) % P
                    if nv: r[k] = nv
                    else: r.pop(k, None)
                b = (b - f * pb) % P
            else:
                inv = pow(r[c], P - 2, P)
                r = {k: v * inv % P for k, v in r.items()}; b = b * inv % P
                piv[c] = (r, b); break
    rank = len(piv)
    if rank < ncols:
        return rank, None
    sol = [0] * ncols
    for c in sorted(piv, reverse=True):
        r, b = piv[c]
        s = b
        for k, v in r.items():
            if k != c: s = (s - v * sol[k]) % P
        sol[c] = s
    return rank, sol


for label, path in (("A_self_emission", r"D:/asolaria-absorb/kernel-pump/MYTHOS-SELF-EMISSION.txt"),
                    ("B_full_emission", r"D:/asolaria-absorb/kernel-pump/MYTHOS-FULL-EMISSION.txt")):
    cube, ntri = body(path); occ = set(cube)
    print("BODY|k=%s|triples=%d|true_cells=%d|max_count=%d|json=0" % (label, ntri, len(occ), max(cube.values())), flush=True)
    for sname, dirs in SETS:
        walls = []
        for d in dirs:
            w = defaultdict(int)
            for p, v in cube.items():
                w[line_key(d, p)] += v
            walls.append(w)
        wall_cells = sum(len(w) for w in walls)
        # candidate cells: every line through the cell has a positive sum. Start from the first wall's lines.
        cand = None
        d0 = dirs[0]
        # enumerate cells on the positive lines of the first direction, then filter by the rest
        first = walls[0]; cells = []
        for x in range(N):
            for y in range(N):
                for z in range(N):
                    p = (x, y, z)
                    if line_key(d0, p) in first and all(line_key(d, p) in w for d, w in zip(dirs[1:], walls[1:])):
                        cells.append(p)
        ncand = len(cells); idx = {p: i for i, p in enumerate(cells)}
        ghosts = ncand - len(occ)
        line = "WALLS|k=%s|set=%s|wall_cells_with_light=%d|candidate_cells=%d|true_cells=%d|ghost_cells=%d" % (label, sname, wall_cells, ncand, len(occ), ghosts)
        if ncand > 6000:
            print(line + "|outcome=HELD|reason=too_many_candidates_for_the_exact_solve_here;_equations=%d_unknowns=%d|json=0" % (wall_cells, ncand), flush=True)
            continue
        rows = []; rhs = []
        for d, w in zip(dirs, walls):
            groups = defaultdict(dict)
            for p, i in idx.items():
                groups[line_key(d, p)][i] = 1
            for k, r in groups.items():
                rows.append(r); rhs.append(w[k])
        rank, sol = rank_and_solve(rows, ncand, rhs)
        if sol is None:
            print(line + "|equations=%d|rank=%d|free_dimensions=%d|outcome=HELD|json=0" % (len(rows), rank, ncand - rank), flush=True)
        else:
            same = all(sol[i] == cube.get(p, 0) % P for p, i in idx.items())
            print(line + "|equations=%d|rank=%d|free_dimensions=0|outcome=RESOLVED|rebuilt_equals_true_body=%d|json=0" % (len(rows), rank, int(same)), flush=True)
