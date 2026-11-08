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
  // nobody else eats there
  for (const o of s.ag) if (o !== p && Math.abs(o.x - p.x) < 2 && Math.abs(o.y - p.y) < 2) o.y = (o.y + 20) % E.H;
  E.forest().fruit[i] = 0;
  return { E, s, p, i };
}
const eatFor = (E, p, n) => {
  p.lw.fill(0, 0, E.NA * E.NI);
  p.lw[E.A_EAT * E.NI + E.IB + 11] = 60;
  const x = p.x, y = p.y;
  for (let k = 0; k < n; k++) {
    for (const o of E.state().ag) if (o !== p && Math.abs(o.x - x) < 2 && Math.abs(o.y - y) < 2) o.y = (o.y + 20) % E.H;
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
  eatFor(E, p, 24); // digging succeeds by chance, so give it a few hours
  assert.ok(p.e > e0 + 10, 'energy rose: ' + (p.e - e0).toFixed(1));
});
