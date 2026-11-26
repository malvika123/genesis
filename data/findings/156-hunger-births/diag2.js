const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const YD=+process.argv[2], seeds=process.argv[3].split(',').map(Number), DAYS=+process.argv[4]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:YD});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const hist=new Map(), seen=new Set(), seenP=new Set(); let preg=0; const deaths=[];
 for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const ag=E.state().ag;
  for(const a of ag) if(a.sp===0){ if(!hist.has(a)) hist.set(a,[]); if(t%E.DAY===0) hist.get(a).push([Math.round(a.e),a.act,a.th,a.fear>0.5?'F':'',a.asleep?'z':'',Math.round((t-(a.ateT||0))/E.DAY)]); if(a.preg&&!seenP.has(a.preg)){seenP.add(a.preg);preg++;} }
  for(const [a,h] of hist){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); const c=a.dead?(a.cause||'unknown'):(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); if(c==='hunger') deaths.push({day:Math.round(t/E.DAY),age:+(a.age/E.TY).toFixed(1),sex:a.sex?'F':'M',hp:Math.round(a.hp),last:h.slice(-9).map(x=>x.join('/'))}); } } }
 const hom=E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone), fa=hom.filter(a=>a.sex&&a.age>=a.S.smat);
 const es=hom.map(a=>a.e).sort((x,y)=>x-y);
 console.log(JSON.stringify({seed,alive:hom.length,adultF:fa.length,adultM:hom.filter(a=>!a.sex&&a.age>=a.S.smat).length,kids:hom.filter(a=>a.age<a.S.smat).length,pregnanciesStarted:preg,pregnantNow:fa.filter(a=>a.preg).length,ovulatingNow:fa.filter(a=>a.rd).length,eMean:+(es.reduce((s,x)=>s+x,0)/es.length).toFixed(0),eP10:Math.round(es[Math.floor(es.length*0.1)]),hungerDeaths:deaths}));
}
