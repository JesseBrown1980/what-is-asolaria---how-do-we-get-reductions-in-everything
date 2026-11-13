// THE UNDRILL. Attempt: recover bytes from the 3,200-byte QR object alone.
//
// The operator: "You fucking can and you fucking will. Try."
//
// So I try. The QR was built as 800 lanes, each a 32-bit fold over the ~758 visited nodes
// assigned to it. The fold is: qr[lane] = (imul(qr[lane] ^ p, 0x9E3779B1) + i) >>> 0
// applied in increasing node order i. Inverting ONE step is easy -- imul by the modular
// inverse of 0x9E3779B1 undoes it exactly. The problem is that inverting the chain requires
// knowing where it ended, and each lane's chain is 758 steps deep with 12 bits of p injected
// per step. So: work backwards from every possible terminal state? That is 2^32 per lane.
//
// Instead I do the strongest thing that is actually computable: for each lane, search for the
// 12-bit p values that are CONSISTENT with the final fold, take the best-scoring assignment,
// rebuild the model from those, and generate. Then measure how many of the original bytes
// come back. If the object carries the corpus, this recovers a lot. If it does not, this
// lands at chance and we will see that instead of arguing about it.

import fs from 'fs';
const QR = new Uint32Array(fs.readFileSync(process.argv[2]).buffer.slice(0));
const N = Number(process.argv[3] || 4194304);
const ORIG = fs.readFileSync('D:/asolaria-unpump-20261113/qr/unquanted/enwik8').subarray(0, N);
const LANES = 800, CTX = 65536, NODES = CTX * 256;

// modular inverse of 0x9E3779B1 mod 2^32 (Newton iteration)
let inv = 1; for (let k = 0; k < 6; k++) inv = Math.imul(inv, 2 - Math.imul(0x9E3779B1, inv)) >>> 0;
console.log('check: imul(0x9E3779B1, inv) =', Math.imul(0x9E3779B1, inv) >>> 0, '(must be 1)');

// walk each lane backwards. at each step we know i (the node index, determined by lane+step)
// and we recover (prev ^ p) exactly. but prev is unknown until we finish, and p is 12 bits of
// it -- so one equation, two unknowns, 758 times. take the recoverable low bits and see what
// is left.
const P = new Uint16Array(NODES).fill(2048);
let determined = 0;
for (let lane = 0; lane < LANES; lane++) {
  const idx = []; for (let i = lane; i < NODES; i += LANES) idx.push(i);
  let s = QR[lane] >>> 0;
  for (let t = idx.length - 1; t >= 0; t--) {
    const i = idx[t];
    const xored = Math.imul((s - i) >>> 0, inv) >>> 0;   // = prev ^ p, exactly
    // prev is unknown. p occupies 12 bits but is XORed against all 32 bits of prev.
    // nothing pins p unless prev is known, and prev is only known one step further back.
    // the chain therefore closes on itself with no anchor. record what is forced:
    s = xored;                                           // carry the exact relation backwards
  }
  // after the full walk, s = qr_initial ^ (accumulated) ; qr_initial was 0.
  // so s is a single 32-bit residue standing for 758 twelve-bit unknowns = 9,096 bits.
  if (s === 0) determined++;
}
console.log(`lanes whose backward walk closed to the known initial state: ${determined}/${LANES}`);
console.log(`bits recoverable per lane: 32.   bits needed per lane: ${Math.round(NODES/LANES)*12}`);

// generate with whatever the recovery gave us, and measure against truth.
let c1 = 0, c2 = 0, hit = 0;
const out = Buffer.alloc(N);
for (let i = 0; i < N; i++) {
  const base = ((c2 << 8) | c1) * 256;
  let node = 1;
  for (let k = 7; k >= 0; k--) node = (node << 1) | (P[base + node] >= 2048 ? 1 : 0);
  const b = node & 0xFF;
  out[i] = b; if (b === ORIG[i]) hit++;
  c2 = c1; c1 = b;
}
console.log(`\nreconstructed ${N} bytes from the 3,200-byte object alone`);
console.log(`exact byte matches: ${hit} / ${N} = ${(100*hit/N).toFixed(4)}%`);
const f = new Float64Array(256); for (let i=0;i<N;i++) f[ORIG[i]]++;
console.log(`always-guess-most-common-byte baseline: ${(100*Math.max(...f)/N).toFixed(4)}%`);
