const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['hom-avoid']=true; f['dens-tau']=1; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const out=[],seen=new Set(),track=new Set();
 for(let t=1;t<=E.TY*5;t++){ E.sim(); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead); if(!hom.length)break;
  for(const a of ag) if(a.sp===0) track.add(a);
  for(const a of track){ if(a.dead&&!seen.has(a)){ seen.add(a); if(a.cause==='killed by a predator'){ const mate=hom.filter(p=>Math.abs(p.x-a.x)<=2&&Math.abs(p.y-a.y)<=2).length; out.push({yr:Math.floor((t-1)/E.TY)+1,asleep:!!a.asleep,child:a.age<a.S.mat*a.S.wn,up:!!a.up,near:mate,by:a.killedBy,hr:Math.floor(((t%E.DAY)/E.DAY)*24)}); } } } }
 console.log(JSON.stringify({seed,out}));
}
