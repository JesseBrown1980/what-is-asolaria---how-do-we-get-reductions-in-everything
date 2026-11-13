# Unpump, unquant, walls and switches: one day of measurements (2026-11-13)

Seat: ACER-CLAUDE-FABLE52 (pid `61089a99becaa89b`), directed by OP-JESSE. Every prediction file here was written
and hashed before its run. Misses are kept. Working folder on the machine: `D:/asolaria-unpump-20261113/`
(the large regenerated GGUFs and the corpora stay there; this folder holds specs, programs, results and small artifacts).

## Results

| # | Question | Outcome | Folder |
|---|---|---|---|
| V25 | A codex of 16 names (8 bytes each) resolved through the system container (872,272 artifacts) | 7 resolved byte-exact, 9 held (none of the `asolaria-absorb` family is in that container). 5 of 5 predictions held | `unpump-container/` |
| V26 | Regenerate the big GGUFs from their codexes | Mythos glyphs 256 (269,604,512 B) and stars-shells from a 3,796-byte seed, Kimi K3 star (202,115,456 B) from a 3,110-byte text: all three equal their recorded sha256. 3 of 3 held | `regenerate/` |
| V26 read | What the regenerated Mythos glyph body holds | 1 to 29 non-zero cells per glyph of 262,144 (median 5); all values whole numbers; roundness undefined for 256 of 256 | office row |
| V27 | What writes the 3,200-byte colour QR codexes, and what unquants them | Writer found (`drill3k.mjs`). Re-drilling enwik8, code-corpus and asolaria-corpus reproduces the three QR files byte for byte. The QR alone returns 0 of 4,194,304 bytes (`undrill.mjs`). 1 of 1 held | `colour-qr/` |
| Round trip | The July clean-room round trip, rerun | master key 549,112 B + coded stream 1,711,250 B decode the first 4,194,304 bytes of enwik8 exactly | `roundtrip/` |
| V28 | Does the small HRM (58,850 weights) solve mazes it has not seen? | 489 of 512 held-out mazes exact (99.7% of cells). Checkpoint and exact-integer export filed. 2 of 4 predictions held; the seat predicted under 20% exact and was wrong | `hrm/` |
| Surgery 1 | What the 23 failures share | A step back in the path: 2.0% failed with none, 24.5% with one, 40% with two. Training holds 1,864 direct paths and 184 with a detour | `hrm/` |
| Surgery 2 | A one-row edit of the output head, chosen on training mazes only | REJECTED: 489 to 484 held-out. The training sweep showed no shift beats no edit; the seat's tie-break cut anyway (fault recorded) | `hrm/` |
| V29 | How many 2D walls rebuild a 3D body exactly? | 3 axis walls: held. 9 walls (axes and face diagonals): both Mythos bodies rebuilt cell for cell from the wall file alone. Nine-wall GGUFs filed | `rime-walls/` |
| V30 | Codex function tables as light switches (3 nodes) | The right node lights for 3 of 3 held-out and 3 of 3 unseen files; the taped set codes mixed material 16% smaller than the best single node. 4 of 4 held | `switches/` |
| V31 | A nine-node panel | Taped size falls at every step to 23.2% below the best single node at nine. Labels: 8 of 9 held-out, 5 of 8 unseen (source files light the broad code node over their language node). A dense body (13,198 cells) is held by nine walls. 1 of 4 held outright, 1 in part, 2 missed | `panel/` |

## Scope that travels with these numbers

- The colour QR codex is a proven name for its corpus (re-drilling reproduces it); it does not carry the corpus. Each corpus has its own codex (enwik9's differs from enwik8's in 3,188 of 3,200 bytes).
- Regeneration applies to generated objects: seed plus deterministic program. The three pumped spheres depend on the office folder as it stood on 2026-07-27 (153 files) and were not regenerated.
- The nodes that work as switches are the function tables (about 0.5 MB compressed each), not the 3,200-byte QR.
- Switching between predictors by recent cost is the principle of context mixing; what is measured here is that it holds on these corpora.
- HRM training and the regenerating programs use floating point. Reported sizes, counts, hashes, the wall rebuilds and the exact-integer weight export are integers.
- Nine walls together hold more cells than the sparse body they rebuild: that is exact rebuilding from enough views, not a reduction.

`office-rows/` holds the HBP rows as recorded in the seat's back-end office.
