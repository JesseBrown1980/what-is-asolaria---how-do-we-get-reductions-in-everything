// Call the same function POST /api/hrm calls (the omnicoder server on 8789 is not listening), on the 7 resolved names.
import { hrmShapedPrediction, SHAPES } from 'file:///C:/Users/acer/Asolaria/tools/behcs/omnicoder/lib/hrm-slow-fast.mjs';
const resolved = ['f77afc75a1c1a548','c18ecf8811dd244c','2c5ab07b7c25f722','c23523aa43b01264','f9e6c59742ef5575','869fcd55b4b3f982','b1c7c349af39b07e'];
const cps = resolved.map(h => Number(BigInt('0x' + h) % 1024n));
const r = hrmShapedPrediction({ envelopeType: 'unpump', agentProf: 'PROF-HRM-BRIDGE', currentCp: cps[cps.length - 1], history: cps.slice(0, -1), k: 4, fastIters: 15, seed: 0 });
const r2 = hrmShapedPrediction({ envelopeType: 'unpump', agentProf: 'PROF-HRM-BRIDGE', currentCp: cps[cps.length - 1], history: cps.slice(0, -1), k: 4, fastIters: 15, seed: 0 });
console.log(`HRMCALL|function=hrmShapedPrediction|shapes_known=${SHAPES.length}|input_cps=${cps.join(',')}|deterministic_repeat_equal=${JSON.stringify(r) === JSON.stringify(r2) ? 1 : 0}|json=0`);
const flat = (o, pre = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v)) ? flat(v, pre + k + '.') : [`${pre}${k}=${Array.isArray(v) ? v.map(x => typeof x === 'object' ? JSON.stringify(x) : x).join(',') : v}`]);
console.log('HRMRESULT|' + flat(r).join('|').slice(0, 900) + '|json=0');
