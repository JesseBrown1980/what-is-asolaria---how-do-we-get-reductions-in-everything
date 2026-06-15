# F02 — The Unique-Distance Prime-Coordinate Property + the New Quant Series
## Facet: Unique-Distance Theorem · Angle: BUILDER · Agent F02 of 40 · 2026-06-15

> Operator mandate: *"Rebuild this. Nothing is impossible. Use OUR data."* This file
> rebuilds the central claim of Jesse's cylinder-prime idea — **that across all
> cylinders/towers, no two prime-to-prime node distances are ever equal** — and
> connects it to the **amazing new quant series** that came out of building it. The
> Builder angle owns the concrete rebuild on OUR stack: which engines/files/cubes to
> use, the exact experiment, the measurable receipt, the held-safe path, and the new
> artifact to write.

---

## 0. The claim, stated precisely (the thing we must guarantee)

Jesse's hint, formalized:

> Let the fabric's addressable possibility-space be a set of **points** `P`, each a
> prime-anchored coordinate inside a nested cylinder/tower. Equip `P` with a metric `d`.
> **Claim (Unique-Distance Property, UDP):** for every two distinct unordered point-pairs
> `{a,b}` and `{c,d}` (within *or* across cylinders), `d(a,b) = d(c,d) ⟹ {a,b} = {c,d}`.

If UDP holds, the **distance multiset is a Sidon set**: every pairwise distance is a
unique fingerprint. That is the precise property that lets us "project the fabric onto a
REAL graph plotting REAL points (not a drawing)" — because each edge length becomes a
*globally unique key*. An emitter trigger that observes a single distance can name the
exact `(tower, point_i, point_j)` pair that produced it, with **zero ambiguity** and in
**O(1)** by reverse lookup. That is the engine behind "nothing is ever lost; retrieval is
near-instant, independent of physical disk speed."

This is a strong claim. The honest-frame discipline (OUR memory: a negative is a
hypothesis to be tested, a positive must still be earned) forced me to **test it on OUR
real embedding before asserting it**. The result, below, is the load-bearing finding of
this facet.

---

## 1. What ALREADY EXISTS on our stack (grounded, cited)

The cylinder-prime machinery is **not aspirational** — large parts of it are live code
with passing self-tests. The Builder's job starts from these, not from a blank page.

### 1.1 The prime-dimension ladder (the towers' backbone) — EXISTS
`C:/Users/acer/Asolaria/tools/hilbert-omni-47D.json` assigns **a distinct prime to every
dimension** and a **cube = prime³** cardinality:

```
D1 ACTOR  prime 2   cube 8        D16 PID    prime 53  cube 148877
D2 VERB   prime 3   cube 27       ...
D4 RISK   prime 7   cube 343      D32 STRUCTURAL_INVARIANT prime 131 cube 2248091
...                                D47 BOUNDARY prime 211 cube 9393931
```
`growth_law: "Each new prime cubed = new dimension … Infinite expansion."` This is
literally "towers of types of PIDs based on the 60-dimension catalogs held in CUBES."
Each dimension *is* a tower; its prime *is* its separator; its cube *is* its capacity.
(Canon holds the ladder at 60D+/atlas v56 per `BROWN-HILBERT.md`; runtime stays 47D.)

### 1.2 The prime-cube intersection anchors (behcs-256) — EXISTS
`C:/asolaria-as-neural-network/tools/behcs/pre-existence-graph-exporter.mjs:30`
```js
export const PRIME_CUBE_PRIMES = Object.freeze([13,17,23,31,41,47,73,79,83,89,131]);
export const PRIME_CUBES = Object.freeze(PRIME_CUBE_PRIMES.map(p => p**3)); // 2197 .. 2248091
```
These eleven `p³` values (the **behcs-256 prime-cube cardinality, 13³..131³** that grounds
this facet) are the magnitude anchors of the real Brown-Hilbert intersection cube
(confirmed receipt c134d0f). They are the natural **tower anchors**.

### 1.3 The three-way reflection (rule of three) as residue lanes — EXISTS
`C:/asolaria-as-neural-network/tools/behcs/token-cube-catalog-binder.mjs:61` —
`classifyBhIndex(index)`:
- `bh_lane = index % 3` — *the three-phase cylinder fold* (the rule of three),
- `bh_ppow` — von-Mangoldt prime-power class (`unit/prime/p2/p3/pk/composite`),
- permutation-invariant because `10 ≡ 1 (mod 3)` (the 21/12/33 digit-sum observation).

### 1.4 The cylinder geometry + the gap-mod-6 forcing law (Jesse's curved prime graph) — EXISTS
`C:/asolaria-as-neural-network/tools/behcs/zeta-quant.mjs` is **exactly** "curve the prime
graph into a cylinder":
```js
cylinder: { ring: Math.floor(index/6), phase: index%6 }   // wrap the number line mod 6
FORCED = { 0:'same-lane', 2:'lane2-to-1', 4:'lane1-to-2' } // consecutive-prime gap forcing
forcingSweep() → pairs 9589, violations 0                   // sealed theorem, re-proved each run
```
Primes > 3 live only on residues 1 and 5 (mod 6); the *gaps* between consecutive primes,
reduced mod 6, **force** the lane transition. `selfTest()` asserts
`sweep-pair-count-matches-sealed-9589` and `sweep-zero-violations`. This is the cylinder
wrap **already running**, with the prime pattern Jesse saw encoded as a *necessary*
(not sufficient) validator.

### 1.5 The PID coordinate embedding (the multi-modulus address) — EXISTS
`C:/asolaria-as-neural-network/tools/behcs/github-pid-register.mjs:42` mints a PID whose
coordinate is a **mixed-radix tuple over coprime-ish moduli**:
```
yin_yang = mod 2   (real|logical)        glyph_5    = mod 5
lane     = mod 3   (Law of Three)        sector     = mod 113  (113 Asolaria sectors)
quad     = mod 4   (the "4 rule")        glyph_1024 = mod 1024  (BEHCS-1024)
hilbert  = u32(sha256[8:16])             cube_bh    = BH.{sector}.{lane}.{glyph}
```
All from one sha256 seed → **stateless, byte-identical across acer/liris**, no coordination.
This is the "n*p, n*prime*n³, n*prime*n⁵" separator idea in concrete residue form, and the
3-tier prime separator (mod-2 / mod-3 / higher moduli) lives inside every tower.

### 1.6 The projection-to-a-real-graph exporter — EXISTS (and is where the gap lives)
`pre-existence-graph-exporter.mjs` already emits the chain Jesse described:
`PID_RANGE → BROWN_HILBERT_POINT → CYLINDER_DISTANCE → GLYPH_BINDING → WATCHER_LANE → TRIAD_STATE`,
read-only, `process_launch=0`, every node `triad_state=POTENTIAL`. It even **counts
distinct distances** (`summary.distinct_distances`). Its linearizer:
```js
function bhIndex(reg){ return reg.sector*(WIDTH*3) + reg.lane*WIDTH + reg.glyph_1024; }   // line 47
```
The header comment claims: *"Distinct positions → distinct indices, so the distance
between any two points is … (for distinct prime-anchored sectors) inherently unique."*

**This is the claim I had to test.** It is the crux of the whole facet.

---

## 2. The load-bearing finding: the naive embedding does NOT force unique distances

I ran a **read-only numeric probe** (written only under my allowed dir, no repo touched)
using the exact `mintPid` seeding and the exact `bhIndex` linearizer:

```
LINEAR  N=64   uniq_index=64/64    pairwise_distances total=2016   distinct=2014   collisions=2
LINEAR  N=128  uniq_index=128/128  pairwise_distances total=8128   distinct=8053   collisions=75
LINEAR  N=256  uniq_index=256/256  pairwise_distances total=32640  distinct=30799  collisions=1841
```
(scratch: `D:/asolaria-prime-towers-rebuild-2026-06-15/01-rebuild/_scratch/distance-probe.mjs`)

**Reading this honestly:** the points are all distinct (`uniq_index = N/N` — good, identity
holds), but the *distances* collide, and collisions grow **quadratically** (≈ 1841 at
N=256). A naive prime-weighted variant collided too (896 at N=256). So:

> **The Unique-Distance Property is FALSE under the embedding the exporter ships today.**
> "Distinct positions ⟹ distinct distances" is a *non-sequitur*: distinctness of points
> only forbids `d=0`; it says nothing about two different pairs sharing the same nonzero
> length. On a 1-D line of width `W`, by pigeonhole at most `W` distinct distances exist,
> but there are `C(N,2)` pairs — collisions are *forced* once `C(N,2) > W`.

This is **not** "impossible" — it is a *design gap*. The operator's idea is sound; the
current linearizer is the wrong metric. The Builder's deliverable is the mechanism that
*actually* delivers UDP, proven on OUR anchors. (This is also the kind of negative the
honest-frame demands I *prove*, not just assert — which is exactly what the probe does.)

---

## 3. The mechanism (NEW): the Sidon-Tower Embedding (STE)

**Goal:** an embedding `Φ: P → ℤ⁺` such that the multiset `{ |Φ(a)−Φ(b)| : a≠b }` has all
distinct elements — i.e. `Φ(P)` is a **B₂ (Sidon) set**: all pairwise *differences* (hence
distances) are distinct. Three composable parts, each grounded in OUR primes.

### Part A — Intra-tower: an Erdős–Turán Sidon set per prime (THEOREM, not heuristic)
For a prime `p`, the Erdős–Turán set
```
S_p = { 2·p·k + (k² mod p)  :  k = 0 … p−1 }
```
is a classical **Sidon set mod 2p²**: every pairwise difference is unique. Each *tower* `t`
(anchored on prime-cube `p_t³`) lays its `p_t` points on `S_{p_t}`. By the theorem, **every
intra-tower distance is distinct** — for free, no search, deterministic.

### Part B — Tower granularity: weight by the distinct prime cube `p_t³`
Scale tower `t`'s Sidon points by `W_t = p_t³` (the behcs-256 anchor). Now tower `t`'s
distances are all multiples of `p_t³` with the tower-unique Sidon difference pattern. Distinct
prime cubes give distinct granularities — the "primes reflect the catalog THREE ways" turned
into a metric: each tower owns a *coprime stride*.

### Part C — Inter-tower: super-increasing anchor bands (separation dominates)
Place tower `t+1` far enough above tower `t` that the **smallest inter-tower distance
exceeds the largest intra-tower distance**, and the inter-band gaps are themselves all
distinct (staggered by a tower-unique `GUARD·p_t³` stride):
```
anchor_0 = 0
anchor_{t+1} = anchor_t + maxIntraSpan_t + GUARD · p_t³      (GUARD = 2⁴⁰)
Φ(point) = anchor_{tower} + sidon_value · p_{tower}³
```
Because the bands are disjoint by a dominating margin, the distance multiset partitions
cleanly: intra-distances (small, per-tower, all distinct by A+B) and inter-distances (large,
band-separated, all distinct by C). No element of one bucket can equal an element of another.

### Proof on OUR anchors (empirical receipt)
I built STE over the **real** behcs-256 anchors `[13,17,23,31,41,47,73,79,83,89,131]`
(627 points = Σ p_t) and measured the full distance multiset
(scratch: `_scratch/sidon-cross-fix.mjs`):
```
CROSS-FIX  towers=11  points=627  pairs=196251  distinct_dist=196251  collisions=0
min_dist=37349  max_dist=2617523875674652731
INTRA all towers zero-collision: OK
```
**196251 pairs → 196251 distinct distances → ZERO collisions.** The Unique-Distance
Property **holds, provably and measurably**, under STE. (Contrast: the shipped linear
embedding had 1841 collisions at just 256 points.) Distances are BigInt — up to ~2.6×10¹⁸
at 627 points — which is exactly why retrieval is "independent of physical disk speed":
the distance *is* the address.

### Why this is the right rebuild of Jesse's words
- *"each catalog infinitely dividable from within"* → each tower is a Sidon set mod `2p²`;
  refine by raising `p` (Hilbert in-between refinement) without disturbing other towers.
- *"PID as prime separators n·p, n·prime·n³, n·prime·n⁵"* → the `p³` weight (and a `p⁵`
  super-tower for HRM+MTP frozen-brain agents, §6) ARE those separators, now load-bearing.
- *"no line between two points across the cylinders is EVER the same distance"* → that is
  the Sidon property, now true by construction rather than asserted.
- *"project onto a REAL graph plotting REAL points"* → the distance multiset being injective
  is precisely the licence to plot: an emitter reading a distance recovers its unique edge.

---

## 4. The amazing new quant series (reconstructed + extended)

OUR stack already carries a **quant family** — these are the "amazing new quant series" that
came out of building the cylinder. I found them as live code; I name the series and add the
one the UDP needs.

| Quant | EXISTS file | What it quantizes | Verdict semantics |
|---|---|---|---|
| **QUANT4** (address quant) | `quant4-fidelity-spec.mjs` | sha256-residue **address/PID** → `(lane3, quad4, sector113, glyph1024, cube_bh)` | `ROUTING_HINT_MEASURED_NOT_GATING`; metrics: determinism, dup-stability, identity-collisions=0, pid-collisions=0, route-spread |
| **QUANT8** (vector quant) | `quant-fidelity-sweep.mjs` + `quant-huge-message-benchmark.mjs` | continuous **vectors** → JL random-projection, absolute-cosine fidelity | PILOT/PROMOTION; p99 cos-err ≤ 0.05, rank-preserve ≥ 0.99 |
| **ZETA-QUANT** (number-theoretic address quant) | `zeta-quant.mjs` | integer **address → cylinder** `(lane3, residue6, ppow, ring, phase)` + gap-forcing | `NECESSARY-NOT-SUFFICIENT`, `INFORMATIONAL-never-gating`; sweep 9589/9589 |

The **firewall** is explicit and brilliant (and the actual "series" insight):
`QFSPEC4FIREWALL|… QUANT4-inherits-neither-QUANT8-pass-nor-QUANT8-fail|metric_cosine=not-applicable-for-hash-tail`.
The series is *two species*: **vector quants** compress continuous signals (cosine matters);
**address quants** classify integer/hash/PID addresses (cosine is meaningless — a hash tail is
not a direction). Conflating them is the trap; separating them is the discovery.

### NEW: QUANT-Δ (the distance quant) — the missing member the UDP forces
The series needs a member whose *measurable* is **the pairwise-distance multiset itself**.
I define it:

```
QUANT-Δ (distance quant)  —  quantizes the EDGE, not the node.
  input:  a set of STE coordinates Φ(P)
  emits:  the sorted distance multiset, its injectivity, and the reverse index
  metrics (all integer, time-free, byte-matchable like the rest of the series):
    Δ1 distinct_distance_ratio = |distinct distances| / C(N,2)        target = 1.000000
    Δ2 collisions                                                     target = 0
    Δ3 min_separation (smallest gap between two distances)            > 0  ⟹ float-safe plot
    Δ4 reverse_lookup_ok (distance → unique {tower,i,j})              = pairs
    Δ5 intra/inter band disjointness                                  = 1
  verdict:  UDP_HOLDS  (grade: PROJECTION_LICENSED)  |  UDP_VIOLATED (grade: NOT_PLOTTABLE)
```

QUANT-Δ is the gate that converts "we have addresses" into "we may plot a real graph." The
probes in §2/§3 are its first two runs: the linear embedding → `UDP_VIOLATED`; STE →
`UDP_HOLDS` (Δ1 = 1.000000, Δ2 = 0, all 196251 distances distinct). It sits in the **address
species**, downstream of QUANT4, firewalled from QUANT8 exactly like ZETA-QUANT — completing
the series with the member the operator's "amazing new quant series" was pointing at.

---

## 5. The mechanism diagram

```
                       JESSE'S CYLINDER, REBUILT AS THE SIDON-TOWER EMBEDDING (STE)
                       ============================================================

  47D PRIME LADDER (EXISTS: hilbert-omni-47D.json)        behcs-256 ANCHORS (EXISTS: pre-existence-graph-exporter.mjs)
  D1 p=2 ─ D2 p=3 ─ ... ─ D47 p=211                       p³ ∈ {13³,17³,23³,31³,41³,47³,73³,79³,83³,89³,131³}
        │   (each dim = a TOWER)                                 │  (each p³ = a TOWER ANCHOR / band)
        └───────────────┬───────────────────────────────────────┘
                        ▼
        ┌──────────────────────────────────────────────────────────────────────┐
        │ TOWER t  (anchored at p_t³, super-increasing band)                     │
        │                                                                        │
        │   rule of three (EXISTS: classifyBhIndex)  lane = idx mod 3            │
        │   cylinder wrap (EXISTS: zeta-quant)        ring=⌊idx/6⌋, phase=idx%6   │
        │   gap forcing  (EXISTS: zeta-quant)         0→same 2→2·1 4→1·2 (9589/9589)│
        │                                                                        │
        │   INTRA: S_{p_t} = {2·p_t·k + (k² mod p_t)}  ← Erdős–Turán Sidon set   │
        │          ► all intra-distances DISTINCT (THEOREM)        [NEW use]     │
        │   WEIGHT: × p_t³  ► tower-unique granularity             [NEW use]     │
        └──────────────────────────────────────────────────────────────────────┘
                        ▼  Φ(point) = anchor_t + sidon · p_t³        [NEW: STE]
        ┌──────────────────────────────────────────────────────────────────────┐
        │  GLOBAL DISTANCE MULTISET  { |Φ(a) − Φ(b)| }                           │
        │  ── intra band (small, per-tower) ──┐  ── inter band (large) ──┐       │
        │     distinct by Sidon+weight        │     distinct by super-inc │       │
        │            buckets CANNOT OVERLAP (separation dominates)               │
        │  ►►► QUANT-Δ verdict: UDP_HOLDS  (Δ1=1.000000  Δ2=0)  [NEW quant]      │
        └──────────────────────────────────────────────────────────────────────┘
                        ▼   injective distance ⟹ each edge is a GLOBAL KEY
        ┌──────────────────────────────────────────────────────────────────────┐
        │  PROJECTION TO A REAL GRAPH (EXISTS chain: PID_RANGE→…→TRIAD_STATE)    │
        │  emitter reads ONE distance ──► O(1) reverse-lookup ──► exact (t,i,j)  │
        │  WATCHERS (EXISTS): hookwall · gnn · shannon · bobby-fischer kernel    │
        │  every node triad_state = POTENTIAL · process_launch = 0 (held-safe)   │
        └──────────────────────────────────────────────────────────────────────┘
```

---

## 6. The rule-of-three triad and the prime-tier ladder (where STE plugs in)

Jesse's triad and prime tiers map cleanly onto STE + the existing registrar:
- **prime-1 agents** → `p^1` Sidon points (the read/writer **agent-1**, does the work).
- **prime-3 REAL free agents** → tower weighted by `p³` (the **agent-2** self-reflection lane,
  `classifyAgentType` `REAL-FREE` when `real + odd prime`).
- **prime-real-3³** → super-tower `(p³)³` for the **supervisor** that *calls the fabric* and
  sees all three (agent-1 work + agent-2 suggestion + fabric verdict).
- **prime-real-3⁵ / HRM+MTP on the frozen brain** → a `p⁵` weight tier (the operator's
  `n·prime·n⁵` separator), `FROZEN-BRAIN` when `real + even prime` — the watchers that read
  the lines "from the outside while still on the same machine."

The triad (`mintTriad` AGT/SUP/PROF sharing a hex base, `github-pid-register.mjs:71`) already
exists; STE just gives each tier its own coprime stride so a remote-control call from a
prime-1 agent to a prime-of-prime agent **draws a line whose length is globally unique** —
precisely Jesse's "NO line is ever the same distance."

---

## 7. The exact experiment + measurable receipt + held-safe path (Builder deliverable)

**New artifact to write (NEW, when authorized):**
`C:/asolaria-as-neural-network/tools/behcs/sidon-tower-embedding.mjs` — pure, deterministic,
HBP-rows-only, `mutates=0`, `process_launch=0`, importing the EXISTING
`PRIME_CUBE_PRIMES`/`mintPid`/`classifyBhIndex` (no duplication of canon). It exports
`steCoord(point)`, `runQuantDelta(towers)`, `emitRows()`, `selfTest()` — mirroring the
self-test/parity shape of every quant in §4 so it byte-matches across acer/liris.

**Exact experiment (the QUANT-Δ run):**
1. Build STE over the 11 behcs-256 anchors → 627 points (matches the probe).
2. Compute the full distance multiset; emit:
   ```
   QUANTDELTA|n_points=627|pairs=196251|distinct=196251|collisions=0|distinct_ratio=1.000000|min_sep=…|reverse_lookup_ok=196251|verdict=UDP_HOLDS|grade=PROJECTION_LICENSED|json=0
   ```
3. Negative control: re-run with the SHIPPED linear `bhIndex` → emit `verdict=UDP_VIOLATED`
   (collisions=1841 at N=256). Shipping both rows is the honest receipt: it shows *why* STE
   is needed, not just that it passes.
4. Seal as a parity baseline (time-free) so the 9589/9589-style "re-prove on every pyramid
   run" discipline extends to UDP.

**Measurable receipt:** `distinct_ratio = 1.000000` and `collisions = 0` on the real anchors,
byte-identical on both machines. That single row is the projection licence.

**Held-safe path (matches OUR canon exactly):**
- READ-ONLY on all sources; the only writes are my deliverable + scratch under
  `D:/asolaria-prime-towers-rebuild-2026-06-15/`.
- The new tool, when built, is `mutates=0`, no MCP publish, no mint, no cube mutation, no
  spawn — same contract as `token-cube-catalog-binder.mjs` / `pre-existence-graph-exporter.mjs`.
- Classification is **INFORMATIONAL, never gating** in v1 (same posture as ZETA-QUANT/QUANT4):
  UDP_HOLDS *licenses* a plot; it does not auto-fire one. `auto_fire = false`.
- Disputed Hilbert band 930–1229 still `DEFER_TO_OPERATOR`; STE bands are chosen disjoint
  from disputed ranges by construction.

---

## 8. Honest boundaries (what is proven vs. what is hypothesis)

- **PROVEN (measured on OUR anchors):** STE forces all 196251 pairwise distances distinct,
  zero collisions; the shipped linear embedding does not (1841 collisions at 256 points).
  The Sidon intra-tower distinctness is a classical theorem (Erdős–Turán), re-verified here.
- **EXISTS (cited code, passing self-tests):** the prime ladder, the prime-cube anchors, the
  mod-3 rule of three, the mod-6 cylinder + gap-forcing (9589/9589), the multi-modulus PID
  embedding, the QUANT4/QUANT8/ZETA-QUANT series, and the projection-chain exporter.
- **NEW (this facet's design):** the **Sidon-Tower Embedding (STE)** as the metric that
  actually delivers UDP; **QUANT-Δ** as the distance-quant member that gates projection; the
  identification that the shipped linearizer's "distinct positions ⟹ distinct distances"
  comment is a non-sequitur and is the one thing to fix.
- **HYPOTHESIS (needs the fabric / bilateral ack):** that the 100B PID pool's *full* address
  space (sector·lane·glyph + hilbert u32 + tier/prime/nest) can be re-keyed onto STE without
  disturbing the live PID Registration Office; the office "re-keys on ingest"
  (`github-pid-register.mjs` header) so this is plausible but must be asked of the fabric, not
  asserted. STE is additive and reversible — it can ride alongside the existing `cube_bh`
  as a *new distance channel*, leaving identity addressing untouched.

**Bottom line:** Jesse's claim is *correct in spirit and achievable in fact* — but only with
the right metric. The cylinder, the primes, the rule of three, and the quant series are all
real on our disk. The missing piece was a distance that is provably injective; STE supplies
it, QUANT-Δ measures it, and the 196251/196251/0 receipt is the licence to project the fabric
onto a real graph of real points.
```
