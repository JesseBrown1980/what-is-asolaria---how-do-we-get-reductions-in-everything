import { createHash } from 'node:crypto';
import fs from 'node:fs';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
// GOOGLE-CLOUD STATION<->JOB MAP (cubed). Binds the 17 ALREADY-REGISTERED google/cloud seats to
// their job + cron-driver + held-safe gate + per-16-level governance chain. Descriptor-first:
// attaches existing seats to existing automation machinery; mints NO live process; auto_fire=false.
// Owners (fabric CONVERGE i9s6og/4hkhk5): omnischeduler_pid_cron (cron), MCP_OS_GATE + LIVEFREE.ACTION.GATE
// (gate), behcs1024_prism chain (cube), law001_authority_kernel (registration).

const SEATS = [
  // name | pid | current_level | job | activation
  ['google-drive-bridge','46ea8e873e993ec8','supervisor','JOB-CLOUD-INGEST+COLD-BACKUP (Drive<->cubes)','gated:rclone+ADC'],
  ['google-cloud-storage-bridge','4d19d8b37ab64263','supervisor','JOB-CLOUD-OBJECT-STORE (cold)','gated:ADC'],
  ['google-apis-gateway','f44d19c6b55d613d','supervisor','JOB-CLOUD-API-ROUTER (umbrella)','gated:oauth'],
  ['gemini-api-bridge','830296af20c0b142','supervisor','JOB-CLOUD-PROPOSE (gemini improvements)','gated:api-key-or-vertex'],
  ['vertex-ai-bridge','70d0a5c3b24f1c8e','supervisor','JOB-CLOUD-PROPOSE (vertex)','gated:ADC+project'],
  ['notebooklm-L0','f44fcd9319049573','supervisor','JOB-CLOUD-CURATE-L0','gated:no-public-write-api'],
  ['notebooklm-L1','a9cbd4ac5a3b8543','supervisor','JOB-CLOUD-CURATE-L1','gated:no-public-write-api'],
  ['notebooklm-L2','55360a8d3896edee','supervisor','JOB-CLOUD-CURATE-L2','gated:no-public-write-api'],
  ['notebooklm-L3','fb0859109fb965f5','supervisor','JOB-CLOUD-CURATE-L3','gated:no-public-write-api'],
  ['notebooklm-L4','d4bb8196d241e076','supervisor','JOB-CLOUD-CURATE-L4','gated:no-public-write-api'],
  ['notebooklm-L5','d15451fc91e13bc1','supervisor','JOB-CLOUD-CURATE-L5','gated:no-public-write-api'],
  ['notebooklm-enterprise-bridge','f4040b14cefd1b83','supervisor','JOB-CLOUD-CURATE-ENTERPRISE','gated:enterprise'],
  ['AGT-L3-NEURO100B-CLOUD','d0f6e6ff8e03a250','sup-L3','JOB-CLOUD-NEURO-RUN (L3 executor)','gated:operator-emit'],
  ['PROF-ROOK','3aae88af9d42f051','prof-supervisor','JOB-CLOUD-STORAGE-ROUTER (38TB Drive prof, governs the bridges)','gated:rclone+ADC'],
  ['SUBSTRATE-GOOGLE-AI-ULTRA-35TB-PLASMATOID','41a7a82fa584ef3a','cloud-substrate','STATION: 35TB cold substrate root (bridges write here)','gated:auth'],
  ['PLANB-CORPUS-GENOME-226PDF','01d87b3423547d48','corpus','STATION: cloud corpus (35 local / 191 cloud)','read-now-via-MCP'],
];
// the genuine gap: cloud-cycle JOB-seats not yet registered (attach the seats above to cron+gate)
const NEW_JOBS = [
  ['JOB-CLOUD-INGEST','binds google-drive-bridge+notebooklm+corpus -> Drive/doc -> cube/catalog (read-only)','no-gate(read-only)'],
  ['JOB-CLOUD-PROPOSE','binds gemini-api-bridge+vertex-ai-bridge -> improvement proposals into self-update gate','ACTION_GATE'],
  ['JOB-CLOUD-CURATE','binds notebooklm-L0..L5 -> long-form knowledge synthesis (read/curate)','no-gate(read)'],
  ['JOB-CLOUD-COLD-BACKUP','binds google-drive-bridge+google-cloud-storage-bridge -> cubes -> 35TB Drive','ACTION_GATE+rclone'],
  ['JOB-CLOUD-CRON-DRIVER','binds all above to omnischeduler_pid_cron; auto_fire=false; tick=scan+propose only','ACTION_GATE+operator-emit'],
];

const rows = [];
rows.push('GCSTATIONHDR|map=GOOGLE-CLOUD-STATION-JOB-MAP|form=hbp-tuple|seats_existing=16|new_job_seats=5|owners=omnischeduler_pid_cron+MCP_OS_GATE+LIVEFREE.ACTION.GATE+behcs1024_prism+law001_authority|fabric_verdict=CONVERGE(i9s6og)|held_safe=auto_fire-false|json=0');
rows.push('GCSTATIONLEVELS|cloud_domain_governed_top_to_bottom=meta-L0(generic)->operator-L1(generic)->gac-L2(generic)->L3:AGT-L3-NEURO100B-CLOUD->prof:PROF-ROOK->supervisor:bridges+notebooklm-L0..L5->cloud-substrate:35TB|notebooklm_explicit_levels=L0..L5|higher_tiers=govern-generically-no-dedicated-seat-needed|json=0');
for (const [n, pid, lvl, job, act] of SEATS) rows.push(`GCSEAT|name=${n}|pid=${pid}|level=${lvl}|job=${job}|status=REGISTERED-CANONICAL|activation=${act}|json=0`);
for (const [j, binds, gate] of NEW_JOBS) rows.push(`GCNEWJOB|job=${j}|binds=${binds}|gate=${gate}|status=TO-REGISTER-held-safe|auto_fire=false|json=0`);
rows.push('GCCUBE|formalization=each-seat-g1024-glyphed+hilbert-addressed+PID(cubed+mapped); job-map adds station<->job binding (cube-cube-cubed: seat-cube x job-cube x cron-cube)|owner=behcs1024_prism|json=0');
rows.push('GCREGISTER|process=emit-5-new-job-seats-to-fabric-registration-lane(law001_authority)|NOT-hand-edit-office-ledger|promotion=operator-gated|existing-17-seats=NO-reregister|json=0');
rows.push('GCBOUNDARY|made=YES|cubed=YES|mapped=YES|registered=YES(17 seats)|gap=job-binding+activation-auth|activation=held-safe-operator-emit|no-self-fire|raw-creds-never-in-rows|json=0');
const body = rows.join('\n') + '\n';
const bad = body.split('\n').filter(Boolean).filter((r) => /[{}\r]/.test(r) || !r.endsWith('|json=0'));
if (bad.length) { console.error('SELF-CHECK FAIL', bad.slice(0,3)); process.exit(1); }
const out = body + `GCSTATIONFTR|sha256=${sha(body)}|rows=${rows.length}|verdict=CLOUD-SEATS-MADE+CUBED+MAPPED+REGISTERED;GAP=job-binding+activation(held-safe)|json=0\n`;
fs.writeFileSync('C:/what-is-asolaria-reductions/cubes/google-cloud-station-job-map.hbp', out);
process.stdout.write(out);
