import OAI.Algorithms.SubexponentialSAT.SqrtLog.StatementScale

/-! Audit corollary, part 2 (written for this audit, not part of openai/math):
the statement's runtime bound, with a polynomially bounded input length, is
below `2^(δ n)` for every `δ > 0` and all large `n`. -/

namespace EthAudit

open Real Filter Asymptotics
open OAI.Algorithms.SubexponentialSAT

/-- `(log t)^2 / √t → 0`. -/
theorem logsq_div_sqrt_tendsto :
    Tendsto (fun t : ℝ => (Real.log t) ^ 2 / Real.sqrt t) atTop (nhds 0) := by
  have h4 : Real.log =o[atTop] fun t : ℝ => t ^ (1 / 4 : ℝ) :=
    isLittleO_log_rpow_atTop (by norm_num)
  have hsq : (fun t : ℝ => Real.log t * Real.log t) =o[atTop]
      fun t : ℝ => t ^ (1 / 4 : ℝ) * t ^ (1 / 4 : ℝ) := h4.mul h4
  have heq : (fun t : ℝ => t ^ (1 / 4 : ℝ) * t ^ (1 / 4 : ℝ)) =ᶠ[atTop]
      fun t => Real.sqrt t := by
    filter_upwards [eventually_gt_atTop 0] with t ht
    rw [← Real.rpow_add ht, Real.sqrt_eq_rpow]
    norm_num
  have hsq' : (fun t : ℝ => (Real.log t) ^ 2) =o[atTop] fun t => Real.sqrt t := by
    have := hsq.trans_eventuallyEq heq
    simpa [sq] using this
  exact hsq'.tendsto_div_nhds_zero

/-- The real-variable version of the statement's scale divided by `x`. -/
theorem scale_ratio_tendsto :
    Tendsto (fun x : ℝ => (Real.log (Real.log (x + 16))) ^ 2 / Real.sqrt (Real.log (x + 16)))
      atTop (nhds 0) := by
  have hlog : Tendsto (fun x : ℝ => Real.log (x + 16)) atTop atTop :=
    Real.tendsto_log_atTop.comp (tendsto_atTop_add_const_right _ 16 tendsto_id)
  exact logsq_div_sqrt_tendsto.comp hlog

/-- The exponent we must beat, as a function of a real variable. -/
noncomputable def logBudget (C A : ℝ) (d : ℕ) (c : ℝ) (p : ℕ) (x : ℝ) : ℝ :=
  Real.log C + d * (Real.log c + p * Real.log (x + 1)) +
    A * Real.log 2 * (x * ((Real.log (Real.log (x + 16))) ^ 2 / Real.sqrt (Real.log (x + 16))))

theorem logBudget_isLittleO (C A : ℝ) (d : ℕ) (c : ℝ) (p : ℕ) :
    logBudget C A d c p =o[atTop] id := by
  have hlog1 : (fun x : ℝ => Real.log (x + 1)) =o[atTop] id := by
    have h1 : (fun x : ℝ => Real.log (x + 1)) =o[atTop] fun x => x + 1 :=
      isLittleO_log_id_atTop.comp_tendsto (tendsto_atTop_add_const_right _ 1 tendsto_id)
    have h2 : (fun x : ℝ => x + 1) =O[atTop] id :=
      (isBigO_refl (fun x : ℝ => x) atTop).add (isLittleO_const_id_atTop (1 : ℝ)).isBigO
    exact h1.trans_isBigO h2
  have hscale : (fun x : ℝ => x * ((Real.log (Real.log (x + 16))) ^ 2 /
      Real.sqrt (Real.log (x + 16)))) =o[atTop] id := by
    have hg : (fun x : ℝ => (Real.log (Real.log (x + 16))) ^ 2 /
        Real.sqrt (Real.log (x + 16))) =o[atTop] fun _ => (1 : ℝ) :=
      (isLittleO_one_iff ℝ).mpr scale_ratio_tendsto
    have h3 := (isBigO_refl (fun x : ℝ => x) atTop).mul_isLittleO hg
    exact h3.congr_right fun x => mul_one x
  have hconst : (fun _ : ℝ => Real.log C + d * Real.log c) =o[atTop] id :=
    isLittleO_const_id_atTop _
  have hsum := (hconst.add ((hlog1.const_mul_left ((d : ℝ) * p)))).add
    (hscale.const_mul_left (A * Real.log 2))
  refine hsum.congr_left ?_
  intro x
  simp only [logBudget]
  ring

/-- For every `δ > 0`, eventually the statement's bound with input length at most
`c (n+1)^p` is at most `2^(δ n)`. -/
theorem runtimeBound_eventually_le (C A : ℝ) (hC : 0 < C) (d : ℕ) (c p : ℕ)
    (δ : ℝ) (hδ : 0 < δ) :
    ∃ N : ℕ, ∀ n : ℕ, N ≤ n → ∀ L : ℕ, L + 1 ≤ c * (n + 1) ^ p →
      SqrtLog.Statement.runtimeBound C A d L n ≤ (2 : ℝ) ^ (δ * n) := by
  have hε : 0 < δ * Real.log 2 := mul_pos hδ (Real.log_pos (by norm_num))
  have hev := (logBudget_isLittleO C A d c p).bound hε
  have hev' := (tendsto_natCast_atTop_atTop (R := ℝ)).eventually hev
  obtain ⟨N, hN⟩ := eventually_atTop.mp hev'
  refine ⟨N, fun n hn L hL => ?_⟩
  have hb := hN n hn
  simp only [id, Real.norm_eq_abs, abs_of_nonneg (Nat.cast_nonneg (α := ℝ) n)] at hb
  have hbudget : logBudget C A d c p n ≤ δ * Real.log 2 * n := (le_abs_self _).trans hb
  -- positivity facts
  have hcpos : (0 : ℝ) < c := by
    have : 0 < c := by
      rcases Nat.eq_zero_or_pos c with h | h
      · simp [h] at hL
      · exact h
    exact_mod_cast this
  have hL1 : ((L : ℝ) + 1) ≤ (c : ℝ) * ((n : ℝ) + 1) ^ p := by exact_mod_cast hL
  have hLpos : (0 : ℝ) < (L : ℝ) + 1 := by positivity
  have hn1 : (0 : ℝ) < (n : ℝ) + 1 := by positivity
  set ρ := SqrtLog.Statement.runtimeScale n with hρ
  -- compare logarithms
  have hlhs_pos : 0 < C * ((L : ℝ) + 1) ^ d * (2 : ℝ) ^ (A * ρ) := by positivity
  unfold SqrtLog.Statement.runtimeBound
  rw [← hρ]
  rw [← Real.log_le_log_iff hlhs_pos (by positivity)]
  rw [Real.log_mul (by positivity) (by positivity), Real.log_mul (by positivity) (by positivity),
    Real.log_pow, Real.log_rpow (by norm_num), Real.log_rpow (by norm_num)]
  have hlogL : Real.log ((L : ℝ) + 1) ≤ Real.log c + p * Real.log ((n : ℝ) + 1) := by
    calc Real.log ((L : ℝ) + 1) ≤ Real.log ((c : ℝ) * ((n : ℝ) + 1) ^ p) :=
          Real.log_le_log hLpos hL1
      _ = Real.log c + p * Real.log ((n : ℝ) + 1) := by
          rw [Real.log_mul hcpos.ne' (by positivity), Real.log_pow]
  have hρeq : ρ = (n : ℝ) * ((Real.log (Real.log ((n : ℝ) + 16))) ^ 2 /
      Real.sqrt (Real.log ((n : ℝ) + 16))) := by
    rw [hρ, SqrtLog.Statement.runtimeScale]; ring
  have hd : (0 : ℝ) ≤ d := Nat.cast_nonneg d
  calc Real.log C + d * Real.log ((L : ℝ) + 1) + A * ρ * Real.log 2
      ≤ Real.log C + d * (Real.log c + p * Real.log ((n : ℝ) + 1)) + A * ρ * Real.log 2 := by
        gcongr
    _ = logBudget C A d c p n := by rw [logBudget, hρeq]; ring
    _ ≤ δ * Real.log 2 * n := hbudget
    _ = δ * n * Real.log 2 := by ring

end EthAudit
