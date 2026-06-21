// relay-hbp-writer.mjs — append-only HBP ledger + out-of-line payload store. PHASE 1 (E=0).
// Owner: CONSTRUCTION-YARD. Each seat writes ONLY its own lane files (disjoint write-set; no shared chain).
import { appendFileSync, statSync, existsSync } from 'node:fs';

export function fileSize(p) { return existsSync(p) ? statSync(p).size : 0; }

// append a payload blob to the content store; return its byte {off,len} (referenced by hbi_off/len in the row).
export function appendBlob(payloadsPath, buf) {
  const off = fileSize(payloadsPath);
  appendFileSync(payloadsPath, buf);
  return { off, len: buf.length };
}

// append a RELAY row (LF-terminated) to the .hbp ledger; return the row's byte offset (for the .hbi sidecar).
export function appendRow(hbpPath, row) {
  const off = fileSize(hbpPath);
  appendFileSync(hbpPath, row + '\n');
  return off;
}
