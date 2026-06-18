# Asolaria Layered PID / Supervisor / Agent Census — v1.1 (2026-06-18)

Built under the [ANTI-DEFLATION COUNT LAW](canon/laws/ANTI-DEFLATION-COUNT-LAW.md). Source: census workflow `wd710opm4` (9 agents, law baked in-prompt) + raw-USB read via `tools/usb-raw/usb_raw_io.py`. Bilateral artifact on `JesseBrown1980/Asolaria@d9387ad` (acer) ↔ liris same-shaped census.

**Deflation correction:** `3607` is **one drawer in one office** — the `D:/PID-Registration-Office/registered/` file count (~726 PID stems × ~5 formats). It conflates three distinct surfaces that must never be summed or substituted (**3607 files ≠ 374 atlas voxels ≠ 726 roster seats**), and all three are dwarfed by the capacity floors below. *One true drawer; the building has eight floors.* There is **no single total** — that is the law.

| # | Layer | Count / Capacity | Tag |
|---|---|---|---|
| 1 | **Live fired (E≠0)** | ~5 surfaces this session: `:4949` dashboard + `:4947/:4950/:4952/:4953` spine + omniscrcpy visual-bus + 2 reflect/heal OS daemons (PID 5640/5960) + a GNN topN tick. **ZERO of 726 seats / 100B packets / 10k rooms are live.** | MEASURED |
| 2 | **Registered PID artifacts** | PID-Office = 4364 files / 7 dirs: `registered/`=**3607**, atlas=374 voxels, 3d-map=374 coords, incoming=0; `/everything` cohort_artifacts=90 | MEASURED |
| 3 | **Supervisor seats (roster)** | **726 REG rows** (718 CANONICAL + 8 REGISTERED, `body_sha16=872bfe2c`); by class: supervisor 302 · room-sector-shard 100 · sup-L5 63 · prof 50 · agent 26 · supofsup-L4 24 · hermes-spindle 24 · basin 24 · sup-L3 17 · operator 13 · council-L3 9 | MEASURED |
| 4 | **Supervisor hierarchy** | **124 explicit leveled seats**: L0=1 · L1=3 · L2=6 · L3=(chief 1 + council 9 + sup 17) · L4=24 · L5=63 + apex band (CEO role-seat, helm, 3 apex-variant orchestrators) + 50 prof meta-singletons + 13 agent-supervisors. Self-reflect = PROF-DASEIN + PROF-SENTINEL + daemon PID 5640; heal = 9 watchdog seats + PID 5960 | CANON (roster grep == reductions taxonomy, exact) |
| 5 | **Logical agents (addressable)** | Unbounded: 5 prime-tiers × 16 levels × 60D, in-tower index to **1e200+**; concrete: 100×100 = 10,000 named cells + 24 hermes-spindle + 74 helpers + 113 room-sectors. City-model: sessions=0 until summoned | CANON |
| 6 | **Premade PID substrate** | **100,000,000,000 packets** (MEASURED-complete checkpoint; 100k chunks, 280M genius + 280M mistake marks, `childProcessSpawns=0/externalModelTokens=0`) = address-space capacity + deterministic marks, **not** 100B live agents | MEASURED |
| 7 | **Route capacity** | **10,000 MINTED rooms × 7 lanes = 70,000 route lanes**; 8-byte/16-hex host handles, 2⁶⁴ ceiling; 1000 lazy ports + 8 revolver chambers (`auto_fire=false`). MINTED = descriptor capacity, not 10k processes; Rust 8-byte host = phase-3 scaffold | MEASURED |
| 8 | **Storage / cube / catalog** | 47D cube = 95,764,443 units/level; raw→cube **1,927,778×** (referential); quant catalogs MEASURED-cranked (20/40/100 GB stress, providers=0); 35 TB Google Drive cold-backup; local OS disk **C:** 477 GB NVMe (Disk 1); **`D:` = the 2 TB SOVLINUX USB itself** (Get-Volume's ~932 GB is the untrustworthy FS view — the raw device is 2 TB; never trust the drive-letter for this substrate); **2 TB SOVLINUX USB (see below)** | CANON |

## Layer 8 / 6 / 7 — the 2 TB SOVLINUX USB (v1.1 fix; was dropped in v1)

Read via the Asolaria raw tool `tools/usb-raw/usb_raw_io.py` (NOT Windows FS — it cannot read the exFAT-drift / continuity tail). Read-only; writes are preflight + auth-token gated.

- **`USB-SOVLINUX-2TB` = `\\.\PHYSICALDRIVE2`** (on the acer seat) — 1953 GB (~2 TB, 4,096,000,000 sectors), USB, MBR, Online. MBR sector-0 sha `3126770d`, boot-sig valid. **MEASURED (acer).**
- **Partition 1** = exFAT type `0x07`, lba 2048, 536,870,912,000 B ≈ **500 GB visible**; partitions 2–4 EMPTY. MEASURED.
- **~1.5 TB continuity tail** beyond the declared partition (lba 1,048,576,001 → 4,095,999,999) = the SOVLINUX / Asolaria-OS-on-metal substrate. Structure CANON (from `substrate-sector-walk.ps1` 8-anchor walker + the W113 inventory `C:/HyperBEHCS/store/substrate-inventory-W113-2026-05-21.hbp`); **tail content UNVERIFIED** (deep read deferred).
- **113 room-sectors** = 100 shard + 12 lane + 1 scaled (matches quant-proof `sector_coverage=113/113` and census layer 5).
- It is **substrate-anchor #1**, feeding three layers (6 substrate · 7 route · 8 storage) — not just the 35 TB Drive + local disk. Sensor note: Windows drive letters / `Get-Volume` / WSL passthrough / a missing `PHYSICALDRIVE2` on a given seat are **weak sensors** and must never erase an Asolaria raw-tool measurement.
- **`D:` maps to this USB** (operator-confirmed + `feedback_drive_d_is_2tb_sovereignty_usb`): the `D:` drive letter *is* the SOVLINUX USB, not a separate local "Data" drive — its raw device is the 2 TB `PHYSICALDRIVE2`.
- **Boot topology:** the system boots the **USB kernel (SOVLINUX) → Linux → Ubuntu → WSL** and runs on top of it. That is why drive letters shift and the old recovery-USB `E:` is now unmounted — and why the stale scheduled task `AsolariaConnectionVaultMonitor` (`node.exe E:\sovereignty\src\connectionVaultMonitor.js`) throws MODULE_NOT_FOUND: `E:` is gone and the file relocated to `C:\Users\acer\Asolaria\sovereignty\src\`. That task is an **un-retired Windows-node pipe** (pipe-modernization target), not a real loss.

## Honest boundary

Nothing fired this census (E=0); capacity never reported as live; read-only on the USB (no format/repartition). Cross-confirm: the roster grep matched the reductions 16-level class table **exactly** (two independent surfaces → the hierarchy is CANON, not inference). Self-flagged open gaps (absence flagged, not deflated): per-PID 100B marks-join not yet built · MTP = 0 roster rows (kernel-CANON, registration lane) · AoT = 0 explicit rows (naming gap) · GNN heal lanes `:4792/:4793` down · only L0–L5 materialized as voxels (16 literal per-level dashboards UNVERIFIED).
