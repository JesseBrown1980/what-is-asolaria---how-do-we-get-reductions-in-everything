# rime_wall_gguf_v29.py - write the nine-wall 2D GGUF of a body, then rebuild the 3D body from that file ALONE.
# Integers only (GGML type I32). Stage 1 writes walls. Stage 2 reads only the wall file, solves, writes the 3D GGUF.
import hashlib, os, struct, sys
from collections import defaultdict
P = 1000081; N = 64
DIRS = [(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 0), (1, -1, 0), (1, 0, 1), (1, 0, -1), (0, 1, 1), (0, 1, -1)]
OUT = r"D:/asolaria-unpump-20261113/rime"
GGUF_MAGIC = 0x46554747; V_U32, V_STR = 4, 8; GGML_I32 = 26; ALIGN = 32


def s_str(x):
    b = x.encode(); return struct.pack("<Q", len(b)) + b


def write_gguf(path, kvs, tensors):
    """tensors: list of (name, dims, list_of_int32)"""
    meta = b"".join(s_str(k) + struct.pack("<I", t) + p for k, t, p in kvs)
    data = b""; tinfo = b""
    for name, dims, vals in tensors:
        data += b"\0" * ((-len(data)) % ALIGN); off = len(data)
        tinfo += s_str(name) + struct.pack("<I", len(dims)) + b"".join(struct.pack("<Q", d) for d in dims)
        tinfo += struct.pack("<I", GGML_I32) + struct.pack("<Q", off)
        data += struct.pack("<%di" % len(vals), *vals)
    head = struct.pack("<IIQQ", GGUF_MAGIC, 3, len(tensors), len(kvs)) + meta + tinfo
    blob = head + b"\0" * ((-len(head)) % ALIGN) + data
    open(path, "wb").write(blob); dg = hashlib.sha256(blob).hexdigest()
    open(path + ".sha256", "w", newline="\n").write("%s  %s\n" % (dg, os.path.basename(path)))
    return len(blob), dg


def read_gguf(path):
    b = open(path, "rb").read(); magic, ver, nt, nkv = struct.unpack_from("<IIQQ", b, 0); o = 24
    def rs(o):
        n, = struct.unpack_from("<Q", b, o); return b[o + 8:o + 8 + n].decode(), o + 8 + n
    for _ in range(nkv):
        _k, o = rs(o); t, = struct.unpack_from("<I", b, o); o += 4
        if t == V_STR: _v, o = rs(o)
        else: o += 4
    info = []
    for _ in range(nt):
        name, o = rs(o); nd, = struct.unpack_from("<I", b, o); o += 4
        dims = struct.unpack_from("<%dQ" % nd, b, o); o += 8 * nd; _tt, off = struct.unpack_from("<IQ", b, o); o += 12
        info.append((name, dims, off))
    ds = o + ((-o) % ALIGN); out = {}
    for name, dims, off in info:
        n = 1
        for d in dims: n *= d
        out[name] = (dims, list(struct.unpack_from("<%di" % n, b, ds + off)))
    return out


def line_key(d, p):
    dx, dy, dz = d; x, y, z = p
    return (dy * z - dz * y, dz * x - dx * z, dx * y - dy * x)


def solve(rows, ncols, rhs):
    piv = {}
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
                inv = pow(r[c], P - 2, P); r = {k: v * inv % P for k, v in r.items()}; b = b * inv % P
                piv[c] = (r, b); break
    if len(piv) < ncols:
        return None
    sol = [0] * ncols
    for c in sorted(piv, reverse=True):
        r, b = piv[c]; s = b
        for k, v in r.items():
            if k != c: s = (s - v * sol[k]) % P
        sol[c] = s
    return sol


label, src = sys.argv[1], sys.argv[2]
# ---------------- stage 1: body -> nine walls -> 2D GGUF
raw = open(src, "rb").read(); n = len(raw) // 3; cube = defaultdict(int)
for i in range(n):
    cube[(raw[3 * i] >> 2, raw[3 * i + 1] >> 2, raw[3 * i + 2] >> 2)] += 1
tens = []
for wi, d in enumerate(DIRS):
    w = defaultdict(int)
    for p, v in cube.items():
        w[line_key(d, p)] += v
    flat = []
    for k in sorted(w):
        flat += [k[0], k[1], k[2], w[k]]
    tens.append(("wall_%d_dir_%d_%d_%d" % (wi, d[0], d[1], d[2]), (len(w), 4), flat))
wall_path = os.path.join(OUT, "RIME-NINE-WALLS-%s.gguf" % label)
wsz, wdg = write_gguf(wall_path, [("general.architecture", V_STR, s_str("asolaria-rime-nine-walls")),
                                  ("general.name", V_STR, s_str("RIME-NINE-WALLS-" + label)),
                                  ("asolaria.cube", V_U32, struct.pack("<I", N)), ("asolaria.walls", V_U32, struct.pack("<I", 9)),
                                  ("asolaria.float_used", V_U32, struct.pack("<I", 0))], tens)
print("WALLGGUF|k=%s|file=%s|bytes=%d|sha256=%s|walls=9|lit_cells=%d|json=0" % (label, os.path.basename(wall_path), wsz, wdg, sum(t[1][0] for t in tens)), flush=True)
# ---------------- stage 2: the wall file ALONE -> 3D body
W = read_gguf(wall_path); walls = []
for name in sorted(W, key=lambda s: int(s.split("_")[1])):
    parts = name.split("_dir_")[1].split("_"); d = (int(parts[0]), int(parts[1]), int(parts[2]))
    dims, flat = W[name]; walls.append((d, {(flat[4 * i], flat[4 * i + 1], flat[4 * i + 2]): flat[4 * i + 3] for i in range(dims[0])}))
cells = [(x, y, z) for x in range(N) for y in range(N) for z in range(N) if all(line_key(d, (x, y, z)) in w for d, w in walls)]
idx = {p: i for i, p in enumerate(cells)}; rows = []; rhs = []
for d, w in walls:
    groups = defaultdict(dict)
    for p, i in idx.items():
        groups[line_key(d, p)][i] = 1
    for k, r in groups.items():
        rows.append(r); rhs.append(w[k])
sol = solve(rows, len(cells), rhs)
if sol is None:
    print("REBUILD|k=%s|outcome=HELD|candidate_cells=%d|json=0" % (label, len(cells))); sys.exit(0)
dense = [0] * (N * N * N)
for p, i in idx.items():
    dense[(p[0] * N + p[1]) * N + p[2]] = sol[i]
sphere_path = os.path.join(OUT, "RIME-BODY-3D-%s.gguf" % label)
ssz, sdg = write_gguf(sphere_path, [("general.architecture", V_STR, s_str("asolaria-rime-body-3d")),
                                    ("general.name", V_STR, s_str("RIME-BODY-3D-" + label)),
                                    ("asolaria.cube", V_U32, struct.pack("<I", N)), ("asolaria.rebuilt_from", V_STR, s_str(os.path.basename(wall_path))),
                                    ("asolaria.float_used", V_U32, struct.pack("<I", 0))], [("body64", (N, N, N), dense)])
truth = [0] * (N * N * N)
for p, v in cube.items():
    truth[(p[0] * N + p[1]) * N + p[2]] = v
print("REBUILD|k=%s|outcome=RESOLVED|candidate_cells=%d|nonzero_rebuilt=%d|true_cells=%d|mass_rebuilt=%d|mass_true=%d|every_cell_equal=%d|file=%s|bytes=%d|sha256=%s|json=0"
      % (label, len(cells), sum(1 for v in dense if v), len(cube), sum(dense), n, int(dense == truth), os.path.basename(sphere_path), ssz, sdg), flush=True)
