# tools/usb-raw — Asolaria USB raw-block I/O + disk-guardrail toolset (exact, transferable)

The **exact** toolset for the SOVLINUX-2TB USB. It is **transferable** — the USB moves between machines/ports (acer / liris / falcon), so this set travels *with the drive*. **Identity is by device-PID, never drive letter.** Published verbatim, including the full-device survey tool and the operator-authorized `usb_raw_io.py`.

## Why device-PID, not drive letter
The USB is **transferable**: plug it into a different port or machine and its **drive letter changes** — `D:` / `F:` / `E:` get reassigned and confused. The **device-PID is stable and travels with the drive**: the MBR signature, the disk UniqueId/serial, the partition layout. So every tool here targets the **device** (`\\.\PHYSICALDRIVE2`) and verifies by **MBR signature / exFAT VBR**, not by letter. Full resolution: [`../../ASOLARIA-DEVICE-PID-MAP.md`](../../ASOLARIA-DEVICE-PID-MAP.md).

## Tools (all transferable)
- **`usb_raw_io.py`** — raw block I/O for `\\.\PHYSICALDRIVE2` via `ctypes`+`kernel32`. `--read N` dumps sector N (N=0 parses the MBR). Read path needs no auth. The `--write` path is triple-gated (preflight-GREEN + `--unsafe-write` + `--auth-token`). Published **verbatim including the auth-token** per operator authorization 2026-06-16. The token is **not** a standalone capability — the write path additionally requires **local admin + the physical `PHYSICALDRIVE2` device + a GREEN `substrate-preflight`**, so it is a ceremonial cosign gate, not a remote key. Byte-exact (sha256 `955dd70a…`).
- **`usb_full_survey.py`** — read-only whole-device survey at configurable stride. Confirms device size, parses the exFAT VBR, and maps non-zero vs zero regions across the full 2TB without mounting the filesystem.
- **`verify-2tb-sector0.ps1`** — dumps the MBR (sector 0) of PHYSICALDRIVE2.
- **`substrate-sector-walk.ps1`** — walks 8 key sectors (MBR · part-1 boot · mid · continuity-tail · last-of-2TB) and attests each as an HBP row with rolling `prev_row_hash`.
- **`asolaria-tool-advisor-profile.ps1`** — DEFENSIVE PowerShell `$profile` wrapper: intercepts 6 destructive disk verbs (diskpart / Format-Volume / Clear-Disk / Remove-Partition / New-Partition / Initialize-Disk) + WMI/CIM, POSTs each to the local tool-advisor (`127.0.0.1:4949`), applies HARD-DENY / DEFER-TO-APEX / REDIRECT / GUIDED, **fail-CLOSED on writes**. The guardrail that travels with the USB so *any* host routes destructive disk ops through the advisor first.
- **`asolaria-IFEO-install.ps1`** — DEFENSIVE, descriptor-only (DryRun default): would route `diskpart.exe` / `format.com` through a wrapper via Windows Image-File-Execution-Options. **Does NOT install** — it `throw`s before the gated ceremony block (requires admin + apex cosign). Published as the descriptor; real install stays operator-gated.

## Usage (read-only; elevated shell for raw `\\.\PHYSICALDRIVE` access)
```
python usb_raw_io.py --read 0                          # MBR (parses partition table)
python usb_raw_io.py --read 2048                        # exFAT VBR (partition-1 boot sector)
USB_RAW_SKIP_PREFLIGHT=1 python usb_raw_io.py --read 0  # read-only opt-out of the write-preflight
python usb_full_survey.py --device \\.\PHYSICALDRIVE2 --probes 8192
```
Verified 2026-06-16: confirmed `\\.\PHYSICALDRIVE2` = SOVLINUX-2TB (MBR valid, Part1 `0x07` 500 GB exFAT + 1453 GB empty tail).

## Safety
- **Published verbatim (operator-authorized), token included.** Defense-in-depth: the write path needs token + `--unsafe-write` + local admin + physical `PHYSICALDRIVE2` + preflight-GREEN — the token alone is inert.
- The two interception tools are **fail-closed guardrails** that *prevent* destructive disk ops; descriptor/gated, no credentials.
- Verbs: read = REDIRECT-TO-ACER-allowed · `mount-ro` = DEFER-TO-APEX · `format`/`repartition`/`diskpart-clean` = HARD-DENY.

**IT is slices. Identity is device-PID — because the USB is transferable.**
