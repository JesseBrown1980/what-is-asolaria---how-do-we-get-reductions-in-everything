# unpump_v25.py - resolve a codex of handle8 names through the system container and pull the bodies back out.
# Read-only on the store. Integer only. See SPEC-UNPUMP-V25.hbp (sealed before this ran).
import hashlib, os, sys
STORE = r"D:/asolaria-gguf/ASOLARIA-SYSTEM-2026-08-08.gguf"; DS = 2592; MAN_OFF = DS + 1537360800; MAN_LEN = 181469640
LIVE = [  # (label, live path) - the codex is built from the live files' hashes; only the 16-hex handle goes into the codex
 ("office_constellation_key_row", r"D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/FABLE5-CONSTELLATION-KEY-3174.hbp"),
 ("office_constellation_star_row", r"D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/FABLE5-STAR-ASOLARIA-CONSTELLATION.hbp"),
 ("office_delete_and_regenerate_row", r"D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/FABLE5-DELETE-AND-REGENERATE.hbp"),
 ("office_see_self_64_row_july", r"D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/FABLE5-SEE-SELF-64.hbp"),
 ("foundation_00_immutable", r"C:/asolaria-foundation-v1/00-IMMUTABLE-FOUNDATION.md"),
 ("brown_hilbert_root", r"C:/Users/acer/Asolaria/BROWN-HILBERT.md"),
 ("tribit_mod_rs", r"C:/asolaria-acer/asolaria-os/kernel/core/src/tribit/mod.rs"),
 ("mythos_glyphs_256_gguf", r"D:/asolaria-absorb/kernel-pump/ASOLARIA-MYTHOS-SELF-GLYPHS-256.gguf"),
 ("usb_vault_boot_js", r"D:/asolaria-usb-restore-2026-06-19/sovereignty/boot.js"),
 ("mythos_self_emission_seed", r"D:/asolaria-absorb/kernel-pump/MYTHOS-SELF-EMISSION.txt"),
 ("mythos_full_emission", r"D:/asolaria-absorb/kernel-pump/MYTHOS-FULL-EMISSION.txt"),
 ("constellation_key_3174_bin", r"D:/asolaria-absorb/kernel-pump/ASOLARIA-CONSTELLATION-KEY-3174.bin"),
 ("acer_mythos_blue_gguf", r"D:/push-work/asolaria-main/MYTHOS-BLUE-STAR/ACER-MYTHOS-BLUE.gguf"),
 ("constellation_gguf", r"D:/asolaria-absorb/constellation/ASOLARIA-CONSTELLATION.gguf"),
 ("fischer_kernel_mjs", r"D:/bigpickle-rebuild/src/fischer-kernel.mjs"),
 ("pump_glyphs_mythos_py", r"D:/asolaria-absorb/ASOLARIA-UNIVERSE-SIMULATOR/measurements/pump_glyphs_mythos.py"),
]
def sha_file(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 22), b""): h.update(b)
    return h.hexdigest()
live = [(lab, p, sha_file(p), os.path.getsize(p)) for lab, p in LIVE]
codex = [s[:16] for _, _, s, _ in live]                      # THE CODEX: 16 names of 8 bytes each
codex_bytes = len(codex) * 8
want = set(codex); hits = {h: [] for h in codex}; rows = 0; skipped = 0
with open(STORE, "rb") as f:
    f.seek(MAN_OFF); man = f.read(MAN_LEN)
for line in man.split(b"\n"):
    if line.startswith(b"GGUFFILE|"):
        rows += 1
        i = line.rfind(b"|sha256="); s = line[i + 8:i + 24].decode()
        if s in want:
            d = dict(w.split("=", 1) for w in line.decode("utf8", "replace").split("|")[1:] if "=" in w)
            hits[s].append(d)
    elif line.startswith(b"GGUFSKIPFILE|") or b"recorded_not_inlined" in line: skipped += 1
print("UNPUMPHDR|store=%s|manifest_rows=%d|codex_names=%d|codex_bytes=%d|json=0" % (STORE, rows, len(codex), codex_bytes))
res = held = 0; out_bytes = 0
with open(STORE, "rb") as f:
    for (lab, p, s, n), h in zip(live, codex):
        hs = hits[h]
        if not hs:
            held += 1; print("UNPUMP|item=%s|handle8=%s|live_bytes=%d|outcome=HELD|reason=no_manifest_row_carries_this_name|json=0" % (lab, h, n)); continue
        d = hs[0]; off = int(d["off"]); ln = int(d["bytes"])
        f.seek(DS + off); body = f.read(ln); got = hashlib.sha256(body).hexdigest()
        ok_man = got == d["sha256"]; ok_live = got == s
        res += 1; out_bytes += ln
        print("UNPUMP|item=%s|handle8=%s|outcome=RESOLVED|bytes=%d|store_paths=%d|first_path=%s|body_sha_equals_manifest=%d|body_sha_equals_live_file=%d|json=0"
              % (lab, h, ln, len(hs), d["path"][-70:], ok_man, ok_live))
print("UNPUMPSUM|resolved=%d|held=%d|codex_bytes=%d|bytes_brought_back=%d|ratio_floor=%d|json=0" % (res, held, codex_bytes, out_bytes, out_bytes // codex_bytes if codex_bytes else 0))
