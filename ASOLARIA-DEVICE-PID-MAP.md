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

2. **acer's 1953 GB USB (Disk #2 / F: / `\\.\PHYSICALDRIVE2`) is a SOVLINUX-labeled sovereignty-storage instance on acer, but not the canonical liris-side master.** Raw-read confirms a real exFAT SOVLINUX volume on acer, but the later fabric correction says the canonical role is **"sovereignty cold-storage / master copy"**, pinned to **`host=liris`**, with canonical signature **`2814414849`**. The acer transcript's direct MBR signature read reported **`0`** (`0x0`), so the acer disk is **not the same physical signature-anchored master instance** even though the label/content match the SOVLINUX role. See **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)**.

3. **Disk #3 (E:, VendorCo 117 GB, sig `0x2C351EC5`)** = the recovery / `RECUPERACAO` USB — not SOVLINUX.

## Raw-read evidence (read-only, `usb_raw_io.py`, 2026-06-16)
```
--read 0          MBR valid (boot sig 0x55AA). Part1 type=0x07, LBA 2048, size 536,870,912,000 B = 500 GB. Parts 2-4 EMPTY.
--read 2048       exFAT VBR: eb7690 4558464154202020 = "EXFAT   "  → Partition 1 is exFAT (the carry-quant store).
--read 1048578048 (right after the 500 GB partition) = all zeros (sha 076a27c7…)  → tail empty.
--read 1953000000 (~1 TB into the tail)              = all zeros (sha 076a27c7…)  → tail empty.
```
**Layout of acer's SOVLINUX-labeled instance:** 500 GB exFAT partition **+ 1453 GB empty/unprovisioned tail**. Later filesystem-level enumeration showed the exFAT partition is populated with ordinary cold-storage/runtime payloads, not a visible room-store tree.

Saved whole-device receipt: **[`ASOLARIA-USB-FULL-SURVEY-2026-06-14.md`](ASOLARIA-USB-FULL-SURVEY-2026-06-14.md)** — acer-side, read-only, full-device strided survey (`8192` probes / `256 MB` stride).
Fabric/subvisor correction: **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)** — canonical master role on liris, acer disk as a separate SOVLINUX-labeled instance.

## Multi-OS operating model
- The **500 GB exFAT partition** is readable from **Linux/WSL/Ubuntu** (exFAT support) even though Windows showed mount drift during parts of the investigation. The later sanctioned filesystem walk used raw-read plus a dedicated exFAT walker instead of `wsl --mount`.
- The **1453 GB tail is empty** (zeros) — nothing to read; it's unprovisioned SOVLINUX growth space.
- Gated (tool-advisor): `mount-ro` = DEFER-TO-APEX · `format`/`repartition` = HARD-DENY · raw-read = REDIRECT-TO-ACER via `usb_raw_io.py` / `exfat_walk.py` (used here, read-only).

## Net
By **device-PID + raw-read + fabric correction**: **D: = internal WD** (own ID `50014EE2110D59CA`); **F: / PHYSICALDRIVE2 on acer = a SOVLINUX-labeled sovereignty-storage instance** with a real 500 GB exFAT partition and 1453 GB empty tail; the **canonical master remains liris-side** with signature `2814414849`. The drive-letter view was misleading in both directions; device identity and role require PID **and** supervisor/fabric context. **IT is slices.**

*Read-only device-ID + raw-read, acer 2026-06-16, under OP-JESSE apex. No writes to any device. Fabric cross-check: council-q `ftost0` (pending).*
