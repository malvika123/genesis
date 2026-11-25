const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['hom-avoid']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const Y=10, deaths=[...Array(Y)].map(()=>({})), births=Array(Y).fill(0), hy=Array(Y).fill(0), seen=new Set(), track=new Set(), born=new Set();
 for(const a of E.state().ag) if(a.sp===0) track.add(a), born.add(a);
 for(let t=1;t<=E.TY*Y;t++){ E.sim(); const y=Math.min(Y-1,Math.floor((t-1)/E.TY)); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead); hy[y]+=hom.length/E.TY;
  for(const a of ag) if(a.sp===0&&!track.has(a)){ track.add(a); if(!born.has(a)){born.add(a);births[y]++;} }
  for(const a of track){ if(a.dead&&!seen.has(a)){ seen.add(a); const c=(a.cause||'unknown').replace(/ \d.*$/,''); deaths[y][c]=(deaths[y][c]||0)+1; } } }
 console.log(JSON.stringify({seed,hy:hy.map(v=>+v.toFixed(1)),births,deaths}));
}
