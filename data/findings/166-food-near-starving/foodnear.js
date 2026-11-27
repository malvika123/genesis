const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200,Hh=240; const hist=new Map(); const done=new Set(); const vict=[]; let others=[];
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const st=E.state(); const ag=st.ag;
 if(t%E.DAY===0){ const {fruit,ROOT,TERM}=st; for(const a of ag){ if(a.sp!==0) continue; let r=hist.get(a); if(!r){r=[];hist.set(a,r);} let n=0,nf=0; for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){ const X2=a.x+dx,Y2=a.y+dy; if(X2<0||X2>=W||Y2<0||Y2>=Hh) continue; const i=Y2*W+X2; if(fruit[i]>0.05||ROOT[i]>0.05||(TERM&&TERM[i]>0.05)) n++; if(fruit[i]>0.05) nf++; } r.push([Math.round(a.e),n,nf]); } }
 for(const [a,r] of hist){ if((a.dead||a.gone)&&!done.has(a)){ done.add(a); const c=a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); if(c==='hunger') vict.push(r.slice(-8)); } } }
const alive=[...hist.entries()].filter(([a])=>!a.dead&&!a.gone).map(([a,r])=>r);
const flat=v=>v.flat(0); const mean=(v,k)=>v.length?+(v.reduce((s,x)=>s+x[k],0)/v.length).toFixed(1):null;
const V=vict.flat(), A=alive.flat();
let neg=0,tot=0; for(const r of vict){ for(let i=1;i<r.length;i++){tot++; if(r[i][0]<r[i-1][0]) neg++;} }
console.log(JSON.stringify({seed,victims:vict.length,victimDays:V.length,edibleSquaresVict:mean(V,1),fruitSquaresVict:mean(V,2),edibleSquaresAlive:mean(A,1),fruitSquaresAlive:mean(A,2),negShare:tot?+(neg/tot).toFixed(2):null}));
