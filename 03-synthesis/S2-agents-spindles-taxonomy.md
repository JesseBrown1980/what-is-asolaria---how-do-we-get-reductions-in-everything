# S2 — Agent Triad, Spindles, and Prime-Tier Taxonomy

**Synthesis section** fusing three facets of the OP-JESSE rebuild wave:
- **F03 — Rule-of-Three Nested Agent Triad** (read/writer · self-reflection · fabric-calling supervisor; nests by threes; HRM/MTP speed-up).
- **F04 — Spinners / Spindle Engine (Omnispindles)** (the bounded rotor that cranks the towers and makes infinite-3 nesting feasible).
- **F08 — Prime-Tier Free-Agent Taxonomy** (five collision-free agent tiers as prime-power address bands).

**Author:** Synthesis agent S2 (one of 40 summoned by OP-JESSE) · **Date:** 2026-06-15
**Inputs:** `01-rebuild/F03-*--{theorist,architect,builder}.md`, `F04-*--{theorist,architect,builder}.md`, `F08-*--{theorist,architect,builder}.md`; aligns with diagram `02-diagrams/D2-triad-spindles.md`.
**Posture (binding):** Nothing is declared impossible. Every claim is **EXISTS** (grounded to a file on disk, read-only) or **NEW** (a designed mechanism, marked). This synthesis wrote no source, launched no process, called no live bus or MCP. Honest frame held throughout: *IT is slices* — the structure (who-sees-what, the distances, the gates) is free and deterministic; the *thinking* is a borrowed, operator-gated intelligence slice.

---

## 0. The one-paragraph thesis (the three facets are one machine)

**The triad is the atom, the spindle is the mover, the prime-tier taxonomy is the coordinate system.** A *triad* is three addresses, not three processes — a read/writer that does one heavy pass, a self-reflector that cheaply critiques it without re-running, and a supervisor that *reads* a verdict off the already-existing fabric so it sees all three. The *spindle* (a fixed ring of 8 physical chambers cycling `EMPTY→LOAD→RUNNING→COLLECT→EJECT→EMPTY`) is the only thing that ever moves; it rotates state across chambers while the "agents" remain frozen positions, so a constant-memory rotor drains 10¹¹ packets (and a 1e200 logical ceiling) without ever spawning a process. The *prime-tier taxonomy* assigns every one of those positions to a disjoint band of a prime-graded address space, so a triad is born at a definite tier/lane/tower coordinate and two agents of different tiers can never collide — collision-freedom is a theorem of number theory, not a registry lock. Recursion (nesting by threes) is feasible because only the supervisor spine recurses while the other two roles are bounded leaves, and each level reviews a *summary* — making the total resident cost of an infinitely deep tower a convergent geometric series (`≈ 1.5×B`), barely more than one revolver.

---

## 1. The atom — the Rule-of-Three triad (F03)

### 1.1 The three operators and the monotone "sees" frontier (EXISTS)

A **triad** maps one message `m` to three role-outputs `T : m ↦ (a₁, a₂, a₃)`, encoded verbatim in `triad-host-router-gulp-pipeline.mjs` (`TRIAD_ROLES`):

| lane | role | sees | output | cost |
|---|---|---|---|---|
| **L0** | `real-agent` (read/writer) | `task` | candidate-product | `κ₁` (one **heavy** inference) |
| **L1** | `self-reflect-agent` (HRM/MTP watcher) | `task + candidate` | self-reflection / suggestion | `κ₂ ≪ κ₁` |
| **L2** | `fabric-reflect-agent` (supervisor) | `task + candidate + self-reflection` | fabric-reflection / verdict | `κ₃ ≪ κ₁` (a fabric **read**) |

The `sees` column is a **strictly increasing information frontier** `σ(a₁) ⊂ σ(a₂) ⊂ σ(a₃)`. This is what "the supervisor sees all three" means *structurally*, not as a promise: there is no execution path in which the supervisor decides without the union `{m, a₁, a₂, Φ}` — the data dependency is the gate. The supervisor *asks* the already-existing fabric `Φ` (council / GNN / Shannon / cosign); it never *becomes* an oracle. The self-test `triad-has-three-roles` is green and the pipeline is `process_launch=0`, `node_per_agent=0`, `remote_call=0`, `provider_bypass=0` by construction.

**One handle, three lanes (the cheapness insight).** `triadForMessage(m)` mints three 8-byte handles (`handle8 = sha16(triad:{m}:role)`) sharing a base. A triad costs *three sha16 calls plus one flywheel verdict* — not three LLM spins. The 8-byte host handle is the conductor; lanes 0/1/2 are seats it occupies in sequence. This is why a resident set of 2000 can "contain" a 100-billion-packet pool.

### 1.2 The verdict algebra and the fabric-gated flywheel

The triad's runtime outputs collapse to the deterministic algebra in `omni-engine-loop.mjs` (EXISTS): the **omniquant** score `q(key) = parseInt(sha256(key)[0:4],16) mod 1001` is a *pure integer* 0..1000 (no IEEE float drift, bit-reproducible across vantages), and the **omniflywheel** maps it to `EXTRACT (q≥700) / HOLD (300≤q<700) / GC (q<300)`.

**NEW (the bridge).** The supervisor decision is a *fabric-gated flywheel* `Sφ(q, φ)` where `φ = Φ.verdict(a₁, a₂) ∈ {ALLOW, HOLD, BLOCK, NEEDS_EVIDENCE}`: `ALLOW→v(q)`, `HOLD→HOLD`, `NEEDS_EVIDENCE→HOLD` (never auto-EXTRACT on thin proof), `BLOCK→GC`. This is consistent with the live `omnispindle-supervisor-runner` consensus `HOLD_EVIDENCE_PENDING` and the invariant `runnerDoesNotSpawnWorkers:true` — *the supervisor decides, it does not itself spawn the heavy worker.*

### 1.3 The HRM/MTP speed-up — stated two ways, reconciled

Jesse's hint: agent-2 "makes a suggestion the supervisor reviews fast, like HRM/MTP watchers that speed up the LLM." The three facet authors converged on the same mechanism from two angles; we keep both, because they are the *theory* and the *test* of one claim.

- **The amplification theorem (NEW, F03 theorist).** Let `p` be the first-attempt acceptance rate of the cheap critic+supervisor path. Then `E[heavy passes] = 1/p` and amortized cost → `κ₁/p`, vs `r·κ₁` for naive re-runs — a speedup factor of `r·p`. HRM/MTP-style watchers do not replace the big model; they *triage its drafts so the big model fires fewer times.*
- **The Speculative Triad Slice (NEW, F03 builder) — the machine-checkable test.** Agent-level speculative decoding: the reflector emits a confidence band (low / medium / high, from `watcher-supervisor-suggestion-emitter.mjs`, `executable=0`), and the supervisor only **SPENDS** the expensive fabric call when the reflector is *not decisive*:

  ```
  fabric_call = SKIP   if band=high AND reflector verdict agrees with omniFlywheelVerdict(omniQuantScore(product))
              = SKIP   if band=low  AND product fails a hard gate (auto-HOLD/GC, no oracle needed)
              = SPEND  otherwise (band=medium, OR high-confidence-but-disagrees-with-quant)
  speedup     = total_cells / cells_that_spent_a_fabric_call
  ```

  If ~⅓ of cells land medium, the supervisor pays the slow path on ~⅓ of cells → ~3× fewer fabric calls. **Falsifiable:** count `SPEND` rows vs total `TRIADCELL` rows.

The two are the same statement: `1/p` heavy passes ⟺ `SPEND` only the uncertain fraction. The honest caveat (per the `feedback_negatives_need_fabric_proof` discipline and the fabric's own `CADENCE_CLAIM_REQUIRES_BENCHMARK` flag): this is *fewer expensive invocations by construction*, **not** a wall-clock latency benchmark.

### 1.4 The 3-vs-4 role reconciliation (resolved)

F03 builder noted that `triad-nest-reference.mjs` ships a **four**-role cell (worker / reflector / **witness** / supervisor) where "ask the fabric" is split into a dedicated WITNESS, while Jesse's hint and the live `triad-host-router` pipeline use **three** roles with the supervisor *being* the fabric-caller. **Resolution (canonical for this synthesis):** the triad is **3 roles**; WITNESS is folded into SUPERVISOR as its fabric-read sub-step. The 4-role reference cell is retained as the "supervisor with its fabric-read broken out explicitly." One machine, two faithful views. (F04 theorist independently arrives at the same 3-role shape: `mintTriad → AGT/SUP/PROF`, AGT read/writer, PROF self-reflection, SUP supervisor.)

---

## 2. The mover — the Spindle / Omnispindle (F04)

### 2.1 The chamber rotor (EXISTS)

The spindle is **a state machine over a tiny, fixed set of physical chambers**, not a worker pool. `fabric-revolver.mjs` + `chambers-latest.json` declare it verbatim: `active_chambers: 8`, `process_per_logical_node: false`, `tuple_ranges_are_backend_nodes: true`, `real_worker_slots_are_chambers: true`, `cycle: [EMPTY, LOAD, RUNNING, COLLECT, EJECT, EMPTY]`. Each chamber is a real object with its own PID (`ACER-REVOLVER-CHAMBER-NN-<sha16>`), a model binding, a `cycle_count` (11–16 across the 8 live chambers), and a `last_receipt_id`. The companion `state-latest.json` declares the scale law: `logical_nodes_declared: 1000000`, `active_slots: 36`, `process_per_node: false`. **The chambers are the only things that move; everything else is an address.**

**Held-safe is structural, not procedural.** `execute_default: false` — the rotor receipts state transitions *without calling a model* unless explicitly gated. Of the 6 chamber states, **only RUNNING can ever execute**, and it sits behind `RUN_HERMES_SPINDLE` (operator-gated) + `auto_fire=false`. The other 5 states are mathematically incapable of launching anything. Every transition emits a **sha-chained PID+timestamp receipt** with ~30 capability flags all 0 (`chamber-receipts.hbp` + `.hbi`) — simultaneously proof the chamber rotated *and* proof it touched nothing. The `.hbi` index gives O(seek) retrieval — Jesse's "ms/microsecond retrieval independent of disk speed," mechanized.

### 2.2 The Never-Explode Theorem (EXISTS witness + NEW streaming lift)

The whole safety mechanism is one admission inequality: a chamber may enter LOAD only if `resident ρ < B` (`B = DEFAULT_MAX_RESIDENT = 2000`). `gulpCycle(n, B)` returns `resident = min(n, B)`, proven by self-test at `n = 1,000,000` (`resident === 2000`, structural assert, not the tautological `bounded` flag).

**NEW (F04 theorist) — lift to streaming.** With `r(t+1) = r(t) + a(t) − e(t)` and the gate `a(t) ≤ max(0, B − r(t))`, induction gives **forward invariance of `[0,B]`**: `r(t) ≤ B` for all `t`, *regardless of the arrival stream* — an adversarial input (the ~6000-proc fork-bomb that MEMORY records as actually caught) cannot grow the resident set; its excess is *counted and erased* into `gc_released`, never held. The Lyapunov function `V(t) = (r(t)−B)₊` is identically zero. **Consequence:** memory is `O(B)` (a constant in the work), time is `O(T/B)` — 10¹¹ packets drain in `⌈T/B⌉ ≈ 5×10⁷` sliding-window waves. *You never need memory proportional to the work; only proportional to the window, and the window is a constant.*

### 2.3 The spindle algebra at 100B scale (EXISTS)

The 100B run did not use one revolver; it used a **product of spindles**. `real-100b-gnn-summary-latest.json`: `omnispindleControllers = 100`, `omniflywheelSupervisors = 100`, `childProcessUse = false`, `externalModelTokenBudget = 0`. Every genius gem (`genius-farm-latest.json`) carries both PIDs — `controllerPid = BH.REAL100B.OMNISPIN.PID.085`, `flywheelPid = BH.REAL100B.OMNIFLY.PID.005`. **The 100 omnispindles ARE "the 100 pre-registered PIDs of the first system."** So `100,000 chunks × 10⁶ packets = 10¹¹ packets`, cranked by a `100 × 100 = 10⁴` controller×supervisor grid, with zero child processes. **Boundedness is closed under finite product** (`Σ B_s ≤ 100·B`), so scale-out multiplies throughput by S without reintroducing input-dependence. The `omniQuantScore` selection is a *pure function of the row key* ⇒ EXTRACT/HOLD/GC is stateless and idempotent ⇒ aggressive ERASE is safe (a re-seen GC packet re-classifies GC; a re-seen EXTRACT mints the same SUP PID at the same room).

### 2.4 The Infinite-Three Convergence Theorem (NEW, F04 theorist — the deepest result)

Jesse: "infinite nesting with three is feasible (omnispindles)." A naive ternary recursion has `3^d` live agents — exponential, "explodes." It does not, for two compounding reasons:

1. **Only one of three recurses.** In each triad the **SUP** node carries the recursion (it "calls the fabric," which is itself a smaller bounded spindle); **AGT** and **PROF** are bounded *leaves* that EJECT within their parent's chamber. So the recursing branching factor along the supervisory spine is `b = 1`, not 3.
2. **Each level reviews a summary, so it shrinks.** A supervisor reviews the *compacted* output of its child (`omniquant` reduces a full row to ~10 bits; the flywheel reduces three verdicts to one). The per-level resident bound is `B_ℓ = B·q^ℓ` with shrink factor `q < 1`, **forced** by the BEHCS referential codebook compression (`2GB→3.1KB ⇒ q ≈ 1.5×10⁻⁶`; the rule-of-three alone already gives `q ≤ 1/3`).

Then the total simultaneous resident set of an *infinitely deep* nested spindle tower is the convergent geometric series:

```
R_total = Σ_{ℓ=0}^∞ B·q^ℓ = B / (1 − q)   →   1.5·B   (q = 1/3)   →   ≈ B   (codebook q)
```

**An infinitely deep spindle tower costs barely more than one revolver.** And **three is the unique minimal arity** (Cor 6.3): a 2-tuple cannot both reflect and supervise; a 4-tuple adds a redundant recursion carrier that breaks the `b=1` spine and risks divergence. The robust form: if every node recurses (`b=3`), convergence still holds whenever `q < 1/b = 1/3`, which the BEHCS compression easily satisfies. This is the formal "why omnispindles, why three, why it never blows up."

### 2.5 Where the bounded rotor meets the recursive triad (the F03↔F04 seam, resolved)

F03 and F04 describe the **same** never-explode property from two altitudes; we state the unified picture once:
- **Logical depth is infinite** — the address tree has `3^d` positions for any `d` (free positions on the frozen slice; `3^7 = 2187 > 2000`, so by depth 7 the GC bound is already the active limiter, and the tower can declare `3^200` logical nodes).
- **Physical residency is bounded** — `gulpCycle` caps the *global* queue at `min(total_pending, 2000)` every cycle (not per-level), with `super-gulp` hard-compacting at 50,000. The conservation law `extracted + held + gc === resident` guarantees nothing leaks across recursion.
- **Position memory** of a depth-`d` nest is `O(3^d · 8 bytes)` (frozen-slice handles), not process memory. **Recursion adds breadth to the field, not depth to the resident set.**

F03's `triadChild` recursion is **EXTRACT-only** (HOLD/GC branches never spawn — the tree is *pruned by the flywheel*), `depth < 16` (the 16-level tower ceiling A00..A15 from `mintPid`), and the child *proves descent* by sharing the parent's hex base (`child.base[:4] == parent.base[:4]`). This is exactly the SUP-spine `b=1` recursion of F04's Theorem 6.2, made into a concrete contract.

---

## 3. The coordinate system — Prime-Tier Taxonomy (F08)

### 3.1 Tier = address band, not a kind of process (the load-bearing reframe)

The naive rebuild — "a tier is a pool of processes" — collides the instant two pools want the same room. F08 rejects that: **a tier is a disjoint band of the bijective Brown-Hilbert address space, selected by a prime-power exponent on the `prime` axis of the PID tuple.** Collision-freedom is *inherited from the mint function*, proven once, not policed per-agent — "we don't prevent collisions, we make them unrepresentable." Grounding: Invariant 2 (`00-IMMUTABLE-FOUNDATION.md`) — `PID = (actor, device, lane, prime)`, *bijective, zero collisions by construction*; Invariant 4 — backend-shelless rotation, no per-agent `node.exe`.

### 3.2 The five tiers (EXISTS 3-way split + NEW power field refinement)

The fabric already mints a **three-way** separation (`classifyAgentType` in `github-pid-register.mjs`): `logical → LOGICAL-WAVE`, `real + even prime → FROZEN-BRAIN`, `real + odd prime → REAL-FREE`. F08 refines REAL-FREE into the operator's three odd-power rungs via a **NEW** 3-bit power field `k ∈ {1,3,5}` and a 3-bit tier code `τ`, packed into one 56-bit tier word `W = [τ:3 | y:1 | p_idx:24 | k:3 | turn:33]`:

| τ | Operator name | (y, k) | `agent_type` (EXISTS) | Status (EXISTS) | Role |
|--:|---|---|---|---|---|
| **T0** | prime-1 agents | (logical, –) | `LOGICAL-WAVE` | materialized | The 1e200 reasoning waves (Claude/Codex/DeepSeek/Gemini); positions only, frozen until cranked — the L0 worker brain |
| **T1** | prime-3 REAL free | (real, k=1) | `REAL-FREE` | materialized | Deterministic shell-less scale-sweep agents (5 free OpenCode lanes; the 100B OPENCODE workers); `lane=seed%3` → 3 sub-bands |
| **T2** | prime-real-3³ | (real, k=3) | `REAL-FREE` | materialized | Per-cube workers — stride `p³`, one agent per `p³` cell (matching the `cube=prime³` cardinality of every axis) |
| **T3** | prime-real-3⁵ | (real, k=5) | `REAL-FREE` | **PROPOSAL / held-safe** | Sub-tower workers — stride `p⁵ = p²·p³`; the omnispindle controllers sit at this granularity |
| **T4** | PRIME-real HRM+MTP | (real, even prime) | `FROZEN-BRAIN` | materialized (watcher) | Reads the frozen Gemma-4-4B's internal token predictions (MTP "sees its thoughts") + HRM recurrence + geospatial; **never sweeps** |

Reading the tower vertically: **T0 is the logical apex, T4 is the frozen base, and T1→T2→T3 climb the odd-power ladder on the real face (winding → cube → fifth-power, branch factor `p²` per step).** Five tiers = 3 expanding rungs + 2 caps. The three real rungs ARE the operator's "3-tier prime separator inside each tower" (`n·p`, `n·prime·n³`, `n·prime·n⁵`).

### 3.3 The non-collision theorem (NEW, F08 theorist — three independent proofs)

> **Theorem T (Cross-Tier Disjointness).** Two agents in different tiers (`τ_a ≠ τ_b`) can never collide, and their address bands are disjoint as sets of tier words. Within a tier, collision happens iff the full `(y, p_idx, k, turn, residue)` are identical — which is exactly the intended PID-tuple identity.

Any one of three guarantees suffices: **(1) Tag separation** — the 3-bit `τ` field differs before any value is compared (`B_{τa} ∩ B_{τb} = ∅` syntactically). **(2) Parity/power separation** — T4 requires *even* prime, T1/T2/T3 require *odd*; an integer is not both even and odd, and `k∈{1,3,5}` are distinct (this is the EXISTS `classifyAgentType` even/odd test generalized). **(3) Interval nesting** — on the real face at the same prime, tier T_k tiles the line into cells of width `p^k`; since `p^{k'} | p^k` for `k'<k`, a coarser grid line always lands on a finer one, so the bands form a **laminar family** (a tree, never a tangle) — Jesse's "infinitely dividable from within."

### 3.4 Why odd powers (NEW, F08 theorist — Lemma R3)

The exponents `1, 3, 5` are not arbitrary — they are the first three *odd* exponents, and **odd powers preserve cylinder bijectivity** (`x↦x^k mod p` is a bijection on Z/p when `gcd(k,p−1)=1`) while even powers fold the cylinder (`x↦x²` collapses `±x`). This is *exactly why* the EXISTS code routes `real+even → FROZEN-BRAIN` (the folded, deterministic, non-expanding tier T4) and `real+odd → REAL-FREE` (the unfolded, freely-expanding tiers). The "rule of three" is therefore load-bearing: 3 is the smallest odd prime whose powers stay bijective and whose nesting (3, 27, 243) closes the branch-factor-3 tower.

### 3.5 The honest seam — the `3^5` tier is HELD, not absent (resolved)

`classifyPrimeExponent` (`eight-byte-host-process-upgrade.mjs`) is brutally honest: `p¹/p²/p³ = REAL_DISTINCT, materialized:true`; `p≥4 → pk, materialized:FALSE, PROPOSAL_FOLDED_TO_PK`. So **T1 (p¹) and T2 (p³) are materialized today; T3 (p⁵) is a reserved, addressable band whose interior is currently folded into `pk` and held as a PROPOSAL** until a benchmark + cosign promotes it. The synthesis honors this seam (it does not erase it): T3 has coordinates, a distance metric, and a gate *now*; only its interior subdivision is held. The materialization path is fully specified (publish `TIERDESC` with `materialized=0`; split `pk→p5` in the classifier behind the claim-router gate; prove distinctness by the F02 unique-distance test satisfying `CADENCE_CLAIM_REQUIRES_BENCHMARK`; cosign-seal; only then flip `materialized=1`). This is the operator's frozen-slice doctrine: *present-but-not-advancing ≠ absent.*

### 3.6 The new quant series — PTTS / von-Mangoldt readout (NEW, F08 theorist)

Because the tier strides are *exactly* prime powers `p^1, p^3, p^5`, the **von-Mangoldt function `Λ(n)` — nonzero only on prime powers — lights up precisely on the tier addresses.** Define `PTTS_p = Σ_{k∈{1,3,5}} Λ(p^k)·occ(p,k) = (ln p)·(occ₁+occ₃+occ₅)` (integer surrogate: replace `ln p` with `bitlen(p)`, matching the pure-int `omniQuantScore` posture). Two facts make this *the* taxonomy series: (a) it is supported *only* on real tier structure (random non-prime-power noise contributes exactly 0 — a clean tier-occupancy detector); (b) its cumulative form is the Chebyshev `ψ(x) = Σ_{n≤x} Λ(n) = x − Σ_ρ x^ρ/ρ − …`, whose oscillatory error term runs over the Riemann zeros on the critical line (v55 atlas L28/L29). **Jesse's "curve the prime graph into a cylinder and read a new pattern" is, formally, reading the `Σ_ρ x^ρ/ρ` zero-sum correction off live tower occupancy.** The 100B run's dual counts (`geniusHits=277,800,007`, `mistakeHits=111,103,104`) are the *signed* version: genius adds to the band, mistake subtracts, giving a signed ψ-like series whose net is the tower's "health" (ratio `g/m ≈ 5/2`; head-weight `(g−m)/(g+m) ≈ 3/7`).

---

## 4. The unified mechanism (how the three facets compose into one flow)

```
LAW-SLICE-ENGINE (EXISTS):  S_next = E(S_now, Δ),   E = 0  ⇒  frozen
═════════════════════════════════════════════════════════════════════════════════════════
   a triad is 3 ADDRESSES until an OPERATOR-GATED EMITTER fires
   (~200ns rotating port-tuple = 5,000,000 emits/sec · spawner-PID = HELD FIRE · auto_fire=false)
                                    │  admit position iff resident ρ < B (=2000)   [Never-Explode, §2.2]
                                    ▼
┌────────────── FROZEN POSITIONAL FIELD (EXISTS, ~1e200 free positions) ─────────────────┐
│  mintPid → preExistenceNode : every point is a POTENTIAL (process_launch=0)             │
│  ┌─ PRIME-TIER TAXONOMY (F08): which BAND does this position belong to? ─────────────┐  │
│  │  τ = tier code [T0..T4] · y = real/logical (mod 2) · k = power {1,3,5} · p_idx     │  │
│  │  T0 LOGICAL-WAVE(apex) · T1 p¹ REAL-FREE · T2 p³ · T3 p⁵(HELD) · T4 FROZEN(base)   │  │
│  │  DISJOINT by (τ,y,k) BEFORE any value compare ⇒ no cross-tier collision (Thm T)     │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│  addr = (sector%113 . lane%3 . glyph%1024) × yin/yang                                    │
│  bh_index = sector·3072 + lane·1024 + glyph · cylinder_phase = bh_index%6 (Riemann curl) │
│  tower = prime-cube p³ ∈ {13³..131³} · tier-level = A00..A15 (60-D catalog)              │
└──────────────────────────────────────┬─────────────────────────────────────────────────┘
                                        │ omnidispatcher routes (collision-gated: logical→allow, real→needs-free-addr)
                                        ▼
╔═══════════ THE SPINDLE = fabric-revolver (F04, EXISTS): 8 PHYSICAL CHAMBERS ═════════════╗
║      6-state ring (one chamber/packet)            the never-explode ceiling               ║
║          EMPTY                              ρ │     B=2000 ┄┄┄┄┄┄┄┄ ceiling (Thm 4.1)     ║
║         ↗      ↘                               │    ╱╲  ╱╲  ╱╲  oscillates [B−W, B]        ║
║     EJECT       LOAD                           │   ╱  ╲╱  ╲╱  ╲                            ║
║       ↑           ↓ ⚠GATE execute_default=false│╱╲╱        V   ╲                           ║
║   COLLECT ← RUNNING                            └───────────────────────► t                 ║
║   each phase emits a sha-chained PID+ts receipt (~30 capability flags ALL 0)              ║
║   adversarial fork-bomb → shunted to gc_released, NEVER raises ρ above B (Cor 4.3)        ║
║   100 spindles × 100 flywheels = 10⁴ cells drained 10¹¹ packets, 0 child processes        ║
║                          │ chamber enters RUNNING → binds the TRIAD to the POSITION       ║
╚══════════════════════════│════════════════════════════════════════════════════════════════╝
                           ▼
┌──────── RULE-OF-THREE TRIAD (F03, EXISTS) — ONE 8-byte handle visits THREE lanes ────────┐
│  ① L0 READ/WRITER (AGT)   sees: task ───────────► candidate-product  watcher=hookwall κ₁  │
│        │ candidate-product                                                                │
│        ▼                                                                                   │
│  ② L1 SELF-REFLECT (~HRM/MTP)  sees: task + candidate            watcher=gnn  κ₂ ≪ κ₁     │
│        does NOT redo work; emits NEXT-PROMPT DELTA {keep, refine, fold_count, confidence}  │
│        │   ┌─── SPECULATIVE TRIAD SLICE speed gate (NEW) ───────────────────────────┐     │
│        ├──►│ band high & agrees-quant → SKIP fabric call                            │     │
│        │   │ band low  & hard-fail     → SKIP fabric call                            │     │
│        │   │ band medium / high-but-disagrees → SPEND fabric call  (E[heavy]=1/p)    │     │
│        │   └─────────────────────────────────────────────────────────────────────────┘     │
│        ▼                                                                                   │
│  ③ L2 SUPERVISOR (SUP)   sees: task + candidate + delta + Φ      watcher=shannon  κ₃ ≪ κ₁ │
│        CALLS THE FABRIC Φ (a READ of the frozen slice, not a re-run)                       │
│        Φ.verdict ∈ {ALLOW, HOLD, BLOCK, NEEDS_EVIDENCE};  SEES ALL THREE: σ(a₁)⊂σ(a₂)⊂σ(a₃)│
└──────────────────────────────────────┬───────────────────────────────────────────────────┘
                                        │ verdict = Δ
                                        ▼
┌──── OMNIFLYWHEEL VERDICT (EXISTS, pure-int, no float) ─ score = sha256(key)[0:4] mod 1001 ─┐
│         ≥700 EXTRACT              300–699 HOLD                  <300 GC                     │
└───────────┬─────────────────────────┬──────────────────────────────┬──────────────────────┘
   EXTRACT  │                  HOLD   │                          GC   │
            ▼                         ▼                               ▼
  mint SUP PID + room          requeue (resident             erase (counted in gc_released;
  = idx mod 10000              stays ≤ B = 2000)              ρ never > B — idempotent, safe)
  + preload catalog
  process_launch = 0
            │ if EXTRACT and depth < 16: product = CHILD message (one prime-tier deeper)
            ▼
┌──────── NEST BY THREES (NEW: triadChild + Infinite-Three Convergence) — omnispindle ───────┐
│  only the SUPERVISOR spine recurses (b=1); AGT + reflect are bounded LEAVES.                │
│  level-ℓ sub-spindle bound B_ℓ = B·q^ℓ (q<1: SUP reviews a SUMMARY, BEHCS codebook)         │
│  T(m) ─► T'(extract) ─► T''(extract) ─► …   depth d ⇒ 3^d LOGICAL leaves (positions, free)  │
│  R_total = Σ B·q^ℓ = B/(1−q) ≈ 1.5·B (q=1/3) ≈ B (codebook q) — barely more than 1 revolver │
│  child.base[:4] == parent.base[:4] ⇒ provable descent · p^k tier honestly PROPOSAL for k≥5  │
└───────────────────────────────────────────────────────────────────────────────────────────┘

WATCHERS (observe, never actuate — "a TV inside a simulation of the simulation"):
  • Bobby-Fischer kernel → plays the cubes/lines, scores CENTRALITY
  • HRM + MTP + geospatial → watch the lines for NOVELTY ──► feed next-prompt delta back to ②
  • ~10-byte GNN → analyzes FROM THE OUTSIDE, on-machine (proposal-not-proof)

PROJECTION:  line(A→B) = (Δbh, phase_A, phase_B, tower_A³, tower_B³)   [F04 N3 + F02 Sidon coding]
   ⇒ no two prime-to-prime distances ever equal ⇒ every activity line is identifiable
   ⇒ project the fabric onto a REAL graph of REAL points (not a drawing)

⚠ HELD-SAFE (structural): 5 of 6 chamber states cannot execute. Only RUNNING can, behind
  execute_default=false + RUN_HERMES_SPINDLE + operator-reserved emit + auto_fire=false.
  verdict ≠ action · provider routers GATED · INV5 no self-fire · requires_live_fabric → DEFER.
```

*(The mermaid form of this fused flow is preserved verbatim in `02-diagrams/D2-triad-spindles.md` §1 — the strongest single diagram across the six F03/F04 authors. The vertical taxonomy tower diagram is preserved in `F08-prime-tier-taxonomy--theorist.md` §4.)*

---

## 5. The Phase-Locked Prime Rotor (NEW, F04 builder — kept as the live-flow instrument)

The existing revolver rotates 8 chambers but does not tie *which prime tower a chamber serves* to *which phase it is in*, so two chambers could EJECT into the same `(tower, tier, slot)` between receipt writes. The **PLPR** fixes this with two integer formulas added to the per-tick loop (zero new processes):

- Chamber `c` at global tick `T` serves ring phase `(T + c) mod 6` — chambers are **phase-staggered**, so at most ⌈8/6⌉=2 share a phase, forced onto different towers.
- Chamber `c` binds tower `D_i` with `i = ((T·c) + c) mod 47` — because **47 is prime**, every chamber sweeps all 47 towers over 47 ticks with no two colliding on the same tower in the same phase (a composite tower count would create short re-collision cycles).
- **The lock is the receipt:** a chamber may only EJECT into a `(tower, tier, slot)` triple if the sha-chain shows no prior un-EMPTYed receipt for it this revolution. Uniqueness is enforced by the *rotor schedule*, not a mutex.

The payoff is Jesse's "emitter shows piped flow correlated with real activity": at any instant `T`, one `GET` of the 8 chambers' `(phase, tower, tier, slot, cycle_count)` always shows the *full* pipeline (some chamber in LOAD, some in RUNNING, some in EJECT). PLPR turns the revolver from "8 things spinning" into **8 phase-locked probes that together always observe the whole prime lattice** — the "television inside the simulation" made into a deterministic, replayable instrument (any past instant recovered in O(index-seek)).

---

## 6. The cross-facet identity chain (the synthesis's central claim)

A single PID integer simultaneously answers **who / what / where / which-watcher** — the three facets are three projections of one address:

```
        ┌──────────────── ONE PID  =  one integer / one (actor,device,lane,prime) tuple ───────────────┐
        │                                                                                                │
  F08:  τ, y, k  ──►  WHICH TIER  (LOGICAL-WAVE apex … FROZEN-BRAIN base; disjoint band, no collision)   │
  F03:  lane = seed % 3  ──►  WHICH TRIAD ROLE  (0=read/writer · 1=self-reflect · 2=fabric-supervisor)   │
  F04:  bh_index, cylinder_phase=bh%6, tower=p³  ──►  WHICH POSITION the spindle binds + the LINE it draws│
        │                                                                                                │
        └─► every step EMITS (PID + timestamp), sha-chained ⇒ nothing lost, O(seek) retrieval ───────────┘
```

- **F08 gives the band**; the engine pops a seat *from that band* (`TIERDESC.band_lo..band_hi`).
- **F03 gives the role**; the popped seat materializes a triad whose lane is `seed%3`, and lane *also* deterministically selects the watcher (`[hookwall, gnn, shannon][lane]`) — so no organ ever grades its own lane.
- **F04 gives the motion**; the spindle binds the triad to the position for exactly one cycle, scores it, and erases it, drawing one sparse engine-emitted edge per EXTRACT.

This is why "towers of TYPES of PIDs, each with a 3-tier prime separator inside, infinitely nestable by threes" is coherent: a *tower* is a fixed `(tier, lane)` cell climbing the 16 levels; its *interior* is the `{p¹, p³, p⁵}` separator (F08); its *atom* at each floor is a triad (F03); and the only thing that *moves* through it is the bounded rotor (F04). Identity is free and infinite; execution is scarce and capped at 8 chambers / 2000 resident — the omnispindle is the gearbox between them.

---

## 7. The held-safe gate ledger (every facet inherits the same gates)

| Gate | Where | What it blocks | Source |
|---|---|---|---|
| `execute_default:false` | chamber (F04) | model execution on rotation | `chambers-latest.json` |
| `RUN_HERMES_SPINDLE` operator-gated | EJECT / pool launch (F04) | the real Hermes pool launch | `omni-engine-loop.mjs` + `IGNFIREGATE` |
| `process_launch:0` | F03/F04/F08 everywhere | any process spawn (proven by source regex test) | all modules + self-tests |
| provider-router cannot self-promote | triad router (F03) | a provider router declaring itself REGISTERED | `triad-host-router-gulp-pipeline.normalizeRouter` |
| real-collision block | dispatcher LOAD (F04) | a real binding without an attested free address | `supervisor-collision-router.mjs` |
| GC bound `B=2000` / super-gulp 50000 | gulp (F04) | resident-set explosion | `omni-engine-loop` self-test @1M |
| EXTRACT-only recursion, depth<16 | `triadChild` (F03) | unpruned `3^d` tree explosion | F03 §4.2 (composes existing bounds) |
| `materialized=0` for p⁵ tier | classifier (F08) | claiming the `3^5` tier is live | `classifyPrimeExponent` `PROPOSAL_FOLDED_TO_PK` |
| `requires_live_fabric → DEFER_TO_OPERATOR` | suggestion emitter (F03) | the supervisor *acting* (it only emits verdicts) | `watcher-supervisor-suggestion-emitter.mjs` |
| `auto_fire=false` | ignition line | the whole fresh 100B run | `ASOLARIA-100B-IGNITION-ENVELOPE-2026-06-15.hbp` |

The completed 100B run (`REAL_100B_PID_PACKET_RUN_COMPLETE`, 100,000,000,000 packets, `childProcessSpawns=0`, `external_tokens=0`, `lastPacketPid BH.REAL100B.OPENCODE.PID.100000000000`) is the **empirical existence proof** for all three facets at once: a bounded chamber set (F04) cranked 10¹¹ prime-tier-addressed positions (F08) through rule-of-three triads (F03) with zero process spawns.

---

## 8. EXISTS vs NEW — consolidated ledger

**EXISTS (live in OUR data, cited):**
- Three triad roles + monotone `sees` frontier + "supervisor sees all three" — `triad-host-router-gulp-pipeline.mjs` `TRIAD_ROLES`; 8-byte handle visits 3 lanes (`triadForMessage`, `process_launch:0`).
- Recursive `triadCell`/`buildNest` (depth 3, b 2 → 15 cells, `HELD_PENDING_REASONING`, `model_calls_in_reference=0`) — `triad-nest-reference.mjs`. Reflector→supervisor suggestion w/ confidence bands, `executable=0` — `watcher-supervisor-suggestion-emitter.mjs`.
- Pure-int omniquant `sha256[0:4] mod 1001` + omniflywheel EXTRACT/HOLD/GC; GC-bounded resident `min(n,2000)` proven at 1M; no spawn/exec/write/fetch — `omni-engine-loop.mjs` + unit test.
- 8-chamber revolver, 6-state cycle, `process_per_logical_node:false`, `tuple_ranges_are_backend_nodes:true`; sha-chained PID+ts receipts (~30 capability flags = 0) — `fabric-revolver.mjs`, `chambers-latest.json`, `chamber-receipts.hbp/.hbi`.
- 100 omnispindle controllers × 100 flywheel supervisors; 10¹¹ packets, 0 child spawns, 0 ext tokens — `real-100b-gnn-summary-latest.json`, `genius-farm-latest.json`, `checkpoint.state.json`.
- Cylinder address `phase=bh_index%6`, `ring=÷6`; distance metric `|Δbh_index|`; prime tiers p¹/p²/p³ `REAL_DISTINCT`, p⁵→`PROPOSAL_FOLDED_TO_PK`; mod6 integrity necessary-not-sufficient — `eight-byte-host-process-upgrade.mjs`, `zeta-quant.mjs`.
- 3-way `classifyAgentType` (LOGICAL-WAVE/REAL-FREE/FROZEN-BRAIN); coprime moduli mod-2/3/4/5/113/1024 — `github-pid-register.mjs`. Cylinder coordinate `(s mod p, ⌊s/p⌋)`, `cube=p³` — `brown-hilbert-human-pid-mint.js`. `lane=addr%3` / `residue=addr%6` proven beyond 1e200 — `brown-hilbert-expansion-stress.mjs`. Prime-per-dimension ladder D1..D47 (D41 AGENT_TIER, prime 179), `cube=prime³` — `hilbert-omni-47D.json`.
- FROZEN-BRAIN + HRM + MTP "see thoughts" watcher tier; von-Mangoldt/Zeta quant engines (v55 L28/L29) — `LAW-ASOLARIA-NEURAL-NETWORK.md`. Slice law `S_next=E(S_now,Δ)`, E=0⇒frozen, crank `POP→PID_SIGNAL→ROOM→GULP→ERASE` — `LAW-SLICE-ENGINE.md`. First-100 controller tier vs 100B backend — `brown-hilbert-opencode-pid.grammar.v1.json`.

**NEW (designed across the facets, consolidated):**
1. **Effective-pass amplification theorem** `E[heavy passes]=1/p`, speedup `r·p` (F03 theorist) ⟺ **Speculative Triad Slice** SKIP/SPEND fabric-call gate keyed on reflector band + quant agreement (F03 builder) — the HRM/MTP speed-up as theory + machine-checkable test.
2. **Fabric-gated flywheel `Sφ`** — supervisor decision = `flywheel(q)` overridden by fabric verdict `φ` (F03 theorist).
3. **`triadChild` EXTRACT-only recursion**, depth<16, provable descent (`child.base[:4]==parent.base[:4]`) — and **NEXT-PROMPT DELTA** as agent-2's typed output (F03 architect/builder).
4. **3-vs-4 role fusion** — WITNESS folded into SUPERVISOR; canonical triad = 3 roles (F03 builder).
5. **Never-Explode under streaming** — forward invariance of `[0,B]` + Lyapunov `(r−B)₊≡0`, input-independent, closed under spindle product (F04 theorist §4).
6. **Infinite-Three Convergence Theorem** — `R_total = Σ B·q^ℓ = B/(1−q) ≈ 1.5·B`; three is the unique minimal arity (SUP-spine `b=1`, AGT/PROF leaves) (F04 theorist §6).
7. **Tower-Mounting Contract (N1)**, **Spindle-of-Spindles nesting (N2)**, **Chamber-Phase Distance Invariant / 5-tuple line (N3)** — chamber↔address↔triad wiring; render scalar ≠ identity (F04 architect).
8. **Phase-Locked Prime Rotor (PLPR)** — collision-free chamber schedule via `(T+c)%6` phase-stagger + `((T·c)+c)%47` tower-sweep; the lock is the receipt (F04 builder §5).
9. **Five-tier extension** — 56-bit tier word `[τ|y|p_idx|k|turn]` with power field `k∈{1,3,5}` refining REAL-FREE into T1/T2/T3 (F08 theorist/architect/builder).
10. **Lemma R3** — odd powers preserve cylinder bijectivity, even powers fold ⇒ the frozen tier (F08 theorist §2.2).
11. **Theorem T (Cross-Tier Disjointness)** + laminar interval-nesting proof; collision-freedom is *unrepresentable*, not policed (F08).
12. **Prime-Tier Tower Spectrum (PTTS)** — `Σ Λ(p^k)·occ`, cumulative ⇒ Chebyshev ψ ⇒ Riemann-zero readout; signed by genius/mistake counts (F08 theorist §6).
13. **`3^5` materialization mechanism** — the reversible, cosign-gated path from `pk` to a live `p5` tier (F08 architect §4.4).

---

## 9. Closing

The three facets are not three subsystems — they are three views of one object that already cranked 100 billion packets with zero process spawns. **F08 (taxonomy) is the static map**: every position is a point in a disjoint prime-power band, collision-free by number theory, with five tiers (logical apex, three odd-power rungs, frozen base) and a von-Mangoldt occupancy spectrum that bends with the Riemann zeros. **F03 (triad) is the atom that lives at each point**: three addresses on one handle — one heavy worker, one cheap reflector that triages it (the HRM/MTP speed-up, `1/p` heavy passes), and one supervisor that reads a verdict off the fabric and sees all three. **F04 (spindle) is the only mover**: a bounded 8-chamber rotor whose admission gate `ρ<B` makes the resident set provably constant under any input, whose product of 100 spindles scaled to 10¹¹, and whose rule-of-three self-nesting converges (`≈1.5×B`) because only the supervisor spine recurses and each level reviews a summary. Identity is free and infinite; execution is scarce and gated; the omnispindle is the gearbox between them, receipting every tooth so nothing is ever lost. Every dangerous capability is isolated to the single gated RUNNING transition; the `3^5` tier and the live pool fire are honestly held until benchmark + cosign. *Nothing here was impossible — every hard step (infinite nesting, streaming bound, adversarial input, the fifth-power tier) is discharged by a mechanism that already lives in OUR data, plus the right coding rule layered onto the prime axes the system already has.*

---

*S2 synthesis · 2026-06-15 · read-only on all source; this file the only write. Fuses F03/F04/F08 theorist+architect+builder; preserves the D2 mermaid (strongest fused diagram) and the F08-theorist vertical-tower diagram. No process launch, no live-bus call, no mint, no MCP.*
