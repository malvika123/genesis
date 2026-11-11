// Tests for the Genesis engine. Run with:  npm test   (or: node --test tests/*.test.js)
//
// These pin down behaviour that should never silently break: the world builds, it is reproducible,
// creatures stay inside the rules of their bodies, and the decisions we made about the world hold.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

const PEOPLE = 0,
  HERBIVORE = 1,
  PREDATOR = 2,
  FISH = 3;
const days = (E, n) => {
  for (let t = 0; t < n * E.DAY; t++) E.sim();
};
const count = (E, sp) => E.state().ag.filter((a) => a.sp === sp).length;

test('a new world has the creatures that were asked for', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({ people: 4, herbivores: 5, predators: 2, fish: 6 });
  assert.equal(count(E, PEOPLE), 4);
  assert.equal(count(E, HERBIVORE), 5);
  assert.equal(count(E, PREDATOR), 2);
  assert.equal(count(E, FISH), 6);
});

test('the same seed gives exactly the same world', () => {
  const snap = () => {
    const E = createEngine();
    E.setSeed(42);
    E.reset({ people: 4 });
    days(E, 3);
    const s = E.state();
    return (
      JSON.stringify(s.ag.map((a) => [a.sp, a.x, a.y, +a.e.toFixed(6)])) +
      s.food.reduce((t, f) => t + f, 0).toFixed(6)
    );
  };
  assert.equal(snap(), snap());
});

test('creatures stay inside the rules of their bodies', () => {
  const E = createEngine();
  E.setSeed(7);
  E.reset({ people: 6 });
  for (let t = 0; t < 12 * E.DAY; t++) {
    E.sim();
    if (t % 24) continue;
    const s = E.state();
    for (const a of s.ag) {
      for (const v of [a.e, a.w, a.hp, a.sl, a.lo, a.fear])
        assert.ok(Number.isFinite(v), 'a body value became NaN');
      assert.ok(a.x >= 0 && a.x < E.W && a.y >= 0 && a.y < E.H, 'creature left the map');
      if (a.sp === FISH) assert.equal(s.water[a.y * E.W + a.x], 1, 'a fish is out of the water');
      assert.ok(a.lw.every(Number.isFinite), 'a brain weight became NaN');
    }
  }
});

test('children and teenagers can never mate; adults can', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 8, predators: 0 });
  const people = E.state().ag.filter((a) => a.sp === PEOPLE);
  const smat = people[0].S.smat; // the mating age of this world's people (early hominins: 14 years)
  people.forEach((a, i) => {
    a.age = smat - E.TY * (1 + (i % 3));
    a.found = false;
    a.e = 95;
    a.w = 95;
  });
  for (let t = 0; t < 2 * E.DAY; t++) {
    E.sim();
    for (const a of E.state().ag)
      if (a.sp === PEOPLE && a.age < smat)
        assert.equal(a.rd, false, 'a person under the mating age wanted to mate');
  }
  assert.equal(E.state().maxGen, 0, 'a baby was born to parents under the mating age');
  for (const a of people) {
    a.age = smat + 4 * E.TY;
    a.cd = 0;
    a.e = 95;
    a.w = 95;
    a.asleep = false;
  }
  E.sim();
  assert.ok(
    E.state().ag.some((a) => a.sp === PEOPLE && a.rd),
    'no healthy adult was ready to mate'
  );
});

test('a hungry plant-eater on good grass eats and gains energy', () => {
  const E = createEngine();
  E.setSeed(11);
  E.reset({ people: 2, herbivores: 12, predators: 0, fish: 0 });
  E.sim();
  const s = E.state(),
    { tree } = E.forest();
  let gained = 0,
    tried = 0;
  for (const a of s.ag.filter((x) => x.sp === HERBIVORE)) {
    // lush grass all around it, no trees, no berries
    for (let dy = -2; dy <= 2; dy++)
      for (let dx = -2; dx <= 2; dx++) {
        const y = a.y + dy;
        if (y < 0 || y >= E.H) continue;
        const i = y * E.W + ((a.x + dx + E.W) % E.W);
        if (s.water[i]) continue;
        s.food[i] = 1;
        s.poison[i] = 0;
        tree[i] = 0;
      }
    a.e = 30;
    a.w = 90;
    a.asleep = false;
    a.found = false;
    a.fd = 0;
    tried++;
  }
  const before = s.ag.filter((x) => x.sp === HERBIVORE).map((a) => [a, a.e]);
  for (let t = 0; t < 16; t++) E.sim();
  // a big animal regains a smaller share of its (much larger) reserves per mouthful than a rabbit
  for (const [a, e0] of before) if (!a.gone && a.e > e0 + 0.05) gained++;
  assert.ok(
    gained >= tried * 0.6,
    `only ${gained} of ${tried} hungry plant-eaters on lush grass gained energy`
  );
});

test('loneliness only exists after meeting someone', () => {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ people: 6 });
  for (let t = 0; t < 6 * E.DAY; t++) {
    E.sim();
    for (const a of E.state().ag)
      if (!a.metAny) assert.equal(a.lo, 0, 'a creature that never met anyone felt lonely');
  }
});

test("a child inherits its parents' inborn wiring, but not what they learned", () => {
  const E = createEngine();
  E.setSeed(9);
  E.reset({ people: 2 });
  const [p, q] = E.state().ag.filter((a) => a.sp === PEOPLE);
  const i = 123;
  p.lw = Float32Array.from(p.g.w);
  q.lw = Float32Array.from(q.g.w);
  // Every inborn weight comes from one parent or the other (apart from rare mutations).
  const c0 = E.child(p, q);
  let same = 0;
  for (let k = 0; k < c0.w.length; k++) if (c0.w[k] === p.g.w[k] || c0.w[k] === q.g.w[k]) same++;
  assert.ok(same / c0.w.length > 0.9, 'too many inborn weights were not from either parent');
  // A habit both parents learned strongly is not in the child's genes (only by copying them, in life).
  p.lw[i] = p.g.w[i] + 2;
  q.lw[i] = q.g.w[i] + 2;
  let passed = 0;
  for (let n = 0; n < 400; n++) {
    const c = E.child(p, q);
    const extra = Math.min(...[p.g.w[i], q.g.w[i]].map((b) => Math.abs(c.w[i] - b)));
    if (extra > 1) passed++;
  }
  assert.ok(passed < 8, `a learned habit leaked into the genes ${passed}/400 times`);
});

test('whispers are understood by meaning, and never read "don\'t eat berries" as "don\'t eat"', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({ people: 2 });
  const person = E.state().ag.find((a) => a.sp === PEOPLE);
  const herbivore = E.state().ag.find((a) => a.sp === HERBIVORE);
  const read = (t, a = person) => E.interpret(t, a).useful.map((f) => (f.neg ? 'not ' : '') + f.k);
  assert.deepEqual(read('There is water to the north'), ['water']);
  assert.equal(E.interpret('There is water to the north', person).dir, 6);
  assert.deepEqual(read('Never eat the red berries'), ['not berries']);
  assert.deepEqual(read('Feed your little ones when they are hungry'), ['share']);
  assert.deepEqual(read('Stay away from the hunters'), ['not danger']);
  assert.deepEqual(read('the stars are beautiful tonight'), []);
  assert.deepEqual(
    read('You could catch the fish', herbivore),
    [],
    'a herbivore should not understand fishing'
  );
});

test('a whisper reaches the creature and becomes its own thought', () => {
  const E = createEngine();
  E.setSeed(4);
  E.reset({ people: 4 });
  const a = E.state().ag.find((x) => x.sp === PEOPLE);
  E.whisper(a, 'You could catch the fish in the river');
  for (let t = 0; t < 3 * E.DAY && a.wh; t++) E.sim();
  assert.equal(a.wh, null, 'the whisper never arrived');
  assert.equal(a.hunch.text, 'I could catch the fish in the river');
  assert.ok(E.state().logs.some((l) => l.includes('I could catch the fish')));
});

test('the mind readout reflects the real network', () => {
  const E = createEngine();
  E.setSeed(6);
  E.reset({ people: 4 });
  const a = E.state().ag.find((x) => x.sp === PEOPLE);
  E.watch(a);
  days(E, 1);
  const sum = [...a.z].reduce((t, p) => t + p, 0);
  assert.ok(Math.abs(sum - 1) < 1e-4, 'action probabilities do not add up to 1');
  assert.ok(a.mind && a.mind.opts.length === 4);
  const top = Math.max(...a.z);
  assert.ok(Math.abs(a.mind.opts[0][1] - top) < 1e-6, "the top option shown is not the network's top option");
});

// Patch 6 of the hominin plan: early hominins live among the animals of East Africa 2.5 million years ago;
// modern people (and --ice-animals) among the ice-age ones.
test('with --africa-animals, early hominins share their world with antelopes, hyenas, leopards and sabre-tooths; modern people keep deer and wolves', () => {
  const kinds = (cfg) => {
    const E = createEngine();
    E.setSeed(4);
    E.reset(cfg);
    return new Set(E.state().ag.filter((a) => a.sp === 1 || a.sp === 2).map((a) => a.S.n));
  };
  const hom = kinds({ africaAnimals: true }),
    sap = kinds({ sapiens: true, africaAnimals: true }),
    ice = kinds({});
  for (const n of ['Antelope', 'Hyena']) assert.ok(hom.has(n), 'hominin world has ' + n + ': ' + [...hom]);
  for (const n of ['Deer', 'Wolf', 'Bison', 'Bear']) assert.ok(!hom.has(n), 'no ' + n + ' among hominins');
  assert.ok(sap.has('Deer') && sap.has('Wolf'), 'modern people among deer and wolves: ' + [...sap]);
  assert.ok(ice.has('Deer') && !ice.has('Antelope'), 'by default (until hunters and prey are balanced) the ice-age animals: ' + [...ice]);
  const E = createEngine();
  E.setSeed(4);
  E.reset({ africaAnimals: true });
  const leopard = E.state().ag.find((a) => a.S.n === 'Leopard'),
    hyena = E.state().ag.find((a) => a.S.n === 'Hyena');
  if (leopard) assert.ok(leopard.S.climb, 'leopards climb');
  if (hyena) assert.ok(!hyena.S.climb && hyena.S.allBreed, 'hyenas do not climb, and every female breeds');
});

// Flight as primates do: afraid, with a hunter in sight, a hominin under a big tree feels a pull to climb it (vervets,
// baboons, chimpanzees). Climbing is its own choice, so not every one climbs every time; but with the pull they climb
// more often than without it.
test('afraid hominins with a hunter in sight are more likely to choose to climb with the inborn pull than without', () => {
  // the brain's own chance of choosing to climb (each step's choice is still its own)
  const chance = (seed, cfg) => {
    const E = createEngine();
    E.setSeed(seed);
    E.reset(Object.assign({}, cfg));
    const st = E.state(),
      hs = st.ag.filter((a) => a.sp === 0 && a.age >= a.S.mat).slice(0, 8),
      c = st.ag.find((a) => a.sp === 2);
    let sum = 0,
      n = 0;
    for (const h of hs)
      for (let t = 0; t < 5; t++) {
        Object.assign(h, { fear: 0.8, sl: 0, asleep: false, e: 90, w: 90, up: false });
        E.forest().tree[E.idx(h.x, h.y)] = 0.8;
        Object.assign(c, { x: (h.x + 1) % E.W, y: h.y, asleep: false, e: 100 }); // close enough to sense
        E.sim();
        sum += h.z[E.A_CLIMB];
        n++;
      }
    return sum / n;
  };
  for (const seed of [3, 5, 7, 9]) {
    const pull = chance(seed, {}),
      none = chance(seed, { oldFlight: true });
    assert.ok(pull > none, 'world ' + seed + ': chance to climb ' + pull.toFixed(3) + ' with the pull, ' + none.toFixed(3) + ' without');
  }
});
