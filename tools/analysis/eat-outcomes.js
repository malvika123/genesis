// Every time a hominin chooses to eat: what was there, and what happened (energy, pain, illness).
// (research log entry 48). Usage (from the genesis folder): node tools/analysis/eat-outcomes.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const fo=E.forest(),it=E.items(),st=E.state(),W=E.W,EAT=9;const O={};const add=(k,o)=>{const r=O[k]=O[k]||{n:0,gain:0,pain:0,nothing:0,lostE:0};r.n++;r[o]++};
for(let t=0;t<days*E.DAY;t++){
  const prev=new Map();for(const a of st.ag){if(a.sp!==0||a.dead||a.asleep)continue;const h=a.y*W+((a.x%W)+W)%W;
    const k=fo.fruit[h]>0.05?'fruit':it.ROOT[h]>0.05?'roots':it.meatAt(a.x,a.y,0)?'meat':st.food[h]>0.1?'grass only':st.poison[h]>0.05?'poison plant':'bare ground';prev.set(a,{k,e:a.e,p:a.painA})}
  E.sim();
  for(const [a,p] of prev){if(a.act!==EAT)continue;const o=a.painA>p.p+0.02?'pain':a.e>p.e+0.05?'gain':a.e<p.e-0.01?'lostE':'nothing';add(p.k,o)}}
let tot=0;for(const r of Object.values(O))tot+=r.n;
for(const [k,r] of Object.entries(O).sort((a,b)=>b[1].n-a[1].n))console.log(k.padEnd(16),'eat choices',String(r.n).padStart(6),'('+(100*r.n/tot).toFixed(0)+'%) | energy rose',(100*r.gain/r.n).toFixed(0)+'%','| pain',(100*r.pain/r.n).toFixed(0)+'%','| nothing',(100*r.nothing/r.n).toFixed(0)+'%','| energy fell',(100*r.lostE/r.n).toFixed(0)+'%');
