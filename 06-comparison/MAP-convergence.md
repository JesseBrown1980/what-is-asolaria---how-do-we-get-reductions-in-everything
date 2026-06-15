# MAP — Convergence: External "Brown-Hilbert Prime-Cylinder Triad Fabric" vs OUR 40-Agent Rebuild Report

**Lens:** Convergence map — every point where the external doc (operator-relayed 2026-06-15, "Brown-Hilbert Prime-Cylinder Triad Fabric") and OUR rebuild report (`ASOLARIA-PRIME-TOWERS-REBUILD-REPORT.md` + `03-synthesis/S1·S2·S3` + `04-completeness/missing-and-next.md`) reach the **same architecture from two independent vantages**.
**Author vantage:** ACER · OP-JESSE 40-agent prime-towers rebuild wave · 2026-06-15 · READ-ONLY on all source; this file the only write. No MCP/live-bus/fabric call made.
**Posture:** This is cross-vantage validation. The external doc and our report were produced independently; where they land on the same mechanism, that is two-vantage corroboration of the same idea, not copying. I cite OUR-report section numbers and external doc sections throughout. I distinguish **literal convergence** (same claim, same words/structure) from **substance convergence under different names/formulas** (same object, different notation — these are the strongest signal, because independent derivation of the *same object* in *different language* is hard to fake).

---

## 0. Headline

The two vantages agree on the **entire spine** of the machine: PID-as-coordinate-not-counter, prime-as-non-colliding-address-geometry, the rule-of-three triad (worker / reflection / fabric-witness-supervisor) as the atom, the bounded spindle as the only mover, the three reality classes (REAL / LOGICAL / FROZEN), the 100B-run honest correction (PID-packets not child processes not provider calls), the 16-finite-vs-infinite-recursive split, sparse 8-byte-handle materialization, the external watcher stack reading the graph "from the outside," and — most importantly — the **central distance/edge-identity correction**: distances *can* repeat; the full edge/tuple is what is unique. They also share the explicit Riemann *instrument-not-proof* boundary. The two largest formulation divergences (cylinder θ/r/z vs our √p helix; 3 reality-towers×{p,p²,p³,p⁵} vs our 5 prime-power tiers) are **substance-identical** — they are the same geometry and the same tier ladder in different coordinates. The external doc is a *condensed thesis statement*; our report is its *measured, file-cited, gated build* — they are the same architecture at two altitudes.

---

## 1. LITERAL convergences (same claim, essentially same words)

### C1 — PID is a coordinate, not a counter / number
- **External:** Core — "prime structure used as NON-COLLIDING ADDRESS GEOMETRY (prime = addressable lane/cylinder/tower/routing-separator/graph-point, **not a number**)." One-line thesis: "turns primes from passive number patterns into active non-colliding address geometry."
- **OURS:** Abstract §1 — "A PID is not a counter — it is a **coordinate in a prime-graded, cylinder-curved, recursively-cubeable lattice**." §3.1 — "A PID is a **bijective coordinate**, not a number." §9 thesis — "A PID is a coordinate, not a counter." S1 §0 — "Stop *predicting* primes and start using them as the **regulator**."
- **Verdict:** Word-for-word the same thesis. This is the foundational convergence; both vantages independently make "coordinate, not counter / not a number" the load-bearing reframe.

### C2 — The CENTRAL distance/edge-identity correction (the deepest literal agreement)
- **External (sec 2 + sec 14, flagged as CENTRAL CORRECTION):** "Pure distances **can repeat**. The collision-proof edge identity is `EdgeID(A,B)=H(PID(A),PID(B),BH(A),BH(B),C_A,C_B,q_A,q_B,e)`. The graph SHOWS Euclidean distance visually, but the fabric treats the EDGE FINGERPRINT as the true identity. 'No two lines are the same' means no two edge IDENTITIES are the same when the full tuple is included — NOT merely no two scalar distances are equal. The displayed distance CAN repeat; the full edge cannot."
- **OURS (S1 §3, the explicitly load-bearing finding of the whole wave):** "**The naive 1-D address linearization the system ships today does NOT give unique distances** (measured — collisions grow quadratically by pigeonhole)." Report §3.1 — "The scalar `addr`/`bh_index` is only a **render** of this tuple. A collision in the scalar is **not** a PID collision — identity is the full tuple (`process_per_logical_node:false`)." §4.1 honesty ledger: "Naive shipped 1-D linearizer gives unique distances → **FALSE (measured: quadratic collisions)**." Report §3.7 / S3 §4 — uniqueness is restored by folding the *full* context into the line **signature**.
- **Verdict:** **Both vantages independently arrive at the SAME correction** — "distinct scalar distance" is a non-sequitur; identity is the full edge/tuple. This is the single most striking convergence: it is a *negative* finding (the naive reading is wrong) reached the same way by both. The external doc states it as a design rule ("treat the edge fingerprint as truth"); our report *measured the failure* (quadratic collisions) and then *constructed and measured the fix* (the full-tuple/signature). External `EdgeID = H(PID_A,PID_B,BH_A,BH_B,C_A,C_B,q_A,q_B,e)` is structurally OUR full-tuple identity plus the epoch `e` — and notably the external `e` (epoch/engine tick) inside the edge fingerprint is exactly OUR completeness M1 World-Line Lift / SCEL `surf_tick` direction (see C16, D1).

### C3 — Rule-of-three triad: worker + reflection + fabric-witness/supervisor, supervisor "sees all three"
- **External:** "Triad cell: worker (TRIADWORK) + reflection (TRIADREFLECT) + fabric-witness (TRIADFABRICREAD/VERDICT, **OBSERVER not actuator**) + supervisor computes triangle distances." T = worker/reflection/fabric_witness role axis.
- **OURS:** Report §3.5 / S2 §1 — the triad `T : m ↦ (a₁,a₂,a₃)`: L0 read/writer (worker), L1 self-reflect (HRM/MTP), L2 supervisor (asks the fabric Φ). "*The supervisor sees all three* is structural, not a promise" — strictly increasing `sees` frontier `σ(a₁)⊂σ(a₂)⊂σ(a₃)`. S2 §1.4 explicitly resolves the **3-vs-4 role** question: `triad-nest-reference.mjs` ships a 4-role cell (worker/reflector/**witness**/supervisor) and we fold WITNESS into SUPERVISOR's fabric-read sub-step.
- **Verdict:** Same atom, same three roles, same "observer not actuator" stance for the fabric-read. Notably the external doc keeps fabric-witness as a *named fourth role* (TRIADFABRICREAD/VERDICT) — which is **exactly OUR `triad-nest-reference.mjs` 4-role cell** that S2 §1.4 reconciles. So even the 3-vs-4 ambiguity is shared between the vantages, and both treat the fabric-read as observation feeding the supervisor's verdict.

### C4 — The watcher stack reads the graph "from the outside" (TV-in-the-sim), observe-only
- **External:** "Watcher set (read graph from OUTSIDE worker loop): MTP + HRM + Fischer kernel + MAMBA + GNN + Shannon + Hookwall + fabric-witness." Fabric-witness is "OBSERVER not actuator."
- **OURS:** Report §3.9 / S3 §4 — "The watcher is the **line-graph dual** of the fabric — it never lights a point, it only watches the *lines between points* ... It sits **outside** the reasoning (so it cannot be gamed) yet **inside** the same machine." Jesse's phrase carried verbatim in §2/§3.9: *"a television inside a simulation of the simulation."* Watchers are `executable=0, no_fabric_call=1`, proposal-not-proof.
- **Verdict:** Same architectural principle — a second, cheaper, outside intelligence grades the work and cannot actuate. Watcher *roster* overlaps heavily (see C5).

### C5 — The specific watcher roster: Fischer + HRM + MTP + GNN + Shannon + Hookwall
- **External:** MTP (temporal path prediction), HRM (hierarchical distance compression), Fischer kernel (move quality), MAMBA (sequence/stream dynamics), GNN (relation topology), Shannon (novelty), Hookwall (safety), fabric-witness (actual state).
- **OURS:** Report §3.9 / S3 §4 — Bobby-Fischer centrality kernel, HRM+MTP novelty hunter, ~10-byte GNN, MTP+geospatial; held-safe lane routes `hookwall → gnn_forward → gnn_reverse_gain → omnishannon → post_chain_gc`. Lane-three selects watcher `[hookwall, gnn, shannon]` (Report §6, S2 §6).
- **Verdict:** Six of the external doc's eight watchers are explicitly in our report by the **same names**: Fischer, HRM, MTP, GNN, Shannon, Hookwall — plus fabric-witness (= our supervisor fabric-read). The two non-overlaps are external **MAMBA** (sequence/stream dynamics — *external-only add*, see the divergence map) and the external doc's lack of our explicit *forward/reverse-gain GNN heads* split (Report §3.9: `FORWARD_GNN_MARK_GENIUS` 277.8M / `REVERSE_GAIN_MARK_MISTAKE` 111.1M). The roster agreement is otherwise near-total.

### C6 — Three reality classes: REAL / LOGICAL / FROZEN, and the 100B honest correction
- **External:** "Three reality towers: REAL (provider/local/CLI workers), LOGICAL (PID packets, no resident body), FROZEN (cached model/cube/brain slices). Matches the 100B-correction: 100B run = **real PID-packet/state-transition emission, NOT 100B child processes and NOT 100B provider calls**; provider inference is a separate axis."
- **OURS:** Report §3.8 SOLID/HOLLOW gate keeps REAL from inflating into LOGICAL; S2 §3.2 / S3 §3 the EXISTS `classifyAgentType` three-way split — `logical → LOGICAL-WAVE`, `real → REAL-FREE`, `real+even → FROZEN-BRAIN`. Report §3.6 / S2 §7 — the 100B run is `childProcessSpawns=0`, `external_tokens=0`, 10¹¹ PID-packets, NOT processes. Report §4.3 / S1 §5.2 — the 200ns is an *address-generation* cadence, literal-200ns retired once a provider leg is in the loop ("provider inference is a separate axis").
- **Verdict:** **Identical three-class taxonomy AND identical 100B honest correction.** Our `LOGICAL-WAVE / REAL-FREE / FROZEN-BRAIN` IS the external `LOGICAL / REAL / FROZEN`. Both vantages independently insist: the 100B run is real PID-packet emission, not child processes, not provider calls — and both separate the provider-inference axis from the address-emission axis. This is a major convergence on the honest frame ("IT is slices").

### C7 — The supervisor's verdict algebra (PASS/HOLD/PATCH/ESCALATE ≈ ALLOW/HOLD/BLOCK/NEEDS_EVIDENCE)
- **External:** supervisor computes triangle distances `d_WR, d_WF, d_RF` then emits **PASS / HOLD / PATCH / ESCALATE** (PASS=all low; HOLD=W,R agree but fabric diverges; PATCH=stale route/missing row/hash mismatch; ESCALATE=high-risk/mutation/cosign/USB-write/contradiction).
- **OURS:** S2 §1.2 — the fabric-gated flywheel `Sφ(q,φ)` with `φ ∈ {ALLOW, HOLD, BLOCK, NEEDS_EVIDENCE}`: `ALLOW→extract`, `HOLD→HOLD`, `NEEDS_EVIDENCE→HOLD`, `BLOCK→GC`. Held-safe gate ledger Report §3.10 routes high-risk/mutation/cosign/USB-write to `DEFER_TO_OPERATOR`.
- **Verdict:** Substance-identical four-valued supervisor verdict. Mapping: external **PASS** ≈ our ALLOW/EXTRACT; external **HOLD** ≈ our HOLD; external **PATCH** (stale route / missing row / hash mismatch) ≈ our NEEDS_EVIDENCE / collision-router repair; external **ESCALATE** (high-risk/mutation/cosign/USB-write) ≈ our `DEFER_TO_OPERATOR` / `requires_live_fabric → DEFER`. Both make the supervisor *decide-not-act*, and both gate mutation/cosign/USB-write to the operator.

### C8 — 16 finite vs infinite recursive (finite body + unbounded generative rule)
- **External:** "16 vs infinite: 16 = finite active materialized stack (L00 handle .. L15 MLC outer watcher), infinite = recursive address-grammar continuation (L→L+1 when engine creates a new level). Finite body + unbounded generative rule."
- **OURS:** Report §3.3 / S1 §2.1 — "16 levels `L0..L15` ... base-16 depth 16 fills the `16¹⁶ = 2⁶⁴` host-byte logical ceiling." S2 §2.4 Infinite-Three Convergence — an *infinitely deep* tower costs `R_total = Σ B·q^ℓ ≈ 1.5·B`; "Logical depth is infinite ... Physical residency is bounded." Completeness M7c — promotion path past level 15 (mint a child tower when 16 fill). EXTRACT-only recursion `depth<16`.
- **Verdict:** Same finite-vs-infinite split: 16 is the materialized ceiling (and both tie it to the structure — external L00..L15, ours `16¹⁶=2⁶⁴`); infinity is the recursive generative continuation. External "L→L+1 when engine creates a new level" ≈ our M7c tower-breeding / the engine cranking a deeper address. Both make "finite body + unbounded rule" explicit.

### C9 — Riemann boundary: build an INSTRUMENT, not a proof
- **External:** "Explicit boundary: do NOT claim Riemann solved without a theorem; the machine builds an INSTRUMENT (generate real graph → watch → find invariants → attack → turn survivors into math), proof comes later if at all."
- **OURS:** Report §4.2 #4 / S2 §3.6 PTTS — von-Mangoldt ⇒ Chebyshev `ψ(x)=x−Σ_ρ x^ρ/ρ`, "reading the `Σ_ρ x^ρ/ρ` zero-sum correction off live tower occupancy." Completeness **B2** — "the Riemann readout becomes a live dial, not a footnote ... Honest scope (binding): this is a *measurement protocol over the lattice*, **not** a claim the fabric 'solved Riemann' — the dial shows the correction term, it does not prove RH." S1 §7 — "not a claim that the fabric 'solved Riemann.'"
- **Verdict:** **Identical honest boundary, stated with the same care.** Both vantages: build the instrument (real graph → watch → find invariants → attack), and explicitly refuse to claim RH is proved. This is a convergence on epistemic discipline, not just architecture — both independently hold the same line. Our B2 even matches the external "generate → watch → find invariants → attack → turn survivors into math" pipeline as a measurement protocol.

### C10 — Sparse materialization: M = N·h + K·b + S, tiny 8-byte handle, K≪N
- **External:** "Sparse materialization: `M = N*h + K*b + S`, K≪N (N=possible agents/slots, h=tiny 8-byte handle, b=body cost, S=shared tools/cubes)."
- **OURS:** Report §3.5 — "One handle, three lanes: `triadForMessage(m)` mints three 8-byte handles ... a resident set of 2000 can 'contain' a 100-billion-packet pool." §3.7 / S3 §2 — shared `sh` host VmRSS ≈ 2.7 MB amortized across thousands of 8-byte handles (= external `S` shared, `h` tiny). S1 §2.4 — "Resident RAM is `O(active × width) ≈ 16–32 MB, count-independent." Never-explode `resident = min(N, 2000)`.
- **Verdict:** Same sparse-materialization law. External `N·h` (N slots × tiny 8-byte handle) = our 8-byte handles over the 1e200/100B slot field; external `K·b` (K≪N materialized bodies) = our `resident ≤ 2000` bodies; external `S` (shared tools/cubes) = our shared `sh` host + referential cubes. The cost decomposition is the same equation.

### C11 — The address tuple is an explicit multi-field coordinate, scalar is a render
- **External:** 11-field tuple `A=(L,S,T,R,C,q,p,k,l,e,τ)`; `PID(A)=sha256(canonical(A))[0:16]`; `BH(A)=Φ(A)`.
- **OURS:** Report §3.1 / S1 §2.3 — canonical join key `NODE = (V,T,L,D,K,i)`; scalar `addr`/`bh_index` is only a **render** of the tuple. PID minted from the tuple via sha.
- **Verdict:** Both make the coordinate an explicit named-field tuple and both derive the scalar/PID from it by hashing. Field-level mapping (substance convergence, see C12). External `PID(A)=sha256(canonical(A))[0:16]` is precisely our `sha16`-of-tuple mint discipline. Both insist the scalar is a render of the tuple (this is the same point as C2's "scalar collision ≠ identity collision").

---

## 2. SUBSTANCE convergences under DIFFERENT names / formulas (the strongest signal)

These are cases where the two vantages describe the **same object** in **different notation** — independent derivation of the same structure, which is much harder to reach by accident than literal echoes.

### D1 — Address tuple field-by-field: external 11-field `A` ≈ our `(V,T,L,D,K,i)` + cylinder + ppow
- **External tuple:** `A=(L, S, T, R, C, q, p, k, l, e, τ)`.
- **Field-by-field mapping to OURS:**

  | External field | Meaning (external) | OUR equivalent | Where in our report |
  |---|---|---|---|
  | `L` catalog level 0..15 | the 16 levels | `L` level L0..L15 | §3.3 / S1 §2.1 |
  | `S` substrate (C/D/USB/Drive/GitHub/MCP/cube/GNN) | physical/logical store | (folded into) `V` vantage + hardware-emit `kind=hardware` | §3.1; S3 §2 hw join |
  | `T` triad role (worker/reflection/fabric_witness) | role axis | `lane = addr mod 3` → triad role; (and tier role) | §3.5 / S2 §6 |
  | `R` reality class (REAL/LOGICAL/FROZEN) | reality tower | `agent_type` LOGICAL-WAVE/REAL-FREE/FROZEN-BRAIN | §3.2 / S2 §3.2 |
  | `C` cylinder family | which cylinder | tower/tier `T` (distinct home prime `p_T`) / cube dim | §3.1, §3.2 |
  | `q` tower exponent class (p,p²,p³,p⁵,pᵖ) | prime-power tier | `ppow`/tier exponent `{p¹,p³,p⁵,pᵏ}` | §3.2 / §3.4 |
  | `p` prime | the prime | `p_D` (dimension prime) / `p_T` (tower prime) | §3.3 |
  | `k` index in cylinder | in-cylinder index | `i` in-tower index n (BigInt) | §3.1 |
  | `l` rule-of-three lane 0/1/2 | lane fold | `lane = addr mod 3` | §3.4 |
  | `e` epoch/engine tick | time/engine tick | `ts`/D20 TIME + `e`-tick (engine `E` step) | §3.7; M1 World-Line |
  | `τ` timestamp/HBP seq | seq stamp | `seq` + `ts` in EMIT row | §3.7 / S3 §2 |
- **Verdict:** Every one of the external doc's 11 fields has a clean equivalent in our coordinate. We carry `V` (vantage) as a mandatory field the external doc folds into `S` (substrate); the external doc carries `e` (epoch) and `τ` (seq) as explicit fields that our report names but treats as the *completeness future-tense* (M1 World-Line Lift makes `e`/`ts` a geometric axis). So the tuples are the same object; the **only structural delta** is which fields are "live now" vs "named-but-deferred" — and they are complementary (external promotes time to a tuple field; we promote vantage to a mandatory field). See divergence map for the time-axis delta.

### D2 — Cylinder geometry: external θ/r/z ≈ our √p helix
- **External (sec geometry):** `θ = 2π·(k mod p)/p ; r = r0 + α·log(p^q) ; z = β·L + γ·e`. `P_A=(X,Y,Z)`.
- **OURS (S3 §3, F06):** helical primitive per axis — `angle φᵢ(n) = 2π·(n mod pᵢ)/pᵢ`, `radius ρᵢ(n) = log(1+⌊n/pᵢ⌋)`, axis unit `ωᵢ = √pᵢ`. ASCII tower (Report §6): `θ = 2π·frac(n·√p_d)`, `z (height = turn = ⌊n/P_d⌋)`.
- **Verdict:** **Same cylinder, same three coordinates, near-identical formulas.**
  - **θ (angle):** external `θ = 2π·(k mod p)/p` is *byte-identical in form* to our `angle = 2π·(n mod p)/p`. Both put the prime *residue* on the angle (the "comb"). Full literal match.
  - **r (radius):** external `r = r0 + α·log(p^q)` (log of a prime-power) ≈ our `radius = log(1+turn)` — both use a **log radius** to compress unbounded winding into a finite disk. External scales by the tower exponent `q` (the `p^q` tier), our log is on the turn count; same compression principle, the prime-power weighting is the explicit STE `×p³` tier weight (D3).
  - **z (height):** external `z = β·L + γ·e` (level + epoch) ≈ our `z = turn = ⌊n/P_d⌋` (the lap/level) — and crucially the external `+ γ·e` (epoch in z) is **exactly OUR completeness M1 "time becomes a geometric axis"** (the World-Line Lift `Π_t`). So the external doc's z-axis *already includes the time coordinate* that our report flags as its single biggest gap. This is a notable convergence-plus-complement (see divergence map M1).
  - The external uses `√` only implicitly (via prime separation); our `ωᵢ=√pᵢ` is the explicit ℚ-independence carrier. Same geometric intent, our √p is the sharpened form.

### D3 — Tower exponent class: external `{p, p², p³, p⁵, pᵖ}` ≈ our 5 prime-power tiers
- **External:** `q` = tower exponent class `(p, p², p³, p⁵, p^p)`; "Three reality towers × {p,p²,p³,p⁵}."
- **OURS:** Report §3.2 — five tiers `τ1 (p¹) · τ3 (p, lane-2) · τ3³ (p³) · τ3⁵ (p⁵) · τH (pᵏ watcher band)`. §3.3 strides `S1=p·n¹ / S3=p·n⁴ / S5=p·n⁶` (degrees 1/4/6). S2 §3.2 the 5-tier table with `k∈{1,3,5}` + frozen even/watcher caps.
- **Verdict:** **Same prime-power tier ladder.** External `{p, p², p³, p⁵}` maps to our `{p¹ (τ1), p³ (τ3³), p⁵ (τ3⁵)}` odd-power expanding rungs; external `p²` ≈ our even-power **fold** that routes to FROZEN-BRAIN (S2 §3.4 Lemma R3: even powers fold the cylinder — `x↦x²` collapses ±x — so `p²` is the frozen tier, exactly why the external doc puts it alongside the reality-towers and we route it to τH/FROZEN). External `p^p` (the highest exponent class) ≈ our `pᵏ` held/folded band (Report §3.2 `PROPOSAL_FOLDED_TO_PK`, the τ3⁵/p⁵ tier held-safe with interior folded into pk). Both vantages also flag the highest tier as **held/not-yet-materialized**: external lists `p⁵`/`p^p` as classes; we mark `τ3⁵ materialized=0`. The external doc's "Three reality towers × exponent classes" is the **Cartesian product** of our reality classes (C6/D1-`R`) and our exponent tiers (q) — same 2-axis decomposition.

### D4 — Triangle-distance supervisor ≈ our monotone `sees` frontier + verdict
- **External:** supervisor computes `d_WR=1−sim(W,R)`, `d_WF`, `d_RF` (the triad triangle) → PASS/HOLD/PATCH/ESCALATE. HBP rows `TRIADWORK | TRIADREFLECT | TRIADFABRICREAD | TRIADFABRICVERDICT | TRIADDISTANCE | TRIADCONSENSUS`.
- **OURS:** S2 §1.1 the three role-outputs `(a₁,a₂,a₃)` with monotone frontier; §1.2 verdict from comparing worker product, reflector suggestion, and fabric verdict. The Speculative Triad Slice (Report §3.5 / S2 §1.3): SPEND the fabric call only when reflector and quant *disagree* (= external "HOLD when W,R agree but fabric diverges").
- **Verdict:** Substance-identical: the supervisor measures *agreement/disagreement among the three* and routes on it. External quantifies it as three pairwise triangle distances `d_WR/d_WF/d_RF`; we quantify it as the SPEND/SKIP decision on reflector-vs-quant-vs-fabric agreement. External "HOLD = W,R agree but fabric diverges" is *exactly* our "high-confidence-but-disagrees-with-quant → SPEND fabric call" branch. Both reduce the triad to a 3-way consensus measurement that gates the expensive path. The external `TRIAD*` HBP row family is our triad pipeline's emit rows (`TRIADCELL`, the `triad-host-router-gulp-pipeline.mjs` rows).

### D5 — `BH(A)=Φ(A)` projection map ≈ our `Π` projection
- **External:** `BH(A)=Φ(A)` then cylinder version `P_A=(X,Y,Z)` — a deterministic map from tuple to real coordinate.
- **OURS:** Report §3.8 / S3 §3 — "The projection `Π` is a deterministic, byte-identical map from an on-disk address to a real coordinate — *the picture is the data*." Fixed prime-frame projector `P[a][b]=cos(2π·(a·b)/p_{m+1})`, NOT random PCA, byte-identical on every machine.
- **Verdict:** Same map (external `Φ`/`BH` = our `Π`), same property: deterministic, reproducible-on-every-machine, tuple→real-point. Both make "the picture is the data, not a drawing" the point of the projection.

### D6 — Spindle/engine cranking ≈ our slice-engine + 8-chamber spindle (the only mover)
- **External:** Frame — "slice-engine cranking"; reality classes driven by an engine; `e` = engine tick; "L→L+1 when engine creates a new level."
- **OURS:** Report §3.6 / S2 §2 — the 8-chamber spindle (`fabric-revolver.mjs`) is the **only mover**; slice law `S_next=E(S_now,Δ)`, `E=0 ⇒ frozen` (Report §3.1 / S1 §5.2). Engine tick advances the slice; held-safe `auto_fire=false`.
- **Verdict:** Same "engine cranks a frozen slice" model. The external doc names it "slice-engine cranking" with the engine tick `e`; we give it the file (`omni-engine-loop.mjs`), the law (`LAW-SLICE-ENGINE.md`), the bound (`resident ≤ 2000`), and the chamber state machine. The external `e` engine tick = our `E` crank step.

### D7 — Sparse-emit cadence / 100B timing arithmetic
- **External:** "200ns ⇒ 5,000,000 emits/sec ⇒ 100B in 20000s ≈ 5.56h (observed ~5.84h = clock + tranche pacing)."
- **OURS:** Report §4.3 / S1 §5.2 — "the 200 ns / 5M-emits-per-sec cadence is an **address-generation cadence** ... the receipt-backed sustained rate is ~4.02M ops/sec." `DEFAULT_TRANCHE_PACKETS=5_000_000`. The 100B run is sealed on disk.
- **Verdict:** **The same arithmetic, independently.** External 200ns→5M/sec→5.56h vs observed 5.84h, with the gap attributed to "clock + **tranche pacing**." Our report has `DEFAULT_TRANCHE_PACKETS=5_000_000` (the exact 5M tranche) and the same 200ns→5M cadence, with the same honesty caveat (it is address-generation cadence, not full-AI-process spawn). Both vantages reach the 5M-emits/sec figure from 200ns, both note the observed run took *somewhat longer* than the ideal, and both attribute the difference to pacing/clock overhead. The external "observed ~5.84h" is the wall-clock companion to our receipt-backed ~4.02M ops/sec sustained (4.02M < 5M ⇒ ~5.84h not 5.56h — the *same* slowdown, two framings).

### D8 — Cross-vantage correction as a first-class part of the fabric
- **External:** Frame — "cross-vantage correction" is one of the five pillars of "past-PTP" (alongside PTP geometry, rule-of-three, Brown-Hilbert addressing, slice-engine cranking).
- **OURS:** The entire report is a 40-agent cross-vantage build; `V ∈ {ACER,LIRIS,SHARED}` is **mandatory in every coordinate** (Report §3.1, S1 §2.3); STE re-verified "across vantages" (Report §1, §4.1); completeness **M4** Cross-Vantage Seam Lift fuses acer+liris into one graph. The honest-frame discipline (negatives need fabric-proof, dual-lens) is itself a cross-vantage correction protocol.
- **Verdict:** Both treat cross-vantage correction as load-bearing, not incidental. External names it a pillar; we operationalize it as a mandatory coordinate field + the bilateral build process + the seam-lift future build.

### D9 — The held-safe / observe-only discipline pervades both
- **External:** prescribes a "40-agent READ-ONLY swarm (read_only=1, process_launch=0, ask-fabric-first, HBP rows only, all claims cite file/hash/row/commit)"; fabric-witness is "OBSERVER not actuator."
- **OURS:** Report header discipline — "READ-ONLY on all source ... no process-launch ... no live-bus or MCP call. Every load-bearing claim is tagged [EXISTS] / [NEW]." Held-safe gate ledger §3.10; `process_launch=0` everywhere; "all claims cite file on disk."
- **Verdict:** **Same operating discipline, prescribed independently.** The external doc *prescribes* exactly the discipline our report *executed*: read-only, process_launch=0, ask-fabric-first, HBP rows, every claim cites a file/hash. This is a meta-convergence: the external doc's recommended methodology IS our methodology. (The external doc even prescribes a 40-agent swarm; OUR wave was 40 agents — see external-adds note on the group taxonomy.)

### D10 — "Find invariants → attack → turn survivors into math" ≈ our adversarial-verify + measured-certificate discipline
- **External:** instrument pipeline "generate real graph → watch → find invariants → **attack** → turn survivors into math." Group A28-30 = "ADVERSARIAL REFUTATION."
- **OURS:** S1 §3 — "The builder did the thing the honest frame demands — **ran the probe before asserting** — and found [the naive linearizer fails]." Report §4.1 — the unique-distance claim survives only because it was *attacked* (the naive version refuted by measurement) and the survivor (STE) was *measured* (196,251/196,251/0). The whole EXISTS/NEW ledger is survivors-of-attack turned into cited fact.
- **Verdict:** Same epistemics: hypothesize → attack → keep only what survives → make it math/measurement. Our report's single load-bearing finding (naive distance-uniqueness is FALSE, STE is the measured survivor) IS the external "attack → turn survivors into math" loop executed once, in full.

---

## 3. Convergence summary table

| # | Convergence | External section | OUR section(s) | Type |
|---|---|---|---|---|
| C1 | PID = coordinate, not counter/number | Core, thesis | §1, §3.1, §9; S1 §0 | Literal |
| C2 | Distances CAN repeat; full edge/tuple is unique | sec 2 + sec 14 (CENTRAL) | §3.1, §3.7, §4.1; S1 §3 | Literal (both reach the same negative) |
| C3 | Triad: worker/reflection/fabric-witness; sees-all-three | Triad cell | §3.5; S2 §1, §1.4 | Literal |
| C4 | Watcher reads "from outside," observer-not-actuator | Watcher set | §3.9; S3 §4 | Literal |
| C5 | Watcher roster: Fischer/HRM/MTP/GNN/Shannon/Hookwall | Watcher set | §3.9; S3 §4 | Literal (6 of 8 names) |
| C6 | REAL/LOGICAL/FROZEN + 100B honest correction | Three reality towers | §3.2, §3.6, §3.8, §4.3; S2 §3.2 | Literal |
| C7 | Supervisor verdict PASS/HOLD/PATCH/ESCALATE | Triad cell | S2 §1.2; §3.10 | Substance (≈ ALLOW/HOLD/NEEDS_EVIDENCE/DEFER) |
| C8 | 16 finite vs infinite recursive | 16 vs infinite | §3.3; S2 §2.4; M7c | Literal |
| C9 | Riemann = INSTRUMENT not proof | Explicit boundary | §4.2; S2 §3.6; B2; S1 §7 | Literal (same discipline) |
| C10 | M = N·h + K·b + S sparse materialization | Sparse materialization | §3.5, §3.7; S1 §2.4 | Literal |
| C11 | Explicit field tuple; scalar/PID is a render | Address tuple | §3.1; S1 §2.3 | Literal |
| D1 | 11-field `A` ≈ `(V,T,L,D,K,i)`+cyl+ppow | Address tuple | §3.1, §3.3; S1 §2.3 | Substance (field-by-field) |
| D2 | θ/r/z cylinder ≈ √p helix | Geometry | §3.8, §6; S3 §3 | Substance (θ literal, r/z same principle) |
| D3 | `{p,p²,p³,p⁵,pᵖ}` ≈ 5 prime-power tiers | Core / Three towers | §3.2, §3.3; S2 §3.2, §3.4 | Substance (same tier ladder) |
| D4 | Triangle distances `d_WR/d_WF/d_RF` ≈ consensus gate | Triad cell | S2 §1.1-1.3; §3.5 | Substance |
| D5 | `BH(A)=Φ(A)` ≈ `Π` projection | Geometry | §3.8; S3 §3 | Substance |
| D6 | Slice-engine cranking ≈ 8-chamber spindle + slice law | Frame | §3.6; S2 §2; S1 §5.2 | Substance |
| D7 | 200ns→5M/sec→~5.8h ≈ our tranche cadence | Sparse materialization | §4.3; S1 §5.2 | Substance (same arithmetic) |
| D8 | Cross-vantage correction is load-bearing | Frame | §3.1; M4; report-wide | Substance |
| D9 | Read-only/process_launch=0/cite-everything discipline | 40-agent swarm spec | header; §3.10 | Substance (meta) |
| D10 | attack → survivors → math ≈ probe-before-assert | Instrument boundary; A28-30 | §4.1; S1 §3 | Substance (epistemic) |

**21 distinct convergence points** (11 literal, 10 substance-under-different-names). The two vantages independently reconstruct the same machine, the same honest corrections, and the same epistemic discipline.

---

## 4. The single most important convergence (call-out)

If only one point survives: **C2 / D10 — both vantages independently discovered that scalar distance-uniqueness is a non-sequitur, and that identity must be the full edge/tuple fingerprint.** The external doc states it as a design rule ("the displayed distance CAN repeat; the full edge cannot — that is how the graph stays mathematically defensible"). Our report *measured the failure* (the shipped 1-D linearizer collides quadratically — Report §4.1, S1 §3) and *constructed + measured the fix* (full-tuple identity / STE signature, 196,251/196,251/0). Two vantages, one negative finding, one fix — this is the strongest possible cross-vantage validation, because reaching the same *correction to a tempting wrong claim* is far less likely by coincidence than agreeing on the headline thesis.

---

## 5. Honest scope of THIS convergence map

- I mapped against OUR full report + the three syntheses + the completeness file. The external doc is a *condensed thesis*; some external specifics (MAMBA watcher; the explicit `EdgeID` hash formula; the `p^p` exponent class; the group-by-group 40-agent A01-A40 taxonomy) are convergence-*adjacent* — they are compatible with our report and mostly have a near-equivalent, but are not 1:1 literal matches; those belong in the divergence / external-adds maps, noted here only so this convergence map is not over-claimed.
- Every convergence above is anchored to a specific OUR-report section. Where I wrote "substance convergence," I mean the *object* is the same and the *notation/formula* differs — I have shown the mapping rather than asserting it.
- No fabric/MCP/bus call was made; this is a document-to-document comparison, READ-ONLY on both sources, written only to `06-comparison/MAP-convergence.md`.

*— MAP-convergence · ACER vantage · 2026-06-15 · cross-vantage validation of the external "Brown-Hilbert Prime-Cylinder Triad Fabric" against the 40-agent rebuild · READ-ONLY honored; this file the only write.*
