const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200, N=192; const ring=new Map(), prevE=new Map(), done=new Set(); const out=[]; const ACT={};
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const st=E.state(); const {fruit,ROOT,TERM}=st;
 for(const a of st.ag){ if(a.sp!==0) continue; let r=ring.get(a); if(!r){r=[];ring.set(a,r);} const pe=prevE.get(a); const typ=(a.x>=0&&a.x<W&&a.y>=0&&a.y<240)?(()=>{const i=a.y*W+a.x; return fruit[i]>0.05?1:ROOT[i]>0.05?2:(TERM&&TERM[i]>0.05)?3:0})():0; const real=typ>0?1:0; if(pe!==undefined){ r.push([a.act,a.e-pe,typ,a.asleep?1:0]); if(r.length>N) r.shift(); } prevE.set(a,a.e); }
 for(const [a,r] of ring){ if((a.dead||a.gone)&&!done.has(a)){ done.add(a); const c=a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); if(c==='hunger'&&r.length>100){ const by={}; for(const [act,d,typ,sl] of r){ if(typ===0) continue; const k=typ; by[k]=by[k]||{n:0,ate:0,gain:0}; by[k].n++; if(act===9) by[k].ate++; if(act===9&&d>0) by[k].gain++; } out.push({day:Math.round(t/E.DAY),by}); } } } }
console.log(JSON.stringify({seed,victims:out}));
