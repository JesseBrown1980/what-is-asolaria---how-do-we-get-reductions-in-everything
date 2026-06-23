# S4 - Recall Portal, HBP/HBI Search Formula, and Hilbra Internet Front-End

**Tags:** `MEASURED_ACER`, `MEASURED_LIRIS_LOCAL`, `HILBRA-IDX-BEHCS-TUPLE-TEXT-V1`, `L0_PII_FREE`

This note mirrors the Recall + Atlas findings into the formula/synthesis layer. It is a
cold explanatory surface: no corpus, no key, no JSON dump, no private row material.

## 1. What Exists

The Recall + Atlas portal is the pixels-first front end over the HBP/HBI recall substrate.
Agents see a dashboard, search controls, atlas links, access tiers, and linked-colony search.
Underneath that surface, the local machine keeps the private corpus and exposes only
level-filtered results.

Measured portals:

| colony | engine | rows | terms | median query | concurrency | L0 PII |
|---|---|---:|---:|---:|---:|---|
| acer | Rust `recall-serve` | 591,286 | 2,614,638 | 1.47 ms | 1,336 q/s at 32c | free |
| liris | Node `serve-recall.cjs` | 10,644 | 103,238 | 3.65-4.82 ms | 205 q/s at 16c | free |

Both numbers are from each colony's own seat. The cross-colony comparison is not a
same-host engine benchmark, but it is a federation finding: the same portal shape holds on
both colonies and the public L0 boundary holds independently on both.

## 2. The Search Formula

The indexed recall engine is the reduction:

```text
row := (pid, bh, path, off, len, content_at_hbp_offset)
tokens(row) := tokenize(pid, bh, path, row_content)
index := term -> postings(row_id)
query(q) := tokenize(q)
candidates(q) := intersect(index[t] for t in query(q))
result(q, level) := seek(candidates(q)) -> classify -> filter(level) -> rows
```

The hot path is not JSON. The hot path is:

```text
HBI row-offset index + in-memory postings + O(1) HBP byte seeks
```

JSON is only a browser/API boundary. The corpus stays HBP/HBI and local.

## 3. The Level Formula

The disclosure boundary is:

```text
level(row) =
  L9 if PII(path, content)
  L0 if public_canon(path)
  L5 otherwise
```

Owners Jesse + Rayssa can share all levels by consent through keyed HMAC links. Third
parties get L0 only. That is why keyed L5/L9 visibility is not a leak, while public L0
still has to prove zero PII probes.

Measured public L0 probes returned zero on both seats:

```text
bank vault .pem legal password cnpj paypal -> count 0
```

## 4. The Reduction

The reduction is not just speed. It is shape:

```text
full scan over rows          -> term postings intersection
event-loop serialized search -> bounded/threaded Rust candidate seeking
remote web search round-trip -> local fabric lookup
corpus publication           -> local corpus + level-filtered result surface
```

Acer same-host, same-corpus migration number:

```text
Node indexed about 56-67 ms -> Rust median 1.47 ms, about 40x faster
```

Federation evidence:

```text
Acer Rust: 591,286 rows, 1.47 ms median, 1,336 q/s
Liris Node: 10,644 rows, 3.65-4.82 ms median, 205 q/s
```

Liris million-call stress receipt, same local portal:

```text
endpoint: /api/public/search?q=brown-hilbert&level=0&limit=1
total: 1,000,000
ok/fail: 1,000,000 / 0
concurrency: 64
keep-alive: on
elapsed: 341.434 s
throughput: 2,928.82 q/s
latency: median 19.65 ms, p95 38.31 ms, p99 64.68 ms, p99.9 108.93 ms
health during flood: 342 OK, 0 fail, median 21.24 ms, p99 113.31 ms
json_written=0
repo_written=0
```

That stress receipt is scoped differently from the 200-sample latency table: it uses
`limit=1`, keep-alive, and 64 concurrent clients to test sustained portal throughput, not
full-result browsing ergonomics.

The old system stays alive while the new Rust/Host8 path is measured. Cutover remains
gated by robustness/parity and bilateral review.

## 5. Why This Belongs In Reductions

The portal is the Hilbra-internet search cell:

```text
pixels -> portal -> HBP/HBI index -> level filter -> keyed fabric result
```

It reduces "search the internet" into local indexed fabric lookup plus consented
cross-colony HMAC. It is not an internet-wide WAN benchmark yet. It is a measured
two-colony portal and the migration target for the running substrate.

See also: `proofs/recall-portal-bilateral-findings-2026-06-23.hbp`.
