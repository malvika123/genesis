const {engineSource}=require('/Users/malvikasen/genesis/tools/engine.js');
const {build}=require('/Users/malvikasen/genesis/tools/engine-api.js');
let src=engineSource();
const R=(a,b)=>{ if(!src.includes(a)) throw new Error('needle: '+a.slice(0,60)); src=src.replace(a,b); };
// at death: meat on the body (kg), and the hunter's first stomach-full
R("  if (BODIES.length > 400) BODIES.shift();","  { const B=BODIES[BODIES.length-1]; if (B.kgU && B.sp===1) { M.made += B.meat*B.kgU; M.n++; if (B.owner) M.owned += B.meat*B.kgU; } }\n  if (BODIES.length > 400) { const o=BODIES.shift(); if(o.kgU && o.sp===1) M.dropped += o.meat*o.kgU; }");
R("    b.meat = Math.max(0, b.meat - bugs - birds);","    if (b.kgU && b.sp===1) { M.bugs += bugs*b.kgU; M.birds += birds*b.kgU; }\n    b.meat = Math.max(0, b.meat - bugs - birds);");
R("          m.owner = a; // a hunter feeding on it holds it now (A35)","          if (m.sp===1) { if (m.owner===a) M.ownerAte += b*m.kgU; else M.otherHunterAte += b*m.kgU; }\n          m.owner = a; // a hunter feeding on it holds it now (A35)");
R("        m.meat -= b;\n        a.e = Math.min(100, a.e + b * 110 * MEAL(a));","        if (m.sp===1 && m.kgU) M.homAte += b*m.kgU;\n        m.meat -= b;\n        a.e = Math.min(100, a.e + b * 110 * MEAL(a));");
globalThis.M={made:0,n:0,owned:0,bugs:0,birds:0,ownerAte:0,otherHunterAte:0,homAte:0,dropped:0};
const E=build(src); E.setSeed(+process.argv[2]||1); E.reset({preyMap:true});
// how much of each kill went into the killer's stomach at the kill
let atKill=0; const k0=()=>Object.values(E.state().eatKg).reduce((t,v)=>t+v,0);
for(let t=0;t<10*E.DAY;t++) E.sim();
const ate=k0();
const r=(v)=>Math.round(v);
console.log('carcasses',M.n,'meat on them kg',r(M.made),'(with an owner',r(M.owned)+')','| hunters ate in all',r(ate),'of which later from carcasses: owner',r(M.ownerAte),'other hunters',r(M.otherHunterAte),'| hominins ate',r(M.homAte),'| birds',r(M.birds),'| bugs',r(M.bugs),'| dropped by the 400 cap',r(M.dropped));
