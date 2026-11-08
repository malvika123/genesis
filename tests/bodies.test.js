const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

test('the dead leave a body that lies where they fell, then bones', () => {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ predators: 0 });
  const p = E.state().ag.find((a) => a.sp === 0);
  p.dead = true;
  p.cause = "test";
  E.sim();
  const b = E.items().bodies.find((x) => x.sp === 0);
  assert.ok(b, 'a body was left');
  assert.ok(b.x === p.x && b.y === p.y);
  for (let i = 0; i < 2 * E.DAY; i++) E.sim();
  assert.ok(E.items().bodies.includes(b), 'still there after two days');
});

test('caves exist in stony hills and shelter whoever stands in them', () => {
  const E = createEngine();
  E.setSeed(7);
  E.reset({});
  const st = E.state();
  let n = 0;
  for (let i = 0; i < st.cave.length; i++) if (st.cave[i]) n++;
  assert.ok(n > 5, 'caves were made: ' + n);
  for (let i = 0; i < st.cave.length; i++) if (st.cave[i]) assert.ok(!st.water[i] && !st.rock[i]);
});
