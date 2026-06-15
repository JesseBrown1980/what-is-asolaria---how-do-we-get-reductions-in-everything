# Fabric Identity Doctrine (the four IDs)

**Status:** operator-authored canon, 2026-06-15. Resolves the `EdgeID`-vs-distance-uniqueness merge between the 40-agent rebuild report and the external "Brown-Hilbert Prime-Cylinder Triad" reconstruction. **Supersedes** any framing that treats distance-uniqueness as the identity primitive.

## Terminology fix (carried verbatim)

**"node" means a graph *address-point*, never Node.js, never a resident process or heavyweight body.** Canon avoids the word "node"; use **address-point**. There is **no Node.js on the identity hot path** — the identity layer is HBP/hash/tuple-based and cheap. Node scripts are acceptable only as offline/proof/report tooling when explicitly allowed. The 8-byte-handle / sparse-materialization doctrine holds: possible agents/points stay lightweight until a gated slice-engine materializes work (`M = N·h + K·b + S`, `K ≪ N`).

## The four IDs

```
AddressID      = PID(A) = sha256(canonical(A))[0:16]
                 # the address-point (a bijective coordinate tuple), NOT a resident node

RelationKey    = H(AddressID_A, AddressID_B, relation_kind, direction,
                   tower, role, cylinder, epoch, vantage)
                 # owns ROUTING + DEDUP — the relationship identity

RelationEvent  = H(RelationKey, hbp_row_sha16, sequence_or_timestamp)
                 # owns REPEATED OBSERVATIONS — the occurrence identity.
                 # Without it, repeated observations of the same edge in the
                 # same epoch collapse unintentionally.

ProjectionCert = H(embedding_version, address_set_hash, distance_certificate_hash)
                 # the projection/geometry certificate, NOT identity authority
```

## Doctrine

- address-point **NOT** resident-node
- relation-key **NOT** scalar-distance
- event-receipt **NOT** process-body
- projection-cert **NOT** identity-authority
- **distance NEVER owns identity**

## `RelationKey` is true *under conditions* (not "trivially always true")

1. byte-stable canonical tuple
2. domain-separated hash preimage
3. directed-vs-undirected edge policy declared (the `direction` field)
4. `relation_kind` included
5. `epoch` / `vantage` included wherever routing changes identity
6. SHA collision treated as **cryptographically negligible**, not mathematically impossible

## The distance-uniqueness certificate is licensed, not safety-critical

The measured Sidon-Tower-Embedding result — **627 address-points → 196,251 pairwise distances → 0 collisions** (re-run twice across vantages; the naive 1-D linearizer it replaced collides quadratically by pigeonhole) — is a **licensed projection property**, **not** a required safety invariant. It is scoped to **one realized address-set + one embedding version**. On address-set growth: a rolling re-proof is required, or the projection drops to **DRAFT** while identity stays safe through `RelationKey` regardless.

## Layer ownership (the tight rule)

| Layer | Owner |
|---|---|
| routing / dedup | `RelationKey` |
| repeated observations (occurrence) | `RelationEvent` |
| projection / geometry (tie-free centrality, O(1) novelty, faithful inversion) | STE-certified distance, gated by `ProjectionCert` |
| display distance | a signal and a view — **never** the authority |

> Note: the rebuild found `EdgeID`/`RelationKey`-style line-signatures already implemented as EXISTS code (`mlc-line-watcher.mjs` line signature; `line_id` in the emit layer) — the tuple-hash identity was already in the substrate; this doctrine names it and makes it authoritative over scalar distance.
