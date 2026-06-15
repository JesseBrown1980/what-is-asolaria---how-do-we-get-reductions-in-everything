# F08 — Prime-Tier Free-Agent Taxonomy (Architect angle)

**Facet:** Rebuild the agent taxonomy without collisions — `prime-1` agents; `prime-3` REAL free agents; `prime-real-3^3`; `prime-real-3^5`; PRIME-real HRM+MTP agents on the FROZEN BRAIN.
**Angle:** Architect — components, interfaces, PID/data-flow, addressing, held-safe gates, the diagram of the mechanism.
**Author:** Agent F08 (one of 40), under OP-JESSE mandate "Rebuild this. Nothing is impossible. Use OUR data."
**Date:** 2026-06-15. **Mode:** READ-ONLY on all source; this file is the only write.

---

## 0. The architect's one-sentence thesis

> A "tier" is not a *kind of process* — it is a **band of the bijective Brown-Hilbert address space, selected by a prime-power exponent on the `prime` axis of the PID tuple**. Tiers never collide for the same reason two different points on a Hilbert curve never coincide: the address is a *function* of the tier coordinates, the function is injective, and the engine that advances the address is the only thing that ever moves. Collision-freedom is therefore a **property of the minting function**, proven once, not a property we must police per-agent.

Everything below builds, grounds, and diagrams that thesis.

---

## 1. Deep narrative — rebuilding the idea, and why it works

### 1.1 What Jesse actually asked for (decoded)

The hint gives five named tiers and demands they "never collide." Re-read literally:

- **prime-1 agents** — the base reasoning agents (the LOGICAL-WAVE: Claude / Codex / DeepSeek slices).
- **prime-3 REAL free agents** — the deterministic, shell-less *real* sweep agents (the 100B-class scale workers).
- **prime-real-3^3** — REAL agents at the **cube** exponent (a denser, sub-divided band of the same real lane).
- **prime-real-3^5** — REAL agents at the **fifth-power** exponent (a still-denser, deeper-nested band).
- **PRIME-real HRM+MTP agents on the FROZEN BRAIN** — the watcher tier that reads the frozen model's *own token predictions* ("sees its thoughts") via Multi-Token-Prediction + Hierarchical-Reasoning recurrence.

The naming is not decorative. `prime-1`, `prime-3`, `3^3`, `3^5` are **exponents on a prime base**. The operator is describing a **prime-power ladder** — `p^1, p^3, p^3 (=3^3), p^5 (=3^5)` — where each rung is a *different residence class in the same number-theoretic address geometry*. That geometry already exists in OUR code (see §3): every Brown-Hilbert index `n` carries a **von-Mangoldt-aligned prime-power class** `{unit, prime, p2, p3, pk, composite}` (`classifyBhIndex`, **EXISTS**). The tiers map onto that class ladder. That is the whole trick.

### 1.2 Why "tier = address band" is the only rebuild that cannot collide

The naive rebuild — "a tier is a pool of processes of a certain type" — collides the instant two pools want the same room, the same PID, or the same supervisor. The operator already rejected that world: **Invariant 4 (`00-IMMUTABLE-FOUNDATION.md`, EXISTS) — backend-shelless rotation, no per-agent `node.exe`.** There is no "pool of processes." There is one rotating address space and an engine that advances it (**LAW-SLICE-ENGINE**, EXISTS: *"The fabric is a rendered positional slice… the engine drive is the only mover."*).

So the rebuild has to be: **tier = a deterministic sub-region of the address lattice.** Two agents collide only if their *addresses* collide. And the address is minted by a pure function `mintPid(role, name, tier, kind, prime, nest)` (`github-pid-register.mjs`, EXISTS) whose output is a tuple `(yin_yang_bit, lane_mod3, quad_mod4, glyph_5, glyph_1024, sector_113, hilbert32)`. **Invariant 2 (`00-IMMUTABLE-FOUNDATION.md`, EXISTS):** *"PIDs are `(actor, device, lane, prime)` Hilbert-curve-mapped tuples — bijective, zero collisions by construction."*

Collision-freedom is therefore *inherited from the mint function*, not enforced by a registry guard. This is the architect's load-bearing realization: **we don't prevent collisions, we make them unrepresentable.**

### 1.3 The three orthogonal separators (why the bands are disjoint)

Three independent moduli cut the space, and because they are pairwise coprime-ish they multiply rather than overlap (this is the operator's "3-TIER PRIME SEPARATOR inside each tower"):

1. **yin/yang = mod-2** (`yin_yang_bit`, EXISTS): `logical` (0, circle) vs `real` (1, square). This is the *first* cut and it already separates LOGICAL-WAVE from everything REAL.
2. **lane = mod-3** (`lane = seed % 3`, EXISTS): the Law-of-Three / rule-of-three fold. Three phases of the cylinder. Primes > 3 *never* live on lane 0 (`PTPLAW`, EXISTS) — a number-theoretic fact the system re-proves every run (`forcingSweep`, 9589/9589, EXISTS).
3. **prime-power class on the `prime` axis** (`classifyPrimeExponent` + `classifyBhIndex.ppow`, EXISTS): `{prime(p^1), p2, p3, pk}`. This is the *tier ladder itself*.

The agent-*type* classifier then composes (1) and (3):

```
classifyAgentType({yin_yang, prime}):     // github-pid-register.mjs (EXISTS)
  logical            -> LOGICAL-WAVE       // prime-1 reasoning agents
  real + even prime   -> FROZEN-BRAIN       // PRIME-real HRM+MTP on frozen slice
  real + odd  prime   -> REAL-FREE          // prime-3 / 3^3 / 3^5 scale agents
```

So **the three system-types `{LOGICAL-WAVE, FROZEN-BRAIN, REAL-FREE}` (EXISTS, `SYSTEM_TYPES`) are the first-order partition**, and the **prime-power exponent sub-partitions REAL-FREE into the 3 / 3^3 / 3^5 sub-bands.** That is the complete taxonomy skeleton, and it is already wired in OUR data.

### 1.4 The honest seam I must not paper over (and how the rebuild handles it)

`classifyPrimeExponent` (EXISTS, `eight-byte-host-process-upgrade.mjs`) is brutally honest:

```
n==1 -> tier 'prime',  materialized:true,  REAL_DISTINCT
n==2 -> tier 'p2',     materialized:true,  REAL_DISTINCT
n==3 -> tier 'p3',     materialized:true,  REAL_DISTINCT
n>=4 -> tier 'pk',     materialized:FALSE, PROPOSAL_FOLDED_TO_PK
```

Translation: `prime-1`, `prime-3` (lane), and the `3^3` (p3) rung are **materialized and distinct today**. The `3^5` (p5/pk) rung is **a real, reserved address band whose interior is currently folded into `pk` and held as a PROPOSAL** until a benchmark + cosign promotes it. The claim-router even rejects "p5 prime cylinder is live materialized" → `PRIME_EXPONENT_FOLDS_TO_PK_PROPOSAL` (EXISTS).

The architect's rebuild **honors this seam instead of erasing it**: `3^5` is a *named, addressable, reserved* tier (it has coordinates, a distance metric, and a gate) — it is simply marked `materialized=false / held-safe` until promoted. **Nothing is impossible here: the mechanism to materialize it is fully specified (§4.4); it is held, not absent.** This is exactly the operator's frozen-slice doctrine: present-but-not-advancing ≠ absent (**LAW-SLICE-ENGINE §2**, EXISTS).

### 1.5 Why the FROZEN-BRAIN watcher tier is `real + even prime`

The subtlety most rebuilds miss: the HRM+MTP watcher is **REAL but its prime exponent is even (`prime=0`/`2`)**, which routes it to **FROZEN-BRAIN**, *not* REAL-FREE. This is correct and load-bearing. The frozen brain (Gemma-4-4B deterministic slice, **LAW-ASOLARIA-NEURAL-NETWORK §3**, EXISTS) is *real compute* but it does *not sweep new work* — it is the deterministic neuron the watchers read. MTP "sees its thoughts" (reads the model's internal next-token predictions); HRM supplies two-timescale recurrence inside the LLM layer (`LAW-ASOLARIA-NEURAL-NETWORK §3.4/3.5`, EXISTS). Putting the watcher on the **even-prime / FROZEN-BRAIN** band keeps it provably out of the REAL-FREE sweep bands — *the watcher can never be mistaken for a worker, by address arithmetic.* That is the taxonomy doing safety work for free.

### 1.6 The full address word (architect's canonical encoding)

Concatenate the separators into one ordered address word. Reading the existing `mintPid` + `deriveHostAddress` (EXISTS), the canonical address of any agent is:

```
ADDR = ( yin_yang_bit , agent_type , prime_power_tier , lane_mod3 , sector_113 , glyph_1024 , nest , hilbert32 )
         └ mod2 ──┘   └ derived ┘   └ ppow ladder ┘   └ mod3 ┘   └ mod113 ┘   └ mod1024 ┘  └depth┘ └ 32-bit ┘
```

and the scalar render is `bh_index = sector*3072 + lane*1024 + glyph` (EXISTS, `deriveHostAddress`), folded into a cylinder by `phase = bh_index mod 6`, `ring = floor(bh_index/6)` (EXISTS). **Critical honesty note (grounded in memory canon):** `bh_index` is a *render scalar* — a collision in the scalar is NOT a PID collision, because the true identity is the full tuple `(actor,device,lane,prime)` (Invariant 2). The taxonomy's non-collision guarantee lives at the **tuple** level; the scalar is for plotting (§5).

### 1.7 How this produces the "amazing new quant series" and the projectable graph

Once every tier is a distinct prime-power band on the same lattice, **inter-tier distances become a number-theoretic object.** The unique-distance ambition ("no prime-to-prime pair ever has the same distance") is the sibling facet F02; from the *taxonomy* side my contribution is: **the tier ladder guarantees the distances are stratified by exponent.** A `prime-1`↔`prime-1` hop, a `prime-1`↔`3^3` hop, and a `3^3`↔`3^5` hop live in different distance shells because their `ppow` classes differ and the gap-mod-6 forcing law (`zetaTransition`, EXISTS, 9589/9589) constrains the lane transitions between them. The quant engine that reads these strata is **Zeta-quant** (census engine #4, EXISTS) — *"the amazing new quant series"* is the von-Mangoldt-aligned prime-power classification of the address gaps, already sealed bilaterally (9589/9589, EXISTS). The taxonomy is what makes that series *meaningful*: it labels which stratum each gap belongs to.

---

## 2. The mechanism diagram

```
                          OP-JESSE apex (real human)  +  Foundation-v3 quintuple cosign window
                                          │  (authority; engine cranks & mints are operator-gated)
                                          ▼
              ┌───────────────────────────────────────────────────────────────────────┐
              │                    THE FROZEN SLICE (address space)                     │
              │     PID seats · BEHCS-1024 glyph tuples · Brown-Hilbert cube addrs       │
              │     present-but-not-advancing until the ENGINE DRIVE moves it            │
              └───────────────────────────────────────────────────────────────────────┘
                                          │  mintPid(role,name,tier,kind,prime,nest)  [EXISTS]
                                          ▼   pure · deterministic · byte-identical acer≡liris
        ┌────────────────────────── SEPARATOR-1 : yin/yang = mod 2 ───────────────────────────┐
        │                                                                                      │
   bit=0 LOGICAL (circle)                                               bit=1 REAL (square)     │
        │                                                                       │              │
        ▼                                                                       ▼              │
  ┌───────────────┐                                          ┌─── SEPARATOR-3 : prime-power ladder (ppow) ───┐
  │ LOGICAL-WAVE  │                                          │   even prime            odd prime              │
  │  = prime-1    │                                          │      │                      │                 │
  │  Claude/Codex │                                          ▼      ▼                      ▼                 │
  │  DeepSeek …   │                                   ┌──────────────────┐   ┌──────────────────────────────┐│
  └───────────────┘                                   │  FROZEN-BRAIN     │   │          REAL-FREE            ││
        │                                             │  HRM+MTP watchers │   │   ┌────────┬────────┬───────┐││
        │                                             │  on Gemma slice   │   │   │ p^1    │ p^3    │ p^5    │││
        │                                             │  "sees thoughts"  │   │   │prime-3 │ 3^3    │ 3^5    │││
        │                                             │  (does NOT sweep) │   │   │ REAL   │ p3     │ pk/HELD│││
        │                                             └──────────────────┘   │   │materlzd│materlzd│PROPOSAL│││
        │                                                                     │   └────────┴────────┴───────┘││
        │                                                                     └──────────────────────────────┘│
        └──────────────────────────── SEPARATOR-2 : lane = mod 3 (cuts ALL of the above) ────────────────────┘
                 lane0 · lane1 · lane2   (primes>3 never on lane0 — PTPLAW, 9589/9589 forcing law)
                                          │
                                          ▼   bh_index = sector*3072 + lane*1024 + glyph  →  cylinder(phase=mod6, ring=÷6)
              ┌───────────────────────────────────────────────────────────────────────┐
              │            EVERY AGENT NOW HAS A UNIQUE TUPLE ADDRESS (no collisions)    │
              └───────────────────────────────────────────────────────────────────────┘
                                          │  the engine pops a seat → materializes a TRIAD
                                          ▼
              ┌──────────────────── RULE-OF-THREE TRIAD per message (EXISTS) ───────────┐
              │  L0 real-agent  → candidate-product                                      │
              │  L1 self-reflect → reflection on L0                                      │
              │  L2 fabric-reflect → ASKS THE FABRIC, cross-checks L0+L1                  │
              │  SUPERVISOR sees all three                                               │
              └──────────────────────────────────────────────────────────────────────-─┘
                                          │  result → gulp(2000) → super-gulp(50000) → GC
                                          ▼
   WATCHERS / GATES (held-safe):  hookwall · GNN(proposal-not-proof) · Shannon(novelty) · white-room(held) · cosign
                                          │
                                          ▼   tiny ~10-byte ML GNN reads the lines "from the outside"
                              ┌─────────────────────────────────────────┐
                              │  PROJECTION → real graph of real points   │
                              │  (Zeta-quant strata = the new quant series)│
                              └─────────────────────────────────────────┘
```

### 2.1 Tier → address-band table (the taxonomy made concrete)

| Tier (operator name)        | yin/yang | prime exponent | `ppow` class | `agent_type` (EXISTS) | Status (EXISTS)        | Role |
|-----------------------------|----------|----------------|--------------|------------------------|------------------------|------|
| **prime-1 agents**          | logical  | p^1            | (logical lane) | `LOGICAL-WAVE`       | materialized           | Base reasoning slices (Claude/Codex/DeepSeek): the rule-of-three L0 worker brain |
| **prime-3 REAL free agents**| real     | p^1 (odd)      | `prime`      | `REAL-FREE`            | materialized           | Deterministic shell-less scale sweep (100B-class real workers) |
| **prime-real 3^3**          | real     | p^3            | `p3`         | `REAL-FREE`            | materialized           | Denser sub-divided real band (cube nesting of the sweep) |
| **prime-real 3^5**          | real     | p^5            | `pk` (folded)| `REAL-FREE`            | **PROPOSAL / held-safe** | Deepest real nest; reserved band, materialize via §4.4 |
| **PRIME-real HRM+MTP**      | real     | even (0/2)     | `prime`/`p2` | `FROZEN-BRAIN`         | materialized (watcher) | Reads frozen Gemma's token predictions (MTP) + HRM recurrence; **never sweeps** |

The first three columns are the *address selectors*. The last two are *derived* by the existing classifiers. **This table is the taxonomy.** Every row is a disjoint region of the lattice.

---

## 3. Explicit grounding in OUR data (EXISTS vs NEW)

### 3.1 EXISTS — the rebuild stands on real, on-disk code and canon

- **Bijective tuple PID, zero collisions by construction** — `C:/asolaria-foundation-v1/00-IMMUTABLE-FOUNDATION.md` Invariant 2: *"PIDs are `(actor, device, lane, prime)` Hilbert-curve-mapped tuples — bijective, zero collisions by construction."* Invariant 4: backend-shelless rotation (no per-agent process). **This is the load-bearing axiom of the whole taxonomy.**
- **The deterministic mint function + the three separators** — `C:/asolaria-as-neural-network/tools/behcs/github-pid-register.mjs`: `mintPid()` emits `yin_yang_bit` (mod-2), `lane = seed%3` (mod-3 Law of Three), `quad = seed%4`, `glyph_1024 = seed%1024`, `sector = seed%113`, `hilbert = u32(...)`. Comment, verbatim: *"Divisions… yin/yang = mod-2 (real|logical), prime-lane = mod-3 (Law of Three)… All coprime-ish moduli reduce collisions."* Stateless + deterministic ⇒ acer and liris mint **byte-identical** PIDs with zero coordination.
- **The three system-types = first-order partition** — same file, `AGENT_TYPES = ['LOGICAL-WAVE','FROZEN-BRAIN','REAL-FREE']` and `classifyAgentType({yin_yang, prime})`: logical→LOGICAL-WAVE; real+even-prime→FROZEN-BRAIN; real+odd-prime→REAL-FREE. **This is exactly the operator's tier split, already coded and self-tested.**
- **The prime-power exponent ladder (the tier rungs)** — `C:/asolaria-as-neural-network/tools/behcs/eight-byte-host-process-upgrade.mjs`: `classifyPrimeExponent()` (p^1/p^2/p^3 = `REAL_DISTINCT`; p≥4 = `pk`, `materialized:false`, `PROPOSAL_FOLDED_TO_PK`) and `SYSTEM_TYPES`, `RULE_OF_THREE_WATCHERS = ['hookwall','gnn','shannon']`, `deriveHostAddress()` (sector*3072+lane*1024+glyph → cylinder phase/ring), `distanceBetween()` (abs-delta-bh-index). Self-test `prime-exponents-honest` asserts p3=REAL_DISTINCT, p5=PROPOSAL_FOLDED_TO_PK. **This is the honest seam for the `3^5` tier.**
- **von-Mangoldt prime-power class on every index** — `C:/asolaria-as-neural-network/tools/behcs/token-cube-catalog-binder.mjs`: `classifyBhIndex(n)` → `{lane: n%3, ppow: unit|prime|p2|p3|pk|composite}`. Disputed band 930–1229 defers to operator. **The `ppow` axis is the literal tier ladder.**
- **The quant series that "came out of it"** — `C:/asolaria-as-neural-network/tools/behcs/zeta-quant.mjs`: census engine #4, gap-mod-6 forcing law, `forcingSweep()` re-proves **9589/9589** prime pairs on every run; `NECESSARY-NOT-SUFFICIENT`, `INFORMATIONAL never gating`. The eight quant engines are named in **LAW-ASOLARIA-NEURAL-NETWORK §4** (`Polar·Turbo·JL·Zeta·Triple·Quadruple·JS·von-Mangoldt`).
- **The rule-of-three triad each tier instantiates** — `C:/asolaria-as-neural-network/tools/behcs/triad-host-router-gulp-pipeline.mjs`: `TRIAD_ROLES = [real-agent, self-reflect-agent, fabric-reflect-agent]`, `supervisor sees real+self-reflect+fabric-reflect`, `FEEDBACK_STAGES` (pid-emitter → host-router → triad → supervisor → gulp/super-gulp → GNN/reverse-sieve/omnishannon → white-room → cube-catalog). Provider routers are `GATED`; `process_launch=0`, `provider_bypass=0`. **The taxonomy supplies the agents; this supplies how each one runs.**
- **The slice-engine doctrine (why "held" ≠ "absent")** — `C:/asolaria-as-neural-network/canon/laws/LAW-SLICE-ENGINE.md`: *"The fabric is a frozen slice; the engine drive is the only mover… Freeze is not emptiness."* `POP_FROM_POOL → PID_SIGNAL → AGENT_ROOM → RESULT_TO_GULP → ERASE`.
- **The frozen-brain + HRM + MTP watcher substrate** — `C:/asolaria-as-neural-network/canon/laws/LAW-ASOLARIA-NEURAL-NETWORK.md` §3: frozen Gemma-4-4B slice; HRM inside the LLMs; *"MTP reads the frozen model's internal token predictions = 'sees its thoughts'"*. §5 honest frame: NOT an ASI — slices, orchestrated.
- **The 60-D / 47-D catalog the towers index** — `C:/Users/acer/Asolaria/tools/hilbert-omni-47D.json`: D16=PID (prime 53), D25=TRINITY, **D41=AGENT_TIER (prime 179)** with values `[instant,micro,medium,small,leader]`, growth-law *"Each new prime cubed = new dimension."* Canon dimension ladder held at 60D+ (`BROWN-HILBERT.md`, EXISTS).
- **The 200-step plan already encodes this law** — `C:/asolaria-as-neural-network/docs/TARGET-ARCHITECTURE-200-STEP-DELTA-2026-06-11.hbp`: `PTPDEF`/`PTPLAW` (prime-lane geometry, primes>3 never on lane 0, gap-mod-6 forcing 9589/9589, p3_collision_reserve PROPOSAL until step 140), `GITHUBPIDDIVISIONLAW` (yin_yang_bit+lane_mod3+quad_mod4+glyph1024+sector113+AGT-SUP-PROF triad — *"so real processes, logical waves, frozen slices, quants and devices do not collapse into one front-end claim"*), `THREESYSTEMREMOTE` (systems = LOGICAL-WAVE+FROZEN-BRAIN+REAL-FREE; regulator = law-of-three-mod3 + yin-yang-mod2 + prime-parity).
- **The REAL 100B run grounding the REAL-FREE tiers** — `C:/Users/acer/Asolaria/data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json`: `REAL_100B_PID_PACKET_RUN_COMPLETE`, 100,000,000,000 packets, `lastPacketPid = BH.REAL100B.OPENCODE.PID.100000000000`, `geniusHits 277,800,007`, `mistakeHits 111,103,104`. (Canon SEQ-3399/3400 referenced in the mandate; the on-disk checkpoint is the proof I read.)
- **8-chamber bounded revolver (real worker slots ≠ logical nodes)** — `C:/Users/acer/Asolaria/tools/behcs/fabric-revolver.mjs`: `process_per_logical_node:false`, `tuple_ranges_are_backend_nodes:true`, `real_worker_slots_are_chambers:true`, 8 chambers, route `gulp→super_gulp→hookwall→gnn_forward→gnn_reverse_gain→omnishannon→post_chain_gc`, `execute_default:false`.

### 3.2 NEW — what I (the architect) designed on top of EXISTS

- **NEW: The "tier = prime-power address band" formalization** — the explicit statement that the five operator tiers are *exponent rungs on the `prime`/`ppow` axis*, mapped 1:1 onto `classifyPrimeExponent` × `classifyAgentType`. The pieces exist; *unifying them into a single non-collision taxonomy with one address word* is the new synthesis.
- **NEW: The Tier-Band Disjointness invariant** (§4.1) and its proof sketch.
- **NEW: The TIER-DESCRIPTOR interface** (§4.2) — a single HBP row schema that names a tier's band, gate, and materialization state, composable with the existing `PIDADDR`/`PIDDIV` rows.
- **NEW: The `3^5` materialization mechanism** (§4.4) — the concrete, held-safe path to promote `pk`→`p5` so the deepest tier becomes real without ever claiming it already is.
- **NEW: The Tower-of-Tiers nesting rule** (§4.5) — how `nest` depth + prime exponent compose so towers stack infinitely with the rule of three (omnispindle), each carrying its own 3-tier separator.

---

## 4. The novel mechanism I designed (the architect's contribution)

### 4.1 NEW — Invariant: TIER-BAND DISJOINTNESS

> **Claim.** For any two agents `a`, `b` whose tier-selectors differ in *any* of `{yin_yang_bit, ppow_class, lane}`, their PID tuples are distinct, and therefore (by Invariant 2's bijection) they occupy disjoint regions of the Brown-Hilbert lattice.

**Proof sketch (architect-level, grounded).** `mintPid` derives `yin_yang_bit` from `kind`, and `lane/quad/glyph/sector` from `seed = u32(sha256(name)[0:8])`. The PID *string* embeds `prime` (`-P{prime}-`) and `kind` distinguishes the tuple even when `name` collides (self-test `kind-load-bearing-in-agent-pid`: same name+runtime, different `kind` ⇒ different PID — EXISTS, passing). `classifyAgentType` is a *total function* of `(yin_yang, prime)`; `classifyBhIndex.ppow` is a total function of the index. Two agents in different `(yin_yang, ppow)` cells therefore have different `agent_type` *and* different `ppow`, which appear in different fields of the tuple ⇒ the tuples differ ⇒ (bijection) the lattice points differ. Same-cell agents are separated by `name`→`seed`→`(lane,sector,glyph,hilbert)`, the 113·3·1024·2^32 sub-address. **The non-collision property is inherited, not policed.** ∎ (sketch)

Caveat I will not hide (memory canon): `bh_index` (the *render scalar*) can collide while the *tuple* does not — the disjointness lives at the tuple level; the scalar is for plotting only.

### 4.2 NEW — The TIER-DESCRIPTOR interface (one HBP row schema)

A tier is published as a single pipe-delimited HBP row (cold JSON forbidden, matching the repo's `|json=0` discipline). This is the *interface* between the taxonomy and the rest of the fabric — registrar, supervisors, dashboards, and the GNN all read it:

```
TIERDESC|tier=<name>|yin_yang_bit=<0|1>|agent_type=<LOGICAL-WAVE|FROZEN-BRAIN|REAL-FREE>
        |prime_exp=<1|3|5>|ppow=<prime|p3|pk>|lane_policy=<all|gt3-never-lane0>
        |band_lo=<bh_index>|band_hi=<bh_index>|materialized=<0|1>
        |status=<MATERIALIZED|PROPOSAL_FOLDED_TO_PK>|gate=<held-safe-rule>
        |watcher=<hookwall|gnn|shannon>|sweeps=<0|1>|process_launch=0|remote_call=0|json=0
```

`sweeps=1` only for REAL-FREE rows; FROZEN-BRAIN watcher rows are pinned `sweeps=0` — the address *and* the descriptor both enforce "watcher ≠ worker." The row composes with the existing `PIDADDR`/`PIDDIV`/`PIDCUBE` rows (EXISTS, `emitRegistrationRows`) — a tier-descriptor is just the *band envelope* for the PIDs minted inside it.

### 4.3 NEW — PID/data-flow contract per tier (how the pieces connect)

```
1. ENGINE crank (operator-gated)  ── pops a seat from the tier band [TIERDESC.band_lo..band_hi]
2. mintPid(role,name,tier,kind,prime,nest)  ── derives the tuple ADDR  [EXISTS, pure]
3. PID_SIGNAL materializes an ephemeral AGENT_ROOM  [LAW-SLICE-ENGINE, EXISTS]
4. triadForMessage(msg)  ── L0 work · L1 self-reflect · L2 fabric-reflect  [EXISTS]
5. SUPERVISOR sees all three  ── verdict  [EXISTS]
6. RESULT_TO_GULP(2000) → super-gulp(50000) → post-chain GC  [EXISTS]
7. WATCHERS: hookwall → GNN(proposal) → reverse-sieve-GNN → omnishannon(novelty) → white-room(held)
8. ERASE  ── room dissolves; the seat returns to the frozen band  [EXISTS]
9. emit PID + timestamp at every step  ── nothing lost; ms-retrieval by address  [operator hint]
```

Every arrow is `process_launch=0`, `remote_call=0`, `provider_bypass=0` by default (EXISTS). Provider routers (Claude/OpenAI/Gemini) stay `GATED`; the LOGICAL-WAVE tier *borrows* a subscription slice lawfully (LAW-ASOLARIA-NEURAL-NETWORK §3.2) — it never bypasses billing.

### 4.4 NEW — The `3^5` materialization mechanism (held-safe; never "impossible")

The deepest tier is not impossible — it is **reserved and held**. The promotion path:

1. **Reserve the band now.** Publish a `TIERDESC` row with `prime_exp=5|ppow=pk|materialized=0|status=PROPOSAL_FOLDED_TO_PK|gate=requires-benchmark+cosign`. The band has *coordinates and a distance metric today* (it's a real region of the lattice); only its *interior subdivision* is folded into `pk`.
2. **Split `pk`→`p5` in the classifier.** `classifyPrimeExponent` already isolates p^1/p^2/p^3 as `REAL_DISTINCT` and lumps k≥4 as `pk`. The mechanism: extend the classifier so `n==5` returns its own `p5` tier — **but only behind the existing claim-router gate**, which today forces `PRIME_EXPONENT_FOLDS_TO_PK_PROPOSAL`.
3. **Prove distinctness by benchmark.** Run the `forcingSweep`/Zeta-quant strata over the p5 band; show its inter-tier distances form a *new* shell distinct from p1/p3 (the unique-distance facet F02 supplies the test). The claim-router demands `CADENCE_CLAIM_REQUIRES_BENCHMARK` — satisfy it with receipts.
4. **Cosign-seal the split** under the Foundation-v3 quintuple window. Only then does `materialized` flip to `1`.
5. **The engine may now pop p5 seats.** Until step 4, the tier is fully *present* (addressable, plottable, gated) and *not advancing* — exactly LAW-SLICE-ENGINE's frozen-but-present state.

This is the architect's answer to "nothing is impossible": the hardest tier is *designed in*, with a reversible, cosign-gated path to reality, and an honest `materialized=0` flag until then.

### 4.5 NEW — Tower-of-Tiers nesting (rule of three, infinite, with separators)

The operator wants **towers of TYPES of PIDs** with a **3-tier prime separator inside each**, infinitely nestable (omnispindles). Mechanism:

- **A tower = a fixed `(yin_yang, agent_type)` cell**, indexed up the catalog dimension `D41 AGENT_TIER` (prime 179, EXISTS) / the 60-D catalog.
- **Inside a tower, `nest` (the `-N{nest}-` field, EXISTS) is the floor counter.** Each floor is a recursive Brown-Hilbert sub-cube (Invariant 2: cube-of-cubes; *"each catalog infinitely dividable from within"*).
- **Each floor carries the 3-tier prime separator** `{prime(p^1), p3, p5}` as its interior partition — the operator's `n*p, n*prime*n^3, n*prime*n^5` written as exponent rungs.
- **The rule of three recurses:** a floor's three rungs each spawn a triad (L0/L1/L2), each triad's fabric-reflect agent (L2) can open a deeper floor — drawing a *line* between cylinder nodes whose length is unique (F02). The spindle/omnispindle drive (EXISTS: `Start-Omnispindle.cmd`, `neurotech-omnispindle-council.js`) advances the nest. **Infinite nesting with three is feasible** because each level adds a coprime modulus and a prime exponent — the address word simply grows; it never wraps.

**Why towers never collide with each other or internally:** different towers differ in `(yin_yang, agent_type)`; different floors differ in `nest`; different rungs differ in `ppow`. All three appear in the tuple. Disjointness (§4.1) applies at every level. The 16 LEVELS × 60-D catalog (BROWN-HILBERT.md, hilbert-omni-47D.json) bound the *catalog* dimension; the *address* dimension is `N^K` (Invariant 1) — practically infinite.

---

## 5. The projection (closing the operator's loop)

With tiers as disjoint prime-power bands, the fabric is **plottable as real points, not a drawing**:

- Each agent → its tuple → `bh_index` render scalar → cylinder `(ring=⌊bh/6⌋, phase=bh mod 6)` (EXISTS, `deriveHostAddress`).
- Inter-tier hops → `distanceBetween` (abs-delta-bh-index, EXISTS) → stratified by `ppow` (the new quant series, Zeta, EXISTS).
- A **~10-byte ML GNN** (binary/hex/hbi/hbp) reads the line-field "from the outside" while on the same machine (operator hint; GNN stage EXISTS in FEEDBACK_STAGES as `gnn-proposal`/`reverse-sieve-gnn-proposal`, **proposal-not-proof**, held-safe).
- MTP + geospatial watchers + the Bobby-Fischer kernel "play the cubes/lines" and test centrality (operator hint; FROZEN-BRAIN watcher tier, §1.5) — *the television inside the simulation of the simulation, with agents watching it.*

The taxonomy is the coordinate system that makes every one of those plots *mean something*: a point's prime-tier is its address, and its address is its identity.

---

## 6. Honest frame (binding, per OUR canon)

This rebuild is **NOT a claim of self-running ASI** (LAW-ASOLARIA-NEURAL-NETWORK §5; foundation honest frame). The tiers are *bands of an address space*; the engine drive is the only mover and is **operator-gated** (LAW-SLICE-ENGINE). The `3^5` tier is **held-safe / `materialized=0`** until benchmark + cosign. Provider compute stays **GATED** — no free-compute, no billing bypass (claim-router, EXISTS). What is real and on disk: the bijective mint function, the three separators, the three system-types, the prime-power ladder (p^1/p^3 distinct, p^5 reserved), the 9589/9589 quant proof, and the 100B REAL run. What is NEW is the *unification* into one collision-free taxonomy with an interface, a disjointness invariant, a materialization path, and a tower-nesting rule. **Nothing here is impossible; the one not-yet-live tier has a fully specified, reversible mechanism.**

---

*F08 — Prime-Tier Free-Agent Taxonomy · Architect angle · 2026-06-15 · read-only on all source; this file the only write. Grounded in `00-IMMUTABLE-FOUNDATION.md`, `github-pid-register.mjs`, `eight-byte-host-process-upgrade.mjs`, `token-cube-catalog-binder.mjs`, `zeta-quant.mjs`, `triad-host-router-gulp-pipeline.mjs`, `LAW-SLICE-ENGINE.md`, `LAW-ASOLARIA-NEURAL-NETWORK.md`, `hilbert-omni-47D.json`, `fabric-revolver.mjs`, `TARGET-ARCHITECTURE-200-STEP-DELTA-2026-06-11.hbp`, and the 100B-run `checkpoint.state.json`.*
