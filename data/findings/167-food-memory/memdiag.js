const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200; const hist=new Map(), done=new Set(); const vict=[];
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const st=E.state(), ag=st.ag;
 if(t%E.DAY===0){ const {fruit,ROOT,TERM,food}=st; for(const a of ag){ if(a.sp!==0) continue; let r=hist.get(a); if(!r){r=[];hist.set(a,r);} let kind='none',d=null; if(a.mf){ const i=Math.round(a.mf.y)*W+Math.round(a.mf.x); const real=(fruit[i]>0.05||ROOT[i]>0.05||(TERM&&TERM[i]>0.05)); kind=real?'real':(food[i]>0.15?'plantOnly':'empty'); d=Math.hypot(a.mf.x-a.x,a.mf.y-a.y); } r.push({e:Math.round(a.e),act:a.act,kind,d:d===null?null:+d.toFixed(1)}); } }
 for(const [a,r] of hist){ if((a.dead||a.gone)&&!done.has(a)){ done.add(a); const c=a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); if(c==='hunger') vict.push(r.slice(-8)); } } }
const alive=[...hist.entries()].filter(([a])=>!a.dead&&!a.gone).map(([a,r])=>r);
const sum=(rows)=>{ const R=rows.flat(); const c={none:0,real:0,plantOnly:0,empty:0}; let near=0; for(const x of R){c[x.kind]++; if(x.kind==='plantOnly'&&x.d<=2) near++;} const n=R.length||1; return {days:R.length,none:+(c.none/n).toFixed(2),real:+(c.real/n).toFixed(2),plantOnly:+(c.plantOnly/n).toFixed(2),empty:+(c.empty/n).toFixed(2),plantOnlyWithin2:+(near/n).toFixed(2)}; };
console.log(JSON.stringify({seed,victims:vict.length,starving:sum(vict),others:sum(alive)}));
