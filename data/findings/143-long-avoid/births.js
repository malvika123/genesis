const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['hom-avoid']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const Y=10, snaps=[], preg=Array(Y).fill(0), seenP=new Set(), kd=[...Array(Y)].map(()=>({fAd:0,fYoung:0,m:0,kid:0})), seenD=new Set(), track=new Set();
 for(const a of E.state().ag) if(a.sp===0) track.add(a);
 for(let t=1;t<=E.TY*Y;t++){ E.sim(); const y=Math.min(Y-1,Math.floor((t-1)/E.TY)); const ag=E.state().ag;
  for(const a of ag) if(a.sp===0) track.add(a);
  for(const a of ag) if(a.sp===0&&a.preg&&!seenP.has(a.preg)){ seenP.add(a.preg); preg[y]++; }
  for(const a of track){ if(a.dead&&!seenD.has(a)&&a.cause==='killed by a predator'){ seenD.add(a); const ad=a.age>=a.S.smat; if(a.sex&&ad) kd[y].fAd++; else if(a.sex) kd[y].fYoung++; else if(ad) kd[y].m++; else kd[y].kid++; } }
  if((t%E.TY)===0){ const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const fa=hom.filter(a=>a.sex&&a.age>=a.S.smat); snaps.push({y:y+1,n:hom.length,adF:fa.length,adM:hom.filter(a=>!a.sex&&a.age>=a.S.smat).length,young:hom.filter(a=>a.age<a.S.smat).length,rd:fa.filter(a=>a.rd).length,pregnant:fa.filter(a=>a.preg).length,nursing:fa.filter(a=>!a.preg&&a.cd>0).length,asleepShare:+(hom.filter(a=>a.asleep).length/Math.max(1,hom.length)).toFixed(2),meanE:+(hom.reduce((s,a)=>s+a.e,0)/Math.max(1,hom.length)).toFixed(0)}); } }
 console.log(JSON.stringify({seed,snaps,newPregnancies:preg,predatorDeathsBySexAge:kd}));
}
