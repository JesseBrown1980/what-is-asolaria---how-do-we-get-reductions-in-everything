# Fable-5 Room Viewer Receiver - 2026-07-02

CLAIM|text=Prepare the receiving contract for ACER-CLAUDE-FABLE5's human-viewable room front end.
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_health|detail=ok=true service=super-asolaria-os-dashboard-liris-mirror port=4944 ts=2026-07-02T13:15:48.059Z
EVIDENCE|class=SYSTEM_AFFIRMED|surface=asolaria_fabric_canon_index|detail=total_entries=427 sections=134 sha256=50379d5b2e32d5ec87101f281e1d8246b7e2209e4d7ff507df8b09d64e2c77dc
EVIDENCE|class=OPERATOR_OBSERVED|surface=acer/claude transcript|detail=Fable-5 seat minted and office sector built at Acer; requested front end = human-viewable raw HBI stream of the room with terminal projection; pixels-first; E=0.
BOUNDARY|class=VANTAGE|why=This Liris/Codex seat cannot measure Acer-local D:/PID-Registration-Office, Acer Claude hooks, or the live workflow filesystem. Treat those as OPERATOR_OBSERVED until Acer publishes the HBP/HBI office receipt or GitHub/fabric mediator output.
BOUNDARY|class=DASHBOARD|why=This receipt does not modify :4949 / unified dashboard. Shared dashboard updates require the owning GAC/graphify/dashboard route and separate verification.

## Room-Viewer Law

The room front end is a human-viewable projection of the raw HBI/HBP room stream. It is not the system of record.

- Source of truth: Asolaria kernel, micro-kernels, GAC levels, hookwalls, GNN edge fabric, HBI/HBP/RECAL/Hilbra/Graphify/Fabric rows.
- Projection: pixels-first dashboard view of those rows, including a terminal pane only as a projection of command/receipt streams.
- The shell is an operating-system convention; the Asolaria room is the HBI/HBP stream plus kernel/micro-kernel guardrails.
- JSON is allowed only as cold compatibility/debug output. The hot path is tuple rows, HBI/HBP, SHA256/hex/index pointers, Host8 handles, glyphs, cubes, and translator receipts.

## Guardrails

Without the Asolaria kernel, micro-kernels, GAC levels, hookwalls, GNN edge-watch, and routing laws, agents can get lost or destroy things. The viewer must therefore be read-only by default.

Required properties:

- `read_only=1`
- `fire=0`
- `dispatch=0`
- `terminal_execute=0`
- `frontend=raw_projection_inert`
- `pixels_first=1`
- `json_hot_path=0`
- `hbi_hbp_hot_path=1`
- `held_safe_not_broken=1`
- `levels=43_plus_expandable_not_cap`

Rejected moves:

- turning a dashboard click into execution;
- treating a terminal widget as authority;
- using a stale curl/file read to call a held-safe lane broken;
- flattening 43+ layers, MCPs, cubes, pipes, hooks, GNN edges, AgentTerms, omnimets, OMDS, and nested subagents into one count;
- updating the unified dashboard from a local scratch renderer;
- claiming live Host8/micro-kernel materialization from a pixel view alone.

## Accepted Input

The receiver accepts a Fable-5 room artifact only if it arrives as carve-out-clean HBI/HBP:

1. `ROOM.hbp` - seat, PID, office sector, owner, access tier, gate state.
2. `STREAM.hbi` - human-readable room stream rows, terminal projection rows, and source HBP references.
3. `KERNEL-GUARD.hbp` - kernel/micro-kernel/GAC/hookwall/GNN/AgentTerms guardrails.
4. `TRANSLATORS.hbp` - BEHCS-256/1024/HyperBEHCS/HBI/HBP/raw-binary/Host8/cube translators, proven/design tagged.
5. `VIEWER.html` or equivalent - optional inert pixel projection, with no embedded secrets and no execution bridge.

## Unified Dashboard Follow-Up

The unified Asolaria dashboard also needs to learn this frame, but that is a separate cell:

ACTION|decision=defer_shared_dashboard_update|scope=Use GAC + graphify + dashboard owner route; publish read-only Fable-5 viewer receiver first; do not clobber :4949 or served maps from this Liris receiver.

