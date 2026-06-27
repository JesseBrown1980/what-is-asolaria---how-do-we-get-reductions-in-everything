#!/usr/bin/env node
/* usb-img-ocr.cjs — extract the CARVE-CLEAN, NON-evac-e (system/agent/research) USB images via
 * extract_full.py (contiguous reader), OCR them, append to image-text-overlay.ndjson keyed by the
 * ORIGINAL USB path. HOLDS the evac-e/usb-surgery recovery carves (unknown/likely-personal media).
 * E=0 read-only on the USB; writes extracted images to a temp dir + appends overlay. */
const fs = require('fs'), cp = require('child_process');
const DIR = 'C:/tmp/asolaria-unified-archaeology';
const OUTI = 'C:/tmp/usb-img-ocr'; fs.mkdirSync(OUTI, { recursive: true });
const TESS = 'C:/Program Files/Tesseract-OCR/tesseract.exe';
const EXTRACT = 'C:/asolaria-acer/tools/usb-raw/extract_full.py';
const OVL = DIR + '/image-text-overlay.ndjson';
const CARVE = /s22-ultra|a06-de-felipe|a06_|felipe|beast-keys|vault|decrypted|private[-_]?key|cookie|charm_|id_rsa|financial|payout|bank|salary|falcon-dump|phone|whatsapp|telegram|\/DCIM\/|\/Camera\/|\/Pictures\/|\/Photos\/|screenshot|gallery|selfie|contacts|\/sms|call.?log|IMG_\d|PXL_\d|VID_\d/i;
const HOLD = /^\/evac-e-2026-04-23\//i; // usb-surgery recovery carves — unknown/likely-personal, HELD
const IDENT = /\b(jesse|rayssa|dan|amy|felipe|liris|acer|falcon|aether|gaia|helm|omni|hermes|shannon|opus|gemini|deepseek|mistral|claude|codex|behcs|brown|hilbert|asolaria|pid|cube|glyph)\b/gi;
const METRIC = /\b\d[\d,]*\s*:\s*\d[\d,]*\b|\b\d+(?:\.\d+)?\s*(?:TB|GB|MB|KB|%)\b|\b\d{7,}\b|10\^\d+|1e\d+/gi;
const done = new Set();
if (fs.existsSync(OVL)) for (const l of fs.readFileSync(OVL, 'utf8').split('\n')) { if (!l.trim()) continue; try { done.add(JSON.parse(l).path); } catch (e) {} }
const safe = [];
for (const l of fs.readFileSync(DIR + '/rows-USB.ndjson', 'utf8').split('\n')) { if (!l.trim()) continue; let o; try { o = JSON.parse(l); } catch (e) { continue; }
  const p = o.path || ''; if (!(o.kind === 'image' || /\.(jpe?g|png|webp)$/i.test(p))) continue;
  if (done.has(p) || CARVE.test(p) || HOLD.test(p)) continue;
  if (!o.cluster || !o.bytes) continue;
  safe.push(o); }
console.log('USB safe (non-evac-e, carve-clean) images to extract+OCR: ' + safe.length);
// build extract specs
const specs = safe.map((o, i) => { const ext = (o.ext || '.png').replace(/[^.a-z0-9]/gi, ''); const rel = 'u' + i + ext; o._rel = rel; return o.cluster + ':' + o.bytes + ':' + rel; });
if (!specs.length) { console.log('nothing to do'); process.exit(0); }
console.log('extracting ' + specs.length + ' via extract_full.py ...');
try { cp.execFileSync('python', [EXTRACT, OUTI, ...specs], { stdio: ['ignore', 'ignore', 'inherit'], timeout: 600000 }); } catch (e) { console.log('extract error (continuing with what landed): ' + String(e.message).slice(0, 120)); }
let n = 0, txt = 0, ids = 0, miss = 0;
for (const o of safe) {
  const f = OUTI + '/' + o._rel; if (!fs.existsSync(f) || fs.statSync(f).size === 0) { miss++; continue; }
  let t = ''; try { t = cp.execFileSync(TESS, [f, 'stdout', '--psm', '3'], { stdio: ['ignore', 'pipe', 'ignore'], timeout: 25000, maxBuffer: 8e6 }).toString(); } catch (e) { continue; }
  n++;
  const id = [...new Set((t.match(IDENT) || []).map(s => s.toLowerCase()))].slice(0, 24);
  const mets = [...new Set(t.match(METRIC) || [])].slice(0, 24);
  if (t.trim().length > 3) txt++; if (id.length) ids++;
  if (t.trim().length > 0) fs.appendFileSync(OVL, JSON.stringify({ path: o.path, ids: id, mets, sig: /significance/i.test(t), ocr: 1, src: 'usb-extracted' }) + '\n');
}
console.log('USB-IMG-OCR DONE: extracted_ocrd=' + n + ' withText=' + txt + ' withIds=' + ids + ' extract_missing=' + miss + ' (held evac-e carves not touched)');
