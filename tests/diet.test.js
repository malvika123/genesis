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
  E.forest().tree[i] = 0; // open grassland: no leaves to browse either
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

// Leaves (patch 5 of the hominin plan): early hominins, like chimpanzees, get some food from young leaves
// when there is no fruit, less than from fruit; modern people get nothing from them.
function leafEater(cfg) {
  const E = createEngine();
  E.setSeed(9);
  E.reset(Object.assign({ predators: 0 }, cfg));
  const s = E.state(),
    p = s.ag.find((a) => a.sp === 0);
  Object.assign(p, { asleep: false, sl: 0, e: 30, w: 90, hand: 0 });
  const i = E.idx(p.x, p.y);
  E.forest().tree[i] = 0.8;
  E.forest().fruit[i] = 0;
  E.items().ROOT[i] = 0;
  E.items().nut[i] = 0;
  s.food[i] = 0;
  return { E, s, p, i };
}
test('early hominins get some food from leaves; modern people none', () => {
  const gain = (cfg) => {
    const { E, p, i } = leafEater(cfg);
    const e0 = p.e;
    eatFor(E, p, 6);
    void i;
    return p.e - e0;
  };
  const hom = gain({}),
    sap = gain({ sapiens: true }),
    off = gain({ leaves: false });
  assert.ok(hom > sap + 20, 'hominin ' + hom.toFixed(1) + ' vs sapiens ' + sap.toFixed(1));
  assert.ok(hom > off + 20, 'hominin ' + hom.toFixed(1) + ' vs no leaves ' + off.toFixed(1));
});

// Grass is not food for hominins, so a hungry one does not see a meadow as food (it did until 11 Nov 2026).
test('hungry hominins do not see grass as food; fruit they do', () => {
  const seen = (cfg, put) => {
    const E = createEngine();
    E.setSeed(9);
    E.reset(Object.assign({ predators: 0 }, cfg));
    E.sim(); // builds the map of who is where, which the senses use
    const p = E.state().ag.find((a) => a.sp === 0);
    Object.assign(p, { e: 20, asleep: false, act: 8 }); // hungry, awake, has just looked all around
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const i = E.idx((p.x + dx + E.W) % E.W, Math.max(0, Math.min(E.H - 1, p.y + dy)));
        E.state().food[i] = put === 'grass' ? 1 : 0;
        E.forest().fruit[i] = put === 'fruit' ? 0.6 : 0;
        E.items().ROOT[i] = 0;
      }
    let m = 0;
    for (let k = 0; k < 6; k++) {
      E.sense(p, p.xi, false);
      for (let s = 0; s < 8; s++) m = Math.max(m, p.xi[s * E.NCH + 1]);
    }
    return m;
  };
  assert.strictEqual(seen({}, 'grass'), 0, 'a meadow is not seen as food');
  assert.ok(seen({ grassEye: true }, 'grass') > 0, 'under the old rule it was');
  assert.ok(seen({}, 'fruit') > 0, 'fruit on the trees still is');
});
