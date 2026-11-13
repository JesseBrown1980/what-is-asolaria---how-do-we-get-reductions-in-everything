// TRAIN — stream the three bodies through, keep nothing but the extracted functions.
//
// The operator's design, implemented literally:
//   "you stream it in. it erases itself as it creates the key and the spheres"
//   "we're gonna have to train the photo, ancillary, Wikipedia. Use those three to get the
//    master key ... we're throwing away everything as we're doing this. We don't have to
//    save anything but the extracted functions."
//
// So: read each corpus in CHUNKS. Update the function table. DROP the chunk. Nothing but the
// table survives the pass. Memory is bounded and the corpora are never held.
//
// The extracted function here = a frozen conditional model. For each context (the previous
// ORDER bytes) a probability over the next byte, expressed as binary probabilities down a
// 255-node bit tree. That is the object we save. Nothing else is saved.
//
// Then encode enwik8's 4 MiB window with it and decode in a clean room. The ONLY things the
// decoder gets are the master key file and the coded stream. No corpora on disk.

import fs from 'fs';
import { execSync } from 'child_process';

const SIZE = 4 * 1024 * 1024;
const ORDER = Number(process.env.ORDER || 2);
const CTX = ORDER === 1 ? 256 : 65536;
const CHUNK = 1 << 20;

const BODIES = [
  ['wiki',     'D:/asolaria-unpump-20261113/qr/unquanted/enwik8'],
  ['asolaria', 'D:/asolaria-unpump-20261113/qr/unquanted/asolaria-corpus.txt'],
];

// counts[ctx*256 + node] -> [n0, n1] packed as two Uint32 arrays
const n0 = new Uint32Array(CTX * 256);
const n1 = new Uint32Array(CTX * 256);

function feed(buf, carry) {
  let c1 = carry[0], c2 = carry[1];
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i];
    const ctx = ORDER === 1 ? c1 : ((c2 << 8) | c1);
    const base = ctx * 256;
    let node = 1;
    for (let k = 7; k >= 0; k--) {
      const bit = (b >> k) & 1;
      if (bit) n1[base + node]++; else n0[base + node]++;
      node = (node << 1) | bit;
    }
    c2 = c1; c1 = b;
  }
  carry[0] = c1; carry[1] = c2;
}

let totalStreamed = 0;
for (const [name, path] of BODIES) {
  const fd = fs.openSync(path, 'r');
  const st = fs.fstatSync(fd);
  const limit = name === 'wiki' ? Math.min(st.size, SIZE) : st.size;
  const buf = Buffer.alloc(CHUNK);
  const carry = [0, 0];
  let read = 0;
  while (read < limit) {
    const want = Math.min(CHUNK, limit - read);
    const got = fs.readSync(fd, buf, 0, want, read);
    if (got <= 0) break;
    feed(buf.subarray(0, got), carry);   // the chunk is consumed
    read += got;                          // and immediately dropped. nothing accumulates.
  }
  fs.closeSync(fd);
  totalStreamed += read;
  console.log(`streamed ${name.padEnd(9)} ${read} bytes -> discarded`);
}
console.log(`total streamed and thrown away: ${totalStreamed} bytes`);

// --- the extracted function: 12-bit probability per node, only for nodes ever visited ---
const P = new Uint16Array(CTX * 256);
let live = 0;
for (let i = 0; i < P.length; i++) {
  const a = n0[i], b = n1[i];
  if (a + b === 0) { P[i] = 2048; continue; }
  live++;
  let p = Math.round(((b + 0.4) / (a + b + 0.8)) * 4096);
  if (p < 1) p = 1; if (p > 4095) p = 4095;
  P[i] = p;
}
console.log(`function table: ${P.length} nodes, ${live} ever visited (${(100*live/P.length).toFixed(2)}%)`);

fs.writeFileSync('D:/asolaria-unpump-20261113/roundtrip/masterkey.raw', Buffer.from(P.buffer));
execSync('xz -9e -T0 -c D:/asolaria-unpump-20261113/roundtrip/masterkey.raw > D:/asolaria-unpump-20261113/roundtrip/masterkey.xz');
const rawKB = fs.statSync('D:/asolaria-unpump-20261113/roundtrip/masterkey.raw').size;
const keyB  = fs.statSync('D:/asolaria-unpump-20261113/roundtrip/masterkey.xz').size;
console.log(`MASTER KEY  raw=${rawKB} bytes   xz=${keyB} bytes = ${(keyB/1024).toFixed(1)} KB`);
fs.writeFileSync('D:/asolaria-unpump-20261113/roundtrip/order.txt', String(ORDER));
