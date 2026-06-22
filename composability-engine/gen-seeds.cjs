// gen-seeds.cjs — pick a bounded micro-pilot seed set of formulas with RESOLVABLE bodies, spread across SoS classes.
const fs = require('fs'), L = require('./clib.cjs');
const corpus = L.parseCorpus();
const withBody = corpus.map(r => ({ ...r, body: L.resolveBody(r.where) })).filter(r => r.body && r.body.trim().length > 5);
// spread across PROF/SoS classes; cap per class so the micro-pilot samples breadth not one file
const byProf = {}; for (const r of withBody) (byProf[r.prof] = byProf[r.prof] || []).push(r);
const seeds = []; const PER = 6, CAP = 24;
for (const prof of Object.keys(byProf)) for (const r of byProf[prof].slice(0, PER)) { if (seeds.length < CAP) seeds.push(r); }
const out = seeds.map(r => ({ pid: r.pid, name: r.name, kind: r.kind, klass: r.klass, prof: r.prof, where: r.where,
  body: r.body.split('\n').slice(0, 40).join('\n').slice(0, 2000) }));
fs.writeFileSync('C:/tmp/asolaria-composability/seeds.json', JSON.stringify(out, null, 1));
console.log('corpus=' + corpus.length + ' withResolvableBody=' + withBody.length + ' seeds=' + out.length);
console.log('classes: ' + [...new Set(out.map(s => s.prof))].join(', '));
for (const s of out) console.log('  ' + s.pid + ' [' + (s.kind || '?') + '] ' + s.name.slice(0, 60));
