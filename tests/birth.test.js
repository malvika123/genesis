const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

test('a baby is carried for the whole pregnancy and born only when it is due', () => {
  const E = createEngine();
  E.setSeed(11);
  E.reset({ predators: 0 });
  const st = E.state(),
    mom = st.ag.find((o) => o.sp === 0 && o.sex && o.age >= o.S.smat),
    dad = st.ag.find((o) => o.sp === 0 && !o.sex && o.age >= o.S.smat);
  assert.ok(mom && dad);
  const gest = Math.round(mom.S.gest);
  // early hominins (the default): a chimpanzee's 225–230 days, about 0.62 of a three-day year; people nine months
  assert.ok(gest > E.DAY * 1.5, 'a pregnancy lasts over a day and a half here (about seven and a half months of a three-day year)');
  mom.preg = { due: st.tick + gest, dad, gen: 1, young: [{ sex: 1, g: E.child(mom, dad) }], cost: 22 };
  const before = st.ag.filter((o) => o.mom === mom).length;
  for (let i = 0; i < gest - 2; i++) {
    mom.e = mom.w = 90;
    mom.hp = 100;
    E.sim();
  }
  assert.strictEqual(E.state().ag.filter((o) => o.mom === mom).length, before, 'not born early');
  assert.ok(mom.preg, 'still pregnant');
  for (let i = 0; i < 4; i++) {
    mom.e = mom.w = 90;
    mom.hp = 100;
    E.sim();
  }
  assert.ok(!mom.preg, 'gave birth');
  if (!mom.dead) assert.strictEqual(E.state().ag.filter((o) => o.mom === mom).length, before + 1, 'one baby');
});

test('kinds carry their young as long as the real animals do', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({});
  const ppl = E.state().ag.find((o) => o.sp === 0).S.gest,
    fish = E.state().ag.find((o) => o.sp === 3).S.gest;
  assert.ok(ppl > fish * 20);
});

test('no person is born before a whole pregnancy has passed, and the log never says so', () => {
  const E = createEngine();
  E.setSeed(4);
  E.reset({});
  const first = Math.round(E.state().ag.find((o) => o.sp === 0).S.gest);
  for (let i = 0; i < first - 1; i++) E.sim();
  const st = E.state();
  // (the band starts with children of all ages and their mothers; a baby is someone born since the start)
  assert.ok(!st.ag.some((o) => o.sp === 0 && o.mom && o.age < first - 1), 'no babies yet');
  assert.ok(!st.events.some((e) => /was born to|had a baby|had twins/.test(e.s)), 'and no birth in the log');
});

// An inborn pull toward a ready partner (Wallen 2001): with it, ready adults beside each other conceive
// sooner than when mating must be found by chance and learned.
test('ready adults are drawn to mate: conception comes sooner with the inborn pull', () => {
  const wait = (lust) => {
    const E = createEngine();
    E.setSeed(6);
    E.reset({ predators: 0, people: 60, lust });
    const ad = E.state().ag.filter((a) => a.sp === 0 && a.age >= a.S.smat && a.age < a.lf * a.S.fert),
      women = ad.filter((a) => a.sex),
      when = new Map();
    for (let t = 0; t < E.DAY; t++) {
      for (const a of ad) if (!a.preg) Object.assign(a, { cd: 0, e: 95, w: 95 });
      E.sim();
      for (const w of women) if (w.preg && !when.has(w)) when.set(w, t);
    }
    return women.reduce((s, w) => s + (when.has(w) ? when.get(w) : E.DAY), 0) / women.length;
  };
  const without = wait(0),
    withPull = wait(3);
  assert.ok(withPull < without, 'steps to conception with the pull ' + withPull.toFixed(1) + ', without ' + without.toFixed(1));
});

// Wild chimpanzees have no menopause (Emery Thompson et al. 2007): an early hominin stays fertile to the end of
// its life; modern people stop at about 60% of theirs.
test('early hominins stay fertile for life; people stop at about 60% of theirs', () => {
  const fertileLate = (cfg) => {
    const E = createEngine();
    E.setSeed(3);
    E.reset(Object.assign({ predators: 0 }, cfg));
    const w = E.state().ag.find((a) => a.sp === 0 && a.sex);
    Object.assign(w, { lf: 50 * E.TY, age: 40 * E.TY, cd: 0, e: 95, w: 95, asleep: false, preg: null });
    E.sim();
    return w.age < w.lf * w.S.fert;
  };
  assert.strictEqual(fertileLate({}), true, 'a hominin of 40, with a life of 50, can still conceive');
  assert.strictEqual(fertileLate({ humanFertility: true }), false, 'under the old rule she could not');
  const at = (age) => {
    const E = createEngine();
    E.setSeed(3);
    E.reset({ predators: 0 });
    const w = E.state().ag.find((a) => a.sp === 0 && a.sex);
    Object.assign(w, { lf: 60 * E.TY, age: age * E.TY, cd: 0, e: 95, w: 95, asleep: false, preg: null });
    E.sim();
    return w.rd;
  };
  assert.strictEqual(at(53), false, 'but not past about 50, as in wild chimpanzees');
});
