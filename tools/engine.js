// Loads the Genesis engine (src/*.js) so it can run without a browser.
// Used by the tests, the experiment runner and the build script.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORDER = fs
  .readFileSync(path.join(ROOT, 'src', 'ORDER'), 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

function engineSource() {
  return ORDER.map((n) => fs.readFileSync(path.join(ROOT, 'src', n + '.js'), 'utf8')).join('\n');
}

const API = `
return {
  setSeed, reset, sim, interpret, mind, child, mk, gene, probe, replay, remember, forward, NM, NA, NH,
  idx, inb, dxw, isNightAt, tempAt, updateClimate, iced, liquid, growth, coldOf, heatOf, W, H,
  forest: () => ({ tree, fruit, fkind, tcap, meanTemp, cover }),
  wx: () => ({ HUM, CLD, RAIN, MOIST, PUD, PW, CONV, THUNDER, STRIKES, capacity, wetness, drinkable }),
  setTick: (t) => { tick = t; updateClimate(); },
  whisper: (a, text) => { a.wh = text; },
  watch: (a) => { sel = a; },
  state: () => ({ deaths, ag, tick, logs, fished, kills, maxGen, nLessons, over, water, deep, food, pit, poison, rock, salt, river }),
  items: () => ({ stone, stick, flake, nut, lying, nutCap }),
  alt: () => alt,
  sense, SP, DAY, TY, IB, HB, NCH, A_STAY, A_EAT, A_SLEEP, A_GIVE, A_TAKE, A_DROP, A_STRIKE, O3, NI,
};`;

// Returns a fresh, independent world: every call gets its own copy of all engine state.
function createEngine() {
  return new Function(engineSource() + '\n' + API)();
}

module.exports = { createEngine, engineSource, ORDER, ROOT };
