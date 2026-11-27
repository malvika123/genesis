const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const W=200; const R={lo:{n:0,fall:0,rise:0},mid:{n:0,fall:0,rise:0},hi:{n:0,fall:0,rise:0}}; let prev=new Map();
for(let t=1;t<=E.DAY*DAYS;t++){ const st0=E.state(); const fr0=Float32Array.from(st0.fruit); const e0=new Map(); const pre=[]; for(const a of st0.ag){ if(a.sp===0&&!a.dead&&!a.gone&&a.x>=0&&a.x<W&&a.y>=0&&a.y<240){ const i=a.y*W+a.x; pre.push([a,a.e,i,fr0[i],st0.poison[i]]); } }
 E.sim(); const st=E.state(); 
 for(const [a,e,i,f0,p] of pre){ if(a.act!==9||f0<=0.05||p) continue; if(st.fruit.length!==fr0.length) continue; const band=e<40?'lo':e<70?'mid':'hi'; const r=R[band]; r.n++; if(st.fruit[i]<f0-1e-6) r.fall++; if(a.e>e) r.rise++; } }
console.log(JSON.stringify({seed,R}));
