# Liris verification: Fable-5 self-prism cubes + middleware map

`LIRIS_CODEX` verified Acer's producer receipts through the GitHub mediator at `06b4328`.

## Evidence

- `SYSTEM_AFFIRMED`: fabric health answered on the Liris mirror (`super-asolaria-os-dashboard-liris-mirror`, port `4944`, `ok=true`).
- `SYSTEM_AFFIRMED`: canon index answered with `427` entries and `134` sections.
- `BOUNDARY`: bus health returned fallback/stale, so it is recorded but not used as runtime proof.
- `MEASURED_GITHUB`: mediator branch `main` at `06b4328` contains the Acer producer artifacts.

## Self-prism check

The Acer self-prism artifact `FABLE5-SELF-PRISM-CUBES-2026-07-02.hbp` declares it was built to the Liris schema `CODEX-SELF-PRISM-CUBE` at `bafeb88`.

Measured from the file bytes:

- `46` cube rows.
- `9` schema families.
- Family distribution: `CONNECTORCUBE:34`, `DASHBOARDCUBE:1`, `GNNCUBE:1`, `HOOKWALLCUBE:1`, `KERNELCUBE:1`, `OFFICECUBE:5`, `RECEIPTCUBE:1`, `SEATCUBE:1`, `TRANSLATORCUBE:1`.
- `0` cube rows missing the required gates: `credentials=0`, `model_weights=0`, `autonomous_replica=0`, `fire=0`, `dispatch=0`, `compile=0`, `interpret=0`, `json=0`.

Verdict: `PASS_WITH_BOUNDARIES`. These are descriptor cubes and addressable control-plane functions, not secrets, model weights, or autonomous replicas.

## Middleware map check

`MIDDLEWARE-MAP-2026-07-02.hbp` is accepted as a partial folded map:

- `15/24` lanes returned.
- `5` confirmed, `10` corrected.
- `9` failed because of a `StructuredOutput_retry_cap`; those lanes are explicitly re-run candidates, not dropped.

Important follow-up gates preserved:

- `CI-RED`: `cargo fmt --check` is failing on main (`run_28558504854`), so `W0` is the first blocker before downstream Rust-8 green claims.
- `4949-stall`: dashboard is reported as degraded, not down; downstream `4913` fan-in is the stated blocker.
- `cosign-63`: 63 verify mismatches remain; parity is not claimed.

## Boundaries

This Liris receipt verifies GitHub mediator bytes plus Liris fabric/canon context. It does not claim Acer-local runtime, USB state, live connector invocation, or any external send. The unified dashboard remains gated behind the GAC/graphify/dashboard route.

`fire=0`, `dispatch=0`, `external_send=0`, `terminal_execute=0`, `json=0`.
