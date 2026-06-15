# F07 — External Watcher Stack (Fischer Kernel + MTP/GNN) — BUILDER rebuild

Facet: the **watcher organs** that sit *outside* the prime-tower fabric and watch it without being part of it. A **Bobby-Fischer kernel** "plays" the cubes/lines and watches **centrality** and tests it; **MTP + geospatial** agents watch the lines; **HRM+MTP** hunt **novelty**; a tiny **~10-byte ML GNN** (binary/hex/hbi/hbp) analyzes the graph **FROM THE OUTSIDE** while still on the same machine. "A television inside a simulation of the simulation, with agents watching it" (Dan's *madness interactive* — the origin of the omnispindles).

Angle: **Builder** — the concrete rebuild + test on OUR stack: exactly which engines/files/cubes to use, the exact experiment, the measurable receipt, the held-safe path, and the new code/artifact to write.

Author discipline note (per OP-JESSE standing rules + the CLAIMS LEDGER): I never say "impossible." Where the operator's hint carries a number or claim the repo has already *tagged* (e.g. the Fischer kernel's liveness, the "10-byte" GNN), I rebuild the **mechanism** and then state the claim at the **exact honesty grade the canon assigned it** — because deflating a tagged claim into "decorative" would be the c134d0f "just a hash" error, and inflating a `DRAFT_STANDIN` into "PROVEN" would violate the ledger. All source was read **read-only**; nothing here POSTs to the live bus, opens `:4792`/`:4794`, launches a process, or mints. New code is written only under `D:/asolaria-prime-towers-rebuild-2026-06-15/`.

---

## 0. The one-sentence thesis

> The watcher stack is **not** another fabric — it is the *outer* fabric: a set of read-only organs that consume the line/point emissions the inner fabric already produces, score them (Fischer plays the board and measures **centrality**; the GNN scores each edge; HRM/MTP hunt novelty in the recurrence and the field), and emit their verdicts *back into the same sha-chain as ordinary rows* — so the watcher is a television **inside** the chain, watchable by the next watcher, recursively, while every organ is held-safe by static construction (`no_spawn=1 no_execute=1 no_fetch=1 process_launch=0`).

Almost every clause of that sentence is already executable code on disk. This document shows exactly where, names the one real gap (there is **no centrality kernel** and **no compact verdict serializer** wiring the existing pieces into a closed loop), and writes the single new artifact that closes it with an 8/8 self-test — the **Fischer-Centrality Watcher (FCW)** and the **10-byte GNN verdict codec (`gnnv`)**.

---

## 1. What EXISTS on our stack (rebuilding *from*, not *inventing*)

### 1.1 The line-watcher already IS the outer fabric, with the exact watcher set (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/mlc-line-watcher.mjs` is the literal "outer-fabric line observer." Its own header states the doctrine the facet asks for:

```js
'MLCWHY|not-a-duplicate-fabric=1|inner_fabric=points-and-potential-PIDs
   |outer_fabric=relationships-between-points-lines-distances-collisions-and-expansion-proposals|json=0'
```

That is Jesse's "watch it FROM THE OUTSIDE while still on the same machine" — the inner fabric is points/potential-PIDs; the outer fabric is *relationships* (lines, distances, collisions). The watcher set is declared verbatim:

```js
export const OUTER_WATCHERS = Object.freeze(['mtp_field_proxy', 'hrm_recurrence', 'gnn_edge']);
export const FISCHER_SCORE_KIND = 'DRAFT_STANDIN_NOT_FISCHER';
```

**MTP + HRM + GNN + Fischer — the exact four organs of the facet.** Each drawn line is routed to a watcher and given a Fischer move:

```js
function watcherFor(relation, index) {            // routes the line to MTP / HRM / GNN
  if (relation === 'same_point' || relation === 'same_lane') return 'gnn_edge';
  if (relation === 'same_prime_same_phase' || relation === 'same_prime_band') return 'hrm_recurrence';
  return OUTER_WATCHERS[index % OUTER_WATCHERS.length];   // mtp_field_proxy fallback
}
function fischerMove(relation, bucket) {          // the Fischer kernel's "move" on the line
  if (relation === 'same_point') return 'HOLD_COLLISION_REVIEW';
  if (relation === 'same_prime_same_phase') return 'DEEPEN';
  if (bucket === 'far' || relation === 'cross_field') return 'BRIDGE';
  return 'WATCH';
}
```

And the line's signature + the unique-signature count are computed and emitted:

```js
const signature = sha16([a.pid,b.pid,a.bh_point,b.bh_point,stride,distance,bucket,relation,watcher,move].join('|'));
// runLineWatcher().summary.unique_signatures = new Set(lines.map(l => l.signature)).size
```

So today, with no new code, a `--pilot` run emits `MLCLINE|...|watcher=hrm_recurrence|fischer_move=DEEPEN|score_kind=DRAFT_STANDIN_NOT_FISCHER|...|signature=...|json=0` rows. **The lines, the watcher routing, and the Fischer *move* exist. What does NOT exist yet is a Fischer kernel that "plays" the board to measure CENTRALITY** — `fischerMove` is a per-edge classifier, not a board-level centrality player. That is the gap §4 fills.

### 1.2 The nodes carry the full prime-tower coordinate the watchers read (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/pre-existence-graph-exporter.mjs` produces the `PREXNODE` the line-watcher consumes. Each node already has everything centrality and the GNN need:

```
PREXNODE|name=... |pid=... |bh_point=BH.s.l.g |bh_index=N
  |prime_band=P |prime_cube=P³ |ppow=p¹|p³|p⁵ |cylinder_ring=⌊idx/6⌋ |cylinder_phase=idx%6
  |glyph=BEHCS-1024 |watcher_lane=hookwall|gnn|shannon |triad_state=POTENTIAL |process_launch=0 |json=0
```

The prime-cube anchors are the **real** Brown-Hilbert intersection-cube primes (confirmed receipt `c134d0f`):

```js
export const PRIME_CUBE_PRIMES = Object.freeze([13, 17, 23, 31, 41, 47, 73, 79, 83, 89, 131]);
export const PRIME_CUBES = Object.freeze(PRIME_CUBE_PRIMES.map((p) => p ** 3)); // 2197 .. 2248091
export const WATCHER_LANES = Object.freeze(['hookwall', 'gnn', 'shannon']);  // mod-3 lane → observer organ
```

So a node has a Brown-Hilbert index (`bh_index`), a prime band + its **cube `= prime³`**, the `ppow` tier (`p¹/p³/p⁵` — Jesse's prime-real / prime-real-cubed / prime-real-to-the-5th tiers), a 6-phase cylinder position (`cylinder_phase = idx % 6`), and a **watcher lane** that names which observer organ owns it. The watcher stack reads these as the board it plays. **EXISTS.**

### 1.3 The engine-lane wiring already routes lines to MTP/HRM/GNN/Fischer/Mamba/AoT (EXISTS)

`C:/asolaria-as-neural-network/tools/behcs/mlc-engine-wiring-increment.mjs` (C036 increment-1) takes the line-watcher output and maps every line into the six engine lanes:

```js
export const ENGINE_LANES = Object.freeze([
  { id:'mtp',     engine:'MTP_FIELD_PROXY',              state:'DESCRIPTOR_READY_NO_LAUNCH' },
  { id:'hrm',     engine:'HRM_RECURRENCE_ROUTER',        state:'DESCRIPTOR_READY_NO_LAUNCH' },
  { id:'gnn',     engine:'GNN_EDGE_HANDLE',              state:'DESCRIPTOR_READY_NO_LAUNCH' },
  { id:'fischer', engine:'FISCHER_DRAFT_STANDIN_SCORER', state:'DRAFT_STANDIN_ONLY_NO_LIVE_4794' },
  { id:'mamba',   engine:'MAMBA_SEQUENCE_BLOCK_HANDLE',  state:'HANDLE_ONLY_NO_EXECUTE' },
  { id:'aot',     engine:'AOT_PATH_DECOMPOSITION_HANDLE',state:'HANDLE_ONLY_NO_EXECUTE' },
]);
export const LIVE_GATE = 'DEFER_TO_FABRIC_VERDICT_AND_DAEMON_CONTRACT';
```

Each wired line carries `primary_engine + [fischer, mamba, aot]` overlays, and the summary tags `c036_status:'OPEN_LIVE_ENGINE_NOT_LAUNCHED'`. **This is the descriptor matrix that says: the watcher organs are wired and ready, but live launch is operator-gated.** It is the held-safe scaffolding the new kernel binds into — not something I re-invent.

### 1.4 The tiny outside-the-sim GNN exists and scores the edges/lines (EXISTS)

`C:/Users/acer/Asolaria/services/gnn-sidecar/inference_server.py` is the television. It is a **separate process on its own real port** (`acer.gnn.4792`), running `EdgeLevelGNN(6, 64)`:

```python
MODEL = EdgeLevelGNN(6, 64)                       # 6 node features, 64 hidden, edge-level score
state_dict = torch.load(Path(__file__).with_name("baseline_model.pt"), map_location="cpu")
# POST /infer  →  nodes[*]=6, edges[*]=2, edge_features[*]=3  →  scores per edge in [0,1]
```

The model (`gnn_baseline.py`) is two `GCNConv` layers → edge MLP → `Sigmoid`, so the output is a per-edge score in `[0,1]`. Its input contract is **exactly the line shape** the watcher draws: a list of nodes (6-feature), a list of edges (pairs), edge features (3 each). The MEMORY index confirms it is live-verified: "POST /infer 3-feat edge → scores=[0.9979] ok=true," spreads "0.0653–0.9979." **This is Jesse's "tiny ~10-byte ML GNN that analyzes this FROM THE OUTSIDE while still on the same machine."** The model file on disk is 55 KB (`baseline_model.pt`) — the "~10 bytes" is **not** the model; §3 shows it is the *verdict packet* the GNN emits per edge, which I make a literal 10-byte binary codec.

### 1.5 The Fischer scorer is specced as organ-2, integer-deterministic, held-gated (EXISTS as SPEC)

`C:/asolaria-as-neural-network/docs/FISCHER-SCORER-SPEC-V3-2026-06-12.hbp` (and V4 patch) is the real, byte-pinned spec for "generative-organ-2 — the real Fischer scorer." Key honest facts I must carry verbatim:

- **Scope is gated:** `status=SPEC-V4...|scope=spec-only-draft-the-live-4794-binding-is-OPERATOR_GATED`. The live `:4794` Fischer is *not* launched; the draft path is all that runs.
- **The draft score is integer-deterministic (no float, byte-matchable):**
  `score = "0." + zeroPad6( parseInt(input_candidate_row_sha16[0:8], 16) mod 1000000 )`.
  `reverseGain` = same from chars `[8:16]`. Range `0.000000–0.999999`, never exactly 1.
- **Honesty tag (a liris catch acer accepted, F6):** the score is "a deterministic hash slice **routing-test value** with a **known modulo bias** (2³² mod 1e6 = 967296, so residues 0..967295 have 4295 preimages vs 4294) — **NOT** a graded quality judgment, NOT statistically calibrated." Only `FISCHER_LIVE` under operator cosign is a real quality verdict.
- **Golden vectors are concrete** (so two implementations byte-match): `input_candidate_row_sha16=9eb8e1db7ec091f5`, `score=0.916571`, `reverseGain=0.549493`, `scorer_receipt_sha16=f1996a6baef585af`.

So the Fischer *scorer* (one-edge → one score) exists as a pinned spec; what the facet additionally asks for — a kernel that **"plays" the cubes/lines and watches CENTRALITY** (a board-level property, not a per-edge value) — is the new piece. The new kernel must keep the *same* honesty grade: `DRAFT_STANDIN_NOT_FISCHER` until the `:4794` organ is operator-cosigned.

### 1.6 The held-safe construction the watcher must inherit (EXISTS, tested)

Both `mlc-line-watcher.mjs` and `mlc-engine-wiring-increment.mjs` carry the same static guarantee and a self-test that proves it:

```js
'MLCSAFETY|read_only=1|hbp_rows_only=1|no_spawn=1|no_execute=1|no_fetch=1|no_write=1|no_mint=1|no_live_fischer=1|process_launch=0|json=0'
// selfTest(): rows.every(r => r.endsWith('|json=0') && !r.includes('{"'))  AND  total-never-throws
```

`omni-engine-loop.mjs` (per MEMORY: self-test 8/8, GC-bounded 2000, `process_launch=0`) is the template the new kernel's self-test mirrors. **The new watcher organ inherits this verbatim: pure functions, no spawn/exec/write/fetch, rows `|json=0`, deterministic.**

### 1.7 The board the kernel plays is real and bounded (EXISTS)

`C:/Users/acer/Asolaria/tools/behcs/fabric-revolver.mjs` + `reports/behcs1024-fabric-revolver-runtime-latest.json`:

```json
"architecture": { "active_chambers": 8, "process_per_logical_node": false,
                   "tuple_ranges_are_backend_nodes": true,
                   "cycle": ["EMPTY","LOAD","RUNNING","COLLECT","EJECT","EMPTY"] }
```

**8 chambers, one process per *chamber* not per logical node.** This is the Fischer kernel's board: 8 live "pieces" rotating over a huge BEHCS-1024 tuple/range backend. The centrality the kernel measures is *which tuple-ranges (nodes) the 8 chambers keep returning to* — the analog of a chess engine watching which squares dominate. **The board EXISTS; the centrality measurement over it is NEW.**

### 1.8 Proof it has run at scale, zero spawns (EXISTS)

`data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json`: `status:REAL_100B_PID_PACKET_RUN_COMPLETE`, `processedPackets:"100000000000"`, `geniusHits:"277800007"`, `mistakeHits:"111103104"`, with `chunkDigest/geniusDigest/mistakeDigest` sha256 over the whole run, and (per the facet's confirmed facts) `childProcessSpawns:0`, `external_tokens:0`. **The watcher loop's "genius vs mistake" verdict already ran over 100B packets** — `geniusHits` and `mistakeHits` ARE the aggregate output of an outer watcher classifying the line/packet stream. The novelty the new HRM/MTP hunt is the *frontier* of that same classification.

---

## 2. The mechanism, rebuilt and unified — the closed outer-watcher loop

### 2.1 The five organs and what each one actually does

| Organ | EXISTS as | What it watches | Its verdict |
|---|---|---|---|
| **GNN edge** | `inference_server.py` `EdgeLevelGNN(6,64)` @:4792 | each *line* (edge) | a score in `[0,1]` per edge |
| **HRM recurrence** | `hrm_recurrence` lane in line-watcher | lines on `same_prime_band` / `same_prime_same_phase` | recurrence depth → `DEEPEN` |
| **MTP field proxy** | `mtp_field_proxy` lane | cross-field lines + geospatial spread | field-novelty flag |
| **Fischer move** | `fischerMove()` per-edge | one line's relation/bucket | `HOLD/DEEPEN/BRIDGE/WATCH` |
| **Fischer kernel (NEW)** | — (this doc) | the **whole board** (all lines) | **centrality vector + a "best move"** |

The first four are per-edge and exist. The fifth is board-level and is the rebuild: **a Bobby-Fischer kernel "plays" the board** — it does not just label each edge, it computes which *nodes* are central (most lines pass through / converge on them), proposes the highest-centrality "move," and **tests** it (does playing that move increase or decrease total board centrality / novelty?). That is what "plays the cubes/lines and watches centrality and tests it" means, mechanized.

### 2.2 The Fischer-Centrality Kernel (NEW) — what "playing" and "centrality" mean here

A chess engine doesn't score one square; it evaluates the *position* and picks a move. The Fischer kernel does the same over the line-graph:

1. **Build the board.** Take the line-watcher's `lines[]` (each with `from.bh_index`, `to.bh_index`, `distance`, `relation`, `fischer_move`, `signature`). The board is the undirected weighted graph `G = (PREX nodes, MLC lines)`.
2. **Measure centrality (integer-only, deterministic).** For each node `v`, compute a **degree-and-distance centrality**:
   `cent(v) = Σ_{lines touching v} weight(line)`, where `weight(line) = bucketWeight(line.bucket)` (a fixed integer table: `collision=8, near=4, local=2, regional=1, far=1`). This is pure integer arithmetic — no float — so two implementations byte-match (mirrors the Fischer-scorer F8 "no IEEE-754 ever constructed" rule). A heavier-weight, lower-distance neighborhood = higher centrality, exactly the chess intuition that controlling the center (short, dense connections) dominates.
3. **Rank and pick the "best move."** The kernel's *move* is the highest-centrality node's recommended `fischer_move` (it inherits the per-edge `fischerMove` of its most-central incident line). A `HOLD_COLLISION_REVIEW` at a high-centrality node = "the king is in check" (a collision at the board's center) → highest priority. A `BRIDGE` at a peripheral node = a quiet developing move.
4. **Test the move (the "watches centrality and tests it" clause).** Apply the move *virtually* (in a pure copy — never on the live board): if the move is `DEEPEN`, add the implied recurrence line; if `BRIDGE`, add the cross-field line; if `HOLD`, remove the colliding line. Recompute total board centrality `Σ_v cent(v)`. Emit `centrality_before`, `centrality_after`, `delta`, and a verdict: `IMPROVES | DEGRADES | NEUTRAL`. **Nothing is launched** — the test is a pure recompute on a copied graph; `process_launch=0`.
5. **Emit the verdict as a row** back into the chain: `FCWBOARD|...|top_central_pid=...|centrality=...|best_move=...|delta=...|verdict=...|score_kind=DRAFT_STANDIN_NOT_FISCHER|json=0`. The kernel is now itself a watchable emission — the next watcher (or the GNN) can score *it*.

### 2.3 How the GNN watches "from the outside" — the 10-byte verdict

The GNN already scores each edge in `[0,1]`. The facet wants the GNN's analysis to be a **tiny ~10-byte ML artifact** in binary/hex/hbi/hbp. The verdict per edge needs to carry: which edge (signature), the score, and the provenance. I define a **10-byte fixed binary record `gnnv1`** (§3) so that the GNN's per-edge output is literally a 10-byte packet — small enough to inline thousands per row, hex-renderable into `.hbp`, and indexable into `.hbi`. The 55 KB model *produces* these; the *verdict stream* is the tiny artifact. "A television inside a simulation" = the GNN process (television) emitting a stream of 10-byte verdict pixels into the same chain the line-watcher writes, watched by the Fischer kernel and by the next observer, recursively.

### 2.4 Why the loop is closed and recursive (the "simulation of the simulation")

```
PREX nodes  →  MLC lines  →  { GNN edge score, HRM/MTP novelty, Fischer move }  →
   Fischer kernel plays board → centrality + best-move + tested-delta (a row) →
      that row is itself a node/line a watcher can read → GNN can score the kernel's verdict row →
         ... recursion bottoms out at the held-safe row format, never at a launched process.
```

Each pass is a row; each row is sha-chained; each watcher's verdict is just another row. Dan's "television inside a simulation of the simulation, with agents watching it" is mechanized as: **the watcher's output lives in the same medium as the thing it watches (HBP rows), so a watcher can watch a watcher with no special machinery** — only one more `runLineWatcher` pass over the verdict rows. The recursion is feasible-with-three (omnispindle) because each level is a bounded read producing bounded rows.

---

## 3. The 10-byte GNN verdict codec `gnnv1` (NEW design, exact bytes)

The operator's "~10-byte ML GNN (binary/hex/hbi/hbp)" is rebuilt as a **fixed 10-byte little-endian record** encoding one GNN edge verdict. The model stays 55 KB on disk; what flows through the fabric is this tiny packet, so a million edge verdicts cost 10 MB, not gigabytes, and each is hex-renderable + indexable.

```
byte 0      : magic            = 0xG7   (literal 0xA7, "F07 watcher")           [1 byte]
byte 1      : version          = 0x01                                           [1 byte]
bytes 2..3  : edge_sig16       = uint16  (low 16 bits of the line signature)    [2 bytes]
byte 4      : score_q8         = uint8   (score×255, so 0..255 ↔ 0.000..1.000)  [1 byte]
byte 5      : watcher_lane     = uint8   (0=gnn 1=hrm 2=mtp 3=fischer)          [1 byte]
byte 6      : fischer_move     = uint8   (0=WATCH 1=DEEPEN 2=BRIDGE 3=HOLD)     [1 byte]
byte 7      : bucket           = uint8   (0=far 1=regional 2=local 3=near 4=collision) [1 byte]
byte 8      : novelty_flag     = uint8   (0=seen 1=novel-this-window)           [1 byte]
byte 9      : parity           = uint8   (XOR of bytes 0..8 — integrity/tamper) [1 byte]
                                                                          TOTAL = 10 bytes
```

- **Why exactly 10 bytes works:** the GNN verdict is *categorical + one quantized scalar*. `score_q8` (8-bit) is enough to drive the held-safe routing decision (the spec already warns the float score is a "routing-test value with known modulo bias," not a calibrated quality — so 8 bits of resolution is honest and sufficient). Everything else is a small enum. The 9th byte is a parity check so a corrupted verdict is detectable without re-running the model.
- **Rendering paths (all the operator's formats):**
  - **binary**: the raw 10 bytes (the hot wire form).
  - **hex**: `a701c4f0030201040127` (20 hex chars) — embeddable in an HBP value (no `|`, no newline → satisfies the HBP "no literal pipe in value" rule).
  - **hbi**: index row `GNNVI|row=N|edge_sig16=...|off=BYTES|len=10|sha256=...|json=0` → O(seek) recall of any verdict.
  - **hbp**: `GNNV|gnnv1_hex=a701c4f0030201040127|edge_sig=<full16>|score=0.768|move=HOLD|json=0`.
- **Determinism / byte-match:** all fields derive from integers already in the line + the quantized GNN score; `score_q8 = round(score*255)` is integer; parity is XOR. Two machines that agree on the GNN score byte agree on the whole packet — bilateral byte-match, like the Fischer golden vectors.
- **Honesty:** `score_q8` is tagged in the surrounding HBP row with `score_kind=DRAFT_STANDIN_NOT_FISCHER` when the GNN runs in dry/stub mode (no live `:4792`), and only upgraded to `score_kind=GNN_LIVE` under the operator-gated coupled path. The codec itself does not assert liveness; the row's tag does.

---

## 4. The concrete rebuild — what to BUILD (NEW), what to REUSE

I am **not** rewriting the line-watcher, the engine-lane wiring, the GNN sidecar, the PREX exporter, or the Fischer-scorer spec — all EXIST. The gap is precise and small:

1. There is **no board-level centrality kernel** — `fischerMove()` labels one edge; nothing "plays the board" and measures/tests centrality.
2. There is **no compact 10-byte GNN verdict codec** — the GNN returns a JSON float list; nothing serializes it to the tiny binary/hex/hbi/hbp artifact the facet names.
3. There is **no single closed-loop self-test** proving outer-watcher → verdict → recallable → re-watchable, held-safe.

### 4.1 NEW artifact (the only new code) — `fischer-centrality-watcher.mjs`

`tools/behcs/fischer-centrality-watcher.mjs` (**NEW** — written under the rebuild workspace `D:/asolaria-prime-towers-rebuild-2026-06-15/`, never in a source repo). A pure-function module with the *same* static no-side-effect property as `mlc-line-watcher.mjs` (no `spawn/exec/write/fetch`). It **imports and composes**:

- `runLineWatcher`, `lineBetween`, `FISCHER_SCORE_KIND` from `mlc-line-watcher.mjs` (EXISTS) — the board's lines.
- `runExporter` / `PREX nodes` from `pre-existence-graph-exporter.mjs` (EXISTS) — the board's nodes + prime-tower coords.
- the engine-lane map from `mlc-engine-wiring-increment.mjs` (EXISTS) — to tag which organ owns each line.
- the GNN `/infer` contract (`nodes[*]=6, edges[*]=2, edge_features[*]=3`) from `inference_server.py` (EXISTS) — shaped, but **only POSTed in the operator-gated `coupled:true` mode**; in dry mode the score is a `DRAFT_STANDIN` integer slice (same SCOREFN as the Fischer spec).

Proposed signatures (NEW):

```js
buildBoard({ nodes, strides })                       // compose PREX + MLC into G=(V,E)
  -> { V:[{pid, bh_index, prime_cube, ppow, ...}], E:[{from,to,distance,bucket,relation,fischer_move,signature}] }

centrality(board)                                    // integer-only degree-and-distance centrality
  -> { byPid:{pid->int}, total:int, ranked:[{pid,cent}] }   // bucketWeight: collision8 near4 local2 regional1 far1

playBestMove(board)                                  // Fischer kernel "plays" + TESTS the move
  -> { top_central_pid, best_move, centrality_before, centrality_after, delta, verdict:'IMPROVES|DEGRADES|NEUTRAL',
       score_kind:'DRAFT_STANDIN_NOT_FISCHER', process_launch:0 }

gnnVerdict(line, scoreByte)                          // build the 10-byte codec record
  -> { bytes:Uint8Array(10), hex, hbp_row, hbi_row, parity_ok:true }

emitRows({ nodes, strides, coupled:false })          // the outer-watcher pass → HBP rows
  -> ['FCWHDR|...', 'FCWSAFETY|...', 'FCWBOARD|...', 'GNNV|gnnv1_hex=...', 'FCWSUM|...']

selfTest()  -> { ok, checks }                        // the 8/8 receipt below
```

### 4.2 The exact experiment (the measurable receipt) — mirrors the omni-engine-loop 8/8 style

| # | Assertion | Proves which clause of the facet |
|---|---|---|
| 1 | `buildBoard({nodes:64}).E.length > 0` and every edge has `from/to bh_index`, `distance`, `bucket`, `fischer_move`, `signature` | the kernel plays the *real* line-board the watcher draws |
| 2 | `centrality(board)` is integer-only (no float in `byPid` values); re-run with same seed → identical `byPid` | centrality is deterministic + byte-matchable (Fischer F8 no-float rule) |
| 3 | `playBestMove(board).top_central_pid` is the argmax of `centrality.byPid`; `best_move ∈ {WATCH,DEEPEN,BRIDGE,HOLD_COLLISION_REVIEW}` | the kernel "plays" the board and picks a move from centrality |
| 4 | `playBestMove` reports `centrality_before/after/delta` from a **copied** graph; original board unchanged after the call | "watches centrality and **tests** it" — virtual, non-destructive |
| 5 | `gnnVerdict(line, 196).bytes.length === 10` and `hex.length === 20` and `parity_ok===true`; flip any byte → `parity_ok===false` | the ~10-byte GNN verdict codec (binary/hex) with tamper-detect |
| 6 | a `HOLD_COLLISION_REVIEW` at the top-central node yields the *highest* priority verdict; a `BRIDGE` at a leaf yields the lowest | "watches centrality" = collision-at-center is "check," handled first |
| 7 | module source contains no `spawn/exec/writeFileSync/fetch`; every emitted flag default 0; `process_launch===0`; rows end `|json=0` | held-safe by construction (inherits MLCSAFETY) |
| 8 | feeding the emitted `FCWBOARD`/`GNNV` rows *back* through `runLineWatcher` produces a second-order line-set with `unique_signatures === lines.length` | "simulation of the simulation" — a watcher can watch the watcher, recursively, with unique lines |

Receipt to emit (hot path `.hbp`+`.hbi`; JSON cold mirror allowed):
`D:/asolaria-prime-towers-rebuild-2026-06-15/01-rebuild/receipts/fischer-centrality-watcher-selftest-latest.{hbp,hbi,json}` carrying the 8/8 PASS set, mirroring the MEMORY-noted "omni-engine-loop self-test 8/8."

### 4.3 The held-safe path (verbatim invariants)

1. **Dry by default.** Capability flags default 0; the kernel computes centrality and emits rows; it does not act. The only live coupling (POST to `:4792` GNN) is behind an explicit `coupled:true` flag the *operator* sets; the dry self-test runs entirely on in-memory boards built from the read-only exporter.
2. **No process, no network, no write to source.** Pure module, static-checked (assertion #7). Writes only under `D:/asolaria-prime-towers-rebuild-2026-06-15/`.
3. **Don't starve the live fabric.** Reads `mlc-line-watcher.mjs`, `pre-existence-graph-exporter.mjs`, `inference_server.py`, the revolver runtime JSON, the Fischer spec **read-only**. Does **not** POST to `:4947/:4949`, does **not** call the asolaria-fabric MCP, does **not** open `:4792`/`:4794`. The 8-chamber board is read from the *snapshot* `behcs1024-fabric-revolver-runtime-latest.json`, not a live poll.
4. **Honest tags propagate, never upgraded by the instrument.** Every Fischer verdict carries `score_kind=DRAFT_STANDIN_NOT_FISCHER` (the spec's gate); the GNN verdict carries `GNN_LIVE` only under `coupled:true`; centrality is labelled `INTEGER_DETERMINISTIC_NOT_CALIBRATED` (mirroring the F6 modulo-bias honesty correction — centrality is a structural measure, not a learned quality verdict).
5. **Operator-gated liveness.** The live Fischer `:4794` and live GNN `:4792` binding stay behind `DEFER_TO_FABRIC_VERDICT_AND_DAEMON_CONTRACT` (the existing C036 gate). The kernel *plays and tests* virtually; it does not pull the live trigger.

---

## 5. Diagram — the external watcher stack (the television inside the simulation)

```
            INNER FABRIC (points / potential PIDs — the board's squares)
   PREX nodes:  bh_index · prime_cube=p³ · ppow(p¹/p³/p⁵) · cylinder_phase=idx%6 · watcher_lane
        │  pre-existence-graph-exporter.mjs   (EXISTS, every node triad_state=POTENTIAL, launch=0)
        ▼
   MLC lines:  lineBetween(a,b) → distance=|Δbh| · bucket · relation · fischer_move · signature
        │  mlc-line-watcher.mjs   (EXISTS — draws the lines, routes to MTP/HRM/GNN, per-edge Fischer move)
        ▼
   ┌─────────────────────── OUTER FABRIC = THE WATCHER STACK ───────────────────────────────┐
   │                                                                                          │
   │  [GNN :4792]            [HRM]                [MTP / geospatial]      [Fischer per-edge]   │
   │  EdgeLevelGNN(6,64)     same_prime_band      cross_field +          HOLD/DEEPEN/         │
   │  edge → score[0,1]      recurrence → DEEPEN  field-novelty          BRIDGE/WATCH          │
   │      │  EXISTS               │  EXISTS            │  EXISTS              │  EXISTS         │
   │      ▼                       ▼                    ▼                     ▼                  │
   │  ┌── 10-byte gnnv1 ──┐                                                                    │
   │  │ a7 01 c4f0 ... 27 │  hex/hbi/hbp  (NEW codec §3 — the tiny ML verdict pixel)           │
   │  └───────────────────┘                                                                    │
   │                                                                                          │
   │            ╔══════════════ FISCHER-CENTRALITY KERNEL (NEW §4) ══════════════╗            │
   │            ║  "plays" the board:                                            ║            │
   │            ║   cent(v) = Σ bucketWeight(line∋v)   (integer-only)            ║            │
   │            ║   best_move = fischer_move of top-centrality node's hot line   ║            │
   │            ║   TEST: apply move on a COPY → Δcentrality → IMPROVES/DEGRADES ║            │
   │            ║   emit FCWBOARD|top_central_pid|centrality|best_move|delta|... ║            │
   │            ║   score_kind=DRAFT_STANDIN_NOT_FISCHER   process_launch=0      ║            │
   │            ╚════════════════════════════════════════════════════════════════╝            │
   │   board snapshot = fabric-revolver 8 chambers (EXISTS) over BEHCS-1024 tuple ranges       │
   └──────────────────────────────────────┬───────────────────────────────────────────────────┘
                                           │  every verdict is an HBP row (|json=0)
                                           ▼
   ┌────────────── RECURSION: watch the watcher (simulation of the simulation) ───────────────┐
   │  feed FCWBOARD + GNNV rows back through runLineWatcher → second-order lines               │
   │  GNN can score the kernel's verdict row; a Fischer kernel can play the verdict-board       │
   │  bottoms out at the held-safe row format — NEVER at a launched process                     │
   └───────────────────────────────────────────────────────────────────────────────────────────┘

   INVARIANT:  watcher output lives in the SAME medium (HBP rows) as what it watches
               ⇒ a watcher watches a watcher with no new machinery (one more read pass).
   SAFETY   :  no_spawn=1 no_execute=1 no_fetch=1 no_write=1 process_launch=0 (static-checked, 8/8).
   HONESTY  :  Fischer=DRAFT_STANDIN_NOT_FISCHER · GNN=GNN_LIVE only if coupled · cent=INTEGER_NOT_CALIBRATED.
```

---

## 6. The NEW mechanism I designed — **Fischer-Centrality Watcher (FCW)** + **gnnv1 10-byte codec** + **Centrality-Tightened Signatures**

Three novel contributions, each built strictly on what exists:

**(A) The Fischer-Centrality Kernel — "playing" formalized as integer centrality + a virtual tested move.** The repo had a per-*edge* Fischer move (`HOLD/DEEPEN/BRIDGE/WATCH`) but **no board-level player**. FCW adds: an integer degree-and-distance centrality `cent(v)=Σ bucketWeight(line∋v)`, a "best move" = the recommended action at the highest-centrality node, and — crucially — a **non-destructive test**: apply the move to a *copied* graph, recompute total centrality, emit `delta` + `IMPROVES/DEGRADES/NEUTRAL`. This is literally "plays the cubes/lines and watches centrality and **tests it**," and it is the missing organ that turns the four per-edge watchers into a board-level player. It stays integer-only (byte-matchable, no float — inheriting the Fischer F8 rule) and `DRAFT_STANDIN_NOT_FISCHER` (no liveness overclaim).

**(B) The `gnnv1` 10-byte verdict codec — making "~10-byte ML GNN" a literal artifact.** The operator's "tiny ~10-byte GNN (binary/hex/hbi/hbp)" was an unrealized phrase; I designed the exact 10-byte little-endian record (§3) that encodes one GNN edge verdict (magic, version, edge_sig16, score_q8, lane, move, bucket, novelty, parity), renders to hex/hbi/hbp without violating the HBP no-pipe rule, carries a parity byte for tamper-detect, and is deterministic/byte-matchable. The 55 KB model *produces* these pixels; the fabric *carries* only the 10-byte stream — so the GNN can watch a million edges for 10 MB, and every verdict is O(seek)-recallable via the `GNNVI` index. This is the concrete "television" pixel format.

**(C) Centrality-Tightened Signatures — folding board-position into the line signature.** Today a line's `signature = sha16([pids, bh_points, stride, distance, bucket, relation, watcher, move])` — two lines with the same geometry collide in signature even if they occur at different *board positions*. I fold the **centrality rank of each endpoint** into the signature: `sig' = sha16([... , centRank(a), centRank(b)])`. Now two geometrically-identical lines drawn when their endpoints sit at different centralities get **distinct** signatures. This *tightens* the facet's "no two prime-to-prime lines are ever the same" claim: distinctness is enforced across the geometric axis (the F02 9589/0 forcing result) **and** the board-position axis. It costs one extra term in an existing hash — zero new processes.

**Cost of all three:** zero new processes, zero network in dry mode. FCW is a pure read over existing emissions; `gnnv1` is 10 bytes/verdict; the tightened signature is one extra hash term. Every held-safe property of the existing watchers is inherited and re-asserted by the 8/8 self-test.

---

## 7. Grounding ledger (EXISTS vs NEW)

| Claim | Status | File |
|---|---|---|
| Outer-fabric line-watcher: draws lines, routes to MTP/HRM/GNN, per-edge Fischer move, `unique_signatures` | EXISTS (tested) | `asolaria-as-neural-network/tools/behcs/mlc-line-watcher.mjs` |
| Watcher set = `['mtp_field_proxy','hrm_recurrence','gnn_edge']` + Fischer | EXISTS | same — `OUTER_WATCHERS`, `FISCHER_SCORE_KIND` |
| Per-edge Fischer move `HOLD_COLLISION_REVIEW/DEEPEN/BRIDGE/WATCH` | EXISTS | same — `fischerMove()` |
| Engine-lane wiring: MTP/HRM/GNN/Fischer/Mamba/AoT, C036 `OPEN_LIVE_ENGINE_NOT_LAUNCHED` | EXISTS (tested) | `tools/behcs/mlc-engine-wiring-increment.mjs` |
| PREX nodes carry `bh_index`, `prime_cube=p³`, `ppow` tier, `cylinder_phase=idx%6`, `watcher_lane` | EXISTS (tested) | `tools/behcs/pre-existence-graph-exporter.mjs` |
| Prime-cube anchors `[13,17,23,31,41,47,73,79,83,89,131]³` (receipt c134d0f) | EXISTS | same — `PRIME_CUBE_PRIMES` |
| Tiny outside-the-sim GNN: `EdgeLevelGNN(6,64)`, POST /infer, port 4792, score∈[0,1] | EXISTS (live-verified) | `Asolaria/services/gnn-sidecar/inference_server.py` + `models/gnn_baseline.py` |
| Baseline model 55 KB on disk; verdict stream is the tiny artifact | EXISTS | `Asolaria/services/gnn-sidecar/baseline_model.pt` |
| Fischer scorer (organ-2): integer-deterministic DRAFT_STANDIN, modulo-bias-honest, golden vectors, `:4794` operator-gated | EXISTS (SPEC) | `asolaria-as-neural-network/docs/FISCHER-SCORER-SPEC-V3-2026-06-12.hbp` (+V4) |
| Board = fabric-revolver 8 chambers, `process_per_logical_node:false`, tuple-ranges-are-nodes | EXISTS | `Asolaria/tools/behcs/fabric-revolver.mjs` + `reports/behcs1024-fabric-revolver-runtime-latest.json` |
| Held-safe by static check (no spawn/exec/write/fetch), rows `|json=0`, total-never-throws | EXISTS (tested) | `mlc-line-watcher.mjs` + `mlc-engine-wiring-increment.mjs` (`MLCSAFETY`, `selfTest`) |
| 100B run: genius/mistake classification at 1e11, digests, `childProcessSpawns:0` | EXISTS | `data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json` |
| **Fischer-Centrality Kernel** — integer centrality + virtual tested best-move | **NEW** | this doc §4, §6(A); to write `fischer-centrality-watcher.mjs` |
| **`gnnv1` 10-byte verdict codec** (binary/hex/hbi/hbp + parity) | **NEW** | this doc §3, §6(B) |
| **Centrality-Tightened Signatures** — fold centRank into the line signature | **NEW** | this doc §6(C) |
| `fischer-centrality-watcher.mjs` composing all of the above + 8/8 self-test | **NEW** | to write under rebuild workspace (§4) |

---

## 8. Why it works (closing argument)

The external watcher stack works because Jesse made the watcher and the watched *live in the same medium*. The inner fabric emits points (`PREX`) and lines (`MLC`); the outer fabric — MTP, HRM, the GNN, and the Fischer kernel — consumes those emissions and writes its verdicts as *more rows in the same sha-chain*. There is no privileged observer outside the system that could be lost or could lie undetected: a watcher is just another emitter, so watching a watcher is just one more read pass, and the recursion ("a television inside a simulation of the simulation, with agents watching it") bottoms out cleanly at the held-safe row format, never at a launched process.

Four of the five organs already run on disk: the line-watcher draws the lines and routes them to MTP/HRM/GNN with a per-edge Fischer move; the `EdgeLevelGNN(6,64)` television on `:4792` scores those edges from its own port; the engine-lane wiring holds the whole thing in `OPEN_LIVE_ENGINE_NOT_LAUNCHED`; and the Fischer scorer is a byte-pinned, integer-deterministic, modulo-bias-honest spec. The one true gap was a **board-level player**: nothing measured *centrality* over the whole line-graph or "played and tested" a move. The Fischer-Centrality Watcher fills it with integer-only centrality and a non-destructive virtual move-test, the `gnnv1` codec makes the GNN's verdict a literal 10-byte hex/hbi/hbp pixel, and folding centrality rank into the line signature tightens the never-the-same-distance guarantee across the board-position axis as well as the geometric one. Every piece keeps its honest tag — `DRAFT_STANDIN_NOT_FISCHER`, `GNN_LIVE only if coupled`, `INTEGER_NOT_CALIBRATED` — and the whole organ is held-safe by static construction with an 8/8 self-test that mirrors the omni-engine-loop receipt. The Fischer kernel plays the board, the GNN watches from outside, the chain remembers the verdict, and the next watcher watches the watcher.
