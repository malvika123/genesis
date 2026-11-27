const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const days=new Map(), cur=new Map(), done=new Set(); const out=[];
const grp=a=>a<=7?0:a===8?1:a===9?2:a===11?3:a===12?4:a===14?5:6;
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag;
 for(const a of ag){ if(a.sp!==0) continue; let c=cur.get(a); if(!c){c=[0,0,0,0,0,0,0];cur.set(a,c);} c[grp(a.act)]++; }
 if(t%E.DAY===0){ for(const a of ag){ if(a.sp!==0||a.dead||a.gone) continue; const c=cur.get(a)||[0,0,0,0,0,0,0]; let d=days.get(a); if(!d){d=[];days.set(a,d);} d.push({acts:c.map(x=>+(x/E.DAY).toFixed(2)),e:Math.round(a.e),fear:+(a.fear||0).toFixed(2),pain:+(a.painA||0).toFixed(2),hp:Math.round(a.hp),mood:+(a.mood||0).toFixed(2)}); cur.set(a,[0,0,0,0,0,0,0]); } }
 for(const [a,d] of days){ if((a.dead||a.gone)&&!done.has(a)){ done.add(a); const c=a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); if(c==='hunger'&&d.length>=26) out.push(d.slice(-25)); } } }
console.log(JSON.stringify({seed,victims:out}));
