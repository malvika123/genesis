// Genesis — do discoveries spread? For each behaviour that can be seen in one hominin (cracking nuts with a stone, digging roots
// with a stick, eating fire-cooked food, picking up a burning stick, eating meat, cutting meat with a sharp stone): who did it and
// when, and who was in the same square, awake, when someone did it (watched). Then the rate at which hominins do it for the first
// time, among those who had watched it and those who never had (a simple form of the logic of network-based diffusion analysis:
// Franz & Nunn 2009). Run with the new copying and with --copy-moves: sharing a place raises both alike, so a larger gap with the
// new copying is the sign that watching itself passes the behaviour on (research log entry 54).
// Usage (from the genesis folder): node tools/analysis/spread.js SEEDS DAYS OUT.json [switches]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const seeds = process.argv[2].split(',').map(Number), days = +process.argv[3], out = process.argv[4];
const fl = {}; for (const v of process.argv.slice(5)) if (v.startsWith('--')) fl[v.slice(2)] = true;
const B = ['nuts', 'stick digging', 'cooked food', 'burning stick', 'meat', 'cutting meat'];
const T = {}; for (const b of B) T[b] = { stepsWatched: 0, stepsNot: 0, firstWatched: 0, firstNot: 0, doers: 0, worldsWithIt: 0 };
for (const seed of seeds) {
  const S = X.fromArgs(fl), E = createEngine({ brain: S.brain }); E.setSeed(seed); E.reset(S.cfg);
  const st = E.state(), fo = E.forest(), it = E.items(), fi = E.fire(), W = E.W, EAT = 9;
  const did = new Map(), saw = new Map(); // id -> Set of behaviours done / watched
  const seenB = new Set();
  for (let t = 0; t < days * E.DAY; t++) {
    const pre = new Map();
    for (const a of st.ag) if (a.sp === 0 && !a.dead) { const h = a.y * W + ((a.x % W) + W) % W; pre.set(a, { nuts: a.nuts || 0, hand: a.hand, root: it.ROOT[h] > 0.05, cook: fi.COOK[h] > 0.05, meat: !!it.meatAt(a.x, a.y, 0) }); }
    E.sim();
    // what each one did this step
    const now = [];
    for (const [a, p] of pre) {
      if (a.dead || a.gone || a.asleep) continue;
      const doing = [];
      if ((a.nuts || 0) > p.nuts) doing.push('nuts');
      if (a.act === EAT && p.hand === 2 && p.root) doing.push('stick digging');
      if (a.act === EAT && p.cook) doing.push('cooked food');
      if (a.hand === 4 && p.hand !== 4) doing.push('burning stick');
      if (a.act === EAT && p.meat) { doing.push('meat'); if (p.hand === 3) doing.push('cutting meat'); }
      now.push([a, doing]);
    }
    // at risk this step: awake hominins who have never done b, split by whether they had watched it before this step
    for (const [a] of now) {
      const d = did.get(a.id) || new Set(), s = saw.get(a.id) || new Set();
      for (const b of B) { if (d.has(b) || !seenB.has(b)) continue; if (s.has(b)) T[b].stepsWatched++; else T[b].stepsNot++; }
    }
    // first times
    for (const [a, doing] of now) {
      const d = did.get(a.id) || new Set(), s = saw.get(a.id) || new Set();
      for (const b of doing) if (!d.has(b)) { if (seenB.has(b)) { if (s.has(b)) T[b].firstWatched++; else T[b].firstNot++; } T[b].doers++; d.add(b); }
      did.set(a.id, d);
    }
    // who watched: others awake in the same square as a doer
    for (const [a, doing] of now) if (doing.length) {
      for (const b of doing) seenB.add(b);
      for (const [o] of now) if (o !== a && o.x === a.x && o.y === a.y) { const s = saw.get(o.id) || new Set(); for (const b of doing) s.add(b); saw.set(o.id, s); }
    }
  }
  for (const b of B) if (seenB.has(b)) T[b].worldsWithIt++;
  console.error('world', seed, 'done');
}
const rows = [];
for (const b of B) { const x = T[b], rw = x.firstWatched / Math.max(1, x.stepsWatched), rn = x.firstNot / Math.max(1, x.stepsNot);
  rows.push({ behaviour: b, worlds: x.worldsWithIt, doers: x.doers, firstAfterWatching: x.firstWatched, firstNeverWatched: x.firstNot, ratePer1000StepsWatched: +(1000 * rw).toFixed(3), ratePer1000StepsNot: +(1000 * rn).toFixed(3), ratio: rn > 0 ? +(rw / rn).toFixed(2) : null }); }
fs.writeFileSync(out, JSON.stringify({ seeds, days, flags: fl, rows }, null, 1));
for (const r of rows) console.log((Object.keys(fl).join(' ') || 'new copying').padEnd(12), r.behaviour.padEnd(14), 'worlds', r.worlds, '| doers', r.doers, '| first after watching', r.firstAfterWatching, 'never watched', r.firstNeverWatched, '| rate ratio (watched/not)', r.ratio);
