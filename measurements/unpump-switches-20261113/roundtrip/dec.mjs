// CLEAN ROOM DECODER. Runs in a directory containing ONLY masterkey.xz, stream.bin, order.txt.
// No corpora. No enwik8. It allocates whatever it likes and throws it away; that is free.
import fs from 'fs';
import { execSync } from 'child_process';
import { Dec } from './rc.mjs';
const dir = process.argv[2];
const N = Number(process.argv[3]);
const ORDER = Number(fs.readFileSync(`${dir}/order.txt`,'utf8').trim());
execSync(`xz -d -c ${dir}/masterkey.xz > ${dir}/masterkey.raw`);
const P = new Uint16Array(fs.readFileSync(`${dir}/masterkey.raw`).buffer.slice(0));
const d = new Dec(fs.readFileSync(`${dir}/stream.bin`));
const out = Buffer.alloc(N);
let c1=0,c2=0;
for (let i=0;i<N;i++){
  const ctx = ORDER===1?c1:((c2<<8)|c1); const base=ctx*256;
  let node=1;
  for(let k=7;k>=0;k--){ node=(node<<1)|d.bit(P[base+node]); }
  const b=node&0xFF; out[i]=b; c2=c1;c1=b;
}
fs.writeFileSync(`${dir}/decoded.bin`, out);
console.log('decoded', N, 'bytes');
