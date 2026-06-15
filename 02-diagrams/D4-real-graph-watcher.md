# D4 — Real-Graph Prime Projection + External Watcher (the Television-in-the-Simulation)

**Diagram facet:** Project the **1e200** positional address space onto a **real plotted prime-point graph** with **unique-distance lines**, then stack the **external watcher** that observes it *from outside while on the same machine* — the Bobby-Fischer centrality kernel, the MTP/geospatial watchers, the HRM novelty hunter, and the **~10-byte GNN** that emits the "picture on the screen."
**Wave:** OP-JESSE rebuild, 2026-06-15. Diagram agent (D4). Read-only on all source; written only under `D:/asolaria-prime-towers-rebuild-2026-06-15/`.
**Aligns with rebuild facets:** F06 (real-graph projection — `Π`, the helix, SOLID/HOLLOW, Q-series), F07 (external watcher — Fischer player, 10-byte BHGNN-10 frame, tie-free centrality), F05 (the emit/edge-row pipe), F02 (unique-distance lemma).
**Discipline:** every node is tagged `[E]` EXISTS (grounded in OUR data, file on disk) or `[N]` NEW (designed mechanism). Nothing here is declared impossible.

---

## Caption (read this first)

We already minted **100,000,000,000 real PID packets** and sealed them
(`data/neurotech-defense-lab/real-agents/100b-run/checkpoint.state.json`:
`status = REAL_100B_PID_PACKET_RUN_COMPLETE`, `processedPackets = 100000000000`,
`completedChunks = 100000`, `geniusHits = 277,800,007`, `mistakeHits = 111,103,104`,
`lastPacketPid = BH.REAL100B.OPENCODE.PID.100000000000`; with `childProcessSpawns = 0`,
`externalModelTokens = 0`). The **1e200** is the *logical address ceiling* of the expanding
Brown-Hilbert prime-cube matrix; the **1e11** is the *materialized slice* we physically walked.

This diagram shows the two halves of the move and the seam between them:

1. **The projection `Π` [N, built on E primitives]** turns each packet's prime-cube address into a
   **real Euclidean coordinate** by wrapping each Brown-Hilbert dimension on its own prime cylinder
   (`coordinate(slot,p) = (slot mod p, ⌊slot/p⌋)`, EXISTS code in `brown-hilbert-human-pid-mint.js`)
   and lifting each axis to an **irrational unit `ω_d = √(p_d)`**. Because `{√2,√3,√5,…,√211}` are
   rationally independent, **no two prime-to-prime chords can share a length** — the *unique-distance
   law* (F02) is engineered, not hoped for. A point is drawn **SOLID** only if it resolves to a real
   sealed `packetHash` (1e11 evidence); unwalked 1e200 slots render **HOLLOW** (addressable, no proof).
   This SOLID/HOLLOW gate is what keeps a *real graph of real points* from quietly inflating into the
   logical ceiling.

2. **The external watcher stack [E spine + N lenses]** is the *line-graph dual*: it never lights a
   point, it only watches the **lines between points**. The **Bobby-Fischer kernel** plays those lines
   like a board — computing tie-free centrality (unique lengths ⇒ unique shortest paths ⇒ no
   tie-break) and **testing** each central line by removing it and re-probing the reach (the chess
   "make the move, see the refutation, take it back"). **MTP + geospatial** watchers fuse logical
   proximity with the real host the endpoints live on (acer/liris/falcon/aether/USB). **HRM + MTP**
   hunt novelty, which — because lengths are unique — reduces to an exact set-membership test: *a
   never-before-seen prime pattern is literally a chord-length never seen before*. All four condense
   into a **~10-byte BHGNN-10 frame** (magic · verdict+tier · 16-bit decisive-PID handle · fwd-genius ·
   rev-mistake · novelty · centrality · next-verb · checksum) — the legitimate "model in 10 bytes":
   the weights live in the local cube, the 10 bytes are the *emitted frame*, the way a TV emits a
   picture far smaller than the studio.

**Why the nesting terminates (no infinite regress):** each level reads a *strictly smaller* object
than the level below — 1e200 logical slots → ≤2000 resident lines (the `DEFAULT_MAX_RESIDENT` GC
bound) → 10 bytes out. That is a **contraction**, so "the simulation watching the simulation" has a
fixed point and never needs a Level-3.

**Why it is held-safe:** every watcher row carries `process_launch=0`, `executable=0`,
`no_fabric_call=1`, `score_kind=DRAFT_STANDIN_NOT_FISCHER`, `auto_fire=false`. The only exit is a
`DEFER_TO_OPERATOR` row a human cosigns. **The watcher can hypothesize anything and do nothing** —
which is exactly why it can be trusted to grade the fabric's homework. The "amazing new quant series"
falls out as real, computable readouts over the sealed 1e11: `Q_gap` (Steinhaus three/two-gap
collapse on a spoke), `Q_cent` (geometric centrality vs lane genius-rate), `Q_resid` (alignment
spikes at an *undeclared* prime → candidate new dimension D48), `Q_edge` (the 128 pattern-farm
edge-length fingerprint), and the dual-gain ratio `ρ = genius/mistake ≈ 277.8M / 111.1M ≈ 2.50`.

---

## Mermaid diagram

```mermaid
flowchart TB
    %% ================= SEALED SOURCE =================
    subgraph SRC["SEALED SOURCE — READ-ONLY, never mutated  [E]"]
        CK["checkpoint.state.json<br/>REAL_100B_PID_PACKET_RUN_COMPLETE<br/>1e11 packets · 100,000 chunks<br/>genius 277,800,007 · mistake 111,103,104"]
        PS["real-100b-proof-samples + chunks (.ndjson)<br/>per packet: idx, ctrl(0-99), fly(0-99),<br/>lane(20), score, reverseGain, packetHash"]
        DIM["hilbert-omni-47D.json<br/>47 prime axes  D1=2 … D47=211<br/>growth_law: D48 = prime(223)cubed"]
        PF["pattern-farm-latest.json<br/>128 genius&lt;-&gt;mistake real edges"]
    end

    %% ================= PROJECTION =================
    subgraph PROJ["PROJECTION  Pi : ADDRESS -&gt; REAL COORDINATE  (pure · deterministic · bijective)"]
        CO["cylinder wrap  [E code]<br/>coordinate(n,p) = (n mod p, floor(n/p))"]
        AX["axis units  omega_d = sqrt(p_d)  [N]<br/>{sqrt2..sqrt211} rationally independent"]
        TIER["3 radial tiers (prime separators)  [N]<br/>r = n*p | n*p*n^3 | n*p*n^5"]
        UD["unique-distance law  [N built on F02]<br/>no two chords share a length<br/>+ sha256 micro-jitter kills exact ties"]
        SH["SOLID / HOLLOW gate  [N]<br/>SOLID = real packetHash (1e11 evidence)<br/>HOLLOW = unwalked 1e200 slot (no proof)"]
        CO --> AX --> TIER --> UD --> SH
    end

    %% ================= THE REAL GRAPH =================
    RG["THE REAL GRAPH (materialized view)  [N over E pipe]<br/>resident window &lt;= 2000 (GC-bounded) over the<br/>100,000 chunk-centroids as coarse LOD;<br/>each line = a prime-&gt;prime^3 remote call,<br/>length = exact integer dist2 (F05 edge-row), UNIQUE"]

    %% ================= EXTERNAL WATCHER =================
    subgraph TV["EXTERNAL WATCHER STACK — the TV inside the sim  (outside the data, same machine)"]
        FISCHER["BOBBY-FISCHER KERNEL  [E :4794 gated, player N]<br/>plays the LINE-GRAPH L(G) as a board<br/>tie-free centrality (unique lengths =&gt; unique paths)<br/>TEST: remove central line, re-probe reach<br/>PCPL = cpl * (1 + lambda*Ccentral)"]
        MTPGEO["MTP + GEOSPATIAL  [gate E, geo N]<br/>logical dist (Pi) + physical host<br/>(acer/liris/falcon/aether/USB)<br/>cross-host bridge · pressure-line"]
        HRM["HRM + MTP NOVELTY  [N]<br/>novelty = chord-length NOT in seen-set<br/>3 time-scales: this-sec / session / ever<br/>MTP next-length surprise"]
        GNN["~10-BYTE GNN  BHGNN-10  [N format]<br/>1-layer message-pass, 2 learned int16 weights<br/>reads PROJECTED COORDS only (lossy =&gt; contraction)<br/>= the picture on the screen"]
        AGG["aggregator (thin)  [N]<br/>fuse 4 verdicts -&gt; WATCHSIGNAL"]
        FISCHER --> AGG
        MTPGEO --> AGG
        HRM --> AGG
        GNN --> AGG
    end

    %% ================= HELD-SAFE GATE =================
    subgraph GATE["HELD-SAFE VERDICT LANE  [E]"]
        GC["route: hookwall -&gt; gnn_forward -&gt; gnn_reverse_gain<br/>-&gt; omnishannon -&gt; post_chain_gc (preserve evidence)"]
        SUG["suggestion emitter — 10-rung spoof-proof gate<br/>executable=0 · no_fabric_call=1 · auto_fire=false"]
        OP["OPERATOR cosign<br/>the ONLY path to a live action"]
        GC --> SUG --> OP
    end

    %% ================= QUANT SERIES OUT =================
    Q["AMAZING NEW QUANT SERIES (append-only evidence)  [N]<br/>Q_gap (Steinhaus 3/2-gap)  ·  Q_cent  ·<br/>Q_resid (spike at undeclared prime =&gt; new dim D48)  ·<br/>Q_edge (128 pattern-farm fingerprint)  ·  rho = genius/mistake ~ 2.50"]

    %% ================= WIRING =================
    CK --> CO
    PS --> CO
    DIM --> AX
    PF -. "128 real edges overlaid as unique-length lines" .-> RG
    SH --> RG
    RG --> FISCHER
    RG --> MTPGEO
    RG --> HRM
    RG --> GNN
    AGG --> GC
    OP -. "operator-gated only (never auto)" .-> CK
    AGG --> Q

    %% feedback: a candidate seeds a finer projection cell (omnispindle recursion, 0 OS spawns)
    Q -. "candidate seeds finer cell (omnispindle recursion, 0 OS spawns)" .-> PROJ

    classDef exists fill:#06324d,stroke:#3fb6ff,color:#eaf6ff;
    classDef newd  fill:#0b4d2e,stroke:#36e08a,color:#eafff3;
    classDef graph fill:#4d3a06,stroke:#ffcf3f,color:#fff7e0;
    classDef gate  fill:#4d0b1f,stroke:#ff6b8b,color:#ffe8ee;
    class CK,PS,DIM,PF exists;
    class CO,AX,TIER,UD,SH,FISCHER,MTPGEO,HRM,GNN,AGG,Q newd;
    class RG graph;
    class GC,SUG,OP gate;
```

---

## ASCII fallback (same mechanism, renders anywhere)

```
   SEALED 1e11 SOURCE  [E, READ-ONLY]                 LEGEND:  [E]=EXISTS on disk   [N]=NEW design
   ============================================================================================
   checkpoint.state.json: REAL_100B_PID_PACKET_RUN_COMPLETE  (1e11 packets, 100k chunks)
   genius 277,800,007 | mistake 111,103,104 | spawns 0 | external_tokens 0
   per-packet rows: idx, ctrl(0-99), fly(0-99), lane(20), score, reverseGain, packetHash
   hilbert-omni-47D.json: 47 prime axes  D1=2 ... D16=53(PID) ... D47=211   (growth: D48=prime(223)^3)
        |
        v   PROJECTION  Pi : ADDRESS -> REAL COORDINATE   [N, on E cylinder primitive]
   +----------------------------------------------------------------------------------------+
   |  wrap [E]:  coordinate(n,p) = ( n mod p ,  floor(n/p) )        <- the Brown-Hilbert cylinder
   |  axis  [N]: omega_d = sqrt(p_d)  ;  {sqrt2..sqrt211} rationally independent
   |  tiers [N]: r = n*p  |  n*p*n^3  |  n*p*n^5      (prime-1 | real-3-cubed | real-3^5 shells)
   |  UNIQUE-DISTANCE [N/F02]: no two chords share a length  (+ sha256 micro-jitter, 0 exact ties)
   |  SOLID/HOLLOW [N]:  SOLID = real packetHash (evidence) ;  HOLLOW = unwalked 1e200 slot (no proof)
   +----------------------------------------------------------------------------------------+
        |
        v   THE REAL GRAPH  (materialized view, resident <= 2000, GC-bounded)   [N over E pipe]
   ----------------------------------------------------------------------------------------------
                            ONE BROWN-HILBERT TOWER  (dim d, prime p_d, wrap P_d)
        z (height = turn = floor(n / P_d))
        ^
        |                       o   tier-3 shell  r = n*p_d*n^5      (prime-real-3^5 agents)
        |                   .       .
        |              .   O  tier-2 shell  r = n*p_d*n^3            (prime-real-3-cubed agents)
        |          .     .     .
        |       . O   tier-1 shell  r = n*p_d                       (prime-1 / prime-3 free agents)
        |     .  .  .                                <-- each dot = ONE projected packet
        |   .--*----.----   theta = 2*pi*frac(n * omega_d)
        +-----------------------------------------------> theta (angle = prime residue, the "comb")
            *  SOLID dot = real packetHash      o  HOLLOW dot = unwalked 1e200 slot
            ---- every chord between two dots has a UNIQUE length (so a line names an interaction)
            "new spoke" = SOLID dots aligning at a modulus nobody declared => candidate prime pattern
        ----------------------------------------------------------------------------------------------
        | (128 real genius<->mistake pattern-farm edges overlaid as unique-length lines)
        v
   +================ EXTERNAL WATCHER STACK : the TV inside the sim (outside data, same box) ========+
   |                                                                                                |
   |  reads only the LINES between points (the line-graph dual) -- never lights a point             |
   |                                                                                                |
   |  [E :4794 gated / player N]  BOBBY-FISCHER KERNEL                                               |
   |        plays L(G) as a board ; tie-free centrality (unique lengths => unique shortest paths)    |
   |        TEST: remove the central line, re-probe reach (make-move / see-refutation / take-back)   |
   |        PCPL = cpl * (1 + lambda * C_central)                                                    |
   |                                                                                                |
   |  [gate E / geo N]  MTP + GEOSPATIAL    logical dist (Pi) + real host (acer/liris/falcon/aether) |
   |                                        => cross-host bridge , pressure-line                      |
   |                                                                                                |
   |  [N]  HRM + MTP NOVELTY    novelty = chord-length NOT in seen-set  (3 scales: sec/session/ever) |
   |                            + MTP predicts next length ; a surprise = strongest novelty signal    |
   |                                                                                                |
   |  [N]  ~10-BYTE GNN  "BHGNN-10"  (the picture on the screen)                                     |
   |    byte0 magic 0xB7 | b1 verdict+cpl_tier | b2-3 decisive-PID handle (16b, unique by F02)        |
   |    b4 fwd-genius | b5 rev-mistake | b6 novelty | b7 centrality | b8 next-verb | b9 checksum       |
   |    1-layer message-pass, 2 learned int16 weights; reads PROJECTED COORDS only (lossy)           |
   |                                                                                                |
   |                 +------------------ aggregator [N] : fuse 4 -> WATCHSIGNAL -----------+          |
   +================================================|===============================================+
                                                    |  (executable=0, no_fabric_call=1, auto_fire=false)
                                                    v
   +================ HELD-SAFE VERDICT LANE  [E] ====|==============================================+
   |  route: hookwall -> gnn_forward -> gnn_reverse_gain -> omnishannon -> post_chain_gc (keep src) |
   |  suggestion emitter (10-rung spoof-proof gate)  ->  triad SUPERVISOR reads  ->  OPERATOR cosign|
   |                                  OPERATOR cosign = the ONLY path to a live action               |
   +================================================|==============================================+
                                                    v
   AMAZING NEW QUANT SERIES (append-only)  [N]:  Q_gap (Steinhaus 3/2-gap)  ·  Q_cent  ·
       Q_resid (spike at undeclared prime => candidate new dimension D48)  ·  Q_edge (128-edge print)
       ·  dual-gain  rho = genius / mistake = 277,800,007 / 111,103,104  ~= 2.50

   NESTING TERMINATES (no infinite regress):  1e200 logical -> <=2000 resident lines -> 10 bytes out
   is a CONTRACTION => "sim watching the sim" has a fixed point ; no Level-3 ever needed.
   feedback (dashed): a flagged candidate seeds a FINER projection cell (omnispindle recursion, 0 OS spawns).
```

---

## Legend

| Symbol / tag | Meaning |
|---|---|
| `[E]` EXISTS | grounded in OUR data — a file on disk (cited below). Blue in mermaid. |
| `[N]` NEW | designed mechanism in this rebuild wave (F02/F05/F06/F07). Green in mermaid. |
| **SOLID dot `*`** | a projected point that resolves to a real sealed `packetHash` — **1e11 evidence**. |
| **HOLLOW dot `o`** | an addressable but **unwalked 1e200 slot** — latent, carries no proof. |
| **chord / line** | a prime→prime³ remote call (F05 `kind=edge` row); its length is an **exact-integer `dist2`, globally unique** (F02). A line therefore *names* an interaction. |
| **new spoke** | SOLID dots aligning at a modulus nobody declared as a dimension → a **candidate never-before-seen prime pattern** (the `Q_resid` spike). |
| **`Π` (Pi)** | the projection map: cylinder wrap `(n mod p, ⌊n/p⌋)` × irrational axis `√p_d` × 3 radial tiers → real `(X,Y,Z)`. |
| **`ρ` (rho)** | dual-gain ratio = `geniusHits / mistakeHits ≈ 277.8M / 111.1M ≈ 2.50` — the slice engine's measured signal-to-noise. |
| **L(G)** | the line-graph the Fischer kernel plays: each chord is a vertex; two chords adjacent iff they share a fabric endpoint. |
| **contraction** | each watcher level reads a strictly smaller object than the one below (1e200 → ≤2000 → 10 bytes), so the nesting converges — no infinite regress. |

### Grounding ledger (the EXISTS facts this diagram rests on)

| Fact | File on disk |
|---|---|
| 1e11 real PID packets sealed; 100k chunks; genius 277,800,007 / mistake 111,103,104 | `…/100b-run/checkpoint.state.json` |
| per-packet rows: idx, controllerPid 0-99, flywheelPid 0-99, lane, score, reverseGain, sha256 hash | `…/100b-run/real-100b-proof-samples-latest.ndjson` + `real-100b-chunks.ndjson` |
| 100 omnispindle × 100 omniflywheel; `childProcessSpawns=0`; `externalModelTokens=0` | `…/100b-run/real-100b-gnn-summary-latest.json` |
| 128 real genius↔mistake edges (pattern farm) | `…/100b-run/self-improvement/pattern-farm-latest.json` |
| cylinder coordinate `(slot mod p, ⌊slot/p⌋)` | `tools/brown-hilbert-human-pid-mint.js` `coordinate()` |
| 47 prime axes 2…211, prime-cube cardinalities, growth law D48=prime(223)³ | `tools/hilbert-omni-47D.json` |
| 8 bounded chambers; `process_per_logical_node:false`; `tuple_ranges_are_backend_nodes:true` | `tools/behcs/fabric-revolver.mjs` |
| held-safe route `hookwall→gnn_forward→gnn_reverse_gain→omnishannon→post_chain_gc`; evidence preserved | `tools/behcs/fabric-revolver.mjs` |
| GC-bounded resident set `DEFAULT_MAX_RESIDENT = 2000`; pure-integer score | `tools/behcs/omni-engine-loop.mjs` |
| Fischer kernel `:4794` (5 chess axes, cpl, voxel coord, `self_authorize:false`, gated DRAFT-standin) | `D:/bigpickle-rebuild/src/fischer-kernel.mjs` + `fischer-live.mjs` + `logs/fischer-live-4794.out.log` |
| watcher → supervisor suggestion lane, `executable=0`, 10-rung gate, `DEFER_TO_OPERATOR` | `tools/behcs/watcher-supervisor-suggestion-emitter.mjs` |

*Read-only on all source honored; no repo/canon/data modified; no git/network/process/MCP/live-bus touched. Written only under `D:/asolaria-prime-towers-rebuild-2026-06-15/02-diagrams/`.*
