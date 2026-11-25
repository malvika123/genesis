const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['hom-avoid']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const out=[],seen=new Set(),track=new Set(); for(const a of E.state().ag) if(a.sp===0) track.add(a);
 for(let t=1;t<=E.TY*7;t++){ E.sim(); const ag=E.state().ag; for(const a of ag) if(a.sp===0) track.add(a);
  for(const a of track){ if(a.gone&&!a.dead&&!seen.has(a)&&a.hp<=0){ seen.add(a); out.push({yr:Math.floor((t-1)/E.TY)+1,age:+(a.age/E.TY).toFixed(1),young:a.age<a.S.mat,ev:(a.ev||[]).filter(Boolean).map(s=>String(s).slice(0,70)),up:!!a.up,asleep:!!a.asleep,painA:+(a.painA||0).toFixed(2),painW:+(a.painW||0).toFixed(2),cold:+(a.cold||0).toFixed(2),heat:+(a.heat||0).toFixed(2),wasW:!!a.wasW}); } } }
 console.log(JSON.stringify({seed,out}));
}
