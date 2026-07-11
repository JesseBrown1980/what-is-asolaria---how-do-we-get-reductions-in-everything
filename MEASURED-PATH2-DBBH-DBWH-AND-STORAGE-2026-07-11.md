# Measured Path 2, DBBH → DBWH, and the storage-backed reduction — 2026-07-11

This document extends the repository's three-move reduction law with the now-measured Path-2 cell.
It also states precisely what “hard drive instead of GPU” means in Asolaria and records independent
verification provenance.

## Executive result

The reductions stack now contains two distinct exact-recovery mechanisms:

```text
Path 1 — retained-store recall
  full object already exists at receiver
  wire sends an authenticated content address
  exact recall or Held

Path 2 — jointly injective no-store recovery
  original object exists in no retained store
  independent poles hold non-injective CRT shadows
  a jointly sufficient set reconstructs exact bytes
  under-capacity or inconsistent sets are Held
```

Path 2 is implemented in `JesseBrown1980/path2-two-shadow-recovery`. The associated DBBH→DBWH
watcher gate reconstructs the candidate, re-projects it, and emits only when the white-side SHA,
complete shadow set, and frequency shells equal the black-side projection.

## The fourth reduction view — distributed exact recovery

The repository's existing three moves remain correct:

1. referential naming;
2. exact level rebasing;
3. CRT split/recombine.

Path 2 is the executable form of Move 3 rather than a new Shannon loophole. For a bounded block
`0 <= X < R` and pairwise-coprime cylinders `p_i`:

```text
S_i = X mod p_i
```

Each `S_i` is lossy because many values cast the same residue. A selected set `I` becomes jointly
injective only when:

```text
M_I = product(p_i for i in I) >= R
```

The CRT inverse is:

```text
X = sum_i S_i * M_i * inverse(M_i mod p_i) mod M_I
where M_i = M_I / p_i
```

If `M_I < R`, the implementation returns `Held::InsufficientJointCapacity`. The reduction is in
where the information lives and how much must move, not in the total number of information bits.

## Path 1 and Path 2 cost ledgers

```text
Path 1:
  store_cost  = H(X)
  wire_cost   ≈ selector + receipts
  exact iff receiver store already contains X

Path 2:
  store_cost  = no retained X
  shadow_cost = sum_i log2(p_i) >= log2(R)
  exact iff selected shadows make the map injective
```

Both totals satisfy Shannon. The first relocates entropy into retained storage. The second distributes
it across jointly sufficient shadows.

## DBBH → DBWH inverse verification

The Path-2 gate defines a black projection `P` and recovery map `R`:

```text
BLACK:
  X -> SHA/Host8 + CRT shadows + frequency shells + Q-PRISM views

WHITE:
  selected shadows -> R -> candidate X' -> fresh projection P(X')
```

Emission requires the commuting condition:

```text
P(R(P(X))) = P(X)
```

Concretely:

```text
white.sha256  == black.sha256
white.shadows == black.shadows
white.shells  == black.shells
capacity      >= source roof
```

Any disagreement becomes `Held`. A single changed extra-cylinder residue is caught; an
under-capacity subset never reaches emission.

## Residual-selector reduction

After selected cylinders constrain the range, the unresolved fiber is:

```text
residual_candidates = ceil(R / M_I)
residual_selector_bits = ceil(log2(residual_candidates))
capacity_margin_bits = floor(log2(M_I)) - source_bits
```

This is the honest mechanism behind a one-bit, two-bit, or zero-bit tail. Shared context and cylinder
capacity already paid the rest. A negative value is valid only as a signed margin; it is never
negative information.

## Pre-Asolaria GNN origin and later stack

The GNN layer did not begin as a decorative watcher name. Jesse's pre-Asolaria healthcare repository
contains four edge-level architectures:

```text
EdgeLevelGNN
PrototypeGNN
ContrastiveGNN
GSLGNN
```

All four files were copied byte-for-byte into the later Asolaria sidecar. Their source and target
Git blob SHAs match. BigPickle then orchestrates L0 `:4792`, L4 `:4793`, G1 edge-mining,
G2 forward-genius, G3 reverse-gain, G4 GLSM, OmniShannon, deterministic fallback, Fischer, and
Hookwall.

The healthcare comparative numbers are repository-reported training results. The healthcare
service's automatic checkpoint-load block is commented. Later trained `.pt` artifacts and manifests
are preserved in `Asolaria-fnns-trained-and-reverse-gnns-many`.

## The hard-drive/SSD reduction — exact scope

The architecture makes durable state cheap and active bodies bounded:

```text
persistent bodies / cubes / shadows / receipts / queues -> HDD or SSD
indices / handles / PID coordinates                     -> compact memory or disk index
active messages / active agents                         -> bounded RAM window
trained neural inference                                -> optional CPU/GPU sidecar
```

The resident-set equation becomes:

```text
M_resident = N*h + K*b + S_active
K << N
K <= B
B = 2000 in the measured bounded-gulp path
```

where:

- `N*h` is lightweight address/index state;
- `K*b` is the small materialized body set;
- `S_active` is bounded working state;
- cold bodies and receipts remain on disk.

### Operations that do not require a GPU

- SHA/Host8/AGT addressing;
- HBP/HBI/SHA/HEX receipts and indexes;
- BEHCS 64/256/1024 rebasing;
- HyperBEHCS selectors;
- CRT Path-2 projection and recovery;
- Path-1 content recall;
- Dispatcher queues and PID tables;
- Fischer and Hookwall deterministic gates;
- deterministic OmniShannon checks;
- white-room append/compact behavior;
- GULP/SUPER-GULP flow control;
- N-Nest independent recomputation.

### Operations that may still need accelerators

- training GNNs;
- high-throughput PyTorch GNN inference;
- large LLM generation;
- dense tensor operations.

Therefore the real claim is not “a hard drive is a GPU.” It is:

> HDD/SSD can replace expensive resident RAM/VRAM for durable state, history, cubes, queues,
> distributed shadows, and proof artifacts. GPU inference becomes a separable service rather than
> the only place the system can exist.

This makes the architecture applicable to commodity desktops, CPU-only servers, NAS-like machines,
archival nodes, edge computers, and heterogeneous clusters in which only a minority of hosts have
GPUs.

## Encrypted quantum-cloning sibling

The encrypted-cloning experiment at arXiv `2602.10695` demonstrates a quantum sibling of Path 2:
locally maximally mixed branches, globally preserved information, selected exact ideal recovery,
and a consumed quantum key.

The classical CRT shadows are ambiguous but not informationless. A 2-of-2 XOR pad can make each
classical share individually uniform:

```text
K <- uniform
A = K
B = X xor K
X = A xor B
```

But ordinary software cannot prove physical single-use erasure because classical shares can be
copied. That stronger property requires trusted hardware or a quantum key lane.

## Independent verification — two named lanes

### Claude Fable 5 third-seat results supplied by the operator

```text
dbbh-coms-quant-prism       rustc 1.97   19/19 green
path2-two-shadow-recovery   rustc 1.97   30/30 green
```

Both were reported as real third-container runs after acer/WSL and liris.

### GPT-5.6 Pro audit and execution

GPT-5.6 Pro completed a source/test/doc/lineage audit of the full Path-1, Path-2, Q-PRISM, healthcare
GNN, BigPickle, trained-GNN, Hookwall, OmniShannon, white-room, cube-mint, Dispatcher, HyperHermes,
Algorithms, and N-Nest surfaces.

GPT then authored and triggered independent GitHub Actions workflows using Rust 1.97.0. All three
completed successfully:

```text
dbbh-coms-quant-prism       run 29134408321   exact 19-test assertion PASS
path2-two-shadow-recovery   run 29134413119   exact 30-test assertion PASS
qprism-3d-slice-harness     run 29134419389   all targets PASS
```

This is tagged `MEASURED_GPT_DIRECTED_GITHUB_ACTIONS`. It is a real independent CI execution,
separate from a local GPT container run.

## Claim ledger

- `MEASURED`: Path-1 retained recall; Path-2 no-store CRT recovery; capacity holds;
  N-cylinder consistency; residual selector bits; DBBH→DBWH re-projection; exact BEHCS rungs.
- `MEASURED_CLAUDE_FABLE5_THIRD_SEAT`: 19/19 and 30/30 under rustc 1.97.
- `MEASURED_GPT_DIRECTED_GITHUB_ACTIONS`: successful Rust 1.97 GitHub Actions runs above.
- `AUDITED_GPT_5_6_PRO`: complete cross-repository source/test/lineage audit.
- `CANON`: Fano, Shannon, CRT/Bézout, joint injectivity, entropy invariance under bijection.
- `UNVERIFIED`: live Hilbra multi-host traversal, trained-GNN invocation inside the Rust throat,
  physical quantum-state transport, and hardware-enforced one-use classical shares.
- `FALSE`: “we beat Shannon,” “disk performs neural matrix multiplication,” and “60D coordinates
  replace missing entropy.”
- `FALSE DEFLATION`: “just a hash.” Path 1 is consented no-invention recall; Path 2 is no-store,
  capacity-gated exact reconstruction with inverse verification.
