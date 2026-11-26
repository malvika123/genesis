const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const OPEN=process.argv[2]==='open', seed=+process.argv[3], DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:OPEN});
const out=[];
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); if(t%(E.DAY*10)===0){ const h=E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); const xs=h.map(a=>a.x).sort((p,q)=>p-q),ys=h.map(a=>a.y).sort((p,q)=>p-q); const cx=xs[xs.length>>1],cy=ys[ys.length>>1]; const d=h.reduce((s,a)=>s+Math.hypot(a.x-cx,a.y-cy),0)/h.length; out.push([t/E.DAY,h.length,+d.toFixed(1),+(h.filter(a=>a.lo>0.5).length/h.length).toFixed(2),+(h.reduce((s,a)=>s+a.lo,0)/h.length).toFixed(2)]); } }
console.log(JSON.stringify({open:OPEN,seed,rows:out}));
