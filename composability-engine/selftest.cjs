// selftest.cjs — E=0 deterministic proof that the composability machinery works (no agents, no fire).
const L = require('./clib.cjs');
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('  PASS ' + n); } else { fail++; console.log('  FAIL ' + n + (x ? ' :: ' + x : '')); } };

const corpus = L.parseCorpus();
const knownPids = new Set(corpus.map(r => r.pid));
ok('t1 parse corpus (876 FORMULA rows expected)', corpus.length === 876, 'got ' + corpus.length);
ok('t2 corpus rows have pid+name+where', corpus.every(r => r.pid && r.name) && corpus.some(r => r.where));

const local = corpus.filter(r => r.where && /C:[\\/]asolaria-acer/i.test(r.where));
const body = local.map(r => L.resolveBody(r.where)).find(Boolean);
ok('t3 a real body resolves from WHERE= (materialized, not a pointer)', !!body && body.length > 0, 'bodies resolvable=' + local.filter(r => L.resolveBody(r.where)).length);

// metric on empty registry
const empty = L.metric({}, corpus);
ok('t4 empty registry: coverage 0, pairs 0', empty.typed === 0 && empty.coverage === 0 && empty.composable_pairs === 0);

// validateContract: closed vocab + arity
ok('t5 valid contract accepted', L.validateContract({ inputs: ['name'], outputs: ['glyph'], arity: 1 }, knownPids).ok);
ok('t6 reject out-of-vocab type', !L.validateContract({ inputs: ['frobnicate'], outputs: ['glyph'], arity: 1 }, knownPids).ok);
ok('t7 reject arity mismatch', !L.validateContract({ inputs: ['name', 'sector'], outputs: ['glyph'], arity: 1 }, knownPids).ok);
ok('t8 reject zero outputs', !L.validateContract({ inputs: ['name'], outputs: [], arity: 1 }, knownPids).ok);

// APPLICATOR: build a tiny composable chain on real PIDs and prove promote-on-improvement
const A = corpus[0].pid, B = corpus[1].pid, C = corpus[2].pid;
let reg = {};
// A: name -> hash
let r1 = L.applyProposal(reg, corpus, knownPids, A, { inputs: ['name'], outputs: ['hash'], arity: 1, note: 'sha256 of name' });
ok('t9 first typed contract accepted (coverage up)', r1.accepted && r1.delta.coverage > 0); reg = r1.registry;
// B: hash -> glyph  (B.inputs 'hash' matches A.outputs 'hash' => a composable pair A->B)
let r2 = L.applyProposal(reg, corpus, knownPids, B, { inputs: ['hash'], outputs: ['glyph'], arity: 1, note: 'hash slice -> glyph' });
ok('t10 second contract creates a composable pair (A->B)', r2.accepted && r2.delta.pairs >= 1, JSON.stringify(r2.delta)); reg = r2.registry;
// C: glyph -> coord (B.outputs 'glyph' matches C.inputs 'glyph' => chain A->B->C)
let r3 = L.applyProposal(reg, corpus, knownPids, C, { inputs: ['glyph'], outputs: ['coord'], arity: 1, note: 'glyph -> 3D coord' });
ok('t11 third contract extends the chain (more pairs)', r3.accepted && r3.delta.pairs >= 1, JSON.stringify(r3.delta)); reg = r3.registry;
// re-applying an identical contract for an already-typed row with no new pair => NO-IMPROVEMENT reject
let r4 = L.applyProposal(reg, corpus, knownPids, A, { inputs: ['name'], outputs: ['hash'], arity: 1 });
ok('t12 no-improvement proposal REJECTED', !r4.accepted && r4.reason === 'NO-IMPROVEMENT', r4.reason);
// invalid proposal rejected
let r5 = L.applyProposal(reg, corpus, knownPids, corpus[3].pid, { inputs: ['BOGUS'], outputs: ['glyph'], arity: 1 });
ok('t13 invalid proposal REJECTED', !r5.accepted && /INVALID/.test(r5.reason), r5.reason);

const fin = L.metric(reg, corpus);
console.log('\nfinal registry: typed=' + fin.typed + ' coverage=' + fin.coverage + ' composable_pairs=' + fin.composable_pairs);
console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
