const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

// a world run a little so everyone has a brain state, with two people side by side
function pair(seed = 4) {
  const E = createEngine();
  E.setSeed(seed);
  E.reset({ predators: 0 });
  for (let i = 0; i < 4; i++) E.sim();
  const ppl = E.state().ag.filter((a) => a.sp === 0 && !a.dead);
  const [v, o] = ppl;
  o.x = v.x;
  o.y = v.y;
  for (const a of ppl) a.asleep = false;
  return { E, v, o };
}

test('seeing someone hurt is felt as a weaker share of the pain, and as fear', () => {
  const { E, v, o } = pair();
  o.g.im = 1;
  o.bonus[0] = 0;
  o.fear = 0;
  E.social().ouch(v, 0.8, 'berries');
  E.social().watchOthers();
  assert.ok(o.bonus[0] < -0.05 && o.bonus[0] > -0.8, 'a share of the pain: ' + o.bonus[0]);
  assert.ok(o.fear > 0, 'and fear');
});

test('one born feeling little for others feels far less of their pain (gene vf), and nobody far away feels it', () => {
  const { E, v, o } = pair();
  o.g.vf = 1;
  o.bonus[0] = 0;
  E.social().ouch(v, 0.8, 'bitten');
  E.social().watchOthers();
  const social = -o.bonus[0];
  o.g.vf = 0.1;
  o.bonus[0] = 0;
  E.social().ouch(v, 0.8, 'bitten');
  E.social().watchOthers();
  assert.ok(-o.bonus[0] < social / 5, 'unfeeling ' + -o.bonus[0] + ' vs ' + social);
  o.g.vf = 1;
  o.bonus[0] = 0;
  o.y = (v.y + 30) % E.H;
  E.social().ouch(v, 0.8, 'bitten');
  E.social().watchOthers();
  assert.strictEqual(o.bonus[0], 0);
});

test('learner traits are inherited and stay in range', () => {
  const { E, v, o } = pair();
  for (let i = 0; i < 200; i++) {
    const g = E.child(v, o);
    assert.ok(g.pb >= 0 && g.pb <= 1 && g.cf >= 0 && g.cf <= 1 && g.im >= 0.05 && g.im <= 3);
  }
});
