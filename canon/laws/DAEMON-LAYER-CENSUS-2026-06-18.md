# Asolaria Daemon Layer — Layered Census + Port→Room Reduction (2026-06-18)

Built under the [ANTI-DEFLATION COUNT LAW](ANTI-DEFLATION-COUNT-LAW.md). Source: multi-modal sweep workflow `wziyrbhq9` (6 blind modalities — by-port, by-name, by-launcher, by-scheduled-task, by-python, by-MCP — + a completeness critic) cross-checked against **MEASURED** `netstat -ano` / `Win32_Process` / `Get-ScheduledTask`. Read-only; **E=0** (nothing started, killed, or cranked). Registered as sealed HBP `ACER-DAEMON-SUPERVISOR-REGISTRATION.hbp` (host8-serve intake, commit `15848d6`).

The "daemon layer" = the **long-running / listening process** layer (servers, bus, dispatchers, watchdogs, monitors, reflect-heal loops, MCP stdio servers, scheduled-task runners). It is the concrete materialisation of census **Layer 1 (live-fired E≠0)** — so it must be reported by status, never as one flat "N processes."

## The reduction: a daemon is a host process **bound to a pre-MINTED room**

The key reduction (operator canon, "room 4949 / 4950"): a daemon's **listening port indexes its room directly** in the 10,000-room RoomRotor substrate (`D:/asolaria-micro-kernels-v1`). Port `N` → room `MK-0NNNN-P{prime}`, and **the room's `pid` field IS the canonical 8-byte `host_handle8`** (16-hex). So you do **not** invent a handle for a port-daemon — the substrate already minted it. Port-less loop daemons take an `fnv1a64` name-handle + `room=loop-no-port`.

This is the process-layer reduction: instead of an unbounded OS process table, every daemon collapses to **(8-byte room handle, prime, lane)** — addressable, swap-able (`additive→parity→swap→retire`), and backable on HDD/USB/Drive. The OS PID is the *current tenant*; the room is the *durable address*.

## Layered count (MEASURED 2026-06-18, never one total)

| Status | Count | What | Tag |
|---|---|---|---|
| **LIVE (listener)** | 6 | bus `:4947` PID22092 · dashboard `:4949` PID22800 · dispatcher `:4950` PID4004 · vote-quorum `:4952` PID8384 · cosign `:4953` PID5336 · hyperbehcs `:49257` PID24096 | MEASURED |
| **LIVE (loop, no port)** | 5 | gnn-dispatch-bridge PID1636 · auto-fabric-query PID18868 · **NodeWatchdog keeper PID5960** · self-reflect PID5640 · federation-pulse PID1192 | MEASURED |
| **LIVE (MCP stdio)** | 3 | fabric PID2088 · web PID1952 · google-wiki PID23420 (os-on-metal DARK) | MEASURED |
| **DARK (canon, no live PID/port)** | 74 | gateways, GNN sidecars L0/L1/L4, omnicoder, drains, immune/agent-keyboard, 11 provider-citizen daemons, ~17 reflect-heal loops, launchers | MEASURED-dark |
| **Legacy / exited** | 4 | mqtt-broker (×2), legacy gateway, connectionVaultMonitor (exited) | MEASURED |

**14 LIVE / 74 DARK / 4 legacy = 92 distinct daemon programs.** "Live" is never inflated (a coded `server.js` with no listener and no PID is **DARK**, not live; a `200` could be a stale fallback). "Dark" is never deflated (source verified to exist; it is unpowered, not absent — the empty-city model).

## The keeper-apex (why the spine stays up)

The 4 live spine daemons are kept by **`Start-Asolaria-NodeWatchdog.ps1` (PID 5960)**, a resident `while($true)` respawn loop (scheduled-task *Running*) whose service table matches the live PIDs and the exact running bus path. Registered as **`DAEMON-NODE-WATCHDOG-KEEPER-APEX`** — the seat above the chief: no spine daemon stays dead while it runs. (This, not `revive-dead-daemons.ps1`, explains the current live spine — the critic's attribution correction.)

## Pre-system legacy (operator-confirmed, excluded from canon)

`mqtt-broker` (TCP 18883 / WS 18884 / WSS 18885), `mqtt-sn`, SMB, `sqlite3`, cloudflare/tailscale-type services are **pre-omnimeta, "from before our system"** (operator). Tailscale (`:4782/:4790`) is correctly *not* an Asolaria daemon. These are `PRE-SYSTEM-LEGACY` → `stale-retire`, kept on the map as retire-candidates, never counted as live fabric.

## Eight families → eight family supervisors

`control-plane-spine` · `cosign-quorum` · `gnn` · `mcp-server` · `reflect-heal` · `sister-bus` · `provider-citizen` · `launcher-keeper` (+ `stale-retire`), under `DAEMON-CHIEF-SUPERVISOR` → apex `COL-ASOLARIA`.

## Honest boundary

Read-only throughout; **no secret VALUES read** (cosign/vote-quorum/citizen ed25519/vault/token plaintext = carve-out). Nothing started or killed. The registration records **existence + PID + room + role + family** only — retiring a node daemon stays gated: **Rust serves the room with parity before the node tenant is retired** (`additive→parity→swap→retire`), and the cosign-seal is the `:4953`-daemon + vault op. Two low-rooms noted as operator-canon: `MK-00040` = inter-colony meeting room (Falcon/Acer/Liris; the colony `acer` was formerly mislabeled "asolaria"), `MK-00041` = meta-supervisor-hermes.
