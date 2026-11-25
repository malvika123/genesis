const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const HT=+process.argv[5]||1, PEOPLE=+process.argv[2], seeds=process.argv[3].split(',').map(Number), DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; f['people']=PEOPLE; f['hom-try']=HT; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});E.startLog();
 const seen=new Set(),track=new Set(); for(const a of E.state().ag) if(a.sp===0) track.add(a);
 const B=Math.ceil(DAYS/10), pd=Array(B).fill(0), kills=Array(B).fill(0), hunters=Array(B).fill(0), hdays=Array(B).fill(0);
 for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const b=Math.min(B-1,Math.floor((t-1)/(E.DAY*10))); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead&&!a.gone); pd[b]+=hom.length/E.DAY;
  for(const a of ag) if(a.sp===0) track.add(a);
  for(const a of track){ if(a.dead&&!seen.has(a)&&a.cause==='killed by a predator'){ seen.add(a); kills[b]++; } }
  if(t%E.DAY===0){ const near=ag.filter(h=>h.sp===2&&!h.dead&&!h.gone&&hom.some(p=>Math.abs(p.x-h.x)<=18&&Math.abs(p.y-h.y)<=18)).length; hunters[b]+=near; hdays[b]++; } }
 const att=Array(B).fill(0); for(const h of E.huntLog()){ if(h.prey!=='Hominin') continue; const b=Math.min(B-1,Math.floor(h.tick/(E.DAY*10))); att[b]++; }
 console.log(JSON.stringify({homTry:HT,attacks:att,attRate:att.map((k,i)=>+(k/Math.max(1,pd[i])*100).toFixed(3)),people:PEOPLE,seed,pd:pd.map(v=>Math.round(v)),kills,rate:kills.map((k,i)=>+(k/Math.max(1,pd[i])*100).toFixed(2)),hunters:hunters.map((v,i)=>Math.round(v/Math.max(1,hdays[i]))),alive:E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone).length}));
}
