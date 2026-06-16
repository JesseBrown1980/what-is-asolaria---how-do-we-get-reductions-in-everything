# Room-Sector Substrate Canon

**Status:** operator-authored canon, live-fabric-backed, 2026-06-16. This file is the canonical public statement of what the room-sector substrate is known to be from the live supervisor roster and substrate map, and what is still an honest visibility gap.

## What the live fabric proves

From the live H03 supervisor roster and H02 substrate/subsystem framing, the room-sector layer is a **real canonical substrate lane**, not an invented label:

- `root.by_class.substrate_root_or_room_sector = 127`
- `root.by_layer.room-sector-lane = 12`
- `root.by_layer.room-sector-shard = 100`
- `root.by_layer.room-sector-scaled = 1`
- `root.by_sector.room-sector-lane = 12`
- `root.by_sector.room-sector-shard = 100`
- `root.by_sector.room-sector-scaled = 1`

That means the system itself currently publishes a room-sector substrate made of:

1. **12 lane supervisors**
2. **100 shard supervisors**
3. **1 scaled 100k rotor**

## Lane supervisors exposed by the live HBP roster

The live HBP roster directly exposes these room-sector lane supervisors:

1. `ROOM-SECTOR-LANE-INDEXER` — pid `6c8837bcead5159d`, hilbert `1495`
2. `ROOM-SECTOR-LANE-MINTING` — pid `52064c00fd6c4e52`, hilbert `1496`
3. `ROOM-SECTOR-LANE-QUANT` — pid `a1c756adec73a3d4`, hilbert `1497`
4. `ROOM-SECTOR-LANE-REFLEX` — pid `0631f9008f8c5ef6`, hilbert `1498`
5. `ROOM-SECTOR-LANE-SHANNON` — pid `093cfad09935c4b5`, hilbert `1499`
6. `ROOM-SECTOR-LANE-SUPER_GULP` — pid `ec5c60afda1f42ff`, hilbert `1500`
7. `ROOM-SECTOR-LANE-WATCHER` — pid `d4289cfd785c8589`, hilbert `1501`
8. `ROOM-SECTOR-LANE-WHITE_ROOM` — pid `73de772bdaafffd4`, hilbert `1502`

The live count is **12** lane supervisors. The current tool-visible excerpt exposes the 8 rows above explicitly by name; 4 additional lane rows exist in the canonical count but were not surfaced verbatim by the truncated tool excerpt available in this session. That is a **visibility gap in this tooling surface**, not a claim that the other 4 lanes do not exist.

## Shard supervisors and scaled rotor

The live HBP roster also exposes:

- `ROOM-SECTOR-SHARD-0000` — pid `0d7b69cc085953b4`, hilbert `1503`
- `ROOM-SECTOR-SHARD-0099` — pid `71ec9acf3e78a275`, hilbert `1602`
- the shard lane is therefore explicitly published as a contiguous **`0000..0099`** canonical shard set
- `ROOM-SECTOR-100K-SCALED-ROTOR` — pid `259adacd553edde5`, hilbert `1603`

So the system does publish a named **100k scaled rotor** at the supervisor layer.

## What this does and does not mean

What it means:

1. The `100k` room idea is **real canon at the supervisor/substrate layer**.
2. The room substrate is modeled as a **lane + shard + scaled-rotor topology**.
3. The `10k` RoomRotor on `D:` is only one materialized layer of the broader room canon.

What it does not mean:

1. It does **not** prove that `100k` rooms are materialized as ordinary folders on the acer-visible exFAT SOVLINUX USB.
2. It does **not** make the acer `PHYSICALDRIVE2` exFAT instance the canonical room-store.
3. It does **not** override the direct SOVLINUX USB canon: that substrate's canonical role remains **sovereignty cold-storage / master copy** on `liris`.

## Honest visibility gap

The live H03/HBP surfaces available in this session expose the room-sector supervisors as canonical named rows, but they do **not** expose a `role=` string for each room-sector row the way `PROF-HOOKWALL` or `PROF-SOVLINUX-USB` style explanations do.

So the public claim here is intentionally bounded:

- **published as canonical:** the room-sector topology, counts, names, shard span, and scaled rotor
- **not claimed without a better surface:** per-row natural-language EXPLAIN text for every room-sector lane/shard supervisor

That is the correct public boundary for now.

## Relationship to the 100k-room question

The corrected public reading is:

- the system **does** publish a `ROOM-SECTOR-100K-SCALED-ROTOR`
- the acer-visible exFAT SOVLINUX instance **does not** look like a plain materialized `100k` room-folder tree
- therefore "`100k rooms`" should currently be read as **canonical room-sector substrate topology**, with materialization requiring a separate direct receipt

## Related public notes

- [`SOVLINUX-USB-SUBSTRATE-CANON.md`](SOVLINUX-USB-SUBSTRATE-CANON.md)
- [`../ASOLARIA-MIGRATION-MAP.md`](../ASOLARIA-MIGRATION-MAP.md)
- [`../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)
- [`../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md)
