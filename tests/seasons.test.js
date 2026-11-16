// The fruit calendar (entry 89): its year is Uvinza's real rainfall, and fruit ripens most in the dry months.
// Copyright (c) 2026 Malvika Sen. MIT License.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { engineSource } = require('../tools/engine');
const E = new Function(engineSource() + '\nreturn { UVINZA, FRUITCAL, fruitMonth, setTick: (t) => { tick = t; } , TY };')();

test("the calendar's year is Uvinza's rainfall, month by month", () => {
  const rows = fs.readFileSync(path.join(__dirname, '../data/reference/uvinza-rain.csv'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).slice(1).map((l) => l.split(',').slice(1).map(Number));
  const m = new Array(12).fill(0).map((_, k) => rows.reduce((s, r) => s + r[k], 0)),
    t = m.reduce((a, b) => a + b, 0);
  m.forEach((v, k) => assert.ok(Math.abs(v / t - E.UVINZA[k]) < 0.0001, 'month ' + (k + 1)));
});

test('fruit ripens most in the dry months and least in the rains; the year averages to 1', () => {
  const C = E.FRUITCAL;
  assert.ok(Math.abs(C.reduce((a, b) => a + b, 0) / 12 - 1) < 1e-9);
  const dry = [5, 6, 7].map((k) => C[k]), wet = [11, 0, 2].map((k) => C[k]); // June-August vs December-March
  assert.ok(Math.min(...dry) > 3 * Math.max(...wet));
});

test("north and south are six months apart; the south's midsummer is December", () => {
  E.setTick(Math.round(0.75 * E.TY));
  assert.equal(E.fruitMonth(false), 11);
  assert.equal(E.fruitMonth(true), 5);
});
