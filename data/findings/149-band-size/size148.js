const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const arm=process.argv[2], seeds=process.argv[3].split(',').map(Number), PEOPLE=+(process.argv[4]||25); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['valley-prey-scale']=true; f['people']=PEOPLE; const S=X.fromArgs(f); const W=200,Hh=240,R=18;
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});E.startLog();
 const Y=5, dead={}, seen=new Set(), track=new Set(); for(const a of E.state().ag) if(a.sp===0) track.add(a);
 const samp={pd:0,kgSum:0,eSum:0,hn:0,days:0,kgDay1:0,herdN:0}; let day1=null;
 for(let t=1;t<=E.TY*Y;t++){ E.sim(); const ag=E.state().ag; for(const a of ag) if(a.sp===0) track.add(a);
  for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); const c=a.dead?(a.cause||'unknown'):(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':a.age>a.lf?'old age':'other'); dead[c]=(dead[c]||0)+1; } }
  if(t%E.DAY===0){ const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); if(!hom.length) continue; samp.pd+=hom.length; const mark=new Uint8Array(W*Hh); for(const p of hom) for(let yy=Math.max(0,p.y-R);yy<=Math.min(Hh-1,p.y+R);yy++) for(let xx=Math.max(0,p.x-R);xx<=Math.min(W-1,p.x+R);xx++) mark[yy*W+xx]=1; let sq=0; for(let i=0;i<mark.length;i++) sq+=mark[i]; const km2=sq*0.0625; let kg=0,hn=0,es=0; for(const o of ag){ if(o.dead||o.gone||!mark[o.y*W+o.x]) continue; if(o.sp===1) kg+=(o.S.mass||0)*(o.head||1); if(o.sp===2){hn++; es+=o.e;} }
   samp.kgSum+=kg/km2; samp.hn+=hn; samp.eSum+=es; samp.days++; if(t===E.DAY) day1=Math.round(kg/km2); } }
 const L=E.huntLog(); const att={hom:0,other:0}; for(const h of L){ if(!['Leopard','Hyena','Giant hyena','Dinofelis','Homotherium','Sabre-tooth'].includes(h.k)) continue; if(h.prey==='Hominin') att.hom++; else att.other++; }
 console.log(JSON.stringify({arm,PEOPLE,seed,personDays:Math.round(samp.pd||0),alive:E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone).length,dead,day1KgPerKm2:day1,meanKgPerKm2:Math.round(samp.kgSum/samp.days),meanHunterE:+(samp.eSum/Math.max(1,samp.hn)).toFixed(1),attacks:att}));
}
