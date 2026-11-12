// Young hominins (weaned, not yet grown): when they choose to eat, is there food they can eat there? And how often does it pay?
// (research log entry 52). Usage (from the genesis folder): node tools/analysis/young-eat.js SEED DAYS [switches]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const fl={};for(const v of process.argv.slice(4))if(v.startsWith('--'))fl[v.slice(2)]=true;
const S=X.fromArgs(fl);const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);const fo=E.forest(),it=E.items(),st=E.state(),W=E.W,EAT=9;
let eats=0,onFood=0,paid=0,steps=0;
for(let t=0;t<days*E.DAY;t++){const pre=new Map();for(const a of st.ag){if(a.sp!==0||a.dead||a.asleep)continue;if(a.age<a.S.mat*a.S.wn||a.age>=a.S.mat)continue;const h=a.y*W+((a.x%W)+W)%W;pre.set(a,{food:fo.fruit[h]>0.05||it.ROOT[h]>0.05||!!it.meatAt(a.x,a.y,0),e:a.e})}
  E.sim();for(const [a,p] of pre){steps++;if(a.act!==EAT)continue;eats++;if(p.food)onFood++;if(a.e>p.e+0.05)paid++}}
const d=st.deaths;const kidsHunger=Object.entries(d).filter(([k])=>k==='Person: hunger').reduce((s,[,v])=>s+v,0);
console.log((Object.keys(fl).join(' ')||'copy what worked').padEnd(18),'young awake steps',steps,'| chose eat',(100*eats/steps).toFixed(1)+'%','| of those, food there',(100*onFood/eats).toFixed(0)+'%','| it paid',(100*paid/eats).toFixed(0)+'%','| all hunger deaths',kidsHunger);
