# prep_v31.py - gather the nine corpora for the panel (read-only on sources; writes copies under panel/corpora).
import glob, os
OUT = r"D:/asolaria-unpump-20261113/panel/corpora"; os.makedirs(OUT, exist_ok=True)
CAP = 16 * 1024 * 1024
U = r"D:/asolaria-unpump-20261113/qr/unquanted/"
R9 = r"C:/tmp/opus55/floor-r9/pub/independent/y141-floor-r9-result-20261113/run9/"


def cat(name, files, cap=CAP):
    n = 0; used = 0
    with open(os.path.join(OUT, name + ".bin"), "wb") as o:
        for f in files:
            try:
                b = open(f, "rb").read()
            except OSError:
                continue
            if n + len(b) > cap:
                b = b[:cap - n]
            o.write(b); n += len(b); used += 1
            if n >= cap:
                break
    print("CORPUS|k=%s|files=%d|bytes=%d|json=0" % (name, used, n))


def walk(root, ext, skip=("target", "node_modules", ".git")):
    out = []
    for d, dirs, files in os.walk(root):
        dirs[:] = sorted(x for x in dirs if x not in skip)
        out += [os.path.join(d, f) for f in sorted(files) if f.endswith(ext)]
    return out


cat("WIKI", [U + "enwik8"], cap=100_000_000)
cat("CODE", [U + "code-corpus.txt"])
cat("ASOLARIA", [U + "asolaria-corpus.txt"])
off = r"D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7"
cat("HBP", sorted(glob.glob(off + "/FABLE5-*.hbp")))
cat("RUST", walk(r"C:/Users/acer/asolaria-federation-1024", ".rs"))
cat("MJS", sorted(glob.glob(r"C:/Users/acer/Asolaria/tools/behcs/*.mjs")))
cat("LAWS", [r"D:/asolaria-absorb/laws/ALL-assistant-messages.md", r"D:/asolaria-absorb/laws/COMBINED-BOOK-OF-LAWS.md"])
cat("CERT", sorted(glob.glob(R9 + "RUN11/cert_*.txt")) + sorted(glob.glob(R9 + "RUN12/cert_*.txt")))
cat("PY", walk(r"C:/Users/acer/AppData/Local/Programs/Python/Python313/Lib", ".py", skip=("site-packages", "test", "tests", "__pycache__")))
