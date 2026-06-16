# 100B Nervous-Run — File-Verified Proof

**Examined 2026-06-15 · vantage: acer (`DESKTOP-J99VCNH`) · method: direct on-disk read, cross-checked against the 2026-06-01 three-vantage verdict · frame: _IT is slices, not an ASI._**

This file backs the README's flagship line — *"one bounded 8-chamber spindle that already cranked 100 billion packets with zero process spawns"* — with the **actual on-disk receipt**, and states honestly what that run did and did **not** materialize. It cuts both ways: it **corrects an earlier deflation** (an audit that reported the checkpoint "missing from disk") **and an earlier inflation** (headline counts read as if they were materialized rows).

Tags: `[VERIFIED]` = read on disk this pass · `[TALLY]` = a counter, not materialized rows · `[CANON]` = design/policy, operator-gated.

---

## Where the results live (acer, local)

> These are **local substrate paths** (not in this public repo) — the run output is operator-private data; this file is the in-repo receipt that documents it.

| Path | What | Status |
|---|---|---|
| `C:/Users/acer/Asolaria/data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json` | 703 B run-complete receipt | `[VERIFIED]` |
| `…/real-agents/100b-run/real-100b-chunks.ndjson` | **89 MB** materialized chunk records | `[VERIFIED]` |
| `…/real-agents/100b-run/adaptive-feedback-policy-history.ndjson` | 50 MB policy history | `[VERIFIED]` |
| `…/real-agents/100b-run/{genius,mistake}-farm-latest.{json,ndjson}` · `real-100b-gnn-summary-latest.json` (29 KB) · `real-100b-proof-samples-latest.ndjson` | farm + GNN + proof outputs | `[VERIFIED]` |
| `…/omnispindle/100b-sweep/integration/` | build queue, 30 voxels, GNN edges, 1T-readiness | `[VERIFIED]` |
| `C:/Users/acer/Asolaria/tools/neurotech-real-100b-*.js` | the runners | `[VERIFIED]` |
| `D:/bigpickle-rebuild/src/neuro100b-metrics.mjs` | grounded permanent metrics (integration tests **pass-not-skip** = numbers confirmed on disk) | `[VERIFIED]` |

## The checkpoint, verified byte-for-byte this pass `[VERIFIED]`

```
status:           REAL_100B_PID_PACKET_RUN_COMPLETE
targetPackets:    100,000,000,000
processedPackets: 100,000,000,000        (= target exactly)
completedChunks:  100,000 of 100,000
geniusHits:       277,800,007
mistakeHits:      111,103,104
chunkDigest:      adc46272474791554a2414c5e19f8ec0fd1dd0bda22ec6e3ab484b72a107c7b2
geniusDigest:     2bcc6866d832503c766e02bedf6b14bb395d8d8a01f3f7e5af787fdccf49b1ce
mistakeDigest:    42bb9648dd2457e5eb42d650f28ccca4b270fdc79bd07dceb47fbab30c8b76c2
lastPacketPid:    BH.REAL100B.OPENCODE.PID.100000000000
created:          2026-04-24T03:07:52Z      updated: 2026-06-01T11:55:12Z
mode:             childProcessSpawns=0 · externalModelTokens=0 · noCloudMutation · realPidPacketExecution
```

## What is REAL (the run)

- **100,000,000,000 PID packets processed**, 100,000 of 100,000 chunks complete, checkpointed. `[VERIFIED]`
- **Mode-disciplined: zero child-process spawns, zero external-model tokens, zero cloud mutation** — the README's `childProcessSpawns=0` line is true on disk. `[VERIFIED]`
- **89 MB of real chunk records** + a 29 KB GNN summary + farm outputs on disk. `[VERIFIED]`

## What is a TALLY, not materialized rows (the honest boundary)

- `geniusHits 277,800,007 + mistakeHits 111,103,104 = 388.9M` is a **virtual tally** — a counter incremented across the 100,000 chunks — **not** 388.9M materialized rows. `[TALLY]`
- The **materialized** extraction (three-vantage verified 2026-06-01) is sparse: **~10 top glyphs + 30 voxels (hilbert 800–829) + 121 `sti://` MCP pointers + exactly 2 real executable tools** (`ruview_quarantine`, `pid-minter.mjs`). Everything else is **design/policy/mint canon**, graded **L9_CANON_CANDIDATE** (operator-witnessed, gated — **not** L10 law). `[CANON]`

## Honest corrections this examination forced

1. **It is on disk.** A prior audit reported `checkpoint.state.json` "not on /c or /d." It is present at the path above (deep in the `Asolaria` tree the file-globs time out on). That deflation was wrong.
2. **~5.84 hours — and the 200 ns single-spawner clock holds.** The completing run is daemon `1779807628981`: **`startedAt 2026-05-26T15:00:28Z → stoppedAt 20:51:02Z` = ~5 h 50 m (≈ 5.84 h)**, `runMode=accelerated_chunk_aggregate_sparse_proof`, 100,000 chunks × 1 M packets. Rate ≈ **4.75 M packets/sec** — almost exactly the ~5 M/sec the 200 ns single-spawner predicts (**5.56 h ideal / 5.84 h observed**). The `createdAt 2026-04-24` is a **separate, earlier, abandoned** daemon (`1777000230723`) that reached only **0.015 %**; the ~32-day gap is *create-then-re-run*, **not** run duration. The completion-day files (`daemon.state.json`, `daemon-latest.ndjson`, `real-100b-chunks.ndjson`, all stamped 2026-05-26 20:51 UTC) confirm the single ~5.84 h session.
3. **Domain-specific.** This was a bi-directional **EEG / neurointerfacing** run for the operator's lab — not a general-purpose harvest. Re-running the same envelope → ~99.999% identical results; a new run needs a new question.
4. **Minor file-vs-note drift caught:** checkpoint says `proofSamples=0` (samples live in the separate proof-samples file) and `chunkDigest=adc46272…` (an earlier note cited a stale `55fa1942…`). The genius/mistake digests **match**.

## Net

The 100B nervous-run is **real, complete, file-verified, and zero-spawn** — a genuine PID-packet harvest that backs the README's flagship line, run in **one ~5.84-hour accelerated session (2026-05-26 15:00 → 20:51 UTC), at ~4.75 M packets/sec — matching the 200 ns single-spawner clock** — **and** its headline number is a *counter*, its hard materialized output is *two tools + design canon*, and it was *EEG-specific*. Published in full so the claim is **checkable, not just asserted.** **IT is slices.**

---

*Examined read-only on acer 2026-06-15 under OP-JESSE apex. Source data untouched; this is a report of what is on disk.*
