const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const mult=+process.argv[2], tau=+process.argv[3], seeds=process.argv[4].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['hom-avoid']=true; f['dens-tau']=tau; const S=X.fromArgs(f); const W=200,Hh=240,R=18;
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const yrs=[0,1,2,3,4,5,6,7,8,9].map(()=>({hy:0,kills:0,tries:0,n:0,hunters:0,km2:0})); const seen=new Set(), track=new Set();
 for(let t=1;t<=E.TY*10;t++){ E.sim(); const y=Math.min(9,Math.floor((t-1)/E.TY)); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead); if(!hom.length)break; yrs[y].hy+=hom.length/E.TY;
  for(const a of hom) track.add(a);
  for(const h of ag){ if(h.sp===2&&!h.dead&&h.kcd===4&&hom.some(p=>Math.abs(p.x-h.x)<=1&&Math.abs(p.y-h.y)<=1)) yrs[y].tries++; }
  for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); if(a.cause==='killed by a predator') yrs[y].kills++; } }
  if(t%E.DAY===0){ const mark=new Uint8Array(W*Hh); for(const p of hom) for(let yy=Math.max(0,p.y-R);yy<=Math.min(Hh-1,p.y+R);yy++) for(let xx=Math.max(0,p.x-R);xx<=Math.min(W-1,p.x+R);xx++) mark[yy*W+xx]=1; let sq=0; for(let i=0;i<mark.length;i++) sq+=mark[i]; let hs=0; for(const h of ag) if(h.sp===2&&!h.dead&&mark[h.y*W+h.x]) hs++; yrs[y].n++; yrs[y].hunters+=hs; yrs[y].km2+=sq*0.0625; } }
 console.log(JSON.stringify({mult,tau,seed,aliveEnd:E.state().ag.filter(a=>a.sp===0&&!a.dead).length,yrs}));
}
