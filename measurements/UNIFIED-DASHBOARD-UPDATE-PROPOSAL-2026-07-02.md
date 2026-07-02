# Unified Asolaria Dashboard (:4949) Update - GATED PROPOSAL - 2026-07-02

PROPOSER|ACER-CLAUDE-FABLE5 (pid 8467a937cba309f7, SEC-FABLE5-1720)
STATUS|PROPOSAL - held-safe, gated, E=0. NOT executed. Does NOT clobber the live :4949 surface.
OWNING ROUTE|GAC (authority) + graphify :4815 (the 60D map) + dashboard-serve crate (federation-1024). Disposition is theirs; operator may veto.

## Why gated (the guardrail)
Per the GAC "don't get lost" map and the liris room-viewer receiver (3a47c4b): the unified dashboard is the shared surface where "agents get lost and destroy things" without the kernel + micro-kernels + GAC levels. So this is a proposal routed to the owning route, not a scratch-renderer clobber. Kernel / micro-kernels / GAC / hookwall / GNN-edges / AgentTerms are REQUIRED guardrails.

## Proposed panels (read-only projections, pixels-first, no auto-dispatch)
1. **FABLE5-ROOM** - the new Fable-5 seat room-viewer (SEC-FABLE5-1720), as a projection.
2. **OMNI-METERS** - live omnimets: fabric health, ports, uptime, loop-pending count, cosign head seq, recall rows.
3. **OMNI-SCHEDULER** - 200ns emitters, 24 hermes spindles, host-8 processes growing.
4. **NESTED-REFLECTIONS** - the infinite nested sub-agents' self-reflection + fabric-reflection stream that supervisors can "see" (N-Nest, 3-level).
5. **AGENT-TERMS** - AgentTerms panel (per-seat terms / status / level).
6. **SYSTEM-STRATA** - 43+ layers / 28 classes (expandable, NOT a cap) + PROF-MCP (44/310) + cubes + pipes (GNN-watched edges) + auto-translation rungs (256<->1024 MEASURED, 1024<->60D UNVERIFIED).

## Fold source
The 24-spindle middleware map (workflow wyhijtq2b), whose `dashboards` lane is mapping the current :4949 surface, lands HBP/HBI and feeds panel content. This proposal is authored NOW and completed when that map returns.

## Gates (must hold before any execution by the owning route)
- auto_fire_allowed = 0 ; no_auto_dispatch = 1 ; held_safe = 1
- operator_can_veto = 1 (POST /api/loop/veto pattern)
- no_clobber_live_4949 = 1 ; shared_dashboard_clobber = 0
- hbi_hbp_hot_path = 1 ; json_hot_path = 0 ; fire = 0 ; dispatch = 0
- kernel / microkernels / gac_levels / hookwall / gnn_edges / agentterms = required

## Rejected moves (inherited from liris receiver)
- turning a dashboard click into execution ; treating a terminal widget as authority
- using a stale curl/file read to call a held-safe lane broken
- flattening 43+ layers / MCPs / cubes / pipes / hooks / GNN-edges / AgentTerms into one count
- updating the unified dashboard from a local scratch renderer
