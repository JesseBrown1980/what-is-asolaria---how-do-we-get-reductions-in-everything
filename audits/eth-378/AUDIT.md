# Read-only formal audit: openai/math result 378, "The Exponential Time Hypothesis is False"

This audit checks the Lean artifact OpenAI published for its ETH claim. It does not
modify the artifact. It is kept on its own branch and is not part of any Yang–Mills
branch, certificate or receipt.

## A. Provenance

| item | value |
|---|---|
| repository | `openai/math`, commit `7ef5c0cc5ca4b0e072b7a050fca09ab24bc6fa3a` (2026-10-26) |
| toolchain | `leanprover/lean4:v4.34.1` (the repository's own `lean-toolchain`) |
| mathlib | `d13f23b723b8a846827a245b89c10fc7d3f11612` (the repository's own pin) |
| audited sources | `lean/OAI/Algorithms/SubexponentialSAT/`: 3,977 `.lean` files, tree SHA-256 `2321c93a…7cab7a` |
| challenge statement | `lean/ComparatorChallenges/SubexponentialSAT.lean`, SHA-256 `4183b205…a76685` |
| comparator config | `SubexponentialSAT.json`, SHA-256 `debbfdc9…7c5b19`; theorem `…SqrtLogSpace.exact_count_and_sat`; permitted axioms `propext`, `Quot.sound`, `Classical.choice` |
| scope note | `lean/docs/378.md`, SHA-256 `a2f7b390…31f79` |
| paper | `paper.pdf`, SHA-256 `5b1612dc…e8123` |

`fetch_sources.sh` fetches exactly these files at that commit and refuses to continue if
any hash differs. The solution module `OAI.Algorithms.SubexponentialSAT.Main` imports
3,091 of the 3,977 files (547,460 lines). They import only Mathlib and Lean core, and
nothing else in the openai/math library.

Text scan of the 3,977 files: no `sorry`, `admit`, `axiom`, `native_decide`,
`implemented_by`, `extern`, `unsafe`, `ofReduceBool` or `trustCompiler`. There is also no
code that runs at build time (`#eval`, `run_cmd`, `initialize`, custom `elab`, `macro`
or `syntax`). A text scan is not the audit. The axiom closure in B is.

## B. Kernel and axiom audit — *pending the full build*

The full build of 3,091 modules ran at about 2 modules per minute on this 2-core
sandbox, which would take more than a day. It therefore runs in
`.github/workflows/eth-lean-audit.yml` as a chain of bounded legs, and a timeout is never
counted as completion. When the build completes, the workflow:

1. runs `#print axioms` on the final theorem `exact_count_and_sat`, and on this audit's
   corollaries;
2. runs `EthAudit/Check.lean`, where the kernel must accept the solution theorem **at
   this audit's own copy of the statement**;
3. runs Lean's `comparator` (v4.34.0 sources, built against 4.34.1). It checks that the
   proved statement is the challenge statement and uses only the permitted axioms, with
   the solution build sandboxed by `landrun` in best-effort mode.

Known limits:
- The runner kernel's Landlock version decides how strong the sandbox is.
- Comparator's own setup assumes the solution was never compiled outside the sandbox
  before the check. This audit's first leg compiles it outside the sandbox. The scan
  above found no code that runs at build time.

## C. The theorem statement

Read against the challenge file (shown in full in `ComparatorChallenges/SubexponentialSAT.lean`):

| question | finding |
|---|---|
| Is `k` fixed, with constants allowed to depend on `k`? | Yes. The statement is `∀ k ≥ 2, ∃ machine C A S d e, ∀ n F, …`. One machine and one set of constants serve all `n`. |
| Is `n` the number of Boolean variables? | Yes. Formulas are `CNF (Fin n)` with assignments `Fin n → Bool`. The input bit length `L` is a separate quantity. |
| Is the count exact? Is SAT recovered from it? | Yes. The count tape holds `countWord (count F)` in binary, with `toNat (countWord (count F)) = count F`. The halting state and the answer tape are `decide (0 < count F)`. `count` is the cardinality of the satisfying assignments under the standard clause and literal semantics. |
| Does it cover every width-`k` CNF, with no promise? | Yes, under the single hypothesis `WidthAtMost k F`. The input is the **canonical** encoding: clauses and literals sorted, numbers in unary. This narrows only the input format. Canonicalising is polynomial, and the unary blow-up is polynomial, as proved in E. |
| Can the theorem be vacuous? | No. The constants are positive, the machine is fixed before `n`, and every formula has a trace that ends in an answer state. |
| Is the algorithm total and deterministic, in a computational model? | Yes. `step` is a function, so the run is deterministic. The run reaches an answer state, and an answer state takes no further step (`halted_of_answer`, below). The machine is a finite object: a finite number of tapes and states and a finite transition table over `{blank, 0, 1}`. |

## D. Runtime and space model

- **Model:** a deterministic multi-tape Turing machine. One step is one move or one
  write on one tape. There is no oracle, no RAM and no free arithmetic, so every bit
  operation is paid for.
- **Time:** `time ≤ C·(L+1)^d·2^(A·n(log log(n+16))²/√log(n+16))`. This is weaker than
  the manuscript's `n log log n/√log n` exponent, as `docs/378.md` says, but it is
  still `2^{o(n)}`.
- **Space:** at every step of the run, the visited tape cells number at most `S·(L+1)^e`.
- **Noncomputable choices:** constants and a size cutoff come from existential
  statements. They choose *which* finite machine, not *whether* one exists, and a finite
  machine is an algorithm. Extracting a runnable implementation requires that cutoff
  value. This matters for a later shadow counter, not for the truth of the statement.

## E. This audit's corollary: from the statement to "ETH is false"

`#print axioms` cannot show that the statement implies the refutation, so this audit
proves that step in Lean. The files are in `EthAudit/` and were written for this audit.
They use only definitions the statement itself uses.

| file | theorem | content |
|---|---|---|
| `BitLength.lean` | `formulaBitLength_poly` | `L + 1 ≤ (3 + (k+1)·2^k·(8k+4))·(n+1)^(k+1)` for every width-`k` CNF on `n` variables. The proof bounds the clause count by `(k+1)(2n+1)^k`. |
| `Asymptotic.lean` | `runtimeBound_eventually_le` | for every `δ > 0`, the statement's bound with `L + 1 ≤ c(n+1)^p` is eventually `≤ 2^(δn)` |
| `Bridge.lean` | `eth_form : SolutionStatement k → ETHForm k` | one fixed machine; for every `δ > 0` and all large `n`, it halts on every width-`k` CNF with the exact count and the SAT answer in at most `2^(δn)` steps |
| `Bridge.lean` | `halted_of_answer` | `time` is the halting time |
| `Check.lean` | `statement_is_solution`, `eth_refuted_3sat : ETHForm 3` | ties the copied statement to the proved theorem, then specialises to 3-SAT |

The first three are proved now. Their axioms are `propext`, `Classical.choice` and
`Quot.sound`, with no `sorry`. `Check.lean` runs when the full build completes.

## Verdicts

```text
FORMAL_BUILD:                    PENDING (bounded legs on GitHub Actions)
AXIOM_CLOSURE:                   PENDING
THEOREM_STATEMENT:               SOURCE-LEVEL MATCH (canonical-encoding input; polynomial blow-up proved in E);
                                 kernel tie pending Check.lean
RUNTIME_MODEL:                   ETH_REFUTING AS STATED, conditional on the formal build (multi-tape TM;
                                 implication to 2^(δn) proved in E)
INDEPENDENT_MATHEMATICAL_REVIEW: PENDING (Impagliazzo, Paturi, Williams)
```

### How the final verdict is read

The build runs as a chain of workflow runs, one per bounded leg. Each leg records
its predecessor (`prev_run`) and the workflow commit. The verdict comes only from the leg
whose `verdict.hbp` reads

```text
VERDICT|…|build_rc=0|check=success|comparator=success|status=COMPLETE
```

and that leg must run the fail-closed workflow from commit `0316194` or later (see below), never
from a green badge. The workflow is fail-closed:

- A build that exits with anything other than `0` (complete) or `124` (the bounded
  timeout, which starts the next leg) fails the job with `FORMAL_BUILD|FAIL`.
- `Check.lean` runs under `pipefail`. Its `#print axioms` output must be exactly four lines,
  one for each of the four named theorems, each within `propext`, `Quot.sound` and
  `Classical.choice`. Any other line fails it, including a warning, a missing theorem or
  an extra axiom.
- The comparator runs only after that check passes, also under `pipefail`.
- A last step writes the conjunction. `NOT_CERTIFIED` fails the job.

A clean comparator result is reported with the qualification in B: the solution was
first compiled outside the sandbox that comparator's trust model assumes.

Only when the first two pass and `Check.lean` is accepted will this audit state that
the Lean artifact appears to formalise an ETH-refuting theorem. Even that is a formal
check, not the independent mathematical certification being organised. The result stays
out of the Yang–Mills certification. A runnable counter derived from it could only ever
enter as an optional shadow behind the CNF-hash and exact-count cross-checks.
