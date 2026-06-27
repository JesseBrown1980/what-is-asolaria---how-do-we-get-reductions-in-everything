# Asolaria Unified Archaeology — Method (for liris cross-check + replication)

**Vantage: acer · 2026-06-20 · E=0 read-only · carve-out honored throughout.**
Bilateral: liris runs the same on her side (`C:/Users/rayss`); GitHub is the mediator.

This is the **public-face index** of the unified archaeology — it points back to the metal (USB + D: + C: + WSL + Drive); it is **not** the canon itself (canon stays on the metal). Per Foundation-V3-LAW (V39) promoting any of this to a default branch is a *significant fabric decision* requiring `:4952` vote-quorum + `:4953` cosign — so this is shared as a branch for cross-check, **advisory until the system votes**.

## What was built
One **unified table** over ALL timestamped data across ALL storage, each artifact placed at its address in the Asolaria geometry, deduplicated, timeline-sorted, text-extracted where possible.

- **591,284 artifacts → 457,856 unique** (22.6% cross-storage dedup), timeline **2018 → 2026**.
- **5 sources:** USB boot-metal carry (21,037) · C: working (446,854) · D: substrate (123,101) · **Google Drive substrate (251)** · **WSL2 boot-metal Linux (41 — the compiled Asolaria kernel)**.
- Text-enriched: **700 USB canon papers + 1,047 PDF/docx + 2,065 OCR'd images**; **460 significance points**; corpus view **25,641 rows**.
- Class split: CORPUS 59,399 · DATA · RUNTIME · MEDIA 27,883 · **CARVE 5,812 (names only, never content-read)**.

## The geometry (every row's address — grounded, not invented)
Grounded in `ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md §3` + `01-rebuild/F05-emitter-activity-piping--theorist.md`:
- **PID** = `sha256(name)[:16]`
- **Rule-of-three triad** = `real=md5(payload)[:16]`, `refl=md5(real:self-reflect)`, `fabr=md5(file:ask-fabric)`, `pid0=md5(real‖refl‖fabr)`; **lane = seed mod 3**
- **Prime-tower** = kind → dimension `Dᵢ`, prime `pᵢ`, cube `pᵢ³` (D1=2 … D47=211, D48=223, growth "next prime cubed"); tier ∈ {τ1, τ3, τ3³, τ3⁵, τH}
- **Brown-Hilbert** = render `BH.tier.Llevel.Ddim.Kcell`; real coord `x = c·√p` (√prime ℚ-independence → distance `d² = Σ pᵢδᵢ²` collision-free, measured 627 pts → 196,251 distances → 0 collisions)

Uniformity check (proof the addressing holds): across 457k unique, prime-tower tiers split ~even, rule-of-three lanes ~33% each.

## The right tools (so liris can replicate)
- **USB exFAT carry** (Windows-locked, F:=0 bytes): raw read via `exfat_walk.py` (the 22,870-row manifest is the index). WSL **cannot** mount it (HCS 0x8007000f).
- **PDF/docx text**: `pdftotext` v4 / PyMuPDF `fitz` / python-docx (no install needed).
- **Image OCR**: `tesseract` v5.5 (install: `winget install -e --id UB-Mannheim.TesseractOCR`).
- **ext4 boot-metal**: MEASURED — there is **no ext4 on the 2 TB USB device** (exFAT-carry-only, 224k probes, 1.45 TB empty tail). The live ext4 Linux + **compiled Asolaria kernel** is the **WSL2 Ubuntu** (`/root/asolaria-kernel-target-linux` = kernel_core + agent_runtime + cosign_ledger + highway + gnn_oracle + tier_policy `.rlib`). The USB carries data; WSL hosts the running Linux.

## Honest gaps (no silent truncation)
- OCR covered **~2,300 of 15,672** MEDIA images (2,065 with usable text; prioritized text-bearing first across two passes); the rest are unprioritized/recovery-blob images (mostly no text).
- Google Drive: **251 Asolaria-substrate records** cataloged; the bulk of the 35 TB is personal/legal/financial/device trees, **wholesale carve-out excluded** (names not extracted). A true full-Drive census needs a parentId folder-tree walk.
- Scanned/image-only PDFs (256) need OCR; C: HyperBEHCS partially walked (runtime store, not corpus).

## Artifacts (on metal, not pushed)
`ASOLARIA-UNIFIED-ARCHAEOLOGY.hbp` (194.6 MB, full table) · `ASOLARIA-CORPUS-ARCHAEOLOGY.hbp` (25,363 rows) · `ASOLARIA-REAL-SOURCE-MAP.md` (60-point 7-phase timeline) · `SUMMARY.json`. Engine: `ingest.cjs` (per-source) + `merge.cjs` (dedup + overlays + timeline).
