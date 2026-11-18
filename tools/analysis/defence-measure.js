// Genesis — defence: measure first (docs/design/defence.md item 1; owner 17-18 Nov). Measuring only; changes nothing.
// Per run: (1) share of hominin sleeping steps spent up a tree; (2) attacks on hominins by hunter kind: asleep or awake, child or adult, up a tree or not (the hominin's state the step before), and how many ended
// in a kill; (3) hominins' share of each hunter kind's attacks (against its attacks on all prey); (4) where hunters come from: births in the world, or newcomers (rescue, creatures.js), per kind;
// (5) hunters alive (mean per kind) and hominins alive (mean), and the year the band ended.
// Usage: node tools/analysis/defence-measure.js SEEDS DAYS OUT_FILE [switches]  (SEEDS like 1-12)
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), { engineSource } = require('../engine'), X = require('../experiment-core');
const [seedArg, daysArg, out, ...rest] = process.argv.slice(2), flags = {};
for (let i = 0; i < rest.length; i++) {
  if (!rest[i].startsWith('--')) continue;
  const [k, v] = rest[i].slice(2).split('=');
  if (v !== undefined) flags[k] = isNaN(+v) ? v : +v;
  else if (i + 1 < rest.length && !rest[i + 1].startsWith('--')) flags[k] = isNaN(+rest[i + 1]) ? rest[i + 1] : +rest[++i];
  else flags[k] = true;
}
const S = X.fromArgs(flags), seeds = X.seedList(seedArg), days = +daysArg;
const T = { sleepSteps: 0, sleepUp: 0, hominins: 0, hSteps: 0, att: {}, allAtt: {}, born: {}, newc: {}, alive: {}, aliveSteps: 0, endTick: [], worlds: 0 };
const inc = (o, k, n = 1) => (o[k] = (o[k] || 0) + n);
for (const seed of seeds) {
  const E = new Function(engineSource() + '\nreturn { setSeed, reset, sim, DAY, TY, ag: () => ag, startLog: () => { HUNTLOG = []; }, log: () => HUNTLOG };')();
  E.setSeed(seed); E.reset(S.cfg); E.startLog();
  const seenH = new Set(); let lastUp = new Map(), t = 0, end = 0;
  for (t = 1; t <= days * E.DAY; t++) {
    const before = E.log().length;
    E.sim();
    const ag = E.ag(); let hom = 0; const upNow = new Map();
    for (const a of ag) {
      if (a.sp === 0) { hom++; upNow.set(a.id, !!a.up); if (a.asleep) { T.sleepSteps++; if (a.up) T.sleepUp++; } }
      else if (a.sp === 2 && !seenH.has(a.id)) { seenH.add(a.id); inc(a.newcomer ? T.newc : T.born, a.S.n); }
      if (a.sp === 2) inc(T.alive, a.S.n);
    }
    T.hSteps += hom; T.aliveSteps++;
    const L = E.log();
    for (let i = before; i < L.length; i++) {
      const r = L[i], k = r.k;
      inc(T.allAtt, k);
      if (r.prey === 'Hominin') {
        const kk = k + '|' + (r.asleep ? 'asleep' : 'awake') + '|' + (r.young ? 'young' : 'adult');
        inc(T.att, kk); inc(T.att, k + '|total'); if (r.hit || r.wound) inc(T.att, k + '|hurt-or-killed');
      }
    }
    lastUp = upNow;
    if (!hom) { end = t; break; }
  }
  T.worlds++; T.endTick.push((end || days * E.DAY) / E.TY);
  console.log('world', seed, 'done: ended at year', ((end || days * E.DAY) / E.TY).toFixed(1));
}
const f = (x, n = 3) => (isNaN(x) ? '-' : x.toFixed(n)), lines = [];
lines.push(`${T.worlds} worlds x ${days} days; hominin steps ${T.hSteps}`);
lines.push(`share of hominin sleeping steps up a tree: ${f(T.sleepUp / T.sleepSteps)} (${T.sleepUp} of ${T.sleepSteps})`);
lines.push('attacks on hominins by hunter kind (every attack: total; asleep or awake; hurt or killed) and the hominins\' share of that kind\'s attacks on all prey');
for (const k of Object.keys(T.allAtt)) lines.push(`${k}: on hominins ${T.att[k + '|total'] || 0} of ${T.allAtt[k]} (${f((T.att[k + '|total'] || 0) / T.allAtt[k])}); asleep ${(T.att[k + '|asleep|adult'] || 0) + (T.att[k + '|asleep|young'] || 0)}, awake ${(T.att[k + '|awake|adult'] || 0) + (T.att[k + '|awake|young'] || 0)}; children ${(T.att[k + '|asleep|young'] || 0) + (T.att[k + '|awake|young'] || 0)}; hurt or killed ${T.att[k + '|hurt-or-killed'] || 0}`);
lines.push('hunters seen: born in the world / newcomers by rescue');
for (const k of new Set([...Object.keys(T.born), ...Object.keys(T.newc)])) lines.push(`${k}: ${T.born[k] || 0} / ${T.newc[k] || 0}; mean alive ${f((T.alive[k] || 0) / T.aliveSteps, 1)}`);
lines.push(`mean hominins alive ${f(T.hSteps / T.aliveSteps, 1)}; years ended: ${T.endTick.map((x) => x.toFixed(1)).join(' ')}`);
fs.writeFileSync(out, lines.join('\n') + '\n'); console.log(lines.join('\n'));
