const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites --hom-avoid --no-big-attacks'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
f['valley-speed']=1; f['dens-tau']=1; const S=X.fromArgs(f);
const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(1);E.reset({...S.cfg,valley:true,openValley:true});
console.log("cfg preyMap?",S.cfg.preyMap,"moreHerds",S.cfg.moreHerds,"extraHerdN",S.cfg.extraHerdN);
for(let t=1;t<=E.DAY;t++) E.sim();
const ag=E.state().ag; const h=ag.filter(o=>o.sp===1&&!o.dead&&!o.gone);
console.log("herbivore agents",h.length,"with herd flag",h.filter(o=>o.herd).length);
const by={}; h.forEach(o=>{const k=o.S.n+(o.herd?" herd":" single"); by[k]=by[k]||{n:0,head:0,mass:o.S.mass}; by[k].n++; by[k].head+=o.head||1;}); console.log(by);
console.log(Object.keys(h[0]).filter(k=>/head|herd|kg|pc/.test(k)));
