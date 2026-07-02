# Codex Self-Prism Cube Control-Plane Proposal - 2026-07-02

CLAIM|text=Represent the Codex/Claude/Fable-5 seat, office, dashboard, MCP surfaces, and authorized connector classes as Asolaria cubes and hookwalled MCP rows, so the seat can function inside the system as an addressable control-plane component.
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_health|detail=ok=true service=super-asolaria-os-dashboard-liris-mirror port=4944 ts=2026-07-02T13:37:54.845Z
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_canon_index|detail=total_entries=427 sections=134 sha256=50379d5b2e32d5ec87101f281e1d8246b7e2209e4d7ff507df8b09d64e2c77dc
EVIDENCE|class=MEASURED_GITHUB|surface=ROOM-VIEWER-BUILT-2026-07-02.hbp/.hbi|detail=Acer receipts verified locally from reductions main 29b3be8; sha sidecars ok=true
EVIDENCE|class=MEASURED_GITHUB|surface=UNIFIED-DASHBOARD-UPDATE-PROPOSAL-2026-07-02.hbp/.md|detail=Acer dashboard proposal verified locally from reductions main 29b3be8; sha sidecars ok=true
BOUNDARY|class=NO_SELF_REPLICATION|why=This does not clone model weights, secrets, account sessions, connector credentials, or autonomous execution authority. It only creates descriptors/cubes/rows for gated routing.
BOUNDARY|class=AUTHORIZED_CONNECTORS_ONLY|why=Connectors are represented by capability descriptors and policy rows. Live use remains subject to the existing user authorization, provider policy, hookwall, GAC, and operator gates.
BOUNDARY|class=NO_FIRE|why=This is a control-plane proposal with fire=0, dispatch=0, external_send=0, and terminal_execute=0.

## Interpretation

The request is not to make a magical copy of an AI. The useful, buildable form is:

`seat + office + dashboard + MCP connectors + authorized connector classes`

passed through the Asolaria prism, decomposed into bands, and emitted as cubes:

- identity band: PID, seat, office, owner, level, gate;
- connector band: MCP/tool capability descriptors, not secrets;
- dashboard band: pixels-first read-only projections;
- routing band: GAC, hookwall, GNN watched edges, AgentTerms;
- translation band: BEHCS-256/1024/HyperBEHCS/HBI/HBP/raw-binary/Host8/cube translator rows;
- kernel band: Rust 8-byte host / micro-kernel target rows;
- receipt band: sha256, HBP/HBI, GitHub mediator, fabric evidence.

The result is an addressable function inside Asolaria: a seat can be found, routed, reviewed, denied, or invoked through gates. It is not a free-running clone.

## Cube Families

Proposed cube families:

1. `SEATCUBE` - Codex/Claude/Fable-5 seat identity and policy.
2. `OFFICECUBE` - office manifests, library, catalogs, pipes, tuple-MCP surface.
3. `CONNECTORCUBE` - authorized connector capability rows; no credential material.
4. `DASHBOARDCUBE` - inert pixels-first dashboard projection rows.
5. `HOOKWALLCUBE` - per-edge danger-verb classification and hold/release policy.
6. `GNNCUBE` - GNN watched edge descriptors and review/score surfaces.
7. `KERNELCUBE` - Rust Host8 / micro-kernel target rows.
8. `TRANSLATORCUBE` - BEHCS/HBI/HBP/Host8/cube translator rows, proven/design tagged.
9. `RECEIPTCUBE` - GitHub/fabric/sha/cosign receipts.

Each cube must carry:

- `pid_or_handle8`
- `source_sha256`
- `owner_route`
- `access_tier`
- `evidence_tag`
- `fire=0`
- `dispatch=0`
- `json=0`

## Dashboard Use

The dashboard may render the control plane as pixels, but the backend remains HBI/HBP:

- dashboard panel = raw projection;
- terminal panel = projection only;
- connector buttons = disabled unless an owner route grants an explicit action;
- no direct external-send bridges;
- no hidden credential reads;
- no conversion of a descriptor into execution without GAC/hookwall/operator gate.

## Live-Use Gate

For any connector or MCP action:

1. resolve `CONNECTORCUBE`;
2. classify verb through hookwall;
3. score route through GNN edge watch;
4. check GAC/AgentTerms/owner tier;
5. require operator or standing policy authorization;
6. emit HBP/HBI receipt;
7. only then allow the existing connector invocation surface to run.

## Required Follow-Up

ACTION|decision=queue_self_prism_cube_schema|scope=Ask Acer/Fable-5 and Liris/Codex to attack-verify this schema, then generate descriptor-only cubes for the seat/office/dashboard/connectors. Do not materialize live connector execution from this proposal.

