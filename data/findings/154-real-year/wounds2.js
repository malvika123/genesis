const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const seen=new Set(),track=new Set(),out=[]; for(const a of E.state().ag) if(a.sp===0) track.add(a);
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag; for(const a of ag) if(a.sp===0) track.add(a);
 for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); const c=a.dead?(a.cause||'unknown'):(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':a.age>a.lf?'old age':'other'); out.push({day:+(t/E.DAY).toFixed(0),c,ageY:+(a.age/E.TY).toFixed(1),e:Math.round(a.e),w:Math.round(a.w),hp:Math.round(a.hp),ev:(a.ev||[]).filter(Boolean).map(s=>String(s).slice(0,60)).slice(0,5)}); } } 
 if(t%(E.DAY*20)===0){ const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); out.push({snap:t/E.DAY,n:hom.length,meanE:Math.round(hom.reduce((s,a)=>s+a.e,0)/Math.max(1,hom.length)),meanHp:Math.round(hom.reduce((s,a)=>s+a.hp,0)/Math.max(1,hom.length))}); } }
console.log(JSON.stringify({seed,out}));
