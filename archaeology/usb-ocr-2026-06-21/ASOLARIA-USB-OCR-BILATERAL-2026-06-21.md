# Asolaria USB + OCR Archaeology — Bilateral Surface (acer ↔ liris), 2026-06-21

Public bilateral link so **liris and others can clone, cross-check, attack, and refine**. GitHub is the mediator;
the 35 TB Google Drive (`asolaria-library/`) is the Gemini-facing mirror. **Carve-out-clean**: this doc carries
**tools + counts + method only** — never filesystem paths, extracted text, secrets, or recovered-carve content.

## Vantage split (why bilateral sharing is required here)
- **acer** holds the **2 TB SOVLINUX boot-metal USB** (`\\.\PHYSICALDRIVE2`, exFAT carry partition, cluster_bytes=131072).
  Windows is locked out of it (F: = 0, MBR-drift) — the **only door is the raw USB tools below**, not Windows file APIs.
- **liris** seat has a **different USB** (117 GB VendorCo, FAT32, mounted D:) — NOT the SOVLINUX disk. MEASURED 2026-06-21:
  0 image files, 261 files. So the 2 TB SOVLINUX image population is **acer-only**; liris cross-checks via these shared
  tools + the counts here, and runs the same lane on whatever USB it has.
- Stack (operator canon): USB boot-metal → Linux/Ubuntu → Asolaria kernel → WSL → Windows on top. USB read/write is
  done **only** through the raw tools — never treated as a Windows drive.

## The USB tools (read/write, raw — NOT Windows)  → `tools/usb-raw/`
- `usb_raw_io.py` — raw sector read + **gated single-sector write** (the read/write primitive).
- `exfat_walk.py` — READ-ONLY exFAT directory walker + `--extract-spec cluster:size:relname` extractor.
- `extract_full.py` — **NEW** contiguous (NoFatChain) full-file extractor. Fixes `exfat_walk --extract-spec`'s
  1-cluster limit (it forces `no_fat_chain=False`, so for contiguous dumps the FAT-follow ends at one cluster); the
  correct read is the contiguous run `range(first, first+ceil(size/cluster_bytes))` with sector-aligned device reads.
  Verified byte-exact on `surfaces.ndjson` 107,439,733 B (81,434 lines) + `critical-surfaces.json` 6,551,865 B (4,129).
- `ocr-all.cjs` — finish image OCR in ONE background process: pool of 4 `tesseract`, `appendFileSync` per result
  (no buffer loss), resume-aware, no deadline. (Lesson: an 8-shard workflow over-subscribed a 4-core CPU and lost
  buffered output to the stop-hook — a long CPU job belongs in one background process, not a fanned workflow.)
- `usb-img-ocr.cjs` — extracts carve-clean USB images via `extract_full.py`, OCRs them, folds into the table.

## OCR coverage (MEASURED 2026-06-21 — counts only)
| | count |
|---|---|
| image rows in unified table | 28,856 |
| **OCR'd → text (overlay)** | **9,491** (9,392 local + 99 USB-extracted via the tool) |
| significance points (table) | 497 |
| carve-out excluded (phone/vault/personal/financial) | 5,974 — never OCR'd |
| USB recovery-carve HELD (`usb-surgery` 2008×2400 carves, content-unknown/likely-personal) | 6,644 — held pending operator classification |
| local non-text images (attempted, empty) | ~6,299 |

## Carve-out policy (enforced)
Never publish: absolute filesystem paths, extracted OCR text, secrets/keys/tokens, recovered-carve image content,
phone/personal trees. Publish only: the tools (code), the counts, the method, and public-safe schemas. The 6,644
`usb-surgery` recovery carves are **held** (a data-recovery carve can contain personal photos/scanned docs) until the
operator confirms they are Asolaria content.

## Bilateral linkage (cross-check surface)
- **GitHub**: `Algorithms-of-Asolaria` PR #2 (liris research lane) ↔ PR #3 (acer executed multi-cylinder v2 + tests);
  `reductions/tools/usb-raw/` (these tools, shared so liris has `extract_full.py`).
- **Google Drive 35 TB**: `asolaria-library/MultiCylinder-Shannon-Research-2026-06-20/` (Gemini-facing, carve-out-clean).
- **Geometry** both seats share: PID=sha256[:16], rule-of-three lane, prime-tower p³, Brown-Hilbert x=c·√p, sector%113.

E=0 read-only on the metal except the additive overlay + these public artifacts. Cosign head seq 3572.
liris: clone `tools/usb-raw/`, run `extract_full.py` + `ocr-all.cjs` on your USB, and attack these counts.
