const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['hom-avoid']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const Y=8, R=[...Array(Y)].map(()=>({fd:0,preg:0,wait:0,tired:0,thin:0,old:0,other:0,ready:0,asleep:0,noMale:0,n:0}));
 for(let t=1;t<=E.TY*Y;t++){ E.sim(); if(t%8!==0) continue; const y=Math.min(Y-1,Math.floor((t-1)/E.TY)); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const males=hom.filter(a=>!a.sex&&a.age>=a.S.smat);
  for(const a of hom){ if(!a.sex||a.age<a.S.smat) continue; const r=R[y]; r.fd++;
   if(a.rd) r.ready++; else if(a.asleep) r.asleep++; else if(a.preg) r.preg++; else if(a.cd>0) r.wait++; else if(a.e<=45) r.tired++; else if(a.w<=40) r.thin++; else r.other++;
   if(!males.some(m=>Math.abs(m.x-a.x)<=3&&Math.abs(m.y-a.y)<=3)) r.noMale++; } }
 console.log(JSON.stringify({seed,R:R.map(r=>{const d=r.fd||1;const o={};for(const k of Object.keys(r))o[k]=k==='fd'?r.fd:+(r[k]/d).toFixed(2);return o})}));
}
