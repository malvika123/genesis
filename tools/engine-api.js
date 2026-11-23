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
  setSeed, reset, sim, era: () => ERA, word, interpret, mind, child, mk, gene, perceive, newPerception, testScore, iqTable, probe, replay, remember, forward, NM, NA, NH, OI, hOf, grownUnits, prune, connections, regionOf,
  idx, inb, dxw, isNightAt, tempAt, cellTemp, updateClimate, iced, liquid, growth, coldOf, heatOf, W, H,
  forest: () => ({ tree, fruit, fkind, tcap, meanTemp, cover }),
  wx: () => ({ MOISTY, HUM, CLD, RAIN, MOIST, PUD, PW, CONV, THUNDER, STRIKES, capacity, wetness, drinkable }),
  setTick: (t) => { tick = t; updateClimate(); },
  whisper: (a, text) => { a.wh = text; },
  watch: (a) => { sel = a; },
  body: (a) => ({ kg: bodyKg(a), size: bodySize(a) }),
  muscle: (a) => ({ kg: musKg(a), strength: strengthOf(a) }),
  state: () => ({ killKg, eatKg, events, SIBS, WSTAT, firsts, DONE, WATCHN, WATCHB, TOGETHER, deaths, ag, tick, logs, fished, kills, maxGen, nLessons, over, water, deep, food, pit, cave, poison, rock, salt, river }),
  items: () => ({ soil, rotten, bodies: BODIES, ROOT, meatAt, stone, stick, flake, nut, pyrite, lying, nutCap }),
  talk: () => ({ received, absorb, SND, ambient, WSTAT, acoustics, hearWord, heardAs, spell, wordOf, choicesFor, SNDSTAT, BASE, GENSTAT, meaning, SAYN, HEARD, CALLS }),
  fire: () => ({ FIRE, SMOL, BURNT, COOK, fireStats, BURNING, dryness, fuelOf, ignite, pyrite }),
  alt: () => alt,
  prey: () => ({ PREY, PCAP, PARK, PREYSTAT, preyTotal: () => preyTotal() }),
  social: () => ({ ouch, watchOthers, imitate, imitateVoice }),
  sense, SP, DAY, TY, IB, HB, NCH, A_STAY, A_EAT, A_SLEEP, A_GIVE, A_TAKE, A_DROP, A_STRIKE, A_CLIMB, NSAY, NV, HEAR, SPEECH, VG, SEEPT, O3, NI,
};`;

  // Returns a fresh, independent world: every call gets its own copy of all engine state.
  // opts.brain: the most thinking units a person's brain can grow (64 normally) — for brain-size experiments
  // opts.valley = { W, H, lat }: the valley engine (entry 117, docs/design/valley-spec.md): a separate grid (squares of 250 m), no east-west wrap (the edge is a wall),
  // one latitude (lat: -1 north pole ... +1 south pole; Gona about 11 N = -0.122) and one local time for every column. The globe engine is built when it is not given: identical.
  function valleySource(src, v) {
    const swap = (a, b) => {
      if (src.split(a).length !== 2) throw new Error('valley variant: pattern not found exactly once: ' + a.slice(0, 50));
      src = src.replace(a, () => b);
    };
    swap('const W = 128,\n  H = 80,', 'const W = ' + v.W + ',\n  H = ' + v.H + ',');
    swap('const wx = (x) => (x >= 0 && x < W ? x : ((x % W) + W) % W),\n  dxw = (d) => (d > W / 2 ? d - W : d < -W / 2 ? d + W : d),', 'const wx = (x) => (x < 0 ? 0 : x >= W ? W - 1 : x),\n  dxw = (d) => d,');
    swap('localTime = (x) => ((tick % DAY) / DAY + wx(x) / W) % 1,', 'localTime = (x) => ((tick % DAY) / DAY + 0.5) % 1,');
    swap('const lat = (y) => ((y + 0.5) / H) * 2 - 1;', 'const lat = (y) => ' + v.lat + ';');
    swap('const latOfRow = (y) => 80 * (1 - (2 * (y + 0.5)) / H);', 'const latOfRow = (y) => ' + (-v.lat * 90) + ';');
    return src;
  }
  function build(src, opts = {}) {
    if (opts.valley) src = valleySource(src, opts.valley);
    if (opts.brain) {
      const n = Math.max(16, Math.round(opts.brain));
      src = src.replace('NH = 64,', 'NH = ' + Math.max(64, n) + ',').replace('hmax: 64,', 'hmax: ' + n + ',');
    }
    return new Function(src + '\n' + API)();
  }
  return { API, build };
});
