// relay-carveout.mjs — carve-out guard for the EMIT path. PHASE 1 (E=0).
// TWO layers, per OMNISHANNON's verified findings:
//   (1) assertReadAllowed = the STRUCTURAL guard. CANONICALIZES the path (realpath collapses NTFS 8.3 short names,
//       trailing dot/space, and symlinks) and rejects NTFS ADS/$-stream syntax, THEN matches the carve-out denylist and
//       prefers an allowlist-descendant check. Wired into emit() for any file-sourced payload — a leak then requires the
//       AUTHOR to paste, not the driver to harvest. (Closes the 8.3 / ::$INDEX_ALLOCATION / trailing-dot bypasses.)
//   (2) scan = best-effort content defense-in-depth (regex/fingerprint). NEVER relied on alone.
// The patterns below are DETECTION patterns, not secrets.
import { resolve, dirname, sep } from 'node:path';
import { realpathSync, existsSync } from 'node:fs';

const RP = realpathSync.native || realpathSync;

const PATTERNS = [
  [/-----BEGIN [A-Z2 ]*PRIVATE KEY-----/, 'pem-private-key-header'],
  [/-----BEGIN OPENSSH PRIVATE KEY-----/, 'openssh-private-key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'aws-access-key-id'],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}\b/, 'github-token'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, 'slack-token'],
  [/ssh-(rsa|ed25519) AAAA[0-9A-Za-z+/]{40,}/, 'ssh-pubkey-material'],
  [/\bCHARM_[A-Z0-9_]{4,}\b/, 'charm-secret-marker'],
  [/\bbeast-keys?\b/i, 'beast-keys-marker'],
  [/decrypted[-_]?vault/i, 'decrypted-vault-marker'],
  [/"?private_key"?\s*[:=]/i, 'private_key-field'],
  [/\b(api[_-]?key|secret|password|passwd|bearer)\b\s*[:=]\s*\S{8,}/i, 'secret-assignment'],
];

// carve-out dirs the EMIT path must NEVER read a payload from (matched on the CANONICAL forward-slashed path).
const DENY_DIR_RE = /\/(\.ssh|\.gnupg|vault|sovereignty-vault|decrypted[-_]?vault|beast-keys|keys?|secrets?|credentials?)(\/|$)/i;

export function scan(buf) {
  const text = Buffer.isBuffer(buf) ? buf.toString('latin1') : String(buf);
  const reasons = [];
  for (const [re, tag] of PATTERNS) if (re.test(text)) reasons.push(tag);
  return { hit: reasons.length > 0, reasons };
}

// canonicalize: realpath the nearest EXISTING ancestor (collapses 8.3 short names, trailing dot/space, symlinks),
// then re-append the non-existent tail with each component's trailing dots/spaces stripped (Win32 strips them on open).
function canonicalize(abs) {
  let cur = abs; const tail = [];
  while (cur && !existsSync(cur)) {
    const parent = dirname(cur);
    if (parent === cur) break;
    tail.unshift(cur.slice(parent.length + 1));
    cur = parent;
  }
  let base = cur;
  try { if (existsSync(cur)) base = RP(cur); } catch { base = cur; }
  const normTail = tail.map(c => c.replace(/[. ]+$/, ''));
  return [base, ...normTail].join(sep);
}

// STRUCTURAL guard: refuse to load a payload from a carve-out path or outside the allow-root.
export function assertReadAllowed(srcPath, allowRoot) {
  const abs = resolve(srcPath);
  // 1) reject NTFS alternate-data-stream / $-stream syntax (a ':' past the drive letter, or a $-stream component, or 8.3 alias)
  const afterDrive = abs.replace(/^[A-Za-z]:/, '');
  if (afterDrive.includes(':')) throw new Error('CARVEOUT_PATH_DENY: NTFS stream/ADS syntax not allowed: ' + abs);
  for (const comp of afterDrive.split(/[\\/]/)) {
    if (/\$[A-Za-z_]/.test(comp)) throw new Error('CARVEOUT_PATH_DENY: NTFS $-stream component not allowed: ' + abs);
    if (/~\d+$/.test(comp)) throw new Error('CARVEOUT_PATH_DENY: 8.3 short-name alias not allowed: ' + abs);
  }
  // 2) canonicalize, then match the carve-out denylist on the canonical forward-slashed path
  const canon = canonicalize(abs).replace(/\\/g, '/');
  if (DENY_DIR_RE.test(canon + '/')) throw new Error('CARVEOUT_PATH_DENY: EMIT may not read carve-out dir: ' + abs + ' (canonical: ' + canon + ')');
  // 3) allowlist (preferred): require the canonical path to be the allow-root or a descendant of it
  if (allowRoot) {
    const root = canonicalize(resolve(allowRoot));
    const a = canonicalize(abs);
    if (a !== root && !a.startsWith(root + sep)) throw new Error('ALLOWLIST_DENY: EMIT path outside allow-root: ' + abs);
  }
  return abs;
}
