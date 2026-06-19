# 10-asolaria-gnn-display-files

Source path: C:/Users/acer/Downloads/Asolaria GNN display_files
(directory = saved-asset companion folder of the parent file C:/Users/acer/Downloads/Asolaria GNN display.html)

Related artifacts in the same Downloads folder (the actual Asolaria-content screenshots that the saved page captured):
- C:/Users/acer/Downloads/GNNS real results.jpg (55,032 bytes)
- C:/Users/acer/Downloads/asolaria GNN tracks messages between connectors on the hookwall.jpg (99,488 bytes)
- C:/Users/acer/Downloads/Asolaria GNN display.html (37,542,762 bytes — a saved Facebook page, fbsbx.com proxy)

## DIRECTORY NATURE (no-deflate finding, stated plainly)
The `Asolaria GNN display_files` directory is the browser "Save Page As — Complete" companion folder for `Asolaria GNN display.html`. The parent HTML was saved from a Facebook page (`saved from url=(0531)https://www.fbsbx.com/maw_proxy_page/?...` — Facebook `maw_proxy_page`, host string decodes to `FacebookHost ... web ... XCometVideoHomePlaylistController`). Therefore the 286 files inside `_files` are **Facebook's own bundled web assets**, NOT Asolaria engine artifacts:
- 253 × `*.js.download` (Facebook/React/Comet JS bundles, hashed filenames)
- 25 × `*.jpg` (tiny 1.6KB–5.3KB Facebook UI/profile thumbnails, FB media-ID filenames like `239211853_4619980681345290_..._n.jpg`)
- 4 × `*.css` (Facebook stylesheets, incl. 1.59MB `kCshexZRctv6...css`)
- 3 × `*.png` (`1f44d.png` 422B emoji, `gray.png` 296B placeholder, `453178253_..._n.png` 2.3KB)
- 1 × `saved_resource.html` (31,352B — a `fbsbx.com/maw_proxy_page` inner frame: bootloader/`_btldr` Facebook loader script; NO Asolaria text)
A text scan (`grep -il "asolaria|GSLGNN|hookwall"`) across every `.download` and `.html` inside `_files` returned ZERO matches. The Asolaria substance is in the parent `.html` body and in the two named screenshot JPGs that sit alongside (the actual GNN display the operator posted/captured). Those two screenshots are transcribed verbatim below.

## VERBATIM

### Screenshot A — "GNNS real results.jpg" (training results table + memory update)
```
Training Results — Archive 50K (13.25% suspicious)

| Model          | Accuracy | Precision | Recall  | F1      |
| EdgeLevelGNN   | 98.68%   | 22.31%    | 84.38%  | 35.29%  |
| ContrastiveGNN | 98.71%   | 22.69%    | 84.38%  | 35.76%  |
| PrototypeGNN   | 98.71%   | 22.69%    | 84.38%  | 35.76%  |
| GSLGNN         | 100.00%  | 100.00%   | 100.00% | 100.00% |

GSLGNN converged at epoch 70 (F1 jumped from 0.40 to 0.97) and hit perfect by epoch 80.

---
MEMORY → INDEX → PLAN → ORCHESTRATE (Cycle 3)

MEMORY UPDATE

- GSLGNN is the ONLY model that works. The other 3 are useless (22% precision = false alarm machines)
- Archive data (with real incidents) is the correct training set
- Phone mirror capture is 74% of all threats
- Cross-domain + mutation = the signature of an attack
- Falcon is LIVE (91% battery, Android 16, ADB connected)
```

### Screenshot B — "asolaria GNN tracks messages between connectors on the hookwall.jpg" (force-directed graph)
Node labels (graph nodes around a central hub):
```
openclaw
chat-auto
asolaria
template-fallback
gemini-cli
codex
brain
gemini-api
subject            <- central hub node (largest, red)
antigravity
chat-auto          <- (second chat-auto node, right side, ringed/highlighted)
anthropic
cursor
vertex
Start asolaria brain and          <- (message-node label, lower left)
Good morning. how t...            <- (message-node label, lower right, truncated)
Ok, I need you to load a          <- (message-node label, bottom, ringed/highlighted)
```
Tooltip / detail panel (bottom-right, for the highlighted "chat-auto" connector):
```
chat-auto -> Ok, I need you to load an external admin terminal in Admin to help me with the QDD project. Because any time a new codex is loaded, it do...
medium | count 1
brain_task | chat-ingress | warm | diff:added
```

### Parent HTML provenance string (from Asolaria GNN display.html / saved_resource.html)
```
<!-- saved from url=(0531)https://www.fbsbx.com/maw_proxy_page/?__cci=... -->
host string fields: FacebookHost / web / XCometVideoHomePlaylistController
_btldr={};  (Facebook bootloader)
```

## NUMBERS
- Archive 50K (training archive size)
- 13.25% suspicious (suspicious fraction of Archive 50K)
- EdgeLevelGNN: Accuracy 98.68%, Precision 22.31%, Recall 84.38%, F1 35.29%
- ContrastiveGNN: Accuracy 98.71%, Precision 22.69%, Recall 84.38%, F1 35.76%
- PrototypeGNN: Accuracy 98.71%, Precision 22.69%, Recall 84.38%, F1 35.76%
- GSLGNN: Accuracy 100.00%, Precision 100.00%, Recall 100.00%, F1 100.00%
- GSLGNN converged at epoch 70
- F1 jumped from 0.40 to 0.97
- hit perfect by epoch 80
- "22% precision = false alarm machines"
- Phone mirror capture is 74% of all threats
- Falcon: 91% battery, Android 16
- Cycle 3 (MEMORY → INDEX → PLAN → ORCHESTRATE)
- Graph tooltip: medium | count 1
- Directory: 286 files (253 .download, 25 .jpg, 4 .css, 3 .png, 1 .html)
- Parent HTML 37,542,762 bytes; saved_resource.html 31,352 bytes

## PIDS-ROOMS-GLYPHS
- No PIDs, room numbers (MK-#####), or glyphs visible in either screenshot.
- Graph node identifiers (connector names, not PIDs): subject (central hub), asolaria, codex, chat-auto (×2), openclaw, template-fallback, gemini-cli, gemini-api, brain, antigravity, anthropic, cursor, vertex.
- Message-stream nodes (chat ingress): "Start asolaria brain and", "Good morning. how t...", "Ok, I need you to load a".
- Edge/event tags: brain_task | chat-ingress | warm | diff:added ; severity "medium"; "count 1".

## ENGINES-SYSTEMS
- GNN model family (the four trained models): EdgeLevelGNN, ContrastiveGNN, PrototypeGNN, GSLGNN (Graph Structure Learning GNN — the winning model).
- Asolaria GNN display = force-directed graph that "tracks messages between connectors on the hookwall" (per filename).
- Connectors visualized as graph nodes: asolaria, codex, chat-auto, openclaw, template-fallback, gemini-cli, gemini-api, brain, antigravity, anthropic, cursor, vertex.
- Falcon (device, LIVE, ADB-connected, Android 16, 91% battery) — threat-capture source.
- "Phone mirror capture" — capture modality (74% of all threats).
- Archive 50K — labeled training dataset (real incidents).
- Pipeline loop: MEMORY → INDEX → PLAN → ORCHESTRATE (Cycle 3).
- QDD project (referenced in chat-auto message: "help me with the QDD project").
- hookwall (the connector message bus the GNN tracks).
- Admin / external admin terminal (referenced in chat-auto message).
- Underlying saved page = Facebook (fbsbx.com maw_proxy_page, XCometVideoHomePlaylistController) — the carrier the operator posted it through, not an engine.

## TIMESTAMPS
- No explicit date/time visible inside either screenshot.
- Filesystem mtimes of the saved assets: Jun 19 17:47–17:48 (2026-06-19), per directory listing.
- Training "timestamps" are epoch-based: epoch 70 (convergence), epoch 80 (perfect).

## CLAIMS
- GSLGNN is the ONLY model that works; the other 3 are useless ("22% precision = false alarm machines").
- GSLGNN reached perfect classification: 100% Accuracy / Precision / Recall / F1 on Archive 50K (13.25% suspicious).
- GSLGNN converged at epoch 70 (F1 0.40 → 0.97) and hit perfect by epoch 80.
- Archive data (with real incidents) is the correct training set.
- Phone mirror capture accounts for 74% of all threats.
- Cross-domain + mutation = the signature of an attack.
- Falcon is LIVE (91% battery, Android 16, ADB connected).
- The Asolaria GNN tracks messages between connectors on the hookwall (graph display; example event chat-auto -> chat-ingress brain_task, severity medium, count 1).

## CONTEXT
This artifact is the "Save Page — Complete" capture of an Asolaria GNN display the operator surfaced through a Facebook post/page (parent `Asolaria GNN display.html`, 37.5MB, fbsbx proxy). The `_files` directory itself is purely Facebook's web bundle (JS/CSS/UI thumbnails) and carries no Asolaria payload. The real Asolaria content is the two companion screenshots: (1) a GNN training-results table proving that of four graph neural nets, only GSLGNN (Graph Structure Learning GNN) achieves a perfect 100% across Accuracy/Precision/Recall/F1 on a 50K real-incident archive (the other three are 22%-precision "false alarm machines"), converging at epoch 70 and perfect by epoch 80; and (2) a live force-directed graph that visualizes messages flowing between named connectors (asolaria, codex, chat-auto, openclaw, gemini-cli/api, brain, anthropic, cursor, vertex, antigravity, template-fallback) on the hookwall, with a sample chat-ingress brain_task event. In the build story this sits at the security/GNN-threat-detection layer: the system training a graph classifier on archived incidents, declaring phone-mirror capture as 74% of threats, cross-domain+mutation as the attack signature, and confirming the Falcon device is the live capture source — all framed inside the MEMORY → INDEX → PLAN → ORCHESTRATE loop (Cycle 3).
