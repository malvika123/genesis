const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['hom-avoid']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});E.startLog();
 let herb=0,hunt=0,hom=0,days=0;
 for(let t=1;t<=E.TY*3;t++){ E.sim(); if(t%E.DAY===0){ const ag=E.state().ag; const hs=ag.filter(a=>a.sp===0&&!a.dead); if(!hs.length)break; const near=(o)=>hs.some(p=>Math.abs(p.x-o.x)<=18&&Math.abs(p.y-o.y)<=18); days++; for(const o of ag){ if(o.dead||o.gone)continue; if(o.sp===1&&near(o)) herb++; if(o.sp===2&&near(o)) hunt++; } hom+=hs.length; } }
 const L=E.huntLog().filter(h=>h.k!==undefined); const by={}; for(const h of L){ if(!['Leopard','Hyena','Giant hyena','Dinofelis','Homotherium','Sabre-tooth'].includes(h.k))continue; const p=h.prey; by[p]=by[p]||{att:0,hit:0}; by[p].att++; if(h.hit)by[p].hit++; }
 console.log(JSON.stringify({seed,days,meanHerbivoresNear:+(herb/days).toFixed(0),meanHuntersNear:+(hunt/days).toFixed(0),meanHominins:+(hom/days).toFixed(1),attacksByPrey:by}));
}
