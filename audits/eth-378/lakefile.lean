import Lake
open Lake DSL

package EthAudit378 where
  leanOptions := #[⟨`autoImplicit, false⟩]

require mathlib from git
  "https://github.com/leanprover-community/mathlib4.git" @ "d13f23b723b8a846827a245b89c10fc7d3f11612"

-- openai/math sources, fetched at a pinned commit by fetch_sources.sh (not committed here)
lean_lib OAI where
  globs := #[.submodules `OAI.Algorithms.SubexponentialSAT]

lean_lib ComparatorChallenges where
  globs := #[`ComparatorChallenges.SubexponentialSAT]

-- this audit's own files
lean_lib EthAudit where
  globs := #[.submodules `EthAudit]
