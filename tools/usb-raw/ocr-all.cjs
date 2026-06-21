#!/usr/bin/env node
/* ocr-all.cjs — finish image OCR in ONE background process. Pool of 4 concurrent tesseract,
 * fs.appendFileSync per result (immediate flush — no buffer loss if interrupted), resume-aware
 * (skips overlay), carve-out + USB/missing skip, NO hard deadline (runs to completion). */
const fs = require('fs'), cp = require('child_process');
const DIR = 'C:/tmp/asolaria-unified-archaeology';
const TESS = 'C:/Program Files/Tesseract-OCR/tesseract.exe';
const OVL = DIR + '/image-text-overlay.ndjson';
const POOL = 4;
const IDENT = /\b(jesse|rayssa|dan|amy|felipe|liris|acer|falcon|aether|beast|xiaomi|monet|rose|sentinel|gaia|helm|omni|hermes|shannon|opus|gemini|deepseek|mistral|claude|codex|behcs|brown|hilbert|asolaria|pid|cube|glyph)\b/gi;
const METRIC = /\b\d[\d,]*\s*:\s*\d[\d,]*\b|\b\d+(?:\.\d+)?\s*(?:TB|GB|MB|KB|%)\b|\b\d{7,}\b|10\^\d+|1e\d+/gi;
const CARVE = /s22-ultra|a06-de-felipe|a06_|felipe|beast-keys|vault|decrypted|private[-_]?key|\.env\b|cookie|charm_|id_rsa|financial|payout|bank|salary/i;
const done = new Set();
if (fs.existsSync(OVL)) for (const l of fs.readFileSync(OVL, 'utf8').split('\n')) { if (!l.trim()) continue; try { done.add(JSON.parse(l).path); } catch (e) {} }
const rem = [];
for (const f of ['rows-USB.ndjson', 'rows-C.ndjson', 'rows-D.ndjson']) { const p = DIR + '/' + f; if (!fs.existsSync(p)) continue;
  for (const l of fs.readFileSync(p, 'utf8').split('\n')) { if (!l.trim()) continue; let o; try { o = JSON.parse(l); } catch (e) { continue; }
    const pa = o.path || ''; if (!(o.kind === 'image' || /\.(jpe?g|png|webp)$/i.test(pa))) continue;
    if (done.has(pa) || CARVE.test(pa) || pa.startsWith('USB:')) continue;
    if (!fs.existsSync(pa)) continue; rem.push(pa); } }
console.log('OCR-ALL start: remaining=' + rem.length + ' (already done=' + done.size + ', pool=' + POOL + ')');
let idx = 0, n = 0, txt = 0, ids = 0, t0 = Date.now();
function ocrOne(p) { return new Promise(res => {
  let out = '', killed = false;
  const ch = cp.spawn(TESS, [p, 'stdout', '--psm', '3'], { stdio: ['ignore', 'pipe', 'ignore'] });
  const to = setTimeout(() => { killed = true; try { ch.kill(); } catch (e) {} }, 25000);
  ch.stdout.on('data', d => out += d);
  ch.on('close', () => { clearTimeout(to);
    if (!killed && out.trim().length > 0) {
      const id = [...new Set((out.match(IDENT) || []).map(s => s.toLowerCase()))].slice(0, 24);
      const mets = [...new Set(out.match(METRIC) || [])].slice(0, 24);
      fs.appendFileSync(OVL, JSON.stringify({ path: p, ids: id, mets, sig: /significance/i.test(out), ocr: 1 }) + '\n');
      n++; if (out.trim().length > 3) txt++; if (id.length) ids++;
    }
    res();
  });
  ch.on('error', () => { clearTimeout(to); res(); });
}); }
async function worker() { while (idx < rem.length) { const p = rem[idx++]; await ocrOne(p); if (n > 0 && n % 500 === 0) console.log('  progress ocrd=' + n + ' txt=' + txt + ' ids=' + ids + ' ' + Math.round((Date.now() - t0) / 1000) + 's'); } }
Promise.all(Array.from({ length: POOL }, worker)).then(() => {
  const total = fs.readFileSync(OVL, 'utf8').split('\n').filter(Boolean).length;
  console.log('OCR-ALL DONE: ocrd_this_run=' + n + ' withText=' + txt + ' withIds=' + ids + ' | overlay_total=' + total + ' | ' + Math.round((Date.now() - t0) / 1000) + 's');
});
