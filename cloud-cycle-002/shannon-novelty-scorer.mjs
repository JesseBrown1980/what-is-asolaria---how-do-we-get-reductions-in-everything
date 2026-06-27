// shannon-novelty-scorer.mjs — READ-ONLY Stage-5 SHANNON_NOVELTY preview scorer.
// cloud-cycle-002 verified survivor (engine-gap lens; council CONVERGED 2/251; 0 refuted, 3/3 low-risk).
//
// HELD-SAFE / STAGED: this is the read-only PREVIEW. It is NOT wired into the live loop tick —
// registering it into the tick is the operator-gated APPLY step. As written it is a pure function:
// it consumes the pending queue already fetched by the tick and ANNOTATES each envelope's
// review.shannon block ONLY. It never sets auto_fire_allowed (always false), never mints, never
// routes, never writes the bus/Drive/disk. It imports no writer module.
//
// Why: live state shows review.shannon carries keys=2 (placeholder) while review.gnn carries keys=4;
// the novelty/dedup signal already exists upstream (duplicate_key, behcs1024.glyph, evidence.novelty)
// but is unconsumed. This turns a no-op stage into a real discriminator over the near-duplicate flood.
import { createHash } from 'node:crypto';

export function scorePending(pending) {
  const list = Array.isArray(pending) ? pending : [];
  const total = list.length || 1;
  const keyOf = (e) => e.duplicate_key
    || (e.behcs1024 && e.behcs1024.glyph ? String(e.behcs1024.glyph).slice(0, 6) : 'nokey');
  const cohort = new Map();
  for (const e of list) { const k = keyOf(e); cohort.set(k, (cohort.get(k) || 0) + 1); }
  const dupFloor = Math.max(3, total * 0.4);
  const out = [];
  for (const e of list) {
    const k = keyOf(e);
    const c = cohort.get(k) || 1;
    const shannon_bits = +(-Math.log2(c / total)).toFixed(4);
    const redundancy_ratio = +(1 - 1 / c).toFixed(4);
    const upstream = e.evidence && e.evidence.novelty ? 1 : 0;
    const novelty_class = c === 1 ? 'NEW' : (c >= dupFloor ? 'DUP' : 'SEEN');
    const basis = ['duplicate_key', e.behcs1024 ? 'glyph_prefix' : null, upstream ? 'upstream_novelty' : null].filter(Boolean);
    out.push({
      id: e.id || null,
      review_shannon: {
        shannon_bits, novelty_class, redundancy_ratio,
        cohort_size: c, total_window: total, basis,
        source: 'sampled-window', auto_fire_allowed: false,
      },
    });
  }
  return out;
}

// Deterministic self-test on a synthetic fixture (mirrors the observed near-duplicate EVT-MINT flood
// vs distinct reverse-walk-selftest envelopes). Read-only invariants asserted.
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('shannon-novelty-scorer.mjs')) {
  const fixture = [
    { id: 'A', duplicate_key: 'MINT_0', behcs1024: { glyph: '077410' } },
    { id: 'B', duplicate_key: 'MINT_0', behcs1024: { glyph: '13CC1C' } },
    { id: 'C', duplicate_key: 'MINT_0', behcs1024: { glyph: 'FBADA6' } },
    { id: 'D', duplicate_key: 'ARES_RW_A', behcs1024: { glyph: '9A1122' }, evidence: { novelty: { x: 1 } } },
  ];
  const r = scorePending(fixture);
  const dup = r.filter((x) => x.review_shannon.novelty_class === 'DUP').length;
  const fresh = r.filter((x) => x.review_shannon.novelty_class === 'NEW').length;
  const allGated = r.every((x) => x.review_shannon.auto_fire_allowed === false);
  const r2 = scorePending(fixture);
  const idempotent = createHash('sha256').update(JSON.stringify(r)).digest('hex')
    === createHash('sha256').update(JSON.stringify(r2)).digest('hex');
  console.log(JSON.stringify({ test: 'shannon-novelty-scorer', dup_count: dup, new_count: fresh, all_auto_fire_gated: allGated, idempotent, result: r }, null, 1));
  if (!allGated) { console.error('FAIL: auto_fire_allowed not held false'); process.exit(1); }
  if (!idempotent) { console.error('FAIL: not idempotent'); process.exit(1); }
  if (dup !== 3 || fresh !== 1) { console.error('FAIL: classifier expected 3 DUP / 1 NEW'); process.exit(1); }
  console.error('SELF-TEST PASS: 3 DUP / 1 NEW, all gated, idempotent');
}
