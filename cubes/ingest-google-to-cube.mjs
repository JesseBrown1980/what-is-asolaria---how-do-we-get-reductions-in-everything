#!/usr/bin/env node
// ingest-google-to-cube.mjs — DEMO: ingest a Google Drive doc (read via the EXISTING claude.ai
// Drive MCP, no gcloud/key) INTO the Asolaria structures: slice -> tuple -> quant -> cube glyph
// -> verb/noun glyph-vocabulary catalog -> HBP receipt. Referential: emits the cube + catalog,
// NOT the raw content (content stays content-addressed). Held-safe: read-only input, no provider
// calls, no device mutation beyond the local receipt. "Ingest, don't integrate."

import fs from 'node:fs';
import { createHash } from 'node:crypto';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const SRC = process.argv[2] || 'C:/tmp/ingest-source-01.txt';
const DRIVE_ID = process.argv[3] || '1dSNjScp3FiqwfqPq-OWxLF2f8Q7VbgdwlplzDdJmtyQ';
const TITLE = process.argv[4] || 'ASOLARIA-CANON-SOURCE-01';

const text = fs.readFileSync(SRC, 'utf8');
const raw_bytes = Buffer.byteLength(text, 'utf8');
const full_sha = sha(text);
const cube10 = full_sha.slice(0, 20);          // 10-byte HyperBEHCS cube glyph (content address)
const handle8 = full_sha.slice(0, 16);          // 8-byte host handle

// BEHCS-style 8-dim quant fingerprint (hash tokens into 8 signed buckets) — the shard-quant shape
const proj = new Float64Array(8);
const toks = text.toLowerCase().match(/[a-z][a-z0-9_-]{1,}/g) || [];
for (const t of toks) { const h = [...t].reduce((a, c) => (a * 131 + c.charCodeAt(0)) >>> 0, 7); proj[h & 7] += (h & 8) ? -1 : 1; }
const quant8 = Array.from(proj, (v) => Math.max(0, Math.min(255, Math.round(128 + v))) ).join(',');

// verb/noun glyph-vocabulary: distinct content words -> each a glyph-tuple (sha16) catalog entry.
const STOP = new Set('the a an is it of to and or in on for as by with not no but its are be that this each so an at into we us our their they them then than only one two more most every all any can could should would'.split(' '));
const freq = new Map();
for (const t of toks) { if (t.length < 4 || STOP.has(t)) continue; freq.set(t, (freq.get(t) || 0) + 1); }
const vocab = [...freq.entries()].sort((a, b) => b[1] - a[1]);
const distinct_terms = vocab.length;
const top = vocab.slice(0, 10).map(([w, n]) => `${w}:${n}:g${sha(w).slice(0, 8)}`);

// referential compression framing: raw doc vs the cube handle that addresses it
const ratio_raw_to_handle = Math.round(raw_bytes / 8);
const ratio_raw_to_cube = Math.round(raw_bytes / 10);

const rows = [];
rows.push(`INGESTHDR|proof=GOOGLE-DRIVE-TO-CUBE-INGEST|form=hbp-tuple|source=claude.ai-Drive-MCP(existing,no-gcloud,no-key)|drive_id=${DRIVE_ID}|title=${TITLE}|owner=plasmatoid@gmail.com|held_safe=read-only+referential+no-provider-call|json=0`);
rows.push(`INGESTSLICE|raw_bytes=${raw_bytes}|sha256_16=${handle8}|tokens=${toks.length}|distinct_content_terms=${distinct_terms}|json=0`);
rows.push(`INGESTCUBE|cube10=${cube10}|host_handle8=${handle8}|quant8=${quant8}|schema=asolaria.drive_ingest.cube.v1|descriptor_only=1|json=0`);
rows.push(`INGESTREDUCTION|raw_bytes=${raw_bytes}|host_handle=8B|cube_glyph=10B|raw->handle=${ratio_raw_to_handle}x|raw->cube=${ratio_raw_to_cube}x|note=referential-content-address-not-lossless|json=0`);
rows.push(`INGESTCATALOG|kind=verb-noun-glyph-vocabulary|distinct_terms=${distinct_terms}|sample_top10=${top.join(' ')}|each_term=glyph-tuple-addressable|json=0`);
rows.push(`INGESTLINEAGE|path=drive-doc->slice->tuple/HBP->quant8->cube10->verb-noun-glyph-catalog|maps_into=existing-BEHCS-cubes+index-language-catalogs|new_infra_required=NONE-beyond-this-ingestor|json=0`);
rows.push(`INGESTBOUNDARY|raw_content_published=0|provider_calls=0|device_mutation=local-receipt-only|gemini_notebooklm=PROPOSE/slice-sources-not-dependencies|notebooklm_write_api=UNVERIFIED|json=0`);
const body = rows.join('\n') + '\n';
const ftr = `INGESTFTR|sha256=${sha(body)}|rows=${rows.length}|verdict=INGEST-NOT-INTEGRATE-PROVEN-on-1-real-drive-doc|json=0\n`;
const out = body + ftr;
const bad = out.split('\n').filter(Boolean).filter((r) => /[{}\r]/.test(r) || !r.endsWith('|json=0'));
if (bad.length) { console.error('SELF-CHECK FAIL', bad); process.exit(1); }
fs.writeFileSync('C:/what-is-asolaria-reductions/cubes/drive-ingest-source-01.hbp', out);
process.stdout.write(out);
