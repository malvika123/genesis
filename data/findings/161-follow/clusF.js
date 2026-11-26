const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; f['follow']=+(process.env.F||0); const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const st=new Map(); const out=[]; 
for(const a of E.state().ag) if(a.sp===0) st.set(a,{x0:a.x,y0:a.y,px:a.x,py:a.y,path:0});
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag; 
  if(t%E.DAY===0) for(const a of ag) if(a.sp===0&&st.has(a)&&!a.dead&&!a.gone){const s=st.get(a); s.path+=Math.hypot(a.x-s.px,a.y-s.py); s.px=a.x; s.py=a.y;}
  if(t%(E.DAY*20)===0){ const h=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const par=h.map((_,i)=>i); const fd=i=>par[i]===i?i:(par[i]=fd(par[i])); for(let i=0;i<h.length;i++)for(let j=i+1;j<h.length;j++) if(Math.hypot(h[i].x-h[j].x,h[i].y-h[j].y)<=4) par[fd(i)]=fd(j); const sz={}; h.forEach((_,i)=>{const r=fd(i); sz[r]=(sz[r]||0)+1;}); const sizes=Object.values(sz).sort((a,b)=>b-a);
   const net=h.map(a=>{const s=st.get(a); return s?Math.hypot(a.x-s.x0,a.y-s.y0):null;}).filter(v=>v!==null), path=h.map(a=>st.get(a)?st.get(a).path:null).filter(v=>v!==null);
   const m=v=>v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):0;
   out.push({day:t/E.DAY,n:h.length,clusters:sizes.length,sizes:sizes.slice(0,12),alone:sizes.filter(s=>s===1).length,meanNet:m(net),meanPath:m(path)}); } }
console.log(JSON.stringify(out));
