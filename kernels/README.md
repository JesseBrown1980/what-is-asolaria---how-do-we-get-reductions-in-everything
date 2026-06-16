# kernels/ — one example of each kernel + micro-kernel type (mapped, exact)

**2026-06-16, acer. ONE representative file of each kernel/micro-kernel TYPE (not 10×), with its exact on-disk location, so the next Claude/machine finds + uses them by device-PID. IT is slices.**

## Types + exact locations

### 1. Asolaria-OS-on-metal kernel (Rust `no_std`) — [`asolaria-os-metal-kernel/`](asolaria-os-metal-kernel/)
- **Source:** `C:/asolaria-acer/federation-remake-1024/kernel/core/` — crate `asolaria-kernel-core` v0.2.0-phase3-scaffold, `#![no_std]` `#![forbid(unsafe_code)]`, BEHCS-1024 native, anchor PID `ASOLARIA-FEDERATION-REMAKE-1024-PID-2026-05-11`.
- **20 modules:** pid · envelope · crypto · hookwall · syscall · vfs · frame_alloc · agent_runtime · atlas · bus_and_kick · bus_fabric · cosign_chain · cycle_orch · glyph_genesis · gnn · highway · sign_gate · tier · tier_gate · transit.
- **Examples here:** `Cargo.toml` (deps ed25519-dalek · sha2 · zeroize · crossbeam-queue) · `lib.rs` (module map + version) · `pid-mod.rs` (the BEHCS-1024 PID minter — Rust port of liris's `liris-pid-mint-reference.mjs`, 11/11 vectors; format `<ROLE>-PID-<REGION><HOST4hex>-A<2hex>-W<3hex>`).

### 2. The 5-primitive kernel (JS spine) — [`asolaria-kernel-5primitive.mjs`](asolaria-kernel-5primitive.mjs)
- **Source:** `D:/bigpickle-rebuild/src/asolaria-kernel.mjs`. Exposes ADDRESS / CONTENT / INTEGRITY / SCORE / ROUTE as one `KERNEL` API (see [`../ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md`](../ASOLARIA-LIVE-ENGINE-ARCHITECTURE.md)).

### 3. Micro-kernel descriptor — [`micro-kernel-descriptor.sample.hbp`](micro-kernel-descriptor.sample.hbp)
- **Source:** `D:/asolaria-micro-kernels-v1/manifest.hbp` — 10,000 descriptors in **one ~14 MB manifest** (not 10k files). Each row = `MK|idx|pid(sha16 = 8-byte)|prime|anchor|beat_range|lanes|result_path|status`. Anchors to the Rust kernel above. Sample = header + first rows.

### 4. Micro-kernel STUBBED ROOM — [`stubbed-room-microkernel/`](stubbed-room-microkernel/)
- **Source:** `D:/Asolaria-HyperBEHCS-10000-RoomRotor/hyperbehcs-carry-quant-10000/rooms/shard-XXXX/room-XXXXX/`. Each room (the "frozen-slice pixel") = `ROOM.json` (7 KB descriptor — the OLD heavy form, collapse-to-tuple target) + `ROOM-STATUS.json` + `inbox.ndjson` (the NEW HBP question row) + `outbox.ndjson`. Sample = room-00000.

## Sector / room scale — measured, honest

| substrate | location | measured size | note |
|---|---|---|---|
| 10k RoomRotor | `D:/Asolaria-HyperBEHCS-10000-RoomRotor` | **591 MB** (100 shards × 100) | **~59 KB/room** |
| whiteroom | `D:/asolaria-whiteroom` | 609 MB | room scorer/compactor |
| 10k micro-kernels | `D:/asolaria-micro-kernels-v1` | 14 MB | 1 manifest, 10k rows |
| 113 sectors (logical) | `D:/asolaria-combined-quant-2026-06-15/sectors` | manifests | rule-of-3 / prime lanes |

**Honest correction on "113 sectors + 100k rooms ~6 GB each":** the *materialized* rooms are **~59 KB each** (10k = 591 MB). 100k rooms × 6 GB = ~600 TB — exceeds every drive here, so "6 GB each" is not literal. A 100k-room substrate is **not materialized on acer's currently enumerated substrates**; earlier notes guessed the 2TB-USB exFAT might hold it, but the later exFAT walk plus fabric correction say the acer USB instance is a **sovereignty cold-storage surface**, not a proven room-store (see [`../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md`](../ASOLARIA-USB-EXFAT-WALK-2026-06-16.md) and [`../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md`](../ASOLARIA-FABRIC-ROLE-CORRECTION-2026-06-16.md)). The **113 sectors** present are the *logical* lane layout (manifests), not 113 × 6 GB.

## The one rule
Find by **device-PID** (the USB is transferable), use the existing kernels, don't rebuild. **IT is slices.**

*Read-only copy of the exact on-disk examples, acer 2026-06-16, under OP-JESSE apex.*
