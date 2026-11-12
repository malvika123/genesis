// Genesis — do starving hominins eat when food is under their feet, and does a hunter close by switch the hunger pull off?
// (research log entry 45). Usage: node tools/analysis/hunger-pull.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const fo=E.forest(),it=E.items(),W=E.W,NCH=16,EAT=9;const T={};const add=(k,a)=>{T[k]=T[k]||{n:0,eat:0};T[k].n++;if(a.act===EAT)T[k].eat++};
for(let t=0;t<days*E.DAY;t++){E.sim();for(const a of E.state().ag){if(a.sp!==0||a.dead||a.asleep||a.e>=30)continue;const h=a.y*W+((a.x%W)+W)%W;
 const food=fo.fruit[h]>0.05||it.ROOT[h]>0.05;let c=0;for(let s=0;s<8;s++)c=Math.max(c,a.xi[s*NCH+5]);
 add((food?'food here':'no food here')+' / '+(c>=0.6?'hunter close (pull OFF)':'no hunter close'),a)}}
for(const [k,v] of Object.entries(T))console.log(k.padEnd(45),'starving steps',String(v.n).padStart(6),'| chose eat',(100*v.eat/v.n).toFixed(1)+'%');
