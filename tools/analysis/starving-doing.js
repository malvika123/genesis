// What starving hominins with food 1-2 squares away actually do, step by step (awake or asleep, which choice), and how tired.
// (research log entry 51). Usage (from the genesis folder): node tools/analysis/starving-doing.js SEED DAYS [switches]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const fo=E.forest(),it=E.items(),W=E.W,H=E.H;const isFood=(x,y)=>{if(y<0||y>=H)return false;const h=y*W+((x%W)+W)%W;return fo.fruit[h]>0.05||it.ROOT[h]>0.05};
const near=(a)=>{let b=9;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(isFood(a.x+dx,a.y+dy))b=Math.min(b,Math.max(Math.abs(dx),Math.abs(dy)));return b};
const NAMES=['E','SE','S','SW','W','NW','N','NE','stay','eat','drink','sleep','mate','grab','give','take','drop','strike','climb'];
const C={};let n=0,asleep=0,tired=0,up=0,young=0,carried=0,hp=0;
for(let t=0;t<days*E.DAY;t++){E.sim();for(const a of E.state().ag){if(a.sp!==0||a.dead||a.e>=30)continue;const d=near(a);if(d<1||d>2)continue;n++;
  if(a.asleep)asleep++;if(a.sl>0.6)tired++;if(a.up)up++;if(a.age<a.S.mat*0.4)young++;if(a.hp<40)hp++;
  const k=a.act<8?'walk':NAMES[a.act]||String(a.act);C[k]=(C[k]||0)+1}}
const pc=v=>(100*v/n).toFixed(0)+'%';
console.log('seed',seed,'| starving with food 1-2 squares away:',n,'steps | asleep',pc(asleep),'| very sleepy',pc(tired),'| up a tree',pc(up),'| still nursing age',pc(young),'| badly hurt',pc(hp));
console.log('  last choice:',Object.entries(C).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+' '+pc(v)).join(', '));
