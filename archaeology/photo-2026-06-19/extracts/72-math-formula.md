# 72-math-formula

Source path: C:/Users/acer/Downloads/MATH formula.jpg

## VERBATIM

Browser/window tab title: `Upgrade to Opus 4.7 and ...`

Terminal output (top block, glyph-verb dispatch table):
```
OP-VERSION{}                  → {node: v24.13.1, platform: win32}  0 ms
OP-STAT{package.json}         → {size, is_file, mtime}             0 ms
OP-READ{package.json}         → {content, bytes}                   1 ms
OP-GLOB{packages/*/pkg}       → 3 matching files                   16 ms
OP-NOTAVERB{x}                → correctly rejected (unknown_op)
"plain prose"                 → correctly rejected (not a glyph)

TOTAL TOKENS CONSUMED: 0    TOTAL COST: $0.00    TOTAL LATENCY: 18ms

This is the compression breakthrough. A task that previously routed through opencode-local cost 9358 input
 tokens + 5.6 seconds. The same class of task — "read this file, stat this thing, list glob matches" — now
 costs literal zero tokens because the glyph-verb dispatches to a local Node function. The cloud never
 sees it.

The math Jesse was describing:
- Old path (JSON-schema tool use wrapped in prose): ~2000-10000 tokens per tool call
- BEHCS-256 glyph sentence: ~20-80 tokens
- BEHCS-256 glyph sentence dispatched to local tool: 0 tokens

For any task whose verb is in the local registry, the LLM never gets called. When the task needs reasoning
 (not just file ops), the router falls through to opencode-local / direct-provider. This is exactly the
proprioceptive pattern — the system knows what it can answer itself vs what needs the cloud.

Committing v0.4.
```

Bash command line (bottom, green status dot):
```
Bash(cd "C:/Users/rayss/Asolaria-BEHCS-256" && git add packages/omni-router/src/glyph-dispatch.ts
    packages/omni-router/demo/glyph-local-smoke.ts && git commit -m "$(…)
  L warning: in the working copy of 'packages/omni-router/demo/glyph-local-smoke.ts', LF will be repla
```

## NUMBERS
- node version: v24.13.1
- OP-VERSION latency: 0 ms
- OP-STAT latency: 0 ms
- OP-READ latency: 1 ms; bytes (count not numeric here)
- OP-GLOB: 3 matching files, 16 ms
- TOTAL TOKENS CONSUMED: 0
- TOTAL COST: $0.00
- TOTAL LATENCY: 18ms
- Previous opencode-local cost: 9358 input tokens + 5.6 seconds
- Old path (JSON-schema tool use in prose): ~2000-10000 tokens per tool call
- BEHCS-256 glyph sentence: ~20-80 tokens
- BEHCS-256 glyph sentence dispatched to local tool: 0 tokens
- Version: v0.4 (committing); Opus 4.7 (tab "Upgrade to Opus 4.7")
- BEHCS-256 (system name)

## PIDS-ROOMS-GLYPHS
- Glyph-verbs: OP-VERSION{}, OP-STAT{package.json}, OP-READ{package.json}, OP-GLOB{packages/*/pkg}, OP-NOTAVERB{x}
- Glyph sentence concept: "BEHCS-256 glyph sentence"
- Rejection cases: OP-NOTAVERB{x} → unknown_op; "plain prose" → not a glyph
- No PIDs or rooms shown.

## ENGINES-SYSTEMS
- BEHCS-256
- omni-router (package: packages/omni-router)
- glyph-dispatch.ts (src/glyph-dispatch.ts)
- glyph-local-smoke.ts (demo/glyph-local-smoke.ts)
- opencode-local (fallback router target)
- direct-provider (fallback router target)
- local Node function dispatch / local registry
- glyph-verb dispatcher

## TIMESTAMPS
- No explicit calendar date/time visible (only relative latencies in ms and 5.6 seconds).

## CLAIMS
- "This is the compression breakthrough."
- A glyph-verb task that previously routed through opencode-local (9358 input tokens + 5.6s) now costs literal zero tokens because the glyph-verb dispatches to a local Node function; the cloud never sees it.
- The math Jesse was describing: old JSON-schema tool use ~2000-10000 tokens/call; BEHCS-256 glyph sentence ~20-80 tokens; glyph sentence dispatched to local tool: 0 tokens.
- For any task whose verb is in the local registry, the LLM never gets called; reasoning tasks fall through to opencode-local / direct-provider.
- "This is exactly the proprioceptive pattern — the system knows what it can answer itself vs what needs the cloud."
- Committing v0.4.

## CONTEXT
This artifact captures the BEHCS-256 omni-router "compression breakthrough" smoke test on the LIRIS-side machine (C:/Users/rayss). A glyph-verb dispatch table (OP-VERSION/OP-STAT/OP-READ/OP-GLOB) runs local Node functions at 0 tokens / $0.00 / 18ms total, with non-verbs correctly rejected. It documents Jesse's token-math thesis (JSON-schema tool calls cost ~2000-10000 tokens; BEHCS glyph sentences ~20-80; local-dispatched glyphs = 0 tokens) as the "proprioceptive pattern," and shows the v0.4 commit of glyph-dispatch.ts + glyph-local-smoke.ts in the omni-router package.
