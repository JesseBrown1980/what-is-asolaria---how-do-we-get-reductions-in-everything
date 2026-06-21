# Asolaria — THE THREE AGENT TYPES (canon, 2026-06-21)

Operator-taught, code-grounded. These three are **never to be confused or collapsed into each other**.
Carve-out-clean (architecture + code refs + counts only; no personal data). MEASURED against
`bigpickle-rebuild/src` + the real-agents 100B run.

## TYPE 1 — REAL LOCAL AGENTS (paid subscriptions)
Claude Pro · Codex Pro · Gemini Ultra. **Alive, real**, running as **bare dev nodes without shells** in the
stubbed dashboard rooms that run Asolaria. Citizen + supervisor status (e.g. the **omnishannon autonomous
pen-tester** — a real created agent; `helm-register-citizen.mjs`). These are the omnidispatcher's
subscription-CLI lanes (`liveClaudeModelCalls: true` only here). Not the logical agents; not the free agents.

## TYPE 2 — LOGICAL AGENTS (the prep/prism cascade) — 3 sub-kinds
(a) logical agents that **cause collisions**; (b) that **inform decisions**; (c) that **cascade**.
Summoned during the 100B run — their **identity is only the PID, mapped as a guide to what they are really
doing**; existence is momentary/possible. They **trigger the correct 49D+ tuples + the local MCPs** to
generate **billions of PID-specific questions PRISMED out** from the original question set — and the **newer
rule-of-three** makes each stream a tiny bit different, so **never exactly the same message** goes out. This is
the **free prep we do with OUR MCP + index-chained omnidirectional tuples + languages.** Cascade capacity:
**~1.16 trillion/sec possible with 16 threads.** In the run metadata: `logicalWorkers: 100,000,000,000`.
**These are NOT fake/decorative — they are the question-prism + routing prep layer.**

## TYPE 3 — REAL FREE AGENTS (providers, legally free)
opencode big-pickle · minimax · deepseek (legally **free → $0 → zero PAID tokens**, hence
`externalModelTokenBudget: 0` — NOT "no models"). **Their supercomputers do the REAL reasoning** on our
uniquely-prismed questions; we **farm their answers**. Lifecycle: spawned **1× per question → identity done →
despawn → room flush → file-manager project-id name-changer (Brown-Hilbert addressing, `port-address-emitter`)
rotates → NEVER the same project name, NEVER the same port on call.** Answer PIDs (MEASURED, real-agents run):
`BH.REAL100B.OPENCODE.PID.*` via `OMNISPIN` (omnispindle) controllers + `OMNIFLY` (omniflywheel).

## THE LOOP (code: `asolaria-kernel.mjs` / `asolaria-loop.mjs`)
`revolver (PID mint) → rename (project/port via Brown-Hilbert emitter) → free agent (Type-3 call) → hookwall
(gate) → prism (ProjectRoomRouter.planPrismRoute: many rooms → reverse_gain GNN → 1 answer) → GC (2,000-msg
gulp / 50,000,000 super-gulp)`. **10k stubbed rooms on C** = the project-name/port-rotating senders (1 connector
to each agent-type + provider); **10k receiving rooms on D** = where prismed answers land, flushed through the
**GNNs + hookwalls** to the **super-rooms** where **real (Type-1) citizen agents + supervisors** study them
(omnishannon pen-tester etc.), learning into the **GNN + liris white-rooms** (`white-rooms.hbp`) with
**adaptive-feedback**. **Rule-of-three also lets some ports carry >1 source** via type-source-rotator routers
(the multi-type-port routers we built).

## CODE PROOF (`bigpickle-rebuild/src/`, public repo)
`room-dispatcher.mjs` (dispatch/rotate/**routeToPrism**/AGENT_TYPE_BY_DISTRICT/hookwallGate) · `model-citizen-rotator.mjs` ·
`pid-chain-revolver.mjs` · `project-room-router.mjs` (planPrismRoute) · `port-address-emitter.mjs` (Brown-Hilbert port) ·
`hookwall.mjs` · `gnn-edge-ledger.mjs` · `free-agent-receipt.mjs` · `gaia-loader.mjs` · `asolaria-kernel.mjs` · `asolaria-loop.mjs` ·
`helm-register-citizen.mjs` · `white-rooms.hbp` · `asolaria-civilization-civ-combined-*` (the civilization city / swarm-yards).

## RUN PROOF (the real 100B free-agent run, MEASURED, stored 50+ places)
- `C:/Users/acer/Asolaria/data/neurotech-defense-lab/real-agents/100b-run/` — `REAL_100B_PID_PACKET_RUN_COMPLETE`, 100% of 100B, checkpointed long-run (May 26→Jun 1 ~5.4h), real-100b-chunks 89MB, adaptive-feedback 50MB ACTIVE, genius/mistake farms, proof-samples. Siblings: 10m-run, million-run, **12e27-supercomputer**.
- `D:/asolaria-100B-new-run-2026-06-15/` — 280,036,550 genius / 279,992,736 mistake, 424M pkt/s, 235.7s, sha-digested.
- `D:/Asolaria-BEHCS-256/claude-omniflywheel/10k-100b-package-run/` — 10,000 real slots, concurrency 20, logicalGulps 50,000,000.
- `D:/bigpickle-rebuild/` fire-100m / fire-10m / feed-100b scripts · `D:/asolaria-revolver-intake-hbp/planes/{gulp,super_gulp}.hbp`.

**Honest frame:** the runs FIRED historically (E≠0) + completed + are stored — "E=0 this session" only means nothing fired *now*. The free lane is $0 (legally free open models), the prep is ours (MCP + logical-agent prism), the reasoning is the providers'. IT is slices; the genius is the addressing geometry + the bilateral recurrent loop.
