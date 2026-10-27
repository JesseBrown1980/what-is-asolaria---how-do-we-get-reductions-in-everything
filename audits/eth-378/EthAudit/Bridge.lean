import OAI.Algorithms.SubexponentialSAT.SqrtLogSpace.VisitedTape
import OAI.Algorithms.SubexponentialSAT.SqrtLogSpace.EncodingBounds
import OAI.Algorithms.SubexponentialSAT.BinaryArithmetic
import EthAudit.BitLength
import EthAudit.Asymptotic

/-! Audit corollary, part 3 (written for this audit, not part of openai/math).

`SolutionStatement k` is the statement of
`OAI.Algorithms.SubexponentialSAT.SqrtLogSpace.exact_count_and_sat k hk`,
copied from `ComparatorChallenges/SubexponentialSAT.lean`. `Check.lean` asks the
kernel to accept the solution theorem at this type, so this copy is tied to the
proved statement and not only to our reading of it.

`eth_form` derives, from that statement alone, the conclusion ETH denies:
for fixed `k`, one fixed deterministic multi-tape machine halts on every
width-`k` CNF with the exact count and the SAT answer, in at most `2^(δ n)`
steps for every `δ > 0` and all large `n` (`n` = number of variables). -/

namespace EthAudit

open OAI.Algorithms.SubexponentialSAT
open OAI.Algorithms.SubexponentialSAT.SqrtLogSpace

def SolutionStatement (k : ℕ) : Prop :=
    ∃ (machine : Computation.PrimitiveMachine)
      (countTape answerTape : Fin machine.tapeCount)
      (C A S : ℝ) (d e : ℕ),
      0 < C ∧ 0 < A ∧ 0 < S ∧ 0 < d ∧ 0 < e ∧
      ∀ (n : ℕ) (F : SAT.CNF (Fin n)), SAT.WidthAtMost k F →
        ∃ (time : ℕ) (final : LocatedCfg machine),
          Computation.Trace (locatedStep machine) time
            (locatedInit machine (Encoding.encodeCNF F)) final ∧
          final.config.tapes countTape =
            Turing.Tape.mk₁ ((countWord (SAT.count F)).map some) ∧
          final.config.tapes answerTape =
            Turing.Tape.mk₁ [some (decide (0 < SAT.count F))] ∧
          final.config.state = Sum.inl (decide (0 < SAT.count F)) ∧
          BinaryArithmetic.toNat (countWord (SAT.count F)) = SAT.count F ∧
          (countWord (SAT.count F)).length ≤ n + 1 ∧
          (time : ℝ) ≤ OAI.Algorithms.SubexponentialSAT.SqrtLog.Statement.runtimeBound C A d
            (Encoding.formulaBitLength F) n ∧
          ∀ (prefixSteps : ℕ) (intermediate : LocatedCfg machine),
            prefixSteps ≤ time →
            Computation.Trace (locatedStep machine) prefixSteps
              (locatedInit machine (Encoding.encodeCNF F)) intermediate →
            (visitedSpace intermediate : ℝ) ≤
              S * ((Encoding.formulaBitLength F : ℝ) + 1) ^ e

/-- The ETH-refuting form: one machine, every `δ > 0`, all large `n`. -/
def ETHForm (k : ℕ) : Prop :=
    ∃ (machine : Computation.PrimitiveMachine) (countTape : Fin machine.tapeCount),
      ∀ δ : ℝ, 0 < δ → ∃ N : ℕ, ∀ n : ℕ, N ≤ n → ∀ F : SAT.CNF (Fin n),
        SAT.WidthAtMost k F →
        ∃ (time : ℕ) (final : LocatedCfg machine),
          Computation.Trace (locatedStep machine) time
            (locatedInit machine (Encoding.encodeCNF F)) final ∧
          final.config.state = Sum.inl (decide (0 < SAT.count F)) ∧
          final.config.tapes countTape =
            Turing.Tape.mk₁ ((countWord (SAT.count F)).map some) ∧
          BinaryArithmetic.toNat (countWord (SAT.count F)) = SAT.count F ∧
          (time : ℝ) ≤ (2 : ℝ) ^ (δ * n)

theorem eth_form (k : ℕ) (h : SolutionStatement k) : ETHForm k := by
  obtain ⟨machine, countTape, _answerTape, C, A, _S, d, _e, hC, _hA, _hS, _hd, _he, hrun⟩ := h
  refine ⟨machine, countTape, fun δ hδ => ?_⟩
  obtain ⟨N, hN⟩ := runtimeBound_eventually_le C A hC d
    (3 + (k + 1) * 2 ^ k * (8 * k + 4)) (k + 1) δ hδ
  refine ⟨N, fun n hn F hw => ?_⟩
  obtain ⟨time, final, htrace, hcount, _hanswer, hstate, hdecode, _hlen, htime, _hspace⟩ :=
    hrun n F hw
  exact ⟨time, final, htrace, hstate, hcount, hdecode,
    htime.trans (hN n hn _ (formulaBitLength_poly F hw))⟩

end EthAudit

namespace EthAudit
open OAI.Algorithms.SubexponentialSAT OAI.Algorithms.SubexponentialSAT.SqrtLogSpace

/-- A configuration in an answer state takes no further step: `time` in
`ETHForm` is the run's halting time, not a point inside a longer run. -/
theorem halted_of_answer {machine : Computation.PrimitiveMachine}
    (c : LocatedCfg machine) (b : Bool) (h : c.config.state = Sum.inl b) :
    locatedStep machine c = none := by
  simp [locatedStep, Computation.PrimitiveMachine.step, h]

end EthAudit
