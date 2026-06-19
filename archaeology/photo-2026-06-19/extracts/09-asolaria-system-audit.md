# 09-asolaria-system-audit

Source path: C:/Users/acer/Downloads/asolaria-system-audit.mjs
Kind: code (Node.js ES module, .mjs)

## VERBATIM

```
#!/usr/bin/env node
// asolaria-system-audit.mjs
// ---------------------------------------------------------------------------
// READ-ONLY ground-truth diagnostic for the Asolaria fabric.
// Zero dependencies (Node >=18 built-ins + global fetch only). Runs in Termux.
//
// Purpose: stop guessing, let the system report itself. In particular it
// surfaces the ONE number that settles the "billions of provider calls"
// question -> how many REAL outbound LLM completions actually happened,
// versus how many prompts/agents were merely MINTED (cheap addressing).
//
// It writes nothing, mutates nothing, spawns nothing. Safe to run anytime.
// Fill in CONFIG for your machine; tune the receipt matchers to your schema.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';

// ===== CONFIG =============================================================
// Adjust to your boxes. These defaults come straight from the repo READMEs.
const CONFIG = {
  // Live fabric surfaces to probe. host:port + route.
  endpoints: [
    { name: 'acer-primary',     url: 'http://192.168.1.50:4949/hbp/supervisors' },
    { name: 'liris-mirror',     url: 'http://127.0.0.1:4944/hbp/supervisors' },
    { name: 'pool',             url: 'http://127.0.0.1:4949/api/pool' },
    { name: 'omnispindle',      url: 'http://127.0.0.1:4949/api/omnispindle' },
    { name: 'omniflywheel',     url: 'http://127.0.0.1:4949/api/omniflywheel' },
    { name: 'behcs1024-dim',    url: 'http://127.0.0.1:4949/api/behcs1024/dimension' },
    // helm pipe :4920 -> :4922 -> :4924
    { name: 'helm-4920',        url: 'http://127.0.0.1:4920/' },
    { name: 'helm-4922',        url: 'http://127.0.0.1:4922/' },
    { name: 'helm-4924',        url: 'http://127.0.0.1:4924/' },
  ],
  perRequestTimeoutMs: 2500,

  // 100B / run checkpoints. Point at the real on-disk state files.
  checkpointFiles: [
    // e.g. 'D:/Asolaria-External/100b/checkpoint.state.json',
    // e.g. '/storage/.../checkpoint.state.json',
  ],

  // Dirs that hold REAL outbound-provider records (the receipts that prove a
  // network completion happened). envelopes-out, receipts, call logs, etc.
  providerCallDirs: [
    // e.g. 'D:/bigpickle-rebuild/envelopes-out',
    // e.g. 'D:/Asolaria-External/helm/queue/out',
  ],
  // A record counts as a REAL provider call if any of these keys/markers
  // appear with a truthy value. Tune to your actual receipt schema.
  providerMarkers: ['provider', 'model', 'endpoint', 'usage', 'completion_tokens', 'prompt_tokens'],
  providerHosts:   ['opencode', 'openai', 'deepseek', 'minimax', 'anthropic', 'gpt'],

  // Materialized room folders vs the logical/staged counts you claim in canon.
  materializedRoomDirs: [
    // e.g. 'D:/Asolaria-HyperBEHCS-10000-RoomRotor',
  ],
  claimedLogicalRoomCounts: { '10k': 10000, '20k': 20000, '50k': 50000, '100k': 100000 },
};
// ==========================================================================

const out = (s = '') => process.stdout.write(s + '\n');
const hr = () => out('-'.repeat(72));

async function probeEndpoint(ep) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), CONFIG.perRequestTimeoutMs);
  const t0 = Date.now();
  try {
    const res = await fetch(ep.url, { signal: ctl.signal });
    const ms = Date.now() - t0;
    return { ...ep, ok: res.ok, status: res.status, ms, note: res.ok ? 'reachable' : 'http-error' };
  } catch (e) {
    const ms = Date.now() - t0;
    // A timeout / refused / 404 is ALSO evidence (what this host can/can't see).
    return { ...ep, ok: false, status: 0, ms, note: e.name === 'AbortError' ? 'timeout' : 'unreachable' };
  } finally {
    clearTimeout(t);
  }
}

function walkFiles(dir, acc = []) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function readJsonLoose(file) {
  // Returns an array of parsed records (handles JSON object, JSON array, or NDJSON).
  let raw;
  try { raw = fs.readFileSync(file, 'utf8'); } catch { return []; }
  const trimmed = raw.trim();
  if (!trimmed) return [];
  try {
    const v = JSON.parse(trimmed);
    return Array.isArray(v) ? v : [v];
  } catch { /* try NDJSON */ }
  const recs = [];
  for (const line of trimmed.split('\n')) {
    const l = line.trim();
    if (!l) continue;
    try { recs.push(JSON.parse(l)); } catch { /* skip non-JSON line */ }
  }
  return recs;
}

function looksLikeProviderCall(rec) {
  if (!rec || typeof rec !== 'object') return false;
  const blob = JSON.stringify(rec).toLowerCase();
  const hasMarker = CONFIG.providerMarkers.some(m => m.toLowerCase() in rec) ||
                    CONFIG.providerMarkers.some(m => blob.includes(`"${m.toLowerCase()}"`));
  const hasHost = CONFIG.providerHosts.some(h => blob.includes(h));
  return hasMarker && hasHost;
}

function guessProvider(rec) {
  const blob = JSON.stringify(rec).toLowerCase();
  return CONFIG.providerHosts.find(h => blob.includes(h)) || 'unknown';
}

async function main() {
  out('');
  out('ASOLARIA SYSTEM AUDIT  (read-only ground truth)');
  out('run: ' + new Date().toISOString());
  hr();

  // --- 1. Fabric reachability -------------------------------------------
  out('1. FABRIC SURFACES');
  const probes = await Promise.all(CONFIG.endpoints.map(probeEndpoint));
  for (const p of probes) {
    out(`   [${p.ok ? 'UP ' : 'DOWN'}] ${p.name.padEnd(16)} ${String(p.status).padStart(3)}  ${p.ms}ms  ${p.note}`);
  }
  const up = probes.filter(p => p.ok).length;
  out(`   -> ${up}/${probes.length} surfaces reachable from THIS host (down != refuted; it's a vantage boundary).`);
  hr();

  // --- 2. 100B / run checkpoint audit -----------------------------------
  out('2. RUN CHECKPOINTS  (processed vs spawned vs real tokens)');
  if (CONFIG.checkpointFiles.length === 0) out('   (no checkpointFiles configured)');
  for (const f of CONFIG.checkpointFiles) {
    const recs = readJsonLoose(f);
    const s = recs[0] || {};
    const get = (...keys) => keys.map(k => s[k]).find(v => v !== undefined);
    out(`   ${f}`);
    out(`     processedPackets : ${get('processedPackets', 'packets') ?? 'n/a'}`);
    out(`     childProcessSpawns: ${get('childProcessSpawns', 'forks') ?? 'n/a'}`);
    out(`     external_tokens   : ${get('external_tokens', 'externalTokens') ?? 'n/a'}   <-- real LLM tokens in THIS run`);
    out(`     elapsed / rate    : ${get('elapsedSec', 'elapsed') ?? 'n/a'} / ${get('packetsPerSec', 'pps') ?? 'n/a'}`);
  }
  out('   Interpretation: packets are CHEAP address ops. external_tokens=0 means no');
  out('   provider inference happened in that run -- the LLM layer is separate.');
  hr();

  // --- 3. REAL provider-call audit  (THE number) ------------------------
  out('3. REAL PROVIDER CALLS  (minting vs sending)');
  let realCalls = 0;
  const byProvider = {};
  let scanned = 0;
  for (const dir of CONFIG.providerCallDirs) {
    for (const file of walkFiles(dir)) {
      scanned++;
      for (const rec of readJsonLoose(file)) {
        if (looksLikeProviderCall(rec)) {
          realCalls++;
          const p = guessProvider(rec);
          byProvider[p] = (byProvider[p] || 0) + 1;
        }
      }
    }
  }
  if (CONFIG.providerCallDirs.length === 0) out('   (no providerCallDirs configured)');
  else {
    out(`   files scanned        : ${scanned}`);
    out(`   REAL provider calls  : ${realCalls}`);
    for (const [p, n] of Object.entries(byProvider).sort((a, b) => b[1] - a[1])) {
      out(`       ${p.padEnd(12)} ${n}`);
    }
    out('   ^ This is the count that "billions of calls" must be checked against.');
    out('     If this is in the hundreds/thousands, the billions were MINTED prompts,');
    out('     not network completions -- which is the expected, physical result.');
  }
  hr();

  // --- 4. Materialized vs logical rooms ---------------------------------
  out('4. ROOMS: MATERIALIZED vs LOGICAL/STAGED');
  let materialized = 0;
  for (const dir of CONFIG.materializedRoomDirs) {
    let n = 0;
    try { n = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).length; } catch {}
    out(`   ${dir} -> ${n} real subdirs`);
    materialized += n;
  }
  out(`   materialized total   : ${materialized}`);
  out(`   claimed logical      : ${JSON.stringify(CONFIG.claimedLogicalRoomCounts)}`);
  out('   -> keep these labeled separately (your migration-map already does).');
  hr();

  // --- 5. Honest summary + what to do -----------------------------------
  out('SYSTEM REPORT');
  out(`   fabric: ${up}/${probes.length} surfaces up`);
  out(`   real provider calls measured: ${realCalls}${CONFIG.providerCallDirs.length ? '' : ' (unconfigured)'}`);
  out(`   materialized rooms: ${materialized}${CONFIG.materializedRoomDirs.length ? '' : ' (unconfigured)'}`);
  out('');
  out('WHAT TO DO  (grounded in what was measured, in your own canon style)');
  out('   1. Fill CONFIG paths so sections 2-4 read real files, then re-run.');
  out('   2. Treat section 3 as the authoritative answer on call volume.');
  out('   3. Tag every headline EXISTS vs NEW against these numbers before sharing.');
  out('   4. Where a surface is DOWN, fix or record it -- do not assume it.');
  out('   5. Take the measured report (not slogans) to a person you trust.');
  out('');
}

main().catch(e => { console.error('audit failed:', e); process.exit(1); });
```

## NUMBERS
- Node >=18 (built-ins requirement)
- perRequestTimeoutMs: 2500
- Endpoint ports/IPs:
  - 192.168.1.50:4949 (acer-primary, route /hbp/supervisors)
  - 127.0.0.1:4944 (liris-mirror, /hbp/supervisors)
  - 127.0.0.1:4949 (pool /api/pool; omnispindle /api/omnispindle; omniflywheel /api/omniflywheel; behcs1024-dim /api/behcs1024/dimension)
  - helm pipe: :4920 -> :4922 -> :4924
- claimedLogicalRoomCounts: '10k': 10000, '20k': 20000, '50k': 50000, '100k': 100000
- "100B" run (in section header "100B / run checkpoint audit")
- "billions of provider calls" / "billions of calls" (the question being settled)
- external_tokens=0 (interpretation example)
- hr() rule width: 72 (dashes)
- exit code on failure: process.exit(1)

## PIDS-ROOMS-GLYPHS
- No specific PIDs or glyphs.
- Rooms: "MATERIALIZED vs LOGICAL/STAGED" room count audit; materializedRoomDirs example commented = 'D:/Asolaria-HyperBEHCS-10000-RoomRotor'; claimed logical room tiers 10k/20k/50k/100k.

## ENGINES-SYSTEMS
- Asolaria fabric (subject of the audit)
- acer-primary (192.168.1.50:4949)
- liris-mirror (127.0.0.1:4944)
- pool (/api/pool)
- omnispindle (/api/omnispindle)
- omniflywheel (/api/omniflywheel)
- behcs1024 / behcs1024-dim (/api/behcs1024/dimension) — BEHCS-1024
- helm pipe (4920 -> 4922 -> 4924)
- Asolaria-HyperBEHCS-10000-RoomRotor (example room dir)
- bigpickle-rebuild / envelopes-out (example provider-call dir)
- Asolaria-External/100b/checkpoint.state.json; Asolaria-External/helm/queue/out (example paths)
- Provider hosts recognized: opencode, openai, deepseek, minimax, anthropic, gpt
- Provider markers: provider, model, endpoint, usage, completion_tokens, prompt_tokens
- HBP route /hbp/supervisors
- Termux (runtime target)

## TIMESTAMPS
- No hardcoded date. Records run time dynamically: `out('run: ' + new Date().toISOString());`
- File mtime not in content; this is source code authored as a diagnostic tool.

## CLAIMS
- "READ-ONLY ground-truth diagnostic for the Asolaria fabric." Writes nothing, mutates nothing, spawns nothing.
- Purpose: "stop guessing, let the system report itself" — surfaces the ONE number settling "billions of provider calls": how many REAL outbound LLM completions actually happened versus how many prompts/agents were merely MINTED (cheap addressing).
- "down != refuted; it's a vantage boundary" (a DOWN surface from this host is a vantage limit, not refutation — matches the no-deflate vantage doctrine).
- "packets are CHEAP address ops. external_tokens=0 means no provider inference happened in that run -- the LLM layer is separate."
- Section 3 is "THE number" — the authoritative answer on call volume; minting vs sending. "If this is in the hundreds/thousands, the billions were MINTED prompts, not network completions -- which is the expected, physical result."
- Guidance: tag every headline EXISTS vs NEW against the measured numbers before sharing; fix/record DOWN surfaces; "Take the measured report (not slogans) to a person you trust."

## CONTEXT
This is a zero-dependency, read-only Node.js (ES module) self-audit tool for the Asolaria fabric, designed to run in Termux on a phone. In the build story it is a grounding/honesty instrument: it distinguishes CHEAP minted addresses/prompts (the "billions" of agents/packets) from REAL outbound provider/LLM completions (counted from receipt dirs), and separates MATERIALIZED room folders from CLAIMED logical room counts (10k/20k/50k/100k). It probes the live fabric surfaces (acer :4949, liris :4944, pool/omnispindle/omniflywheel/behcs1024 routes, helm pipe 4920->4922->4924) and treats DOWN as a vantage boundary, not a refutation — consistent with the system's dual-lens / no-deflate doctrine. It is a CONFIG-skeleton (checkpointFiles, providerCallDirs, materializedRoomDirs left empty) meant to be filled with real on-disk paths and re-run to produce measured EXISTS-vs-NEW numbers.
```
