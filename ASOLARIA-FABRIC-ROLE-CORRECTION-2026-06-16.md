# Asolaria Fabric Role Correction — 2026-06-16

This note records the **fabric-grounded correction** that arrived after the first round of USB identity and exFAT analysis.

**Evidence source:** the acer-side 2026-06-16 session transcript provided by the operator, including:

- direct raw-read of `\\.\PHYSICALDRIVE2`
- direct MBR signature read from acer's `PHYSICALDRIVE2`
- direct exFAT walk of the 500 GB partition
- direct fabric / supervisor answers (`substrate map H02` + direct supervisor `EXPLAIN`)

## Direct supervisor owner

The operator identified the exact owning supervisor:

- **`PROF-SOVLINUX-USB`** (line `498`)

Its `EXPLAIN`:

> "Supervises 2TB SOVLINUX sovereignty USB (Get-Disk #1, USB bus, MBR-type-06, on liris vantage; NOT acer D: which is local SanDisk SSD)."

That is the system's own supervisor-level answer, and it independently confirms:

1. the canonical SOVLINUX USB is **liris-side**
2. it is **not acer `D:`**
3. the liris-side canonical instance is **not** the same physical shape as acer's exFAT/type-07/signature-0 instance

## The correction

The fabric's authoritative substrate framing says:

1. **SOVLINUX-2TB role = "sovereignty cold-storage / master copy"**
2. It is **not** the canonical `carry-quant` / room-store substrate
3. The **canonical master** is pinned to **`host=liris`**
4. The fabric's canonical signature for that master is **`2814414849`**

The same supervisor family also models SOVLINUX as a **13-slot portable cartridge**, with descriptor slots:

- `SHANNON`
- `PI`
- `HERMES`
- `AGENT0`
- `GEMMA4B`
- `GNN`
- `HOOKWALL`
- `KERNEL`
- `MICROKERNEL`
- `WHITE-ROOM`
- `DASHBOARD`
- `API`
- `VAULT`

Alongside:

- `SUBSTRATE-USB-SOVLINUX-2TB` (substrate root)
- `probe_usb_sovlinux_present_raw_intact` (raw-intact probe)

## What acer physically has

The acer-side transcript established all of these at once:

- `\\.\PHYSICALDRIVE2` on acer is a real **SOVLINUX-labeled** exFAT volume
- its contents match a **sovereignty cold-storage** role: backups, runtime trees, `sovereignty/`, phone copies, idea docs
- the direct MBR disk-signature read on acer reported **`0`** (`0x0`), **not** `2814414849`

So the honest interpretation is:

- **acer has a SOVLINUX-labeled sovereignty cold-storage instance**
- the **canonical master remains liris-side**
- "same label" does **not** mean "same physical instance"

That distinction is exactly why the repo's standing rule is **device-PID, not drive letter**.

## What this means for the 100k-room question

The absence of a visible `100k` room tree on acer's exFAT partition is **not** a falsification of canon. It is **consistent** with the corrected role:

- this drive is for **sovereignty cold-storage / master-copy duties**
- it is **not** where the fabric says the room substrate lives

So the correction is to the **frame**, not the bytes:

- the exFAT walk was right about the content
- the earlier "carry-quant / room-store" interpretation was wrong
- the supervisor-owned cartridge is a **portable sovereignty substrate**, not a proved room-store

## Related notes

- [`ASOLARIA-DEVICE-PID-MAP.md`](ASOLARIA-DEVICE-PID-MAP.md)
- [`ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](ASOLARIA-USB-EXFAT-WALK-2026-06-16.md)
- [`ASOLARIA-MIGRATION-MAP.md`](ASOLARIA-MIGRATION-MAP.md)
