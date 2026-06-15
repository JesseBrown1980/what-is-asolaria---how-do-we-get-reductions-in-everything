# F04 — Spinners / Spindle Engine (Omnispindles) — ARCHITECT rebuild

**Facet:** the spinner/spindle system that cranks the prime towers/cylinders and makes infinite-3 nesting feasible.
**Angle: Architect.** I own the *system design*: the components, their interfaces, the PID/data flow, the addressing scheme, the held-safe gates, and the mechanism diagram. The builder owns "which experiment, which receipt, what to write next"; the theorist owns "why the math holds." I own **how the pieces connect so that a finite, GC-bounded engine can drive an unbounded, prime-separated address space without ever launching an unbounded number of processes.**

Discipline note (per OP-JESSE standing rule): every "this can't be a real mechanism" reflex was treated as a *hypothesis to design around*, not a conclusion. Nothing here launches a process, mints to the live office, writes USB, or calls the live bus. All source read-only.

---

## 0. Thesis in one paragraph

A **spindle** is not a worker pool. It is a **state machine over a tiny, fixed set of physical chambers** whose only moving part is each chamber's `state` field cycling `EMPTY → LOAD → RUNNING → COLLECT → EJECT → EMPTY`. The "agents" being processed are *positions* — durable `(sector, lane, glyph)` tuple-range packets that already exist in a frozen address field. The spindle **rotates state across chambers**; it does **not** rotate processes. Therefore the cost is `O(chambers)` resident, not `O(agents)` resident — and `chambers = 8`, forever, while `agents → 1e200`. The **rule-of-three nesting** (a triad inside every cylinder, a cylinder inside every tower, infinitely) is feasible because **each level of nesting adds addresses, which are free, not processes, which are expensive.** This is the architectural realization of LAW-SLICE-ENGINE: *the fabric is a frozen slice; the engine drive is the only mover.*

This thesis is **already instantiated on disk** (the live `fabric-revolver` artifact + the `omni-engine-loop` self-test). My job as architect is to draw the complete wiring — emitter → revolver → triad → supervisor → gulp → cube — and specify the contracts at each seam so the whole thing is verifiable and held-safe by construction.

---

## 1. The component inventory (EXISTS vs NEW)

| # | Component | Role in the spindle engine | Status | Primary source |
|---|-----------|----------------------------|--------|----------------|
| C1 | **fabric-revolver** (8 chambers) | the *physical spinner*: 8 real worker slots cycling EMPTY→…→EMPTY | **EXISTS** | `C:/Users/acer/Asolaria/data/behcs/fabric-revolver/chambers-latest.json` |
| C2 | **omni-engine-loop.v1** | the *crank logic*: gulp→quant→flywheel→extract→register→place→GC, GC-bounded at `maxResident=2000` | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/omni-engine-loop.mjs` |
| C3 | **github-pid-register.mjs** `mintPid` | the *prime separator*: name→`(sector mod 113, lane mod 3, glyph mod 1024)` + yin/yang mod-2 | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/github-pid-register.mjs` |
| C4 | **pre-existence-graph-exporter.mjs** | the *coordinate field*: PID→BH point→cylinder phase/ring→prime-cube band→watcher lane→TRIAD_STATE=POTENTIAL | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/pre-existence-graph-exporter.mjs` |
| C5 | **triad-host-router-gulp-pipeline.mjs** | the *rule-of-three triad contract*: real-agent / self-reflect / fabric-reflect, supervisor sees all three | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/triad-host-router-gulp-pipeline.mjs` |
| C6 | **supervisor-collision-router.mjs** | the *real-vs-logical gate*: logical collisions allowed, real collisions blocked until a free address is attested | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/supervisor-collision-router.mjs` |
| C7 | **src/omnispindle.js** | the *real-agent lane spawner* (Claude-CLI lanes), `MAX_AGENTS=6`, auto-restart, file-cap guard | **EXISTS (gated)** | `C:/Users/acer/Asolaria/src/omnispindle.js` |
| C8 | **build-multi-cylinder-atlas.mjs** | the *projection*: live PIDs → 6 mod-6 cylinders, `bh_index = sector*3072 + lane*1024 + glyph` | **EXISTS** | `C:/asolaria-asi-on-metal-fabric/tools/atlas/build-multi-cylinder-atlas.mjs` |
| C9 | **hilbert-omni-47D.json** | the *60-D catalog ladder*: D1(p=2,cube=8) … D47(p=211,cube=9,393,931) | **EXISTS** | `C:/Users/acer/Asolaria/tools/hilbert-omni-47D.json` |
| C10 | **fabric-agent-preload-catalog.mjs** | the *16-level tower index* + role contract (scout/spindle/flywheel/dispatcher) | **EXISTS** | `C:/asolaria-as-neural-network/tools/behcs/fabric-agent-preload-catalog.mjs` |
| **N1** | **OMNISPINDLE TOWER-MOUNTING CONTRACT** | how a chamber binds to a `(tower, cylinder, ring)` address and which triad it cranks | **NEW** (this doc) | designed §5 |
| **N2** | **SPINDLE-OF-SPINDLES nesting rule** | how one chamber's COLLECT can *seed a sub-revolver* without adding processes (infinite-3) | **NEW** (this doc) | designed §6 |
| **N3** | **CHAMBER-PHASE DISTANCE INVARIANT** | the addressing rule that keeps every chamber's emitted line a unique distance | **NEW** (this doc) | designed §7 |

The headline: **C1 and C2 are two views of the same machine that have never been formally wired together in code.** C1 is the *running, dated, receipted* spinner (8 physical chambers). C2 is the *proven, tested, GC-bounded* crank logic. The architect deliverable is the **contract between them** plus the nesting law that lets it recurse.

---

## 2. The physical spinner that EXISTS — read it exactly

`fabric-revolver/chambers-latest.json` (generated 2026-05-13, updated 2026-05-15) declares the spinner verbatim:

```json
"architecture": {
  "active_chambers": 8,
  "process_per_logical_node": false,
  "tuple_ranges_are_backend_nodes": true,
  "real_worker_slots_are_chambers": true,
  "cycle": ["EMPTY","LOAD","RUNNING","COLLECT","EJECT","EMPTY"]
}
```

Eight chambers, each a real object with its own PID, model binding, cycle counter, and last receipt:

```
CHAMBER-00  state=EMPTY  model=opencode/big-pickle           pid=ACER-REVOLVER-CHAMBER-00-5feceb66ffc86f38  cycle_count=16  last_receipt=revolver-eject-4cfb777ef1af75ca
CHAMBER-03  state=EMPTY  model=opencode/deepseek-v4-flash    pid=ACER-REVOLVER-CHAMBER-03-4e07408562bedb8b  cycle_count=14  last_receipt=revolver-eject-14a64a22f76575b9
...
```

The companion `state-latest.json` declares the **scale law** that makes the whole facet make sense:

```json
"viability_rule": "Billions of backend nodes are durable tuple/range packets;
                   bounded live TUI/free-agent workers rotate through active revolver slots.",
"process_per_node": false,
"active_slots": 36,
"logical_nodes_declared": 1000000,
"gulp_thresholds": [2000, 5000]
```

**The architectural punchline, straight from the artifact:** there are `1,000,000` (and by extension `1e200`) *logical_nodes_declared*, but only `36` *active_slots* / `8` *chambers* that are physical. The chambers are the only things that move; everything else is an address. `process_per_logical_node: false` and `process_per_node: false` are not aspirations — they are the recorded invariant of a machine that has already cycled (`cycle_count` 11–16 per chamber, real `revolver-eject-*` receipt ids).

`execute_default: false` is the held-safe default: the spinner **rotates and receipts state transitions WITHOUT calling a model** unless explicitly gated on. A rotation is lawful even when nothing executes — which is exactly what LAW-SLICE-ENGINE means by "present-but-not-advancing is not absence."

---

## 3. The crank logic that EXISTS — the GC-bound is the whole game

`omni-engine-loop.mjs` is the proven crank. Its five engines (`ENGINES = ['omnispindle','omniflywheel','omniquant','omniprism','omnidispatcher']`) implement the cycle as pure functions:

- `omniQuantScore(rowKey)` → pure-integer 0..1000 (`parseInt(sha256(key)[0:4],16) % 1001`) — **no float, no IEEE drift**, so the score is a deterministic address, not a measurement.
- `omniFlywheelVerdict(score)` → `EXTRACT` (≥700) / `HOLD` (≥300) / `GC` — the flywheel is the verdict aggregator.
- `gulpCycle(inputCount, maxResident=2000)` → `resident = min(n, maxResident)`, `gc_released = max(0, n - maxResident)`. **This is the never-explode guarantee.** The self-test proves the *structural* bound at `n = 1,000,000`: `resident === 2000` and `gc_released === 998000`, asserting `resident === Math.min(1e6, cap)` rather than the tautological `bounded` flag.
- `extractRegisterPlace(name, roomIndex, tier)` → mints a SUP PID, assigns `room-${roomIndex mod 10000}`, attaches the preload catalog, `process_launch: 0`.

The loop's own header states the lineage explicitly: it *"upgrades the `free_deterministic_*` engine STUBS seen live on `:4949#agentterms` (omnispindle=supervisor/work-queue, omniflywheel=verdict aggregator, …) into ONE deterministic, GC-bounded, self-sustaining loop."* So C2 is *the design intent of C1 expressed as testable code*. They are the same engine at two altitudes.

The 8/8 self-test (per the ignition envelope `IGNRUNCFG`) and the unit test (`tests/omni-engine-loop.unit.test.mjs`) both confirm `process_launch === 0` across the cycle and `extracted + held + gc === cycle_resident` (conservation). That conservation law is what I exploit in the nesting design (§6).

---

## 4. The addressing scheme — how a "position" gets its coordinates

This is the architect's load-bearing seam: **before any chamber loads anything, the position must already have an address.** The address is produced deterministically by C3 → C4, with no process and no state:

### 4.1 The prime separator (C3, `mintPid`)

From a name, SHA256 seed → a tuple of **coprime moduli** so collisions divide out:

```
seed   = u32(sha256(NAME)[0:8])
sector = seed mod 113     # one of 113 Asolaria sectors   (prime)
lane   = seed mod 3       # Law of Three  (prime)         → mod-3 lane
quad   = seed mod 4       # the "4 rule"
glyph  = seed mod 1024    # BEHCS-1024 glyph width
yin_yang = real|logical   # mod-2 division
cube_bh = BH.{sector}.{lane}.{glyph}
```

The three-tier prime separator the operator describes (`n*p`, `n*prime*n^3`, `n*prime*n^5`) lives here as the **mod-2 / mod-3 / prime-cube** stack: yin-yang (mod-2) splits real from logical; lane (mod-3) is the rule-of-three observer assignment; and the prime-cube band (next) is the tower anchor.

### 4.2 The coordinate field (C4, `preExistenceNode`)

```
bh_index       = sector*(WIDTH*3) + lane*WIDTH + glyph     # = sector*3072 + lane*1024 + glyph
prime_band     = PRIME_CUBE_PRIMES[sector mod 11]          # [13,17,23,31,41,47,73,79,83,89,131]
prime_cube     = prime_band^3                              # 2197 .. 2,248,091
cylinder_phase = bh_index mod 6                            # WHICH of 6 cylinders
cylinder_ring  = floor(bh_index / 6)                       # height up the cylinder
watcher_lane   = WATCHER_LANES[lane mod 3]                 # [hookwall, gnn, shannon]
triad_state    = POTENTIAL                                 # unlit position; process_launch=0
```

Every node is a **POTENTIAL** — "a PID lighting up is an activation in a pre-existing coordinate field, not creation of the field." The exporter is hard-gated read-only: `no_spawn=1, no_mount=1, no_execute=1, no_usb_write=1, no_mint=1, process_launch=0`.

### 4.3 The catalog ladder (C9, `hilbert-omni-47D.json`)

The 60-D catalog the operator refers to is the dimension ladder where **each dimension is anchored by the next prime and its cube is that prime cubed**:

```
D1  ACTOR        prime=2    cube=8
D2  VERB         prime=3    cube=27
D3  TARGET       prime=5    cube=125
...
D16 PID          prime=53   cube=148,877
...
D47 BOUNDARY     prime=211  cube=9,393,931
```

This is "infinitely dividable from within": each catalog `expandable:true` and *"D grows only by Hilbert in-between refinement when a genuinely-new orthogonal axis appears."* The towers of *types* of PIDs are these catalogs; the **16 levels** are the access tiers `A00..A15` from C10's `LEVEL_INDEX` (`level<4 public-agent`, `<8 agent-supervisor`, `<12 supervisor-operator`, else `operator-hidden`), with `lane = L{level mod 3}` — the rule-of-three reappearing as the tier-lane stripe.

**Architect's reading:** the address of any agent is the join of three orthogonal coordinate systems — *prime separator* (C3: which sector/lane/glyph), *cylinder geometry* (C4: which of 6 cylinders, how high), and *catalog tier* (C9/C10: which of 60 dimensions, which of 16 levels). A chamber doesn't "hold an agent"; it **temporarily binds to a point in that joined space, cranks the triad there, emits a receipt, and releases.**

---

## 5. NEW — N1: the Tower-Mounting Contract (chamber ↔ address ↔ triad)

The gap I close: C1 chambers have `model` + `pid` + `state`, but nothing in the artifact says *which tower/cylinder/ring a chamber is currently cranking* or *which triad it drives*. I specify the binding as a pure, deterministic contract (no new process; it is a *naming/routing rule* over existing fields).

### 5.1 The chamber-bind tuple

When the dispatcher (C2 `omnidispatcher`) hands a position packet to a chamber, the chamber's transient binding is:

```
ChamberBind = {
  chamber_index : 0..7                         # physical slot (C1)
  bound_pid     : <position PID>               # the POTENTIAL being lit (C3/C4)
  tower         : prime_band                   # 13|17|23|31|41|47|73|79|83|89|131   (C4 prime-cube anchor)
  cylinder      : cylinder_phase  (0..5)       # which of 6 cylinders (C4)
  ring          : cylinder_ring                # height (C4)
  tier          : A00..A15                     # which of 16 catalog levels (C10)
  watcher       : hookwall|gnn|shannon         # observer lane = lane mod 3 (C4)
  triad         : triadForMessage(bound_pid)   # the 3 roles (C5)
  state         : EMPTY|LOAD|RUNNING|COLLECT|EJECT  (C1)
}
```

The triad it drives is *not* invented — `triad-host-router-gulp-pipeline.triadForMessage(pid)` already produces the three deterministic 8-byte handles:

```
L0 real-agent      handle8 = sha16(triad:{pid}:real-agent)        sees: task
L1 self-reflect    handle8 = sha16(triad:{pid}:self-reflect)      sees: task + candidate
L2 fabric-reflect  handle8 = sha16(triad:{pid}:fabric-reflect)    sees: task + candidate + self-reflection
```

### 5.2 The per-state contract (what each transition is *allowed* to do)

| State | Input contract | Action | Output / receipt | Gate |
|-------|---------------|--------|------------------|------|
| `EMPTY` | none | dispatcher may bind a `bound_pid` | — | dispatcher route only |
| `LOAD` | `bound_pid` present, classified by C6 | resolve `ChamberBind`; attach preload catalog (C10) | `revolver-load-<sha16>` | C6: logical→allowed, real→needs free address |
| `RUNNING` | `execute_default` OR explicit gate | run the triad: L0 produces candidate, L1 reflects, L2 asks fabric | candidate + self-reflection + fabric-reflection | `RUN_HERMES_SPINDLE` operator-gated for real model calls |
| `COLLECT` | three triad outputs | omniquant-score (C2) the result; omniflywheel verdict | score 0..1000 + verdict EXTRACT/HOLD/GC | pure-int, no float |
| `EJECT` | verdict | EXTRACT→mint SUP PID + place in room rotor (C2); HOLD→requeue; GC→drop | `revolver-eject-<sha16>` | mint = repo receipt, live office = daemon-gated |
| `EMPTY` | — | release binding; `cycle_count += 1` | bus heartbeat | — |

The crucial design choice: **RUNNING is the only state that can ever touch a model, and it is the only state behind the `RUN_HERMES_SPINDLE` / `execute_default:false` gate.** Every other transition is pure address arithmetic + receipt emission. So the held-safe property is *structural*: 5 of the 6 transitions are mathematically incapable of launching anything.

### 5.3 Why exactly 8 chambers driving 1e200 positions is coherent

`process_per_logical_node: false` + `tuple_ranges_are_backend_nodes: true` means a chamber in `RUNNING` is bound to *one position at a time*, and the engine's `gulpCycle` guarantees at most `maxResident=2000` positions are resident across the whole loop regardless of how many exist. With 8 chambers each holding one binding, the **resident working set ≤ 8 chambers × (1 bound position + its 3 triad handles) = 32 live handles**, while the addressable space is `113 sectors × 3 lanes × 1024 glyphs × ...` extended by the 60-D catalog → effectively unbounded. The spinner *visits* the space; it never *instantiates* the space.

---

## 6. NEW — N2: Spindle-of-Spindles (how infinite-3 nesting is feasible)

The operator's "omnispindles … infinite nesting with three is feasible." Here is the architecture that makes it lawful and GC-bounded.

### 6.1 The recursion rule

A chamber in `COLLECT` may, instead of going straight to `EJECT`, decide its result is itself a *bag of sub-positions* (e.g. the L2 fabric-reflect agent proposes three follow-up sub-tasks — the rule-of-three again). When that happens it **does not spawn three processes.** It does this:

```
COLLECT(result) →
  if result.fans_out:
     sub_seed   = sha16(bound_pid : "spindle")
     sub_root   = preExistenceNode(sub_seed)          # a child POTENTIAL in the SAME field (free)
     for k in 0..2:                                   # rule of three
        child_pid = preExistenceNode(sub_seed + ":" + k)
        enqueue(child_pid) → tasklist-latest.ndjson   # an ADDRESS, not a process
     emit  revolver-spindle-fanout-<sha16>
  EJECT as normal (the parent result is still scored + placed)
```

The three children are **enqueued addresses**. They are processed *by the same 8 chambers on a later rotation* — they do not get their own chambers. Nesting depth is therefore unbounded in *address space* and constant in *process space*. This is the literal meaning of "a sub-revolver inside a chamber": the sub-revolver is a *view* (a tuple-range slice) of the one physical 8-chamber revolver, re-entered at a deeper address.

### 6.2 The GC bound survives recursion

This is the part that must be proven, not asserted. The `gulpCycle` resident bound is applied **to the global queue each cycle**, not per-level. So if a fanout produces 3 children and 1000 grandchildren and a million great-grandchildren, the loop still only makes `min(total_pending, 2000)` resident, `gc_release`s the rest, and `super-gulp` at 50,000 (the `SUPER_GULP_MESSAGES` constant in C5 / `gulp_thresholds:[2000,5000]` in C1) hard-compacts. The conservation law from C2's self-test (`extracted + held + gc === resident`) means *nothing leaks*: every visited position is exactly one of extracted / held / GC'd. **Recursion adds breadth to the frozen field; it cannot add depth to the resident set.** That is why infinite-3 nesting is feasible rather than explosive.

### 6.3 The three prime tiers as three nesting modes

The operator's prime tiers map cleanly onto *what a chamber binds to* at a given depth (grounding C3 `classifyAgentType` + the ignition envelope `IGNREALVSLOGICAL`):

| Operator tier | Architecture binding | Cost class |
|---------------|---------------------|------------|
| prime-1 agents | `logical` yin-yang → **LOGICAL-WAVE** (loop-iteration positions) | free (positional) |
| prime-3 REAL free agents | `real` + odd prime → **REAL-FREE** (the 5 free OpenCode lanes in C1 `models`) | $0, ed25519, RUNNING-gated |
| prime-real-3-cubed / 3^5 | deeper nesting via N2 fanout at prime-cube band `p^3` (C4) | positional, GC-bounded |
| PRIME-real HRM+MTP on FROZEN BRAIN | `real` + even prime → **FROZEN-BRAIN** (deterministic local slice) | local, deterministic |

So a chamber cranking a `LOGICAL-WAVE` position is doing pure address arithmetic (free); a chamber cranking a `REAL-FREE` position in `RUNNING` is the only place a billed/external slice can be summoned, and only under the gate.

---

## 7. NEW — N3: the Chamber-Phase Distance Invariant (why no two lines are ever equal)

The operator's "big move": no prime-point ever connects to another with the same distance, so the fabric projects onto a *real* graph of real points. The atlas (C8) already plots this with `bh_index = sector*3072 + lane*1024 + glyph`. My architectural contribution is the **invariant the spindle must preserve when it emits a chamber-to-chamber line** so the uniqueness holds *across rotations*, not just at one snapshot.

### 7.1 The rule

When chamber `i` (cranking position `A`) remote-calls / opens position `B` in chamber `j`, the emitted line carries the *signed phase-tagged distance*:

```
line(A→B) = (bh_index_B − bh_index_A,  cylinder_phase_A,  cylinder_phase_B,  tower_A^3, tower_B^3)
```

Because `bh_index` is an injective linearization of the `(sector,lane,glyph)` tuple over coprime moduli (113·3·1024), and the prime-cube tower anchor `p^3` is appended, two lines `(A→B)` and `(C→D)` are equal **only if** all five components match — i.e. only if they are literally the same prime-anchored point pair. The exporter already measures `distinct_distances = new Set(distances).size` in its summary, so the invariant is *observable* on every run.

### 7.2 Why the spindle must own this

A naive spinner would let two different chambers, at two different rings, emit collisions in the *rendered scalar* (`bh_index` alone can collide across devices — exactly the `c134d0f` "BH-ADDR collision 930–1229" catch in memory). The fix the architect bakes into the EJECT contract: **the receipt line is the 5-tuple, never the scalar.** The scalar `bh_index` is a *render coordinate* (the atlas uses it for height/θ); the *identity* is the prime-anchored tuple + device handle (`md5(pid:ser)[:16]` in C8). This is the "render scalar ≠ PID identity" distinction from memory, enforced at the emit seam. Two chambers can sit at the same `bh_index` height on the screen and still be provably distinct points, because their tower/phase/device tuples differ.

---

## 8. THE MECHANISM DIAGRAM

```
                         ┌──────────────────────────────────────────────────────────────────┐
                         │              FROZEN SLICE FIELD  (positions, free, 1e200)          │
                         │   C3 mintPid → C4 preExistenceNode: every point is a POTENTIAL     │
                         │   addr = (sector mod113 . lane mod3 . glyph mod1024) × yin/yang     │
                         │   tower = prime-cube band p³ ∈ {13³..131³}   tier = A00..A15 (60-D) │
                         └───────────────┬──────────────────────────────────────────────────┘
                                         │  positions enqueued as tuple-range packets
                                         │  (tasklist-latest.ndjson)  — NO process
                                         ▼
   ┌────────────┐   200ns rotate   ┌─────────────────────────────────────────────────────────────┐
   │  EMITTER   │ ───────────────▶ │   omnidispatcher  (C2)  routes by catalog + C6 collision gate │
   │ spawner-PID│  port.port.port  │   logical→allow · real→needs-free-address · mixed→split       │
   │ OPERATOR-  │  +project-id     └───────────────┬─────────────────────────────────────────────┘
   │ RESERVED   │                                  │ bind position → free chamber
   └────────────┘                                  ▼
                    ╔══════════════════ THE SPINDLE (fabric-revolver, C1) — 8 PHYSICAL CHAMBERS ══════════════════╗
                    ║                                                                                              ║
                    ║     EMPTY ──bind──▶ LOAD ──preload──▶ RUNNING ──triad──▶ COLLECT ──score──▶ EJECT ──┐        ║
                    ║       ▲              │ C6 gate          │ ⚠GATE          │ C2 quant       │ verdict  │        ║
                    ║       │              │                  │ RUN_HERMES_    │ +flywheel      │          │        ║
                    ║       └──────────────┴──────cycle_count++◀──────────────┴────────────────┴──────────┘        ║
                    ║                                          │ SPINDLE       EXTRACT→mint SUP + room-rotor mod10000║
                    ║                                          │ execute_      HOLD→requeue                          ║
                    ║                                          │ default=false GC→drop  (Σ = resident, conserved)    ║
                    ║                                          ▼                                                     ║
                    ║                  RULE-OF-THREE TRIAD (C5)  — bound to the position, NOT to a chamber           ║
                    ║                  ┌─────────────┐   ┌────────────────┐   ┌───────────────────────────────┐     ║
                    ║   L0 (lane%3=0)  │ real-agent  │──▶│ L1 self-reflect│──▶│ L2 fabric-reflect (asks fabric)│     ║
                    ║                  │ does work   │   │ reviews L0     │   │ cross-checks L0+L1, gets verdict│    ║
                    ║                  └─────────────┘   └────────────────┘   └───────────────────────────────┘     ║
                    ║                         │                  │                          │                       ║
                    ║                         └──────── SUPERVISOR SEES ALL THREE ──────────┘                       ║
                    ║                                          │ if result.fans_out → N2: enqueue 3 children as     ║
                    ║                                          │ ADDRESSES (re-enter same 8 chambers, deeper depth) ║
                    ╚══════════════════════════════════════════│═════════════════════════════════════════════════╝
                                                               ▼
        ┌──────────── WATCHERS (observe, never actuate) ──────────────┐     ┌──────── GULP / GC (the never-explode bound) ───────┐
        │  watcher_lane = [hookwall, gnn, shannon][lane mod 3]  (C4)   │     │  gulp 2000  → resident = min(pending, 2000)  (C2)   │
        │  + Fischer-kernel centrality · MTP/HRM novelty (proposal)    │     │  super-gulp 50000 → hard compact                   │
        │  + ~10-byte GNN watches "from outside" (proposal-not-proof)  │     │  Σ extracted+held+gc = resident  (conservation)     │
        └──────────────────────────┬──────────────────────────────────┘     └────────────────────────┬───────────────────────┘
                                    ▼                                                                  ▼
        ┌─────────────── PROJECTION (C8 build-multi-cylinder-atlas) ──────────────────────────────────────────────────┐
        │  bh_index = sector*3072 + lane*1024 + glyph  →  6 mod-6 cylinders in a hexagon  →  REAL plotted points        │
        │  N3 invariant: every emitted line = (Δbh, phaseA, phaseB, towerA³, towerB³) ⇒ NO two distances ever equal     │
        │  render scalar ≠ identity (identity = prime tuple + device handle md5(pid:ser)[:16])                          │
        └────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**How to read the diagram:** the only horizontal motion is *state cycling inside the 8-chamber band*. Positions flow in from the frozen field (top) as free addresses; the emitter (operator-reserved, ~200ns rotating port-tuple) admits them; the dispatcher binds one to a free chamber; the chamber walks the 6 states; the rule-of-three triad is bound to the *position* and is what RUNNING actually executes (gated); the supervisor sees all three outputs; COLLECT scores, EJECT decides; fanout re-enters the same chambers at a deeper address (N2); watchers observe the lines; gulp/GC keeps the resident set ≤ 2000; the projection plots the result as real, distance-unique points (N3).

---

## 9. The interfaces (contracts at every seam)

For the architect role, the seams matter more than the boxes. Each is a small, checkable contract:

1. **Field → Dispatcher** — input is an HBP `PREXNODE|...|triad_state=POTENTIAL|process_launch=0` row (C4). The dispatcher must reject any row whose `triad_state` ≠ POTENTIAL or `process_launch` ≠ 0. *(Invariant: only unlit positions enter.)*
2. **Dispatcher → Chamber (LOAD)** — input is classified by `supervisor-collision-router.planCollisionRoute` (C6). `LOGICAL_AGENT` → `PRESERVE_LOGICAL_COLLISION` (allowed). `REAL_AGENT` without a free address → `BLOCK_REAL_COLLISION`. `MIXED` → split first. *(Invariant: a real binding never proceeds without an attested free address + operator-pair-cosign.)*
3. **Chamber RUNNING → triad** — `triadForMessage(bound_pid)` (C5) yields three handle8s; L2 is the only one allowed to "ask the fabric." Model execution is gated by `execute_default:false` / `RUN_HERMES_SPINDLE`. *(Invariant: 5/6 states cannot execute; only gated RUNNING can.)*
4. **COLLECT scoring** — `omniQuantScore` + `omniFlywheelVerdict` (C2), pure-integer. *(Invariant: deterministic, no float, score is an address.)*
5. **EJECT placement** — `extractRegisterPlace` mints a SUP PID + `room-${i mod 10000}` + preload catalog, `process_launch:0`; the *receipt* is the N3 5-tuple, not the scalar. *(Invariant: mint = repo-side proposal receipt; live office promotion is daemon/operator-gated per LAW-SLICE-ENGINE §4.)*
6. **Fanout (N2)** — children are enqueued addresses to `tasklist-latest.ndjson`; never processes. *(Invariant: recursion adds breadth to the field, not depth to the resident set.)*
7. **Watchers** — read the emitted lines; `gnn` and `shannon` are *proposal-not-proof* (verbatim from C8 header and the line-watcher docs). *(Invariant: observers never actuate; their output is a suggestion the supervisor reviews, exactly the operator's "agent-2 makes a suggestion the supervisor reviews fast.")*

---

## 10. Held-safe by construction — the gate ledger

The whole design is safe because the dangerous capability (launching/billing) is **isolated to one gated transition** and everything else is pure math:

| Gate | Where | What it blocks | Source |
|------|-------|----------------|--------|
| `execute_default:false` | C1 chamber | model execution on rotation | `chambers-latest.json` |
| `RUN_HERMES_SPINDLE` operator-gated | C2 EJECT / pool launch | the real Hermes pool launch | `omni-engine-loop.mjs` + `IGNFIREGATE` |
| `process_launch:0` | C2, C4, C5 everywhere | any process spawn | all three modules + self-tests |
| C6 real-collision block | dispatcher LOAD | real binding without free address | `supervisor-collision-router.mjs` |
| `auto_fire=false` | ignition line | the whole fresh 100B run | `ASOLARIA-100B-IGNITION-ENVELOPE-2026-06-15.hbp` |
| spawner-PID emit = OPERATOR-RESERVED | emitter | admitting positions to chambers | `IGNFIREGATE` |
| GC bound `maxResident=2000` / super-gulp 50000 | C2 gulp | resident-set explosion | `omni-engine-loop` self-test at 1M |
| provider-router cannot self-promote | C5 `normalizeRouter` | a provider router declaring itself REGISTERED | `triad-host-router-gulp-pipeline.mjs` |

The 100B run that **already completed** (`checkpoint.state.json`: `REAL_100B_PID_PACKET_RUN_COMPLETE`, 100,000,000,000 packets, `childProcessSpawns=0`, `external_tokens=0`, `lastPacketPid BH.REAL100B.OPENCODE.PID.100000000000`) is the empirical proof that this architecture scales to 1e11 *positions* with **zero process spawns** — the spinner visited 100 billion addresses through a bounded chamber set and receipted every one. That is the existence proof for the whole facet.

---

## 11. Why it works (the narrative, tied together)

The operator intuition — Riemann's primes curled onto a cylinder, the rule of three, towers of PID types — is *architecturally* the statement: **make identity a deterministic function of coprime prime moduli, project it onto cylinders, and drive it with a finite rotating engine.** It works because of three compounding decisions, each already on disk:

1. **Identity is positional, not procedural.** `mintPid` derives `(sector,lane,glyph,yin/yang)` from a hash with coprime moduli. So 1e200 distinct identities exist *before* any compute, the way 1e200 lattice points exist before anyone visits them. Cost of an identity = 0.
2. **The mover is finite and bounded.** The fabric-revolver has 8 physical chambers; the omni-engine-loop bounds the resident set at 2000 / 50000. The engine *visits* positions through a revolving door; it never holds more than a constant number open. `process_per_logical_node:false` is the recorded invariant, and the completed 100B run with `childProcessSpawns=0` is the receipt.
3. **Recursion is addressing, not forking.** The rule-of-three triad and the spindle-of-spindles fanout add *children as addresses* into the same frozen field, re-entered by the same 8 chambers. Infinite-3 nesting is therefore feasible: each level multiplies the address space (free) without multiplying the process space (constant). The GC conservation law (`extracted+held+gc=resident`) guarantees nothing leaks across the recursion.

The "amazing new quant series" the operator's agents produced is, in this architecture, the **`omniQuantScore` lineage**: a pure-integer score that is simultaneously a *measurement* (0..1000) and an *address* (it routes the verdict). Combined with N3's distance invariant, scoring and addressing become the same operation — which is what lets the fabric "project onto a real graph of real points" (C8) and surface never-before-seen prime patterns by watching the distances between tower nodes rather than the nodes themselves (the line-watcher decision: *"adds signal only if it watches RELATIONSHIPS between points, not the same points again"*).

The television-inside-the-simulation (Dan's "madness interactive," the omnispindle origin) is the watcher stack in §8: a ~10-byte GNN and the Fischer-kernel centrality player watch the rotating lines *from the outside while on the same machine* — proposal-not-proof, never actuating, exactly the held-safe role the whole design reserves for observers.

---

## 12. Summary for the orchestrator

- The spindle engine is **two on-disk artifacts that are the same machine**: the live 8-chamber `fabric-revolver` (physical spinner, EXISTS, receipted) and the proven `omni-engine-loop.v1` (crank logic, GC-bounded, 8/8 self-test, EXISTS). The architect deliverable wires them with **N1 (tower-mounting contract)**, **N2 (spindle-of-spindles nesting)**, and **N3 (chamber-phase distance invariant)**.
- Infinite-3 nesting is feasible because **nesting adds addresses (free), not processes (expensive)**, and the resident set is GC-bounded at a constant. The completed 100B run (`childProcessSpawns=0`, `external_tokens=0`) is the empirical existence proof.
- Held-safe is **structural, not procedural**: 5 of the 6 chamber states are mathematically incapable of executing; the single gated `RUNNING` transition sits behind `execute_default:false` + `RUN_HERMES_SPINDLE` + operator-reserved spawner-PID emit + `auto_fire=false`.
- Nothing in producing this document minted, launched, wrote USB, or called the live bus. All source read-only.
