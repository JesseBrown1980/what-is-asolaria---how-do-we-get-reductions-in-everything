import OAI.Algorithms.SubexponentialSAT.Main
import EthAudit.Bridge

/-! Ties this audit's statement copy to the proved theorem, then derives the
ETH-refuting form for k = 3. Built only after the full solution builds. -/

namespace EthAudit

/-- The kernel must accept the solution theorem at our copied statement. -/
theorem statement_is_solution (k : ℕ) (hk : 2 ≤ k) : SolutionStatement k :=
  OAI.Algorithms.SubexponentialSAT.SqrtLogSpace.exact_count_and_sat k hk

theorem eth_refuted_3sat : ETHForm 3 := eth_form 3 (statement_is_solution 3 (by norm_num))

end EthAudit

#print axioms OAI.Algorithms.SubexponentialSAT.SqrtLogSpace.exact_count_and_sat
#print axioms EthAudit.statement_is_solution
#print axioms EthAudit.eth_refuted_3sat
#print axioms EthAudit.halted_of_answer
