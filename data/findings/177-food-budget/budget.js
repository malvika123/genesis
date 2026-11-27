const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200,Hh=240,out=[];
const snap=(day)=>{ const st=E.state(); const h=st.ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const xs=h.map(a=>a.x).sort((p,q)=>p-q),ys=h.map(a=>a.y).sort((p,q)=>p-q); const cx=xs[xs.length>>1],cy=ys[ys.length>>1];
 const YL=E.yl?E.yl():null; const res={day,n:h.length}; for(const R of [12,24]){ let fr=0,ro=0,te=0; for(let y=Math.max(0,cy-R);y<=Math.min(Hh-1,cy+R);y++)for(let x=Math.max(0,cx-R);x<=Math.min(W-1,cx+R);x++){ const i=y*W+x; fr+=st.fruit[i]; ro+=st.ROOT[i]; if(st.TERM) te+=st.TERM[i]; } const need=660*1; res['r'+R]={fruitDays:+(fr*130/need).toFixed(1),rootDays:+(ro*149/need).toFixed(1),termDays:+(te*223/need).toFixed(1)}; } return res; };
out.push(snap(0));
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); if(t%(E.DAY*30)===0) out.push(snap(t/E.DAY)); }
console.log(JSON.stringify({seed,out}));
