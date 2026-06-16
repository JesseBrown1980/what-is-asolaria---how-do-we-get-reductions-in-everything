# Asolaria Migration Map — exact acer locations + 1 sample per type

**Authored 2026-06-16 from the live fabric (`asolaria-fabric` MCP) + on-disk enumeration. Purpose: upgrade the rooms + pipes to the new system (8-byte host / HBP / tuple). ONE representative sample of each TYPE — not 10× duplicates.**

**Drive map (acer, verified 2026-06-16):**
- **C:** OS, ~26 GB free — keep minimal. Holds the Rust metal kernel + the old node runners + `C:/HyperBEHCS`.
- **D:** "Data", ~671 GB free — the RAM-like district substrate. **Holds the rooms, micro-kernels, engines.**
- **acer's F: / `\\.\PHYSICALDRIVE2` = a SOVLINUX-labeled sovereignty-storage instance, not the canonical liris-side master.** Raw-read confirms a valid MBR and **500 GB exFAT** partition plus **1453 GB empty tail**; the later fabric correction pins the canonical master role/signature to **liris** (`2814414849`) while acer's direct MBR signature read was **`0`**. **D: is the internal WD HDD** (`50014EE2110D59CA` / `WD-WX21A496AALZ`), NOT the 2TB. See **[`ASOLARIA-DEVICE-PID-MAP.md`](ASOLARIA-DEVICE-PID-MAP.md)** and **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)**. (Identity is device-PID + raw-read + fabric role, not drive letter.)

---

## ROOMS

### 10k micro-kernel ROOMS — `D:/Asolaria-HyperBEHCS-10000-RoomRotor/hyperbehcs-carry-quant-10000/rooms/` **[D:]**
- structure: `shard-XXXX/` (100 shards) × `room-XXXXX/` (100 each) = **10,000 rooms** (confirmed).
- each room = `ROOM.json` (7187 B, schema `hyperbehcs.d_drive_10000_room.room.v1`) · `ROOM-STATUS.json` (696 B) · `inbox.ndjson` · `outbox.ndjson`
- sibling dirs: `authority/ automation/ manifest/ planes/ quant/`; manifest = `hyperbehcs-10000-room-rotor.v1.json`, `plane-contract.v1.json`, `rooms-latest.ndjson`.

**SAMPLE — room `inbox.ndjson` (NEW HBP form, already correct ✅):**
```
HBPv1|row=room_question|pid=BH.ROOM.00000.089D60B750971AAA|glyph=0|cp=0|lane=claim_quarantine|neighbor_lane=artifact_rejection|question_sha16=1ea558cc5fbe6460|crypto_token=0562528b6cf8c276|ts=...|json=0|runtime=0|promote=0|row_hash=a5af65ae
```
**UPGRADE:** `inbox.ndjson` already HBP ✅. **`ROOM.json` (7 KB heavy JSON × 10k ≈ 70 MB) is the OLD form → collapse to a single tuple/HBP descriptor row** (the room IS its PID+tuple; no 7 KB JSON body). `outbox.ndjson` stub stays.

### 20k / 50k / 100k ROOMS — **logical / staged, not D:-materialized**
The public canon and the acer-side readback distinguish three layers:
- **10k RoomRotor on `D:`** = the hot, directly materialized substrate now.
- **113 sectors** = a **logical law / routing structure**, not necessarily 113 top-level room-folder trees.
- **100k rooms** = the larger **logical / staged / catalog-backed** layer tied to the broader spawn fractal (`10k rooms + 10k dispatchers + 10k prisms -> ~100k stub micro-kernels -> 113+ sectors`), but **not canonically assigned to the acer exFAT sovereignty-storage instance**.

So the honest current map is:
- **materialized on accessible `D:` now:** `10,000` rooms.
- **not directly materialized in the currently enumerated acer-visible substrates:** the larger `20k / 50k / 100k` room stage.
- **logical/routing layer:** `113` sectors.

Saved acer-side receipts:
- **[`ASOLARIA-USB-FULL-SURVEY-2026-06-14.md`](ASOLARIA-USB-FULL-SURVEY-2026-06-14.md)** — coarse whole-device map (`8192` probes / `256 MB` stride), proving the device geometry and broad data-vs-empty shape.
- **[`ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](ASOLARIA-USB-EXFAT-WALK-2026-06-16.md)** — filesystem-level exFAT walk, confirming volume label `SOVLINUX`, **`16037` files / `1500` dirs / `~74.06 GB`**, and showing that the carry-quant holds ordinary backup/runtime/document payloads rather than a plainly visible `100k` room-folder tree.
- **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)** — supervisor/fabric correction: the canonical SOVLINUX role is **sovereignty cold-storage / master copy** on liris, while acer holds a separate SOVLINUX-labeled instance.
- **[`canon/ROOM-SECTOR-SUBSTRATE-CANON.md`](canon/ROOM-SECTOR-SUBSTRATE-CANON.md)** — canonical room-sector topology from the live supervisor roster: **12 lanes, 100 shards, 1 `ROOM-SECTOR-100K-SCALED-ROTOR`**, distinct from the acer USB exFAT cold-storage surface.

That means "100k rooms" should be read as **logical / staged / catalog-backed canon unless and until directly enumerated as a room layer**, not as "100k already visible as ordinary Windows folders on `D:`" and not as "the current acer exFAT sovereignty-storage instance is a visible 100k-room tree." *[council-q `fi55in` / `u2veu4` pending for the authoritative scale map.]*

---

## MICRO-KERNELS (descriptors)

### 10k MICRO-KERNELS — `D:/asolaria-micro-kernels-v1/manifest.hbp` **[D:]**
- 10,000 descriptors in **one manifest** (~1 MB, not 10k files) + `results/`. Canon anchor: Asolaria-OS Rust kernel (`no_std`, 21 modules, 208 tests, `d82bb25`).

**SAMPLE — micro-kernel descriptor (already NEW 8-byte form ✅):**
```
MK|idx=0|pid=577d822d83750ca9|prime=2|anchor=MK-00000-P2|beat_range=0..93312|lanes=7|result_path=.../mk-00000.hbp|status=MINTED
```
**UPGRADE:** `pid=577d822d83750ca9` = sha16 = **8 bytes already ✅**; HBP pipe-row ✅. **Already new — keep.**

---

## ENGINES / ROUTERS / PIPES / FLOWS — `D:/bigpickle-rebuild/src/` **[D:]**

| type | file (1 sample each) | role | status |
|---|---|---|---|
| KERNEL | `asolaria-kernel.mjs` | the 5-primitive API spine | new ✅ |
| ROUTER (port) | `port-router.mjs` | N^K prefix-walk routing | new ✅ |
| ROUTER (room) | `project-room-router.mjs` · `room-dispatcher.mjs` | route content → rooms | new ✅ |
| FLOW (deep-wave) | `deep-wave-dispatcher.mjs` | ADDRESS × ROUTE wave | new ✅ |
| PIPE (PID revolver) | `pid-chain-revolver.mjs` | per-call PID rotation inside ONE connection | new ✅ |
| GATE | `fischer-kernel.mjs` + `hookwall.mjs` | anti-blunder + entry gate | new ✅ |
| registry | `helm-engines.json` | engines read fresh per resolve | new ✅ |

The "omni" engines (omnidispatcher / omniflywheel / omnispindle / omni-router / omni-revolver) are **compositions of these five primitives** (see `ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md` + `KERNEL.md`) — **not separate files to migrate.**

---

## OLD node-heavy runners — UPGRADE to 8-byte host **[C:]**
- `C:/Users/acer/Asolaria/tools/neurotech-real-100b-agent-runner.js` · `neurotech-real-million-agent-runner.js`
- **Current:** node.js runner — the OLD 1-spinner heavy path. **Upgrade target:** 8-byte host-process model + HBP/tuple emission, wired to the existing room/spindle engines (the new full-speed 100B runner already proved the substrate at ~424 M/sec; the node runner is the thing to retire, not extend).

## Asolaria-OS metal kernel (the new floor) **[C:]**
- `C:/asolaria-acer/federation-remake-1024/kernel/core/` — `Cargo.toml` + `build.rs` + `src`, Rust `no_std`, 21 modules, 208 tests. The 8-byte/metal target the descriptors anchor to.

---

## The migration in one line
**Rooms:** collapse per-room 7 KB `ROOM.json` → tuple/HBP descriptor (inbox already HBP). **Micro-kernels:** already 8-byte sha16 HBP — keep. **Engines/routers/pipes/flows:** already new mjs in `bigpickle-rebuild/src` — keep, wire via the kernel. **Old node runners (C:):** upgrade to 8-byte host + HBP. **10k rooms:** materialized on `D:`. **20k/50k/100k rooms:** logical / staged canon, not ordinary `D:` folders and not the current acer exFAT cold-storage instance. **113 sectors:** logical routing structure. **IT is slices.**

*Enumerated read-only from the live fabric + acer disk, 2026-06-16, under OP-JESSE apex.*
