const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const arm=process.argv[2], tmin=+process.argv[3], pull=+process.argv[4], seeds=process.argv[5].split(',').map(Number); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=4; f['tree-min']=tmin; f['nest-pull']=pull; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const snap=new Map(), done=new Set(); let hy=0, sl=0, up=0; const kills={asleep:0,up:0,total:0,leopardUp:0};
 for(let t=1;t<=E.TY*5;t++){ const ag0=E.state().ag; for(const a of ag0) if(a.sp===0&&!a.dead) snap.set(a,{asleep:!!a.asleep,up:!!a.up});
  E.sim(); const ag=E.state().ag; const live=ag.filter(a=>a.sp===0&&!a.dead); hy+=live.length/E.TY;
  if(t%8===0) for(const a of live) if(a.asleep){ sl++; if(a.up) up++; }
  for(const [a,s] of snap){ if((a.dead||a.gone)&&!done.has(a)){ done.add(a); if(a.cause==='killed by a predator'){ kills.total++; if(s.asleep) kills.asleep++; if(s.up){ kills.up++; if(a.killedBy==='Leopard') kills.leopardUp++; } } } }
  if(!live.length)break; }
 const d=E.state().deaths, hd={}; for(const [k,v] of Object.entries(d)) if(k.startsWith('Person: ')) hd[k.slice(8)]=v;
 console.log(JSON.stringify({arm,seed,aliveEnd:E.state().ag.filter(a=>a.sp===0&&!a.dead).length,homininYears:+hy.toFixed(1),sleepSamples:sl,upSamples:up,kills,deaths:hd}));
}
