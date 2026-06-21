// relay-hbi-indexer.mjs — byte-offset sidecar index for O(seek) total-recall. PHASE 1 (E=0).
// Owner: CONSTRUCTION-YARD. Bounds-checked payload reads (reject, never crash) per the contract.
import { appendFileSync, readFileSync, existsSync, statSync, openSync, readSync, closeSync } from 'node:fs';

export const MAX_PAYLOAD = 8 * 1024 * 1024; // 8 MB hard cap (bounds-check; anti-DoS)
const IDX_FIELDS = ['row_hash', 'row_off', 'row_len', 'pid', 'verb', 'cls', 'from', 'to', 'ts', 'seq', 'payload_off', 'payload_len'];

export function appendIndex(hbiPath, rec) {
  const line = 'IDX|' + IDX_FIELDS.map(k => k + '=' + rec[k]).join('|');
  appendFileSync(hbiPath, line + '\n');
}

export function loadIndex(hbiPath) {
  const out = [];
  if (!existsSync(hbiPath)) return out;
  for (const ln of readFileSync(hbiPath, 'utf8').split('\n')) {
    if (!ln.startsWith('IDX|')) continue;
    const f = {};
    for (const t of ln.slice(4).split('|')) { const e = t.indexOf('='); f[t.slice(0, e)] = t.slice(e + 1); }
    out.push(f);
  }
  return out;
}

// bounds-checked payload read — VERIFY recomputes payload_sha256 over THESE bytes.
export function readBlob(payloadsPath, off, len) {
  off = Number(off); len = Number(len);
  if (!Number.isInteger(off) || !Number.isInteger(len) || off < 0 || len < 0) throw new Error('BOUNDS_REJECT: bad off/len');
  if (len > MAX_PAYLOAD) throw new Error('BOUNDS_REJECT: len ' + len + ' exceeds cap ' + MAX_PAYLOAD);
  const size = existsSync(payloadsPath) ? statSync(payloadsPath).size : 0;
  if (off + len > size) throw new Error('BOUNDS_REJECT: off+len ' + (off + len) + ' exceeds store size ' + size);
  const fd = openSync(payloadsPath, 'r');
  try { const b = Buffer.alloc(len); readSync(fd, b, 0, len, off); return b; }
  finally { closeSync(fd); }
}
