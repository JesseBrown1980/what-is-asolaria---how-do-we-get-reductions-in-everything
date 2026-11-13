// panel_v31.mjs - nine codex function tables as a panel of light switches. See SPEC-PANEL-V31.hbp (sealed first).
import fs from 'fs';
import { Enc } from 'file:///D:/asolaria-unpump-20261113/roundtrip/rc.mjs';
const CTX = 65536, HOLD = 256 * 1024, PIECE = 65536;
const C = 'D:/asolaria-unpump-20261113/panel/corpora/';
const NAMES = ['WIKI', 'CODE', 'ASOLARIA', 'HBP', 'RUST', 'MJS', 'LAWS', 'CERT', 'PY'];

function train(buf) {
  const n0 = new Uint32Array(CTX * 256), n1 = new Uint32Array(CTX * 256); let c1 = 0, c2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i], base = ((c2 << 8) | c1) * 256; let node = 1;
    for (let k = 7; k >= 0; k--) { const bit = (b >> k) & 1; if (bit) n1[base + node]++; else n0[base + node]++; node = (node << 1) | bit; }
    c2 = c1; c1 = b;
  }
  const P = new Uint16Array(CTX * 256);
  for (let i = 0; i < P.length; i++) {
    const a = n0[i], b = n1[i];
    if (a + b === 0) { P[i] = 2048; continue; }
    let p = Math.round(((b + 0.4) / (a + b + 0.8)) * 4096); if (p < 1) p = 1; if (p > 4095) p = 4095; P[i] = p;
  }
  return P;
}
const COST = new Int32Array(4097);                    // gate helper only; reported sizes are coder bytes
for (let p = 1; p <= 4095; p++) COST[p] = Math.round(-Math.log2(p / 4096) * 256);

function codeSingle(P, D) {
  const e = new Enc(); let c1 = 0, c2 = 0;
  for (let i = 0; i < D.length; i++) {
    const b = D[i], base = ((c2 << 8) | c1) * 256; let node = 1;
    for (let k = 7; k >= 0; k--) { const bit = (b >> k) & 1; e.bit(P[base + node], bit); node = (node << 1) | bit; }
    c2 = c1; c1 = b;
  }
  return e.finish().length;
}
function codeSwitch(Ps, D, W = 64) {
  const e = new Enc(); let c1 = 0, c2 = 0; const n = Ps.length;
  const hist = Ps.map(() => new Int32Array(W)), sum = new Int32Array(n), used = new Int32Array(n), cost = new Int32Array(n);
  for (let i = 0; i < D.length; i++) {
    let best = 0; for (let j = 1; j < n; j++) if (sum[j] < sum[best]) best = j;
    used[best]++; cost.fill(0);
    const b = D[i], base = ((c2 << 8) | c1) * 256; let node = 1;
    for (let k = 7; k >= 0; k--) {
      const bit = (b >> k) & 1;
      for (let j = 0; j < n; j++) { const p = Ps[j][base + node]; cost[j] += bit ? COST[p] : COST[4096 - p]; }
      e.bit(Ps[best][base + node], bit); node = (node << 1) | bit;
    }
    const slot = i % W;
    for (let j = 0; j < n; j++) { sum[j] += cost[j] - hist[j][slot]; hist[j][slot] = cost[j]; }
    c2 = c1; c1 = b;
  }
  return { bytes: e.finish().length, used: Array.from(used) };
}

const Ps = [], held = [];
for (const name of NAMES) {
  const all = fs.readFileSync(C + name + '.bin'); const tr = all.subarray(0, all.length - HOLD);
  held.push(all.subarray(all.length - HOLD)); Ps.push(train(tr));
  console.log(`NODE|k=${name}|trained_bytes=${tr.length}|json=0`);
}
// Q2 labels: held tails
let okHeld = 0;
for (let t = 0; t < NAMES.length; t++) {
  const sizes = Ps.map(P => codeSingle(P, held[t])); let b = 0; for (let j = 1; j < sizes.length; j++) if (sizes[j] < sizes[b]) b = j;
  const sorted = [...sizes].sort((x, y) => x - y);
  if (b === t) okHeld++;
  console.log(`LABEL|kind=held|target=${NAMES[t]}|brightest=${NAMES[b]}|own=${sizes[t]}|best=${sizes[b]}|runner_up=${sorted[1]}|correct=${b === t ? 1 : 0}|json=0`);
}
const wiki9 = Buffer.alloc(HOLD); { const fd = fs.openSync('D:/asolaria-absorb/enwik9', 'r'); fs.readSync(fd, wiki9, 0, HOLD, 600000000); fs.closeSync(fd); }
const UNSEEN = [
  ['tribit/mod.rs', 'RUST', fs.readFileSync('C:/asolaria-acer/asolaria-os/kernel/core/src/tribit/mod.rs')],
  ['fischer-kernel.mjs', 'MJS', fs.readFileSync('D:/bigpickle-rebuild/src/fischer-kernel.mjs')],
  ['office_row_written_today', 'HBP', fs.readFileSync('D:/PID-Registration-Office/offices/FABLE5-8467a937cba309f7/FABLE52-UNPUMP-V25-AND-HRM-2026-11-13.hbp')],
  ['hrm_v28.py', 'PY', fs.readFileSync('D:/asolaria-unpump-20261113/hrm/hrm_v28.py')],
  ['BROWN-HILBERT.md', 'ASOLARIA', fs.readFileSync('C:/Users/acer/Asolaria/BROWN-HILBERT.md')],
  ['enwik9_at_600MB', 'WIKI', wiki9],
  ['r9_cert_m13_f1', 'CERT', fs.readFileSync('C:/tmp/opus55/floor-r9/pub/independent/y141-floor-r9-result-20261113/run9/RUN13/cert_m13_r9_1_f1.txt')],
  ['MYTHOS-FULL-EMISSION.txt', 'LAWS', fs.readFileSync('D:/asolaria-absorb/kernel-pump/MYTHOS-FULL-EMISSION.txt')],
];
let okUnseen = 0;
for (const [name, want, D] of UNSEEN) {
  const sizes = Ps.map(P => codeSingle(P, D)); let b = 0; for (let j = 1; j < sizes.length; j++) if (sizes[j] < sizes[b]) b = j;
  const order = sizes.map((s, j) => [s, NAMES[j]]).sort((x, y) => x[0] - y[0]);
  if (NAMES[b] === want) okUnseen++;
  console.log(`LABEL|kind=unseen|target=${name}|bytes=${D.length}|expected=${want}|brightest=${NAMES[b]}|best=${order[0][0]}|second=${order[1][1]}:${order[1][0]}|correct=${NAMES[b] === want ? 1 : 0}|json=0`);
}
console.log(`LABELSUM|held_correct=${okHeld}_of_9|unseen_correct=${okUnseen}_of_8|json=0`);
// Q1 panel growth on the mixed target
const parts = []; for (let off = 0; off < HOLD; off += PIECE) for (let t = 0; t < NAMES.length; t++) parts.push(held[t].subarray(off, off + PIECE));
const MIX = Buffer.concat(parts);
const singles = Ps.map(P => codeSingle(P, MIX)); let bs = 0; for (let j = 1; j < singles.length; j++) if (singles[j] < singles[bs]) bs = j;
console.log(`MIXSINGLE|bytes=${MIX.length}|${NAMES.map((n, j) => `${n}=${singles[j]}`).join('|')}|best_single=${NAMES[bs]}:${singles[bs]}|json=0`);
for (const k of [1, 3, 5, 7, 9]) {
  const r = codeSwitch(Ps.slice(0, k), MIX);
  console.log(`PANEL|nodes=${k}|taped_bytes=${r.bytes}|vs_best_single_permille=${Math.round(1000 * r.bytes / singles[bs])}|used=${r.used.map((u, j) => `${NAMES[j]}:${u}`).join(',')}|json=0`);
}
