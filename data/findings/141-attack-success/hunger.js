const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const yrs=[0,1,2,3,4].map(()=>({hy:0,tries:0,hunterDays:0,eSum:0,gutSum:0,hungryN:0,kills:0}));
 const seen=new Set(),track=new Set();
 for(let t=1;t<=E.TY*5;t++){ E.sim(); const y=Math.min(4,Math.floor((t-1)/E.TY)); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead); if(!hom.length)break; yrs[y].hy+=hom.length/E.TY;
  for(const a of hom) track.add(a);
  for(const h of ag){ if(h.sp===2&&!h.dead&&h.kcd===4&&hom.some(p=>Math.abs(p.x-h.x)<=1&&Math.abs(p.y-h.y)<=1)) yrs[y].tries++; }
  for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); if(a.cause==='killed by a predator') yrs[y].kills++; } }
  if(t%E.DAY===0){ for(const h of ag){ if(h.sp===2&&!h.dead&&hom.some(p=>Math.abs(p.x-h.x)<=18&&Math.abs(p.y-h.y)<=18)){ yrs[y].hunterDays++; yrs[y].eSum+=h.e; yrs[y].gutSum+=(h.gut||0); if(h.e<50) yrs[y].hungryN++; } } } }
 console.log(JSON.stringify({seed,yrs:yrs.map(r=>({hy:+r.hy.toFixed(1),tries:r.tries,kills:r.kills,hit:r.tries?+(r.kills/r.tries).toFixed(2):null,meanE:+(r.eSum/Math.max(1,r.hunterDays)).toFixed(1),meanGut:+(r.gutSum/Math.max(1,r.hunterDays)).toFixed(2),hungryShare:+(r.hungryN/Math.max(1,r.hunterDays)).toFixed(2)}))}));
}
