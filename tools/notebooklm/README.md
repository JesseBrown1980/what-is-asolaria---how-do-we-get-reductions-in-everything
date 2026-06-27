# tools/notebooklm — operator-gated NotebookLM backup -> referential receipt + glyph cube lane

This folder stages the **highest-yield immediate NotebookLM lane** without storing browser cookies, raw session state, or repo-local backups.

The upstream tool is **[`superdoccimo/notebooklm-tui`](https://github.com/superdoccimo/notebooklm-tui)**. It is a zero-dependency Python client for NotebookLM backup and restore. The pinned commit used for this lane is:

`d91d5e60516e4c76b3f77be550341da837197035`

## What this lane is

- **INGEST**: operator runs the upstream NotebookLM backup tool, then this repo's `nlm-backup-to-cube.py` emits a **referential HBP-style receipt plus text-file glyph cubes** over the backup tree.
- **UPLOAD**: operator may later use the upstream restore/upload tool to push selected local material back into NotebookLM.

This repo only implements the **local, read-only, referential** half.

## What this lane is not

- It is **not** a direct Google Drive API integration.
- It is **not** a live fabric mint.
- It does **not** republish raw notebook contents into this repo.
- It does **not** touch cookies or browser secrets.

If you want the backup to land in a synced cloud folder, point the upstream backup output at a folder already synced by your cloud client.

## Secret boundary

The upstream `nlm_login.py` stores cookies at:

`%USERPROFILE%\.notebooklm-mcp-cli\profiles\default\cookies.json`

Treat that file as a **credential**.

- Never copy it into this repo.
- Never include it in cubes, rows, logs, or screenshots.
- Never point `nlm-backup-to-cube.py` at a directory containing cookies or token dumps.

The local ingestor skips paths whose names contain `cookie`, `auth`, `token`, `secret`, or `credential`.

Metadata is **hashed only**. `metadata.json` is never parsed on the hot path; notebook identity comes from the notebook folder name so malformed metadata cannot break the receipt.

The substrate-facing stub package now lives at [`../../kernels/notebooklm-curate-microkernel/`](../../kernels/notebooklm-curate-microkernel/): one `MK` row, one 8-byte host contract, one room descriptor, one inbox contract, and one sample result contract. That is the proper end-state target; this tool folder remains the immediate staging lane.

## Immediate path

1. Clone and pin the upstream tool outside this repo.

```powershell
git clone https://github.com/superdoccimo/notebooklm-tui.git "$env:USERPROFILE\tmp\notebooklm-tui"
git -C "$env:USERPROFILE\tmp\notebooklm-tui" checkout d91d5e60516e4c76b3f77be550341da837197035
```

2. Authenticate in your own browser session.

```powershell
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_login.py"
```

3. Back up one notebook or all notebooks to a staging folder outside this repo.

```powershell
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_backup.py" --all -o "$env:USERPROFILE\storage\notebooklm-backup-staging"
```

4. Emit the local referential receipt and glyph cubes.

```powershell
python .\tools\notebooklm\nlm-backup-to-cube.py "$env:USERPROFILE\storage\notebooklm-backup-staging" --out "$env:USERPROFILE\storage\notebooklm-backup-receipt.hbp"
```

This writes:

- `notebooklm-backup-receipt.hbp`
- `notebooklm-backup-receipt.hbp.sha256`

## Operator-gated upload lane

The upstream tool already supports both restore and additive upload:

```powershell
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_upload.py" --restore "C:\path\to\downloads\My_Notebook"
python "$env:USERPROFILE\tmp\notebooklm-tui\nlm_upload.py" --to <notebook-id> "C:\path\to\file.pdf"
```

Keep upload separate from ingest. Read-only backup should not implicitly unlock write.

## Local ingestor output

`nlm-backup-to-cube.py` emits pipe-delimited receipt rows:

- `NLMHDR` — run header
- `NLMNOTEBOOK` — one row per notebook root
- `NLMFILE` — one row per materialized backup file
- `NLMCUBE` — one row per text-like file with `cube10`, `quant8`, and top glyphs
- `NLMGLYPH` — global corpus glyph counts across the backup tree
- `NLMSKIP` — one row per skipped sensitive path
- `NLMFOOT` — final totals and reproducible content digest

The rows are **referential only**: path, lane, kind, byte count, timestamp, `sha256`, and derived glyph summaries. No raw notebook body text is emitted.

All output rows are `|json=0`, and braces in notebook titles/paths are escaped so the emitted HBP remains brace-safe.

## Upstream layout this ingestor expects

The pinned upstream tool writes one folder per notebook:

```text
<backup-root>/
└── <Notebook Title>/
    ├── metadata.json
    ├── sources/
    ├── artifacts/
    ├── notes/
    └── mindmaps/
```

That layout is read directly and recursively.
