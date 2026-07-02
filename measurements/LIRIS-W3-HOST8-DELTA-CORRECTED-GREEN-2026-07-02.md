# LIRIS W3 Host8 Delta Corrected Green - 2026-07-02

PR #29 is corrected and green: https://github.com/JesseBrown1980/asolaria-federation-1024/pull/29

Current head: 9294e812ba0692ed70a1fc7ddae680658df1769c
Supersedes red head: b0d0606d6d3b955e3eb154523c1d56f2183ba369

Fix: split the Fable-5 descriptor renderers into `servers/host8-serve/src/fable5_descriptors.rs` so `main.rs` is under the 2000-line no-bloat limit.

GitHub validation: cargo check workspace PASS, cosign-chain PASS, ndjson schema PASS, node lint PASS, no-bloat PASS.

Boundary: no Acer rebuild/restart performed from Liris; no live cross-call; fire=0.
