const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const YD=+process.argv[2], seeds=process.argv[3].split(',').map(Number), DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=+(process.env.BA||0); f['dens-tau']=1; f['body-ledger']=true; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:YD});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const rec=new Map(); const D=E.DAY;
 for(const a of E.state().ag) if(a.sp===0) rec.set(a,{kc:[],ep:[],open:null,prev:a.e,lastDay:0});
 for(let t=1;t<=D*DAYS;t++){ E.sim(); const ag=E.state().ag; for(const a of ag){ if(a.sp===0&&!rec.has(a)) rec.set(a,{kc:[],ep:[],open:null,prev:a.e,lastDay:0}); }
  for(const [a,r] of rec){ if(a.dead||a.gone) continue; const e=a.e;
    if(r.open===null && e<50 && r.hi) { r.open={t,low:e}; }
    if(r.open!==null){ r.open.low=Math.min(r.open.low,e); if(e>=r.open.low+5){ r.ep.push([Math.floor(r.open.t/D),+((t-r.open.t)/4).toFixed(1)]); r.open=null; r.hi=false; } }
    if(e>70) r.hi=true; }
  if(t%D===0){ for(const [a,r] of rec){ if(!a.dead&&!a.gone&&a.kcalLast!==undefined) r.kc.push([t/D,Math.round(a.kcalLast)]); } } }
 const rows=[...rec.entries()].filter(([a])=>!a.dead&&!a.gone).map(([a,r])=>({kc:r.kc,ep:r.ep}));
 console.log(JSON.stringify({seed,alive:rows.length,rows}));
}
