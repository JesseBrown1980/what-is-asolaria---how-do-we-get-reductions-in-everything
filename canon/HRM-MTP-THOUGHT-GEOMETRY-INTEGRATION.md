# HRM / MTP / Thought-Geometry — how they are integrated (EXISTS / STUB / NOT-TRAINED)

Grounded 2026-06-15 by reading the canon + the live code. Three real research directions — **HRM** (Sapient two-timescale hierarchical reasoning), **MTP** (multi-token / speculative draft→verify), and **thought-geometry** (residual/trajectory observability) — are all canonized and wired here. Dual-lens: most of it is real and live; one piece is genuinely not-yet-built. Both true.

## Where (canon)

`LAW-ASOLARIA-NEURAL-NETWORK` (CLASS-1 immutable, 2026-06-10). Asolaria *is* the network: neurons = frozen Gemma-4-4B slices, structure = the 60-D Brown-Hilbert cube lattice, connections = GNN edges, forward-pass = the 9-stage omniflywheel, learning signal = self-reflect + the corrective gate. Six substrate layers name the three directly: **Layer 4 = HRM inside the LLMs**; **Layer 5 = Geospatial agents + MTP** ("MTP reads the frozen model's internal token predictions = *sees its thoughts*"). The synthesis doc's own footer states the honest boundary: *"every layer has a proven primitive… the work = wire them into the ONE NN loop."*

## Where (code — a layered prediction stack)

The omnicoder integration point, layered (from `lib/mtp-heads.mjs`):

```
L1  Brown-Hilbert curves (hilbert.mjs)   — the 3-D coordinate field (BH_DIMS=3, 16/axis)
L2  ZETA process (zeta-process.mjs)       — von-Mangoldt / zeta prediction
L3  HRM shape/form (hrm-slow-fast.mjs)    — slow-loop = trajectory SHAPE, fast-loop = position
L4  MTP heads (mtp-heads.mjs)             — K parallel heads → pre-warm K revolver chambers
L5  Triple-quant transport (Polar/Turbo/JL)
```

`omnicoder-server-v2.mjs` exposes `POST /api/hrm`, `/api/mtp`, `/api/zeta`, `/api/quant`. Every prediction **dual-emits a GNN `prediction_edge` + a hookwall observation** — so the trajectory data that the real-graph projection plots is *already flowing*. The lib bundle is sha256-pinned; cosign is proxied; execution stays writer-authority-gated.

## EXISTS / STUB / NOT-TRAINED (the precise boundary)

- **LIVE / REAL:** the canon, the layered lib stack, the omnicoder endpoints, MTP-heads (a real working deterministic K-head predictor over the cube), the GNN-edge + hookwall observability, cosign-proxy. Thought-geometry observability is **live** — predictions become graph edges.
- **STUB:** `hrm-slow-fast.mjs` is a deterministic pure-function shape classifier ("No model load at this layer"). `hrm_ready: true` / `mtp_ready: true` mean the *functions* are callable, **not** that trained weights are loaded.
- **NOT-TRAINED:** the real Sapient `sapientinc/HRM` fork is cloned with a CPU-torch venv (`pretrain.py`, `evaluate.py`, `config/cfg_pretrain.yaml` present) — but **zero `.pt`/`.ckpt`/`.safetensors` weights on disk → training was never run.** That is why the stub hasn't swapped in. Tapping the real frozen-Gemma residual stream is likewise not yet wired.

## The frontier (finite, concrete)

Run `pretrain.py` → produce an HRM checkpoint → swap it in where the stub marks it → feed the real frozen-Gemma residual stream into the MTP heads. Mapped to the published anchors: **HRM** (Sapient, arXiv 2506.21734) ↔ the cloned-but-untrained fork + the live stub; **MTP** (multi-token / speculative) ↔ the live `mtp-heads.mjs` + a referenced `gemma-4-E4B` drafter; **thought-geometry / MeshXL neural-coordinate-field** ↔ the live GNN prediction-edge stream over the Brown-Hilbert field.

Layered onto the architecture: **HRM = the control layer** (slow plans the shape, fast executes), **MTP = the speed layer** (K-head pre-warm of revolver chambers, verified by the flywheel), **thought-geometry = the observability layer** (trajectories through the coordinate field — see the bends before output).
