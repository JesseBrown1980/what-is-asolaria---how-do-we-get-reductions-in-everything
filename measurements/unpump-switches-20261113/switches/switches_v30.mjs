// switches_v30.mjs - codex function tables as light switches. See SPEC-SWITCHES-V30.hbp (sealed first).
// Each node = an order-2 bit-tree probability table (the object a QR codex is folded from, as in train.mjs).
// The light = the coded size of a target through that node, with the July range coder. Smaller = brighter.
import fs from 'fs';
import { Enc } from 'file:///D:/asolaria-unpump-20261113/roundtrip/rc.mjs';

const CTX = 65536, MIB = 1 << 20;
const U = 'D:/asolaria-unpump-20261113/qr/unquanted/';
const BODIES = [['WIKI', U + 'enwik8'], ['CODE', U + 'code-corpus.txt'], ['ASOLARIA', U + 'asolaria-corpus.txt']];

function train(buf) {
  const n0 = new Uint32Array(CTX * 256), n1 = new Uint32Array(CTX * 256);
  let c1 = 0, c2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i], base = ((c2 << 8) | c1) * 256; let node = 1;
    for (let k = 7; k >= 0; k--) { const bit = (b >> k) & 1; if (bit) n1[base + node]++; else n0[base + node]++; node = (node << 1) | bit; }
    c2 = c1; c1 = b;
  }
  const P = new Uint16Array(CTX * 256); let live = 0;
  for (let i = 0; i < P.length; i++) {
    const a = n0[i], b = n1[i];
    if (a + b === 0) { P[i] = 2048; continue; }
    live++; let p = Math.round(((b + 0.4) / (a + b + 0.8)) * 4096); if (p < 1) p = 1; if (p > 4095) p = 4095; P[i] = p;
  }
  return { P, live };
}

// cost of a bit under probability p (12-bit), in 1/256 bit units: a gate-only helper table (the reported sizes are coder bytes)
const COST = new Int32Array(4097);
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
  const hist = Ps.map(() => new Int32Array(W)), sum = new Int32Array(n), used = new Int32Array(n);
  for (let i = 0; i < D.length; i++) {
    let best = 0; for (let j = 1; j < n; j++) if (sum[j] < sum[best]) best = j;      // decided from the PAST only
    used[best]++;
    const b = D[i], base = ((c2 << 8) | c1) * 256; let node = 1; const cost = new Int32Array(n);
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

const nodes = [], held = {};
for (const [name, path] of BODIES) {
  const all = fs.readFileSync(path); const tr = all.subarray(0, all.length - MIB); held[name] = all.subarray(all.length - MIB);
  const t0 = Date.now(); const { P, live } = train(tr);
  nodes.push([name, P]);
  console.log(`NODE|k=${name}|trained_bytes=${tr.length}|contexts_nodes_seen=${live}|held_out_bytes=${MIB}|ms=${Date.now() - t0}|json=0`);
}
const mixedParts = [];
for (let off = 0; off < MIB; off += 65536) for (const [name] of BODIES) mixedParts.push(held[name].subarray(off, off + 65536));
const targets = [
  ['held_WIKI', held.WIKI], ['held_CODE', held.CODE], ['held_ASOLARIA', held.ASOLARIA],
  ['mixed_interleaved', Buffer.concat(mixedParts)],
  ['MYTHOS-FULL-EMISSION', fs.readFileSync('D:/asolaria-absorb/kernel-pump/MYTHOS-FULL-EMISSION.txt')],
  ['BROWN-HILBERT.md', fs.readFileSync('C:/Users/acer/Asolaria/BROWN-HILBERT.md')],
  ['fischer-kernel.mjs', fs.readFileSync('D:/bigpickle-rebuild/src/fischer-kernel.mjs')],
];
const Ps = nodes.map(n => n[1]);
for (const [tname, D] of targets) {
  const singles = nodes.map(([n, P]) => [n, codeSingle(P, D)]);
  const sw = codeSwitch(Ps, D);
  const bestS = singles.reduce((a, b) => (b[1] < a[1] ? b : a));
  const worstS = singles.reduce((a, b) => (b[1] > a[1] ? b : a));
  console.log(`LIGHT|target=${tname}|bytes=${D.length}|${singles.map(([n, s]) => `${n}=${s}`).join('|')}|brightest=${bestS[0]}|taped_switch=${sw.bytes}`
    + `|switch_vs_best_permille=${Math.round(1000 * sw.bytes / bestS[1])}|switch_vs_worst_permille=${Math.round(1000 * sw.bytes / worstS[1])}`
    + `|switch_used=${nodes.map(([n], j) => `${n}:${sw.used[j]}`).join(',')}|json=0`);
}
