// Genesis — each outbreak of illness in one world: when, how many fell sick, how many died and at what ages (research log entry 46).
// Usage (from the genesis folder): node tools/analysis/outbreaks.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const OB={};let deaths0=0;
for(let t=0;t<days*E.DAY;t++){const before=new Map(E.state().ag.filter(a=>a.sp===0).map(a=>[a.id,a]));E.sim();const ag=E.state().ag;
 for(const a of ag){if(a.sp!==0||!a.ill)continue;const o=OB[a.ill]=OB[a.ill]||{start:(t/E.DAY|0),ids:new Set(),band:0,died:0,diedAges:[]};if(!o.band)o.band=ag.filter(x=>x.sp===0).length;o.ids.add(a.id)}
 for(const [id,a] of before){if(!ag.includes(a)&&a.cause==='illness'&&a.ill){const o=OB[a.ill];o.died++;o.diedAges.push(+(a.age/288).toFixed(1))}}}
for(const [k,o] of Object.entries(OB))console.log('outbreak',k,'day',o.start,'| band',o.band,'| fell sick',o.ids.size,'('+(100*o.ids.size/o.band).toFixed(0)+'%) | died',o.died,'('+(100*o.died/o.band).toFixed(1)+'% of band) ages',JSON.stringify(o.diedAges));
console.log('outbreaks',Object.keys(OB).length,'in',days,'days =',(days/3).toFixed(0),'years');
