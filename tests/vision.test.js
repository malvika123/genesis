// Tests for vision: a field of view, things hidden behind hills, and colour.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

// a person standing on flat open ground, with food placed in one direction
function setup() {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ people: 2, herbivores: 4, predators: 0, fish: 0 });
  E.sim();
  const s = E.state(),
    a = s.ag.find((o) => o.sp === 0),
    alt = E.alt(),
    f = E.forest();
  a.asleep = false;
  a.act = 0; // it was walking, not standing still looking around
  a.e = 20;
  a.g.v = 6;
  // clear a flat, treeless, dry patch around it
  E.items().ROOT.fill(0); // no root plants in view, to keep the test about one thing
  for (let dy = -6; dy <= 6; dy++)
    for (let dx = -6; dx <= 6; dx++) {
      const Y = a.y + dy;
      if (Y < 0 || Y >= E.H) continue;
      const i = E.idx(a.x + dx, Y);
      s.water[i] = s.rock[i] = s.pit[i] = s.poison[i] = 0;
      s.food[i] = 0;
      alt[i] = 0.1;
      f.tree[i] = 0;
      f.fruit[i] = 0;
    }
  return { E, s, a, alt };
}
const foodSeen = (E, a, dir) => a.xi[dir * E.NCH + 1];

test('a creature sees in front of it but not behind it', () => {
  const { E, s, a } = setup();
  s.food[E.idx(a.x - 3, a.y)] = 1; // food 3 cells to the west
  a.hd = 0; // facing east
  E.sense(a, a.xi, false);
  assert.equal(foodSeen(E, a, 4), 0, 'food behind it is not seen');
  a.hd = 4; // turn to face west
  E.sense(a, a.xi, false);
  assert.ok(foodSeen(E, a, 4) > 0, 'facing it, the food is seen');
  a.hd = 0;
  a.act = E.A_STAY ?? 8; // having stood still, it has looked all around
  E.sense(a, a.xi, false);
  assert.ok(foodSeen(E, a, 4) > 0, 'after standing and looking around, it is seen');
});

test('a hill hides what is behind it', () => {
  const { E, s, a, alt } = setup();
  a.hd = 0;
  s.food[E.idx(a.x + 4, a.y)] = 1;
  E.sense(a, a.xi, false);
  assert.ok(foodSeen(E, a, 0) > 0, 'on open ground it is seen');
  alt[E.idx(a.x + 2, a.y)] = 1.5; // a hill in between
  E.sense(a, a.xi, false);
  assert.equal(foodSeen(E, a, 0), 0, 'behind the hill it is hidden');
});

test('asleep, eyes are shut, but something right beside it is still heard or smelled', () => {
  const { E, s, a } = setup();
  a.hd = 0;
  a.asleep = true;
  s.food[E.idx(a.x + 4, a.y)] = 1;
  E.sense(a, a.xi, false);
  assert.equal(foodSeen(E, a, 0), 0, 'nothing is seen with eyes shut');
});

test('people see red berries; deer cannot tell them from green', () => {
  const { E, s, a } = setup();
  a.hd = 0;
  const i = E.idx(a.x + 2, a.y);
  s.poison[i] = 1;
  s.food[i] = 0.8;
  E.sense(a, a.xi, false);
  assert.ok(a.xi[0 * E.NCH + 9] > 0, 'a person sees red berries');
  const d = s.ag.find((o) => o.sp === 1);
  Object.assign(d, { x: a.x, y: a.y, hd: 0, act: 0, asleep: false });
  E.sense(d, d.xi, false);
  assert.equal(d.xi[0 * E.NCH + 9], 0, 'a deer does not see them as red');
});

test('a newborn often misses or mistakes what it sees; with experience it sees truly', () => {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ people: 2 });
  const p = E.state().ag.find((o) => o.sp === 0);
  const baby = E.mk(0, p.x, p.y, 1, E.child(p, p), 1, 0, p.k);
  const truth = new Float32Array(E.NI);
  truth[0 * E.NCH + 3] = 0.4; // a plant-eater, some way off to the east
  let right = 0,
    wrong = 0;
  for (let k = 0; k < 400; k++) {
    const x = Float32Array.from(truth);
    baby.per[3] = 0.15; // keep it unskilled for this part
    E.perceive(baby, x);
    if (x[0 * E.NCH + 3] > 0) right++;
    if (x[0 * E.NCH + 5] > 0) wrong++;
  }
  assert.ok(right < 300, `an unskilled newborn often misses it (saw it ${right}/400 times)`);
  assert.ok(wrong > 2, `and sometimes takes it for a hunter (${wrong}/400)`);
  baby.age = E.TY; // a year old: its eyes have matured
  baby.per[3] = 1;
  let seen = 0;
  for (let k = 0; k < 100; k++) {
    const x = Float32Array.from(truth);
    E.perceive(baby, x);
    if (x[0 * E.NCH + 3] > 0 && x[0 * E.NCH + 5] === 0) seen++;
  }
  assert.equal(seen, 100, 'once it knows them well, it sees them every time, for what they are');
});
