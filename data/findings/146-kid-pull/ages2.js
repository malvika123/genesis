const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const arm=process.argv[2], seeds=process.argv[3].split(',').map(Number), KP=+(process.argv[4]||1); const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=(arm==='base'?5:1); if(arm==='avoid'||arm==='full') f['hom-avoid']=true; if(arm==='full') f['no-big-attacks']=true;
f['kid-pull']=KP; const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
 const D=[],seen=new Set(),track=new Set(); for(const a of E.state().ag) if(a.sp===0) track.add(a);
 const born=new Map(); for(const a of track) born.set(a,'founder');
 for(let t=1;t<=E.TY*5;t++){ E.sim(); const ag=E.state().ag; for(const a of ag) if(a.sp===0&&!track.has(a)){track.add(a);born.set(a,'born');}
  for(const a of track){ if((a.dead||a.gone)&&!seen.has(a)){ seen.add(a); D.push({age:+(a.age/E.TY).toFixed(1),from:born.get(a),cause:a.dead?a.cause:(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':a.age>a.lf?'old age':'other')}); } } }
 console.log(JSON.stringify({arm,KP,seed,alive:E.state().ag.filter(a=>a.sp===0&&!a.dead&&!a.gone).length,D}));
}
