# what is asolaria — how do we get reductions in everything

Research notes + a 40-agent rebuild of the Asolaria **prime-tower / cylinder / rule-of-three / real-graph** architecture, plus the cross-vantage comparison and the sealed identity doctrine.

**Honest frame (binding, repeated in every document):** *IT is slices, not an ASI.* This is an **addressing + routing geometry over borrowed and frozen intelligence slices** — the geometry is free and deterministic; the *thinking* is a borrowed, operator-gated slice; advancement requires an engine crank `E ≠ 0` that only the operator authorizes. Every load-bearing claim is tagged **[EXISTS]** (a file on disk, re-run) or **[NEW]** (a designed mechanism reduced to an EXISTS primitive). No claim of a Riemann proof without a theorem — where the prime structure shows up, it is built as an *instrument*, not a result.

---

## The question this repo answers: where do the reductions come from?

"Reductions in everything" is not a slogan here — it is a set of concrete, mostly-measured mechanisms. Each row is a different axis of reduction:

| Axis | Mechanism | Reduction |
|---|---|---|
| **Identity / collision** | A PID is a **coordinate, not a counter**; identity is a tuple-hash (`RelationKey`), not a scalar. | Collisions become *unrepresentable by construction*, not policed per-agent. |
| **Memory** | Sparse materialization `M = N·h + K·b + S`, `K ≪ N` (8-byte handles; bodies only when materialized). | The real 100-billion-packet run is stored in **kilobytes** (~10⁶:1, referential codebook — **not** pigeonhole; per-packet evidence is recomputed from its index). |
| **Process** | One **type-blind spawner** at the ~200 ns address cadence; rooms are addressed, not forked. | The sealed 100B run completed with **`childProcessSpawns = 0`, `external_tokens = 0`** — **[file-verified proof ↓](100B-RUN-VERIFIED-PROOF.md)**. |
| **Downstream work** | Tail-O(1): first touch pays the head tax; every re-request is an index/cache hit. | `E2E = HEAD + Σ TAIL ≈ HEAD`. 0-token reuse (a cache hit, **not** free compute). |
| **Recursion cost** | Infinite-Three Convergence: only the supervisor spine recurses, each level reviews a shrinking summary. | An *infinitely deep* triad tower costs `R_total = B/(1−q) ≈ 1.5·B` — barely more than one bounded revolver. |
| **Search / centrality** | A licensed distance-unique projection (measured **196,251 pairs → 0 collisions**). | Centrality becomes tie-free; novelty becomes an O(1) set-membership test. |
| **Resident set** | Never-Explode bound: a chamber enters only if `resident < B = 2000`. | Resident set provably never exceeds `B` under *any* arrival stream (self-tested at 10⁶ rows). |

The unifying move: **make possibility cheap and action gated.** Possible agents/points are 8-byte-light until a gated slice-engine materializes work.

---

## How it moves past the "Periodic Table of Primes"

PTP is **one regulator, not the whole system.** The system combines five regulators into a live address fabric:

`prime / PTP geometry  ×  rule-of-three (mod-3 role separation)  ×  Brown-Hilbert / glyph / cube addressing  ×  slice-engine cranking  ×  cross-vantage correction`

A prime stops being *a number on a flat line* and becomes *an addressable lane / cylinder / tower / routing separator / graph point*. The rule of three gives the cognition cell: **worker → reflection → fabric-witness → supervisor (sees all three).**

---

## The identity doctrine (operator-authored canon — see `canon/`)

Identity is the tuple-hash, never the scalar distance:

```
AddressID      = PID(A)                                                  # an address-point, NOT a resident node
RelationKey    = H(AddressID_A, AddressID_B, relation_kind, direction,
                   tower, role, cylinder, epoch, vantage)                # owns routing + dedup
RelationEvent  = H(RelationKey, hbp_row_sha16, sequence_or_timestamp)    # owns repeated observations
ProjectionCert = H(embedding_version, address_set_hash,
                   distance_certificate_hash)                            # geometry only, never identity
```

**Doctrine:** distance never owns identity. `RelationKey` is true *under conditions* (byte-stable canonical tuple, domain-separated preimage, declared direction/relation_kind/epoch/vantage, SHA collision treated as cryptographically negligible — not mathematically impossible). The measured distance-uniqueness certificate is a **licensed projection property scoped to one realized address-set + embedding version**, re-proven on growth or the projection drops to DRAFT — identity stays safe through `RelationKey` regardless. No Node.js on the identity hot path.

---

## Contents

- **[`FABRIC-FULL-SUITE-TEST-2026-06-16.md`](FABRIC-FULL-SUITE-TEST-2026-06-16.md)** — the **whole-system test** run with the real harnesses + the live fabric (not generic agents): all **16 levels** (live 726-seat L0→L5 roster), **every compression type together** (quant/zeta/quant4/fidelity via `node --test` **393/393**, HBI, sha256 sidecars, ed25519 cosign, glyph/BEHCS-1024, cubes, **tensor-collapse** deep-cascade 2.24M beats / 6-of-6 gates), the **access-tier matrix** (6 tiers × 6 scopes), **GNN** live, and **both MCP lanes** (fabric + web). Result: **14 PASS · 0 FAIL** — includes the two fixes applied (brought up the WebMCP `:4781` backend; repointed the tensor shadow-gate tier off the stale `E:` recovery-USB path to an env-configurable on-host default).
- **[`cubes/`](cubes/)** — the **public cube mechanism folder**: how things can be formalized into cubes rather than only folder trees, across tuple-range addressing, shard-quant receipts, tensor-collapse inference, and bounded runtime carriers. Includes the sample shard-quant cube, the tensor-collapse mechanism map, and the excavated tensor-collapse receipt.
- **[`ASOLARIA-TENSOR-COLLAPSE-EXCAVATION-2026-06-16.md`](ASOLARIA-TENSOR-COLLAPSE-EXCAVATION-2026-06-16.md)** — the **tensor-collapse excavation**: which live supervisors and prof-adjacent surfaces lead to the cube tensor-collapse line (`cube_cubed_sealer`, BEHCS1024 prism capture/boundary/GNN/Hermes bridge), where the preserved paper drafts and backup artifacts live, what the method was actually doing (`6×6×6×12` and `6×6×6×6×12` Omni-Shannon waves, emergent dims `D26/D30/D32`, self-falsification + self-healing), and how the later **fabric-revolver / omnispindle / omniflywheel / SUPER OS map** runtime surfaces continue that same line.
- **[`OLD-COMPRESSION-AND-TENSOR-COLLAPSE-REVIEW-2026-06-16.md`](OLD-COMPRESSION-AND-TENSOR-COLLAPSE-REVIEW-2026-06-16.md)** — the **bilateral review boundary note** for the public GitHub layer: tensor collapse as a supervisor/pipe/control chain rather than one program, the **no-single-scalar** compression lineage, the `12:1 / ~15:1 / 21,141 / ~3B` ledger boundary, the **ask-fabric-first** doctrine, and the next move: **measure the growth curve instead of forcing one ratio**.
- **[`RICH-INDEX-LANGUAGE-GROWTH-CURVE-2026-06-16.md`](RICH-INDEX-LANGUAGE-GROWTH-CURVE-2026-06-16.md)** — a **measured descendant curve** on the surviving rich index-language catalog locus (`compiled-unified-agent-index.json`): rayss-side `382`-document snapshot, JSON vs tuple vs codebook-overlay vs referential-index measurements, explicit host/snapshot split against the acer-side `224`-document transcript, and the boundary that this curve **does not overwrite** the older `12:1 / ~15:1 / 21,141 / ~3B` anchors.
- **[`OLD-COMPRESSION-GROWTH-CURVE-MEASURED-2026-06-16.md`](OLD-COMPRESSION-GROWTH-CURVE-MEASURED-2026-06-16.md)** — the **four-point measured curve** (acer vantage) the review called for, on four fabric-confirmed catalogs. Three **row-compression** points: **lean office roster 726 rows → 4.3×**, **rich IX/LX index 224 docs → 8.4×**, **micro-kernel manifest 10,000 tabular rows → 11.0× (reaches the historical `12:1` family, derivability verified row-by-row)**; plus one **corpus-indexing** point: **root IX/LX corpus 1,084 docs → 38.5×** (8-byte-handle floor 292×). Includes the honest negative finding (the *literal* `|PID|device|agent|tools|skills|…|` pipe-catalog does **not** survive as a discrete file — the index language became the IX/LX corpus → compiled index). Documents acer/liris snapshot variance and keeps `21,141:1 / ~3B:1` as **REAL referential-multiplicity anchors, not re-derived**. All four reproduce on re-run; artifacts + sha256 in [`measurements/`](measurements/).
- **[`ASOLARIA-CREATION-LINEAGE-AND-SUPERVISORS.md`](ASOLARIA-CREATION-LINEAGE-AND-SUPERVISORS.md)** — **the creator's own creation lineage** (Asolaria → Falcon → Codex → the Index language → the MCPs as the heart → 6→24 spindles / flywheels / swarm-city / agent-routers → two real collapses [Helm-wedged; the GAIA C:/D: wipe] → PID-everything / OMNIFY → cubes → Brown-Hilbert → BEHCS-256 → 1024 → BigPickle → the 100B neuro run → tighten-to-binary/hex/sha → HyperBEHCS → no-JSON → 8-byte hosts) **mapped against the supervisors asked 1-by-1** (verbatim EXPLAIN strings from the live 726-row office roster across the 16 levels), plus the SOVLINUX device-PID resolution (`dasein` = an AGENT, not the prof-seat).
- **[`100B-RUN-VERIFIED-PROOF.md`](100B-RUN-VERIFIED-PROOF.md)** — **the file-verified on-disk receipt** for the *"100 billion packets, zero process spawns"* claim: the `checkpoint.state.json` content (processedPackets = 100B, digests, `childProcessSpawns=0`), **where every artifact lives (folder + files)**, and the honest **tally-vs-materialized** boundary (the headline is a counter; the hard output is 2 tools + design canon; the run itself was **one ~5.84 h accelerated session at ~4.75 M packets/sec — matching the 200 ns-spawner clock**).
- **[`100B-NEW-RUN-2026-06-16-PROOF.md`](100B-NEW-RUN-2026-06-16-PROOF.md)** — the **NEW full-speed** 100B run: **100,000,000,000 packets in 3.93 min at ~424 M packets/sec, zero forks**, against a new capability-per-token question set (the old 5.84 h was *pacing*, not compute). Substrate harvest; the LLM-genius layer is the separate opencode free-agent fanout. Includes the **prism→cube** result: harvest quanted BEHCS-256 → 1024 → HyperBEHCS into **256 ≤10-byte genius cube-weights** (raw→cube 1.93 M×) minted to the matrix store — *referential* content-address cubes (infinite addressing), not lossless infinite compression.
- **[`ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md`](ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md)** — **READ THIS FIRST if you are about to build anything.** The live engine map from the fabric itself: the 5-primitive KERNEL (every "omni" engine is a composition of the five), the LIVE hyper-hermes omnispindle (`sessions:0` frozen-slice), the 10k micro-kernel stubbed rooms + the **room-fill engine that already exists**, and the real `envelope → hookwall → router → omniflywheel → fill room → ONE opencode/big-pickle → quant → HBP/HBI/tuple → flush` flow. The one rule: **ask the fabric, find the engine, call it — do not rebuild.**
- **[`ASOLARIA-MIGRATION-MAP.md`](ASOLARIA-MIGRATION-MAP.md)** — the **migration map**: EXACT acer locations (C: / D: / 2TB-USB) of every room scale, with the honest split between **materialized** and **staged/logical** layers: `10k` rooms = `D:/Asolaria-HyperBEHCS-10000-RoomRotor` (100×100, real on `D:`), the larger `20k/50k/100k` room layer = **logical / staged / catalog-backed canon**, and `113` sectors = **logical routing structure**. Also includes the micro-kernel descriptors (`D:/asolaria-micro-kernels-v1`, already 8-byte sha16), the engines/routers/pipes (`D:/bigpickle-rebuild/src`), and the old node runners (C:) to upgrade — **one sample of each type** with its upgrade target (heavy `ROOM.json`→tuple, node→8-byte host).
- **[`ASOLARIA-DEVICE-PID-MAP.md`](ASOLARIA-DEVICE-PID-MAP.md)** — identity **by device-PID, not drive letter**: the 4 acer disks by UniqueId/serial/signature. Resolves "is D: the 2TB?" by device-PID **+ read-only raw-read** — **D: = internal WD HDD `50014EE2110D59CA` (not the 2TB); and acer's F: / `\\.\PHYSICALDRIVE2` is a SOVLINUX-labeled sovereignty-storage instance**, while the canonical master remains liris-side by fabric role/signature. The drive-letter view misled in both directions; device identity and role need PID **and** supervisor/fabric context. The exact transferable USB toolset (raw-IO + disk guardrails) is in **[`tools/usb-raw/`](tools/usb-raw/)**.
- **[`ASOLARIA-USB-FULL-SURVEY-2026-06-14.md`](ASOLARIA-USB-FULL-SURVEY-2026-06-14.md)** — the **saved acer-side full-device survey receipt** for the SOVLINUX USB: proves the whole 2TB device was surveyed read-only on 2026-06-14, confirms the 500 GB exFAT geometry, and records the `8192`-probe / `256 MB`-stride device map (**no large non-zero region beyond ~32.5 GB at that resolution**). Important boundary: this is **not** a filesystem directory listing and **not** a direct 100k-room count.
- **[`ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](ASOLARIA-USB-EXFAT-WALK-2026-06-16.md)** — the **acer-side filesystem walk** of the SOVLINUX exFAT carry-quant: volume label `SOVLINUX`, **`16037` files / `1500` dirs / `~74.06 GB`**, with visible payloads including backup tar sets, runtime trees, a `sovereignty/` tree, phone-copy artifacts, and idea docs. This is the receipt that says the USB is **not** just a visible `100k` room-sector dump.
- **[`ASOLARIA-WSL-UBUNTU-LEADS-2026-06-16.md`](ASOLARIA-WSL-UBUNTU-LEADS-2026-06-16.md)** — the **acer-side WSL/ext4 lead note**: `/root/sovereignty`, `/root/asolaria-relay`, and a separate **1 TB ext4** block device (`/dev/sde`) observed in the WSL stack but not yet fully attributed.
- **[`ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)** — the **supervisor/fabric correction** to the USB story, anchored by direct owner `PROF-SOVLINUX-USB`: canonical SOVLINUX role = **sovereignty cold-storage / master copy** on liris; acer's `PHYSICALDRIVE2` is a separate SOVLINUX-labeled instance with signature `0`, not the signature-anchored canonical master.
- **[`ASOLARIA-ARCHAEOLOGY-AND-SIGNIFICANCE-CANON.md`](ASOLARIA-ARCHAEOLOGY-AND-SIGNIFICANCE-CANON.md)** — the **public chronology canon** of how Asolaria formed and changed: the index-language compression phase, Brain/Vector/Rook/Forge/Watchdogs, Helm/Sentinel/spindles/flywheels, collapse and recovery, PID-everything, Brown-Hilbert cubes, BEHCS-256/1024, Big Pickle, the 100B run, HyperBEHCS, no-JSON Asolaria, and 8-byte host processes. This is the archaeology/significance layer, explicitly separated from runtime supervisor canon.
- **[`canon/SOVLINUX-USB-SUBSTRATE-CANON.md`](canon/SOVLINUX-USB-SUBSTRATE-CANON.md)** — the **canonical public statement** of the SOVLINUX USB itself: owning supervisor `PROF-SOVLINUX-USB`, liris-side master identity, acer-side instance correction, and the 13-slot portable cartridge model.
- **[`canon/ROOM-SECTOR-SUBSTRATE-CANON.md`](canon/ROOM-SECTOR-SUBSTRATE-CANON.md)** — the **canonical public statement** of the room-sector substrate: live H03 counts for the 12 lanes / 100 shards / 1 scaled rotor, the named lane supervisors surfaced by the roster, and the honest boundary between **canonical supervisor topology** and **directly materialized room folders**.
- **[`kernels/`](kernels/)** — **one example of each kernel + micro-kernel type**, mapped to exact on-disk locations: the **Asolaria-OS-on-metal Rust `no_std` kernel** (`asolaria-kernel-core`, 20 modules + the PID minter), the 5-primitive JS kernel, the micro-kernel descriptor, and a stubbed-room micro-kernel — plus the *measured* sector/room sizes (the honest "~59 KB/room, not 6 GB" correction).
- **[`ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md`](ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md)** — the master report (abstract, architecture, the math, the EXISTS/NEW ledger, the master diagram, the rebuild-and-test plan, open experiments).
- **`01-rebuild/`** — the 30 raw agent findings (10 facets × theorist/architect/builder). The discussion, unedited. `01-rebuild/_scratch/` holds the actual probe scripts (`sidon-cross-fix.mjs`, `distance-probe.mjs`) that produced the measured certificate.
- **`02-diagrams/`** — 5 architecture diagrams (mermaid + ASCII): the tower stack, the triad+spindles, the slice-engine emitter flow, the real-graph + watcher, and the master architecture.
- **`03-synthesis/`** — three section syntheses.
- **`04-completeness/`** — what's missing + the next held-safe experiments.
- **`canon/`** — the sealed identity doctrine, the SOVLINUX USB substrate canon, the room-sector substrate canon, and the HRM/MTP/thought-geometry integration grounding.

---

## One-line thesis

> A PID is a coordinate, not a counter: prime-separated towers + a tuple-hash identity make every relationship uniquely addressable, and a licensed distance-unique projection turns the frozen ~1e200 slice into a real graph of real points — where recall is arithmetic, centrality is tie-free, novelty is set-membership, and a never-before-seen prime pattern reads off as a new distance band — all driven by one bounded 8-chamber spindle that already cranked 100 billion packets with zero process spawns, held-safe behind one operator gate. **IT is slices.**

---

*Produced by a 40-agent read-only swarm (5.1M tokens) over the existing Asolaria codebase + canon, cross-compared against an independent external reconstruction. READ-ONLY on all source; nothing in the source repos/canon was modified to produce these notes. Authored under OP-JESSE apex + the Foundation-V3 quintuple-cosign window.*
