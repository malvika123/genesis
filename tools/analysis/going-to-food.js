// Starving hominins with food 1-2 squares away (not underfoot): how often does their next move bring them closer to it?
// (research log entry 51). Usage (from the genesis folder): node tools/analysis/going-to-food.js SEED DAYS [switches]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const fl={};for(const v of process.argv.slice(4))if(v.startsWith('--'))fl[v.slice(2)]=true;
const S=X.fromArgs(fl);const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);const fo=E.forest(),it=E.items(),W=E.W,H=E.H;
const dxw=d=>{d=((d%W)+W)%W;return d>W/2?d-W:d};const isFood=(x,y)=>{if(y<0||y>=H)return false;const h=y*W+((x%W)+W)%W;return fo.fruit[h]>0.05||it.ROOT[h]>0.05};
const near=(a)=>{let best=9;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(isFood(a.x+dx,a.y+dy))best=Math.min(best,Math.max(Math.abs(dx),Math.abs(dy)));return best};
// look 12 steps (3 hours) later: walking about 0.15 squares a step, a hominin needs about 7 steps to cross one square
const LATER=12;let n=0,closer=0,same=0,farther=0,reached=0,ate=0;const q=[];
for(let t=0;t<days*E.DAY;t++){E.sim();
  if(t%6===0)for(const a of E.state().ag){if(a.sp!==0||a.dead||a.asleep||a.e>=30)continue;const d=near(a);if(d>=1&&d<=2)q.push({a,d,t,e:a.e})}
  while(q.length&&q[0].t+LATER<=t){const o=q.shift();const a=o.a;if(a.dead||a.gone)continue;n++;const d2=near(a);if(d2===0)reached++;if(d2<o.d)closer++;else if(d2===o.d)same++;else farther++;if(a.e>o.e+1)ate++}}
console.log((Object.keys(fl).join(' ')||'new rule').padEnd(16),'starving, food 1-2 squares away:',n,'moments | 3 hours later closer',(100*closer/n).toFixed(0)+'% (on food '+(100*reached/n).toFixed(0)+'%, energy up '+(100*ate/n).toFixed(0)+'%) | same',(100*same/n).toFixed(0)+'% | farther',(100*farther/n).toFixed(0)+'%');
