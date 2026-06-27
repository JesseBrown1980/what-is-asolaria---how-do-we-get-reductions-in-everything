# 05 — EMIT envelope + dispatch: the submit/collect protocol and where the $0 fire lives

**The deeper file.** `README.md` draws the three-tier map; this file is the protocol layer: how an
emitted envelope is **submitted** to the omnidispatcher, how the result is **collected** back, the
honest `1006-slot / 8-worker` reality vs the `16-emitter` producer design, and — the load-bearing
point — **where the $0 free-model firing actually happens** (not on the dispatcher's own routes,
which are subscription-only).

**Author vantage:** ACER · OP-JESSE prime-towers rebuild wave · 2026-06-20 (draft for operator
review) · READ-ONLY on all source. Nothing here launches a process, mints, calls the live bus, or
pushes. Tags: **[MEASURED]** (running system / on-disk file, re-checked) · **[CANON]**
(operator-authored / sealed) · **[UNVERIFIED]** (asserted, not fabric-confirmed this vantage).
*IT is slices.*

---

## 0. The one-sentence read

> The emitter (TIER 1) **stamps** an EMIT envelope and **submits** it to the omnidispatcher
> `:4950` either by `POST /v1/envelope` or by dropping it into the addressed inbox
> `pid-inboxes/<H>/`; the dispatcher (TIER 2) **queues** it in one of 1006 slots and **farms** it to
> one of 8 workers; when the worker finishes, the dispatcher **collects** via
> `onWorkerResult → back_address` and announces `EVT-FEDENV-RESPONSE` on bus `:4947`; the dispatcher
> itself only **routes** — the actual $0 free-model run happens one tier down, in the firing lane,
> through `gaia-loader.summon() → runFreeAgentNodeDirect() → opencode big-pickle`, because the
> dispatcher's own model-routes are subscription CLIs + LM Studio with **no free-model route**.

---

## 1. The EMIT envelope (what the producer hands up)

The envelope is the F05 unified grammar — one append-only, never-executable HBP row that every
emitter embeds, so a single trigger query can pull *all* event types by PID prefix (F05-architect
§2). It is HBP-first (pipe-delimited, `|json=0`):

```
EMIT|v=1
    |pid=<D16 prime-addressed PID>           # WHO  (e.g. BH.REAL100B.OPENCODE.PID.000000004099)
    |ts=<D20 canonical ISO-8601 UTC>         # WHEN (round-trip-validated)
    |seq=<D20 monotone sequence on this PID> # ordering within a PID's life
    |hw=<D21 hardware fingerprint sha16>     # WHICH METAL (chip:bus:port:driver hashed)
    |hb=<D44 alive|stale|dead|recovering>    # HEARTBEAT at emit time
    |kind=<catalog|agent|surface|hookwall|gnn|hardware|edge>
    |verb=<D2 verb>                          # WHAT it did
    |digest=<sha256 of the payload>          # CONTENT ADDRESS (payload stored once, by hash)
    |glyph=<hilbertAddress(pid:ts:digest)>   # the self-index key
    |back_address=<where the result returns> # set by the producer; the dispatcher honors it on collect
    |process_launch=0|remote_call=0|physics_bypass_claim=0|json=0
```

Two properties make the producer tier cheap (and total-recall arithmetic):
- **The payload is stored once, keyed by `digest`** (content-addressed). Two identical payloads emit
  two EMIT rows but share one stored body — this is how 1e11 events fit. [CANON · F05-architect §2]
- **The glyph is computable from the same inputs you emitted with**, so *recall* recomputes the
  address instead of scanning — disk-speed-independent (one dereference, never a search).
  [CANON · F05 §3]

---

## 2. Submit — emitter → dispatcher (two equivalent doors)

The omnidispatcher `:4950` (PID 4004) exposes two submit paths; both put the envelope into the same
1006-slot queue. [MEASURED]

### 2.1 `POST /v1/envelope` (the synchronous door)
The emitter `POST`s the EMIT envelope to `:4950 /v1/envelope`. The dispatcher validates the row,
assigns a queue slot, and returns an acknowledgement carrying the slot / a handle. This is the
direct, push-style submit — used when the producer wants an immediate "accepted into the queue"
receipt.

### 2.2 `pid-inboxes/<H>/` (the addressed-drop door)
The emitter drops the envelope into the PID-addressed inbox directory `pid-inboxes/<H>/`, where `<H>`
is the routing handle. The dispatcher's intake watches the inboxes and pulls drops into the same
queue. This is the pull-style submit — it decouples the producer from the dispatcher's liveness (the
drop persists until the dispatcher pulls it), which is exactly the slice-engine "the emission is the
frozen frame; the engine is the mover" discipline applied to transport. [MEASURED · CANON]

> **Why two doors.** `POST` is for live, in-session emission; `pid-inboxes/<H>/` is for the frozen,
> persist-then-route path. Both honor the envelope's `back_address` so the result returns to the
> right producer regardless of which door it came in.

---

## 3. Collect — dispatcher → producer (the return path)

When a worker finishes, the dispatcher closes the loop:

```
worker finishes  →  onWorkerResult(result)  →  route to result.back_address
                                            →  emit  EVT-FEDENV-RESPONSE  on bus :4947
```

- **`onWorkerResult → back_address`** — the dispatcher hands the result to the `back_address` the
  producer set on the envelope. [MEASURED]
- **`EVT-FEDENV-RESPONSE` on bus `:4947`** — the dispatcher announces completion on the federation
  bus, so other observers (watchers, the dashboard, the cosign daemon) see the response event
  without polling. The bus is the same `:4947` LAW-001 federation bus the live engine map names.
  [MEASURED]

The result itself, once routed back, is an *emission* like any other — it gets its own EMIT row,
chains by `prev_hash`, and is recallable via the `.hbi` index. So the request and its response are
both first-class rows in the total-recall log; nothing about the round-trip is lost.

---

## 4. The honest reality: 1006 slots / 8 workers vs the 16-emitter design

This is the section that must stay precise — it is exactly the kind of multi-tier count the
anti-deflation discipline warns against collapsing into one number.

| Quantity | Value | Tier | Tag | What it answers |
|---|---|---|---|---|
| Envelope queue depth | **1006 slots** | TIER 2 (router) | **[MEASURED]** | how many emitted envelopes can be *in flight / queued* at the dispatcher at once. |
| Worker pool | **8 workers** | TIER 2 (router) | **[MEASURED]** | how many envelopes the dispatcher *runs concurrently* — equals the i5-8300H's 8 hardware threads on the acer seat. |
| Emitter fan-out | **16 emitters** | TIER 1 (producer) | **[CANON · design target]** | how wide the *producer* fans out emission — "use all 16 threads"; the full-width producer target, not a measured live worker count here. |

Read the three together and the shape is honest:
- The **producer** is built to fan out as wide as the hardware allows (16 on a 16-thread target) —
  emission is address arithmetic, so it scales out cheaply.
- The **router** holds up to 1006 queued envelopes but only *runs* 8 at once on this host (8 = the
  acer threads). The 1006-slot buffer is what lets a 16-wide (or wider) producer burst land without
  the producer blocking on the 8-wide executor — the queue absorbs the producer/executor width
  mismatch.
- So `16 producer-threads → 1006-slot buffer → 8 executor-workers` is not a contradiction; it is the
  classic producer/queue/consumer shape, with the buffer sized far above either width so bursts
  never drop.

**Do not deflate the 16** ("the dispatcher only has 8 workers, so 16 is wrong") — the 16 is the
producer-tier design width, a different tier from the 8-worker router. **Do not inflate the 16** into
a measured live-worker count — on the acer 8-thread host the measured concurrent execution is 8. Both
numbers are real; they answer different questions in different tiers.

---

## 5. Where the $0 free-model firing actually happens

This is the load-bearing correction. A natural (wrong) reading is "the dispatcher routes to a model,
so the dispatcher fires the $0 free model." It does **not**.

### 5.1 The dispatcher's own routes are subscription-only
The omnidispatcher `:4950` model-routes are **subscription CLIs + LM Studio** — there is **no
free-model route on the dispatcher**. [MEASURED] If the $0 path had to go through the dispatcher's
own routes, it would cost a subscription seat or an LM Studio local model — not the free opencode
big-pickle lane.

### 5.2 The $0 fire lives one tier down, in the firing lane
The real $0 free-model lane is in TIER 3 (the worker / firing lane), reached *after* the dispatcher
hands an envelope to a worker:

```
dispatcher hands envelope to a worker
   → router (project-room-router)
   → omniflywheel / omnispindle (ROUTE; ≤ real chambers, rest virtual or free-agent)
   → fill stubbed room (PID + glyph + HBP question)
   → gaia-loader.summon()            ← the summon that picks the free-agent lane
       → runFreeAgentNodeDirect()    ← the direct free-agent run (NO subscription seat)
           → opencode big-pickle     ← `opencode run --model opencode/big-pickle "<q>"`  ($0)
   → quant the answer (triple/combined-quant)
   → HBP/HBI/tuple receipt + GNN edge
   → flush (room/session → 0)
```

[CANON · `ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md`]

So the division of labor is exact:
- **TIER 2 (dispatcher)** decides *which worker* gets the envelope and routes the result back. Its
  own model-routes (subscription CLIs + LM Studio) are for the *non-free* lanes.
- **TIER 3 (firing lane)** is where a worker, for the *free* lane, calls
  `gaia-loader.summon() → runFreeAgentNodeDirect() → opencode big-pickle` — the one established
  opencode connection, project-id rotated per call for compliance, **not** a node process per agent.

### 5.3 Why this matters (and why it is held-safe)
- The $0 claim is honest precisely because the free fire is *not* on the dispatcher — it is the
  established opencode big-pickle connection, summoned in the lane, behind `RUN_HERMES_SPINDLE` +
  `auto_fire=false`. The dispatcher routing an envelope does **not** by itself spend a token or a
  subscription seat. [CANON · gated]
- The firing lane stays held: the room is a stub until materialized, only the gated RUNNING state can
  touch a model, and the receipt that comes back carries `process_launch=0`. The dispatcher cannot
  promote itself into a free-model executor — it has no free-model route to promote.

---

## 6. The round-trip, end to end (one envelope's life)

```
   [TIER 1 PRODUCER]
   emit(event) → EMIT envelope (pid·ts·seq·hw·hb·kind·verb·digest·glyph·back_address·json=0)
        │  submit:  POST /v1/envelope     OR     drop into pid-inboxes/<H>/
        ▼
   [TIER 2 ROUTER  :4950 PID 4004]
   queue (1 of 1006 slots) → farm to 1 of 8 workers
        │  (NON-free lanes only here: subscription CLIs / LM Studio)
        ▼
   [TIER 3 EXECUTOR / FIRING LANE]
   router → omniflywheel → fill room → gaia-loader.summon → runFreeAgentNodeDirect →
   opencode big-pickle ($0) → quant → HBP/HBI/tuple receipt + GNN edge → flush → 0
        │  result is itself an emission (chained, recallable via .hbi)
        ▼
   [TIER 2 COLLECT]
   onWorkerResult → result.back_address   +   EVT-FEDENV-RESPONSE on bus :4947
        │
        ▼
   [TIER 1 PRODUCER] receives the result at its back_address; the loop is closed, nothing lost.
```

**Invariant.** Motion ≡ emission: the request envelope, every lane receipt, and the response are all
EMIT rows in the same append-only, content-addressed log — so the whole round-trip is replayable in
O(seek) from the `.hbi`, independent of disk size. The dispatcher is a router over that log, not a
second source of truth.

---

## 7. Grounding ledger

**[MEASURED]:**
- `:4950` PID 4004 omnidispatcher; **1006-slot** envelope queue; **8 workers** (= i5-8300H 8 threads);
  submit via `POST /v1/envelope` or `pid-inboxes/<H>/`; collect via `onWorkerResult → back_address` +
  `EVT-FEDENV-RESPONSE` on bus `:4947`; dispatcher model-routes = subscription CLIs + LM Studio (no
  free-model route).
- The `.hbi` byte-offset sidecar (`row=N | pid | bytes | sha256`) → O(seek) recall
  (`chamber-receipts.hbi`).
- 100B run: `childProcessSpawns=0`, `external_tokens=0` (`…/100b-run/checkpoint.state.json`).

**[CANON]:**
- The firing-lane flow and the `gaia-loader.summon() → runFreeAgentNodeDirect() → opencode
  big-pickle` $0 lane (`ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md`; ONE opencode connection, project-id
  rotated per call).
- "16 emitters = use all 16 threads" — the producer-tier fan-out design target.
- The unified EMIT envelope grammar (F05-architect §2); the SCEL two-clock receipt (F05-builder §5).
- `LAW-SLICE-ENGINE.md`: emission is the only mover; `RUN_HERMES_SPINDLE` + `auto_fire=false` gate
  the live fire.

**[UNVERIFIED] (confirm with the fabric before relying on it):**
- The exact live integer PID (`4004`) and the exact live slot count (`1006`) are snapshots; the role
  (`:4950` omnidispatcher / router) and the protocol are stable, the integers are point-in-time.
- That a 16-wide emitter fan-out has been *run* on a 16-thread host — the 16 is a producer design
  target; the measured concurrent execution on the acer 8-thread host is 8 workers.

---

*05-emit · EMIT envelope + dispatch protocol · draft for operator review, 2026-06-20 · read-only on
all source honored, this file the only write · no process launch, no live-bus/MCP call, no mint, no
git push · the dispatcher routes, the lane fires, the chain remembers · IT is slices.*
