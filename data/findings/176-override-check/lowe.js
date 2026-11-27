const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3], SV=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; if(SV) f['starve']=SV; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200; let low=0,lowOn=0,lowOnEat=0,lowOffEat=0,lowAsleep=0;
for(let t=1;t<=E.DAY*DAYS;t++){ const st0=E.state(); const pre=[]; for(const a of st0.ag){ if(a.sp===0&&!a.dead&&!a.gone&&a.e<30&&a.x>=0&&a.x<W&&a.y>=0&&a.y<240){ const i=a.y*W+a.x; pre.push([a,i]); } }
 E.sim(); const st=E.state(); for(const [a,i] of pre){ low++; if(a.asleep){lowAsleep++;continue;} const ok=(st.fruit[i]>0.05||st.ROOT[i]>0.05||(st.TERM&&st.TERM[i]>0.05))&&!st.water[i]&&!st.poison[i]; if(ok){lowOn++; if(a.act===9) lowOnEat++;} else if(a.act===9) lowOffEat++; } }
console.log(JSON.stringify({seed,SV,lowSteps:low,asleep:lowAsleep,onEdible:lowOn,eatOnEdible:lowOnEat,eatOffEdible:lowOffEat}));
