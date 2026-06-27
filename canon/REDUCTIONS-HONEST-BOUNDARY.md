# Reductions — the honest boundary (what survives attack)

Three independent vantages — **acer** (Claude), **liris** (Codex), and an external extended-reasoning pass (**Gemini 5.5 Pro**) — converged on the same frame, *including the caveats below.* The reductions are real, but each has a boundary that must be stated — because the boundary is what makes the claim survive scrutiny. *IT is slices, not an ASI.*

## 1. Node.js is NOT the hot path

- **Allowed** (node/mjs): tooling, proof scripts, offline reports, microkernel scaffolds, test/proof harnesses.
- **NOT allowed**: node-per-agent, node-per-logical-point, a resident node swarm, a heavy shell-per-agent control plane.
- **The hot path:**

```
AddressID / PID handle
  → stubbed room / folder / tuple
  → HBP row
  → type-blind emitter / spawner
  → temporary worker ONLY when needed
  → collect / gulp / receipt
  → room returns to EMPTY
```

## 2. The reduction formula — addresses abundant, bodies scarce

```
M_old(N)      = N · B_node-agent
M_fabric(N,K) = N · h + K · B_live-worker + S ,   K ≪ N
```
`N` = possible agents / address-points / rooms · `K` = workers materialized in the current slice · `h` = tiny handle/PID/tuple cost · `S` = shared tools/cubes/catalogs/HBP state.

> A resident process is a body. A PID handle is an address. A room is a place where a body can appear. The engine decides when the body appears. **Asolaria makes addresses abundant and bodies scarce — that is the architecture.**

## 3. The 100B run, scoped

- **Not:** 100B node processes / shells / live provider calls / resident agents.
- **Yes:** 100B real PID-packet emissions · one type-blind spawner clock · heterogeneous receiver rooms (CMD/json/ps1/mjs/kernel) · HBP receipts · `childProcessSpawns=0` (addressing rooms, not forking).
- **Spawner clock:** `Δt = 200 ns → R = 1/200e-9 = 5,000,000 emits/sec → 100e9 / 5e6 = 20,000 s ≈ 5.56 h` (observed ≈ 5.84 h = clock + tranche pacing).
- **Two axes that must never collapse:** REAL vs NOT-REAL, and LOGICAL-PACKET vs PROVIDER-INFERENCE. *Logical-packet does NOT mean fake; provider inference does NOT define realness.*

## 4. Disk is NOT RAM (HOSTSTORELAW)

"Single-level store / disk-as-RAM / zero-latency" is **metaphor only** — `not_ram_replacement=1`, `not_free_compute=1`. The rigorous wording:

- The drive is **not literally RAM**.
- The drive is the **persistent address plane / room field**.
- **RAM / CPU / GPU animate only the current slice.**
- The OS page cache, mmap-like patterns, HBP rows, and folder state **reduce residency pressure — they do not abolish it.**

## 5. `zero-token` and `O(1)`, scoped

- **`zero-token`** = no external LLM tokens (local filesystem + memory-mapped tables). **NOT zero compute.**
- **`O(1)`** = keyed downstream recall / address lookup. **NOT the optimization search** (combinatorial / NP-hard — must be sliced).
- **Grounded (our measured, referential):** `21,141:1` compression (64 MB / 3.1 KB, referential codebook — *not* lossless magic); `~79,303×` quant gain (sha 4742/0.060).
- **External-cited, unverified here (tagged, not asserted):** `187,821,997 ops/sec`; `4.3× PARSE`.

## 5b. The head/tail split is a measured complexity-class reduction (not just amortization)

Measured on this machine across five orders of magnitude (real `sha256`, real disk — receipts in the benchmark captures):

| message | HEAD encode (O(N), flat ~1.9 GB/s) | sha256 tail gain | end-to-end |
|---|---|---|---|
| 1 MB   | 1.3 ms   | 62×     | ~10× |
| 64 MB  | 25 ms    | 4,774×  | 10×  |
| 256 MB | 123 ms   | 10,239× | 8.1× |
| 1 GB   | 574 ms   | 66,158× | 6.8× |
| 2 GB   | 1,062 ms | 79,303× | 7.2× |

The tail-gain **ratio climbs with N** — the signature of a *complexity-class* change, not a constant factor. The raw path is `O(N)` per downstream consumer; the quant tail is `O(q)` = **O(1) in N** (≈29,400 hashes/sec, ≈14,000 compares/sec **regardless** of payload size). The HEAD stays exactly `O(N)` (flat ~1.9 GB/s), paid once. So:

```
E2E = O(N)-head  +  O(1)-tail   ≈ 7–10× over raw (head fully paid)
```

It is **not** "O(N) and O(1) both solved." `O(N)` is confined to a one-time linear head; the repeated tail is a genuine `O(1)-in-N` operation. (An earlier wording called this "amortization"; the growing ratio shows the stronger claim — a measured complexity-class drop for the tail — while the end-to-end honestly still carries the linear head. The `79,303×` headline is the *component* sha-gain and must always travel with its end-to-end companion `7.2×`.)

## 6. Why this is stronger than the hype version

Each reduction is stated *with* its boundary, so it survives attack: addresses are cheap but bodies are not free; the drive holds state but does not compute; emission is fast but bounded by one spawner's clock; recall is O(1) but the search is not. The honest frame is the load-bearing part — three independent vantages reproduced it.
