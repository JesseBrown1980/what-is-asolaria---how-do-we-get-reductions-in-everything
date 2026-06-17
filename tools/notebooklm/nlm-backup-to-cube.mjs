#!/usr/bin/env node
// nlm-backup-to-cube.mjs — BILATERAL COMBINED (acer + liris): NotebookLM-TUI backup -> referential HBP receipt + glyph cube.
//
// Best of both vantages, attack-verified and merged:
//   liris spine : notebook-root detection (metadata.json), lane + kind, full streaming per-file sha256,
//                 NLMSKIP rows for sensitive paths, .sha256 sidecar, the runbook.
//   acer  layer : per-text-file glyph CUBE (cube10 / host_handle8 / quant8 / verb-noun top-glyphs) + a
//                 corpus reuse union — the "ingest into the cubes" half.
//   bilateral fixes:
//     (1) q() ALSO escapes { and } so notebook titles/paths can never inject literal braces
//         (HBP brace-free invariant — caught in the liris version).
//     (2) the content digest (NLMFOOT.content_sha256) is computed over the deterministic rows ONLY;
//         the run timestamp lives in NLMFOOT, OUTSIDE the digest, so the receipt is reproducible
//         (caught: liris put captured_at inside the hashed body).
//
// HELD-SAFE: read-only input; NO raw notebook body republished (only path/lane/kind/bytes/mtime/sha256
// + verb-noun glyph-tuples); no provider calls; cookies/secrets NEVER read or emitted (path-skipped).
// Usage: node tools/notebooklm/nlm-backup-to-cube.mjs <backup-root> [--out receipt.hbp]
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const SENSITIVE = /(cookie|auth|token|secret|credential)/i;
const TEXT = new Set(['.md', '.txt', '.json', '.csv', '.tsv', '.html', '.htm', '.xml', '.srt', '.vtt']);
const TEXT_CAP = 2_000_000;
const STOP = new Set('the a an is it of to and or in on for as by with not no but its are be that this each so an at into we us our their they them then than only one two more most every all any can could should would'.split(' '));

function usage() { console.error('Usage: node tools/notebooklm/nlm-backup-to-cube.mjs <backup-root> [--out receipt.hbp]'); process.exit(1); }
function parseArgs(argv) {
  const a = { backupRoot: null, out: null };
  let i = 0;
  while (i < argv.length) {
    const x = argv[i];
    if (!a.backupRoot && !x.startsWith('--')) { a.backupRoot = path.resolve(x); i += 1; continue; }
    if (x === '--out') { if (i + 1 >= argv.length) usage(); a.out = path.resolve(argv[i + 1]); i += 2; continue; }
    usage();
  }
  if (!a.backupRoot) usage();
  return a;
}
// HBP-safe field escape: pipe, percent, BRACES, CR, LF (braces added vs liris — brace-free invariant)
function q(v) {
  return String(v ?? '').replace(/%/g, '%25').replace(/\|/g, '%7C').replace(/\{/g, '%7B').replace(/\}/g, '%7D').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function row(tag, obj) { return [tag, ...Object.entries(obj).map(([k, v]) => `${k}=${q(v)}`)].join('|'); }

function shaFile(p) {
  const h = createHash('sha256'); const fd = fs.openSync(p, 'r'); const buf = Buffer.allocUnsafe(1 << 20);
  try { let n; while ((n = fs.readSync(fd, buf, 0, buf.length, null)) > 0) h.update(buf.subarray(0, n)); } finally { fs.closeSync(fd); }
  return h.digest('hex');
}
function walkFiles(root) {
  const out = []; const st = [root];
  while (st.length) { const d = st.pop(); for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (e.name === '.git') continue; st.push(p); } else if (e.isFile()) out.push(p); } }
  return out.sort((a, b) => a.localeCompare(b));
}
function findNotebookRoots(root) {
  if (fs.existsSync(path.join(root, 'metadata.json'))) return [root];
  const roots = new Set(); const st = [root];
  while (st.length) {
    const d = st.pop(); const ents = fs.readdirSync(d, { withFileTypes: true });
    if (ents.some((e) => e.isFile() && e.name === 'metadata.json')) { roots.add(d); continue; }
    for (const e of ents) if (e.isDirectory() && e.name !== '.git') st.push(path.join(d, e.name));
  }
  return [...roots].sort((a, b) => a.localeCompare(b));
}
function detectLane(rel) { const f = rel.split('/')[0] || ''; return ['sources', 'artifacts', 'notes', 'mindmaps'].includes(f) ? f : 'other'; }
function detectKind(rel) { const e = path.extname(rel).toLowerCase(); const m = { '.md': 'markdown', '.txt': 'text', '.json': 'json', '.html': 'html', '.htm': 'html', '.csv': 'csv', '.tsv': 'tsv', '.pdf': 'pdf', '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.gif': 'gif', '.webp': 'webp', '.mp4': 'mp4', '.m4a': 'm4a', '.wav': 'wav', '.mp3': 'mp3', '.pptx': 'pptx' }; return m[e] || (e ? e.slice(1) : 'bin'); }
// acer glyph-cube layer (text files only)
function glyphCube(text) {
  const full = sha(text), cube10 = full.slice(0, 20), handle8 = full.slice(0, 16);
  const proj = new Float64Array(8); const toks = text.toLowerCase().match(/[a-z][a-z0-9_-]{1,}/g) || [];
  for (const t of toks) { const h = [...t].reduce((a, c) => (a * 131 + c.charCodeAt(0)) >>> 0, 7); proj[h & 7] += (h & 8) ? -1 : 1; }
  const quant8 = Array.from(proj, (v) => Math.max(0, Math.min(255, Math.round(128 + v)))).join(',');
  const freq = new Map(); for (const t of toks) { if (t.length < 4 || STOP.has(t)) continue; freq.set(t, (freq.get(t) || 0) + 1); }
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => `${w}:${n}:g${sha(w).slice(0, 8)}`);
  return { cube10, handle8, quant8, distinct: freq.size, top, glyphs: top.map((t) => t.split(':').pop()) };
}

function main() {
  const { backupRoot, out } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(backupRoot) || !fs.statSync(backupRoot).isDirectory()) throw new Error('backup root not a directory: ' + backupRoot);
  const roots = findNotebookRoots(backupRoot);
  if (!roots.length) throw new Error('no metadata.json notebook roots under: ' + backupRoot);

  const rows = [];
  rows.push(row('NLMHDR', { proof: 'NOTEBOOKLM-BACKUP-TO-CUBE-INGEST', vantage: 'acer+liris-combined', source: 'notebooklm-tui@d91d5e60', backup_root: backupRoot, notebook_roots: roots.length, mode: 'referential-only(no-raw-body)+glyph-cube', json: 0 }));
  let totBytes = 0, totFiles = 0, totSkip = 0, textFiles = 0;
  const cube10seen = new Map(), glyphCat = new Map(); let cubeRaw = 0;

  for (const nbRoot of roots) {
    // metadata.json is HASHED only, NEVER JSON-parsed (HBP-not-JSON rule). Notebook id/title = folder name.
    const metaSha = sha(fs.readFileSync(path.join(nbRoot, 'metadata.json'), 'utf8'));
    const nbId = path.basename(nbRoot), nbTitle = path.basename(nbRoot);
    const lanes = { sources: 0, artifacts: 0, notes: 0, mindmaps: 0, other: 0 }; let nbBytes = 0; const fileRows = []; const skipRows = [];
    for (const fp of walkFiles(nbRoot)) {
      const rel = path.relative(nbRoot, fp).split(path.sep).join('/');
      if (rel === 'metadata.json') continue;
      if (SENSITIVE.test(rel)) { skipRows.push(row('NLMSKIP', { notebook_id: nbId, reason: 'sensitive_path', rel, json: 0 })); totSkip += 1; continue; }
      const stat = fs.statSync(fp); const lane = detectLane(rel), kind = detectKind(rel); lanes[lane] += 1; nbBytes += stat.size;
      const f = { notebook_id: nbId, lane, kind, ext: path.extname(rel).toLowerCase(), rel, bytes: stat.size, mtime: stat.mtime.toISOString(), sha256: shaFile(fp) };
      if (TEXT.has(f.ext) && stat.size <= TEXT_CAP) {
        const c = glyphCube(fs.readFileSync(fp, 'utf8')); textFiles += 1; cubeRaw += stat.size;
        cube10seen.set(c.cube10, (cube10seen.get(c.cube10) || 0) + 1); for (const g of c.glyphs) glyphCat.set(g, (glyphCat.get(g) || 0) + 1);
        f.cube10 = c.cube10; f.handle8 = c.handle8; f.distinct_terms = c.distinct; f.top = c.top.join(' ');
      }
      fileRows.push(row('NLMFILE', { ...f, json: 0 }));
    }
    rows.push(row('NLMNOTEBOOK', { notebook_id: nbId, title: nbTitle, metadata_sha256: metaSha, sources: lanes.sources, artifacts: lanes.artifacts, notes: lanes.notes, mindmaps: lanes.mindmaps, other: lanes.other, bytes: nbBytes, json: 0 }));
    rows.push(...fileRows, ...skipRows);
    totBytes += nbBytes; totFiles += fileRows.length;
  }
  const distinctCube = cube10seen.size, shared = [...glyphCat.values()].filter((n) => n >= 2).length;
  rows.push(row('NLMUNION', { text_files: textFiles, distinct_cube10: distinctCube, dup_collapsed: textFiles - distinctCube, cube_raw_bytes: cubeRaw, dedup_referential: distinctCube ? Math.round(cubeRaw / (distinctCube * 10)) + 'x' : '0x', distinct_glyphs: glyphCat.size, shared_glyphs: shared, json: 0 }));

  // deterministic content digest = over all rows so far (NO timestamp inside) — reproducible
  const contentBody = rows.join('\n') + '\n';
  const contentSha = sha(contentBody);
  rows.push(row('NLMFOOT', { notebooks: roots.length, files: totFiles, bytes: totBytes, skipped_sensitive: totSkip, content_sha256: contentSha, captured_at: new Date().toISOString(), secrets_read: 0, cookies_in_rows: 0, json: 0 }));
  const text = rows.join('\n') + '\n';

  // self-check: brace-free + every row json=0
  const bad = text.split('\n').filter(Boolean).filter((r) => /[{}\r]/.test(r) || !r.endsWith('|json=0'));
  if (bad.length) { console.error('SELF-CHECK FAIL', bad.slice(0, 2)); process.exit(1); }

  if (out) {
    fs.writeFileSync(out, text, 'utf8');
    fs.writeFileSync(out + '.sha256', sha(text) + '  ' + path.basename(out) + '\n', 'utf8');
    process.stdout.write('wrote ' + out + ' (+ .sha256)\ncontent_sha256=' + contentSha + ' files=' + totFiles + ' text_cubed=' + textFiles + ' skipped=' + totSkip + '\n');
    return;
  }
  process.stdout.write(text);
}
try { main(); } catch (e) { console.error(e instanceof Error ? e.message : String(e)); process.exit(1); }
