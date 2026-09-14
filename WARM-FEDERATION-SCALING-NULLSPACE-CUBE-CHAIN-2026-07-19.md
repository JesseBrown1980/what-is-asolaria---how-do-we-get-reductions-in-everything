# Warm Federation Scaling, Nullspace Watchers, and Stacked-Cube Transfer

**Date:** 2026-07-19  
**Status:** `MEASURED_OPERATOR_BENCH` for the reported runs; `PENDING_INDEPENDENT_REPLAY` for a third-seat rerun.  
**Scope:** Fixed 2 MB disjoint warm material, cold versus warm targets across three decades, free-beam nullspace comparison, and a stacked-cube level chain.

## 1. Three-decade cold-versus-warm scaling

| Target | Cold | Warm | Reported transfer gain | Cold / warm |
|---:|---:|---:|---:|---:|
| 100 KB | 0.0785 | 0.0107 | 86.3% | 7.34x |
| 1 MB | 0.0232 | 0.0110 | 52.9% | 2.11x |
| 10 MB | 0.0117 | 0.0101 | 13.2% | 1.16x |

The warm line remains near a fixed floor:

```text
0.0107 -> 0.0110 -> 0.0101
```

The cold line approaches it:

```text
0.0785 -> 0.0232 -> 0.0117
```

### Scaling law

> A fixed warm federation prior has the greatest transfer value on small target objects. As a cold target grows, it trains its own prior during the object and approaches the warm operating floor.

This locates the federation advantage in the workload Asolaria actually carries:

- many small agent messages;
- room transitions;
- receipts and HBP rows;
- short tool outputs;
- mistake/genius events;
- GULPs and catalog updates.

The architecture is not optimized only for a single giant cold corpus. It compounds memory across a civilization of repeated small transactions.

## 2. OOM repair and bounded materialization

The original 10 MB attempt built a `256 x 10,000,000` majority count matrix and was OOM-killed under a roughly 3 GB container limit.

Chunked exact fusion changed the resident memory law from:

```text
O(256 * object_size)
```

to:

```text
O(256 * chunk_size)
```

The third-decade point then completed.

This is an architectural result in its own right:

> Processable and addressable scale may grow while the active window remains bounded.

The independent replay should preserve:

- chunk size and counter dtype;
- output SHA parity against the old implementation at 100 KB and 1 MB;
- peak RSS;
- wall time;
- exact target and warm-corpus hashes;
- multiple seeds and paired confidence intervals.

## 3. Nullspace-targeted lensing

Measured result:

```text
targeted beams = 56
random beams   = 56
```

In the free finite-field beam model, a random vector is almost always outside the current row space while nullity remains. Random therefore closes approximately one missing dimension per beam, already reaching the single-beam maximum.

### Correct law

> Nullspace targeting is neutral in the free-beam limit. Its value emerges when watcher vantages are constrained and spawning them has cost.

The real scheduler should choose the watcher with the highest expected blind-space information gain per unit of:

- latency;
- money or token cost;
- CPU/GPU/storage pressure;
- transport availability;
- authorization burden;
- overlap with existing watchers.

## 4. Stacked-cube level chain

| Level | Score |
|---:|---:|
| L1 | 0.0330 |
| L2 | 0.2224 |
| L3 | 0.0529 |
| L4 | 0.0341 |

The improvised fold:

```text
(ctx * 3 + cube % 3)
```

scrambled context, producing a large L2 shock. Levels 3 and 4 adapted and recovered close to the L1 score.

### What this proves

- level output can feed the next level;
- the transferred cube changes downstream behavior;
- bad semantic folding causes immediate measurable harm;
- recurrence can heal after a damaged transfer.

### What it does not yet prove

It does not yet prove that the production cube fold preserves meaning. That requires actual catalogs, glyph identities, GNN edges, relation IDs, and recovery/reprojection.

The production comparison should include:

```text
identity/no-fold control
random-fold control
known lossy mash
actual catalog/glyph/GNN-edge fold
```

The primary metric is the immediate L1->L2 transfer shock, because later levels may relearn and hide the damage.

## 5. Unified result

The three measurements define one federation law:

> Federation scales when it carries a stable prior for repeated small objects, spends scarce watchers on genuinely unseen structure, and preserves semantic coordinates when passing cubes between levels.

Tags:

```text
scaling=MEASURED_OPERATOR_BENCH
nullspace=MEASURED_OPERATOR_BENCH
cube_chain=MEASURED_OPERATOR_BENCH
third_seat=PENDING_INDEPENDENT_REPLAY
production_fold=PENDING_CATALOG_PRESERVING_TEST
```
