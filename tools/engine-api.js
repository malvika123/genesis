// What the Genesis engine shows to the outside (tests, experiments, the Lab page), and how an engine is
// built from the source of src/*.js. Shared by tools/engine.js (Node) and ui/lab-worker.js (browser).
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(function (root, make) {
  if (typeof module === 'object' && module.exports) module.exports = make();
  else root.GenesisEngineAPI = make();
})(typeof self !== 'undefined' ? self : this, function () {
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
  function build(src, opts = {}) {
    if (opts.brain) {
      const n = Math.max(16, Math.round(opts.brain));
      src = src.replace('NH = 64,', 'NH = ' + Math.max(64, n) + ',').replace('hmax: 64,', 'hmax: ' + n + ',');
    }
    return new Function(src + '\n' + API)();
  }
  return { API, build };
});
