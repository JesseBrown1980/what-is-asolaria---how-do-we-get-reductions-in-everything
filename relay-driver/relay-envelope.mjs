// relay-envelope.mjs — Asolaria cross-colony auto-driver, PHASE 1 (E=0; computes/seals only, fires nothing).
// The RELAY envelope: ONE pipe-delimited HBP row, no-JSON hot path. Payload is ALWAYS out-of-line + content-addressed.
// Owner: CROSS-HOST-COMMS-ARCHITECT (grammar + chaining) per ASOLARIA-CROSS-COLONY-AUTO-DRIVER-BUILD-CONTRACT.md §2.
import { createHash } from 'node:crypto';

export const SPEC_VERSION = '1';
export const GENESIS = '0000000000000000';

// verb taxonomy (INSTRUCT-KR §). UNKNOWN verb -> ACTION (fail-closed).
export const READ_VERBS = new Set(['NOTE', 'STATUS', 'ANSWER', 'OBSERVE', 'RECALL-REQ', 'ACK']);
export const ACTION_VERBS = new Set(['EXEC', 'WRITE', 'MINT', 'FIRE', 'RETIRE', 'COSIGN']);
export const CONTROL_VERBS = new Set(['HOLD']);
export function classOf(verb) {
  if (READ_VERBS.has(verb)) return 'READ';
  if (CONTROL_VERBS.has(verb)) return 'CONTROL';
  return 'ACTION'; // ACTION set OR anything unknown -> ACTION (fail-closed)
}

export function sha256hex(buf) { return createHash('sha256').update(buf).digest('hex'); }
export function sha16(s) { return createHash('sha256').update(s).digest('hex').slice(0, 16); }

// the HBP-row-injection guard: no field value may carry a delimiter OR any control char.
// bans | { } , all C0 controls (incl CR/LF/TAB/NUL), DEL, and the U+2028/U+2029 line/para separators.
const BAD = /[|{}\x00-\x1f\x7f\u2028\u2029]/;
export function clean(name, v) {
  const s = String(v);
  if (BAD.test(s)) throw new Error('FIELD_INJECTION_REJECT: field ' + name + ' contains a forbidden char ( | { } or a control/separator )');
  return s;
}

// FIXED field order — the canonical preimage + the parser both depend on it.
export const FIELD_ORDER = ['v', 'from', 'to', 'verb', 'seq', 'ts', 'pid', 'payload_sha256', 'hbi_off', 'len', 'token', 'antecedent', 'sig'];

// the canonical preimage the ed25519 sig (PHASE 4) will cover — binds origin+verb+seq+payload+antecedent (anti-replay).
export function sigPreimage(f) {
  return [f.from, f.to, f.verb, f.seq, f.ts, f.pid, f.payload_sha256, f.antecedent].join('|');
}

// the full row minus the trailing |row_hash=… . row_hash = sha16(prefix) → binds the sig field too.
export function rowPrefix(f) {
  return 'RELAY|' + FIELD_ORDER.map(k => k + '=' + clean(k, f[k])).join('|');
}

export function buildRow(f) {
  const filled = { token: '-', sig: '-', ...f }; // PHASE 1: sig stays '-' (sig is the PHASE-4 authenticator)
  for (const k of FIELD_ORDER) if (filled[k] === undefined || filled[k] === null) throw new Error('MISSING_FIELD: ' + k);
  const prefix = rowPrefix(filled);
  return prefix + '|row_hash=' + sha16(prefix);
}

export function parseRow(line) {
  const s = String(line).replace(/\n$/, '');
  if (/[\x00-\x1f\x7f\u2028\u2029]/.test(s)) throw new Error('PARSE_REJECT: control/separator char in row (injection guard)');
  if (!s.startsWith('RELAY|')) throw new Error('PARSE_REJECT: not a RELAY row');
  const at = s.indexOf('|row_hash=');
  if (at < 0) throw new Error('PARSE_REJECT: no row_hash');
  const prefix = s.slice(0, at);
  const row_hash = s.slice(at + '|row_hash='.length);
  const toks = prefix.split('|');
  if (toks[0] !== 'RELAY') throw new Error('PARSE_REJECT: bad header');
  const f = {};
  const keys = [];
  for (let i = 1; i < toks.length; i++) {
    const t = toks[i], eq = t.indexOf('=');
    if (eq < 0) throw new Error('PARSE_REJECT: bad token ' + t);
    const k = t.slice(0, eq);
    f[k] = t.slice(eq + 1); keys.push(k);
  }
  if (keys.length !== FIELD_ORDER.length) throw new Error('PARSE_REJECT: field count ' + keys.length + ' != ' + FIELD_ORDER.length);
  for (let i = 0; i < FIELD_ORDER.length; i++) if (keys[i] !== FIELD_ORDER[i]) throw new Error('PARSE_REJECT: field-order at ' + i + ' got ' + keys[i] + ' want ' + FIELD_ORDER[i]);
  f.row_hash = row_hash;
  f._prefix = prefix;
  return f;
}

// recompute row_hash from the parsed prefix (integrity check; authentication is PHASE-4 sig).
export function rowHashOk(f) { return sha16(f._prefix) === f.row_hash; }
