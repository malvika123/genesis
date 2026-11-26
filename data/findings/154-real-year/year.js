const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const YD=+process.argv[2], seeds=process.argv[3].split(',').map(Number), DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:YD});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const seen=new Set(),track=new Set(),born=new Set(); const dead={}; let pd=0,births=0; for(const a of E.state().ag) if(a.sp===0){track.add(a);born.add(a);}
 const t0=Date.now();
 for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); pd+=hom.length/E.DAY;
  for(const a of ag) if(a.sp===0&&!track.has(a)){track.add(a); if(!born.has(a)){born.add(a);births++;}}
  for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); const c=a.dead?(a.cause||'unknown'):(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':a.age>a.lf?'old age':'other'); dead[c]=(dead[c]||0)+1; } } }
 console.log(JSON.stringify({yearDays:YD,seed,TY:E.TY,personDays:+pd.toFixed(0),dead,births,alive:E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone).length,secs:Math.round((Date.now()-t0)/1000)}));
}
