import fs from 'fs';
import { Enc } from './rc.mjs';
const SIZE = 4*1024*1024;
const ORDER = Number(fs.readFileSync('D:/asolaria-unpump-20261113/roundtrip/order.txt','utf8').trim());
const CTX = ORDER===1?256:65536;
const P = new Uint16Array(fs.readFileSync('D:/asolaria-unpump-20261113/roundtrip/masterkey.raw').buffer.slice(0));
const D = fs.readFileSync('D:/asolaria-unpump-20261113/qr/unquanted/enwik8').subarray(0, SIZE);
const e = new Enc();
let c1=0,c2=0;
for (let i=0;i<D.length;i++){
  const b=D[i]; const ctx = ORDER===1?c1:((c2<<8)|c1); const base=ctx*256;
  let node=1;
  for(let k=7;k>=0;k--){ const bit=(b>>k)&1; e.bit(P[base+node], bit); node=(node<<1)|bit; }
  c2=c1;c1=b;
}
const out=e.finish();
fs.writeFileSync('D:/asolaria-unpump-20261113/roundtrip/stream.bin', out);
console.log(`coded stream = ${out.length} bytes for ${D.length} input bytes = ${(out.length*8/D.length).toFixed(4)} bpb (stream only)`);
