# Asolaria USB exFAT Walk — 2026-06-16

This note records the **acer-side filesystem-level walk** of the SOVLINUX USB's **500 GB exFAT carry-quant** partition. It is based on the **2026-06-16 session transcript** from the acer host, not a fresh live run from the current host.

## Evidence source

- acer-side session transcript, 2026-06-16
- tool lane: read-only raw device access via `tools/usb-raw/usb_raw_io.py`
- walker used in-session: `exfat_walk.py` built on the same read-only raw primitive

## What the walk confirmed

1. The filesystem-level **volume label is literally `SOVLINUX`**.
2. The exFAT walk completed successfully: **`EXIT=0`**.
3. The full walk aggregate (acer `full-summary.json`, **cross-vantage corrected 2026-06-16**) reported:
   - **dirs:** `1833`
   - **files:** `21037`
   - **bytes:** `75701785842` (`~75.7 GB`)
   - `truncated=false`, `read_errors=0`, `depth_capped_dirs=0` — a **complete** walk
   - *(an earlier draft of this note used the mid-walk progress-log tick `1500 dirs / 16037 files / ~74.06 GB`; that was a partial line at t≈11.5 s, not the final aggregate — corrected here from the acer full-summary receipt.)*
4. This means the 500 GB exFAT partition is **real, populated storage** (~75.7 GB used of 500 GB; ~424 GB free; the 1453 GB tail beyond the partition is zeros), but it is **not** a visible `100k`-room sector tree.

## Top-level content surfaced in the session

The transcript's shallow scout and follow-up notes surfaced these concrete exFAT contents:

- **`E-backup-2026-04-23.part001`–`part009.tar`** set: **~56.7 GB**
- **Felipe A06 phone copy** (`A06-de-FELIPE-…172518`): **~12.5 GB** at full depth (the ~980 MB figure was the depth-2 shallow pass)
- **`runtime/`** tree: **~273 MB** (full; incl. `ruview-program-cube`)
- **`sovereignty/`** tree: **~3.1 GB** (677 dirs / 7,359 files) — the sovereignty project source/rehydration snapshots
- idea documents such as:
  - `New idea.docx`
  - `Hilbert... solution proposal.docx`
  - `Shannon omni waves... .docx`
- assorted scripts and runtime artifacts

## What this changes

This is the first **filesystem-level** receipt for the SOVLINUX-labeled exFAT partition in this repo. It refines the earlier **whole-device strided survey** in [`ASOLARIA-USB-FULL-SURVEY-2026-06-14.md`](ASOLARIA-USB-FULL-SURVEY-2026-06-14.md):

- the **2026-06-14** survey was a **coarse whole-device map** (`8192` probes at `256 MB` stride)
- the **2026-06-16** walk is a **directory-tree read** of the exFAT filesystem itself

Those are compatible receipts:

- the strided survey was good for **full-device shape**
- the exFAT walk is what actually proves **what kind of files live in the carry-quant**

Later fabric correction: see **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)**. The authoritative role of this substrate is **sovereignty cold-storage**, not a canonical room-store.

## What this does *not* prove

1. It does **not** prove a visible `20k / 50k / 100k` room folder tree on the USB.
2. It does **not** prove the absence of higher-level logical/canonical room layers elsewhere in the stack.
3. It does **not** attribute the separate WSL/ext4 findings; those are tracked separately in [`ASOLARIA-WSL-UBUNTU-LEADS-2026-06-16.md`](ASOLARIA-WSL-UBUNTU-LEADS-2026-06-16.md).

## Working interpretation

- **10k rooms on `D:`** remain the directly materialized room substrate.
- The **SOVLINUX-labeled exFAT partition on acer** is carrying **ordinary real payloads** and runtime trees, not a plainly visible `100k` room-sector directory substrate.
- So "`100k rooms`" remains a **logical / staged / catalog-backed** claim unless and until a direct room enumeration receipt exists for that layer.
