import fs from 'node:fs';
import { createHash } from 'node:crypto';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
// CROSS-CUBE CATALOG-UNION MANIFEST (verified survivor proposal, cloud-cycle-002).
// Reproducible corpus-level referential-reuse receipt over the cubes/drive-ingest-*.hbp ingests.
// Read-only: parses existing cube receipts, unions cube10 content-addresses + verb-noun glyph-tuples,
// measures dedup + cross-doc reuse. No new store, no provider call. RECOMPUTE is byte-stable.
const DIR = 'C:/what-is-asolaria-reductions/cubes';
const files = fs.readdirSync(DIR).filter((f) => f.startsWith('drive-ingest-') && f.endsWith('.hbp')).sort();

const members = [];
const cube10seen = new Map();      // cube10 -> count (content-address dedup)
const glyphCatalogs = new Map();   // g<sha8> -> Set(slug)  (verb-noun tuple reuse across docs)
let rawSum = 0;

for (const f of files) {
  const txt = fs.readFileSync(`${DIR}/${f}`, 'utf8');
  const get = (re) => { const m = txt.match(re); return m ? m[1] : null; };
  const title = get(/INGESTHDR\|[^\n]*\|title=([^|]+)/);
  const cube10 = get(/INGESTCUBE\|cube10=([0-9a-f]+)/);
  const handle8 = get(/host_handle8=([0-9a-f]+)/);
  const raw = parseInt(get(/INGESTSLICE\|raw_bytes=(\d+)/) || '0', 10);
  const distinct = parseInt(get(/distinct_content_terms=(\d+)/) || '0', 10);
  const catLine = txt.match(/INGESTCATALOG\|[^\n]*sample_top10=([^|]+)/);
  const glyphs = [];
  if (catLine) for (const tok of catLine[1].trim().split(/\s+/)) { const g = tok.split(':').pop(); if (g && g.startsWith('g')) glyphs.push(g); }
  const slug = f.replace('drive-ingest-', '').replace('.hbp', '');
  members.push({ slug, title, cube10, handle8, raw, distinct, glyphs });
  rawSum += raw;
  cube10seen.set(cube10, (cube10seen.get(cube10) || 0) + 1);
  for (const g of glyphs) { if (!glyphCatalogs.has(g)) glyphCatalogs.set(g, new Set()); glyphCatalogs.get(g).add(slug); }
}

const totalMembers = members.length;
const distinctCube10 = cube10seen.size;
const dupCube10 = totalMembers - distinctCube10;
const totalDistinctGlyphs = glyphCatalogs.size;
const sharedGlyphs = [...glyphCatalogs.entries()].filter(([, s]) => s.size >= 2);
const reuseRatio = totalDistinctGlyphs ? (sharedGlyphs.length / totalDistinctGlyphs) : 0;
const dedupReduction = Math.round(rawSum / (distinctCube10 * 10));
const naiveReduction = Math.round(rawSum / (totalMembers * 10));

// Drive canon census (OBSERVED from the 2 search pages of folder 1xorgABBhPJvKzXpkb4vZFl1wsjkE_veb).
const CENSUS = [
  ['google-doc-natural-language', 4, 'SOURCE-01/02/03 + COLD-BACKUP-ACTIVATION-PROOF (ingestible)'],
  ['readable-md-txt-py', 18, 'v24-DESIGN/AUDIT, v23-README, MORNING-BRIEF, 13x wave-report, ABSORB-4, v9-pid-voxels, staging-helper.py'],
  ['encoded-canon-hbp', 56, 'bigpickle-*, absorption-wave ABSORB-1..10, sovlinux-*, federation/gemini/google-cloud/antigravity/profile-index/session-slice/v24-DESIGN.hbp (ALREADY cubes)'],
  ['sidecar-hex', 30, '.hex encodings of the .hbp canon (trinity)'],
  ['sidecar-hbi', 30, '.hbi HBP-index of the .hbp canon (trinity)'],
  ['sidecar-sha256', 31, '.sha256 attestations of the .hbp canon (trinity)'],
];
const censusTotal = CENSUS.reduce((a, [, n]) => a + n, 0);

const rows = [];
rows.push(`MANIFESTHDR|proof=CROSS-CUBE-CATALOG-UNION|cycle=CLOUD-CYCLE-002|form=hbp-tuple|schema=asolaria.cube_manifest.v1|members=${totalMembers}|held_safe=read-only+referential|json=0`);
for (const m of members) rows.push(`MANIFESTMEMBER|slug=${m.slug}|title=${m.title}|cube10=${m.cube10}|handle8=${m.handle8}|raw_bytes=${m.raw}|distinct_terms=${m.distinct}|sample_glyphs=${m.glyphs.length}|json=0`);
rows.push(`MANIFESTDEDUP|total_members=${totalMembers}|distinct_cube10=${distinctCube10}|duplicate_content_addresses_collapsed=${dupCube10}|note=content-address-dedup-over-full-doc-sha|json=0`);
rows.push(`MANIFESTREUSE|scope=sampled-top10-catalogs|total_distinct_glyph_tuples=${totalDistinctGlyphs}|shared_across>=2_docs=${sharedGlyphs.length}|reuse_ratio=${reuseRatio.toFixed(4)}|note=verb-noun-tuple-reuse-is-the-measured-quantity|json=0`);
rows.push(`MANIFESTREUSETOP|shared_glyphs=${sharedGlyphs.sort((a, b) => b[1].size - a[1].size).slice(0, 12).map(([g, s]) => `${g}:${s.size}`).join(' ')}|json=0`);
rows.push(`MANIFESTREDUCTION|corpus_raw_bytes=${rawSum}|distinct_cube10x10B=${distinctCube10 * 10}|dedup_referential_reduction=${dedupReduction}x|naive_per_doc_reduction=${naiveReduction}x|note=dedup<=naive-because-content-addresses-collapse|json=0`);
for (const [cat, n, desc] of CENSUS) rows.push(`MANIFESTCENSUS|category=${cat}|count=${n}|detail=${desc}|json=0`);
rows.push(`MANIFESTCENSUSTOTAL|drive_canon_files_observed=${censusTotal}|folder=1xorgABBhPJvKzXpkb4vZFl1wsjkE_veb|source=2-search-pages|ingested-this-cycle=8-of-readable|encoded-canon=already-cubes-referenced-not-reingested|json=0`);
const body = rows.join('\n') + '\n';
const bad = body.split('\n').filter(Boolean).filter((r) => /[{}\r]/.test(r) || !r.endsWith('|json=0'));
if (bad.length) { console.error('SELF-CHECK FAIL', bad.slice(0, 3)); process.exit(1); }
const out = body + `MANIFESTFTR|sha256=${sha(body)}|rows=${rows.length}|recompute=node cubes/emit-cube-manifest.mjs|verdict=CORPUS-REUSE-MEASURED-REPRODUCIBLE|json=0\n`;
fs.writeFileSync(`${DIR}/cube-manifest.hbp`, out);
process.stdout.write(out);
