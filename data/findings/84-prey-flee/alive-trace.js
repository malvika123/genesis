// measuring only: how prey and hominins respond when a hunter is near, and how often hunters' attacks succeed
const {engineSource}=require('/Users/malvikasen/genesis/tools/engine.js');
const {build}=require('/Users/malvikasen/genesis/tools/engine-api.js');
let src=engineSource();
const n1="        if (rnd() < pc) {\n          t.dead = true;";
if(!src.includes(n1)) throw 'needle';
src=src.replace(n1,"        if (a.sp === 2) { ATTK.n++; ATTK[t.sp] = (ATTK[t.sp]||0)+1; }\n"+n1.replace("t.dead = true;","t.dead = true; if (a.sp === 2) { ATTK.k++; ATTK['k'+t.sp] = (ATTK['k'+t.sp]||0)+1; }"));
globalThis.ATTK={n:0,k:0};
const E=build(src);
const res={};
const cheb=(a,b)=>Math.max(Math.abs(E.dxw(a.x-b.x)),Math.abs(a.y-b.y));
for (const seed of (process.argv[2]||'1,2,3').split(',').map(Number)) {
  E.setSeed(seed); E.reset(JSON.parse(process.argv[3]||'{}'));
  for (let t=0;t<10*E.DAY;t++) {
    const st=E.state(); const hunters=st.ag.filter(a=>a.sp===2&&!a.dead&&!a.asleep);
    const before=new Map();
    for (const a of st.ag) if ((a.sp===0||a.sp===1) && !a.dead && !a.asleep) {
      let d=99; for (const h of hunters) d=Math.min(d,cheb(a,h));
      if (d<=2) before.set(a,{d,x:a.x,y:a.y,up:a.up});
    }
    E.sim();
    for (const [a,b] of before) {
      const key=(a.sp===0?'hominin':(a.herd?'herd':'single prey'))+' d<='+b.d;
      const r=res[key]||(res[key]={n:0,away:0,closer:0,stayed:0,climbed:0,died:0});
      r.n++;
      if (a.dead||a.gone) { r.died++; continue; }
      if (!b.up && a.up) { r.climbed++; continue; }
      let d=99; for (const h of E.state().ag.filter(o=>o.sp===2&&!o.dead)) d=Math.min(d,cheb(a,h));
      if (a.x===b.x&&a.y===b.y) r.stayed++; else if (d>b.d) r.away++; else r.closer++;
    }
  }
}
const pct=(v,n)=>Math.round(100*v/n);
for (const [k,r] of Object.entries(res).sort()) console.log(k.padEnd(18),'samples',r.n,'| away',pct(r.away,r.n)+'%','| closer/sideways',pct(r.closer,r.n)+'%','| stayed',pct(r.stayed,r.n)+'%','| climbed',pct(r.climbed,r.n)+'%','| died',pct(r.died,r.n)+'%');
console.log("hunters' attacks",ATTK.n,'kills',ATTK.k,'success',pct(ATTK.k,ATTK.n)+'%','| on plant-eaters',ATTK[1]||0,'kills',ATTK.k1||0,'| on hominins',ATTK[0]||0,'kills',ATTK.k0||0);
