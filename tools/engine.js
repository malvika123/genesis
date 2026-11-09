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
  setSeed, reset, sim, interpret, mind, child, mk, gene, perceive, newPerception, testScore, iqTable, probe, replay, remember, forward, NM, NA, NH, OI, hOf, grownUnits, prune, connections, regionOf,
  idx, inb, dxw, isNightAt, tempAt, cellTemp, updateClimate, iced, liquid, growth, coldOf, heatOf, W, H,
  forest: () => ({ tree, fruit, fkind, tcap, meanTemp, cover }),
  wx: () => ({ MOISTY, HUM, CLD, RAIN, MOIST, PUD, PW, CONV, THUNDER, STRIKES, capacity, wetness, drinkable }),
  setTick: (t) => { tick = t; updateClimate(); },
  whisper: (a, text) => { a.wh = text; },
  watch: (a) => { sel = a; },
  state: () => ({ events, SIBS, WSTAT, firsts, deaths, ag, tick, logs, fished, kills, maxGen, nLessons, over, water, deep, food, pit, cave, poison, rock, salt, river }),
  items: () => ({ soil, rotten, bodies: BODIES, ROOT, meatAt, stone, stick, flake, nut, pyrite, lying, nutCap }),
  talk: () => ({ received, absorb, SND, ambient, WSTAT, acoustics, hearWord, heardAs, spell, wordOf, choicesFor, SNDSTAT, BASE, GENSTAT, meaning, SAYN, HEARD, CALLS }),
  fire: () => ({ FIRE, SMOL, BURNT, COOK, fireStats, BURNING, dryness, fuelOf, ignite, pyrite }),
  alt: () => alt,
  social: () => ({ ouch, watchOthers, imitate, imitateVoice }),
  sense, SP, DAY, TY, IB, HB, NCH, A_STAY, A_EAT, A_SLEEP, A_GIVE, A_TAKE, A_DROP, A_STRIKE, NSAY, NV, HEAR, SPEECH, VG, SEEPT, O3, NI,
};`;

// Returns a fresh, independent world: every call gets its own copy of all engine state.
// opts.brain: the most thinking units a person's brain can grow (64 normally) — for brain-size experiments
function createEngine(opts = {}) {
  let src = engineSource();
  if (opts.brain) {
    const n = Math.max(16, Math.round(opts.brain));
    src = src.replace('NH = 64,', 'NH = ' + Math.max(64, n) + ',').replace('hmax: 64,', 'hmax: ' + n + ',');
  }
  return new Function(src + '\n' + API)();
}

module.exports = { createEngine, engineSource, ORDER, ROOT };
