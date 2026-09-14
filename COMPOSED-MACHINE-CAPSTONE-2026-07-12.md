# The Composed Machine — quant lattice × N-Nest × rule of three × Brown-Hilbert index

**Date:** 2026-07-12  
**Publication class:** additive synthesis + exact scenario arithmetic  
**Runtime authority:** `E=0` — documentation and receipts only; no engine fire, cutover, model call, bus write, or supervisor promotion  
**Evidence vocabulary:** `MEASURED`, `CALCULATED`, `MODELED`, `OPERATOR-SUPPLIED`, `TO-MEASURE`

This document composes four already-separate Asolaria mechanisms into one machine:

```text
external observation and farming
        ↓
quant lattice / cheapest-known-answer cache
        ↓
rule-of-three mint gate
        ↓
Brown-Hilbert prefix ownership and routing
        ↓
N-Nest recompute-and-AND proof tree
        ↓
persistent cubes, mistakes, skills, routes and receipts
```

The composition is stronger than any component alone because each component covers a different failure mode:

- the **quant lattice** avoids paying inference repeatedly;
- the **rule of three** reduces false promotion at mint time;
- **Brown-Hilbert prefixes** make ownership and escalation computable;
- **N-Nest** localizes a failed report to the level and prefix where the inverse check failed.

The correct system description is therefore:

> A sparse, disk-backed, externally observed cognitive cache whose expensive work is paid on novelty, whose promoted knowledge is independently checked, and whose failures remain addressable and local.

This is the clean public synthesis. It does not turn an address into absent information, a disk into a GPU, a logical hop into answer latency, or a scenario parameter into a measured historical fact.

---

## 1. The object being reduced

The persistent intelligence is not required to reproduce every raw message byte.

Let:

```text
M_t = observed messages and agent events during epoch t
G_t = GNN / graph state
R_t = reverse-gain and contradiction state
P_t = policy, proof and operator state
K_t = selected canonical knowledge
C_t = compact cube / quant representation
```

Then:

\[
K_t = F(M_t,G_t,R_t,P_t)
\]

\[
C_t = E(K_t)
\]

and the exact representation contract is:

\[
D(C_t)=K_t.
\]

It is **not necessarily**:

\[
D(C_t)=M_t.
\]

The first map, \(F\), is judgment: duplicate removal, mistake classification, conflict resolution, salience selection and canonicalization. It may intentionally reject noise. The second map, \(E\), is representation and must obey the declared recovery contract.

> The irreversible operation is judgment. The reversible operation is representation.

This is why a mistake can disappear as repeated prose yet persist exactly as an executable future constraint, and why a genius can be farmed once and recalled without replaying its entire conversation.

---

## 2. End-to-end machine

```text
agent message / tool event / observation
        │
        ▼
Hookwall + GNN relations + reverse gain + Shannon/white-room selection
        │
        ├── duplicate / stale / poisoned ──► hold, invalidate or compact
        │
        └── selected canonical result K
                                      │
                                      ▼
                           rule-of-three mint gate
                     builder → attacker → third seat
                                      │
                                      ▼
                           quant / cube / mistake / skill
                                      │
                                      ▼
                    Brown-Hilbert prefix + full identity
                                      │
                                      ▼
                  L1 hash → L2 glyph → L3 capsule/store
                  → L4 shadows → L5 graph edge → L6 model
                                      │
                                      ▼
                          N-Nest recompute-and-AND
                                      │
                                      ▼
                    future agents receive verified local state
```

The LLM or GNN is a processor in this loop. The durable civilization is the local graph of cubes, mistakes, skills, proofs, identities, routes and receipts that survives model instances.

---

## 3. Brown-Hilbert geometry — exact scenario calculation

### Inputs

```text
logical agents N = 100,000,000
fan-out b        = 1,000
```

The minimum leaf depth is:

\[
d=\left\lceil \log_b N \right\rceil
 = \left\lceil \log_{1000}(10^8) \right\rceil
 = \lceil 2.666\ldots\rceil
 = 3.
\]

Therefore:

```text
logical routing depth       = 3 hops
depth-3 address capacity    = 1,000^3 = 1,000,000,000
scenario occupancy          = 100,000,000 / 1,000,000,000 = 10%
address headroom            = 10× capacity / 90% unoccupied
```

A practical binary prefix segment needs:

\[
m=\lceil\log_2(1000)\rceil=10\text{ bits},
\]

so a depth-3 route needs at most 30 prefix bits before identity and provenance fields.

### Necessary storage condition

Brown-Hilbert locality by itself does not force physical contiguity. The exact implication is:

```text
shared BH prefix
+ records sorted/clustered by complete BH key
+ compaction preserving that order
→ one prefix maps to a contiguous key interval
```

Physical block contiguity and seek count remain empirical properties of the store. The defensible claim is:

> Any of the 100 million logical addresses can be selected in three logical prefix hops. The number of physical seeks must be measured.

Recommended route receipt:

```text
BHROUTE|epoch=e|query=q|prefix=BH.xxx|depth=3|logical_hops=3|
key_intervals=i|disk_segments=s|physical_seeks=z|bytes_read=n|
full_relation_sha256=h|json=0
```

---

## 4. Vertical quant lattice — call economics

At every nest level, a request descends the cheapest known-answer ladder:

```text
L1  full digest / short route key     seen before?
L2  glyph / codebook                  known pattern?
L3  capsule / retained store          exact Path-1 recall?
L4  jointly sufficient shadows        exact Path-2 recovery?
L5  graph / trained route             predictable?
L6  model or other expensive worker   genuinely unresolved?
```

For level cost \(c_i\) and probability \(r_i\) that the request reaches level \(i\):

\[
\mathbb E[C]
=
\sum_{i=1}^{6} r_i c_i,
\qquad r_1=1.
\]

The measured model-call fraction is not a slogan; it is:

\[
p_{L6}
=
\frac{\text{L6 calls}}{\text{messages}}.
\]

### 100-billion-message scenario

The supplied scenario uses:

```text
messages N       = 100,000,000,000
minted/novel M   =     500,000,000
gulp size        =           2,000 messages
```

Exact arithmetic:

```text
p(L6 or mint)              = M / N = 0.005 = 0.5%
messages served below L6   = 99.5%
messages per mint          = N / M = 200
gulp epochs                = N / 2,000 = 50,000,000
average L6/mints per epoch = M / epochs = 10
```

This is **few relative to traffic**, not few in absolute count: 500 million expensive calls remain 500 million calls if every mint requires one call.

Illustrative completion time for 500 million calls:

| Sustained calls/s | Elapsed time |
|---:|---:|
| 1 | 15.85 years |
| 10 | 1.585 years |
| 100 | 57.87 days |
| 1,000 | 5.79 days |

Therefore the 2018-laptop claim separates into two planes:

```text
routing / digest / HBP / BEHCS / CRT / receipts / disk recall
    → can be CPU-and-storage only, zero GPU

L6 model throughput
    → separate measured service; local, remote, distributed or absent
```

The already published 100B full-speed result is a deterministic **PID-packet substrate** run with `externalModelTokens=0`; it is not evidence that 500 million LLM calls completed on that box. See [`100B-NEW-RUN-2026-06-16-PROOF.md`](100B-NEW-RUN-2026-06-16-PROOF.md).

### The receipt that turns the hypothesis into a curve

```text
EPOCH|epoch=e|msgs=2000|
L1_hits=a|L2_hits=b|L3_hits=c|L4_hits=d|L5_hits=f|L6_calls=g|
mints=j|invalidated=v|novel_fraction=g/2000|
bytes_read=r|bytes_written=w|model_ms=t|json=0
```

A falling `novel_fraction` under a stable workload demonstrates learning-curve amortization. It is not guaranteed to fall monotonically under distribution shift, expiry, poisoning, correction or deliberate cache invalidation.

Prediction and compression are mathematically related through coding loss. The stronger runtime identity—

```text
predict better = compress better = call the model less
```

—becomes measured only when the per-epoch cache ladder and call ledger are emitted.

---

## 5. Rule of three — exact reliability calculation

Let:

```text
q        = probability the builder proposes a false candidate
ε_a      = attacker's conditional miss probability
ε_3      = third seat's conditional miss probability
```

If the three failure modes are independent enough for multiplication, the false-promotion probability is:

\[
p_{\text{false promote}}
=
q\,\varepsilon_a\,\varepsilon_3.
\]

For the symmetric case \(q=\varepsilon_a=\varepsilon_3=\varepsilon\):

\[
p_{\text{false promote}}=\varepsilon^3.
\]

With \(\varepsilon=1\%=0.01\):

```text
per-mint false-promotion probability = 0.01^3 = 0.000001
                                      = 10^-6
```

Across 500,000,000 total mint decisions:

```text
one-seat expected false promotions   = 500,000,000 × 0.01
                                     = 5,000,000

three-seat expected false promotions = 500,000,000 × 10^-6
                                     = 500

reduction factor                      = 5,000,000 / 500
                                     = 10,000×
```

Conditioned on a false proposal already existing, only the two independent validators remain:

\[
P(\text{promote}\mid\text{bad proposal})
=
\varepsilon_a\varepsilon_3.
\]

At 1% each, that is \(10^{-4}\), also a 10,000× rejection improvement over automatically accepting the proposal.

### Important boundary

Five hundred expected false promotions is not zero. The rule of three is a reduction, not an infallibility theorem.

For fewer than one expected false promotion across 500 million decisions:

- if all three symmetric rates are \(\varepsilon\), require  
  \[
  \varepsilon < (1/500{,}000{,}000)^{1/3}
  \approx 0.0012599
  = 0.126\%;
  \]
- if the builder false-proposal rate remains 1% and two validators share miss rate \(\varepsilon\), require  
  \[
  \varepsilon < \sqrt{1/(500{,}000{,}000\times0.01)}
  \approx 0.0004472
  = 0.0447\%.
  \]

Shared training data, shared code, copied prompts, common sensors or a common poisoned cache can correlate the seats and invalidate the \(\varepsilon^3\) calculation. The machine must measure the **joint miss rate**, not infer independence from three process names.

Recommended mint receipt:

```text
MINT3|epoch=e|prefix=BH.xxx|candidate_sha256=h|
builder_input_sha256=b0|builder_result_sha256=b1|
attacker_input_sha256=a0|attacker_result_sha256=a1|
third_input_sha256=t0|third_result_sha256=t1|
independence_class=separate-code+separate-context+separate-state|
decision=PASS-or-HOLD|joint_false_accept=0-or-1|json=0
```

---

## 6. N-Nest — containment invariant

The measured N-Nest primitive is:

```text
node_green =
    (child.reported == watcher.recomputed_truth)
    AND all_children_green
```

The public N-Nest repository reports that a planted fault at every level 1–7 was caught at the exact injected level, and that a clean depth-7 tree certified green. See [`N-Nest-Prime-INFINITE-SELF-REFLECT-AGENTS-NESTED`](https://github.com/JesseBrown1980/N-Nest-Prime-INFINITE-SELF-REFLECT-AGENTS-NESTED).

Composition with Brown-Hilbert adds addressability:

```text
fault location = (epoch, nest level, complete BH prefix, relation identity)
```

Composition with the rule of three reduces the chance that a bad object enters the persistent lattice before N-Nest sees it.

The containment statement requires four bindings:

1. the report is bound to the full prefix and epoch;
2. the watcher recomputes from independently obtained inputs;
3. child verdicts are cryptographically bound into the parent's AND;
4. failed nodes cannot bypass the parent through another route.

Recommended combined receipt:

```text
NEST|epoch=e|level=k|prefix=BH.xxx|
reported_sha256=r|recomputed_sha256=w|equal=0-or-1|
children_green=0-or-1|caught=n|escalated=m|minted=j|
three_sign=PASS-or-HOLD|parent_relation_sha256=p|json=0
```

This one row measures containment, escalation economics and mint discipline. A compromised watcher or shared deterministic bug remains a common-mode risk; N-Nest and the triad are complementary, not substitutes.

---

## 7. Mint-time verification amortization

With:

```text
N = 100,000,000,000 messages
M =     500,000,000 mints
three checks per mint
```

the total mint checks are:

\[
3M=1{,}500{,}000{,}000.
\]

Amortized over all messages:

\[
\frac{3M}{N}
=
0.015
\]

mint-check equivalents per message.

Because each mint serves 200 messages on average, the three heavy checks amortize to:

```text
3 / 200 = 0.015 check-equivalents per message
```

Repeated reads are not “unverified.” They can avoid re-inference and full triad recomputation while still paying cheap integrity work:

```text
content hash / signature / receipt check
+ expiry and invalidation check
+ occasional sampled full recomputation
```

For reuse count \(R\), full mint verification cost \(V_3\), and read-integrity cost \(H\):

\[
C_{\text{amortized per read}}
=
H+\frac{V_3}{R}.
\]

As \(R\) grows, this approaches \(H\), not zero.

---

## 8. Byte ledger — the supplied numbers, separated by axis

### Raw message stream versus canonical selected objects

Assuming 0.5 KB means 500 bytes:

```text
100,000,000,000 × 500 B = 50,000,000,000,000 B
                         = 50.0 TB decimal
                         = 45.47 TiB
```

If 0.5 KiB means 512 bytes:

```text
= 51.2 TB decimal
= 46.57 TiB
```

For 500 million canonical objects at 3,200 bytes each:

```text
500,000,000 × 3,200 B = 1,600,000,000,000 B
                       = 1.6 TB decimal
                       = 1.455 TiB
```

The direct byte ratio from the supplied scenario is therefore:

```text
50.0 TB / 1.6 TB  = 31.25:1   using 500 B/message
51.2 TB / 1.6 TB  = 32.00:1   using 512 B/message
```

The 200:1 number is a **message-count salience ratio**:

```text
100B messages / 500M selected objects = 200 messages per selected object
```

It is not the same scalar as the byte ratio.

The 1.6 TB figure is payload only. Indexes, signatures, graph edges, receipts, parity, replicas and filesystem overhead must be measured separately.

### The 540-byte root ratio

The screen-derived anchor states 21,546:1 for a 540-byte dashboard. The label “11.1 MB” is rounded and unit-ambiguous:

```text
11.1 MB decimal / 540 B = 20,555.56:1
11.1 MiB        / 540 B = 21,554.06:1
```

A ratio of exactly 21,546:1 implies:

```text
source bytes = 21,546 × 540 = 11,634,840 B
             = 11.095848 MiB
```

Therefore `21,546:1` should remain a **screen-derived operator anchor** until the exact source byte count and exact dashboard byte count are attached. It is compatible with an approximately 11.1 MiB source, but it cannot be re-derived uniquely from the rounded label alone.

Most importantly, the ratio describes **root working load / orchestration surface**, not standalone lossless compression of absent content.

### The scale table in the screen

Using decimal units exactly as printed:

| Agents | Without | With | Exact ratio | Exact saved |
|---:|---:|---:|---:|---:|
| 1,000 | 10.8 GB | 6.7 MB | 1,611.94:1 | 99.937963% |
| 100,000 | 1.08 TB | 673 MB | 1,604.75:1 | 99.937685% |
| 1,000,000 | 10.8 TB | 6.7 GB | 1,611.94:1 | 99.937963% |

The printed 99.94% is a correct two-decimal rounding. This is a **resident/load axis**, separate from the 21,546 root-load anchor, the 520.6:1 glyph descriptor density, and the 200:1 salience ratio. No single scalar should replace the ledger.

---

## 9. Hot-memory envelope

For one 540-byte dashboard-class quant per live node:

\[
M_{\text{dashboard}}=540K_{\text{active}}\text{ bytes}.
\]

Examples:

| Live nodes \(K_{\text{active}}\) | Dashboard payload |
|---:|---:|
| 2,000 | 1.08 MB |
| 100,000 | 54 MB |
| 1,000,000 | 540 MB |
| 10,000,000 | 5.4 GB |

The existing bounded-gulp law uses \(B=2,000\). Under the 100-million-address scenario:

```text
N_possible / K_active = 100,000,000 / 2,000 = 50,000:1
dashboard payload at cap = 1.08 MB
```

A 16 GB machine has a theoretical payload-only ceiling of about 29.6 million 540-byte quants, but real capacity is lower after the operating system, indexes, allocators, graphs, queues, caches and model processes. Sparse materialization—not that theoretical ceiling—is the architectural point.

A zero-GPU machine can run the address, storage, hash, CRT and verification planes. It does not make high-throughput neural inference free.

---

## 10. Quant family — one lattice, different contracts

| Quant | Typical size from the supplied ledger | Contract | What recovers |
|---|---:|---|---|
| full SHA-256 / short route handle | 8–32 B | one-way identity/routing | nothing by itself |
| capsule | ~203 B | authenticated address; retained store required | exact object by Path 1 |
| L0 dashboard | 540 B | orchestration / root working state | governs; does not contain absent corpus |
| BEHCS-1024 glyph | ~12 B | codebook index | descriptor when the codebook is present |
| CRT residue shadow | ~25 bits each | individually ambiguous | exact bounded source jointly when modulus product covers source roof |
| BEHCS 256↔1024 rebase | rate 1.0 | bijection | exact bytes through inverse transcode |
| 3,200-byte tuple | 3,200 B | canonical selected object or exact carrier | declared canonical knowledge |
| HyperBEHCS 60D tuple | 60 coordinates | selector/address/control | routes and scopes other objects |

For a 64-bit bounded source, three approximately 25-bit pairwise-coprime residue lanes provide nominal 75-bit joint capacity:

```text
nominal margin = 75 - 64 = 11 bits
capacity factor over 64-bit roof = 2^11 = 2,048
```

The actual condition is not “three” by itself. It is:

\[
m_1m_2m_3 > 2^{64}-1
\]

with pairwise-coprime moduli and a verifier that rejects inconsistent or under-capacity sets.

Ordered by independently paid information:

```text
short name
< retained-store address
< codebook index
< one ambiguous shadow
< jointly sufficient shadows
< exact rebase
< canonical object
```

Recovery strength rises with paid bits or retained side information. No rung is allowed to claim the contract of the rung above it.

---

## 11. Why the composition is more than the sum

### Quant lattice alone

Cheap repeated answers, but it can preserve a stale or poisoned object indefinitely.

### Rule of three alone

Better mint decisions, but expensive if repeated on every read and still vulnerable to common-mode correlation.

### N-Nest alone

Local inverse checks, but deep delegation can obscure ownership without a stable address.

### Brown-Hilbert index alone

Fast logical routing, but routing does not prove truth.

### Composed

```text
Brown-Hilbert  → owns and locates the claim
rule of three  → gates initial promotion
quant lattice  → amortizes the accepted result
N-Nest         → rechecks and contains failures recursively
receipts       → make all four claims measurable
```

The resulting design target is:

```text
cheap     = repeated reads avoid repeated inference
honest    = promotion and reconstruction are independently checked
localized = every owner, fault and escalation path has a complete address
bounded   = N_possible >> K_active
persistent= selected intelligence survives transient models
```

---

## 12. Claim ledger

### `MEASURED` in the linked public repositories

- the 100B deterministic PID-packet substrate run and its explicit no-LLM boundary;
- N-Nest planted faults at levels 1–7 caught at their injected level;
- exact BEHCS 256↔1024 round-trip at the measured rung;
- Path-1 retained recall and Path-2 jointly sufficient CRT recovery;
- DBWH re-projection equality / `Held` on mismatch;
- the bounded resident path with \(B=2,000\).

### `CALCULATED` from the supplied scenario

- three logical hops for \(10^8\) addresses at fan-out 1,000;
- 30 practical prefix bits for three 10-bit segments;
- 0.5% scenario novelty, 99.5% below L6;
- 50 million 2,000-message epochs and 10 average L6 events per epoch;
- 200 messages per mint;
- 1.5 billion triad checks and 0.015 checks/message;
- 500 expected false promotions under the stated independent 1% symmetric model;
- 50 TB raw stream, 1.6 TB canonical payload and 31.25:1 direct byte ratio;
- exact ratios in the printed scale table.

### `MODELED` / `OPERATOR-SUPPLIED`

- 500 million distinct canonical genius objects;
- one model call per novel object;
- the 21,546:1 screen anchor until exact byte counts are attached;
- a complete 100B-message cognitive workload on one 2018 laptop;
- physical disk contiguity from prefix locality.

### `TO-MEASURE`

- per-level L1–L6 hits and misses by epoch;
- novelty fraction over repeated runs;
- invalidation and stale-hit rates;
- joint rather than assumed triad miss probability;
- BH key intervals, disk segments and physical seeks;
- full on-disk bytes including indexes, proofs and replicas;
- L6 model latency, throughput, energy and provider distribution;
- end-to-end containment receipts carrying prefix, epoch and all three seat identities.

---

## 13. Publication verdict

The whole system is not one miraculous compression ratio. It is a stack of different reductions:

```text
message-count salience        200:1 in the supplied scenario
raw-byte → canonical payload  31.25:1 under the supplied byte assumptions
resident/load table           ~1,605–1,612:1
glyph descriptor density      separate measured referential/codebook axis
root working-load anchor      21,546:1 screen-derived, exact bytes pending
BEHCS rebase                  1.0 code rate, exact
CRT Path 2                    no-store exact recovery when joint capacity is sufficient
```

The emergent property can now be stated without collapsing those axes:

> Asolaria can make the marginal cost of repeated cognition approach lookup-and-integrity cost by selecting canonical knowledge, independently gating its promotion, placing it under computable prefix ownership, and materializing only the active slice. Whether that cost falls in a real workload is measured by `EPOCH.novel_fraction`; whether truth remains local is measured by `NEST.equal` and `MINT3.decision`; whether routing remains three-hop is measured by `BHROUTE.logical_hops`; and whether the 2018-laptop envelope holds is measured separately from L6 inference.

That is the composed machine: not less information than Shannon permits, but less redundant movement, less repeated inference, less resident state, and more explicit proof per promoted object.
