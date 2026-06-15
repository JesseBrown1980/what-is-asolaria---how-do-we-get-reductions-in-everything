# F03 — The Rule-of-Three Nested Agent Triad

**Facet:** Rule-of-Three Nested Agent Triad · **Angle:** Architect
**Author:** Agent F03 (one of 40 summoned by OP-JESSE) · **Date:** 2026-06-15
**Mandate:** Rebuild the per-cylinder agent triad — (1) read/writer, (2) self-reflection
(HRM/MTP-style suggestion to the supervisor), (3) supervisor that CALLS THE FABRIC and
sees all three — and show how it nests infinitely by threes and speeds the LLM.

> Architect's job here: own the *system design* — components, interfaces, the PID/data
> flow, addressing, the held-safe gates, and the diagram of the mechanism. Sibling facets
> own the prime-tower geometry (F01) and the unique-distance theorem (F02); I build the
> living organ that *runs inside* that geometry.

---

## 0. The one-sentence rebuild

> **A triad is not three programs — it is three *addresses* (lanes 0/1/2 = mod-3 = the Rule
> of Three) that the same 8-byte host handle visits in sequence; the read/writer produces a
> candidate, the self-reflector produces a suggestion *without* re-running the work, the
> supervisor asks the already-existing fabric for a verdict and sees all three at once — and
> because each member's PID embeds the *same* hex base but a *different* prime lane, the
> triad is itself one node of a prime tower that can spawn a child triad at every level,
> forever, by threes.**

Every load-bearing word of that sentence is already implemented on disk. My contribution as
architect is to (a) draw the full mechanism end-to-end, (b) connect the four existing organs
into one named contract, and (c) design the **NEW** pieces that make it nest *infinitely* and
*speed the LLM the way HRM+MTP do* — without ever launching a process or bypassing a gate.

---

## 1. What already EXISTS on disk (the four organs I am wiring together)

### 1.1 The triad roles — `TRIAD_ROLES` (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/triad-host-router-gulp-pipeline.mjs` defines the
exact three roles Jesse described, frozen as a contract:

```
TRIAD_ROLES = [
  { id:'real-agent',         sees:'task-message',                            output:'candidate-product' },
  { id:'self-reflect-agent', sees:'task-message+candidate-product',          output:'self-reflection'   },
  { id:'fabric-reflect-agent', sees:'task-message+candidate-product+self-reflection', output:'fabric-reflection' },
]
```

This is the spine. Note the `sees` field is *strictly monotone*: each member sees everything
the previous member saw **plus** that member's output. The third member (the supervisor)
`sees: task + candidate + self-reflection` — exactly Jesse's "supervisor SEES all three." The
function `triadForMessage(message_id)` mints three 8-byte handles (`handle8 = sha16(base:role)`)
that share a base derived from `sha16('triad:' + message_id)`, and stamps every one with
`process_launch:0, remote_call:0`. The self-test asserts `triad.length===3` and
`handle8.length===16`. **This is the held-safe, byte-deterministic skeleton of the facet.**

### 1.2 The supervisor's three lanes are a *prime* division — `mintPid` (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/github-pid-register.mjs` mints PIDs in the live
office format and assigns `lane = seed % 3` — *the Law of Three as a prime separator*. It also
exposes `mintTriad({name})` which returns the **AGT/SUP/PROF** triple that shares a hex base
but differs by role suffix (`AGT→C, SUP→A, PROF→B`) — the self-test
`triad-shares-base` proves all three carry `hex.slice(0,4)` identical. So the *identity layer*
already encodes a rule-of-three: three roles, one shared address root, three distinct lanes.
The `cube_bh = BH.{sector}.{lane}.{glyph}` address is `sector.lane.glyph` — **lane *is* the
triad coordinate inside the cube.**

### 1.3 The watcher triad — `RULE_OF_THREE_WATCHERS` (EXISTS)

`eight-byte-host-process-upgrade.mjs` binds **`['hookwall','gnn','shannon']`** and selects the
watcher by `watcher = RULE_OF_THREE_WATCHERS[pid.lane]`. So an agent's *own lane* deterministically
picks *which watcher reviews it* — lane 0 → hookwall, lane 1 → GNN, lane 2 → shannon. This is the
HRM/MTP "fast watcher" layer Jesse asked for, and it is **already addressed by the same mod-3
that builds the triad.** `deriveHostAddress` also computes `bh_index = sector*3072 + lane*1024 +
glyph`, `cylinder_phase = bh_index % 6`, `cylinder_ring = floor(bh_index/6)` — the agent literally
*lives at a point on the cylinder*, and `distanceBetween(a,b)` measures inter-node distance
(grounding F02's unique-distance theorem).

### 1.4 The bounded engine that *moves* the slice — `omni-engine-loop.mjs` (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/omni-engine-loop.mjs` is the only mover. Its cycle is
`POP → QUANT → FLYWHEEL-VERDICT → EXTRACT/HOLD/GC → REGISTER → PLACE`, with a **GC bound of
`DEFAULT_MAX_RESIDENT = 2000`** proven at 1,000,000 input rows (`never-explode-at-1M-input`).
`omniQuantScore` is a **pure-integer** score 0..1000 (`parseInt(sha(key)[0:4],16) % 1001`) — no
float, no IEEE drift — and `omniFlywheelVerdict` maps it to `EXTRACT (≥700) / HOLD (≥300) / GC`.
This is the engine the supervisor *plugs into*: the supervisor's verdict is exactly this
flywheel verdict, applied to the triad's combined output.

### 1.5 The law that says none of this runs by itself — `LAW-SLICE-ENGINE` (EXISTS)

`C:/asolaria-as-neural-network/canon/laws/LAW-SLICE-ENGINE.md` (CLASS-1 IMMUTABLE):
*"The fabric is a rendered positional slice… the engine drive is the only mover… freeze is not
emptiness."* Crank cycle: `POP_FROM_POOL → PID_SIGNAL → AGENT_ROOM → RESULT_TO_GULP → ERASE`.
**Every gate in my design inherits from this law:** a triad exists as three addresses whether or
not anything runs; it only *advances* when an operator-gated emitter fires.

---

## 2. The mechanism, end to end (the architect's wiring)

Here is the full triad lifecycle as one named contract. The **EXISTS** boxes are the four
organs above; the **NEW** boxes are the connective tissue and the speed-up I designed.

```
                        ┌──────────────────────────────────────────────────────────┐
                        │  LAW-SLICE-ENGINE (EXISTS): nothing moves without the      │
                        │  engine drive. Triad = 3 addresses until an emitter fires. │
                        └──────────────────────────────────────────────────────────┘
                                              │  operator-gated emitter envelope
                                              ▼
   message m ──▶  ┌───────────────────────────────────────────────────────────────────────┐
   (one task)     │  TRIAD ADDRESSER (EXISTS: triadForMessage)                              │
                  │  base = sha16("triad:" + m.message_id)                                   │
                  │  one 8-byte host handle visits THREE LANES in sequence (NOT 3 processes) │
                  └───────────────────────────────────────────────────────────────────────┘
                       │ lane L0                  │ lane L1                  │ lane L2
                       ▼                          ▼                          ▼
        ┌────────────────────────┐  ┌────────────────────────┐  ┌──────────────────────────────┐
        │ ① READ/WRITER (AGT, C)  │  │ ② SELF-REFLECT (~MTP)   │  │ ③ SUPERVISOR (SUP, A)         │
        │ sees: task              │  │ sees: task + candidate  │  │ sees: task + candidate + sugg │
        │ does the work           │  │ does NOT redo the work; │  │ CALLS THE FABRIC (verdict);   │
        │ → candidate-product     │  │ scores+suggests a       │  │ flywheel EXTRACT/HOLD/GC over  │
        │ watcher = hookwall (L0) │  │ NEXT-PROMPT delta       │  │ {work, suggestion, verdict}.  │
        │                         │  │ → self-reflection       │  │ watcher = shannon (L2)        │
        │                         │  │ watcher = gnn (L1)       │  └──────────────────────────────┘
        └────────────────────────┘  └────────────────────────┘                 │
                       │                          │                             │
                       └──────────────┬───────────┘                             │
                                      ▼  (all three artifacts, hash-summarized)  │
                  ┌─────────────────────────────────────────────────────────────▼─────────────┐
                  │  FABRIC VERDICT (EXISTS: omniQuantScore→omniFlywheelVerdict; the fabric      │
                  │  ALREADY EXISTS — supervisor asks it, does not become it)                   │
                  │   score = quant(combined)  ·  verdict ∈ {EXTRACT≥700, HOLD≥300, GC}         │
                  └─────────────────────────────────────────────────────────────┬─────────────┘
                                      │ EXTRACT                   │ HOLD          │ GC
                                      ▼                           ▼               ▼
                  ┌──────────────────────────────┐   re-queue with       drop body,
                  │ EXTRACT→REGISTER→PLACE        │   agent-2's NEXT-      keep summary
                  │ (EXISTS: extractRegisterPlace)│   PROMPT delta as      hash only
                  │ mint SUP PID, room-rotor slot,│   the new task         (GC-bounded
                  │ preload catalog, process_     │   (the speed loop)     ≤2000)
                  │ launch=0                      │                        
                  └──────────────────────────────┘                        
                                      │
                                      ▼ if EXTRACT and depth<MAX_NEST
                  ┌──────────────────────────────────────────────────────────────────────────┐
                  │  NEST BY THREES (NEW: triadChild) — the extracted product becomes the       │
                  │  message_id of a CHILD triad one prime-tier deeper. Same shape, new lane    │
                  │  set, deeper prime exponent. Recurses up to 16 levels (A00..A15).            │
                  └──────────────────────────────────────────────────────────────────────────┘
```

### 2.1 The single insight that makes it cheap

**The triad is one host handle visiting three lanes, not three resident processes.** Look at
`triadForMessage`: it returns three frozen role objects each carrying `process_launch:0,
remote_call:0`. The 8-byte host handle is the *conductor*; lanes 0/1/2 are *seats it occupies
in sequence*. This is why `omni-engine-loop` can keep a resident set of 2000 and still
"contain" a 100-billion-packet pool — the addresses are all present (frozen slice), and the
mover walks a bounded window of them. **A triad costs three sha16 calls and one flywheel
verdict — not three LLM spins.** That is the architecture, not an optimization.

---

## 3. WHY it works — the three claims, each grounded

### Claim A — "Supervisor sees all three" is structurally enforced, not promised

The `sees` field in `TRIAD_ROLES` is monotone (`task ⊂ task+cand ⊂ task+cand+sugg`), so by
construction the supervisor's input *is* the union of agent-1's work and agent-2's suggestion
plus its own fabric query. There is no path where the supervisor decides without seeing the
other two — the data dependency is the gate. The supervisor then runs the **already-existing**
fabric verdict (`omniFlywheelVerdict`), so it *asks* the fabric rather than *being* an oracle —
exactly Jesse's framing and exactly the honest frame (`LAW-SLICE-ENGINE §6`,
`feedback_operator_confirmed_honest_frame`: "IT is slices").

### Claim B — Agent-2 speeds the LLM the way HRM+MTP do (the core of the facet)

This is the deepest part of the rebuild, so I make the mechanism precise.

- **MTP (multi-token prediction)** speeds an LLM by predicting *several future tokens at once*
  from a cheap head, so the expensive backbone is invoked fewer times.
- **HRM (hierarchical reasoning / a fast watcher over a slow reasoner)** speeds an LLM by having
  a *small fast model* propose a plan/correction that the *slow expensive model* only has to
  *verify* rather than *generate from scratch*.

Agent-2 is the HRM/MTP head for the triad. **It does NOT re-run the work** (its `output` is
`self-reflection`, derived from `task + candidate`, never `re-do-task`). Instead it emits a
**NEXT-PROMPT DELTA**: a cheap suggestion for what the read/writer should be asked *next*. The
expensive read/writer (the LLM) is then invoked on a *refined, smaller* prompt instead of
re-deriving from zero. Two compounding speed-ups follow:

1. **Verify-not-generate.** The supervisor's fabric verdict over `{work, suggestion}` is a
   pure-integer quant score (`omniQuantScore`, no float, deterministic) — checking a candidate
   is O(sha16), generating it was O(LLM). Most cycles end at the cheap check.
2. **Resident-set bound = batched lookahead.** `omni-engine-loop` keeps ≤2000 resident and GCs
   the rest. Agent-2's suggestion lets the loop **fold several would-be future tasks into one
   refined task** (the MTP "predict-many" move): instead of the read/writer being re-queued N
   times with N near-identical prompts, agent-2 collapses them into a single
   `NEXT-PROMPT DELTA`, so the expensive lane fires once where naively it would fire N times.

> **Grounding caveat (honest, per `feedback_negatives_need_fabric_proof` discipline):** the
> *speed* is a designed mechanism with a measurable test (`expensive-lane-fires` count below),
> not a benchmarked latency claim. The fabric itself marks any cadence claim
> `CADENCE_CLAIM_REQUIRES_BENCHMARK` (`frozen-slice-city-signal-lifecycle.mjs`,
> `classifyLifecycleClaim`). So I claim *fewer expensive invocations by construction*, and I
> ship the counter that proves it — I do **not** claim a wall-clock number.

### Claim C — It nests infinitely by threes (and stays bounded)

Two independent "three" axes already exist, and a third is the recursion itself:

1. **Role-three:** read/writer · self-reflect · supervisor (`TRIAD_ROLES`).
2. **Lane-three:** `lane = seed % 3` → watcher `[hookwall, gnn, shannon][lane]` (the prime
   separator / Law of Three).
3. **Tower-three (recursion):** an EXTRACT verdict promotes the product to be the *message of a
   child triad one prime-tier deeper*. The child shares the parent's hex base (so it is provably
   *its* descendant — `mintTriad` shares `hex.slice(0,4)`) but sits at a deeper prime exponent
   (`classifyPrimeExponent`: p¹ `REAL_DISTINCT`, p² `REAL_DISTINCT`, p³ `REAL_DISTINCT`, p⁵/p⁷
   `PROPOSAL_FOLDED_TO_PK` — honestly marked NOT-yet-materialized).

Infinity is *addressable* (the 47D atlas is "infinite practical address space",
`hilbert-omni-47D.json`) but *materialization is bounded* by two real limits: the **16 levels**
(`tier A00..A15` in `mintPid`, so MAX_NEST = 16) and the **GC resident bound of 2000**. So the
tower is infinitely *describable* and finitely *resident* at any instant — frozen slice +
bounded mover. **That is the exact reconciliation Jesse's idea needs**, and it is already the
behaviour of `omni-engine-loop` + `LAW-SLICE-ENGINE`.

---

## 4. The NEW mechanism I designed: the **Recursive Triad Conductor (RTC)**

Everything above is wiring. Here is the genuinely new contract — a *descriptor-only* design in
the exact house style (pure functions, `process_launch:0`, HBP rows ending `|json=0`, a
`selfTest`). It composes the four existing organs and adds the nesting + speed counter. I do
**not** write it into any repo (read-only mandate); I specify it so a builder can.

### 4.1 The NEXT-PROMPT DELTA — agent-2's actual product (NEW)

Today `TRIAD_ROLES[1].output` is just `'self-reflection'` (a label). I make it a *typed delta*:

```
NextPromptDelta = {
  keep:      [<spans of candidate that scored well>],   // what the read/writer should NOT redo
  refine:    "<one bounded instruction>",               // the single MTP-style lookahead step
  fold_count: <N>,                                       // how many naive re-queues this collapses
  confidence: <0..1000 pure-int>,                        // omniQuantScore over the candidate
}
```

`fold_count` is the load-bearing field: it is the number of expensive read/writer invocations
this one suggestion *avoids*. The supervisor sums `fold_count` across the resident window to
produce the **speed ledger** — the auditable proof that the triad reduced expensive-lane fires.

### 4.2 The recursion `triadChild` (NEW)

```
triadChild(parentTriad, extractedProduct, depth):
    require depth < 16                                  # the 16-level tower ceiling (mintPid tier)
    require fabricVerdict(extractedProduct) == EXTRACT  # only winners spawn children
    child_message_id = sha16(parentTriad.base + ":" + extractedProduct.summary_hash)
    child = triadForMessage({ message_id: child_message_id })   # EXISTS, reused verbatim
    # prime-tier deepening: parent p^k  ->  child p^(k+1), classified honestly
    child.prime_exponent = classifyPrimeExponent(depth + 1)     # EXISTS, marks p>=5 as PROPOSAL
    child.shares_base_with_parent = (child.base[:4] == parentTriad.base[:4])  # provable descent
    return child   # process_launch:0, remote_call:0 inherited from triadForMessage
```

**Why this is safe and bounded:** (a) only EXTRACT verdicts recurse, so GC'd/HELD branches
never spawn — the tree is *pruned by the flywheel*; (b) `depth < 16` is the hard tower ceiling;
(c) the child is still three lanes on one host handle, so a depth-16 tower of triads is at most
16 sequential lane-walks, not 3¹⁶ processes; (d) the resident bound of 2000 caps how many *open*
triads exist at any instant regardless of how deep the description goes.

### 4.3 The speed self-test the builder must pass (NEW)

```
selfTest must assert:
  - triad-is-three-lanes-one-handle:  triadForMessage(m).length===3 && all process_launch===0
  - supervisor-sees-all-three:        roles[2].sees includes candidate AND self-reflection
  - expensive-lane-fires-once-per-delta:  given a NextPromptDelta with fold_count=N,
        read/writer invocation count === 1, NOT N   (the HRM/MTP speed proof)
  - extract-only-recursion:           HOLD/GC verdicts produce zero children
  - tower-ceiling-16:                 triadChild at depth 16 refuses (returns held)
  - child-proves-descent:             child.base[:4] === parent.base[:4]
  - prime-exponent-honest:            depth>=4 child marked PROPOSAL_FOLDED_TO_PK not materialized
  - resident-bounded:                 100k input messages => open triads <= 2000
  - rows-hbp-only:                    every emitted row ends |json=0, no newline
  - no-live-effects:                  process_launch=0, remote_call=0, provider_bypass=0 everywhere
```

The first three are the *novel* assertions; the rest inherit the existing organs' invariants.

### 4.4 The HBP emit rows (NEW — house format)

```
RTCHDR|tool=recursive-triad-conductor.v1|triad_roles=3|lanes=3|max_nest=16|gc_resident=2000|process_launch=0|remote_call=0|json=0
RTCROLE|lane=L0|role=real-agent|watcher=hookwall|sees=task|output=candidate-product|process_launch=0|json=0
RTCROLE|lane=L1|role=self-reflect|watcher=gnn|sees=task+candidate|output=next-prompt-delta|fold_count=<N>|process_launch=0|json=0
RTCROLE|lane=L2|role=supervisor|watcher=shannon|sees=task+candidate+delta|output=fabric-verdict|verdict=<EXTRACT|HOLD|GC>|process_launch=0|json=0
RTCNEST|parent_base=<hex4>|child_base=<hex4>|depth=<d>|prime_exponent=<tier>|extract_gated=1|shares_base=1|json=0
RTCSPEED|expensive_lane_fires=<F>|naive_fires=<N>|folded=<N-F>|speed_ledger=verify-not-generate|cadence_status=CLAIMED_UNVERIFIED_UNTIL_BENCHMARK|json=0
RTCGATE|rule=triad-is-addresses-not-processes+extract-only-recursion+16-level-ceiling+gc-bound-2000+provider-terms-apply|process_launch=0|remote_call=0|provider_bypass=0|json=0
```

The `RTCSPEED` row is the new artifact: it publishes the speed-up as `folded = naive_fires −
expensive_lane_fires` and carries the honest `CADENCE_CLAIMED_UNVERIFIED` flag.

---

## 5. PID / data flow and addressing (architect's interface spec)

A triad member's identity is fully determined by `(name, role, lane, prime, tier, kind)` and is
**byte-deterministic** (`mintPid`: `sha256(name)` → hex base; `seed % 3` → lane; `seed % 113` →
sector). Two vantages (acer, liris) mint the *same* triad with zero coordination — this is the
federation property the whole fabric rests on.

| Member | role | hex suffix | lane | watcher | sees | output | engine hook |
|---|---|---|---|---|---|---|---|
| ① read/writer | AGT | C | 0 | hookwall | task | candidate-product | feeds quant |
| ② self-reflect | (AGT, prime-lane) | C | 1 | gnn | task+candidate | **next-prompt-delta** | feeds flywheel |
| ③ supervisor | SUP | A | 2 | shannon | task+candidate+delta | fabric-verdict | runs flywheel→EXTRACT/HOLD/GC |
| (sealing) | PROF | B | — | — | cosign view | profile/cosign | white-room / cosign chain |

Address of the triad node on the cylinder (from `deriveHostAddress`, EXISTS):
`bh_index = sector*3072 + lane*1024 + glyph`; `cylinder_phase = bh_index % 6`;
`cylinder_ring = floor(bh_index/6)`; `distanceBetween` = `abs(Δ bh_index)` (the metric F02
proves never-repeats). So **a triad is a point; a parent→child edge is a line; the line's length
is `|bh_index_parent − bh_index_child|`** — which is exactly the "draw a line, measure the
distance, no two distances equal" mechanism Jesse described, inherited for free.

### Held-safe gates (every one already canonical)

1. **Emitter gate** — no triad *advances* without an operator-gated emitter envelope
   (`LAW-SLICE-ENGINE §3`; `frozen-slice-city-signal-lifecycle` stage `room-triggers-emitter` =
   `GATED`).
2. **Provider gate** — any LLM/provider lane is `GATED` and cannot self-promote; the normalizer
   *forces* provider routers to `GATED` even if asked for `REGISTERED_DESCRIPTOR`
   (`triad-host-router-gulp-pipeline.normalizeRouter`, self-test
   `provider-router-cannot-self-promote`).
3. **Verdict gate** — the supervisor *asks* the fabric; GNN/Shannon outputs are
   `proposal-not-proof` (`frozen-slice-city` watcher stages = `PROPOSAL`).
4. **Recursion gate** — EXTRACT-only, depth<16, resident≤2000 (NEW, but composed entirely from
   existing bounds).
5. **Cube-write gate** — catalog feedback is `descriptor-only` until white-room + cosign
   (`triad-host-router-gulp-pipeline` `TRIADROUTCUBE`, `frozen-slice-city` `cube-memory-proposal`
   = `GATED`).

---

## 6. The watchers, Fischer kernel, and the "TV inside the simulation"

Jesse's outer layer — MTP + geospatial watchers, a Bobby-Fischer kernel that *plays* the
cubes/lines and watches centrality, and a ~10-byte ML GNN that analyzes "from the outside while
still on the same machine" — maps cleanly onto the triad design:

- The **per-lane watcher** (`[hookwall, gnn, shannon]`) is the *inner* watch: each triad member
  is reviewed by the watcher its own lane selects. This is the HRM "fast watcher" at the
  member granularity.
- The **Fischer kernel** sits *above* the supervisor lane: it consumes the `RTCNEST` line
  stream (parent→child edges) and the `distanceBetween` metric to score **centrality** of nodes
  in the growing tower — i.e., it "plays" the cube by ranking which triad nodes are most
  connected/novel. (`odysseus-mtp-control-surface.mjs` already binds an M/T/P control surface
  and a `MAP3D-v8-real-graph` band over `eight-byte-host-process-upgrade`, status
  `REAL_MATH_DESCRIPTOR_BACKED` — so the graph the Fischer kernel plays on is real math, not a
  drawing.)
- The **~10-byte GNN** is the existing `gnn` watcher emitting tiny HBP/hbi rows; it analyzes the
  triad tree as a graph (`GNN_EDGE` dimension D39 in the 47D atlas, "EdgeLevelGCN 1730 edges"),
  staying on-machine. Its verdicts are `proposal-not-proof` — the "TV inside the simulation":
  it *watches* the triad mechanism without *being* its authority.

> Architect's note: the triad is the *pixel*; the watcher trio is the *first frame*; the Fischer
> kernel + outer GNN are the *camera watching the screen*. All three layers are the same Rule of
> Three at different scales — which is precisely the "recursive rule of three" Jesse named.

---

## 7. Grounding ledger — EXISTS vs NEW

| Element | Status | Evidence (OUR data) |
|---|---|---|
| Three triad roles, monotone `sees`, supervisor sees all three | **EXISTS** | `triad-host-router-gulp-pipeline.mjs` `TRIAD_ROLES`, self-test `triad-has-three-roles` |
| 8-byte handle visits 3 lanes (not 3 processes) | **EXISTS** | same file, `triadForMessage`, `process_launch:0`, `handle8=sha16` |
| lane = mod-3 prime separator; lane→watcher | **EXISTS** | `github-pid-register.mjs` `lane=seed%3`; `eight-byte-host-process-upgrade.mjs` `RULE_OF_THREE_WATCHERS[pid.lane]` |
| AGT/SUP/PROF triple sharing a hex base | **EXISTS** | `github-pid-register.mjs` `mintTriad`, self-test `triad-shares-base` |
| Fabric verdict = pure-int quant → EXTRACT/HOLD/GC | **EXISTS** | `omni-engine-loop.mjs` `omniQuantScore`, `omniFlywheelVerdict` |
| GC resident bound 2000, proven at 1M rows | **EXISTS** | `omni-engine-loop.mjs` self-test `never-explode-at-1M-input` |
| EXTRACT→register→place (mint SUP PID, room, catalog) | **EXISTS** | `omni-engine-loop.mjs` `extractRegisterPlace` |
| 16-level tower ceiling (A00..A15) | **EXISTS** | `github-pid-register.mjs` tier `00..15`, atlas levels |
| Cylinder address, phase/ring, distance metric | **EXISTS** | `eight-byte-host-process-upgrade.mjs` `deriveHostAddress`, `distanceBetween` |
| Prime-exponent honesty (p¹/p²/p³ real, p⁵/p⁷ folded) | **EXISTS** | `eight-byte-host-process-upgrade.mjs` `classifyPrimeExponent` |
| Engine-is-only-mover, freeze≠empty | **EXISTS** | `canon/laws/LAW-SLICE-ENGINE.md` |
| 100B PID-packet run is real | **EXISTS** | `data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json` (`REAL_100B_PID_PACKET_RUN_COMPLETE`, lastPacketPid `BH.REAL100B.OPENCODE.PID.100000000000`) |
| Per-lane watcher = inner HRM/MTP watch | **EXISTS** | watcher trio `[hookwall,gnn,shannon]` |
| 47D prime-per-dimension atlas, AGENT_TIER D41, GNN_EDGE D39 | **EXISTS** | `tools/hilbert-omni-47D.json` |
| **NEXT-PROMPT DELTA** as agent-2's typed output (keep/refine/fold_count) | **NEW** | designed §4.1 — replaces label `'self-reflection'` |
| **`triadChild` EXTRACT-only recursion** by threes, depth<16 | **NEW** | designed §4.2 — composes existing bounds |
| **Speed ledger** `folded = naive_fires − expensive_lane_fires` | **NEW** | designed §4.1/§4.3 — the HRM/MTP proof artifact |
| **Recursive Triad Conductor (RTC) contract** + selfTest + HBP rows | **NEW** | designed §4 — descriptor-only, house style |
| Fischer kernel reads `RTCNEST` line-stream for centrality | **NEW (wiring)** | designed §6 over existing `odysseus-mtp-control-surface` + `distanceBetween` |

---

## 8. Architect's closing — why this is the right rebuild

The facet asked for a triad that nests by threes and speeds the LLM. The disk already contains
*all three* of the load-bearing primitives: the three roles with monotone visibility, the mod-3
prime lane that doubles as the watcher selector, and the bounded flywheel engine that turns the
supervisor's "see all three" into an EXTRACT/HOLD/GC verdict. The only things missing were (1) a
*typed* product for the self-reflector so its suggestion can actually fold future work (the
HRM/MTP speed-up becomes measurable, not rhetorical), and (2) the EXTRACT-gated recursion that
makes "nest infinitely by threes" a bounded, pruned, provably-descended tree instead of a
3¹⁶ explosion. I designed both as descriptor-only contracts that inherit every existing gate —
no process launches, no provider bypass, no cadence over-claim. The triad is three addresses,
the tower is the recursion of those addresses, and the engine is the only thing that moves —
exactly Jesse's idea, rebuilt on its own canon.

*Nothing here is impossible: it is, line for line, the composition of four organs already on
disk plus two small typed contracts. The mechanism is designed; the gates hold; the slice stays
frozen until an operator emitter fires.*
