// Genesis — do discoveries spread? For each behaviour that can be seen in one hominin (cracking nuts with a stone, digging roots
// with a stick, eating fire-cooked food, picking up a burning stick, eating meat, cutting meat with a sharp stone): who did it and
// when, and who was in the same square, awake, when someone did it (watched). Then the rate at which hominins do it for the first
// time, among those who had watched it and those who never had (a simple form of the logic of network-based diffusion analysis:
// Franz & Nunn 2009). Run with the new copying and with --copy-moves: sharing a place raises both alike, so a larger gap with the
// new copying is the sign that watching itself passes the behaviour on (research log entry 54).
// Usage (from the genesis folder): node tools/analysis/spread.js SEEDS DAYS OUT.json [switches]
// Fixed 13 Nov 2026: reads the current list of creatures each step (Genesis makes a new list as creatures are born and die;
// before, a list saved at the start was read, so only founders were seen — research log entry 57).
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const seeds = process.argv[2].split(',').map(Number), days = +process.argv[3], out = process.argv[4];
const fl = {}, opt = {};
for (const v of process.argv.slice(5)) {
  if (!v.startsWith('--')) continue;
  const [k, val] = v.slice(2).split('=');
  if (k === 'plant' || k === 'born-only') opt[k] = val === undefined ? true : val; // options of this tool, not of the world
  else fl[k] = true;
}
// A planted pretend behaviour (validation, second review finding 2): it lives alongside the real world and moves with the real
// hominins. Each hominin without it picks it up alone with chance PB a step, and — only with --plant=S — with an extra chance S a step
// while it has watched a holder do it; holders "do" it with chance 0.05 a step. With S = 0 watching does nothing (negative control);
// with S > 0 it spreads only by watching (positive control). Its own random numbers, so the world is untouched.
// --plant=S or --plant=S:B (B: chance a step of picking it up alone; default 0.00002)
const PS = opt.plant === undefined ? null : +String(opt.plant).split(':')[0], PB = opt.plant !== undefined && String(opt.plant).includes(':') ? +String(opt.plant).split(':')[1] : 0.00002;
let pr = 1;
const prand = () => ((pr = (Math.imul(pr, 1664525) + 1013904223) >>> 0) / 4294967296);
const B = ['nuts', 'stick digging', 'cooked food', 'burning stick', 'meat', 'cutting meat', 'planted'];
const PW = {}; // per world: rate ratio for each behaviour
const T = {}; for (const b of B) T[b] = { stepsWatched: 0, stepsNot: 0, firstWatched: 0, firstNot: 0, doers: 0, worldsWithIt: 0 };
for (const seed of seeds) {
  const S = X.fromArgs(fl), E = createEngine({ brain: S.brain }); E.setSeed(seed); E.reset(S.cfg);
  const st = E.state(), fo = E.forest(), it = E.items(), fi = E.fire(), W = E.W, EAT = 9;
  const did = new Map(), saw = new Map(); // id -> Set of behaviours done / watched
  const W0 = {}; for (const b of B) W0[b] = { sw: 0, sn: 0, fw: 0, fn: 0 };
  const born = new Set(); const holder = new Set(); pr = seed * 7919 + 1;
  for (const a of E.state().ag) if (a.sp === 0 && PS !== null && prand() < 0.15) { holder.add(a.id); did.set(a.id, new Set(['planted'])); } // a few start with it (already have it: their first showing is not a new adopter)
  const seenB = new Set(), seenIds = new Set();
  for (const a of E.state().ag) if (a.sp === 0) seenIds.add(a.id);
  for (let t = 0; t < days * E.DAY; t++) {
    const pre = new Map();
    for (const a of E.state().ag) if (a.sp === 0 && !a.dead && !did.has(a.id) && t > 0 && !saw.has(a.id) && !seenIds.has(a.id)) born.add(a.id);
    for (const a of E.state().ag) if (a.sp === 0 && !a.dead) { seenIds.add(a.id); const h = a.y * W + ((a.x % W) + W) % W; pre.set(a, { nuts: a.nuts || 0, hand: a.hand, root: it.ROOT[h] > 0.05, cook: fi.COOK[h] > 0.05, meat: !!it.meatAt(a.x, a.y, 0) }); }
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
      if (PS !== null) {
        if (holder.has(a.id)) { if (prand() < 0.05) doing.push('planted'); }
        else { const s0 = saw.get(a.id); if (prand() < PB + (s0 && s0.has('planted') ? PS : 0)) { holder.add(a.id); doing.push('planted'); } }
      }
      if (t > 0 && !pre.has(a)) born.add(a.id);
      now.push([a, doing]);
    }
    // at risk this step: awake hominins who have never done b, split by whether they had watched it before this step
    for (const [a] of now) {
      const d = did.get(a.id) || new Set(), s = saw.get(a.id) || new Set();
      if (opt['born-only'] && !born.has(a.id)) continue;
      for (const b of B) { if (d.has(b) || !seenB.has(b)) continue; if (s.has(b)) { T[b].stepsWatched++; W0[b].sw++; } else { T[b].stepsNot++; W0[b].sn++; } }
    }
    // first times
    for (const [a, doing] of now) {
      const d = did.get(a.id) || new Set(), s = saw.get(a.id) || new Set();
      const counted = !opt['born-only'] || born.has(a.id);
      for (const b of doing) if (!d.has(b)) { if (seenB.has(b) && counted) { if (s.has(b)) { T[b].firstWatched++; W0[b].fw++; } else { T[b].firstNot++; W0[b].fn++; } } T[b].doers++; d.add(b); }
      did.set(a.id, d);
    }
    // who watched: others awake in the same square as a doer
    for (const [a, doing] of now) if (doing.length) {
      for (const b of doing) seenB.add(b);
      for (const [o] of now) if (o !== a && o.x === a.x && o.y === a.y) { const s = saw.get(o.id) || new Set(); for (const b of doing) s.add(b); saw.set(o.id, s); }
    }
  }
  for (const b of B) if (seenB.has(b)) T[b].worldsWithIt++;
  for (const b of B) { const w = W0[b], rw = w.fw / Math.max(1, w.sw), rn = w.fn / Math.max(1, w.sn); (PW[b] = PW[b] || []).push(rn > 0 && w.sw > 0 ? +(rw / rn).toFixed(2) : null); }
  console.error('world', seed, 'done');
}
const rows = [];
for (const b of B) { const x = T[b], rw = x.firstWatched / Math.max(1, x.stepsWatched), rn = x.firstNot / Math.max(1, x.stepsNot);
  rows.push({ behaviour: b, worlds: x.worldsWithIt, doers: x.doers, firstAfterWatching: x.firstWatched, firstNeverWatched: x.firstNot, ratePer1000StepsWatched: +(1000 * rw).toFixed(3), ratePer1000StepsNot: +(1000 * rn).toFixed(3), ratio: rn > 0 ? +(rw / rn).toFixed(2) : null }); }
fs.writeFileSync(out, JSON.stringify({ seeds, days, flags: fl, options: opt, rows, perWorld: PW }, null, 1));
for (const r of rows) if (r.doers || r.behaviour !== 'planted') console.log((Object.keys(fl).join(' ') || 'new copying').padEnd(12), r.behaviour.padEnd(14), 'worlds', r.worlds, '| doers', r.doers, '| first after watching', r.firstAfterWatching, 'never watched', r.firstNeverWatched, '| rate ratio (watched/not)', r.ratio);
for (const b of B) { const v = (PW[b] || []).filter((x) => x !== null); if (!v.length) continue; console.log('  per world', b.padEnd(14), JSON.stringify(PW[b]), '| above 1 in', v.filter((x) => x > 1).length, 'of', v.length, 'worlds with a ratio'); }
