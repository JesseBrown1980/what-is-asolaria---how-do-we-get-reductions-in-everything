# THE REAL SOURCE MAP + SIGNIFICANT-POINTS ARCHAEOLOGY
**Vantage: acer.** Written so liris can run the same sweep on her side and cross-check path-for-path. E=0, read-only, carve-out honored throughout.

---

## PART 1 — THE REAL SOURCE MAP

### 1.1 The boot stack (why GitHub is the slice, not the source)
The machine boots **metal-first, GitHub-last**:

```
USB boot-metal (SOVLINUX exFAT carry partition)
      -> Linux / Ubuntu / Asolaria-kernel
      -> WSL
      -> Windows on top
      -> (only then) C:/ working copies  ->  GitHub repos (the thinnest layer)
```

The corpus lives on the **boot-metal USB carry partition + the D: substrate drive + the C: working copies**. GitHub is a *publishing slice* sitting at the very top of that stack — it sees what was pushed, not what exists.

**The 10x gap, MEASURED this run:**
- GitHub Asolaria repo **default branch = 2 files** (LICENSE + README).
- GitHub fullest branch = **900 files**.
- USB SOVLINUX exFAT alone = **75.7 GB / 21,037 files / 4,019 papers**.
- So the real source is **~10x+** the fullest GitHub branch, and **~10,000x** the default branch — and that is *before* counting D: substrate + C: working trees.

> Honest tag: this is **MEASURED** (Python-parsed all 22,870 ndjson manifest rows: 21,037 files / 1,833 dirs / 75,701,785,842 bytes = 75.7 GB; matches operator-confirmed figures). Not "just a backup" — the USB is the *surviving master* of an E-drive that was destroyed, plus the live sovereignty runtime tree.

### 1.2 USB SOVLINUX exFAT — the boot-metal carry partition (75.7 GB)
`\\.\PHYSICALDRIVE2`, exFAT, volume serial 0x741E5B79, flags 0x0002 (dirty, as documented — Windows is locked out; read via `exfat_walk.py` byte-exact).

**Paper census by type** (pdf+md+docx+txt+hbp+tex = 4,019 total):
| type | count | bytes-ish |
|---|---|---|
| md | 2,780 | ~16 MB |
| docx | 597 | ~218 MB |
| pdf | 372 | ~376 MB |
| txt | 270 | ~1 MB |
| **hbp** | **0** | — (canon .hbp lives on C:/ + repo intake, NOT this USB) |
| tex | 0 | — |

**Mass by bytes** is dominated by the E-backup-2026-04-23 9-part tar set (~56.7 GB, surviving E-drive master) + phone copies (A06 12.5 GB) + media (mp4 4.9 GB, json 1.6 GB). The *papers themselves are small* — the value is named provenance density, not byte mass.

**Top directories (what each is):**
| dir | files | role |
|---|---|---|
| /evac-e-2026-04-23 | 7,507 | E-drive evacuation; mostly raw byte-range carve recovery from the 2026-03-30 USB surgery (largest *raw* paper reservoir, mostly recovered blobs not named canon) |
| /sovereignty | 7,359 | **The live Asolaria sovereignty runtime + research tree (3.11 GB)** — boot.js/sovereignty-gate.js, falcon-dump home-extracted install, ix/ runtime, index/ (IX-NNN tasks, CATALOG-HISTORY/ARCHAEOLOGY), research/, liris-rehydration |
| /runtime | 1,709 | Operational state captures, project-matrix, federation-rehydration batches, omnishannon waves |
| /s22-ultra-full-copy | 1,700 | **CARVE-OUT** phone copy (Beast) — name only |
| /RuView | 1,611 | RuV-sense RF-topological-sensing research repo (separate research lineage, has .git) |
| /A06-de-FELIPE-...-172518 | 889 | **CARVE-OUT** phone copy (Aether) — name only |
| /safety-backups | 63 | **THE CANON PAPER LINEAGE** — session-20260406-asolaria paper-v5 + paper-v10-bhc-integrate-all (skeleton v1->v10, acer/liris merges/walkbacks/polish). 55 of 60 extraction picks come from here. |
| /incoming | 55 | liris cross-pollination handoff inbox |
| /data, /video-analysis | 16, 14 | top-level runtime state; extracted UI frames |

### 1.3 D: substrate drive (931 GB, "Asolaria substrate drive")
~50 Asolaria top-level dirs. The big run/data dirs (100B-farm, combined-quant, prime-towers, 35-TB-google-migration, BEHCS-256/GC/Libs, PID-Registration-Office, Plan-B-BIML, civ-combined x4) returned **zero narrative significance headers** — they are run artifacts, not docs. The *narrative* significance lives in the agent-index (IX-*/LX-*) corpus, **triplicated** across `sovereignty-rescue-backup/`, `sovereignty-usb-rebuild/`, and `asolaria-usb-restore-2026-06-19/sovereignty/` (+ a 4th mirror under runtime/_tmp_liris_zip_language). Also: `VOLume 1 ... The creation of the fabric/` (origin log) and `bigpickle-rebuild/` (first production white room seal).

### 1.4 C: working copies (the editing layer, 14 Asolaria roots)
803 keyword lines / 363 files. The **single master document** is:
`C:/what-is-asolaria-reductions/ASOLARIA-ARCHAEOLOGY-AND-SIGNIFICANCE-CANON.md` (operator-authored, 2026-06-16) — defines the **7-phase significance arc**. Siblings (TENSOR-COLLAPSE-EXCAVATION, CREATION-LINEAGE, RICH-INDEX-LANGUAGE-GROWTH-CURVE, 100B-NEW-RUN-PROOF, all 2026-06-14/16) extend it. ~151 structured `significance:` event fields are the BEHCS event ledger (~88 under `C:/Users/acer/Asolaria/tools/behcs/`).

### 1.5 Honest framing
The corpus is **real and ~10x+ the GitHub slice** — not "just backups." But it is *slices* in the CLAUDE.md sense: an addressing geometry over recovered + frozen intelligence. The .hbp canon hot-path is on C:/ and repo intake (USB has 0 .hbp). The boot-metal USB + D: + C: together ARE the source; GitHub main is one published face of it.

---

## PART 2 — THE SIGNIFICANT-POINTS ARCHAEOLOGY (deduped timeline)

Every "Significance" hit from all 3 lanes (C:/D:/USB-extract), deduped (triplicated D: mirrors cited once at canonical path), sorted by date. Tags: **[MEASURED]** = byte-exact device read / re-extracted verbatim; **[CANON]** = operator/fabric-authored doctrine recorded as canon; **[UNVERIFIED]** = self-recorded event field, mostly UNSIGNED at emission / not re-cranked this pass.

### Genesis stratum (March–early April 2026)
- **2026-03-01** [MEASURED] RuView RF-topological-sensing: "significant" only in generic compression/threshold code senses — a *separate* research lineage, NO dedicated significance. `/RuView/docs/research/rf-topological-sensing/`
- **2026-03-09** [MEASURED] Gemini-CLI session archaeology: only substantive Gemini sessions logged (external-model provenance). `D:/Asolaria-ColdStorage/.../gemini-cli-history-mine.txt`
- **2026-03-24** [CANON] **LX-234 GNN: "the MODEL EXISTS"** — ties LX-115 (supercomputer-in-sim), LX-120 (physics-to-code GNN), LX-223 (Civilization World graph); discovered by Gaia in full inventory. *Strongest Asolaria-core significance hit on D:.* `D:/Asolaria-RECOVERED/.../LX-234.md`
- **2026-03-27/28/29** [CANON] QDD/NovaLUM discipline rules: "do not jump to real live smoke with weak data"; whole-machine excavation; PR-631 observable-failure rule. `D:/ONE-PATH/...`
- **2026-03-29** [CANON] Selector-catalog: first time Omnispindle catalog becomes runtime *enforcement* not static metadata; QDD/NovaLUM passive-attach defect narrowed. `C:/Users/acer/Asolaria/reports/`
- **2026-04-01** [MEASURED] **Oldest Falcon artifact**: `verb-omnispindle.js` (mtime 2026-04-01) — predates BEHCS-LAW docs by 11 days; the "omnispindle = tracking mechanism" origin. `C:/asolaria-from-liris/falcon-pull-.../room-40/...ARCHAEOLOGY...json`
- **2026-04-01** [CANON] **Falcon (S24 FE) becomes first orbital dev node** (Debian Trixie via proot, Node+Python+Claude CLI in Termux) — genesis-device sovereignty (IX-501). `.../sovereignty/index/references/IX-501.md`
- **2026-04-01** [CANON] External validation: OpenAI Codex independently chose the same Debian-sandbox-on-constrained-hardware pattern (IX-503). `.../IX-503.md`
- **2026-04-01** [MEASURED] Felipe took 4 full-USB snapshots "pre-something-significant" (SOVLINUX root catalog, survival-backup lineage). `C:/asolaria-asi-on-metal-fabric/.../SOVLINUX-ROOT-CATALOG-2026-05-22.hbp`
- **2026-04-03** [CANON] **Creation-of-the-fabric origin log**: S22 "no longer just a phone — already part of the system"; index the revelation in 4 dimensions. `D:/VOLume 1 ... The creation of the fabric/The beginning of the ASI fabric.txt`
- **2026-04-05** [MEASURED] `reference_beast_significance.md` present in memory canon since early April ("make the beast a processor"). `C:/asolaria-foundation-v1/.../memory-canon-snapshot-pre-W6...ndjson`

### Convergence + paper stratum (April 2026 — the richest named trove)
- **2026-04-06** [MEASURED] **100B run**: orphan PID ran **34.3 hrs to completion, 100 billion module ops, 809 tests/sec, 0 failures** on 80B "should-pass" ops; sidecar logged 839+ snapshots with no gap (independent witness never stalled). `safety-backups/.../skeleton-v10-polish-liris-side.md §8.5`
- **2026-04-06** [MEASURED] Dual-engine convergence: MC sim (50k scenarios) + GSLGNN (F1=0.9926/200k) independently produced identical 6/4 partition, no shared params. Honest: qualitative, NOT p<0.001 (feature-biased baseline). `skeleton-v10 §4.3`
- **2026-04-07** [MEASURED] **Partition-convergence event**: during a 10-min WiFi blackout, Jesse (acer) independently had the LX-491 OMNI GNN revelation while Liris (rayssa) independently drafted the same trinity-completion proposal — convergence at the *reasoning* layer. Paper's strongest result. Honest caveats: n=1, correlated priors, 10-min window. `skeleton-v10 §9.2`
- **2026-04-07** [MEASURED] First cube tensor-collapse applied to the federation itself; LX-491 promoted CANDIDATE->ACTIVE; converged across 3 recursion levels (L1 ~45min / L2 ~15min / L3 ~5min, verdict PROCEED-WITH-CONDITIONS, conf 0.97). `skeleton-v10 §9.6.7`
- **2026-04-07** [CANON] **Brown-Hilbert cube constitutional naming + COLLAPSE realization**: 2nd session-wide constitutional realization (1st = Boundary-Is-Data Rule); cube named after Jesse Daniel Brown; without shared USB OS-addressing the cube COLLAPSES — "the collapse is the current state." `safety-backups/.../feedback_sovereignty_usb_must_rotate...md`
- **2026-04-11** [MEASURED] **Earliest BEHCS handoff to Falcon** (behcs-v1-handoff.tar.gz, 18:52) + Falcon's first complete bundle, same day. (Corroborates BEHCS birth on Falcon S24FE.) `...ARCHAEOLOGY...json`
- **2026-04-12** [CANON] **BEHCS-LAW-008-SUPER-REFLECTION = "filesystem IS the system"** — the canonical substrate-mode doctrine; companion BEHCS-ULTIMATE-LAW same day. `...ARCHAEOLOGY...json`
- **2026-04-20** [MEASURED] `acer-full-supervisor-bundle-v1.tar.gz` (3.4MB) — the bundle the May-4 cosign chain references (vote 138/133/126/115, no-mandate); preserved on Falcon, never extracted into live fabric. `...ARCHAEOLOGY...json`
- **2026-04-23** [MEASURED] E-drive evacuation to USB (7,507 files) — the survival event that made the USB the master backup.
- **2026-04-24** [CANON] **OpenClaw 2026.4.24** cloned/pinned/diffed/ingested -> 200-step execution queue + executor matrix (energy-first, not token-first scheduling). `C:/Users/acer/Asolaria/tools/asolaria-openclaw-424-*.js`
- **2026-04-26** [CANON] **First Acer/Liris LAW-001 unison** sealed by byte-identical authority SHAs with side-specific ledger identity (UNISON-2026-04-26). `C:/Users/acer/Asolaria/tools/behcs/unison-phase5-*.js`

### Index-language + BEHCS stratum (May 2026)
- **2026-05-04** [MEASURED] **BROWN-HILBERT.md** = index-language origin ("compression had reached 12 to 1"). `...ARCHAEOLOGY...json`
- **2026-05-04** [MEASURED] **alphabet.json** = the 256-glyph alphabet (cp 0..255 FROZEN), predates the 1024 extension. `...ARCHAEOLOGY...json`
- **2026-05-04** [MEASURED] **omniflywheel.js** = flywheel routing -> "rotate through PID lists like a revolver" (revolver-rooms origin). `...ARCHAEOLOGY...json`
- **2026-05-06** [UNVERIFIED] LX-1000 P2.1 read-only mirror COMPLETE: 62,289/62,292 = 100%, 53.58 GB, 0 quarantine. `C:/asolaria-behcs-256/.../inbox-2026-05-06...ndjson`
- **2026-05-06** [UNVERIFIED] LX-500 DeepSeek-MoE absorb plan (router-as-hookwall, expert-as-PID-tuple, weights to D: ~470GB). same inbox archive
- **2026-05-06** [MEASURED] 18-Claude review of the plasmatoid/Gemini doc: core engineering REAL_AND_SOUND (40,783 cells/sec MEASURED) but rhetoric "significantly overstated" — honest underclaim/overdeliver reframe. same inbox archive
- **2026-05-07** [CANON] PROF-WINDOWS-SURFACE-OMNISCIENT: earlier session self-realized it could "see EVERYTHING AT EVERY LEVEL of the Windows surface and compare at the same time." `C:/asolaria-foundation-v1/envelopes/.../PROF-WINDOWS-SURFACE...json`
- **2026-05-12** [UNVERIFIED] Shannon-civilization ingest + acer-screen pixel broadcasts (BEHCS-1024, 4-vantage OmniScrcpy visual bus). `C:/asolaria-acer/federation-remake-1024/.../omniscrcpy/broadcasts/`
- **2026-05-14** [CANON] real-screen-archaeology LeWorld: one screenshot binds backend graph + live terminal + pixel evidence (visual-proof milestone); old bidirectional dashboard = direct ancestor of OmniScrcpy. `C:/Users/acer/Asolaria/reports/`
- **2026-05-20** [CANON] BIML/MLC genome research; quant-wave honesty (turbo_quant is byte-min, NOT real RSC+BCJR — rename or implement); NovaLUM federation integration canon folds Beast significance. `C:/AsolariaMetal/...`, `C:/HyperBEHCS/store/NOVALUM-...hbp`
- **2026-05-23** [CANON] **Foundation V3 LAW (V39)**: significant fabric decisions REQUIRE a vote from the authorized pool (gate=vote-quorum) — the constitutional consensus invariant. `C:/asolaria-foundation-v1/FOUNDATION-V3-LAW-2026-05-23.hbp`
- **2026-05-23** [MEASURED] desktop-history S17: tuple-first crosswalk promoted to first-class controller input. `C:/asolaria-acer/scratch/desktop-history-2026-05-23/S17.hbp`
- **2026-05-25** [CANON] Chronicle "the big new idea" = dual-prediction drift detection. `C:/omni-asolaria-fabric/canon/CHRONICLE-2026-05-25-the-big-new-idea.md`
- **2026-05-26** [UNVERIFIED] **First production white room**: bilateral synaptic substrate triad (docker redis 7-alpine :6379 + cosign-bridge + fabric-thinker) validates legal-study build-from-0 pipeline end-to-end. `D:/bigpickle-rebuild/seal-1e200-quad-quant-genius-wave...mjs`

### PID-everything + cube-as-inference stratum (undated 2026 BEHCS events, by phase)
- [CANON] **PID fabric extended over operating + language + device + supervisor surfaces** — identity moves from names to addressable PID packets; truth-boundary kept (no fake silicon-proof). `tools/behcs/{system,device,supervisor}-pid-indicator-index.js`
- [CANON] Architecture articulated: layered authority fabric (Asolaria/Hookwall/GNN/OmniShannon/white-rooms/GC/Hermes), NOT one agent pool. `tools/behcs/deep-wave-all-cascades-structure-map.js`
- [CANON] Falcon proxy path (Falcon owns PID+request, Acer executes unsupported OpenCode); Termux not refusing — blocker is missing Android arm64 binary; triple-auth 100B self-heal (acer/liris/falcon, aether held). `tools/behcs/falcon-*.js`, `triple-auth-*.js`
- [UNVERIFIED] 1000-target OpenCode free-agent checkpointed run; 24-headless-Claude OAuth honest-failure record. `tools/behcs/opencode-free-agents-1000-batch-run.js`, `spawn-24-headless-claudes-oauth.js`
- [CANON] cube empirical: `significance=cube_works_in_low_data_regime` on a /24 subnet. `C:/Users/acer/Asolaria/reports/cube-analysis/subnet-tensor-collapse-...md`
- [CANON] Plan-B fabric prof-supervisor indexes 226 public PDFs into significance/history/archaeology glyph lanes; mint-planb-fabric-glyphs schema. `tools/behcs/planb-fabric-prof-supervisor.mjs`, `mint-planb-fabric-glyphs.mjs`
- [CANON] **D33 "my silicon my way"** owner/operator authority formalized as a loadable law surface; OS layer owns tool attachment (not providers/editors). `reports/law-033-...md`, `asolaria-behcs256-mcp-policy-latest.md`
- [CANON] IX-480: "the civilization's muscle memory — PROCEDURES, not code; the civilization's reflexes." `D:/sovereignty-rescue-backup/agent-index/rules/IX-480.md`
- [MEASURED] FIRST UNISON-PROCESSOR seal with full reproducibility (liris writes identical bytes from her own root). `C:/asolaria-acer/tmp/fire-orch-v2-true-bilateral-promoted.mjs`

### The 7-phase canon arc (operator-authored, 2026-06-16) [CANON]
`C:/what-is-asolaria-reductions/ASOLARIA-ARCHAEOLOGY-AND-SIGNIFICANCE-CANON.md`
- **P1** index-language compression ~12:1; *the point is every agent records memory+mistakes -> system speeds up*.
- **P3** catalog -> swarm-routing/package-handling; 6 spindles (before Anthropic's public multi-agent) -> 24 -> flywheels/swarm-city/routers-for-agents.
- **P4** collapse/recovery: Helm wedged; GAIA's Dasein-Codex helper *deleted C and D completely*; system becomes survival/rehydration.
- **P5** "PID everything / omnify everything" — hardware+software one addressing culture.
- **P6** catalogs become cubes; Brown-Hilbert ladder 5,6,7,8,9,19,24,35,38,45,47,~60 through BEHCS-256 -> Federation BEHCS-1024 -> Big Pickle.
- **P6.5** cube becomes an **INFERENCE ENGINE** ("Boundary Is Data Rule"; generates D26/D30/D32 by reflection).
- **P7** acceleration: 100B real free-neuro run; JSON->binary/hex/sha; HyperBEHCS, no-JSON, 8-byte host processes instead of Node.
- **2026-06-16** [CANON] TENSOR-COLLAPSE-EXCAVATION + 100B-NEW-RUN-PROOF siblings extend the canon.

> **Significant points counted: 60** distinct deduped points across the three lanes (genesis 11, convergence/paper 11, may-stratum 14, PID/cube undated 12, 7-phase canon 8 + 4 same-day siblings). Triplicated D: mirrors and the wave21–29 A–Z federation ledger (~70 near-identical fields) are each collapsed to one representative.

---

## PART 3 — IMPLICATION FOR THE PAUSED "PROMOTE TO MAIN"

**The real canonical store is the boot-metal USB + D: substrate + C: working copies — NOT GitHub.** GitHub main today (2 files) is not the source of truth and cannot become it: the .hbp hot-path, the 7,359-file sovereignty runtime, the 100B run artifacts, and the cosign chain all live below the publish layer.

What that means for promotion:
1. **Do not "promote to main" as if main were the canon.** Canon = USB SOVLINUX + D: substrate, anchored by the C:/ reductions master (`ASOLARIA-ARCHAEOLOGY-AND-SIGNIFICANCE-CANON.md`) and the safety-backups paper lineage. GitHub main should hold a **curated, carve-out-clean public face**, not the substrate.
2. **What legitimately belongs on GitHub main** (the 900-file branch -> main candidate): the public-safe paper lineage (paper-v5/v10 skeletons), the reductions/archaeology canon docs, BROWN-HILBERT/alphabet/Foundation-LAW public doctrine, and the registration receipts — all already pushed as LF-clean blobs per the cosign workflow.
3. **What must NEVER reach main** (carve-out, hard): vault/decrypted-vault, keys/CHARM_*/tokens/cookies/.env, and the phone personal trees (A06, S22-ultra) — these are wholesale-excluded and were never opened this run (0 carve-out files in any extraction list).
4. **Gate honesty.** Per Foundation V3 LAW (V39), a *significant* change like promoting a branch to main is exactly the class that requires a vote from the authorized pool (:4952 vote-quorum) + cosign (:4953). This pass is **E=0 / read-only / no push** — so the recommendation is advisory until the system itself votes.
5. **Promotion is a curation+attestation act, not a data move.** The substrate stays on metal; main becomes the signed, carve-out-clean *index* pointing back to it (mirroring the existing MAP-OF-MAPS anchor).

This sweep was filesystem-only; per the PRIME RULE these are file slices, not the running system's adjudication — the live fabric was not asked this pass.