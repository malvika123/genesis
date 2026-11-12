// What does a starving hominin's own brain expect from eating, when food is under its feet?
// (research log entry 48). Usage (from the genesis folder): node tools/analysis/brain-diag.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const fo=E.forest(),it=E.items(),W=E.W,EAT=9,NA=E.NA;const z=new Float32Array(NA);
const R={};const add=(k)=>R[k]=R[k]||{n:0,pLearned:0,rankEat:0,choseEat:0,ateGained:0,ateTries:0,dE:0};
for(let t=0;t<days*E.DAY;t++){
  const prev=new Map();
  for(const a of E.state().ag){if(a.sp!==0||a.dead||a.asleep||a.e>=30)continue;const h=a.y*W+((a.x%W)+W)%W;
    const kind=fo.fruit[h]>0.05?'fruit':it.ROOT[h]>0.05?'roots':null;if(!kind)continue;
    // the brain alone, without inborn pulls: its own probabilities over the 19 choices, from what it sensed last
    const hh=new Float32Array(a.h.length);E.forward(a.lw,a.xi,hh,z,a.nh);let rank=0;for(let k=0;k<NA;k++)if(z[k]>z[EAT])rank++;
    const r=add(kind);r.n++;r.pLearned+=z[EAT];r.rankEat+=rank;prev.set(a,{kind,e:a.e})}
  E.sim();
  for(const [a,p] of prev){if(a.act!==EAT)continue;const r=R[p.kind];r.choseEat++;r.ateTries++;if(a.e>p.e+0.05)r.ateGained++;r.dE+=a.e-p.e}}
for(const [k,r] of Object.entries(R))console.log(k.padEnd(6),'starving moments on it',r.n,'| brain alone: P(eat)',(r.pLearned/r.n).toFixed(3),'(1/19 = 0.053), mean rank of eat',(r.rankEat/r.n).toFixed(1),'of 18 | chose eat',(100*r.choseEat/r.n).toFixed(1)+'% | when it ate, energy rose',r.ateTries?(100*r.ateGained/r.ateTries).toFixed(0)+'%':'-','avg change',r.ateTries?(r.dE/r.ateTries).toFixed(2):'-');
