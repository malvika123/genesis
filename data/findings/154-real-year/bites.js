const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const prev=new Map(), bites=new Map(), seen=new Set(), res=[]; let pois=0;
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag;
 for(const a of ag){ if(a.sp!==0) continue; const p=prev.get(a); if(p!==undefined && p-a.hp>=20 && p-a.hp<=24){ const b=bites.get(a)||[]; b.push(t); bites.set(a,b); }
  prev.set(a,a.hp);
  if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); const b=bites.get(a)||[]; res.push({day:Math.round(t/E.DAY),hp:Math.round(a.hp),bites:b.length,steps:b.map(x=>t-x),cause:a.dead?a.cause:(a.hp<=0?'wounds':a.e<=0?'hunger':'other')}); } } }
const allBit=[...bites.entries()].map(([a,b])=>b.length);
console.log(JSON.stringify({seed,people_bitten:allBit.length,bite_counts:allBit,deaths:res.filter(r=>r.cause==='wounds')}));
