const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

// a land cell whose daytime temperature is in a range
function cellWhere(E, ok) {
  const st = E.state();
  for (let i = 0; i < E.W * E.H; i++) if (!st.water[i] && !st.rock[i] && ok(E.cellTemp(i, false), E.cellTemp(i, true))) return i;
  return -1;
}

test('insects and microbes eat a body in the warmth, the soil there grows richer; a frozen body keeps', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 0, herbivores: 0, predators: 0, fish: 0 });
  const warm = cellWhere(E, (d, n) => d > 20 && n > 15),
    cold = cellWhere(E, (d) => d < -8);
  assert.ok(warm >= 0 && cold >= 0, 'found a warm and a frozen place');
  const it = E.items(),
    mk = (i) => ({ x: i % E.W, y: (i / E.W) | 0, sp: 1, name: 'Deer', t: 0, cause: 'test', size: 1, w: false, meat: 1 });
  const hot = mk(warm),
    ice = mk(cold);
  it.bodies.push(hot, ice);
  const s0 = it.soil[warm];
  for (let i = 0; i < 20 * E.DAY; i++) E.sim();
  assert.ok(hot.meat < 0.15, 'mostly gone in 20 warm days: ' + hot.meat);
  assert.ok(ice.meat > 0.8, 'kept in the frost: ' + ice.meat);
  assert.ok(E.items().soil[warm] > s0 + 0.1, 'the soil there is richer: ' + E.items().soil[warm]);
  assert.ok(E.items().rotten(hot) && !E.items().rotten(ice));
});
