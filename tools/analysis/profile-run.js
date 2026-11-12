// Genesis — run one world in this process (for profiling) and print seconds per simulated day (research log entry 43).
// Copyright (c) 2026 Malvika Sen. MIT License.
const path=require('path'),root=process.cwd();const {createEngine}=require(path.join(root,'tools/engine'));const X=require(path.join(root,'tools/experiment-core'));
const S=X.fromArgs({});const E=createEngine({brain:S.brain});E.setSeed(+process.argv[2]||1);E.reset(S.cfg);
const days=+process.argv[3]||20;let t0=Date.now();for(let d=0;d<days;d++){for(let t=0;t<E.DAY;t++)E.sim();if((d+1)%5===0){const ag=E.state().ag;console.log('day',d+1,'secs/day',((Date.now()-t0)/5000).toFixed(2),'hominins',ag.filter(a=>a.sp===0).length,'animals',ag.filter(a=>a.sp===1||a.sp===2).length,'fish',ag.filter(a=>a.sp===3).length);t0=Date.now()}}
