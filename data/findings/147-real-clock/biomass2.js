const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seeds=process.argv[2].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f); const W=200,Hh=240,R=18;
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const rows=[];
 for(let t=1;t<=E.DAY*3;t++){ E.sim(); if(t%E.DAY!==0) continue; const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const mark=new Uint8Array(W*Hh); for(const p of hom) for(let yy=Math.max(0,p.y-R);yy<=Math.min(Hh-1,p.y+R);yy++) for(let xx=Math.max(0,p.x-R);xx<=Math.min(W-1,p.x+R);xx++) mark[yy*W+xx]=1; let sq=0; for(let i=0;i<mark.length;i++) sq+=mark[i]; const km2=sq*0.0625;
  let n=0,kg=0,hn=0,hkg=0; const by={}; for(const o of ag){ if(o.dead||o.gone||!mark[o.y*W+o.x]) continue; if(o.sp===1){ const hd=o.head||1; n+=hd; kg+=(o.S.mass||0)*hd; by[o.S.n]=(by[o.S.n]||0)+hd; } if(o.sp===2){ hn++; hkg+=o.S.mass||0; } }
  rows.push({day:t/E.DAY,km2,herbN:n,herbPerKm2:+(n/km2).toFixed(2),herbKgPerKm2:Math.round(kg/km2),hunters:hn,huntersPer100km2:+(hn/km2*100).toFixed(1),hunterKgPerKm2:+(hkg/km2).toFixed(0),by}); }
 console.log(JSON.stringify({seed,rows}));
}
