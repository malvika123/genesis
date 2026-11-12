// Genesis — what was the first branch heap worth, and how did it come about? (research log entry 41). Read-only trace of one
// world: who dropped branches where, the heap and the tree cover when a hominin first slept on 7+ branches, and the 10 days after.
// Usage (from the genesis folder, on the code that made the world): node tools/analysis/shelter-trace.js SEED DAYS [DAYS_AFTER]
// Copyright (c) 2026 Malvika Sen. MIT License.
const seed=+process.argv[2],days=+process.argv[3],after=+process.argv[4]||10;
const S=X.fromArgs({'naive-founders':true});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const A_DROP=16,A_SLEEP=11,STICK=2;const DAY=E.DAY;
const st=E.state(),it=E.items(),fo=E.forest(),wx=E.wx();
const drops=new Map(); // cell -> Map(id -> [days])
const prevHand=new Map();let allDrops=0;const droppers=new Set();
let found=null,endTick=Infinity;const afterLog=[];
for(let t=0;t<days*DAY&&E.state().tick<endTick;t++){
  E.sim();const ag=E.state().ag,tick=E.state().tick,day=(tick/DAY)|0;
  for(const a of ag){ if(a.sp!==0)continue; const ph=prevHand.get(a.id);
    if(ph===STICK&&a.hand===0&&a.act===A_DROP){const i=a.y*E.W+((a.x%E.W)+E.W)%E.W;allDrops++;droppers.add(a.id);
      if(!drops.has(i))drops.set(i,new Map());const m=drops.get(i);if(!m.has(a.id))m.set(a.id,[]);m.get(a.id).push(day)}
    prevHand.set(a.id,a.hand);}
  if(!found&&E.state().firsts.shelter){
    const sl=ag.find(a=>a.sp===0&&a.asleep&&it.stick[a.y*E.W+((a.x%E.W)+E.W)%E.W]>=7);
    const i=sl.y*E.W+((sl.x%E.W)+E.W)%E.W;const n=it.stick[i];
    const m=drops.get(i)||new Map();
    found={day,cell:i,x:sl.x,y:sl.y,branches:n,treeCover:+fo.tree[i].toFixed(3),cave:!!E.state().cave[i],coverHere:+fo.cover(i).toFixed(3),heapCover:+Math.max(0,Math.min(0.8,(n-4)/8)).toFixed(3),
      heapAddsOverTrees:+(Math.max(0,Math.min(0.8,(n-4)/8))-fo.tree[i]).toFixed(3),raining:wx.RAIN[i]>0.002,meanTemp:+fo.meanTemp(i).toFixed(1),
      sleeper:{id:sl.id,name:sl.name,ageYears:+(sl.age/288).toFixed(1)},
      dropsHereByWhom:[...m.entries()].map(([id,ds])=>({id,name:(ag.find(o=>o.id===id)||{}).name||'(dead)',drops:ds.length,firstDay:ds[0],lastDay:ds[ds.length-1]})).sort((a,b)=>b.drops-a.drops),
      allStickDropsSoFar:allDrops,hominsWhoEverDroppedSticks:droppers.size,
      top5CellsByDrops:[...drops.entries()].map(([c,mm])=>({cell:c,drops:[...mm.values()].reduce((s,v)=>s+v.length,0),droppers:mm.size,branchesNow:it.stick[c]})).sort((a,b)=>b.drops-a.drops).slice(0,5)};
    console.log('FIRST HEAP SLEEP',JSON.stringify(found,null,1));endTick=tick+after*DAY;}
  if(found&&tick%DAY===0){const i=found.cell;const sleepers=ag.filter(a=>a.sp===0&&a.asleep&&a.y*E.W+((a.x%E.W)+E.W)%E.W===i).map(a=>a.id);
    const m=drops.get(i)||new Map();afterLog.push({day,branches:it.stick[i],dropsHereTotal:[...m.values()].reduce((s,v)=>s+v.length,0),sleepersNow:sleepers.length})}
}
console.log('AFTER (daily at that spot)',JSON.stringify(afterLog));
if(found){const m=drops.get(found.cell);console.log('drops at the spot after the first sleep, by whom',JSON.stringify([...m.entries()].map(([id,ds])=>({id,after:ds.filter(d=>d>=found.day).length,before:ds.filter(d=>d<found.day).length}))))}
