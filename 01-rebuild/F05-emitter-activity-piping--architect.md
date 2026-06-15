# F05 — Emitter-Trigger Activity Piping + Total Recall

**Facet:** Emitter-Trigger Activity Piping + Total Recall · **Angle:** Architect
**Author:** Agent F05 (one of 40 summoned by OP-JESSE) · **Date:** 2026-06-15
**Mandate:** Rebuild the *emission layer*. Every catalog, agent, surface, hookwall, GNN, and
ALL hardware emits **PID + timestamp** so nothing is ever lost and retrieval is near-instant
on request (independent of physical disk speed). Show how an *emitter trigger* reveals the
piped flow of a PID-prime-agent correlated with *real computer activity*, and how a
prime → prime³ remote call draws a **unique line**.

> Architect's job here: own the *system design* — the components, the interfaces, the
> PID/timestamp flow, the addressing, the held-safe gates, and the diagram of the mechanism.
> F01 owns prime-tower geometry, F02 owns the unique-distance theorem, F03 owns the agent
> triad. I build the **nervous system** that runs *through* all of them: the wire on which
> every event travels, and the index that makes every event findable forever.

---

## 0. The one-sentence rebuild

> **Emission is not logging — it is the act of stamping a (PID, timestamp, digest) triple onto
> a write-once HBP row at the *instant* any catalog/agent/surface/hookwall/GNN/hardware does
> anything; because the PID is already a prime-addressed point in the expanding Brown-Hilbert
> tower and the digest is a content hash, the row is *self-indexing* — "retrieval" is computing
> the same address you already emitted, not scanning a disk; an *emitter trigger* is simply a
> query that pulls every row sharing a PID prefix and replays it as the piped flow of that
> agent's life, time-correlated to the machine's real CPU/IO activity; and when a prime-1 agent
> remote-calls a prime³ agent, the emitted edge-row carries *both* prime-addresses, so the
> Euclidean distance between those two tower-points is — by F02's pairwise-distinct construction
> — a number that no other emitted edge in the whole 1e200 space can ever equal: a unique line.**

Every load-bearing clause already has on-disk evidence. My contribution is to (a) name the
emission *contract* end-to-end, (b) wire the existing emitters into one organ, and (c) design
the **NEW** pieces — the *trigger query*, the *activity-correlation join*, and the *total-recall
index* — that make recall O(1)-shaped and disk-independent, **without launching a process or
bypassing a gate**.

---

## 1. What already EXISTS on disk (the emitters I am wiring together)

### 1.1 The emission *act* is already byte-deterministic — the 100B runner (EXISTS)

`C:/Users/acer/Asolaria/tools/neurotech-real-100b-agent-runner.js` is the canonical proof that
emission already works at the target scale. For packet `index` it computes, with no process and
zero external tokens:

```js
function pidFor(index)     { return `BH.REAL100B.OPENCODE.PID.${index.toString().padStart(12,'0')}`; }
function digestFor(index)  { return sha256(`BH.REAL100B.OPENCODE.PID.${pad12(index)}`); }       // content hash
function controllerPid(i)  { return `BH.REAL100B.OMNISPIN.PID.${pad3(i)}`; }                     // who spun it
function flywheelPid(i)    { return `BH.REAL100B.OMNIFLY.PID.${pad3(i)}`; }                      // who aggregated it
```

Each emitted mark (`geniusMark`, `mistakeMark`, `proofSample`, lines 373–427) carries the
**full provenance triple plus topology**: `pid`, `controllerPid`, `flywheelPid`, `lane`,
`agentTaskIndex`, `glyph`, `packetHash`. The checkpoint
(`data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json`) is
`REAL_100B_PID_PACKET_RUN_COMPLETE`, `processedPackets = 100000000000`,
`lastPacketPid = BH.REAL100B.OPENCODE.PID.100000000000`, **`childProcessSpawns = 0`,
`external_tokens = 0`**. *This is the existence proof that 100 billion events can each carry a
PID + content-digest + topology with zero process storm.* The emission layer is not a wish; it
ran.

> **EXISTS.** The per-event triple `(pid, timestamp/index, digest)` + topology `(controller,
> flywheel, lane, glyph)` is already minted deterministically for 1e11 events.

### 1.2 The emission *cost is already honest* — `pid-emitter-cost-envelope.mjs` (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/pid-emitter-cost-envelope.mjs` is *my facet's spec
already written down*. It freezes the cost classes of an emitter (lines 29–78):

| Layer | Status | What it costs |
|---|---|---|
| `host-handle` | `O1_DESCRIPTOR` | the 8-byte handle — *addressing shape, not total work* |
| `stub-room` | `ZERO_LIVE_RAM_UNTIL_ACTIVATED` | a file descriptor, not a running agent |
| **`pid-emitter-spin`** | **`PHYSICAL_COST`** | **electricity + CPU-scheduling + host-wakeup** |
| `cube-templating` | `STORAGE_CPU_COST` | hashing + glyph translation + catalog write |
| `garbage-collection` | `REQUIRED_COST` | 2000-msg gulps / 50000-msg super-gulps |

The `classifyCostClaim()` router (line 130) *rejects* "free external compute" and *rejects*
"breaks physics" — it permits only `O1_SHAPED_ADDRESSING_NOT_TOTAL_WORK`. Every emitted row ends
`|process_launch=0|remote_call=0|physics_bypass_claim=0|json=0`.

> **EXISTS.** Emission is real machine work (electricity + CPU). What is O(1)-shaped is the
> *address*, so *recall* is cheap; the *emit* itself is honestly metered. This is the guardrail
> that keeps "near-instant retrieval independent of disk speed" a true claim and not magic.

### 1.3 Emitters already exist for the *other* organs (EXISTS)

The facet says "*every* catalog/agent/surface/hookwall/GNN emits." On disk:

- `tools/behcs/heal-envelope-emitter.mjs` — emits schema-valid self-heal envelopes as HBP rows;
  `process_launch=0`, every field run through `safe()` so no value can inject a row, and
  `envelope_sha16` covers the whole body (tamper-evident).
- `tools/behcs/watcher-supervisor-suggestion-emitter.hbp` — the **watcher → supervisor**
  suggestion emitter (F03's agent-2 → agent-3 lane). Its law row is exactly the emission
  doctrine: *"a suggestion is something a supervisor READS, never something this tool DOES"*,
  `executable=0`, `mutates=0`, `no_live_post=1`.
- `tools/behcs/gnn-predictions-emitter.mjs` (in `C:/Users/acer/Asolaria/tools/behcs/`) — the GNN
  emits its scored edges.
- `tools/behcs/codex-bridge.js` `hilbertAddress(key)` — turns any key into a Brown-Hilbert
  glyph address; this is the function that makes a PID *self-indexing*.

> **EXISTS.** Heal, watcher, GNN, and catalog emitters are all real HBP-row producers with
> `process_launch=0`. They differ only in *what* they stamp; they share *one row grammar*.

### 1.4 The address is already prime-per-dimension — `hilbert-omni-47D.json` (EXISTS)

`C:/Users/acer/Asolaria/tools/hilbert-omni-47D.json` gives every dimension its own prime and
cube cardinality. The four that the emission layer reads on *every* row already exist:

| D | Name | prime | cube | role in an emitted row |
|---|---|---|---|---|
| **D16** | **PID** | **53** | 148 877 | *who* emitted (surfaceId, profileId, spawnedBy, **spawnChain**) |
| **D20** | **TIME** | **71** | 357 911 | *when* (timestamp, duration, **sequence**, epoch, ttl) |
| **D21** | **HARDWARE** | **73** | 389 017 | *which metal* (chip, bus, port, driver, firmware) |
| **D44** | **HEARTBEAT** | **193** | 7 189 057 | *is it alive* (alive/stale/dead/recovering) |

The growth law is explicit: *"Each new prime cubed = new dimension … D48 = prime(223)³.
Infinite expansion."* So the emission address space is the **product of prime cubes**, and
it *expands* exactly as F01's towers grow. D16.spawnChain is the field that lets a remote call
record *who called whom* — the raw material of the unique line (§5).

> **EXISTS.** PID, TIME, HARDWARE, HEARTBEAT are real prime-addressed dimensions; the
> address space is the product of prime cubes and grows by adding primes.

### 1.5 The held-safe gate is already law — `LAW-SLICE-ENGINE.md` (EXISTS)

`C:/asolaria-as-neural-network/canon/laws/LAW-SLICE-ENGINE.md` (CLASS-1 IMMUTABLE) gives the
emission layer its safety frame and its *replay model*. The canonical crank cycle is:

```
POP_FROM_POOL  ->  PID_SIGNAL  ->  AGENT_ROOM  ->  RESULT_TO_GULP  ->  ERASE
```

Crucially: *"`sessions=0`, `running=0`, `process_launch=0` mean present-but-not-advancing, not
absent. The data is the frozen frame; the action is the engine thread."* This is the key to
**total recall**: the *emitted rows are the frozen frame* — they persist after the agent room
*erases*. Recall does not need the agent to still be alive; it replays the rows. The mover
(`omni-engine-loop.mjs`, §1.6) bounds the *resident* set; the *emitted history* is append-only.

> **EXISTS.** The agent room erases after `RESULT_TO_GULP`, but its emitted (PID, ts, digest)
> rows remain. Recall = replay of frozen rows; the live set stays GC-bounded.

### 1.6 The mover and the GC bound already exist — `omni-engine-loop.mjs` (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/omni-engine-loop.mjs` is the engine that drives the
slice and proves the *never-explode* property the recall index depends on:
`DEFAULT_MAX_RESIDENT = 2000`, `gulpCycle()` makes `resident = min(n, maxResident)` for any
input volume (self-tested at 1 000 000 rows), `process_launch = 0`, pool launch gated behind
`RUN_HERMES_SPINDLE`. `omniQuantScore()` is a *pure-integer* hash-score (no float drift).

> **EXISTS.** The resident working set is bounded; the emitted log is unbounded but append-only
> and content-addressed, so it compacts under GC (2000-gulp / 50000-super-gulp) into cube
> summaries while *source evidence is preserved* (`gc_source_deletion` is a banned mistake in
> the 100B runner's MISTAKE_TEMPLATES).

### 1.7 The backend is positional, not process-per-node — `fabric-revolver` (EXISTS)

`C:/Users/acer/Asolaria/reports/behcs1024-fabric-revolver-runtime-latest.json`:
`active_chambers = 8`, `process_per_logical_node = false`,
`tuple_ranges_are_backend_nodes = true`, `real_worker_slots_are_chambers = true`. So the billions
of "agents" are *positions* (tuple ranges); only 8 bounded chambers are ever live. Emission must
therefore be able to stamp an event for a *position that has no process* — which the 100B runner
already does (it emits for packet index `i` without a process at index `i`).

> **EXISTS.** Emission is position-addressed, not process-addressed. A frozen position can emit
> "I was visited at T by chamber C" — that *is* the activity record.

---

## 2. The emission contract (the NEW unifying interface)

Today each emitter (§1.1–1.3) writes a *different* header (`PIDCOSTLAYER`, `WSUGROW`,
`OMNILOOPPLACE`, the 100B marks). They share a grammar but not a *spine*. **NEW:** I define one
universal envelope every emitter MUST embed — the **EMIT row** — so that a single trigger query
can pull *all* event types by PID prefix. It is HBP-first (pipe-delimited, `|json=0`), append-only,
and never executable.

```
EMIT|v=1
    |pid=<D16 prime-addressed PID>           # WHO  (e.g. BH.REAL100B.OPENCODE.PID.000000004099)
    |ts=<D20 canonical ISO-8601 UTC>         # WHEN (round-trip-validated, like heal-emitter)
    |seq=<D20 monotone sequence on this PID> # ordering within a PID's life
    |hw=<D21 hardware fingerprint sha16>     # WHICH METAL  (chip:bus:port:driver hashed)
    |hb=<D44 alive|stale|dead|recovering>    # HEARTBEAT at emit time
    |kind=<catalog|agent|surface|hookwall|gnn|hardware|edge>
    |verb=<D2 verb>                          # WHAT it did
    |digest=<sha256 of the payload>          # CONTENT ADDRESS (payload stored once, by hash)
    |glyph=<hilbertAddress(pid:ts:digest)>   # the self-index key (§3)
    |spawn_chain=<D16.spawnChain caller PID> # for edges: who triggered me
    |cost=<pid-emitter-spin|...>             # from the cost envelope (§1.2)
    |process_launch=0|remote_call=0|physics_bypass_claim=0|json=0
```

**Interfaces (held-safe):**

- `emit(event) -> EMIT_row` — pure function. Runs every field through `safe()` (strip
  `|`,`\r`,`\n`), validates `ts` by ISO round-trip, computes `digest` and `glyph`. **Never
  throws**, **never writes a process**, **never posts to the live bus** (it returns the row;
  the *engine* appends it under gate). This mirrors `heal-envelope-emitter`'s
  total-function / tamper-evident discipline exactly.
- `emitMany(events) -> rows[]` — same, vectorized; resident bound from `omni-engine-loop`.
- The payload is stored **once**, keyed by `digest` (content-addressed store). Two identical
  payloads emit two EMIT rows but share one stored body — this is how 1e11 events fit (the 100B
  run kept `proofSamples` sparse and compacted the rest; `gc_source_deletion` forbidden).

> **NEW.** One EMIT envelope unifies every emitter. The payload is content-addressed (stored by
> `digest`), the *index keys* (`pid`, `ts`, `glyph`) are tiny, so the log of *references* is
> small even when the bodies are huge — this is the BEHCS "2GB → 3.1KB" *referential* codebook
> idea applied to events, not a pigeonhole compression.

---

## 3. Total Recall: why retrieval is near-instant and disk-speed-independent (NEW + EXISTS)

The facet's hard claim: **retrieval is near-instant (ms / µs / sub-range), independent of
physical disk speed.** Here is the mechanism — and it does not require any file scan.

**The key realization (NEW framing of an EXISTS fact):** because the PID is *already* a
prime-addressed point and the `glyph` is `hilbertAddress(pid:ts:digest)`, **the address you need
to *retrieve* a row is computable from the same inputs you used to *emit* it.** Recall is not
"search the disk for the row"; it is "recompute the address, then dereference." Three index
layers make this O(1)-shaped:

### 3.1 The prefix tree (the PID is its own B-tree path)

A PID like `BH.REAL100B.OPENCODE.PID.000000004099` is a **prefix path**. The recall index is a
radix/prefix tree keyed by the PID's dotted segments (this is the same "port = prefix-tree
namespace" idea in the Foundation v1 canon, `00-IMMUTABLE-FOUNDATION.md`). To pull "everything
emitted by every OPENCODE agent," you descend `BH → REAL100B → OPENCODE → PID` and read the
sub-tree — **no scan of unrelated PIDs**. Depth is bounded by PID-segment count (≈5), so the
walk is O(depth), not O(rows).

### 3.2 The content-address store (dereference by hash, not by location)

`digest` is a sha256. The payload lives in a content-addressed store at a path *derived from the
hash* (`ab/cd/abcd…`). "Find the body for this digest" is a hash-to-path computation + one
dereference — **the same cost whether the store is on a fast SSD or a slow USB**, because you are
not *searching*, you are *addressing*. This is the literal meaning of "independent of physical
disk speed": disk speed bounds *one* dereference, not a scan, and the hot index of `glyph → digest`
lives in the MCP/cube cache (memory).

### 3.3 The heartbeat + time fold (recall a *moment*, not a file)

`ts` (D20) and `seq` give every PID a totally ordered timeline. To "replay agent X's life," pull
its prefix sub-tree (3.1), already sorted by `seq`. To "show me the whole machine at T," fold all
sub-trees by `ts` bucket — a **time-indexed view** computed from the same keys. D44 `hb` lets the
view show liveness per moment (alive/stale/dead) so a recalled frame is *honest about what was
running*.

```
RECALL("BH.REAL100B.OPENCODE.PID.000000004099")           # one agent's life
  -> prefix-walk (5 hops)  ->  sub-tree of EMIT rows  ->  sorted by seq  ->  bodies by digest
RECALL_AT(T="2026-06-15T12:00:00Z")                        # the whole machine at an instant
  -> time-bucket fold over all sub-trees  ->  every PID with hb=alive at T  ->  the frozen frame
```

> **NEW (index design) over EXISTS (the addressing).** Nothing is "lost" because the EMIT row is
> append-only and content-addressed; "near-instant" holds because recall is *address recomputation
> + dereference*, never a scan. The guardrail from §1.2 keeps this honest: the *index lookup* is
> O(1)-shaped; the *one disk dereference* still costs what the disk costs — but it is one
> dereference, not a million.

---

## 4. The Emitter Trigger: piped flow correlated to real computer activity (NEW)

An **emitter trigger** is the facet's headline visual: pull a PID-prime-agent's piped flow and
overlay it on what the *real computer* was doing. Mechanism:

1. **Trigger fires** for a PID (or PID prefix) at time window `[T0,T1]`. It is a *read* — a
   recall query (§3), never a process launch.
2. **Pipe assembly:** walk the prefix tree → EMIT rows for that PID, ordered by `seq`. Each row's
   `verb`+`kind`+`glyph` is one node of the flow; consecutive rows are the pipe segments.
3. **Activity correlation:** every EMIT row already carries `hw` (D21 hardware fingerprint) and
   `ts` (D20). The machine's *own* hardware emitters — the facet says "ALL hardware emits" — are
   just more EMIT rows with `kind=hardware` (CPU scheduler tick, IO completion, port wake). The
   trigger **joins the agent's EMIT rows to the hardware EMIT rows on `(hw, ts-bucket)`**, so the
   piped agent flow is laid *directly over* the real CPU/IO/port activity at the same instant.
   The join key already exists on both sides — no new instrumentation, just the shared envelope.
4. **Heartbeat lane:** D44 `hb` gives the trigger a liveness ribbon — the flow is drawn solid
   while `alive`, dashed while `recovering`, gapped while `stale/dead`. The 100B run's
   controller/flywheel PIDs (`OMNISPIN`, `OMNIFLY`) become the *spindle/flywheel ribbons* the
   facet's "spinners/spindle system" promised.

```mermaid
flowchart LR
  subgraph TRIG["EMITTER TRIGGER (a recall query, process_launch=0)"]
    Q["RECALL(pid prefix, [T0,T1])"]
  end
  subgraph IDX["TOTAL-RECALL INDEX"]
    PT["prefix tree (PID radix)"]
    CA["content-address store (digest to body)"]
    TF["time fold (ts bucket, D20)"]
  end
  subgraph AGENT["AGENT EMIT ROWS (D16 PID, D2 verb)"]
    A1["EMIT pid=...4099 verb=read  seq=1"]
    A2["EMIT pid=...4099 verb=score seq=2"]
    A3["EMIT pid=...4099 verb=mint  seq=3"]
  end
  subgraph HW["HARDWARE EMIT ROWS (D21 hw, ALL hardware emits)"]
    H1["EMIT kind=hardware hw=cpu sched-tick"]
    H2["EMIT kind=hardware hw=nvme io-complete"]
    H3["EMIT kind=hardware hw=port wake"]
  end
  Q --> PT --> A1 & A2 & A3
  Q --> TF
  A1 -.join on (hw,ts).-> H1
  A2 -.join on (hw,ts).-> H2
  A3 -.join on (hw,ts).-> H3
  A1 --> CA
  A2 --> CA
  A3 --> CA
  TF --> VIEW["PIPED FLOW overlaid on REAL ACTIVITY\n(spindle/flywheel ribbons + heartbeat ribbon)"]
  H1 --> VIEW
  H2 --> VIEW
  H3 --> VIEW
```

> **NEW.** The trigger is a *read*, not a runner. Correlation to real activity is *free* because
> agent rows and hardware rows share the `(hw, ts)` join key in the same envelope. This is the
> "TV inside a simulation of the simulation, with agents watching it" (Dan's madness-interactive
> origin of the omnispindles): the trigger view *is* the TV; it watches frozen emitted rows.

---

## 5. The unique line: prime → prime³ remote call draws a distance no other pair shares (EXISTS edge + NEW edge-row)

The facet's big move: *no prime-point ever connects to another with the same distance as any
other pair → project the fabric onto a REAL graph of REAL points.* The emission layer is what
*records the edge* so F02's pairwise-distinct distances become *plottable*.

**The tower coordinate of a PID (EXISTS, from §1.4 + F01).** A PID maps to a point in the
expanding Brown-Hilbert space by reading its prime-addressed dimensions: D16 prime 53 (PID), D20
prime 71 (TIME), D21 prime 73 (HARDWARE), plus the tower's tier prime. Jesse's separator law
gives three tiers per type — `n·p`, `n·prime·n³`, `n·prime·n⁵` — so:

| Tier | agent class | separator (Jesse's rule) | example coordinate scale |
|---|---|---|---|
| prime-1 | base agents | `n·p` | small |
| prime-real-3-cubed | real free-agent³ | `n·prime·n³` | ×n³ apart |
| prime-real-3-to-5th | HRM/MTP on frozen brain | `n·prime·n⁵` | ×n⁵ apart |

Because each tier multiplies by a *different odd power of n times a distinct prime*, two points
from different tiers live at radically different radii — their separation can never coincide with
an intra-tier separation. That is the geometric reason distances don't collide (F02 proves it
rigorously; I just *consume* it).

**The edge row (NEW emitter type).** When a prime-1 agent remote-calls a prime³ agent, the
caller emits:

```
EMIT|kind=edge|pid=<caller D16 PID>|spawn_chain=<callee D16 PID>
    |verb=remote_call
    |a_coord=<prime-tower coord of caller>      # (D16,D20,D21,tier-prime) -> R^k point
    |b_coord=<prime-tower coord of callee>
    |line_id=<sha16(a_coord:b_coord)>           # the line's identity
    |dist2=<integer squared Euclidean distance, exact, no float>
    |remote_call=1|process_launch=0|json=0
```

Two properties make the line **unique and held-safe**:

1. **Unique:** `dist2` is computed in exact integers from prime-power coordinates. By F02's
   construction (distinct primes, distinct odd powers, Sidon-like spacing), `dist2` is a number
   no other emitted edge can equal. So `line_id` and `dist2` *identify the call uniquely* across
   the whole 1e200 space — you can plot it as a REAL point-pair on a REAL graph, not a drawing.
   The 100B runner already records `spawnedBy`/`spawnChain` (D16 fields) and `controllerPid`,
   so the caller→callee edge data *already exists* in emitted marks; the NEW part is computing
   `dist2` at emit time and stamping it.
2. **Held-safe:** `remote_call=1` is *recorded*, but the row itself does **not** perform the
   call — emission is downstream of the slice-engine gate (`POP_FROM_POOL → PID_SIGNAL →
   AGENT_ROOM`). The cost envelope's `network-provider-router` layer
   (`GATED_VARIABLE_COST`, "external supercomputers are router surfaces not free compute")
   governs whether the actual call is allowed; the EMIT row only *describes* it.

```
        prime-1 caller (tier n·p)                       prime³ callee (tier n·prime·n³)
        coord A = (53^a, 71^t, 73^h, P1)   ── line ──▶  coord B = (53^a', 71^t', 73^h', P3·n³)
                                              |
                       dist2 = ||A − B||²  (exact integer)
                       line_id = sha16(A:B)
                       — no other emitted edge has this dist2 (F02) —
```

> **EXISTS** (caller/callee PIDs + spawnChain in the 100B marks) **+ NEW** (the `kind=edge`
> EMIT row that stamps the exact-integer `dist2` and `line_id` at call time, so the unique line
> is a *recorded, plottable fact*, not a render-time guess).

---

## 6. Full mechanism diagram (ASCII)

```
                    ┌──────────────────────────────────────────────────────────────────┐
                    │   SLICE-ENGINE GATE (LAW-SLICE-ENGINE, CLASS-1 IMMUTABLE)          │
                    │   POP_FROM_POOL → PID_SIGNAL → AGENT_ROOM → RESULT_TO_GULP → ERASE │
                    └───────────────┬──────────────────────────────────────────────────┘
                                    │  every step, every organ stamps:
                                    ▼
   EMITTERS (all share ONE envelope, process_launch=0, json=0, never throw, tamper-evident)
   ┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
   │ catalog      │ agent triad  │ surface      │ hookwall     │ GNN          │ ALL HARDWARE │
   │ emitter      │ (F03 1/2/3)  │ registry     │ gate         │ predictions  │ cpu/io/port  │
   │              │ watcher-emit │              │ heal-emit    │ gnn-emit     │ kind=hardware│
   └──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┘
          │              │              │              │              │              │
          ▼              ▼              ▼              ▼              ▼              ▼
   ┌──────────────────────────────────────────────────────────────────────────────────────┐
   │  EMIT|pid(D16,p=53)|ts(D20,p=71)|seq|hw(D21,p=73)|hb(D44,p=193)|kind|verb|digest|glyph │  ← append-only
   │  edge rows additionally carry: spawn_chain | a_coord | b_coord | dist2 | line_id        │     write-once
   └───────────────────────────────────────┬──────────────────────────────────────────────┘
                                            │  cost honestly metered (pid-emitter-cost-envelope):
                                            │  emit = electricity+cpu (PHYSICAL_COST); NOT free
                                            ▼
   ┌───────────────────────── TOTAL-RECALL INDEX (recall = recompute address, not scan) ─────┐
   │  (a) PID prefix tree  →  walk dotted segments (O(depth≈5)), pull an agent's whole life    │
   │  (b) content-address store  →  digest→path, ONE dereference (disk-speed-independent)      │
   │  (c) time fold (ts bucket)  →  reconstruct the whole machine at any instant T             │
   │  GC: 2000-gulp / 50000-super-gulp compacts bodies into cube summaries; SOURCES PRESERVED  │
   └───────────────────────────────────────┬──────────────────────────────────────────────────┘
                                            │
                                            ▼
   ┌──────────────── EMITTER TRIGGER (a READ query — process_launch=0) ───────────────────────┐
   │  RECALL(pid prefix,[T0,T1])  →  piped flow (spindle/flywheel ribbons + heartbeat ribbon)  │
   │  JOIN agent rows ⋈ hardware rows ON (hw, ts-bucket)  →  flow overlaid on REAL cpu/io/port  │
   │  edge rows  →  unique lines plotted by (a_coord,b_coord) with collision-free dist2 (F02)  │
   │  = "a TV inside a simulation of the simulation, with agents watching it"                  │
   └──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Held-safe gates (what this layer will NOT do)

Carrying the discipline from `pid-emitter-cost-envelope`, `heal-envelope-emitter`,
`watcher-supervisor-suggestion-emitter`, and `LAW-SLICE-ENGINE`:

- **No process launch.** Every EMIT and every trigger is a pure function / read. `process_launch=0`
  on every row. The actual Hermes pool and any remote call stay behind `RUN_HERMES_SPINDLE` and the
  cost-envelope `network-provider-router` gate.
- **No free-compute / no physics claim.** `classifyCostClaim()` rejects "free external compute" and
  "breaks physics." O(1) is *addressing shape*, not total work; one disk dereference still costs the
  disk.
- **No source deletion.** GC compacts *duplicate bodies into cube summaries* and preserves source
  evidence (`gc_source_deletion` is a banned mistake in the 100B MISTAKE_TEMPLATES).
- **Tamper-evident, injection-proof.** Every field through `safe()`; `digest`/`glyph` cover the body;
  `ts` ISO round-trip-validated; emit/recall TOTAL (never throw) — inherited verbatim from the
  heal-emitter's hardened design.
- **Descriptor-first.** EMIT rows are the *frozen slice*. They advance to live surfaces only when the
  engine (registrar/feeder/cosign daemons) cranks them under operator gate. Repo-side rows are
  proposal receipts, per LAW-SLICE-ENGINE §4.

---

## 8. Why it works (the synthesis)

The facet asked for five things; each maps to an existing organ plus one designed connector:

| Facet requirement | EXISTS organ | NEW connector |
|---|---|---|
| Everything emits PID+timestamp | 100B runner marks; heal/watcher/GNN emitters | the unified **EMIT envelope** (§2) |
| Nothing is ever lost | append-only frozen rows (LAW-SLICE-ENGINE) | content-address store keyed by `digest` |
| Near-instant retrieval, disk-independent | `hilbertAddress`, prime-per-D addressing | **recall = recompute address + 1 deref** (§3) |
| Trigger shows piped flow vs real activity | `hw`(D21)+`ts`(D20) on every row; OMNISPIN/OMNIFLY ribbons | the **(hw, ts) join** trigger (§4) |
| prime→prime³ call draws a unique line | spawnChain/spawnedBy in 100B marks; F02 distinctness | **`kind=edge` row stamping exact-integer `dist2`** (§5) |

The deep reason it works: **emission and recall are the same computation run forwards and
backwards.** Emitting stamps `(pid, ts, digest) → glyph = hilbertAddress(...)`. Recalling
recomputes that glyph from a query and dereferences it. There is no asymmetry where you write
fast and read slow — both are address arithmetic over prime-cube coordinates. The disk only ever
bounds a *single* dereference of a content-addressed body, never a search. That is precisely why
"retrieval is near-instant on request, independent of physical disk speed" is a *true* claim and
not an aspiration: the system never searches its own past — it *addresses* it. And because F01's
towers expand by adding primes and F02 guarantees pairwise-distinct distances, the emitted edge
rows project onto a REAL graph of REAL points where every remote call is a uniquely-measured
line — the substrate on which the 1e200 surface can be piped to reveal never-before-seen prime
patterns.

---

## 9. Provenance ledger (EXISTS vs NEW)

**EXISTS (cited, read-only):**
- `C:/Users/acer/Asolaria/tools/neurotech-real-100b-agent-runner.js` — `pidFor`, `digestFor`,
  `controllerPid`, `flywheelPid`, `geniusMark/mistakeMark/proofSample`; emits PID+digest+topology.
- `C:/Users/acer/Asolaria/data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json` —
  `REAL_100B_PID_PACKET_RUN_COMPLETE`, 1e11 packets, `lastPacketPid …100000000000`.
- `C:/asolaria-as-neural-network/tools/behcs/pid-emitter-cost-envelope.mjs` — emitter cost classes,
  `classifyCostClaim`, `process_launch=0|remote_call=0|physics_bypass_claim=0`.
- `C:/asolaria-as-neural-network/tools/behcs/heal-envelope-emitter.mjs` — hardened, tamper-evident,
  total-function HBP emitter (the safety template).
- `C:/asolaria-as-neural-network/tools/behcs/watcher-supervisor-suggestion-emitter.hbp` — watcher→
  supervisor suggestion emitter ("a suggestion is READ, never DONE").
- `C:/asolaria-as-neural-network/tools/behcs/omni-engine-loop.mjs` — the mover; `DEFAULT_MAX_RESIDENT
  =2000` never-explode bound; pure-integer score.
- `C:/Users/acer/Asolaria/tools/hilbert-omni-47D.json` — D16 PID(53), D20 TIME(71), D21 HARDWARE(73),
  D44 HEARTBEAT(193); growth law "each new prime cubed = new dimension."
- `C:/Users/acer/Asolaria/tools/behcs/codex-bridge.js` — `hilbertAddress(key)` glyph addressing.
- `C:/asolaria-as-neural-network/canon/laws/LAW-SLICE-ENGINE.md` — crank cycle; frozen-frame =
  data, action = engine; descriptor-first gate.
- `C:/Users/acer/Asolaria/reports/behcs1024-fabric-revolver-runtime-latest.json` — 8 chambers,
  `process_per_logical_node=false`, `tuple_ranges_are_backend_nodes=true`.
- `C:/asolaria-as-neural-network/docs/LIRIS-PID-EMITTER-COST-ENVELOPE-2026-06-14.hbp` — sealed cost
  canon for the emitter.

**NEW (designed this session, held-safe, descriptor-only):**
- The unified **EMIT envelope** (§2) that every emitter embeds, enabling one trigger to pull all
  event types by PID prefix.
- The **total-recall index** (§3): PID prefix tree + content-address store + time fold; recall as
  address-recomputation so it is disk-speed-independent.
- The **emitter trigger** (§4): a read-only recall query that joins agent EMIT rows to hardware
  EMIT rows on `(hw, ts-bucket)` to overlay piped flow on real machine activity, with
  spindle/flywheel/heartbeat ribbons.
- The **`kind=edge` EMIT row** (§5) that stamps exact-integer `dist2` + `line_id` at remote-call
  time, turning F02's distinctness into a recorded, plottable unique line.

*Nothing in this document launches a process, calls the bus, mints a live PID, or claims free
compute / physics bypass. It is the frozen-slice design; advancement is engine/operator-gated.*
