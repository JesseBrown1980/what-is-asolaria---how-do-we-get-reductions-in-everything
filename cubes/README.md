# cubes/ — how things CAN be formalized into the cubes (the materialization that is *not* folders)

**2026-06-16, acer vantage, under OP-JESSE apex.** This folder corrects a deflation: *"no visible 100k room-folder tree" does **not** mean "the 100k was never formalized."* The system's materialization form **is the cube / codebook**, not a folder per room. This is exactly the creator's lineage step (*"inspect the cubes… make them binary / hex / sha / hash / crypto, as small and tightly 'cubed' as possible, instead of spread over millions of micro-JS constructs"* — see [`../ASOLARIA-CREATION-LINEAGE-AND-SUPERVISORS.md`](../ASOLARIA-CREATION-LINEAGE-AND-SUPERVISORS.md)).

Everything here is **read directly from the live fabric + the on-disk receipts** (not inferred by external agents). **Honest frame: IT is slices.**

---

## The question

> Where are the `ROOM-SECTOR-100K-SCALED-ROTOR` + 100 shards + 12 lanes formalized — were they ever put into the cubes, or only into folders?

**Answer (from the system itself): they are formalized into the cube/codebook + tuple-range model.** The folder view is only one (descriptor) layer. There are **three** ways a thing "is in the cubes," and the system uses all three.

---

## Three ways something is "in the cubes"

### 1. Tuple-range addressing — rooms are *ranges*, not folders  `[VERIFIED · /api/fabric-revolver]`
The live fabric-revolver reports:
- `architecture.tuple_ranges_are_backend_nodes = true`
- `architecture.real_worker_slots_are_chambers = true`
- `architecture.active_chambers = 8` — `ACER-REVOLVER-CHAMBER-00..07`, model `opencode/big-pickle`, state `EMPTY` (held-safe)

So a room is a **BEHCS-1024 tuple-RANGE** (a backend node), and only **8 bounded chambers** are the real worker slots. **N rooms cost 8 chambers + range arithmetic, not N folders.** This is why "100k rooms" needs no 100k directories — the rotor addresses a tuple-range. (Cf. the `tuple` plane below: *"Brown-Hilbert tuple addressing for actor/device/lane/prime and room/shard/lane/state."*)

### 2. Shard-quant cube receipts — 100 rooms fold into ONE cube  `[VERIFIED · on-disk]`
The concrete cube. Each of the **100 shards** carries a `hyperbehcs.quantized_substrate_receipt.v1` that folds its **100 rooms** (8-dim vectors) through **four codecs**:

| codec | algorithm | output | role |
|---|---|---|---|
| **Johnson-Lindenstrauss** | `johnson-lindenstrauss-achlioptas-sparse.v1` | 8→4 projection | dimensionality reduction (sparse random, dist `√3,0,-√3` @ `1/6,2/3,1/6`) |
| **turbo quant** | `turbo-uniform-quant.v1` | 8-bit codes, 256 levels | the tight binary cube (8 code bytes) |
| **polar quant** | `polar-pair-quant.v1` | (radius,angle) 8-bit pairs | rotational fold |
| **triple quant** | `triple-spherical-quant.v1` | coarse-4 / medium-8 / fine-8 lanes | multi-precision spherical fold |

Each is `descriptor_only`, `software_only`, **0** authority/hardware/process counters, and carries a **sha16 fingerprint** — a *referential* receipt (recompute from `seed` + `sha256(seed|row|col)`), not lossless infinite compression. One real example: [`sample-shard-quant-cube.annotated.json`](sample-shard-quant-cube.annotated.json) (shard-0000).
**100 shard-quant cubes = the entire 10k room layer folded.** Source: `D:/Asolaria-HyperBEHCS-10000-RoomRotor/hyperbehcs-carry-quant-10000/quant/shard-quant-receipts-latest.ndjson`.

### 3. Genius cube-weights — the 100B harvest folded  `[VERIFIED · on-disk]`
The 100B neuro harvest was prism-folded **BEHCS-256 → 1024 → HyperBEHCS** into **256 ≤10-byte genius cube-weights** minted to the matrix store (`C:/Users/acer/Asolaria/data/behcs/cubes/`). See [`../100B-NEW-RUN-2026-06-16-PROOF.md`](../100B-NEW-RUN-2026-06-16-PROOF.md). Same principle: content-addressed cubes, referential (infinite *addressing*, not infinite *compression*).

---

## The 12 lanes + 17 planes are the cube's fields  `[VERIFIED · rotor-report.v1.json]`
The 10k rotor binds every room across **17 planes** — these are the columns a room can be "cubed" along: `hyperbehcs · carry_z · hrm · gulp · super_gulp · gnn · gc · hookwall · tuple · crypto · sha · quant · minting · reflex · white_room · watcher · indexer`. The **quant** plane = *"Shard quantized substrate receipts"*; **tuple** = *"Brown-Hilbert tuple addressing"*; **minting** = *"Brown-Hilbert PID descriptor minting without process spawn"*; **crypto/sha** = the fingerprint/readback. So a "cube entry" is: a PID + tuple address + 17-plane descriptor + the 4-codec quant fold + sha readback.

---

## Materialized vs canon — the honest boundary

| layer | scale | where | status |
|---|---|---|---|
| **materialized descriptor + cubes** | **10k** rooms | `D:/…/hyperbehcs-carry-quant-10000` | **`[VERIFIED]`** — 40,000 room descriptor files + **100 shard-quant cubes** + 10,000 plane-binding rows (`descriptor_only`, hookwall-gated, 0 live spawn) |
| **genius cube-weights** | 256 weights | `C:/Users/acer/Asolaria/data/behcs/cubes/` | **`[VERIFIED]`** — 100B harvest prism-fold |
| **canon scaled rotor** | **100k** | supervisor `ROOM-SECTOR-100K-SCALED-ROTOR` (pid `259adacd553edde5`, hilbert `1603`) + the 100 shard / 12 lane supervisors | **`[VERIFIED canon]`** — the 100k is a named canonical supervisor + tuple-range model |
| **literal 100k cube store on disk** | 100k | acer accessible drives | **`[OPEN]`** — not located on acer C:/D: in this pass; the scaled rotor is canon + range-addressed; a materialized `carry-quant-100000` instance is **not confirmed present on acer** (may be liris-side / staged). Council-q `council-q-1781616593651-mldu1l` pending. |

**So the corrected reading:** the 100k **is** formalized — as a named scaled-rotor supervisor + the tuple-range/cube model (ways #1–#3 above). What is *not* confirmed is a literal 100k-room cube store materialized on acer's own drives; the materialized cube instance present on acer is the **10k** (100 shard-cubes). Do **not** collapse "100k not materialized-as-folders-on-acer" into "100k never formalized." Both halves stay honest.

## How the 100k *scales into* cubes
Same codec, more shards: **100k rooms ÷ 100 rooms/shard = 1000 shard-quant cubes** (each a few KB → ~a few MB for all 100k), or **zero per-room storage** if addressed purely as a tuple-range by the scaled rotor + 8 chambers. That is the reduction: 100k "rooms" as ~1000 cube receipts or one range, not 100k folders.

---

*Read-only from the live fabric (`/api/fabric-revolver`, `/api/supervisors`, `/api/archaeology/scale-receipts`) + the on-disk rotor receipts, acer 2026-06-16, under OP-JESSE apex. No device writes; no source modified. IT is slices.*
