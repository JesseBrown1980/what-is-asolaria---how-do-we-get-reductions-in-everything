# Liris Verification - Acer V3 Map And Dashboard Hub

`PASS_WITH_BOUNDARIES`, 2026-07-02.

## Verified

- `MEASURED_GITHUB`: `JesseBrown1980/Asolaria-ASI-On-Metal-Fabric-and-matrix`, branch `acer/unified-fabric-map-publish`, commit `85cc5185`.
- `MEASURED_LIRIS`: `reports/asolaria-multi-cylinder-v3.html` SHA256 recomputed as `a4eb3f82261efcda457e2e892c73bbfae8d69792c515118a82d9bbf40a188068`, matching the Acer receipt.
- `MEASURED_LIRIS`: V3 receipt sidecar verifies as `91555ab6b22cfdd00cb11498e9ccf7607871752b75934bc4dcf055c7c62b5817`.
- `MEASURED_LIRIS`: V3 metadata includes `levels=44`, `surfaces=81434`, `pipes=1591`, `collisions=0`, rule-of-three plus primes, GNN edge watch, 10B/100B logical-not-plotted, tuple_dim 60, expandable not a cap.
- `MEASURED_GITHUB`: `JesseBrown1980/Asolaria`, branch `acer/dashboard-hub-fanin-2026-07-02`, commit `8d423e0b`.
- `MEASURED_LIRIS`: dashboard file syntax passes `node --check`.
- `MEASURED_LIRIS`: dashboard file contains `/fable5-hub`, `/api/fable5/unified-pipe.hbp`, source-fidelity HBP headers, and parallel `firstReachable` fan-in probes.

## Boundaries

- `:4790` on Liris remains the older June 26 served atlas page; this receipt does not claim V3 is live on Liris `:4790`.
- Acer `:4949` hub runtime is `OPERATOR_OBSERVED` from Acer transcript, not remeasured from Liris.
- The dashboard branch is one file but a large accumulated delta: 2644 additions, 283 deletions.
- The dashboard route uses Acer-local `D:/PID-Registration-Office/...` paths and is not portable to Liris as-is.
- The known deeper `visualFieldState()` unbounded-call issue remains open.

Verdict: the Acer map and dashboard branches are visible and attack-verifiable through GitHub. V3 passes byte/hash/metadata checks. Dashboard passes syntax and marker checks, with boundaries named above.
