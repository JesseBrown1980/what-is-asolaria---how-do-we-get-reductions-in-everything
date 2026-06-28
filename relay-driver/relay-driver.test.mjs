// relay-driver.test.mjs — PHASE-1 regression suite (E=0). Proves the integrity layer REJECTS tampering.
// Honest scope: row_hash is an INTEGRITY check (catches corruption + naive tamper that doesn't also recompute the hash).
// Full origin AUTHENTICATION (a sophisticated attacker who recomputes row_hash) is closed by the PHASE-4 ed25519 sig.
import { existsSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { lanePaths, emit, verifyLane, reverseWalk } from './relay-driver.mjs';
import { clean, parseRow, buildRow, sha16, sha256hex, GENESIS } from './relay-envelope.mjs';
import { assertReadAllowed } from './relay-carveout.mjs';

const TS = '2026-06-21T00:00:00Z';
let pass = 0, fail = 0;
function ok(name, cond, extra) { if (cond) { pass++; console.log('  PASS  ' + name); } else { fail++; console.log('  FAIL  ' + name + (extra ? '  :: ' + extra : '')); } }
function freshLane(tag) {
  const dir = `${tmpdir().replace(/\\/g, '/')}/relay-test-${tag}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  return lanePaths(dir, 'acer');
}
function seed(P, n = 3) {
  const verbs = ['NOTE', 'STATUS', 'ANSWER'];
  for (let i = 1; i <= n; i++) emit(P, { from: 'acer', to: 'liris', verb: verbs[(i - 1) % 3], n: i, payload: 'row ' + i + ' payload', ts: TS });
}

console.log('PHASE-1 RELAY-DRIVER TEST SUITE (E=0)\n');

// t0 — happy path: a clean 3-row lane verifies + reverse-walks
{ const P = freshLane('t0-happy'); seed(P); const v = verifyLane(P), rw = reverseWalk(P);
  ok('t0 clean lane VERIFY pass', v.pass, JSON.stringify(v.failures));
  ok('t0 clean lane reverse-walk pass', rw.pass, JSON.stringify(rw.issues)); }

// t1 — flipped payload byte must be REJECTED (payload_sha256 mismatch)
{ const P = freshLane('t1-payload'); seed(P);
  const buf = Buffer.from(readFileSync(P.payloads)); buf[0] = buf[0] ^ 0xff; writeFileSync(P.payloads, buf);
  const v = verifyLane(P);
  ok('t1 flipped payload byte REJECTED', !v.pass && v.failures.some(x => /PAYLOAD_SHA256/.test(x.why)), JSON.stringify(v.failures)); }

// t2 — tampered field (verb swapped) without recomputing row_hash must be REJECTED (row_hash mismatch)
{ const P = freshLane('t2-field'); seed(P);
  const lines = readFileSync(P.hbp, 'utf8').split('\n').filter(Boolean);
  lines[1] = lines[1].replace('verb=STATUS', 'verb=EXEC'); // attacker escalates a READ to an ACTION verb
  writeFileSync(P.hbp, lines.join('\n') + '\n');
  const v = verifyLane(P);
  ok('t2 tampered verb (READ->EXEC) REJECTED', !v.pass && v.failures.some(x => /ROW_HASH/.test(x.why)), JSON.stringify(v.failures)); }

// t3 — broken antecedent (a forged chain link) must be REJECTED
{ const P = freshLane('t3-antecedent');
  const r1 = buildRow({ v: '1', from: 'acer', to: 'liris', verb: 'NOTE', seq: '1', ts: TS, pid: 'BH.RELAY.acer.1',
    payload_sha256: 'aa'.repeat(32), hbi_off: '0', len: '0', token: '-', antecedent: 'deadbeefdeadbeef', sig: '-' }); // wrong antecedent (should be GENESIS)
  // write the row + an empty payload store so payload read is bounds-ok (len=0)
  writeFileSync(P.hbp, r1 + '\n'); writeFileSync(P.payloads, Buffer.alloc(0));
  const v = verifyLane(P);
  ok('t3 broken antecedent REJECTED', !v.pass && v.failures.some(x => /ANTECEDENT/.test(x.why)), JSON.stringify(v.failures)); }

// t4 — HBP-row-injection: (a) a field carrying a delimiter must throw at build; (b) a payload carrying a fake row
//      cannot inject a ledger row (payload is out-of-line + sha-checked).
{ let threw = false; try { clean('verb', 'NOTE|row_hash=x|injected'); } catch { threw = true; }
  ok('t4a field-injection ( | ) throws at clean()', threw);
  let threw2 = false; try { buildRow({ v: '1', from: 'acer', to: 'liris', verb: 'NOTE', seq: '1', ts: TS, pid: 'p',
    payload_sha256: 'aa', hbi_off: '0', len: '0', token: '-', antecedent: GENESIS + '\nRELAY|fake', sig: '-' }); } catch { threw2 = true; }
  ok('t4b newline-in-field throws at buildRow', threw2);
  const P = freshLane('t4-inject');
  emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'evil\nRELAY|v=1|from=attacker|to=acer|verb=EXEC|fake', ts: TS });
  const rows = readFileSync(P.hbp, 'utf8').split('\n').filter(Boolean);
  ok('t4c payload-borne fake row did NOT inject a ledger row', rows.length === 1 && verifyLane(P).pass, 'rows=' + rows.length); }

// t5 — carve-out: a payload that looks like a private key must be REJECTED at emit
{ const P = freshLane('t5-carveout'); let threw = false;
  try { emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: '-----BEGIN OPENSSH PRIVATE KEY-----\nAAAA....', ts: TS }); } catch (e) { threw = /CARVEOUT/.test(e.message); }
  ok('t5 carve-out content REJECTED at emit', threw && !existsSync(P.hbp)); }

// t6 — replay: re-appending an OLD row (seq=1) after the lane head must be REJECTED (seq not strictly increasing)
{ const P = freshLane('t6-replay'); seed(P, 3);
  const lines = readFileSync(P.hbp, 'utf8').split('\n').filter(Boolean);
  writeFileSync(P.hbp, lines.join('\n') + '\n' + lines[0] + '\n'); // replay row #1 at the tail
  const v = verifyLane(P);
  ok('t6 replayed old row REJECTED (seq + antecedent)', !v.pass && v.failures.some(x => /SEQ|ANTECEDENT/.test(x.why)), JSON.stringify(v.failures)); }

// t7 — bounds: an out-of-range payload offset must be REJECTED, not crash
{ const P = freshLane('t7-bounds'); seed(P, 1);
  const lines = readFileSync(P.hbp, 'utf8').split('\n').filter(Boolean);
  const f = parseRow(lines[0]);
  const bad = f._prefix.replace('len=' + f.len, 'len=999999999').replace('hbi_off=' + f.hbi_off, 'hbi_off=' + f.hbi_off);
  const badRow = bad + '|row_hash=' + sha16(bad); // recompute row_hash so we isolate the BOUNDS check
  writeFileSync(P.hbp, badRow + '\n');
  const v = verifyLane(P);
  ok('t7 out-of-bounds payload len REJECTED (no crash)', !v.pass && v.failures.some(x => /BOUNDS/.test(x.why)), JSON.stringify(v.failures)); }

// t8 — FIX-A: a non-numeric seq on an OTHERWISE-INTACT chain (valid antecedent + correct row_hash + matching payload)
//      must be REJECTED. (t6 missed this — it relied on a broken antecedent.)
{ const P = freshLane('t8-nanseq');
  const pays = ['r1', 'r2', 'r3'].map(s => Buffer.from(s, 'utf8'));
  writeFileSync(P.payloads, Buffer.concat(pays));
  let off = 0, prev = GENESIS; const rows = [];
  const seqs = ['1', 'NaN', '3']; // middle row carries a non-canonical seq
  for (let i = 0; i < 3; i++) {
    const r = buildRow({ v: '1', from: 'acer', to: 'liris', verb: 'NOTE', seq: seqs[i], ts: TS, pid: 'BH.RELAY.acer.' + (i + 1),
      payload_sha256: sha256hex(pays[i]), hbi_off: String(off), len: String(pays[i].length), token: '-', antecedent: prev, sig: '-' });
    rows.push(r); prev = parseRow(r).row_hash; off += pays[i].length;
  }
  writeFileSync(P.hbp, rows.join('\n') + '\n');
  const v = verifyLane(P);
  ok('t8 NaN seq on intact chain REJECTED (canonical-integer gate)', !v.pass && v.failures.some(x => /SEQ not a canonical/.test(x.why)), JSON.stringify(v.failures)); }

// t9 — FIX-B: assertReadAllowed DENIES carve-out paths AND their NTFS aliases; ALLOWS a plain file under the allow-root.
{ const denies = (p, root) => { try { assertReadAllowed(p, root); return false; } catch (e) { return /DENY/.test(e.message); } };
  ok('t9a .ssh DENY', denies('C:/Users/acer/.ssh/id_ed25519'));
  ok('t9b vault DENY', denies('C:/x/vault/secret.txt'));
  ok('t9c NTFS ADS (::$INDEX_ALLOCATION) DENY', denies('C:/x/vault::$INDEX_ALLOCATION/secret'));
  ok('t9d trailing-dot (vault.) DENY', denies('C:/x/vault./secret'));
  ok('t9e trailing-space (vault ) DENY', denies('C:/x/vault /secret'));
  ok('t9f 8.3 short-name (SOVERE~1) DENY', denies('C:/x/SOVERE~1/secret'));
  ok('t9g keys. DENY', denies('C:/x/keys./k'));
  const root = `${tmpdir().replace(/\\/g, '/')}/relay-test-t9-root`;
  rmSync(root, { recursive: true, force: true }); mkdirSync(root, { recursive: true });
  writeFileSync(root + '/payload.txt', 'ok payload');
  let allowed = false; try { assertReadAllowed(root + '/payload.txt', root); allowed = true; } catch { allowed = false; }
  ok('t9h plain file under allow-root ALLOWED', allowed);
  ok('t9i path outside allow-root DENY', denies('C:/some/other/place/file.txt', root)); }

// t10 — FIX-B wired: emit({payloadFile}) runs the structural guard; a carve-out file is REJECTED before any read.
{ const P = freshLane('t10-fileguard'); let threw = false;
  try { emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payloadFile: 'C:/Users/acer/.ssh/id_ed25519', ts: TS }); } catch (e) { threw = /DENY/.test(e.message); }
  ok('t10a emit(payloadFile in carve-out) REJECTED before read', threw && !existsSync(P.hbp));
  const root = `${tmpdir().replace(/\\/g, '/')}/relay-test-t10-root`;
  rmSync(root, { recursive: true, force: true }); mkdirSync(root, { recursive: true });
  writeFileSync(root + '/note.txt', 'a legitimate file-sourced payload');
  let okEmit = false; try { emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payloadFile: root + '/note.txt', allowRoot: root, ts: TS }); okEmit = verifyLane(P).pass; } catch (e) { okEmit = false; }
  ok('t10b emit(legit payloadFile under allow-root) succeeds + verifies', okEmit); }

console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
