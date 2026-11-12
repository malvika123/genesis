// node closetrace.js SEED DAYS : how often children are within sight (4 cells) of their mother, by age; and who closes the gap
const path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, days] = [Number(process.argv[2]), Number(process.argv[3])];
const S = X.fromArgs({ 'naive-founders': true });
const E = createEngine({ brain: S.brain }); E.setSeed(seed); E.reset(S.cfg);
const dist = (a, b) => Math.max(Math.abs(((a.x - b.x + E.W * 1.5) % E.W) - E.W / 2), Math.abs(a.y - b.y));
const by = {}; // age band -> {n, near, momMoved, kidMoved}
let prev = new Map();
for (let t = 0; t < days * E.DAY; t++) {
  E.sim();
  const cur = new Map();
  for (const k of E.state().ag) {
    if (k.sp !== 0 || !k.mom || k.mom.gone || k.age >= k.S.mat) continue;
    const yrs = k.age / E.TY, band = yrs < 1 ? '0-1' : yrs < 4 ? '1-4 (nursing)' : yrs < 7 ? '4-7' : '7-10';
    const d = dist(k, k.mom), r = (by[band] = by[band] || { n: 0, near: 0, closedByMom: 0, closedByKid: 0 });
    r.n++; if (d <= 4) r.near++;
    const p = prev.get(k);
    if (p && d < p.d) { const momMoved = k.mom.x !== p.mx || k.mom.y !== p.my, kidMoved = k.x !== p.kx || k.y !== p.ky; if (momMoved && !kidMoved) r.closedByMom++; else if (kidMoved && !momMoved) r.closedByKid++; }
    cur.set(k, { d, mx: k.mom.x, my: k.mom.y, kx: k.x, ky: k.y });
  }
  prev = cur;
  if (E.state().over) break;
}
for (const [b, r] of Object.entries(by)) console.log(b.padEnd(14), 'within sight of mother', (100 * r.near / r.n).toFixed(0) + '%', '| gaps closed by mother', r.closedByMom, 'by child', r.closedByKid);
