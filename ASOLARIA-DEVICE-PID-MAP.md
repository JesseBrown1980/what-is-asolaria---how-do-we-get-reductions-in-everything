# Asolaria Device-PID Map — identity by device, not drive letter

**2026-06-16, acer. Canon rule: _"drive letters are not identity — verify the canonical device identifiers before any USB operation."_ This resolves the "is D: actually the 2TB drive?" question by **device-PID / signature / serial**, not letter. Read-only (`Get-Disk`/`Get-Partition`). Cross-checked against the fabric roster's canonical SOVLINUX signature `2814414849`. Live council-q `ftost0` is the fabric's parallel authoritative answer (pending).**

## acer physical disks by canonical device-PID

| Disk | device-PID (UniqueId / instance path) | serial | MBR sig | size | bus | style | letter |
|---|---|---|---|---|---|---|---|
| #1 | `eui.4868340000000000` (scsi…nvme) | 0000…4868_3400 | — (GPT `{53f57a3d…}`) | 476.9 GB | NVMe/RAID | GPT | **C:** |
| #0 | **`50014EE2110D59CA`** (scsi…wdc_wd10spzx) | **WD-WX21A496AALZ** | — (GPT `{16f0f671…}`) | 931.5 GB | internal/RAID | GPT | **D:** |
| #2 | `USBSTOR\DISK&VEN_GENERAL&PROD_UDISK&REV_5.00\6&38A4EAA5&0` | **(none)** | **(no sig)** | 1953.1 GB | USB | MBR | **F:** (500 GB) |
| #3 | `USBSTOR\…VENDORCO&PROD_PRODUCTCODE…\5654121295652643312` | 5654121295652643312 | `0x2C351EC5` (741678789) | 117.2 GB | USB | MBR | **E:** (32 GB FAT32) |

**Fabric canonical SOVLINUX signature = `2814414849` (`0xA7C09001`) → matches NO attached disk.**

## Findings (the "explosion", resolved by device-PID)

1. **D: is the internal WD HDD — definitively NOT the 2TB SOVLINUX.** device-PID `50014EE2110D59CA`, serial `WD-WX21A496AALZ`, GPT, internal RAID/SATA, 931.5 GB — a separate physical device with its own canonical ID. Everything written to D: (the 10k rooms, micro-kernels, the new+old 100B runs, the genius cubes) sits on **this internal drive**, *not* the sovereign substrate. **No explosion.**
2. **acer's 1953 GB USB (Disk #2 / F:) does NOT carry the canonical SOVLINUX signature `2814414849`.** It is a generic **"General UDisk" with no serial and no matching signature**. The fabric roster lists SOVLINUX as **host=liris**. So by device-PID, **the canonical 2TB SOVLINUX is not physically on acer right now** — acer's Disk #2 is a *different / unidentified* generic 2TB USB; the sovereign SOVLINUX lives **liris-side**.
3. **Disk #3 (E:, VendorCo 117 GB, sig `0x2C351EC5`)** = the recovery / `RECUPERACAO` USB — not SOVLINUX.

## Multi-OS operating model (corrected)
- The canonical **SOVLINUX is liris-side** → its native partition is operated from **liris's Linux/SOVLINUX**, not acer's Windows.
- acer's Disk #2 (generic 1953 GB USB) exposes F: (500 GB NTFS) + ~1453 GB unmounted; the unmounted tail would need **WSL/Ubuntu raw-disk read** to inspect — but it is **not** the signature-confirmed SOVLINUX, so treat it as an **unidentified USB** until the fabric/operator confirms its device-PID.
- Gated (tool-advisor): `mount-ro` = DEFER-TO-APEX · `format`/`repartition` = HARD-DENY · raw-read = REDIRECT-TO-ACER via `usb_raw_io.py`.

## Net
By **device-PID** (the canon's identity rule), the drive-letter fear is fully resolved: **D: = internal WD (own ID `50014EE2110D59CA`); the canonical SOVLINUX = liris-side (sig `2814414849`, absent on acer by signature); acer's F: = a separate generic 1953 GB USB.** Drive letters were misleading; device PIDs are not. **IT is slices.**

*Read-only device-ID check, acer 2026-06-16, under OP-JESSE apex. Fabric cross-check: council-q `ftost0` (pending).*
