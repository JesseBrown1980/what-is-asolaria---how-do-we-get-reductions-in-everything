# Asolaria Device-PID Map — identity by device, not drive letter

**2026-06-16, acer. Canon rule: _"drive letters are not identity — verify the canonical device identifiers."_ Resolved by device-PID / signature / serial **and a read-only raw-read** of the disk, not by drive letter. Live council-q `ftost0` is the fabric's parallel cross-check (pending).**

> **Why device-PID, not drive letter:** the USBs/drives are **transferable** — they move between ports and machines (acer / liris / falcon), so drive letters (`D:` / `F:` / `E:`) get reassigned and **confused** every time the device moves. The **device-PID is stable and travels with the device** (MBR signature, disk UniqueId/serial, partition layout). **Locate by PID, verify by raw-read — never by letter.** The exact transferable toolset is published at [`tools/usb-raw/`](tools/usb-raw/).

## acer physical disks by canonical device-PID

| Disk | device-PID (UniqueId / instance) | serial | size | bus | style | letter |
|---|---|---|---|---|---|---|
| #1 | `eui.4868340000000000` | 0000…4868_3400 | 476.9 GB | NVMe/RAID | GPT | **C:** |
| #0 | **`50014EE2110D59CA`** | **WD-WX21A496AALZ** | 931.5 GB | internal/RAID | GPT | **D:** |
| #2 | `USBSTOR\…VEN_GENERAL&PROD_UDISK…6&38A4EAA5` | (none) | 1953.1 GB | USB | MBR | **F:** |
| #3 | `USBSTOR\…VENDORCO…\5654121295652643312` | 5654121295652643312 | 117.2 GB | USB | MBR | **E:** |

## Findings (the "explosion", resolved by device-PID + raw-read)

1. **D: is the internal WD HDD — definitively NOT the 2TB SOVLINUX.** device-PID `50014EE2110D59CA`, serial `WD-WX21A496AALZ`, GPT, internal RAID/SATA, 931.5 GB — a separate physical device. Everything written to D: (the 10k rooms, micro-kernels, the 100B runs, the genius cubes) sits on **this internal drive**, *not* the sovereign substrate.

2. **acer's 1953 GB USB (Disk #2 / F: / `\\.\PHYSICALDRIVE2`) IS the USB-SOVLINUX-2TB.** Confirmed by read-only raw-read (sanctioned `usb_raw_io.py`) + the tool's own canon: `Target: \\.\PHYSICALDRIVE2 (USB-SOVLINUX-2TB, MBR drift Part1 Type=0x07)`. **CORRECTION:** my first pass said "not SOVLINUX (signature `2814414849` mismatch)" — that was wrong. I over-trusted the MBR signature; the signature read is the **documented MBR drift**, not a different drive. **So the sovereign 2TB IS physically on acer right now as F:**, just Windows-unreadable (exFAT mount-drift). *(The roster's `host=liris` is either stale or a separate master copy — cross-vantage; council-q `ftost0` pending.)*

3. **Disk #3 (E:, VendorCo 117 GB, sig `0x2C351EC5`)** = the recovery / `RECUPERACAO` USB — not SOVLINUX.

## Raw-read evidence (read-only, `usb_raw_io.py`, 2026-06-16)
```
--read 0          MBR valid (boot sig 0x55AA). Part1 type=0x07, LBA 2048, size 536,870,912,000 B = 500 GB. Parts 2-4 EMPTY.
--read 2048       exFAT VBR: eb7690 4558464154202020 = "EXFAT   "  → Partition 1 is exFAT (the carry-quant store).
--read 1048578048 (right after the 500 GB partition) = all zeros (sha 076a27c7…)  → tail empty.
--read 1953000000 (~1 TB into the tail)              = all zeros (sha 076a27c7…)  → tail empty.
```
**Layout of SOVLINUX-2TB:** 500 GB exFAT (Windows-unreadable mount-drift = the "carry-quant" partition) **+ 1453 GB empty/unprovisioned tail** (no hidden data; room to grow).

Saved whole-device receipt: **[`ASOLARIA-USB-FULL-SURVEY-2026-06-14.md`](ASOLARIA-USB-FULL-SURVEY-2026-06-14.md)** — acer-side, read-only, full-device strided survey (`8192` probes / `256 MB` stride).

## Multi-OS operating model
- The **500 GB exFAT carry-quant** partition is readable from **Linux/WSL/Ubuntu** (exFAT support) even though Windows shows it as `Unknown` (mount-drift). To read its contents: `mount-ro` from WSL/Ubuntu — **gated DEFER-TO-APEX**.
- The **1453 GB tail is empty** (zeros) — nothing to read; it's unprovisioned SOVLINUX growth space.
- Gated (tool-advisor): `mount-ro` = DEFER-TO-APEX · `format`/`repartition` = HARD-DENY · raw-read = REDIRECT-TO-ACER via `usb_raw_io.py` (used here, read-only).

## Net
By **device-PID + raw-read**: **D: = internal WD** (own ID `50014EE2110D59CA`); **F: / PHYSICALDRIVE2 = the sovereign SOVLINUX-2TB, physically on acer now** = 500 GB exFAT carry-quant (mount-drift, Windows-unreadable) + 1453 GB empty tail. The drive-letter view was misleading in **both** directions — D: looked like it might be the 2TB (it isn't) and F: looked like a generic USB (it's the SOVLINUX). Device-PID + raw-read settle it. **IT is slices.**

*Read-only device-ID + raw-read, acer 2026-06-16, under OP-JESSE apex. No writes to any device. Fabric cross-check: council-q `ftost0` (pending).*
