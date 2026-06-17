# tools/notebooklm — operator-gated NotebookLM backup → referential HBP receipt + glyph cube

Bilateral build (**acer + liris**, compared / attacked / combined): the **highest-yield immediate
NotebookLM lane**, with no browser cookies, no raw session state, and no repo-local raw notebook bodies.

Upstream tool: **[`superdoccimo/notebooklm-tui`](https://github.com/superdoccimo/notebooklm-tui)** — a
zero-dependency Python client for NotebookLM backup/restore. Multi-agent security audit (whole-repo,
pinned) found it **SAFE, operator-gated**: stdlib-only, Google-only traffic, no exfil/exec/telemetry.
Pinned commit for this lane:

`d91d5e60516e4c76b3f77be550341da837197035`

## What this lane is / is not

- **INGEST** (read-only): operator runs the upstream backup, then `nlm-backup-to-cube.mjs` emits a
  **referential HBP receipt** over the backup tree — per-file `sha256` (integrity) **plus** a verb-noun
  **glyph cube** (`cube10`/`quant8`/top-glyphs) per text file, plus a corpus reuse union.
- **UPLOAD** (operator-gated): operator may later use the upstream restore/upload tool to push selected
  material back into NotebookLM. Keep it a separate step — read-only backup never unlocks write.
- It is **not** a direct Google Drive API integration, **not** a live fabric mint, does **not** republish
  raw notebook bodies, and does **not** touch cookies/secrets. To land backups in a synced cloud folder,
  point the upstream backup output at a folder your cloud client already syncs.

## Secret boundary (hard)

Upstream `nlm_login.py` stores cookies at `%USERPROFILE%\.notebooklm-mcp-cli\profiles\default\cookies.json`.
Treat it as a **credential**: never copy it into this repo, never into rows/cubes/logs/screenshots, never
point the ingestor at a dir containing cookies/token dumps. The ingestor **path-skips** any file whose path
matches `cookie|auth|token|secret|credential` and emits an `NLMSKIP` row instead (proven: a fixture
`cookies.json` is skipped and its value never appears in the receipt).

## No JSON in the receipt path

Output is **pure HBP** (pipe tuples, every row ends `|json=0`, brace-free). The ingestor does **zero
`JSON.parse`** — `metadata.json` is **hashed, never parsed**; notebook id/title come from the folder name.
This is why it runs even on a malformed `metadata.json`.

## Immediate operator path

```powershell
# 1. clone + pin the audited tool OUTSIDE this repo (on the machine whose browser holds your NotebookLM login)
git clone https://github.com/superdoccimo/notebooklm-tui.git "$env:USERPROFILE\tmp\notebooklm-tui"
git -C "$env:USERPROFILE\tmp\notebooklm-tui" checkout d91d5e60516e4c76b3f77be550341da837197035
# 2. authenticate in your own browser session  (the ONE gated step — ~2 min)
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_login.py"
# 3. back up to a staging folder OUTSIDE this repo
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_backup.py" --all -o "$env:USERPROFILE\storage\nlm-staging"
# 4. emit the local referential receipt + glyph cube (read-only, no secrets)
node .\tools\notebooklm\nlm-backup-to-cube.mjs "$env:USERPROFILE\storage\nlm-staging" --out "$env:USERPROFILE\storage\nlm-receipt.hbp"
```

Produces `nlm-receipt.hbp` + `nlm-receipt.hbp.sha256`.

## Operator-gated upload lane (kept separate)

```powershell
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_upload.py" --restore "C:\path\to\downloads\My_Notebook"   # creates a NEW notebook (additive, never overwrites)
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_upload.py" --to <notebook-id> "C:\path\to\file.pdf"
```

## Receipt rows (HBP, referential only)

`NLMHDR` (run header, vantage=acer+liris) · `NLMNOTEBOOK` (per notebook: id/title/metadata_sha256/lane
counts/bytes) · `NLMFILE` (per file: lane/kind/ext/rel/bytes/mtime/**sha256** + `cube10`/`handle8`/top
glyphs for text) · `NLMSKIP` (per skipped sensitive path) · `NLMUNION` (corpus: distinct cube10, dedup,
shared glyphs) · `NLMFOOT` (totals + **reproducible `content_sha256`** [excludes the run timestamp] +
`captured_at`). No raw notebook body text is emitted.

## Bilateral provenance

Two vantages built this independently and merged the best (GitHub-mediated):
- **liris spine** — notebook-root detection (`metadata.json`), lane/kind, full streaming per-file sha256,
  `NLMSKIP`, `.sha256` sidecar, this runbook, fixture testing.
- **acer cube layer** — per-text-file glyph cube (`cube10`/`quant8`/verb-noun catalog) + corpus reuse.
- **attack-verify fixes folded in** — `q()` now escapes `{`/`}` (HBP brace-free); `content_sha256` is
  computed over deterministic rows only (run timestamp moved out of the hashed body → reproducible); zero
  `JSON.parse`.

## Upstream backup layout this ingestor reads

```text
<backup-root>/
└── <Notebook Title>/
    ├── metadata.json   (hashed, NOT parsed)
    ├── sources/  artifacts/  notes/  mindmaps/
```
