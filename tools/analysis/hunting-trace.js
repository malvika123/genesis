// Genesis — how often each hunter kind is near prey (within 5 squares, and next to it), awake and hungry, and the kills (research log entry 40).
// Usage (from the genesis folder): node tools/analysis/hunting-trace.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({'naive-founders':true});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const W=E.W,H=E.H;const dxw=d=>{d=((d%W)+W)%W;return d>W/2?d-W:d};
const st={};const add=(n,k)=>{st[n]=st[n]||{steps:0,awake:0,hungry:0,preyNear5:0,preyAdj:0};st[n][k]++};
let k0=E.state().kills.slice();
for(let t=0;t<days*E.DAY;t++){E.sim();const ag=E.state().ag;const prey=ag.filter(o=>o.sp===1&&!o.dead);
 for(const a of ag){if(a.sp!==2||a.dead)continue;const n=a.S.n;add(n,'steps');if(a.asleep)continue;add(n,'awake');if(a.e<50)add(n,'hungry');
  let d=99;for(const o of prey){const dd=Math.max(Math.abs(dxw(o.x-a.x)),Math.abs(o.y-a.y));if(dd<d)d=dd}
  if(d<=5)add(n,"preyNear5");if(d<=1)add(n,"preyAdj")}}
const k1=E.state().kills;console.log(JSON.stringify(st,null,0));console.log('kills by hunters [people, plant-eaters, hunters, fish]:',k1.map((v,i)=>v-k0[i]).join(' '));
