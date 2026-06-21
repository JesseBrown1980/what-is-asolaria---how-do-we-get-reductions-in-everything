// relay-github-transport.mjs - PHASE 2 (E=0) GitHub-file courier.
// No GitHub API, no tokens, no push/pull, no executor path.

import { existsSync, mkdirSync, copyFileSync, rmSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { lanePaths, emit, verifyLane, reverseWalk } from './relay-driver.mjs';
import { parseRow, classOf } from './relay-envelope.mjs';
import { loadIndex } from './relay-hbi-indexer.mjs';

const LANE_FILES = ['hbp', 'hbi', 'payloads'];
const SEAT_RE = /^[a-z][a-z0-9_-]{1,40}$/;

function assertSeat(seat) {
  if (!SEAT_RE.test(String(seat || ''))) throw new Error('SEAT_REJECT: bad seat id ' + seat);
  return seat;
}

function ensureDir(p) { mkdirSync(p, { recursive: true }); return p; }

function laneDir(sharedRoot, seat) {
  assertSeat(seat);
  const root = resolve(sharedRoot);
  const out = resolve(root, seat);
  if (out !== root && !out.startsWith(root + sep)) throw new Error('PATH_TRAVERSAL_REJECT: ' + seat);
  return out;
}

function laneFileSet(dir, seat) {
  const p = lanePaths(dir, seat);
  return { hbp: p.hbp, hbi: p.hbi, payloads: p.payloads };
}

function parseAllRows(hbpPath) {
  if (!existsSync(hbpPath)) return [];
  return readFileSync(hbpPath, 'utf8').split('\n').filter(Boolean).map(parseRow);
}

export function assertReadOnlyLane(paths, { allowControl = false } = {}) {
  const rows = parseAllRows(paths.hbp);
  for (const r of rows) {
    const cls = classOf(r.verb);
    if (cls === 'ACTION') throw new Error('ACTION_VERB_REJECT: Phase-2 GitHub lane may not courier ' + r.verb);
    if (cls === 'CONTROL' && !allowControl) throw new Error('CONTROL_VERB_REJECT: Phase-2 lane requires explicit allowControl for ' + r.verb);
  }
  return { rows: rows.length, actionRows: 0 };
}

// FIX (acer attack-verify of PR #24): the .hbi sidecar is a couriered file too — bring it INSIDE the verify
// perimeter. Without this, a peer ships a valid .hbp (passes verifyLane/reverseWalk/verb-gate) but a forged .hbi
// (e.g. verb=COSIGN / cls=ACTION / seq=777 / a bogus row_hash head) lands in the trusted inbox unflagged, and
// laneHead() reads row_hash+seq straight from that unverified index. Cross-check the (already-verified) .hbp
// against the .hbi row-for-row, AND run the read-only verb gate over the .hbi's own verb column. No token/sig needed.
export function assertHbiMatchesHbp(paths, { allowControl = false } = {}) {
  const rows = parseAllRows(paths.hbp); // .hbp is verified by verifyLane/reverseWalk BEFORE this is called
  const idx = loadIndex(paths.hbi);
  if (idx.length !== rows.length) throw new Error('PEER_HBI_MISMATCH: index rows ' + idx.length + ' != hbp rows ' + rows.length);
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i], x = idx[i];
    const want = { row_hash: r.row_hash, verb: r.verb, seq: String(r.seq), payload_off: String(r.hbi_off), payload_len: String(r.len), cls: classOf(r.verb) };
    for (const k of Object.keys(want)) {
      if (String(x[k]) !== want[k]) throw new Error('PEER_HBI_MISMATCH: row ' + i + ' field ' + k + ' got ' + x[k] + ' want ' + want[k]);
    }
    // belt-and-suspenders: the .hbi's own verb column must itself pass the read-only verb gate (a cls=ACTION sidecar dies here too)
    const cls = classOf(x.verb);
    if (cls === 'ACTION') throw new Error('ACTION_VERB_REJECT: .hbi index row ' + i + ' carries ' + x.verb);
    if (cls === 'CONTROL' && !allowControl) throw new Error('CONTROL_VERB_REJECT: .hbi index row ' + i + ' carries ' + x.verb);
  }
  return { rows: rows.length };
}

export function publishOwnLane({ localLaneDir, sharedRoot, seat, allowControl = false }) {
  assertSeat(seat);
  const local = laneFileSet(localLaneDir, seat);
  const v = verifyLane(local);
  if (!v.pass) throw new Error('LOCAL_VERIFY_REJECT: ' + JSON.stringify(v.failures));
  const ro = assertReadOnlyLane(local, { allowControl });
  assertHbiMatchesHbp(local, { allowControl }); // never ship an .hbi that diverges from the verified .hbp
  const outDir = ensureDir(laneDir(sharedRoot, seat));
  for (const k of LANE_FILES) {
    if (!existsSync(local[k])) throw new Error('MISSING_LOCAL_LANE_FILE: ' + local[k]);
    copyFileSync(local[k], `${outDir}/relay-${seat}.${k}`);
  }
  return { seat, published: LANE_FILES.length, rows: ro.rows, sharedDir: outDir };
}

export function pollPeerLane({ sharedRoot, peer, inboxDir }) {
  assertSeat(peer);
  const srcDir = laneDir(sharedRoot, peer);
  const dstDir = ensureDir(resolve(inboxDir, peer));
  for (const k of LANE_FILES) {
    const src = `${srcDir}/relay-${peer}.${k}`;
    if (!existsSync(src)) return { peer, present: false, reason: 'peer lane absent', rows: 0 };
    copyFileSync(src, `${dstDir}/relay-${peer}.${k}`);
  }
  const p = laneFileSet(dstDir, peer);
  const v = verifyLane(p);
  if (!v.pass) throw new Error('PEER_VERIFY_REJECT: ' + JSON.stringify(v.failures));
  const rw = reverseWalk(p);
  if (!rw.pass) throw new Error('PEER_REVERSEWALK_REJECT: ' + JSON.stringify(rw.issues));
  const ro = assertReadOnlyLane(p);
  assertHbiMatchesHbp(p); // the couriered .hbi must match the verified .hbp before this lane is accepted
  return { peer, present: true, rows: ro.rows, inboxDir: dstDir };
}

export function sharedStatus(sharedRoot) {
  const root = resolve(sharedRoot);
  if (!existsSync(root)) return { root, seats: [] };
  const seats = [];
  for (const name of readdirSync(root)) {
    if (!SEAT_RE.test(name)) continue;
    const dir = resolve(root, name);
    if (!statSync(dir).isDirectory()) continue;
    const files = LANE_FILES.filter(k => existsSync(`${dir}/relay-${name}.${k}`));
    seats.push({ seat: name, files });
  }
  return { root, seats };
}

function demo() {
  const root = `${tmpdir().replace(/\\/g, '/')}/relay-phase2-demo`;
  rmSync(root, { recursive: true, force: true });
  const local = `${root}/local`;
  const shared = `${root}/shared`;
  const inbox = `${root}/inbox`;
  ensureDir(local); ensureDir(shared); ensureDir(inbox);
  const acer = lanePaths(local, 'acer');
  const liris = lanePaths(local, 'liris');
  emit(acer, { from: 'acer', to: 'liris', verb: 'NOTE', n: 1, payload: 'phase2 hello liris', ts: '2026-06-21T00:00:00Z' });
  emit(liris, { from: 'liris', to: 'acer', verb: 'STATUS', n: 1, payload: 'phase2 hello acer', ts: '2026-06-21T00:00:01Z' });
  const a = publishOwnLane({ localLaneDir: local, sharedRoot: shared, seat: 'acer' });
  const l = publishOwnLane({ localLaneDir: local, sharedRoot: shared, seat: 'liris' });
  const pa = pollPeerLane({ sharedRoot: shared, peer: 'acer', inboxDir: inbox });
  const pl = pollPeerLane({ sharedRoot: shared, peer: 'liris', inboxDir: inbox });
  console.log('PHASE-2 DEMO (E=0: file courier only; no gh token, no push, no fire)');
  console.log(JSON.stringify({ publish: [a, l], poll: [pa, pl], status: sharedStatus(shared) }, null, 2));
}

if (process.argv.includes('--demo')) demo();
