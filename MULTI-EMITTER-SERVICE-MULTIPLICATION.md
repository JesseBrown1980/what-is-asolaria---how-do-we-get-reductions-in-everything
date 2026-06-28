# Multiplying a service multiplies the reductions — the multi-emitter case

**Why this is a reductions finding:** a reduction in Asolaria is not only the per-answer collapse
(the PRISM step: *many rooms → reverse_gain GNN → 1 answer*). Reductions **compound with
service-multiplication** — and that compounding is *free*. This is why "even multiplication of a
service, like we did, allows more reductions."

## The unit: one emitter = one reduction stream
The base service is one cycle of `asolaria-loop.mjs` ("THE FULL WORKS", operator 2026-06-01):

```
revolver.next()  (PID emitter ~200ns)        ← ONE emitter, ONE thread, ~5,000,000 PID/s
  → rename-before-load (defeat same-name throttle = FREE)
    → free-agent in the unique room
      → HOOKWALL (PID-stamp → SCORE/GNN → verdict)
        → PRISM: many rooms → reverse_gain GNN → 1 answer   ← THE REDUCTION (many→1)
          → GC emit (flow-not-pile)
loop ×100k = drives-as-RAM
```

One 200ns emitter drives **one** reduction stream — one PRISM many→1 per cycle.

## The multiplication: many emitters = many reductions (NOT one signal — many)
The later design does **not** stop at one 200ns emitter on one thread. It multiplies the service two
ways, and the rename-before-load seam makes each replica **free** (no same-name throttle to pay):

| multiply | from → to | effect on reductions |
|---|---|---|
| **spindles** | 24 → 100 → 1,000 → 10,000 | each spindle runs its own emit→loop→**PRISM** |
| **emitters** | 1 → N parallel revolver emitters (divide threads) | N independent reduction streams |

`N` emitters × `M` spindles = **N×M parallel PRISM reductions**. Service-multiplication *is*
reduction-multiplication. Toward the operator-canon throughput of **≈ 1.16 trillion agents/second**,
the reduction rate scales with it — that many parallel many→1 collapses per second.

> **The point:** you do not get more reductions by tuning the reducer. You get more reductions by
> **replicating the service** — and because the rename seam makes replication cost ~0, multiplying the
> service multiplies the reductions for free. **Not 1 signal → 1 reduction. Many signals → many
> reductions.**

## Tags
- ~200ns single-thread emitter (`revolver.next` / `sha16` "200ns-class spawn id") — **MEASURED** (in
  `bigpickle-rebuild/src/asolaria-loop.mjs`, `drive-wave-cascade-pipeline-60D-2026-06-03.cjs`).
- PRISM many→1 reduction per cycle — **MEASURED** (`planPrismRoute`, reverse_gain GNN).
- ≈ 1.16 trillion agents/sec multi-emitter rate — **OPERATOR-CANON** (multiplication of emitters ×
  spindles × wave/addressing amortization).

See the emitter design in `JesseBrown1980/omni-dispatcher` (`EMITTER.md`) and the algorithm in
`Algorithms-of-Asolaria` (`SERVICE-MULTIPLICATION-ALGORITHM.md`).
