const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const seed=+process.argv[2], DAYS=+process.argv[3]; const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60 --hom-try 0.01 --pass-cd 96'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['berry-aversion']=30; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122},yearDays:365});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:true});
const F=new Map(); for(const a of E.state().ag) if(a.sp===0){ F.set(a,{g:{...a.g},age:a.age/E.TY,sex:a.sex,es:[],fate:'alive'}); }
for(let t=1;t<=E.DAY*DAYS;t++){ E.sim(); const d=t/E.DAY; if(t%E.DAY===0){ for(const [a,r] of F){ if(d>=5&&d<=40&&!a.dead&&!a.gone) r.es.push(a.e); } }
 for(const [a,r] of F){ if(r.fate==='alive'&&(a.dead||a.gone)){ r.fate=a.dead?'killed':(a.hp<=0?'wounds':a.w<=0?'thirst':a.e<=0?'hunger':'other'); r.day=d; } } }
const rows=[...F.values()].map(r=>({fate:r.fate,day:r.day||null,age:+r.age.toFixed(1),sex:r.sex?1:0,e:r.es.length?+(r.es.reduce((a,b)=>a+b,0)/r.es.length).toFixed(1):null,g:Object.fromEntries(Object.entries(r.g).filter(([k,v])=>typeof v==='number'&&isFinite(v)).map(([k,v])=>[k,+v.toFixed(3)]))}));
console.log(JSON.stringify({seed,rows}));
