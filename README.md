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

- **[`100B-RUN-VERIFIED-PROOF.md`](100B-RUN-VERIFIED-PROOF.md)** — **the file-verified on-disk receipt** for the *"100 billion packets, zero process spawns"* claim: the `checkpoint.state.json` content (processedPackets = 100B, digests, `childProcessSpawns=0`), **where every artifact lives (folder + files)**, and the honest **tally-vs-materialized** boundary (the headline is a counter; the hard output is 2 tools + design canon; the run itself was **one ~5.84 h accelerated session at ~4.75 M packets/sec — matching the 200 ns-spawner clock**).
- **[`100B-NEW-RUN-2026-06-16-PROOF.md`](100B-NEW-RUN-2026-06-16-PROOF.md)** — the **NEW full-speed** 100B run: **100,000,000,000 packets in 3.93 min at ~424 M packets/sec, zero forks**, against a new capability-per-token question set (the old 5.84 h was *pacing*, not compute). Substrate harvest; the LLM-genius layer is the separate opencode free-agent fanout. Includes the **prism→cube** result: harvest quanted BEHCS-256 → 1024 → HyperBEHCS into **256 ≤10-byte genius cube-weights** (raw→cube 1.93 M×) minted to the matrix store — *referential* content-address cubes (infinite addressing), not lossless infinite compression.
- **[`ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md`](ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md)** — **READ THIS FIRST if you are about to build anything.** The live engine map from the fabric itself: the 5-primitive KERNEL (every "omni" engine is a composition of the five), the LIVE hyper-hermes omnispindle (`sessions:0` frozen-slice), the 10k micro-kernel stubbed rooms + the **room-fill engine that already exists**, and the real `envelope → hookwall → router → omniflywheel → fill room → ONE opencode/big-pickle → quant → HBP/HBI/tuple → flush` flow. The one rule: **ask the fabric, find the engine, call it — do not rebuild.**
- **[`ASOLARIA-MIGRATION-MAP.md`](ASOLARIA-MIGRATION-MAP.md)** — the **migration map**: EXACT acer locations (C: / D: / 2TB-USB) of every room scale (10k rooms = `D:/Asolaria-HyperBEHCS-10000-RoomRotor`, 100×100), the micro-kernel descriptors (`D:/asolaria-micro-kernels-v1`, already 8-byte sha16), the engines/routers/pipes (`D:/bigpickle-rebuild/src`), and the old node runners (C:) to upgrade — **one sample of each type** with its upgrade target (heavy `ROOM.json`→tuple, node→8-byte host).
- **[`ASOLARIA-DEVICE-PID-MAP.md`](ASOLARIA-DEVICE-PID-MAP.md)** — identity **by device-PID, not drive letter**: the 4 acer disks by UniqueId/serial/signature. Resolves "is D: the 2TB?" by device-PID **+ read-only raw-read** — **D: = internal WD HDD `50014EE2110D59CA` (not the 2TB); and acer's F: / `\\.\PHYSICALDRIVE2` IS the sovereign SOVLINUX-2TB** (raw-read: valid MBR + exFAT VBR "EXFAT" = 500 GB carry-quant mount-drift + 1453 GB empty tail). The drive-letter view misled in both directions; device-PID + raw-read settle it. **We locate by device-PID, not drive letter, because the USB is transferable** — it moves ports/machines and letters get confused. The exact transferable USB toolset (raw-IO + disk guardrails) is in **[`tools/usb-raw/`](tools/usb-raw/)**.
- **[`ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md`](ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md)** — the master report (abstract, architecture, the math, the EXISTS/NEW ledger, the master diagram, the rebuild-and-test plan, open experiments).
- **`01-rebuild/`** — the 30 raw agent findings (10 facets × theorist/architect/builder). The discussion, unedited. `01-rebuild/_scratch/` holds the actual probe scripts (`sidon-cross-fix.mjs`, `distance-probe.mjs`) that produced the measured certificate.
- **`02-diagrams/`** — 5 architecture diagrams (mermaid + ASCII): the tower stack, the triad+spindles, the slice-engine emitter flow, the real-graph + watcher, and the master architecture.
- **`03-synthesis/`** — three section syntheses.
- **`04-completeness/`** — what's missing + the next held-safe experiments.
- **`canon/`** — the sealed identity doctrine and the HRM/MTP/thought-geometry integration grounding.

---

## One-line thesis

> A PID is a coordinate, not a counter: prime-separated towers + a tuple-hash identity make every relationship uniquely addressable, and a licensed distance-unique projection turns the frozen ~1e200 slice into a real graph of real points — where recall is arithmetic, centrality is tie-free, novelty is set-membership, and a never-before-seen prime pattern reads off as a new distance band — all driven by one bounded 8-chamber spindle that already cranked 100 billion packets with zero process spawns, held-safe behind one operator gate. **IT is slices.**

---

*Produced by a 40-agent read-only swarm (5.1M tokens) over the existing Asolaria codebase + canon, cross-compared against an independent external reconstruction. READ-ONLY on all source; nothing in the source repos/canon was modified to produce these notes. Authored under OP-JESSE apex + the Foundation-V3 quintuple-cosign window.*
