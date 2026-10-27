import OAI.Algorithms.SubexponentialSAT.Encoding

/-! Audit corollary, part 1 (written for this audit, not part of openai/math):
the canonical encoding of a width-`k` CNF on `n` variables has bit length
polynomial in `n`. Uses only the challenge-facing definitions. -/

namespace EthAudit

open OAI.Algorithms.SubexponentialSAT

theorem frame_length (bits : List Bool) :
    (Encoding.frame bits).length = 2 * bits.length + 1 := by
  induction bits with
  | nil => simp [Encoding.frame]
  | cons b bs ih =>
    simp only [Encoding.frame, List.foldr_cons, List.length_cons] at ih ⊢
    omega

theorem encodeList_length_le {α : Type*} (enc : α → List Bool) (B : ℕ) :
    ∀ l : List α, (∀ a ∈ l, (enc a).length ≤ B) →
      (Encoding.encodeList enc l).length ≤ 1 + l.length * (2 * B + 2)
  | [], _ => by simp [Encoding.encodeList]
  | a :: as, h => by
    have ha := h a (by simp)
    have ih := encodeList_length_le enc B as (fun x hx => h x (by simp [hx]))
    simp only [Encoding.encodeList, List.length_cons, List.length_append, frame_length]
    nlinarith

theorem literalCode_le {n : ℕ} (l : SAT.Literal (Fin n)) :
    Encoding.literalCode l ≤ 2 * n := by
  unfold Encoding.literalCode
  have := l.variable.isLt
  split <;> omega

theorem clause_encoding_le {n k : ℕ} (C : SAT.Clause (Fin n)) (hC : C.card ≤ k) :
    (Encoding.encodeList Encoding.encodeNat (Encoding.clauseNumbers C)).length ≤
      1 + k * (4 * n + 4) := by
  have hlen : (Encoding.clauseNumbers C).length ≤ k := by
    unfold Encoding.clauseNumbers
    rw [Finset.length_sort]
    exact (Finset.card_image_le).trans hC
  have hel : ∀ a ∈ Encoding.clauseNumbers C, (Encoding.encodeNat a).length ≤ 2 * n + 1 := by
    intro a ha
    unfold Encoding.clauseNumbers at ha
    rw [Finset.mem_sort, Finset.mem_image] at ha
    obtain ⟨l, -, rfl⟩ := ha
    simp [Encoding.encodeNat, literalCode_le l]
  have := encodeList_length_le Encoding.encodeNat (2 * n + 1) _ hel
  calc _ ≤ 1 + (Encoding.clauseNumbers C).length * (2 * (2 * n + 1) + 2) := this
    _ ≤ 1 + k * (2 * (2 * n + 1) + 2) := by gcongr
    _ = 1 + k * (4 * n + 4) := by ring

/-- Bit length in terms of variables `n`, width `k` and clause count. -/
theorem formulaBitLength_le {n k : ℕ} (F : SAT.CNF (Fin n)) (hw : SAT.WidthAtMost k F) :
    Encoding.formulaBitLength F ≤ n + 2 + F.card * (4 + 2 * k * (4 * n + 4)) := by
  have hlen : (Encoding.cnfNumbers F).length ≤ F.card := by
    unfold Encoding.cnfNumbers
    rw [Finset.length_sort]
    exact Finset.card_image_le
  have hel : ∀ c ∈ Encoding.cnfNumbers F,
      (Encoding.encodeList Encoding.encodeNat c).length ≤ 1 + k * (4 * n + 4) := by
    intro c hc
    unfold Encoding.cnfNumbers at hc
    rw [Finset.mem_sort, Finset.mem_image] at hc
    obtain ⟨C, hCF, rfl⟩ := hc
    exact clause_encoding_le C (hw C hCF)
  have hbody := encodeList_length_le _ _ _ hel
  unfold Encoding.formulaBitLength Encoding.encodeCNF Encoding.encodeCNFBody
  simp only [List.length_append, Encoding.encodeNat, List.length_replicate, List.length_cons,
    List.length_nil]
  calc _ ≤ n + 1 + (1 + (Encoding.cnfNumbers F).length * (2 * (1 + k * (4 * n + 4)) + 2)) := by
          omega
    _ ≤ n + 1 + (1 + F.card * (2 * (1 + k * (4 * n + 4)) + 2)) := by gcongr
    _ = n + 2 + F.card * (4 + 2 * k * (4 * n + 4)) := by ring

/-- Literals over `Fin n` are a finite type with `2n` elements. -/
def literalEquiv (n : ℕ) : SAT.Literal (Fin n) ≃ Fin n × Bool where
  toFun l := (l.variable, l.positive)
  invFun p := ⟨p.1, p.2⟩
  left_inv l := by cases l; rfl
  right_inv p := by cases p; rfl

instance (n : ℕ) : Fintype (SAT.Literal (Fin n)) := Fintype.ofEquiv _ (literalEquiv n).symm

/-- A width-`k` CNF on `n` variables has at most `(k+1)(2n)^k` clauses (at most
`(k+1)·max(1,2n)^k`, stated with `2n+1` to cover `n = 0`). -/
theorem card_le {n k : ℕ} (F : SAT.CNF (Fin n)) (hw : SAT.WidthAtMost k F) :
    F.card ≤ (k + 1) * (2 * n + 1) ^ k := by
  classical
  have hsub : F ⊆ (Finset.range (k + 1)).biUnion
      (fun i => Finset.powersetCard i (Finset.univ : Finset (SAT.Literal (Fin n)))) := by
    intro C hC
    rw [Finset.mem_biUnion]
    exact ⟨C.card, Finset.mem_range.mpr (Nat.lt_succ_of_le (hw C hC)),
      Finset.mem_powersetCard.mpr ⟨Finset.subset_univ _, rfl⟩⟩
  have hcard : Fintype.card (SAT.Literal (Fin n)) = 2 * n := by
    rw [Fintype.card_congr (literalEquiv n)]; simp [mul_comm]
  calc F.card ≤ _ := Finset.card_le_card hsub
    _ ≤ ∑ i ∈ Finset.range (k + 1), (Finset.powersetCard i
          (Finset.univ : Finset (SAT.Literal (Fin n)))).card := Finset.card_biUnion_le
    _ ≤ ∑ _i ∈ Finset.range (k + 1), (2 * n + 1) ^ k := by
        apply Finset.sum_le_sum
        intro i hi
        rw [Finset.card_powersetCard, Finset.card_univ, hcard]
        have hik : i ≤ k := Nat.lt_succ_iff.mp (Finset.mem_range.mp hi)
        calc (2 * n).choose i ≤ (2 * n) ^ i := Nat.choose_le_pow _ _
          _ ≤ (2 * n + 1) ^ i := Nat.pow_le_pow_left (by omega) _
          _ ≤ (2 * n + 1) ^ k := Nat.pow_le_pow_right (by omega) hik
    _ = (k + 1) * (2 * n + 1) ^ k := by simp

/-- The canonical input length is polynomial in `n` for fixed `k`. -/
theorem formulaBitLength_poly {n k : ℕ} (F : SAT.CNF (Fin n)) (hw : SAT.WidthAtMost k F) :
    Encoding.formulaBitLength F + 1 ≤
      (3 + (k + 1) * 2 ^ k * (8 * k + 4)) * (n + 1) ^ (k + 1) := by
  have h1 := formulaBitLength_le F hw
  have h2 := card_le F hw
  have hp : (2 * n + 1) ^ k ≤ 2 ^ k * (n + 1) ^ k := by
    rw [← mul_pow]; exact Nat.pow_le_pow_left (by omega) _
  have hm : F.card ≤ (k + 1) * 2 ^ k * (n + 1) ^ k := by
    calc F.card ≤ (k + 1) * (2 * n + 1) ^ k := h2
      _ ≤ (k + 1) * (2 ^ k * (n + 1) ^ k) := Nat.mul_le_mul_left _ hp
      _ = _ := by ring
  have hc : 4 + 2 * k * (4 * n + 4) ≤ (8 * k + 4) * (n + 1) := by nlinarith
  have hn1 : n + 1 ≤ (n + 1) ^ (k + 1) := Nat.le_self_pow (by omega) _
  calc Encoding.formulaBitLength F + 1
      ≤ 3 * (n + 1) + F.card * (4 + 2 * k * (4 * n + 4)) := by omega
    _ ≤ 3 * (n + 1) ^ (k + 1) + ((k + 1) * 2 ^ k * (n + 1) ^ k) * ((8 * k + 4) * (n + 1)) := by
        gcongr
    _ = (3 + (k + 1) * 2 ^ k * (8 * k + 4)) * (n + 1) ^ (k + 1) := by ring

end EthAudit
