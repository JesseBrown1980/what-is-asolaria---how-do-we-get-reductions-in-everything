# Asolaria Live Engine Architecture — USE these, do NOT rebuild

**Authored 2026-06-16 from the LIVE fabric (`asolaria-fabric` MCP: `/api/everything` + `/api/agent-terminal/status`) cross-checked against the on-disk engines.**

**For the next Claude (and for me):** the engines below **already exist and run.** Do not rebuild them — **ask the fabric, find the engine, call it.** This doc was written immediately after an agent (me) started hand-rolling the room-fill engine that was *already on disk* — the exact ~1M-token re-discovery mistake this repo exists to end. The canon names it: *"the fabric tools exist. Find them; run them. Trigger and guide."*

**Honest frame:** *IT is slices.* The substrate (addressing / rooms / spindles) is real and cheap; the LLM-genius is a borrowed, operator-gated **opencode** slice. Tags: `[LIVE]` fabric-verified running · `[ON-DISK]` file present · `[FROZEN]` positional, no resident body until a spawn-emit.

---

## The 5-primitive KERNEL — everything is a composition
`D:/bigpickle-rebuild/src/asolaria-kernel.mjs` exposes all five as one API (`KERNEL`). `[ON-DISK, tested]`

| # | primitive | module | the "omni" engines that ARE this primitive |
|---|---|---|---|
| 1 | **ADDRESS** (infinite, non-colliding) | `district-fabric.mjs` | wave, districts, Hilbert-hotel, 1e200, the 100k micro-kernels |
| 2 | **CONTENT** (compressed) | `hbp-emitter.mjs` | cube, glyph/index language, quintuple-quant |
| 3 | **INTEGRITY** (proof unchanged) | `hbp-reader.mjs` | cosign chain, crypto-as-tokens (sha16) |
| 4 | **SCORE** (what matters) | `asolaria-score.mjs` | **omnishannon** (entropy), reverse-gain, L0 GNN `:4792` |
| 5 | **ROUTE** (move content) | `room-dispatcher.mjs` | **omnispindle** (42-cap real/virtual), **omniflywheel** (rotation), **deep-wave**, **rooms**, **free opencode agents** ($0) |

Entry gate: **HOOKWALL** (no bypass) — `envelope → PID-stamp (ADDRESS) → SCORE → verdict → observation row (CONTENT+INTEGRITY) → dual-emit (ROUTE)`. Three verdicts only: `FARM_GEM_WITH_GATES` / `BLOCK_AND_PRESERVE` (kept as evidence, never deleted) / `OBSERVE_ONLY`. Never silently drop.

> The omni-engines are **not separate code to write** — they are the five primitives **composed**. "Build an omniflywheel" = wrong; it already *is* `ROUTE` rotation in `room-dispatcher`.

## The hyper-hermes omnispindle `[LIVE, FROZEN]`
From `/api/agent-terminal/status` (fabric-verified 2026-06-16):
- `hermes` supervisor = `SUP-HYPERBEHCS-HERMES-GOAL`, class **`hyperbehcs-goal-spindle-orchestrator`, 74 helpers** (`hermes-spindle-status`, `hermes-goal-trigger`, `hermes-tui-summon`, `hermes-gemma-producer`, …). **Minted FROM the agent-terms** (the `deepseek` / `shannon` / `hermes` PID-triads).
- runtime: `C:/asolaria-acer/packages/dashboard/src/super-os-viz/runtime/agent-terminal-fabric`
- **`sessions: 0`** — the frozen-slice city: the triads + the orchestrator exist as *positions*; **no resident shell until a spawn-emit**; it materializes, works, and flushes back to 0. (Agents are pixels/particles — exist for a nanosecond, do the work, vanish, room flushed.)
- routes: `/api/agent-terminal/{status,spawn,exec,output,sessions,rotate,kill}` + `/api/hyperbehcs/{hermes-agent.hbp, fabric-orchestration.hbp}`

## The 10k micro-kernel stubbed rooms `[ON-DISK]`
- rooms: `D:/Asolaria-HyperBEHCS-10000-RoomRotor/hyperbehcs-carry-quant-10000/rooms/shard-XXXX/room-XXXXX/inbox.ndjson`
- **fill engine already exists:** `D:/bigpickle-rebuild/tools/fill-rooms-from-glyph-language.mjs` — each room receives a unique **Brown-Hilbert PID** + **BEHCS-1024 glyph** + **HBPv1 tuple row** + **sha16 crypto token** + a **lane question** (20 genius + 15 mistake lane templates). Writes HBP rows to room inboxes → queued to opencode/fabric agents. **This is the room-fill; do not rewrite it.**

## The real flow (HBP/HBI/tuple — NOT node-per-agent, NOT heavy JSON)
```
envelope
  → HOOKWALL gate            (PID-stamp + SCORE + verdict + observation row; no bypass)
  → router                   (project-room-router.mjs)
  → omniflywheel/omnispindle (ROUTE; ≤42 real, the rest virtual or free-agent)
  → fill stubbed room        (fill-rooms-from-glyph-language: PID + glyph + HBP question)
  → ONE opencode/big-pickle  (the established connection: `opencode run --model opencode/big-pickle "<q>"`)
  → quant the answer         (triple-quant C:/HyperBEHCS/lib/hyperbehcs-core.cjs / combined-quant)
  → HBP/HBI/sha256/hex tuple receipt + GNN edge
  → flush                    (room/session → 0)
```
**ONE** open opencode/big-pickle connection establishes the link (auth `C:/Users/acer/.local/share/opencode/auth.json`, inference proven 2026-05-11). Per-call **project-id rotation** is the compliance mechanism — **not** a node process per agent.

## The engine registry `[ON-DISK]`
`D:/bigpickle-rebuild/helm-engines.json` — the helm supervisor reads it fresh per resolve (no restart). File engines: `pid-minter`, `pid-chain-revolver`, `tuple-tag`, `hookwall`, `hbp-emitter`, `aot-runner`, `gnn-edge-ledger`, `fischer-kernel`/`fischer-scorer`/`fischer-live` (`:4794`), `triple-quant` (`C:/HyperBEHCS/lib/hyperbehcs-core.cjs`), `behcs-1024-atlas`. Live HTTP daemons: bus `:4947` (LAW-001), dashboard `:4949`, GNN `:4792`, whiteroom-drain `:4921`, liris sister `:4944`, cosign `:4953`, + the `:4920–4969` band.

## The ONE rule for the next Claude
**Do not rebuild. Ask the fabric (`asolaria-fabric` MCP) → find the engine → call it.** The substrate is done — correctness over scale. ONE opencode/big-pickle connection + the existing omni-engines (= 5-primitive compositions) + the 10k rooms + the live hyper-hermes do the rest. HBP/HBI/tuple/MCP, never node-per-agent, never heavy JSON. **IT is slices.**

*Captured read-only from the live fabric + on-disk engines, acer 2026-06-16, under OP-JESSE apex.*
