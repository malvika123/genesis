// Genesis — plant-eaters by kind every 10 days, their deaths by cause and days near starving (research log entry 40).
// Usage (from the genesis folder): node tools/analysis/prey-trace.js SEED DAYS
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const seed=+process.argv[2],days=+process.argv[3];const S=X.fromArgs({'naive-founders':true});const E=createEngine({brain:S.brain});E.setSeed(seed);E.reset(S.cfg);
const snap=()=>{const c={};for(const a of E.state().ag)if(a.sp===1||a.sp===2)c[a.S.n]=(c[a.S.n]||0)+1;return JSON.stringify(c)};
let hungry={},steps=0;
for(let t=0;t<days*E.DAY;t++){E.sim();if(t%E.DAY===0){for(const a of E.state().ag)if(a.sp===1){steps++;if(a.e<20)hungry[a.S.n]=(hungry[a.S.n]||0)+1}}if((t+1)%(E.DAY*10)===0)console.log('day',(t+1)/E.DAY,snap())}
const d=E.state().deaths,o={};for(const k in d)if(/^(Deer|Rabbit|Bison):/.test(k))o[k]=d[k];console.log('plant-eater deaths',JSON.stringify(o));console.log('plant-eater days near starving (e<20)',JSON.stringify(hungry),'of',steps,'plant-eater days');
