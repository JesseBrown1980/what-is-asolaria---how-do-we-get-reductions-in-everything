# Asolaria — algorithm COMPOSABILITY ENGINE (the 100B system-improvement loop, micro-proven, E=0)

Built to answer the operator's step-back question — *is the system ready for a 100B real free-agent run aimed at
improving ITSELF, and are all the algorithms combinable?* The readiness audit said **NOT-READY** because four pieces were
missing: a system-fitness objective, a run→system-change applicator, a composable formula corpus, and a traversable map.
**This directory builds and proves all four, at micro + full-resolvable scale. E=0 — nothing is fired; the live 100B run
stays held at the operator+quorum+parity gate.**

## The four pieces (`clib.cjs`)
- **Closed type vocabulary** — `pid, glyph, sector, lane, bh_index, coord, vector, sketch, hash, bytes, prime, scalar, name, set`. A contract may use ONLY these.
- **Objective / system-fitness** — `metric()`: `coverage` = typed rows / corpus rows; `composable_pairs` = directed (A→B) where an output type of A is an input type of B. (Replaces the synthetic LCG genius-hit tautology the audit flagged.)
- **Applicator** — `applyProposal()`: validate against the vocab → apply to an **isolated** registry copy → re-measure → **promote ONLY on improvement**. This is the run→system-change bridge (LAW-037 named it; it was never mechanized — now it is).
- **Typed corpus** — `parseCorpus()` + `resolveBody()` materialize the real DISTRICT-F formulas (876 `FORMULA` rows; `WHERE=file:line` → actual source).

## Proven (MEASURED, E=0)
| stage | scope | result |
|---|---|---|
| `selftest.cjs` | — | **13/13** |
| micro-pilot | 24 seeds | **+20 typed / +76 composable pairs** |
| full-resolvable corpus | 303 formulas w/ real bodies | **+289 typed / +17,173 composable pairs**, coverage **0 → 0.330**, 17,184 len-3 chains |

The loop: real reasoning agents read each materialized body → propose a typed I/O contract → an independent agent
cross-checks → `applyProposal` verifies + promotes on improvement → **UNSIGNED proposal** (`typed-registry-proposal.json`).
Real composition chains emerge, e.g. `glyph-genesis 8-glyph host` —[glyph]→ `BEHCS-1024 subset-embedding` —[glyph]→ `mintPID`.

## Run
```bash
node verify-proposal.cjs                # public artifact check: no Acer corpus required
node selftest.cjs                       # Acer corpus replay: requires ASOLARIA_FORMULA_CORPUS or Acer D:/ path
node apply-harness.cjs contracts-full.json   # Acer full replay: requires contracts-full.json + corpus path
```

`selftest.cjs` and `apply-harness.cjs` replay the Acer-side source-body extraction and therefore require the WAVE2
formula corpus (`ASOLARIA_FORMULA_CORPUS`, defaulting to Acer's `D:/PID-Registration-Office/...`) plus the full contracts
file for the harness replay. The public PR ships the UNSIGNED proposal artifact, so cross-seat reviewers without the Acer
corpus should run `verify-proposal.cjs` first. It validates the closed vocab, arity, dependency references, recomputed
pair count, duplicate accepted PID count, and LF-normalized SHA prefix recorded in the manifest/envelope.

## Files
- `clib.cjs` — the engine (vocab + parse + resolveBody + metric + applyProposal).
- `selftest.cjs` — deterministic 13/13 proof.
- `apply-harness.cjs` — applies verified contracts, measures before/after, builds the composition graph, writes the proposal.
- `typed-registry-proposal.json` — the UNSIGNED system-change proposal (289 typed rows, 17,173 pairs).
- `ASOLARIA-100B-SYSTEM-IMPROVEMENT-RUN-MANIFEST.md` — the staged 100B run config + the honest firing-gate checklist.
- `ASOLARIA-100B-PREP-ENVELOPE.hbp` — the staged op-envelope (references cosign seq3572 LAW_RATIFIED_QUINTET; UNSIGNED).

## Gates (honest)
E=0 throughout. Authority is ratified (cosign seq3572, window→2027-06-20). The live 100B fire is **held by design**:
`auto_fire_allowed=false` on all loop envelopes ("high-risk mutation/execution stays held"), `:4952` per-batch quorum
required (acer cannot self-authorize), parity (`:5088`) + EXEC-FREEZE-GATE-APEX. acer preps + stages to that line and does
not cross it. The proposal is a PROPOSAL — merging it into the live registry is a separate gated decision.

**Bilateral:** liris invited to attack-verify — run `verify-proposal.cjs` from the public PR, and run `selftest.cjs` /
`apply-harness.cjs` only when the Acer WAVE2 corpus + full contracts file are present. Keep Acer-measured source-body
replay separate from Liris-public proposal verification.
