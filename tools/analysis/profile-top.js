// Genesis — the functions that take the most computing in a CPU profile (research log entry 43).
// Usage: node --cpu-prof --cpu-prof-dir=prof tools/analysis/profile-run.js SEED DAYS; then node tools/analysis/profile-top.js prof/<file>.cpuprofile [N]
// Copyright (c) 2026 Malvika Sen. MIT License.
const p=JSON.parse(require('fs').readFileSync(process.argv[2]));const byId=new Map(p.nodes.map(n=>[n.id,n]));
const self=new Map();const dt=p.timeDeltas;const tot=dt.reduce((a,b)=>a+b,0);
p.samples.forEach((id,i)=>{const n=byId.get(id);const cf=n.callFrame;const k=(cf.functionName||'(anon)')+' @'+(cf.url.split('/').pop()||'?')+':'+(cf.lineNumber+1);self.set(k,(self.get(k)||0)+(dt[i]||0))});
const arr=[...self.entries()].sort((a,b)=>b[1]-a[1]).slice(0,+process.argv[3]||20);
for(const [k,v] of arr)console.log((100*v/tot).toFixed(1).padStart(5)+'%  '+k);
