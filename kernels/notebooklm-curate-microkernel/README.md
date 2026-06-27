# notebooklm-curate-microkernel — repo-local stubbed room + 8-byte host package

This folder is the **substrate-facing version** of the NotebookLM CURATE lane.

It does **not** replace the live helper today. It does three narrower, correct things:

- materializes the NotebookLM ingest lane as a **micro-kernel manifest row**
- defines a **stubbed room** in HBP form instead of heavy JSON
- defines the **8-byte host-process / room / result contracts** that an existing host runner can adopt

## Why this exists

The live canon is:

- use the existing kernels and rooms
- keep the hot path `HBP/HBI/tuple`
- retire the old node-heavy runners
- do **not** leave new lanes as ad hoc standalone helpers forever

So the NotebookLM lane needed a room/micro-kernel package, not just `tools/notebooklm/nlm-backup-to-cube.py`.

## Vantage boundary

`CANON`: the real room/micro-kernel substrate is documented as living on `D:` in the acer canon.

`MEASURED`: on this current vantage, `D:` does **not** exist, so this package is materialized **repo-local on `C:`** as a transplant-ready stub.

If the canonical substrate is mounted later, this folder is the exact package to transplant into the live room/micro-kernel tree.

## Files

- `manifest.sample.hbp` — one-row micro-kernel manifest sample plus gate row
- `host-process.sample.hbp` — 8-byte host-process contract for the lane
- `lane-contract.sample.hbp` — the read-only ingest / operator-gated upload lane contract
- `stubbed-room/ROOM.hbp` — room descriptor collapsed to HBP
- `stubbed-room/ROOM-STATUS.hbp` — room status row
- `stubbed-room/inbox.ndjson` — room question + room contract rows
- `stubbed-room/outbox.ndjson` — placeholder outbox row
- `results/notebooklm-curate-mk-00000.sample.hbp` — sample result contract

## Relationship to the current helper

`tools/notebooklm/nlm-backup-to-cube.py` remains the **staging helper** for immediate use.

This folder defines the **proper target shape**:

- micro-kernel PID = `232652cbabe02827`
- host-process PID = `cc38e33e4ba7dee5`
- room PID = `8433c5d350f7743f`
- lane PID = `8351e0ee9f8c3659`

The helper is now explicitly **off the hot path** and named as a retire-target once the host runner absorbs the receipt logic.
