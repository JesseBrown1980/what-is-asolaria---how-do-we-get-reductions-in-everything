# Unified Dashboard Proposal - Fable-5 Room View - 2026-07-02

CLAIM|text=Line up a gated proposal for the unified Asolaria dashboard to include the Fable-5 room view.
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_health|detail=ok=true service=super-asolaria-os-dashboard-liris-mirror port=4944 ts=2026-07-02T13:26:14.175Z
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_canon_index|detail=total_entries=427 sections=134 sha256=50379d5b2e32d5ec87101f281e1d8246b7e2209e4d7ff507df8b09d64e2c77dc
EVIDENCE|class=MEASURED_GITHUB|surface=Asolaria-gac-working/MAP.md|detail=sha=a126b8efa3ff3951d835ec165db26e8fd784194d; route_owner=GAC hierarchy / do-not-get-lost map
EVIDENCE|class=MEASURED_GITHUB|surface=NOT-WEDGED-SYSTEM-RULE-and-explanation-Asolaria|detail=main=20bb26e7b35e74e5092ba16271fcae18b35269a4; rule=held-safe input lanes are not broken
EVIDENCE|class=MEASURED_GITHUB|surface=FABLE5-ROOM-VIEWER-RECEIVER-2026-07-02.hbi|detail=receiver_sha=8b9e99f15d5a4235099016b0ba866a1440328a6e; reductions_main=3a47c4bb96ca45ad650b59a02d4bf15ac4e8439e
EVIDENCE|class=OPERATOR_OBSERVED|surface=acer/claude room-viewer transcript|detail=ROOM-VIEWER-BUILT-2026-07-02.hbp/.hbi created in Acer Fable-5 office sector; built_to=liris receiver 3a47c4b; local path D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/room-viewer.html
BOUNDARY|class=VANTAGE|why=This Liris/Codex seat has not measured Acer's D:/ office sector or room-viewer file. Treat Acer build output as OPERATOR_OBSERVED until published through GitHub/fabric/receipt.
BOUNDARY|class=PROPOSAL_ONLY|why=This artifact does not edit :4949, served HTML, graphify maps, dashboard source, or live process state.

## Proposed Dashboard Cell

Add a read-only unified-dashboard panel named:

`FABLE-5 ROOM - SEC-FABLE5-1720`

Panel role:

- render the Fable-5 room as an inert, human-viewable projection of raw HBI/HBP rows;
- show the terminal pane as projection-only, not a shell authority;
- link to source receipts, not embed secrets or live command bridges;
- display the guardrail stack so agents do not get lost: kernel, micro-kernels, GAC levels, hookwall, GNN edge-watch, AgentTerms;
- show `43+ expandable, not a cap`;
- show `fire=0`, `dispatch=0`, `terminal_execute=0`, `frontend=raw_projection_inert`.

## Required Source Receipts Before Merge

The owning dashboard route should require:

1. `FABLE5-ROOM-VIEWER-RECEIVER-2026-07-02.hbi/.hbp/.md` from reductions main.
2. Acer-published `ROOM-VIEWER-BUILT-2026-07-02.hbi/.hbp` with sha sidecars.
3. GAC acceptance row naming the dashboard lane and access tier.
4. Graphify/dashboard owner acknowledgement that the panel is read-only and does not alter maps.
5. Optional screenshot or pixel receipt, tagged as projection only.

## Hard Gates

- `read_only=1`
- `execute=0`
- `terminal_execute=0`
- `fire=0`
- `dispatch=0`
- `external_send=0`
- `secrets=0`
- `pii=0`
- `json_hot_path=0`
- `hbi_hbp_hot_path=1`
- `held_safe_not_broken=1`
- `levels=43_plus_expandable_not_cap`
- `dashboard_mutation_requires_owner_route=1`

## Rejected Update Shapes

- Direct edit to live `:4949` or served dashboard files from this Liris receiver.
- Any panel button that can execute, dispatch, fire, or remote-control.
- Any iframe/file link that exposes Acer-local private path content as if it were public.
- Any claim that the panel proves live Host8/micro-kernel materialization.
- Any JSON-only dashboard feed as the canonical path.
- Any flattening of GAC levels, MCPs, cubes, pipes, hooks, GNN edges, AgentTerms, OMDS/omnimets, or nested agents into one count.

## Owner Route

ACTION|decision=queue_gated_dashboard_proposal|scope=GAC -> graphify -> dashboard owner route; accept only after Acer publishes source HBI/HBP receipts and owner route verifies read-only projection semantics.

