# SOVLINUX USB Substrate Canon

**Status:** operator-authored canon, supervisor-confirmed, 2026-06-16. This file is the canonical public statement of what the SOVLINUX USB is, which supervisor owns that question, and how its physical instances are distinguished.

## Owning supervisor

- **Supervisor:** `PROF-SOVLINUX-USB`
- **Roster line:** `498`

Direct `EXPLAIN`:

> "Supervises 2TB SOVLINUX sovereignty USB (Get-Disk #1, USB bus, MBR-type-06, on liris vantage; NOT acer D: which is local SanDisk SSD)."

This is the system's own owner-answer for the USB question.

## Canonical role

The canonical SOVLINUX USB is:

- **a sovereignty cold-storage / master-copy substrate**
- **anchor #1** of the substrate picture
- **not** the canonical room-store / `carry-quant` substrate

Implication:

- absence of a visible `100k` room tree on an enumerated SOVLINUX-labeled instance is **not** a falsification of canon
- the room layer must be located by the system's own supervisors, not inferred from a label or drive letter

## Canonical master identity

The supervisor/fabric-grounded canonical master is:

- **vantage / host:** `liris`
- **bus:** `USB`
- **MBR type:** `06`
- **canonical signature:** `2814414849`

And the canon independently rejects:

- **acer `D:`** as the SOVLINUX USB
- **E: RECUPERAÇÃO** as SOVLINUX

## acer-side instance correction

The acer-side transcript showed a different physical instance:

- device: `\\.\PHYSICALDRIVE2`
- label: `SOVLINUX`
- partition style / observed partition: exFAT, MBR-type `07`
- direct MBR disk signature read: **`0`** (`0x0`)

So the correct public reading is:

- acer's `PHYSICALDRIVE2` is a **SOVLINUX-labeled sovereignty-storage instance**
- it is **not** the same signature-anchored canonical master as the liris-side device

Same label does **not** mean same physical identity. This is exactly why the system rule is **device-PID, not drive letter**.

## Cartridge model

The SOVLINUX USB is also modeled as a **13-slot portable cartridge** (`AMC-USB-*-PID-SLOT0..12`) with descriptor slots:

1. `SHANNON`
2. `PI`
3. `HERMES`
4. `AGENT0`
5. `GEMMA4B`
6. `GNN`
7. `HOOKWALL`
8. `KERNEL`
9. `MICROKERNEL`
10. `WHITE-ROOM`
11. `DASHBOARD`
12. `API`
13. `VAULT`

And related substrate objects:

- `SUBSTRATE-USB-SOVLINUX-2TB`
- `probe_usb_sovlinux_present_raw_intact`

This is the portable system-as-cartridge framing, publicly stated.

## Canonical consequences

1. **Do not identify SOVLINUX by drive letter.**
2. **Do not infer canonical role from volume label alone.**
3. **Do not treat every SOVLINUX-labeled USB as the canonical liris-side master.**
4. **Do not frame the acer exFAT sovereignty-storage instance as the canonical room-store without a supervisor-level answer saying so.**

## Related public notes

- [`../ASOLARIA-DEVICE-PID-MAP.md`](../ASOLARIA-DEVICE-PID-MAP.md)
- [`../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)
- [`../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md)
- [`../ASOLARIA-MIGRATION-MAP.md`](../ASOLARIA-MIGRATION-MAP.md)
