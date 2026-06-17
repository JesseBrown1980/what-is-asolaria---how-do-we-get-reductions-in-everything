#!/usr/bin/env node
// nlm-backup-to-cube.mjs — ingest a NotebookLM-TUI backup folder INTO referential cubes.
// The INGEST half of the CURATE / reverse-fabric lane (read-only, no operator gate beyond auth-setup).
// HELD-SAFE: READ-ONLY input, NO raw content republished (content stays content-addressed), no provider
// calls, local receipt only, json=0, sha-sealed. Reuses the proven BEHCS quant8 + cube10 + verb/noun
// glyph-catalog machinery (same as ingest-google-to-cube.mjs). Cookies/secrets NEVER read or emitted.
//
// Usage: node nlm-backup-to-cube.mjs <backup_dir> [out.hbp]
//   <backup_dir> = the folder produced by `nlm-backup -o <dir>` (NotebookLM sources/artifacts/notes)
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const DIR = process.argv[2];
const OUT = process.argv[3] || 'C:/what-is-asolaria-reductions/cubes/nlm-backup-ingest.hbp';
if (!DIR || !fs.existsSync(DIR)) { console.error('usage: node nlm-backup-to-cube.mjs <backup_dir> [out.hbp]'); process.exit(2); }

const TEXT_EXT = new Set(['.md', '.txt', '.json', '.csv', '.html', '.htm', '.xml', '.py', '.srt', '.vtt']);
const SKIP_NAME = /cookie|auth|token|secret|\.sid|credential/i; // NEVER ingest credential files
const STOP = new Set('the a an is it of to and or in on for as by with not no but its are be that this each so an at into we us our their they them then than only one two more most every all any can could should would'.split(' '));
const MAXB = 2_000_000;

function walk(d, acc) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (e.name === '.git') continue; walk(p, acc); } else acc.push(p); } return acc; }

function cubeOf(text) {
  const full = sha(text); const cube10 = full.slice(0, 20), handle8 = full.slice(0, 16);
  const proj = new Float64Array(8);
  const toks = text.toLowerCase().match(/[a-z][a-z0-9_-]{1,}/g) || [];
  for (const t of toks) { const h = [...t].reduce((a, c) => (a * 131 + c.charCodeAt(0)) >>> 0, 7); proj[h & 7] += (h & 8) ? -1 : 1; }
  const quant8 = Array.from(proj, (v) => Math.max(0, Math.min(255, Math.round(128 + v)))).join(',');
  const freq = new Map();
  for (const t of toks) { if (t.length < 4 || STOP.has(t)) continue; freq.set(t, (freq.get(t) || 0) + 1); }
  const vocab = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const top = vocab.slice(0, 6).map(([w, n]) => `${w}:${n}:g${sha(w).slice(0, 8)}`);
  return { cube10, handle8, quant8, distinct: vocab.length, top, glyphs: top.map((t) => t.split(':').pop()) };
}

const files = walk(DIR, []).filter((f) => TEXT_EXT.has(path.extname(f).toLowerCase()) && !SKIP_NAME.test(f));
const rows = [];
rows.push(`NLMHDR|proof=NOTEBOOKLM-BACKUP-TO-CUBE-INGEST|form=hbp-tuple|source=notebooklm-tui(github superdoccimo, audited d91d5e60)|backup_dir=${path.basename(DIR)}|files=${files.length}|held_safe=read-only+referential+no-provider-call+no-secrets|json=0`);
let rawSum = 0; const cube10seen = new Map(); const glyphCat = new Map();
for (const f of files) {
  let text; try { text = fs.readFileSync(f, 'utf8'); } catch { continue; }
  if (Buffer.byteLength(text, 'utf8') > MAXB) text = text.slice(0, MAXB);
  const raw = Buffer.byteLength(text, 'utf8'); rawSum += raw;
  const c = cubeOf(text); cube10seen.set(c.cube10, (cube10seen.get(c.cube10) || 0) + 1);
  for (const g of c.glyphs) glyphCat.set(g, (glyphCat.get(g) || 0) + 1);
  const rel = path.relative(DIR, f).replace(/\\/g, '/');
  rows.push(`NLMFILE|path=${rel}|raw_bytes=${raw}|cube10=${c.cube10}|handle8=${c.handle8}|distinct_terms=${c.distinct}|raw->cube=${Math.round(raw / 10)}x|top=${c.top.join(' ')}|raw_published=0|json=0`);
}
const distinctCube = cube10seen.size; const shared = [...glyphCat.values()].filter((n) => n >= 2).length;
rows.push(`NLMUNION|total_files=${files.length}|distinct_cube10=${distinctCube}|dup_collapsed=${files.length - distinctCube}|corpus_raw_bytes=${rawSum}|dedup_referential=${distinctCube ? Math.round(rawSum / (distinctCube * 10)) : 0}x|distinct_glyphs=${glyphCat.size}|shared_glyphs=${shared}|json=0`);
rows.push(`NLMBOUNDARY|ingest=read-only-done|raw_content_published=0|provider_calls=0|secrets_read=0|cookies_in_rows=0|upload_to_drive=OPERATOR-GATED(separate)|maps_to=CURATE-lane+reverse-fabric|json=0`);
const body = rows.join('\n') + '\n';
const bad = body.split('\n').filter(Boolean).filter((r) => /[{}\r]/.test(r) || !r.endsWith('|json=0'));
if (bad.length) { console.error('SELF-CHECK FAIL', bad.slice(0, 2)); process.exit(1); }
const out = body + `NLMFTR|sha256=${sha(body)}|rows=${rows.length}|verdict=NOTEBOOKLM-BACKUP-INGESTED-REFERENTIAL|json=0\n`;
fs.writeFileSync(OUT, out);
process.stdout.write(`ingested ${files.length} files from ${DIR} -> ${OUT}\n`);
process.stdout.write(out.split('\n').slice(0, 1).join('\n') + '\n...' + `\nNLMUNION + NLMFTR:\n` + out.split('\n').filter((l) => l.startsWith('NLMUNION') || l.startsWith('NLMFTR')).join('\n') + '\n');
