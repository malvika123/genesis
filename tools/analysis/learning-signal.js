// The learning signal (d) in the step after a starving hominin standing on fruit chose to eat, against after any other choice
// (research log entry 49). Usage (from the genesis folder): node tools/analysis/learning-signal.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
// there; and, for all hominins, the brain's value estimate V against the rewards it actually gets.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const fo=E.forest(),W=E.W,EAT=9;let pend=new Map();const R={eat:{n:0,d:0,neg:0},other:{n:0,d:0,neg:0}};let all={n:0,d:0,neg:0,r:0,V:0};
for(let t=0;t<days*E.DAY;t++){
  const before=new Set();for(const a of E.state().ag){if(a.sp!==0||a.dead||a.asleep||a.e>=30)continue;const h=a.y*W+((a.x%W)+W)%W;if(fo.fruit[h]>0.05)before.add(a)}
  E.sim();const ag=E.state().ag;
  for(const [a,k] of pend){if(a.dead||a.gone)continue;const x=R[k];x.n++;x.d+=a.da;if(a.da<0)x.neg++}
  pend=new Map();for(const a of before)if(!a.dead&&!a.gone)pend.set(a,a.act===EAT?'eat':'other');
  if(t%10===0)for(const a of ag){if(a.sp!==0||a.dead||!a.has||a.da===undefined)continue;all.n++;all.d+=a.da;if(a.da<0)all.neg++;all.r+=a.rk.reduce((s,v)=>s+v,0);all.V+=a.Vp}}
for(const [k,x] of Object.entries(R))console.log(('after '+k).padEnd(12),'n',x.n,'| mean d',(x.d/x.n).toFixed(3),'| d<0',(100*x.neg/x.n).toFixed(0)+'%');
console.log('ALL hominins, all steps: mean d',(all.d/all.n).toFixed(3),'| d<0',(100*all.neg/all.n).toFixed(0)+'% | mean reward',(all.r/all.n).toFixed(4),'| mean V',(all.V/all.n).toFixed(2),'(if rewards average about',(all.r/all.n).toFixed(4),'the true value is about',((all.r/all.n)/(1-0.97)).toFixed(2)+')');
