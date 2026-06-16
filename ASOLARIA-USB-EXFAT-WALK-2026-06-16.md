# Asolaria USB exFAT Walk — 2026-06-16

This note records the **acer-side filesystem-level walk** of the SOVLINUX USB's **500 GB exFAT carry-quant** partition. It is based on the **2026-06-16 session transcript** from the acer host, not a fresh live run from the current host.

## Evidence source

- acer-side session transcript, 2026-06-16
- tool lane: read-only raw device access via `tools/usb-raw/usb_raw_io.py`
- walker used in-session: `exfat_walk.py` built on the same read-only raw primitive

## What the walk confirmed

1. The filesystem-level **volume label is literally `SOVLINUX`**.
2. The exFAT walk completed successfully: **`EXIT=0`**.
3. The full walk aggregate reported:
   - **dirs:** `1500`
   - **files:** `16037`
   - **bytes:** `74064932374` (`~74.06 GB`)
4. This means the 500 GB exFAT partition is **real, populated storage**, but it is **not** a visible `100k`-room sector tree.

## Top-level content surfaced in the session

The transcript's shallow scout and follow-up notes surfaced these concrete exFAT contents:

- **`E-backup-2026-04-23.part001`–`part009.tar`** set: **~56.7 GB**
- **Felipe A06 phone copy:** **~980 MB**
- **`runtime/`** tree: **~264 MB** at the shallow pass
- **`sovereignty/`** tree
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
