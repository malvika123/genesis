const H=process.env.HOME+'/genesis/';const { createEngine } = require(H+'tools/engine'), X = require(H+'tools/experiment-core');
const arm=process.argv[2], seeds=process.argv[3].split(',').map(Number), open=arm==='OPEN';
const f={}; const toks='--more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --body-model --young-leaves --termites'.split(/\s+/);
for(let i=0;i<toks.length;i++){ if(!toks[i].startsWith('--'))continue; const k=toks[i].slice(2); f[k]=(i+1<toks.length&&!toks[i+1].startsWith('--'))?+toks[i+1]:true; }
const S=X.fromArgs(f);
for (const seed of seeds) {
 const E=createEngine({valley:{W:200,H:240,lat:-0.122}});E.setSeed(seed);E.reset({...S.cfg,valley:true,openValley:open});
 let attacks=0,hy=0,empty=null,pop0=null,c0=null,cEnd=null,maxMoveKm=0;
 for(let t=1;t<=E.TY*30;t++){ E.sim(); const ag=E.state().ag; const hom=ag.filter(a=>a.sp===0&&!a.dead);
  if(pop0===null)pop0=hom.length; hy+=hom.length/E.TY; if(!hom.length){empty=t/E.TY;break;}
  if(t%E.DAY===0){ const o=E.ov(); const cx=hom.reduce((a,b)=>a+b.x,0)/hom.length+o.OX, cy=hom.reduce((a,b)=>a+b.y,0)/hom.length+o.OY; if(!c0)c0=[cx,cy]; cEnd=[cx,cy]; maxMoveKm=Math.max(maxMoveKm,Math.hypot(cx-c0[0],cy-c0[1])*0.25); }
  for(const h of ag){ if(h.sp===2&&h.kcd===4&&!h.dead){ if(hom.some(p=>Math.abs(p.x-h.x)<=1&&Math.abs(p.y-h.y)<=1)) attacks++; } }
 }
 console.log(JSON.stringify({arm,seed,pop0,aliveEnd:E.state().ag.filter(a=>a.sp===0&&!a.dead).length,attacks,homininYears:+hy.toFixed(2),emptyAtYear:empty,centreMovedKm:cEnd?+(Math.hypot(cEnd[0]-c0[0],cEnd[1]-c0[1])*0.25).toFixed(2):null,maxMoveKm:+maxMoveKm.toFixed(2),windowMoves:open?E.ov().OVSHIFTS:0}));
}
