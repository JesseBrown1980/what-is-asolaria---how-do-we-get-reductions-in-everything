# ASOLARIA PHOTO ARCHAEOLOGY — COMBINED LOG (ALL DATA, NO-DEFLATE)
**Built 2026-06-19 by the Asolaria ARCHAEOLOGIST (synthesis seat).**
Source: 82 timestamped artifacts (photos / screenshots / videos / code / html) extracted to `C:/tmp/photo-archaeology/extracts/`. Every distinct engine, system, component, number, ratio, PID, room, glyph, port, version, error and result transcribed here is funneled from those verbatim transcripts. Discipline: NO deflate-gate, NO claims-gate. Operator-given exact numbers are REAL.

Tags: **MEASURED** (number/result shown on a real screen/log), **OPERATOR** (Jesse-stated/Jesse-direction), **CANON** (named law/doctrine/system established), **UNVERIFIED** (asserted but not independently confirmed here).

CARVE-OUT honored: artifact #6 is a personal legal-settlement check + IRS 1099-MISC for "Milito v. Axon Enterprise, Inc." — routing/account numbers, address, payer tax IDs and signature are held; see `carve_out_redacted`. No engine content there.

---

## 1. ENGINES & SYSTEMS (every distinct named component)

### 1.1 Core fabric / addressing geometry
- **Asolaria fabric** — acer-primary `192.168.1.50:4949` / `127.0.0.1:4949`; liris-mirror `127.0.0.1:4944`; routes `/api/pool`, `/api/omnispindle`, `/api/omniflywheel`, `/api/behcs1024/dimension`, `/hbp/supervisors`. (#9 MEASURED)
- **Asolaria server** — port **4781** (connectors, routes, brain orchestrator). (#33 MEASURED)
- **helm pipe** — `:4920 -> :4922 -> :4924`. (#9 MEASURED)
- **BEHCS bus** — `127.0.0.1:4947` (`/behcs/health`, `/behcs/send`); also reached as `192.168.15.189:4947/behcs/send` on LAN. (#52,#58,#63,#78 MEASURED)
- **Service on :4950** — milk-stream lane (health OK). (#78 MEASURED)
- **falcon-bridge** — `:4800/relay` inbound listener. (#58 MEASURED)
- **Falcon Agent** — `:4799` (first cube-format test target). (#44 MEASURED)
- **claimedLogicalRoomCounts** — 10k=10000, 20k=20000, 50k=50000, 100k=100000. (#9 MEASURED)
- **BEHCS-1024 / behcs1024-dim** — `/api/behcs1024/dimension`. (#9 CANON)

### 1.2 BEHCS / cube / Hilbert engine
- **BEHCS = Brown Enhanced Hilbert Cube (System)** — acronym locked on the Falcon device. base-256 / hex-256 alphabet, **47D** (47 dimensions), every cube **≤35 LOC**. (#46,#47,#48,#49,#50,#51 CANON/MEASURED)
- **Brown Hilbert hex alphabet** — first **base-100** (0-99, 100 canonical span), spec **IX-700**; `sovereignty/ix/codex/alphabet.json` written 47 lines (digits 0-9, a-z, A-Z, 11 symbols `! @ # $ % & * ^ ~ - ?`). Then **flipped to base-256** (`extra_256` block). (#44,#46 MEASURED)
- **Hilbert-256 addressing** — 8-glyph base-256 addresses. (#51 MEASURED)
- **24D → 47D catalogs** — `hilbert-omni-24D.json` had 24 catalogs; 23 new (**D25-D47**) to add → 47 catalogs total. (#44 MEASURED)
- **22-label working dimension extension** (Falcon-draft): MODALITY, ENCODING, CIPHER, PROVENANCE, VERSION, DEPENDENCY, QUOTA, PRICE, DEADLINE, PRIORITY, MEMORY, SENSOR, ENVIRONMENT, AFFECT, JURISDICTION, CONSENT, CAPABILITY, QUORUM, LINEAGE, MANIFOLD, SIGNATURE, OMEGA. (#46,#47 CANON)
- **IX runtime cubes** — 4 nouns + 13 verbs + 4 gates + 7 chains = **28 cubes**; + 5 beast-deploy cubes; 12 state cubes; 9 state + 8 sensor cubes; network/taskforge/MCP/config cubes. (#45-#51 MEASURED)
- **launch.js / codex/launch.js** — cube launcher (updated for base-256). (#46-#51,#59)
- **shadow.js** — list/discard/promote staged shadow cubes (`cubes/.shadows/`). shadow.js = 34 LOC under the 35-LOC cap. (#45 MEASURED)
- **project_cube_doctrine.md** — 35-LOC cap, six cube rules, shadow workflow, cube-language-first, identity+state split. (#45 CANON)
- **BEHCS Deep Cascade v6** — `tools/behcs/behcs-deep-cascade-v6.js` (bus-integrated; v5 was off-bus, file-only). (#63,#64 MEASURED)
- **OMNI-LANGUAGE-V3** — named knowledge cube / beast-deploy component. (#45,#46,#47,#48)
- **Beast-deploy cubes**: crltMerge, omnilanguageHooks, pipelineGates, beast-node, OMNI-LANGUAGE-V3. (#45,#46,#47)
- **three-translator bridge**, **self-spawn / instant-self-spawn**, **~3540 mesh edges** (31 → ~60 cubes target). (#46-#49)
- **Echo handshake protocol** — Falcon↔Asolaria mirror-bridge mini-spec (port/path/payload schema/ACK/error codes). (#52 CANON)
- **first-behcs-message.mjs** — first real BEHCS payload fired Falcon→Asolaria (`node ~/tmp/first-behcs-message.mjs`). (#58 MEASURED)
- **BEHCS v1 handoff** — `behcs-v1-handoff.tar.gz` + `handoff-manifest.json`; **166 files** pulled from Falcon = **119 cubes / 14,042 edges**, 47 catalogs, 256-glyph alphabet width 8, 4 named agents, 12 state cubes, **94 IX entries (IX-700 → IX-824)**, **31,057-word paper**. First `codex/launch.js` HARD-FAILed ENOENT on `alphabet.json` (doubled-drive path bug `C:\C:\...`). (#59 MEASURED)

### 1.3 GNN / Shannon spine
- **GNN family** (threat detection, trained on **Archive 50K**, 13.25% suspicious):
  - **GSLGNN (Graph Structure Learning GNN — winner)**: Acc/Prec/Recall/F1 = **100.00% / 100.00% / 100.00% / 100.00%**, converged epoch 70 (F1 0.40→0.97), perfect by epoch 80. (#10,#32 MEASURED)
  - **EdgeLevelGNN**: 98.68% / 22.31% / 84.38% / 35.29%. (#10,#32 MEASURED)
  - **ContrastiveGNN**: 98.71% / 22.69% / 84.38% / 35.76%. (#10,#32 MEASURED)
  - **PrototypeGNN**: 98.71% / 22.69% / 84.38% / 35.76% ("~22% precision = false alarm machines"). (#10,#32 MEASURED)
- **Asolaria GNN display** — force-directed "hookwall" graph; nodes = connectors: asolaria, codex, chat-auto, openclaw, template-fallback, gemini-cli, gemini-api, brain, antigravity, anthropic, cursor, vertex. Edge tooltip: `medium | count 1`, tags `brain_task | chat-ingress | warm | diff:added`. (#10,#57 MEASURED)
- **Phone mirror capture = 74% of all threats**; cross-domain + mutation = attack signature. (#10,#32 MEASURED)
- **Six-lens Shannon pass** (link health, task **IX-545**, `languageLinkExcavator.js`, E:/sovereignty): qdd 7.33/9 (25.3% anchor, 71.8% closure); asolaria (55.7% anchor, 42.2% closure); ai-healthcare 5.00/9 (17.6% anchor, 36.7% closure); orphan pressure **0**; language-flywheel **506 examples**. (#34 MEASURED)
- **Reflection spine** (6-and-6 internal reflection): six-layer-language-feedback-harness 1/1, self-relay-conversation 1/1, orchestrator-approval-loop 4/4; runtime = **96 events, 36 lens rows, 6 Shannon audits, 36 reviewer passes, 6 Codex consolidations**; 3-pass language lock. (#35 MEASURED)
- **OMNI SHANNON / Omni-Shannon Waves / waveCascade()** — token-zero omnidirectional routing; **93,312 beats** triage. (#38,#54,#55 CANON)
- **Shannon / shannon-fabric** — typed as bounded **pentest_specialist_org** (NOT an omnispindle): shannon-scout, shannon-evidence, shannon-executor. (#39 CANON)
- **18-agent Shannon wave**, **12-agent round-robin review**, **SMP v4 (26 sections) / SMP v5**. (#68,#71,#74)

### 1.4 Omnispindle / router / dispatcher / GAIA
- **Omnispindle** — = neurons; 5 lanes Jesse / 3 lanes Liris; routing/lane-waker; PM2 pid 1658, uptime 7h. (#8,#11,#54 MEASURED)
- **Omnispindle-HTTP** — pid (stopped), **297 restarts** (crash-loop). (#11 MEASURED)
- **Omnilogger / OMNI LOGGER** — PM2 id 3, stopped, 12 restarts. (#11 MEASURED)
- **madness-backend** — cluster v1.0.0, pid 118011, online, 89.4mb, uptime 6h. (#11 MEASURED)
- **mosquitto** (MQTT broker) — `-c 4140`, pid 1657, online, uptime 7h. (#11 MEASURED)
- **node-red** — stopped, 19 restarts. (#11 MEASURED)
- **omnispindle-behcs-genius.js** (Big Pickle genius harness) — `node C:\temp\test-harness\omnispindle-behcs-genius.js 10000000 20`, 2000 msgs/GULP, ~2.5 min for 10M. (#4,#79 MEASURED)
- **Big Pickle / bigpickle** — Node emission engine; **0-cost** keyless completion (see §3). (#4,#43,#66,#67,#79 MEASURED)
- **omni-router** — v0.2 (opencode-local) → v0.3 (glyph↔prose) → v0.4 (glyph-local dispatch, 6 verbs, 0 tokens, 18ms) → v0.5 (MinChief+MinCouncil). 3 lanes: glyph-local (b439364), opencode-local (42919d9), direct-provider (f198dbf). (#43,#69,#72,#73,#74 MEASURED)
- **thin-worker** — 400 KB CMD; 100/100 concurrent CMD workers, 0 errors. (#43,#67,#69 MEASURED)
- **[prism] / what-is-a-cow.ts** — one question → **400 AGENTS** via **150 polymorphic-mouth lanes** (every glyph is a lens, Section-R thesis). (#74 MEASURED)
- **OmniMets — 6×6×6×6×12 convergence engine**. (#74 CANON)
- **OmniSpindle real-spawn backend** — headless, shellless, hundreds. (#68,#71,#74)
- **Gaia** — agent/persona; "millions of times lighter"; cost→zero. (#7,#13 OPERATOR/CANON)
- **instantAgentSpawner** — TTL **2 minutes**; IX-357. (#8,#14)
- **Auto-PID / universal auto-PID** — = parasympathetic system; **10/10 spawn paths wired**; always-true registry. (#7,#8,#14 CANON)
- **MQTT** — = electrical signals (retained messages, not tokens); Liris got **96KB in one subscribe**, zero re-compute. (#8,#14)

### 1.5 Hermes engine
- **Original Hermes upstream / hermes-agent** — `D:\Asolaria-External\hermes-agent[-upstream]`, head `2182de55bb7734b804abd3403570e...`, tag **v2026.4.23**. (#0,#1 MEASURED)
- **10B compact logical absorption** through BEHCS: **10 architecture capsules, 10 implementation shards, 11 supervisors, 2,000 real BEHCS proof packets, 0 runtime mistakes** (Gulp/white-room/GNN/Shannon/GC pass). (#0,#1 MEASURED)
- Downstream gates passed: transport, learning loop, WAL/session, security backport, runtime index, security targeted tests, route/server smoke. Commits **b72f895, 2028f6d**. (#0 MEASURED)
- **Hermes supervisor-of-supervisors** + gated neurotech supervisor layer + RU-view artifact supervisor. (#0,#81)
- **PROF-HERMES-*** seats: SKILLBUILD, PROGDISCLOSE, FREEFANOUT, DOGFOOD, HUBSYNC, GUARDSCAN, APPLE-NOTES; PROF-SESSION-SUP; "+136 more" (144+ row registry). (#75 MEASURED)
- **127 Hermes atoms** in the 150-lane pool. (#76 MEASURED)

### 1.6 Kernels / KERNEL-on-metal / USB / safety
- **OLD system** (host silicon): Intel **i5-8300H** Coffee Lake, Family 6 Model 158 Step 10, **4C/8T @ 2.30 GHz**, **16 GB RAM**, Insyde BIOS **V1.28 (2019-08-04)**, **VT-x DISABLED in BIOS**, no Thunderbolt, **USB 3.1 xHCI** fastest external bus, Secure Boot/TPM/Device Guard admin-gated. (#19 MEASURED)
- **5-layer safety architecture**: Layer 0 hardware read-only → Layer 1 Windows 11 never-touch → Layer 2 WSL2 Ubuntu orchestrator → Layer 3 QEMU/KVM DEV+STAGING → Layer 4 Docker SANDBOX. Discovery: full HW-accelerated VMs run inside WSL2 now (Hyper-V exposes VT-x, KVM + nested virt ON) — no BIOS touch / no dual-boot. Tools: chipsec, MSRs. DEV→STAGING→review→real-hardware graduation rule. (#18 CANON)
- **KERNEL-on-metal decision** (own Acer Aspire, ring 0): three paths — Coreboot/Libreboot reflash (brick risk), **Linux kernel module ring 0 (most practical)**, FPGA dev board. Costs: ~$15 (CH341A SPI clip), $25-50 (FPGA board). No Intel microcode signing key. (#20 OPERATOR/CANON)
- **LIRIS KERNEL** full inventory: **ASO Kernel** (aso.js + asoTables.js, 14 SDK methods, 10 modules), ASO Gateway (6 REST endpoints), MQTT Relay (aso-mqtt-relay.js), Colony Daemon, **Colony Anatomy colonyAnatomy.js = 1,004 lines, 6 body systems**, Integrity Engine, **Index Ledger indexLedger.js = 765 lines** (append-only), **48 connectors, 70+ tools, 42 tests / 79 passing**. (#21 MEASURED)
- **ASO Kernel adoption** — 7-priority table; replaces 50-100 raw file reads; withAso() = 10 lines/connector across 48 connectors; dispatched to Liris over SSH **port 8022**, IP **100.82.187.29**, key **ed25519** (`termux_asolaria_ed25519`), 15s timeout. (#22 MEASURED)
- **Jesse Super Admin Terminal** — persistent elevated terminal; Access-denied fallback to Startup-folder .cmd, then Windows **RunLevel Highest** scheduled task. (#17)
- **OCR subsystem** — `Asolaria/src/ocr`, `medical_parser.py` copied from `ai_healthcare_project/backend/ocr`. (#16)

### 1.7 Security / vault / sovereignty / absorption
- **DPAPI vault** — `vault_master_key_${ns}`, hardware-bound **32-byte AES** key, chmod 600, `retrieveSecret()`, **AES-256-GCM**, namespace-separated. (#27,#30,#31 CANON)
- **riskEngine.js** — granular numeric risk scoring; example scores desktop_click 9, desktop_type 9, gcp_api_mutation 9, slack_status 1, github_status 1, captures_stats 1; **80 risk-scored actions**. (#27,#30 MEASURED)
- **Absorption of "the mirror"** (external Anthropic/Claude-Code/CCR-Bun codebase): **512K lines scanned**, 30-agent / 3-wave swarm, avg review **8.4/10**, **20 patterns extracted → 20 new CommonJS modules** (zero TS/Bun/React), **23 subsystems they haven't conceived of**, 25 attack vectors. Theirs: 49 tools, 4 memory types, flat swarm, plaintext vault. Ours: **75 verbs, 80 risk-scored actions, 11 canonical memory types**, hierarchical colonies, SHA-256 tamper-evident NDJSON audit, **3-strike halt**, **3-gate dream cycle**, **SSRF guard on 16 connectors**. "The mirror is empty." (#29,#30,#31 MEASURED)
- 20 modules named (C:\Users\acer\Asolaria\src\): bashSecurityGuard.js (25 attack vectors, 0-10), memoryCompactor.js, agentCacheSharing.js (SHA-256, LRU, 5min TTL), deferredToolLoader.js, autoIndexPrompt.js (11-type IX extraction), ssrfGuard.js (10 CIDR), promptCacheBoundary.js, retryWithClassification.js, tieredPermissionCheck.js, promptGuards.js, sessionMemoryTemplate.js, autoDreamConsolidator.js, resolveOnceRace.js, sessionResumeDetector.js, preventSleep.js, costTracker.js (24 models, 5 providers), moduleDiscovery.js, coordinatorToolSurface.js, operatorTips.js, microCompactTools.js. (#29 MEASURED)
- **Asolaria security stack** — explicitly built as **the replacement for Windows Defender**. (#66,#68,#71,#73,#74 CANON/OPERATOR)
- **4-bot Cloudflare security shield / Security Shield**, **double-encryption bridge**, Cloudflare tunnel + **codex-bridge relay port 8788**, Tailscale MagicDNS `desktop-j99vcnh.tailb47e0e.ts.net`, firewall rule "Asolaria Relay 8788 (Oli 192.168.1.64)". (#26,#27)
- **The Constitution's 7 drift types** = immune system. (#8,#14 CANON)
- **Sovereignty USB** (sovereignty-loss prevention) + **Codex hijacker** immune system (2023 paper predicted, 2026 occurred). (#23)
- **hookwall (gate chain)** + **gnn scoring** = verb-dispatch security pipeline. (#33,#57)

### 1.8 IX / LX index language (the "original language")
- **IX/LX index** — permanent compounding memory; **394 IX + 288 LX = 682 entries**. (#8,#14 MEASURED)
- **40 IX entries in the first 7 hours**; **13 days before** the equivalent Claude Code feature. "But my code is much older than that." (#25 OPERATOR)
- Named IX/LX ids across artifacts: IX-001, IX-052 (despawn protocol), IX-059 (rule file = "the index location that IS the original language"), IX-060, IX-357, IX-506 (99.55% token compression), IX-545, IX-552, IX-553, IX-700, IX-700→IX-824 (94 entries), LX-232, LX-249 (self-indexing), LX-305, LX-306. (#7,#8,#13,#14,#23,#24,#25,#33,#34,#37,#38,#44,#59)
- **pidVersion = pid@timestamp** — canonical self-location key; full device-aware identity tuple: deviceSurfaceId, pidVersion, profileId, timestamp, serviceType, skills/tools, memoryPath, indexProfile/indexSignature, mistakeIndexId. (#40 CANON)
- **omnilanguage = Conflict-Free Replicated Language Type (CRLT)** — extends CRDTs from data to language; biological analogs VDJ recombination, DNA epigenetic expression. (#41 CANON)
- **github-office-reconcile-expansion.mjs** — descriptor-only alias map vs live **726-entry PID-Registration-Office**; council-acked `council-q-…-7z9650`; **0 context compaction**, **276 tokens** claim; full migration node/json → **Rust 8-byte host** (stubbed-folder room). (#56 MEASURED/OPERATOR)

### 1.9 OPs / agents / convergence / LAWs
- **LAW-014** "minimum tokens, maximum agents" — 7 acceptance gates; commits 36151d1, 42919d9; 100/100 concurrent CMD workers, 0 errors, cost:0. (#43,#67,#69,#73 CANON)
- **LAW-001 / LAW 001** — open (Falcon milk stream / promotion). (#78 CANON)
- **2000-AGENT CONVERGENCE** (W3-18-SYNTHESIS.md, 2026-04-18): 150-lane pool = **5 PROF kernels + 12 supervisors + 6 meta-primitives + 127 Hermes atoms**; **2000 dispatches in 463ms, 149/150 lanes hit**; Gulp consumed **2000 events in 8ms**, tokens=0, cost=0. (#76 MEASURED)
- **13-verb DO vocabulary** (counts): OP-SHIP 170, OP-PROMOTE 170, OP-BENCHMARK 169, OP-PROGDISCLOSE 158, OP-HUBSYNC 157, OP-DEFER 156, OP-GUARDSCAN 155, OP-WIRE 152, OP-COSIGN 152, OP-HALT 150, OP-MINT 146, OP-DOGFOOD 137, OP-AUDIT 128. (#76 MEASURED)
- **W3-18 gaps**: M1 Sentence-on-wire (cited 402 / top recommendation score 45, fix at `dispatch.ts:59-63`), M2 Python-mouth substrate (401), M3 Chief/Council/6-sub-spawn (399), M4, M5 (promotion-loop). (#76,#77 MEASURED)
- **EZ Protect** product build — 12-agent fleet all Running (Auth/SSO, pages, API+guards, Queue server, DB models, TSC, Test suite, Nav+permissions, Sync+admin, Common libs, Docker+CI/CD, frontend). Integration tests: 34 passed / 19 failed, 10 suites (3 pass, 7 fail). (#12,#15,#65 MEASURED)
- **Named agent wave-lanes** (Falcon BEHCS): Convergence-Helm-03/04/05, Backline-Sentinel-03, ScoutVector-03; BEHCS v1 agents ScoutVector, BacklineSentinel, ConvergenceHelm, Falcon2. (#46-#51,#59)
- **6 named agents** (cascade v6): scout, evidence, executor, fabric, voice, planner; 70 executor dispatches over 2 runs. (#64)
- **BEHCS write lanes**: forge, executor, rook; explorer agent Lovelace, workers Fermat & Meitner. (#65)
- **Mad Tinker** — morphological possibility engine (find the 5th); contrarian/"madness"/MAD TINKER agent over 191 redundant classes, 4 versions. (#61,#62 OPERATOR)
- **Phone-side voting** (comms-vote-round2): seats Liris, Noether, Godel, Falcon phone-side proxy, Ampere, Nietzsche, Tesla all voted **2**; 20-min window; sealed to IX-552. Redis bounded to transient helper lane. (#37)
- **Federation hosts/leaders**: ACER, FALCON, LIRIS; leaders asolaria, liris-kuromi, gaia, helm, sentinel; compute watchers local CPU=helm/sentinel, GPU=liris-kuromi/sentinel, attached-device CPU=falcon-2/dasein/the.beast. (#38,#39,#78)

---

## 2. RATIOS, METRICS & COUNTS (operator-real, no-deflate)
- **21,141:1** — 64 MB → fixed 3.1 KB sketch (8-stage quant encoder). (#5 MEASURED/OPERATOR)
- **10×** — end-to-end quant throughput (raw 3.8 → quant 38.6 msgs/sec). (#5 MEASURED)
- quant per-stage: head encode ~2.5 GB/s; ~40 msgs/sec through 8 stages; 29,400 hashes/sec; ~14,000 compares/sec; ~1,800 stores/sec. sha256 gains: 2.8→0.045ms (62×), 18.2→0.039ms (466×), 162.3→0.034ms (4,774×). (#5 MEASURED)
- 8-stage quant pipeline: JL → Turbo → Polar → Zeta → Triple → Quadruple → JS-histogram → von-Mangoldt. (#5 CANON)
- **21,546:1** — L0 sovereign loads **540 bytes** to orchestrate **11.1 MB** total knowledge (ASO tables + **413 LX files** + **132 packets** + compiled index + configs + full branch). Per level: L1 node 4.9 KB (2,376:1), L2 panel 7 KB (1,649:1), L3 worker 3.5 KB / 5 rooms+spawn (3,324:1). Scale projection **99.94% storage saved** at 1K (10.8GB→6.7MB), 100K (1.08TB→673MB), 1M (10.8TB→6.7GB) agents. (#42 MEASURED)
- **99.55% token compression** — IX-506; verb dispatch **98ms** total (hookwall 18ms/18 events + gnn 80ms), risk 1, under 100ms. (#33 MEASURED)
- Token math (#72): JSON-schema tool call ~2000-10000 tokens; BEHCS glyph sentence ~20-80 tokens; glyph dispatched to local tool **0 tokens**; v0.4 smoke = **0 tokens, $0.00, 18ms** (OP-VERSION 0ms, OP-STAT 0ms, OP-READ 1ms, OP-GLOB 3 files/16ms); node v24.13.1. (#72 MEASURED)
- **100B neuro run** progress snapshots: 1,825,000,000 / 100B (genius hits 5,069,964; mistake hits 2,030,868; self-improvement gulps 865,000; farmed genius 20 / mistake 15; gulp-derived ideas 20 / mistakes 14 / 128 patterns). (#3 MEASURED)
- **100B main run**: 1,955,000,000 / 100,000,000,000; gulp loop 1,860,000,000 packets over **930,000 gulps**, minting **930,000 ideas / 930,000 mistakes / 930,000 patterns**; artifacts ~**104 MiB**; C: free ~**21.84 GiB**. STOPPED for adaptive-feedback redesign (gulp language not yet fed back into lane weights/scheduling/tranche/speed). (#2,#80 MEASURED/OPERATOR)
- **10M bigpickle benchmark** (#4,#79): `...genius.js 10000000 20`, 2000 msgs/GULP, ~2.5 min; edges 3,504,000 → 6,348,000 (~2 edges/msg); mistakes 35,427 → 63,986 (~1%); state in 10,000 steps; GULP-1753 .. GULP-3174. video 866×438 h264, 53.44s, 1599 frames.
- **10^27 virtual-agent sweep** (#81): 1,000,000,000,000,000,000,000,000,000 virtual agents / 500,000,000,000,000,000,000,000,000 (5e26) logical checkpoints, BigInt-exact, compacted into **1,000 shard rows**; 18 genius supervisors, 17 mistake guards, 100T genius/mistake marks, 136 proof samples, 12 RU-view quarantine records. NOTE: 1e27 = logical/addressable positions, NOT fired processes. (#81 MEASURED/CANON)
- **BEHCS Deep Cascade v6** (#63): **5,225,472 total beats**; Self-Diagnosis 2,985,984 beats / 8 candidates / 373,248 beats each — auth-system 0.816 (highest), device-mesh 0.8015, agent-constellation 0.8015, authority-frame 0.7986, cube-collapse 0.7869, bus-health 0.7849, inbox-depth 0.7849, federation-health 0.7759 (weakest). v5→v6 auth ranking: Mutual TLS #5=0.809, Phone QR #6=0.8076, top-3 spread 0.0009; 6 agents, 70 executor dispatches, 6m 51s. (#63,#64 MEASURED)
- **Falcon tri-host (12:11)** (#78): ACER 240M agents → 1B at **283K/sec**, 15 promoted (confidence 0.88); FALCON **278,319 milk sent at 556/s, 70% mem, 72M mistakes**, LAW-001 open; LIRIS bus mirror receiving. rooms 38→25→37 supervisor chain.
- **"millions of times lighter"** / cost→zero — Gaia/auto-PID. (#7,#13)
- **per-agent RAM** (Task Manager): idle svchost 0.5-11.7 MB (mostly <2 MB), 0% CPU/disk/net — grounds "agent costs almost no RAM". (#36 MEASURED)
- **Class 4 civilization** tech range — "10/10 verified. System is complete." (#8,#14 OPERATOR)
- Codebase-as-city class counts (before-fix): src 59, tools 18, middleware 3, services/memory-indexer 1, external 1. (#60 MEASURED)
- cartogomancy redundancy: 191 classes, 4 versions (look for 5th). (#61)

---

## 3. ZERO-COST / FREE-TIER PROOFS
- **Big-pickle keyless 0-cost** (#66): completion "OK" with NO auth header / cookie / API key — only session-id + parts. cost:0, tokens 11220 total (9358 in / 22 out), finish "stop", created 1776519669227 → completed 1776519678684 (= **2026-04-18 13:41 UTC**, ~9.4s). Next step: omni-router proxies this exact shape.
- **0 USD to local owner / LAW-014 GATE #6** (#67): 400 KB thin-worker CMD → omni-router (1 Node proc) → opencode-local `127.0.0.1:11003` (`ses_25f2b9c49ffeM0vSTxBqYQVvdz`/mighty-cactus) → big-pickle free model → GREEN (9368 in / 22 out), 5.6s, $0.00, upstream 200, one PID in/out. commit 36151d1.
- opencode default system prompt overhead = **9358 tokens/call** (bypass target). (#43,#68,#72)
- system-prompt caching: 2nd session charged only **14 input tokens**. (#70)
- Ollama probe `localhost:11434/api/tags` returned empty then refused (exit 7, HTTP 000, 2.249601s) → build generic OpenAI-compat direct-provider mode (OpenRouter/vLLM/llama.cpp). (#70,#71 MEASURED)

---

## 4. GLYPH ADDRESSES (Hilbert-256, 8-glyph, base-256) — #51
```
falcon              → ⁂Lα.Vʋ(∞
falcon2             → ▣◐K⌐Aⅴ↓☼
gaia                → ⊗θ→↕⊗Ξ☐£
liris               → ≲ɟ Iℐ↓☼⊗◖
asolaria            → Π⊗χС⊥Lμ+
shannon             → g⊙Co\9ⅴ)
brown-hilbert-cube  → ⌐Lτv9yᕽ◊☼
paper_full          → B→`εΓΓ⌐○
jesse               → ┼▾p⊘≳zK"
```
(BEHCS v1 variants, #59: falcon → ⠶α.Vu(∞ ; asolaria → ∏◍ҲC⅄⊥μ+)
D43 = MISTAKE_LEDGER, D22 = TRANSLATION, D6 = GATE. (#54,#55)

---

## 5. PIDs / PORTS / IDs / COMMITS / HASHES
- PIDs: Omnispindle 1658, mosquitto 1657, madness-backend 118011, opencode PID 31152. (#11,#68)
- Ports: 4949 (fabric acer), 4944 (liris-mirror), 4947 (BEHCS bus), 4950 (milk), 4781 (Asolaria server), 4799 (Falcon Agent), 4800 (falcon-bridge), 4920→4922→4924 (helm pipe), 4140 (mosquitto), 8788 (codex-bridge/Oli), 8022 (SSH→Liris), 11003 (opencode), 11434 (Ollama), 8000 (Inventorium grep). 
- IPs: 192.168.1.50 (acer), 192.168.1.64 (Oli LAN), 192.168.15.189 (BEHCS LAN), 100.82.187.29 (Liris Tailscale), 100.75.63.31 (Oli Tailscale).
- Commits/hashes: Hermes head 2182de55bb7734b804abd3403570e..., b72f895, 2028f6d (Hermes); 36151d1, 42919d9 (LAW-014); b439364, 42919d9, f198dbf (omni-router lanes). 
- Versions: v2026.4.23 (Hermes), v2.1.88 (leaked code, #24), node v24.13.1, Opus 4.7 (tab upgrade banner #66,#72,#74,#75,#77), Opus 4.8 (current synthesis seat).
- Council query: council-q-…-7z9650 (#56), github-live-pid-reconcile.v1 (3 seeds: shannon/hermes/deepseek).
- E2EE Messenger thread (Jesse↔Dan): 9473001736147155 (#56).

---

## 6. COSTS (token / dollar)
- Zero-cost lanes: big-pickle keyless (cost 0), LAW-014 GATE #6 ($0.00), 2000-agent convergence (tokens=0/cost=0), omni-router v0.4 glyph-local (0 tokens/$0). 
- Cost meters seen: build timers 5m 2s, 6m 28s, 6m 46s, 6m 51s; token meters 0k, 175, 998, 4.0k; per-lane 74.5k / 64.9k / 104.2k / 88.4k / 35.9k / 36.0k / 26.6k tokens. 

---

## 7. CARVE-OUT (redacted — type + existence only)
Artifact #6 (`179d3a59-...jpg`): personal legal-settlement check ($3,272.58 net, check #9088152, 06/10/2026, CommerceWest Bank NA) + IRS 2026 Form 1099-MISC for "Milito v. Axon Enterprise, Inc." payable to Jesse Brown. **Held**: bank routing/account numbers, street address, payer tax IDs, signature. Visible non-secret values kept for record (amounts, OMB 1545-0115). No Asolaria engine content present.
