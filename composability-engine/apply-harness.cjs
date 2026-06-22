// apply-harness.cjs — consume the micro-pilot's verified contracts, apply each via the promote-on-improvement
// applicator, measure the before/after SYSTEM delta, build the composition graph, write an UNSIGNED proposal bundle.
// E=0: writes only a proposal + receipt under C:/tmp/asolaria-composability/. Nothing fired, nothing signed.
const fs = require('fs'), crypto = require('crypto'), L = require('./clib.cjs');
const CONTRACTS = process.argv[2] || 'C:/tmp/asolaria-composability/contracts.json';
const corpus = L.parseCorpus();
const knownPids = new Set(corpus.map(r => r.pid));
const nameByPid = Object.fromEntries(corpus.map(r => [r.pid, r.name]));
const contracts = JSON.parse(fs.readFileSync(CONTRACTS, 'utf8'));
// cross-checked-agreed first, then the rest (so high-confidence typed rows seed the graph)
contracts.sort((a, b) => (b.cross_checked === true) - (a.cross_checked === true));

const before = L.metric({}, corpus);
let registry = {};
const accepted = [], rejected = [];
for (const c of contracts) {
  const contract = { inputs: c.inputs, outputs: c.outputs, arity: (c.inputs || []).length, deps: (c.deps || []).filter(d => knownPids.has(d)), note: c.note };
  const r = L.applyProposal(registry, corpus, knownPids, c.pid, contract);
  if (r.accepted) { registry = r.registry; accepted.push({ pid: c.pid, name: nameByPid[c.pid], ...contract, cross_checked: !!c.cross_checked, delta: r.delta }); }
  else rejected.push({ pid: c.pid, name: nameByPid[c.pid], reason: r.reason });
}
const after = L.metric(registry, corpus);

// composition graph: directed edges A->B where an output type of A is an input type of B
const E = Object.entries(registry);
const edges = [];
for (const [pa, ca] of E) for (const [pb, cb] of E) {
  if (pa === pb) continue;
  const via = ca.outputs.filter(o => cb.inputs.includes(o));
  if (via.length) edges.push({ from: pa, to: pb, via, from_name: nameByPid[pa], to_name: nameByPid[pb] });
}
// example composition chains (len-3 paths) — "combine many ways" made concrete
const adj = {}; for (const e of edges) (adj[e.from] = adj[e.from] || []).push(e);
const chains = [];
for (const a of Object.keys(registry)) for (const e1 of (adj[a] || [])) for (const e2 of (adj[e1.to] || [])) {
  if (e2.to === a || e1.to === a) continue;
  chains.push([{ pid: a, name: nameByPid[a] }, { pid: e1.to, name: nameByPid[e1.to], via: e1.via }, { pid: e2.to, name: nameByPid[e2.to], via: e2.via }]);
  if (chains.length >= 12) break;
}

const bundle = {
  schema: 'asolaria.composability.proposal.v1', date_note: 'stamp on commit', status: 'DRAFT_E0_UNSIGNED_PROPOSAL',
  objective: 'raise DISTRICT-F composability: coverage (typed rows) + composable_pairs (output-type feeds input-type)',
  corpus_total: corpus.length,
  before, after,
  delta: { coverage: +(after.coverage - before.coverage).toFixed(6), typed: after.typed - before.typed, composable_pairs: after.composable_pairs - before.composable_pairs },
  accepted_count: accepted.length, rejected_count: rejected.length,
  composable_pairs: edges.length, example_chains: chains.slice(0, 12),
  registry, accepted, rejected,
};
const body = JSON.stringify(bundle, null, 1);
const sha = crypto.createHash('sha256').update(body).digest('hex');
fs.writeFileSync('C:/tmp/asolaria-composability/typed-registry-proposal.json', body);
fs.writeFileSync('C:/tmp/asolaria-composability/typed-registry-proposal.sha256', sha + '  typed-registry-proposal.json\n');
console.log('=== COMPOSABILITY MICRO-PILOT RESULT (E=0, UNSIGNED) ===');
console.log('corpus=' + corpus.length + '  accepted=' + accepted.length + '  rejected=' + rejected.length);
console.log('BEFORE: coverage=' + before.coverage + ' typed=' + before.typed + ' composable_pairs=' + before.composable_pairs);
console.log('AFTER : coverage=' + after.coverage + ' typed=' + after.typed + ' composable_pairs=' + after.composable_pairs);
console.log('DELTA : +' + bundle.delta.typed + ' typed rows, +' + bundle.delta.composable_pairs + ' composable pairs, coverage +' + bundle.delta.coverage);
console.log('composition edges=' + edges.length + '  example len-3 chains=' + chains.length);
console.log('proposal sha256=' + sha.slice(0, 16) + '  -> typed-registry-proposal.json');
if (rejected.length) console.log('rejected: ' + rejected.map(r => r.pid.slice(0, 8) + ':' + r.reason).slice(0, 6).join(', '));
for (const ch of chains.slice(0, 4)) console.log('  CHAIN: ' + ch.map((n, i) => (i ? '--[' + n.via.join('/') + ']--> ' : '') + (n.name || n.pid).slice(0, 28)).join(''));
