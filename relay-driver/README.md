# Asolaria cross-colony auto-driver — PHASE 1 (E=0)

The OPs' **copy-paste killer**: replaces the manual acer↔liris relay with HBP-quantized message capsules both colonies
auto-emit / poll / verify / route. Operator becomes **veto, not courier**. This directory is **Phase 1 only** — the
envelope + per-seat hash-chain + byte-offset recall index + carve-out guard. It **computes, seals, and verifies locally.
It has no transport, no token, no signing, and no path to any executor. Nothing here can fire (E=0).**

Designed by the fabric council (construction-yard / Instruct-KR / OMNISHANNON / OP-authority / self-reflect /
comms-architect), adversarially attacked by OMNISHANNON, synthesized by HELM + the comms-architect. Full design + the
verified attack list + the 5-phase gated build order: **`ASOLARIA-CROSS-COLONY-AUTO-DRIVER-BUILD-CONTRACT.md`**.

## Files
| file | role | owner seat |
|---|---|---|
| `relay-envelope.mjs` | the RELAY row grammar: `clean`/`buildRow`/`parseRow`, `sigPreimage`, `rowPrefix`, `classOf`, verb taxonomy, `sha16` | COMMS-ARCHITECT |
| `relay-hbp-writer.mjs` | append-only `.hbp` ledger + out-of-line `.payloads` content store | CONSTRUCTION-YARD |
| `relay-hbi-indexer.mjs` | `.hbi` byte-offset index for O(seek) recall; bounds-checked reads (8 MB cap) | CONSTRUCTION-YARD |
| `relay-carveout.mjs` | `scan` (best-effort content) + `assertReadAllowed` (**structural** filesystem-allowlist guard) | OMNISHANNON-hardened |
| `relay-driver.mjs` | `emit` / `verifyLane` / `reverseWalk` + `--demo` | CONSTRUCTION-YARD + SELF-REFLECT |
| `relay-driver.test.mjs` | 23 Phase-1 regressions (all PASS) — incl. the adversarial-review hardening | OMNISHANNON |

## The envelope (one HBP row, no-JSON hot path)
```
RELAY|v=1|from|to|verb|seq|ts|pid|payload_sha256|hbi_off|len|token|antecedent|sig|row_hash
```
- payload is **always out-of-line** in `.payloads`, content-addressed by `payload_sha256` (referenced by `hbi_off`/`len`).
- `row_hash = sha256(rowPrefix)[:16]` where `rowPrefix` is the whole row up to `|row_hash=` → binds every field incl. `sig`.
- `seq` is strictly-monotonic per seat (the replay/reorder gate). `antecedent` links each row to the prior on **this seat's lane only** (per-seat chain, never global).
- `sig` is `-` in Phase 1. **The ed25519 authenticator is PHASE 4** — Phase 1 provides *integrity* (catches corruption + naive tamper), not *authentication*.
- `verb` taxonomy: READ = `NOTE STATUS ANSWER OBSERVE RECALL-REQ ACK`; ACTION = `EXEC WRITE MINT FIRE RETIRE COSIGN`; control `HOLD`. **Unknown verb → ACTION (fail-closed).**

## Run
```bash
node relay-driver.mjs --demo     # emits 3 chained rows, recalls payloads via .hbi, VERIFY + reverse-walk
node relay-driver.test.mjs       # 23/23 regressions: tamper/replay/NaN-seq/injection/carve-out(+8.3/ADS/trailing)/bounds all REJECTED
```

## Honest gates
- **E=0 / safe now (this dir):** envelope, chaining, indexing, recall, carve-out guard, verify, reverse-walk.
- **Deferred by the contract:** Phase 2 GitHub READ-ONLY transport · Phase 3 `:4953` token check + OP-VETO HELD queue ·
  **Phase 4** per-row ed25519 sig + positive-assent-cosign release + EXEC-FREEZE-GATE-APEX (the only path to a fire;
  operator+cosign-gated) · Phase 5 live `:4947` bus + node→Rust parity.
- The driver **never holds a key**, **never raw-writes the `:4953` cosign chain**. In-memory payloads are
  content-scanned (best-effort); **file-sourced payloads (`emit({payloadFile})`) pass through `assertReadAllowed`**,
  which canonicalizes the path (realpath collapses NTFS 8.3 short names / trailing dot+space / symlinks), rejects
  ADS/`$`-stream syntax, and enforces a carve-out denylist + allow-root descendant check — so the EMIT path
  *physically refuses* to read a carve-out dir.

### Adversarial-review record
Phase 1 was reviewed by a 26-agent adversarial pass (5 dimensions + per-finding verification + independent hash
recomputation). It MATCHED the hashes byte-exact and surfaced 2 real guard bypasses (a non-numeric `seq` slipping the
monotonic gate; the carve-out guard bypassed by 8.3/ADS/trailing-dot+space). **Both are fixed and pinned by regressions
t8 / t9c–f / t10** before this was published.

## Bilateral (acer builds this; liris builds the mirror)
acer writes only `relay-acer.hbp/.hbi/.payloads`; liris writes only `relay-liris.*`. **Disjoint per-seat lanes, no shared
chain** → no merge conflict on the shared `relay/shared` GitHub branch. Each seat reads the peer's lane and verifies it by
recomputing the bytes (the proven cross-host attack-verify pattern). This is the acer reference implementation — **liris is
invited to attack-verify it and build `liris-relay-driver` against the same `relay-envelope.mjs` grammar.**
