// verify-proposal.cjs - public, corpus-free verifier for PR #26's shipped UNSIGNED proposal.
// This does not prove the Acer-only source-body extraction. It verifies the public proposal artifact:
// schema, closed type vocabulary, arity, dependency references, duplicate accepted PIDs,
// recomputed objective metrics, and LF-normalized SHA prefix recorded in the manifest/envelope.
const fs = require('fs');
const crypto = require('crypto');

const PROPOSAL = process.argv[2] || 'typed-registry-proposal.json';
const EXPECTED_LF_SHA_PREFIX = 'd9d2a6d89da7e650';
const TYPES = new Set(['pid', 'glyph', 'sector', 'lane', 'bh_index', 'coord', 'vector', 'sketch', 'hash', 'bytes', 'prime', 'scalar', 'name', 'set']);

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function die(msg) {
  console.error('FAIL ' + msg);
  process.exit(1);
}

const raw = fs.readFileSync(PROPOSAL);
const text = raw.toString('utf8');
const lfText = text.replace(/\r\n/g, '\n');
const j = JSON.parse(text);
const reg = j.registry || {};
const regPids = new Set(Object.keys(reg));

if (j.schema !== 'asolaria.composability.proposal.v1') die('schema mismatch: ' + j.schema);
if (j.status !== 'DRAFT_E0_UNSIGNED_PROPOSAL') die('status mismatch: ' + j.status);
if (j.corpus_total !== 876) die('corpus_total mismatch: ' + j.corpus_total);

const bad = [];
for (const [pid, c] of Object.entries(reg)) {
  if (!Array.isArray(c.inputs) || !Array.isArray(c.outputs)) bad.push([pid, 'shape']);
  for (const t of [...(c.inputs || []), ...(c.outputs || [])]) if (!TYPES.has(t)) bad.push([pid, 'bad_type', t]);
  if (c.arity !== (c.inputs || []).length) bad.push([pid, 'arity', c.arity, (c.inputs || []).length]);
  for (const d of c.deps || []) if (!regPids.has(d)) bad.push([pid, 'unknown_dep', d]);
}
if (bad.length) die('contract validation failures: ' + JSON.stringify(bad.slice(0, 8)));

let pairs = 0;
const entries = Object.entries(reg);
for (const [pa, ca] of entries) for (const [pb, cb] of entries) {
  if (pa === pb) continue;
  if ((ca.outputs || []).some(o => (cb.inputs || []).includes(o))) pairs++;
}

const accepted = j.accepted || [];
const duplicateAccepted = accepted.length - new Set(accepted.map(x => x.pid)).size;
if (Object.keys(reg).length !== j.after.typed) die('typed mismatch: registry=' + Object.keys(reg).length + ' after.typed=' + j.after.typed);
if (pairs !== j.after.composable_pairs) die('pair mismatch: recomputed=' + pairs + ' declared=' + j.after.composable_pairs);
if (pairs !== j.delta.composable_pairs) die('delta pair mismatch: recomputed=' + pairs + ' delta=' + j.delta.composable_pairs);
if (sha256(Buffer.from(lfText, 'utf8')).slice(0, 16) !== EXPECTED_LF_SHA_PREFIX) {
  die('LF-normalized sha prefix mismatch: got ' + sha256(Buffer.from(lfText, 'utf8')).slice(0, 16));
}

console.log('VERIFY-PROPOSAL PASS');
console.log(JSON.stringify({
  schema: j.schema,
  status: j.status,
  corpus_total: j.corpus_total,
  registry_typed: Object.keys(reg).length,
  accepted_count: j.accepted_count,
  accepted_array: accepted.length,
  duplicate_accepted_pids: duplicateAccepted,
  recomputed_pairs: pairs,
  coverage: j.after.coverage,
  worktree_sha256: sha256(raw).slice(0, 16),
  lf_normalized_sha256: sha256(Buffer.from(lfText, 'utf8')).slice(0, 16),
}, null, 2));
