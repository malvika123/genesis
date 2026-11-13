// Reality tests, layer 2: the hominin body against the evidence (realism audit, gap 2). Sources in docs/ASSUMPTIONS.md.
// Copyright (c) 2026 Malvika Sen. MIT License.
const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('hominin bodies grow with age and males are heavier, inside the fossil ranges', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({});
  const p = E.state().ag.find((o) => o.sp === 0);
  const kg = (age, sex) => {
    p.age = age * E.TY;
    p.sex = sex;
    return E.body(p).kg;
  };
  // adults: A. afarensis / africanus females about 29-30 kg, males about 41-45 (McHenry 1992); species means 25-64 (Jungers et al. 2016)
  for (const sex of [0, 1]) {
    const a = kg(30, sex);
    assert.ok(a >= 24 && a <= 64, 'adult inside the fossil range: ' + a);
  }
  const ratio = kg(30, 0) / kg(30, 1);
  assert.ok(ratio >= 1.2 && ratio <= 1.55, 'males 1.2-1.55 times females (McHenry 1992): ' + ratio);
  // newborns small (chimpanzee about 1.8 kg); about 10 kg at 5 (Gombe, Pusey et al. 2005; stand-in)
  assert.ok(kg(0, 1) < 3, 'a newborn weighs under 3 kg');
  assert.ok(kg(5, 1) > 7 && kg(5, 1) < 13, 'about 10 kg at five');
  // growth never goes backwards
  for (const sex of [0, 1]) for (let y = 0; y < 20; y += 0.5) assert.ok(kg(y + 0.5, sex) >= kg(y, sex), 'grows at ' + y);
});

test('a young infant clings to its mother and travels with her; it nurses only at her side', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ predators: 0 });
  const ppl = E.state().ag.filter((o) => o.sp === 0);
  const mom = ppl.find((o) => o.sex && o.age >= o.S.smat);
  const kid = ppl.find((o) => o !== mom && o.age > 2 * E.TY);
  kid.age = Math.round(0.5 * E.TY); // six months old
  kid.mom = mom;
  mom.kid = kid;
  kid.x = mom.x;
  kid.y = mom.y;
  const sx = mom.x,
    sy = mom.y;
  let moved = 0;
  for (let i = 0; i < 400 && moved < 3; i++) {
    E.sim();
    if (mom.x !== sx || mom.y !== sy) moved++;
    if (!kid.dead && !mom.dead) assert.ok(kid.x === mom.x && kid.y === mom.y, 'the infant is where its mother is (step ' + i + ')');
  }
  // away from her it gets no milk
  kid.x = (mom.x + 3) % E.W;
  kid.e = 50;
  const e0 = kid.e;
  kid.age = Math.round(3 * E.TY); // old enough to walk on its own, still nursing
  E.sim();
  assert.ok(kid.e <= e0 + 1e-9 || kid.x === mom.x, 'no milk from 9 km away');
});
