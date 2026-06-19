# 19-old-system

Source path: C:/Users/acer/Downloads/OLD system.jpg

## VERBATIM

(Two-column table; header row "Component" | "Value")

Component | Value
CPU | Intel Core i5-8300H (Coffee Lake, Family 6 Model 158 Step 10)
Cores/Threads | 4C/8T @ 2.30 GHz
RAM | 16 GB
BIOS | Insyde Corp. V1.28 (2019-08-04)
Board | CFL / Freed_CFS
VT-x | DISABLED in BIOS
Secure Boot | Query needs admin - likely enabled (Win11)
TPM | Query needs admin
Thunderbolt | None - USB 3.1 xHCI is the fastest external bus
Device Guard/HVCI | Unknown (needs admin)

## NUMBERS

- i5-8300H
- Coffee Lake
- Family 6
- Model 158
- Step 10
- 4C/8T (4 cores / 8 threads)
- 2.30 GHz
- 16 GB (RAM)
- V1.28 (BIOS version)
- 2019-08-04 (BIOS date)
- Win11
- USB 3.1 (xHCI)

## PIDS-ROOMS-GLYPHS

(none visible)

## ENGINES-SYSTEMS

- Intel Core i5-8300H CPU (Coffee Lake)
- Insyde Corp. BIOS V1.28
- Board: CFL / Freed_CFS
- VT-x (hardware virtualization) — DISABLED in BIOS
- Secure Boot (likely enabled on Win11)
- TPM
- Thunderbolt (None present)
- USB 3.1 xHCI (the fastest external bus on this machine)
- Device Guard / HVCI

## TIMESTAMPS

- 2019-08-04 (BIOS build date)

## CLAIMS

- "VT-x: DISABLED in BIOS" — hardware virtualization is off in firmware.
- "Secure Boot: Query needs admin - likely enabled (Win11)".
- "TPM: Query needs admin".
- "Thunderbolt: None - USB 3.1 xHCI is the fastest external bus" — i.e. the fastest external bus available on this machine is USB 3.1 xHCI (no Thunderbolt), which frames why the 2TB USB / xHCI raw-I/O path is the external-data lane.
- "Device Guard/HVCI: Unknown (needs admin)".

## CONTEXT

This artifact is a system-capability audit table of the "OLD system" — the i5-8300H / Coffee Lake / 16 GB laptop that is the acer host on which Asolaria runs. It records the exact silicon and firmware constraints the build had to work within: a 4-core/8-thread 2.30 GHz CPU, 16 GB RAM, Insyde BIOS V1.28 (2019), VT-x disabled in BIOS (no hardware virtualization), no Thunderbolt (so USB 3.1 xHCI is the fastest external bus), and admin-gated/unknown Secure Boot, TPM, and Device Guard/HVCI status. It is the "constraints sheet" that explains downstream architecture choices (no-SHA-NI / 4-core shell-less backend, USB-as-external-bus, raw xHCI USB I/O for the 2TB drive).
