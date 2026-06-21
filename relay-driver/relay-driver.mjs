// relay-driver.mjs — Asolaria cross-colony auto-driver, PHASE 1 (E=0).
// EMIT (local lane append ONLY — no transport, no token mint, no fire) + VERIFY + reverse-walk self-test + --demo.
// PHASE 2 adds GitHub READ-ONLY transport; PHASE 3 the :4953 token gate + OP-VETO HELD queue; PHASE 4 the ed25519 sig
// + positive-assent-cosign release + EXEC-FREEZE-GATE-APEX. Nothing here can fire. See the BUILD CONTRACT §3.
import { existsSync, readFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { buildRow, parseRow, sha256hex, sha16, classOf, GENESIS } from './relay-envelope.mjs';
import { appendBlob, appendRow } from './relay-hbp-writer.mjs';
import { appendIndex, loadIndex, readBlob } from './relay-hbi-indexer.mjs';
import { scan, assertReadAllowed } from './relay-carveout.mjs';

export function lanePaths(dir, seat) {
  return { hbp: `${dir}/relay-${seat}.hbp`, hbi: `${dir}/relay-${seat}.hbi`, payloads: `${dir}/relay-${seat}.payloads` };
}

export function laneHead(hbiPath) {
  const idx = loadIndex(hbiPath);
  if (!idx.length) return { row_hash: GENESIS, seq: 0 };
  const last = idx[idx.length - 1];
  const seq = /^[0-9]+$/.test(last.seq) ? Number(last.seq) : NaN; // canonical-integer guard (FIX-A)
  if (!Number.isSafeInteger(seq)) throw new Error('LANE_HEAD_CORRUPT: non-canonical seq at lane head: ' + last.seq);
  return { row_hash: last.row_hash, seq };
}

// EMIT — PHASE 1: append to this seat's own lane. sig stays '-' (the PHASE-4 authenticator). NO transport, NO fire.
export function emit(paths, { from, to, verb, n, payload, payloadFile, ts, token = '-', allowRoot }) {
  let buf;
  if (payloadFile !== undefined) {
    assertReadAllowed(payloadFile, allowRoot); // STRUCTURAL carve-out guard: refuse carve-out / out-of-allowroot reads (FIX-B, now WIRED)
    buf = readFileSync(payloadFile);
  } else {
    buf = Buffer.isBuffer(payload) ? payload : Buffer.from(String(payload), 'utf8');
  }
  const sc = scan(buf); // best-effort carve-out CONTENT scan (defense-in-depth; assertReadAllowed above is the structural guard)
  if (sc.hit) throw new Error('CARVEOUT_CONTENT_REJECT: payload matched ' + sc.reasons.join(','));
  const head = laneHead(paths.hbi);
  const seq = head.seq + 1;
  const { off, len } = appendBlob(paths.payloads, buf);
  const f = {
    v: '1', from, to, verb, seq: String(seq), ts,
    pid: `BH.RELAY.${from}.${n}`,
    payload_sha256: sha256hex(buf), hbi_off: String(off), len: String(len),
    token, antecedent: head.row_hash, sig: '-',
  };
  const row = buildRow(f);
  const row_off = appendRow(paths.hbp, row);
  const p = parseRow(row);
  appendIndex(paths.hbi, {
    row_hash: p.row_hash, row_off, row_len: Buffer.byteLength(row + '\n'),
    pid: f.pid, verb, cls: classOf(verb), from, to, ts, seq: String(seq),
    payload_off: off, payload_len: len,
  });
  return row;
}

// VERIFY the lane forward: payload_sha256 + row_hash + antecedent linkage + strict-monotonic seq (replay/reorder gate).
export function verifyLane(paths) {
  const failures = [];
  const lines = existsSync(paths.hbp) ? readFileSync(paths.hbp, 'utf8').split('\n').filter(Boolean) : [];
  let prev = GENESIS, prevSeq = 0, checked = 0;
  for (const ln of lines) {
    let f;
    try { f = parseRow(ln); } catch (e) { failures.push({ row: checked, why: 'PARSE: ' + e.message }); checked++; continue; }
    if (sha16(f._prefix) !== f.row_hash) failures.push({ row: checked, why: 'ROW_HASH mismatch' });
    try {
      const blob = readBlob(paths.payloads, f.hbi_off, f.len);
      if (sha256hex(blob) !== f.payload_sha256) failures.push({ row: checked, why: 'PAYLOAD_SHA256 mismatch' });
    } catch (e) { failures.push({ row: checked, why: 'PAYLOAD: ' + e.message }); }
    if (f.antecedent !== prev) failures.push({ row: checked, why: `ANTECEDENT break: got ${f.antecedent} want ${prev}` });
    const sq = /^[0-9]+$/.test(f.seq) ? Number(f.seq) : NaN; // FIX-A: gate on a canonical integer BEFORE comparing
    if (!Number.isSafeInteger(sq)) failures.push({ row: checked, why: 'SEQ not a canonical non-negative integer: ' + f.seq });
    else if (sq <= prevSeq) failures.push({ row: checked, why: `SEQ not strictly increasing: ${f.seq} <= ${prevSeq}` });
    else prevSeq = sq; // advance prevSeq ONLY on a valid integer (never write NaN)
    prev = f.row_hash; checked++;
  }
  return { pass: failures.length === 0, checked, failures };
}

// SELF-REFLECT reverse-walk self-test: walk backward, recompute row_hash, assert antecedent linkage (recurrence integrity).
export function reverseWalk(paths) {
  const lines = existsSync(paths.hbp) ? readFileSync(paths.hbp, 'utf8').split('\n').filter(Boolean) : [];
  const parsed = []; const issues = [];
  for (let j = 0; j < lines.length; j++) {
    try { parsed.push(parseRow(lines[j])); } // FIX: a malformed line returns {pass:false}, never throws
    catch (e) { issues.push({ i: j, why: 'PARSE: ' + e.message }); parsed.push(null); }
  }
  for (let i = parsed.length - 1; i >= 0; i--) {
    const f = parsed[i];
    if (!f) continue; // PARSE issue already recorded
    if (sha16(f._prefix) !== f.row_hash) issues.push({ i, why: 'row_hash' });
    const prevNode = i === 0 ? null : parsed[i - 1];
    const want = i === 0 ? GENESIS : (prevNode ? prevNode.row_hash : '<unparseable-prev>');
    if (f.antecedent !== want) issues.push({ i, why: 'antecedent' });
  }
  return { pass: issues.length === 0, walked: parsed.filter(Boolean).length, issues };
}

function runDemo() {
  const dir = `${tmpdir().replace(/\\/g, '/')}/relay-demo-lane`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const P = lanePaths(dir, 'acer');
  console.log('PHASE-1 DEMO — fresh lane at ' + dir + '  (E=0: local append + verify only; nothing fired)\n');
  const ts = '2026-06-21T00:00:00Z';
  emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'hello liris — relay phase 1 up', ts });
  emit(P, { from: 'acer', to: 'liris', verb: 'STATUS', n: 2, payload: 'fabric :4949 ok; bus :4947 down; github primary', ts });
  emit(P, { from: 'acer', to: 'liris', verb: 'ANSWER', n: 3, payload: 'three chained rows, content-addressed', ts });
  for (const r of readFileSync(P.hbp, 'utf8').split('\n').filter(Boolean)) {
    const f = parseRow(r);
    console.log(`  row seq=${f.seq} verb=${f.verb} class=${classOf(f.verb)} pid=${f.pid}`);
    console.log(`      antecedent=${f.antecedent} -> row_hash=${f.row_hash}  payload@${f.hbi_off}+${f.len}`);
    console.log(`      recalled payload: "${readBlob(P.payloads, f.hbi_off, f.len).toString('utf8')}"`);
  }
  const v = verifyLane(P), rw = reverseWalk(P);
  console.log('\nVERIFY forward : ' + (v.pass ? 'PASS' : 'FAIL ' + JSON.stringify(v.failures)) + ` (checked ${v.checked})`);
  console.log('reverse-walk   : ' + (rw.pass ? 'PASS' : 'FAIL ' + JSON.stringify(rw.issues)) + ` (walked ${rw.walked})`);
  console.log('\nE=0 — local chain integrity proven. Origin AUTHENTICATION is PHASE-4 (ed25519 sig); this is integrity only.');
  process.exit(v.pass && rw.pass ? 0 : 1);
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('relay-driver.mjs');
if (isMain && process.argv.includes('--demo')) runDemo();
