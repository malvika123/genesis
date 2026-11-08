const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

function person() {
  const E = createEngine();
  E.setSeed(9);
  E.reset({ predators: 0 });
  const s = E.state(),
    p = s.ag.find((a) => a.sp === 0),
    i = E.idx(p.x, p.y);
  Object.assign(p, { asleep: false, sl: 0, e: 30, w: 90, hand: 0 });
  E.forest().fruit[i] = 0;
  return { E, s, p, i };
}
const eatFor = (E, p, n) => {
  p.lw.fill(0, 0, E.NA * E.NI);
  p.lw[E.A_EAT * E.NI + E.IB + 11] = 60;
  const x = p.x, y = p.y;
  for (let k = 0; k < n; k++) {
    Object.assign(p, { x, y, asleep: false, sl: 0 });
    E.sim();
  }
};

test('people cannot live on grass: chewing it gives almost nothing', () => {
  const { E, s, p, i } = person();
  E.items().ROOT[i] = 0;
  s.food[i] = 1;
  const e0 = p.e;
  eatFor(E, p, 8);
  assert.ok(p.e < e0 + 3, 'energy hardly rose: ' + (p.e - e0).toFixed(1));
});

test('roots dug up with a stick feed a person', () => {
  const { E, s, p, i } = person();
  s.food[i] = 0;
  E.items().ROOT[i] = 0.5;
  p.hand = 2;
  const e0 = p.e;
  eatFor(E, p, 12);
  assert.ok(p.e > e0 + 10, 'energy rose: ' + (p.e - e0).toFixed(1));
});
