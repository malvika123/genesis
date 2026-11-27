const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const YD=+process.argv[2], seeds=process.argv[3].split(',').map(Number), DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=+(process.env.BA||0); f['dens-tau']=1; f['body-ledger']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:YD});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const rec=new Map(), done=new Map();
 for(const a of E.state().ag) if(a.sp===0) rec.set(a,{kc:[],bites:{}});
 for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag;
  if(t%E.DAY===0){ for(const [a,r] of rec){ if(!a.dead&&!a.gone&&a.kcalLast!==undefined) r.kc.push(Math.round(a.kcalLast)); } }
  for(const [a,r] of rec){ if((a.dead||a.gone)&&!done.has(a)){ done.set(a,a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other')); r.bites={...(a.feedN||{})}; } } }
 for(const [a,r] of rec){ if(!done.has(a)) r.bites={...(a.feedN||{})}; }
 const rows=[...rec.entries()].map(([a,r])=>({fate:done.get(a)||'alive',kc:r.kc,bites:r.bites}));
 console.log(JSON.stringify({seed,rows}));
}
