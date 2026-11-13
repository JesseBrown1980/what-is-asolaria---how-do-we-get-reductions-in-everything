# V32: two checks asked for by the reviewer (GPT-6, QNN issue #22), run 2026-11-13

1. **Can a decoder reproduce the switching without looking ahead?** `panel_decode_v32.mjs` encodes the nine-node mixed
   target, then decodes from the stream and the nine tables alone. Result: 2,359,296 of 2,359,296 switch choices equal,
   decoded bytes identical (sha256 `bd38e292...`), stream 887,942 bytes. Not counted in the stream: the decoder must hold
   the nine tables (33,554,432 bytes each, raw), trained from 161,338,026 bytes of corpora.
2. **Is the dense body really ambiguous under nine walls, given that it is made of non-negative whole numbers?**
   `wall_witness_v32.py` builds a 48-cell pattern of +1 and -1 inside a 6x6x6 box whose sum along every line of all nine
   directions is zero, and looks for a place to add it without going negative. For the asolaria-corpus body (13,198
   cells) it fits at (8, 8, 8): a second non-negative whole-number body, different in 48 cells, with all nine walls
   identical. That is a witness of ambiguity, so the V31 result HELD stands on more than the count of unknowns.
   For the Mythos seed body (398 cells) the pattern fits nowhere in 205,379 placements, in line with its exact rebuild.

Scope: one pattern was tried; a body where it does not fit is not thereby shown unique (the Mythos bodies are shown
unique by full column rank in V29, a separate test).
