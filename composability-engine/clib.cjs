// clib.cjs — Asolaria algorithm COMPOSABILITY machinery (E=0; reads corpus, proposes/validates/measures; fires nothing).
// The 4 missing pieces from the readiness verdict, at micro-scale:
//   (1) typed corpus  (2) system OBJECTIVE/metric  (3) APPLICATOR (promote-on-improvement)  (4) before/after harness.
const fs = require('fs');

// CLOSED type vocabulary — grounded in Asolaria's real data types. A composable contract may ONLY use these.
const CLOSED_TYPES = ['pid', 'glyph', 'sector', 'lane', 'bh_index', 'coord', 'vector', 'sketch', 'hash', 'bytes', 'prime', 'scalar', 'name', 'set'];
const TYPESET = new Set(CLOSED_TYPES);

const WAVE2 = 'D:/PID-Registration-Office/registered/ACER-FORMULA-CORPUS-WAVE2-2026-06-19.hbp';

// parse the WAVE2 FORMULA rows -> [{pid,name,kind,klass,prof,where,sector,lane,glyph1024}]
function parseCorpus(file = WAVE2) {
  const rows = [];
  for (const ln of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!ln.startsWith('FORMULA|')) continue;
    const parts = ln.split('|');
    const r = { name: parts[1] || '' };
    for (let i = 2; i < parts.length; i++) {
      const e = parts[i].indexOf('='); if (e < 0) continue;
      const k = parts[i].slice(0, e).toLowerCase(), v = parts[i].slice(e + 1);
      if (k === 'pid') r.pid = v; else if (k === 'kind') r.kind = v; else if (k === 'class') r.klass = v;
      else if (k === 'prof') r.prof = v; else if (k === 'where') r.where = v;
      else if (k === 'sector') r.sector = +v; else if (k === 'lane') r.lane = +v;
      else if (k === 'glyph_behcs1024') r.glyph1024 = +v;
    }
    if (r.pid) rows.push(r);
  }
  return rows;
}

// resolve a WHERE=file:line[-line] pointer to the actual body text (materialize the formula). null if unresolvable here.
function resolveBody(where) {
  if (!where) return null;
  const m = where.match(/^(.*?):(\d+)(?:-(\d+))?$/);
  if (!m) return null;
  const file = m[1].replace(/\\/g, '/'); const a = +m[2], b = m[3] ? +m[3] : a;
  try {
    if (!fs.existsSync(file)) return null;
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    return lines.slice(a - 1, b).join('\n');
  } catch { return null; }
}

// a typed contract: { inputs:[type], outputs:[type], arity:int, deps:[pid], note }
function validateContract(c, knownPids) {
  if (!c || typeof c !== 'object') return { ok: false, why: 'not an object' };
  if (!Array.isArray(c.inputs) || !Array.isArray(c.outputs)) return { ok: false, why: 'inputs/outputs must be arrays' };
  if (c.outputs.length < 1) return { ok: false, why: 'need >=1 output' };
  for (const t of [...c.inputs, ...c.outputs]) if (!TYPESET.has(t)) return { ok: false, why: 'type "' + t + '" not in closed vocab' };
  if (typeof c.arity !== 'number' || c.arity !== c.inputs.length) return { ok: false, why: 'arity must equal inputs.length' };
  if (c.deps && !Array.isArray(c.deps)) return { ok: false, why: 'deps must be array' };
  if (c.deps && knownPids) for (const d of c.deps) if (!knownPids.has(d)) return { ok: false, why: 'dep ' + d + ' not a known pid' };
  return { ok: true };
}

// THE OBJECTIVE: composability of the registry over the corpus.
//   coverage     = typed rows / total rows
//   composable_pairs = # directed (A->B) where an output type of A is an input type of B (A's result can feed B)
function metric(registry, corpus) {
  const total = corpus.length;
  const typed = Object.keys(registry).length;
  const entries = Object.entries(registry);
  let pairs = 0;
  for (const [pa, ca] of entries) for (const [pb, cb] of entries) {
    if (pa === pb) continue;
    if (ca.outputs.some(o => cb.inputs.includes(o))) pairs++;
  }
  return { total, typed, coverage: +(typed / total).toFixed(6), composable_pairs: pairs };
}

// THE APPLICATOR: validate a proposed contract, apply to an ISOLATED copy, re-measure, promote ONLY on improvement.
function applyProposal(registry, corpus, knownPids, pid, contract) {
  const v = validateContract(contract, knownPids);
  if (!v.ok) return { accepted: false, reason: 'INVALID: ' + v.why };
  const before = metric(registry, corpus);
  const isolated = { ...registry, [pid]: contract };          // isolated copy — base registry untouched
  const after = metric(isolated, corpus);
  const improved = after.coverage > before.coverage || after.composable_pairs > before.composable_pairs;
  if (!improved) return { accepted: false, reason: 'NO-IMPROVEMENT', before, after };
  return { accepted: true, registry: isolated, before, after,
    delta: { coverage: +(after.coverage - before.coverage).toFixed(6), pairs: after.composable_pairs - before.composable_pairs } };
}

module.exports = { CLOSED_TYPES, WAVE2, parseCorpus, resolveBody, validateContract, metric, applyProposal };
