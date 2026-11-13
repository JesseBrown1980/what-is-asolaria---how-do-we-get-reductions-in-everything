// panel_decode_v32.mjs - GPT-6's check: can a decoder reproduce the switching decisions without looking ahead?
// Encode the mixed target with the nine-node taped switch, then decode from the stream alone (the decoder holds the
// same nine tables and sees only bytes it has already decoded), and compare byte for byte.
import fs from 'fs';
import crypto from 'crypto';
import { Enc, Dec } from 'file:///D:/asolaria-unpump-20261113/roundtrip/rc.mjs';
const CTX = 65536, HOLD = 256 * 1024, PIECE = 65536, W = 64;
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
const COST = new Int32Array(4097);
for (let p = 1; p <= 4095; p++) COST[p] = Math.round(-Math.log2(p / 4096) * 256);
const Ps = [], held = [];
for (const name of NAMES) { const all = fs.readFileSync(C + name + '.bin'); held.push(all.subarray(all.length - HOLD)); Ps.push(train(all.subarray(0, all.length - HOLD))); }
const parts = []; for (let off = 0; off < HOLD; off += PIECE) for (let t = 0; t < NAMES.length; t++) parts.push(held[t].subarray(off, off + PIECE));
const MIX = Buffer.concat(parts); const n = Ps.length;

function state() { return { hist: Ps.map(() => new Int32Array(W)), sum: new Int32Array(n), cost: new Int32Array(n), c1: 0, c2: 0 }; }
function pick(s) { let best = 0; for (let j = 1; j < n; j++) if (s.sum[j] < s.sum[best]) best = j; return best; }
function after(s, i) { const slot = i % W; for (let j = 0; j < n; j++) { s.sum[j] += s.cost[j] - s.hist[j][slot]; s.hist[j][slot] = s.cost[j]; } }

// encode
const e = new Enc(); let s = state(); const choices = new Uint8Array(MIX.length);
for (let i = 0; i < MIX.length; i++) {
  const best = pick(s); choices[i] = best; s.cost.fill(0);
  const b = MIX[i], base = ((s.c2 << 8) | s.c1) * 256; let node = 1;
  for (let k = 7; k >= 0; k--) {
    const bit = (b >> k) & 1;
    for (let j = 0; j < n; j++) { const p = Ps[j][base + node]; s.cost[j] += bit ? COST[p] : COST[4096 - p]; }
    e.bit(Ps[best][base + node], bit); node = (node << 1) | bit;
  }
  after(s, i); s.c2 = s.c1; s.c1 = b;
}
const stream = e.finish();
// decode from the stream alone
const d = new Dec(stream); s = state(); const out = Buffer.alloc(MIX.length); let sameChoice = 0;
for (let i = 0; i < MIX.length; i++) {
  const best = pick(s); if (best === choices[i]) sameChoice++; s.cost.fill(0);
  const base = ((s.c2 << 8) | s.c1) * 256; let node = 1;
  for (let k = 7; k >= 0; k--) {
    const bit = d.bit(Ps[best][base + node]);
    for (let j = 0; j < n; j++) { const p = Ps[j][base + node]; s.cost[j] += bit ? COST[p] : COST[4096 - p]; }
    node = (node << 1) | bit;
  }
  const b = node & 0xFF; out[i] = b; after(s, i); s.c2 = s.c1; s.c1 = b;
}
const h = x => crypto.createHash('sha256').update(x).digest('hex');
console.log(`SWITCHDECODE|target_bytes=${MIX.length}|stream_bytes=${stream.length}|decoder_inputs=stream_and_the_nine_tables_only|switch_choices_equal=${sameChoice}_of_${MIX.length}|decoded_sha256=${h(out).slice(0, 32)}|original_sha256=${h(MIX).slice(0, 32)}|byte_exact=${out.equals(MIX) ? 1 : 0}|json=0`);
let tb = 0; for (const name of NAMES) tb += fs.statSync(C + name + '.bin').size - HOLD;
console.log(`OVERHEAD|the_decoder_must_hold_nine_tables_trained_from=${tb}_bytes_of_corpora|each_table_raw_bytes=33554432|not_counted_in_stream_bytes=1|json=0`);
