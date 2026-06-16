# 100B Run — NEW Full-Speed Substrate Run (2026-06-16)

**Verified on disk 2026-06-16 · acer · held-safe. Companion to [`100B-RUN-VERIFIED-PROOF.md`](100B-RUN-VERIFIED-PROOF.md) (the older EEG run).**

A **new** 100-billion PID-packet run — distinct from the May EEG run — fired **full-speed** against a new capability-per-token question set, to measure the substrate at its real (unpaced) rate.

## Verified result (`checkpoint.state.json`, on disk)

```
status:             NEW_100B_PID_PACKET_RUN_COMPLETE
processedPackets:   100,000,000,000        (= target exactly)
completedChunks:    100,000
geniusHits:         280,036,550   (0.28%)
mistakeHits:        279,992,736   (0.28%)
elapsedSec:         235.7         (= 3.93 minutes)
packetsPerSec:      424,251,128   (~424 M/sec)
childProcessSpawns: 0 · externalModelTokens: 0 · network: 0
chunkDigest:   73f5a061…    geniusDigest: 872e70e7…    mistakeDigest: 634effaf…
questionSet:   S1–S6         lastPacketPid: BH.NEW100B.PID.100000000000
```

Path: `D:/asolaria-100B-new-run-2026-06-15/` → `checkpoint.state.json` · `new-100b-chunks.ndjson` (19.3 MB) · `genius-farm-latest.ndjson` · `mistake-farm-latest.ndjson` · `gnn-summary-latest.json`.

## Old vs new

| | OLD (EEG, daemon `1779807628981`) | NEW (full-speed, this run) |
|---|---|---|
| packets | 100,000,000,000 | 100,000,000,000 |
| wall-clock | ~5.84 h | **3.93 min** |
| rate | ~4.75 M/sec (1 s/tranche **pacing**) | **~424 M/sec** (no pacing) |
| forks | 0 | 0 |
| question | EEG / neurointerfacing | S1–S6 (capability-per-token) |

The ~89× speedup is honest: the old run's 5.84 h was dominated by a deliberate **1-second-per-tranche pace, not compute.** Full-speed substrate is ~424 M packets/sec on one commodity box, zero forks.

## Honest boundary (held)

This is the **PID-packet SUBSTRATE harvest** — 100 B real inner-loop emissions with deterministic score-threshold genius/mistake marks. It is **not** the LLM-genius layer: the actual multi-step reasoning comes from the separate **opencode free-agent fanout** (lawful subscription slices), which this run does **not** fire. The 280 M genius marks are a **substrate tally** to be quanted into cubes + reviewed — *not* 280 M materialized insights.

*Examined read-only on acer 2026-06-16 under OP-JESSE apex. **IT is slices.***
