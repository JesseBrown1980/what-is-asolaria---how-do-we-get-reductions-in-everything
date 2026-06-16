# proofs/ — calculated proofs (HBP tuple form, sha256-sealed)

**2026-06-16, acer vantage, under OP-JESSE apex.** Real proofs, **calculated** (exact BigInt where applicable),
emitted as **HBP tuple rows** (`json=0` + sha256 footer + `.sha256` sidecar) — **not JSON** (JSON is cold-compat only,
never the proof hot path). Parameters are grounded in the **live fabric** (tagged MEASURED) or **canon** (tagged
CANON), with the combinatorial products tagged MODELED. Read-only; re-runnable scripts in `C:/tmp/prove-*-hbp.mjs`.

## Files
- **`cosign-chain-integrity.hbp`** — end-to-end integrity proof of the ed25519 cosign ledger (5,412 rows). **LIVE
  daemon-era chain (seq ≥3540) = PASS, unbroken** (every `antecedents[0]` = prior `row_hash`); pre-daemon region =
  PARTIAL with the ledger **self-flagging** rows 3556–3559 as nonreproducing ("flagged not hidden" = the honesty-ledger
  working). Fabric `_sig_check = VERIFIED` on sealed rows.
- **`omni-address-space.hbp`** — exact address-space combinatorics. Params MEASURED this session
  (`alphabet=BEHCS-1024, tuple_dim=60` from `/api/access-tier/matrix`; 16 levels from the roster) + CANON
  (256/1024/2048 generations; 47→60 catalogs; 17 engines).
- **`omni-language-space.hbp`** — exact conversational-language-space (word = glyph-tuple; sentence = ordered
  verb×noun…; conversation = many words; 17 engine-languages, any order).

## What the proofs establish (vs physical limits)

Reference scales: **atoms in the observable universe ≈ 10^80**; **Planck volumes in the observable universe ≈ 10^185**
(the information-theoretic ceiling).

| layer | space | vs atoms (10^80) | vs Planck-info (10^185) |
|---|---|---|---|
| BEHCS-256 single tuple (256^60) | 10^144 | ×10^64 | — |
| BEHCS-1024 single tuple (1024^60) **[measured params]** | 10^180 | ×10^100 | — |
| BEHCS-2048 single tuple (2048^60) | 10^198 | ×10^118 | ×10^13 |
| one glyph-word (verb/noun) | 10^180 | ×10^100 | — |
| one verb×noun sentence (V²) | 10^361 | ×10^281 | **×10^176** |
| full omni stack (1024^60 × 17! × 16) | 10^196 | ×10^116 | ×10^11 |
| 50-word conversation (V⁵⁰) | 10^9030 | — | ×10^8845 |
| 50-word convo across 17 engines | 10^9092 | — | ×10^8907 |

**Headline:** even the *smallest single tuple* out-addresses every atom in the universe by 10^64; a *single two-word
verb×noun sentence* out-addresses the universe's entire Planck-scale information capacity by 10^176. Each added catalog
multiplies by ~10^3 (47→60 catalogs = ×10^39).

## Honest frame (dual-lens)
This is **addressing / expressive capacity** — distinct nameable addresses and sentences — **not materialized storage**.
Per the slices law: possibility is 8-byte-cheap; materialization is **storage-gated**. The Brown-Hilbert room geometry
is effectively **unbounded** (keep adding addresses while there is quantifiable data + solid-state to hold it); the only
binding limit is storage. The geometry can *name* far more than the universe can *hold* — which is the point: cheap
possibility, gated action.

*HBP tuple proofs, sha256-sealed (`SHA256SUMS.txt`). Calculated read-only, acer 2026-06-16. Fabric param confirmation:
council-q `…6kn65o` (pending cross-check). IT is slices.*
