// PHASE-2 GitHub-file courier tests. E=0: filesystem only, no network, no GitHub API, no fire.

import { rmSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { lanePaths, emit } from './relay-driver.mjs';
import { publishOwnLane, pollPeerLane, sharedStatus } from './relay-github-transport.mjs';

let pass = 0, fail = 0;
function ok(name, cond, detail = '') {
  if (cond) { pass++; console.log('  PASS ', name); }
  else { fail++; console.error('  FAIL ', name, detail); }
}
function throws(name, fn, re) {
  try { fn(); ok(name, false, 'did not throw'); }
  catch (e) { ok(name, re.test(e.message), e.message); }
}
function fresh(name) {
  const root = `${tmpdir().replace(/\\/g, '/')}/relay-phase2-test-${name}`;
  rmSync(root, { recursive: true, force: true });
  mkdirSync(root, { recursive: true });
  mkdirSync(root + '/local'); mkdirSync(root + '/shared'); mkdirSync(root + '/inbox');
  return { root, local: root + '/local', shared: root + '/shared', inbox: root + '/inbox' };
}

console.log('PHASE-2 GITHUB-TRANSPORT TEST SUITE (E=0)');

{ const T = fresh('happy'); const P = lanePaths(T.local, 'acer');
  emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'hello', ts: '2026-06-21T00:00:00Z' });
  const pub = publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer' });
  const pol = pollPeerLane({ sharedRoot: T.shared, peer: 'acer', inboxDir: T.inbox });
  ok('t1 publish rows=1', pub.rows === 1);
  ok('t1 poll rows=1 verified', pol.present && pol.rows === 1); }

{ const T = fresh('action'); const P = lanePaths(T.local, 'acer');
  emit(P, { from: 'acer', to: 'liris', verb: 'EXEC', n: 1, payload: 'do not run', ts: '2026-06-21T00:00:00Z' });
  throws('t2 ACTION verb rejected before publish', () => publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer' }), /ACTION_VERB_REJECT/); }

{ const T = fresh('control'); const P = lanePaths(T.local, 'acer');
  emit(P, { from: 'acer', to: 'liris', verb: 'HOLD', n: 1, payload: 'hold only', ts: '2026-06-21T00:00:00Z' });
  throws('t3a CONTROL rejected by default', () => publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer' }), /CONTROL_VERB_REJECT/);
  const pub = publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer', allowControl: true });
  ok('t3b CONTROL allowed only when explicitly set', pub.rows === 1); }

{ const T = fresh('seat');
  throws('t4a peer traversal rejected', () => pollPeerLane({ sharedRoot: T.shared, peer: '../acer', inboxDir: T.inbox }), /SEAT_REJECT/);
  throws('t4b bad seat rejected', () => publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'ACER', allowControl: true }), /SEAT_REJECT/); }

{ const T = fresh('tamper'); const P = lanePaths(T.local, 'acer');
  emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'clean', ts: '2026-06-21T00:00:00Z' });
  publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer' });
  const hp = `${T.shared}/acer/relay-acer.hbp`;
  writeFileSync(hp, readFileSync(hp, 'utf8').replace('verb=NOTE', 'verb=EXEC'));
  throws('t5 tampered shared lane rejected by peer', () => pollPeerLane({ sharedRoot: T.shared, peer: 'acer', inboxDir: T.inbox }), /PEER_VERIFY_REJECT|ACTION_VERB_REJECT|PARSE_REJECT/); }

{ const T = fresh('absent'); const pol = pollPeerLane({ sharedRoot: T.shared, peer: 'liris', inboxDir: T.inbox });
  ok('t6 absent peer lane returns present=false', pol.present === false && pol.rows === 0); }

{ const T = fresh('status'); mkdirSync(T.shared + '/acer', { recursive: true }); mkdirSync(T.shared + '/BAD', { recursive: true });
  const st = sharedStatus(T.shared);
  ok('t7 sharedStatus filters bad seat dirs', st.seats.length === 1 && st.seats[0].seat === 'acer'); }

// t8 — FIX: a forged .hbi sidecar (valid .hbp untouched) carrying a COSIGN/cls=ACTION/seq=777 head must be REJECTED on poll.
// Before the fix this returned {present:true} and laneHead() trusted the forged head. (acer attack-verify of PR #24)
{ const T = fresh('hbi-forge'); const P = lanePaths(T.local, 'acer');
  emit(P, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'benign', ts: '2026-06-21T00:00:00Z' });
  publishOwnLane({ localLaneDir: T.local, sharedRoot: T.shared, seat: 'acer' });
  const forged = 'IDX|row_hash=deadbeefdeadbeef|row_off=0|row_len=999|pid=BH.RELAY.acer.1|verb=COSIGN|cls=ACTION|from=acer|to=liris|ts=2026-06-21T00:00:00Z|seq=777|payload_off=0|payload_len=6\n';
  writeFileSync(`${T.shared}/acer/relay-acer.hbi`, forged); // tamper ONLY the .hbi; leave the valid .hbp + .payloads
  throws('t8 forged .hbi (COSIGN/ACTION head) rejected on poll', () => pollPeerLane({ sharedRoot: T.shared, peer: 'acer', inboxDir: T.inbox }), /PEER_HBI_MISMATCH|ACTION_VERB_REJECT/); }

// t9 — poll-side ACTION gate, ISOLATED: a chain-valid EXEC peer lane (hand-placed into shared/, so it bypasses
// publishOwnLane's gate) must be rejected by pollPeerLane's own verb gate — not by a row_hash break like t5.
{ const T = fresh('poll-action'); const P = lanePaths(T.local, 'liris');
  emit(P, { from: 'liris', to: 'acer', verb: 'EXEC', n: 1, payload: 'chain-valid but ACTION', ts: '2026-06-21T00:00:00Z' });
  mkdirSync(`${T.shared}/liris`, { recursive: true });
  for (const k of ['hbp', 'hbi', 'payloads']) copyFileSync(P[k], `${T.shared}/liris/relay-liris.${k}`);
  throws('t9 chain-valid EXEC peer lane rejected on poll (verb gate)', () => pollPeerLane({ sharedRoot: T.shared, peer: 'liris', inboxDir: T.inbox }), /ACTION_VERB_REJECT/); }

console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
