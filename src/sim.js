// Genesis — One step of the world: bodies, feelings, rewards, learning, choices, movement, eating, mating, hunting and death.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- world step ----------
function sim() {
  tick++;
  const dn = dayN();
  updateClimate();
  updateWeather();
  updateForest();
  updateItems();
  updateBodies();
  passCalls();
  updateFire();
  for (let i = 0; i < W * H; i++) {
    if (rock[i]) continue;
    // plants need warmth and water
    const tf = (water[i] ? 0.5 : TF[ter[i]] * (1 - 0.35 * tree[i])) * growthAt(i) * wetness(i);
    // grass spreads from what is left above ground, and grazed grass also grows back from its roots,
    // which is why grasslands survive big herds; bare ground only greens again slowly, from seed
    if (food[i] < 1)
      food[i] += (0.006 * food[i] * (1 - food[i]) + 0.0004 + 0.003 * Math.max(0, 0.6 - food[i])) * tf * Math.sqrt(soil[i]);
    if (soil[i] !== 1) soil[i] += (1 - soil[i]) * 0.0002; // settles back slowly, over months
  }
  G = new Array(W * H);
  const pop = [0, 0, 0, 0],
    popK = [];
  for (const a of ag) {
    (G[idx(a.x, a.y)] || (G[idx(a.x, a.y)] = [])).push(a);
    pop[a.sp]++;
    popK[a.k] = (popK[a.k] || 0) + 1;
    const S = a.S;
    a.rd =
      !a.asleep &&
      a.age >= S.smat &&
      a.cd === 0 &&
      !a.preg &&
      a.e > (a.sp === 2 ? 25 : 45) &&
      a.w > 40 &&
      a.age < a.lf * S.fert;
  }
  const kids = [],
    kidsOf = (k) => kids.reduce((t, c) => t + (c.k === k), 0);
  // Lightning: a creature it strikes is badly hurt or killed; the crack of thunder close by startles
  // everyone near (the startle is inborn — babies throw out their arms at a loud noise).
  for (const b of STRIKES)
    if (b.t === tick)
      for (const a of ag) {
        if (a.dead || a.sp === 3) continue;
        const d = Math.hypot(dxw(a.x - b.x), a.y - b.y);
        // a strike lands somewhere in its 3 km square; being hit yourself is very rare
        if (d < 0.5 && rnd() < 0.002) {
          a.hp -= 60;
          a.painA = 1;
          if (a.hp <= 0) {
            a.dead = true;
            a.cause = 'struck by lightning';
          }
          if (a.sp === 0) log(a.name + ' was struck by lightning.');
        } else if (d <= 2) {
          a.fear = Math.min(1, a.fear + 0.6);
          a.painA = Math.min(1, a.painA + 0.15);
          a.ev[0] = 'thunder cracked right over it on day ' + dn;
        }
      }
  for (const a of ag) {
    if (a.dead) continue;
    const S = a.S,
      night = isNightAt(a.x);
    a.age++;
    if (!a.preg) a.cd = Math.max(0, a.cd - 1);
    a.kcd = Math.max(0, a.kcd - 1);
    if (a.preg) pregnancy(a, kids);
    if (a.milk) {
      // nursing costs the mother while her young is alive and still small
      if (a.kid && !a.kid.gone && !a.kid.dead && a.kid.mom === a && a.milk.left > 0) a.e -= a.milk.cost / a.S.cd;
      if (--a.milk.left <= 0 || !a.kid || a.kid.gone) a.milk = null;
    }
    if (tick % DAY === 0) a.fd = 0;
    const young = a.age < S.mat,
      baby = a.age < S.mat * S.wn,
      mom = a.mom && !a.mom.dead && !a.mom.gone ? a.mom : null,
      care = a.found && young && !a.mom; // a founding child with no mother at all (only if a world is set up so)
    const df = (a.asleep ? 0.6 : 1) * (baby ? 1.5 : 1);
    if (baby && mom && dxw(mom.x - a.x) ** 2 + (mom.y - a.y) ** 2 <= 36) {
      a.e = Math.min(100, a.e + 0.12);
      a.w = Math.min(100, a.w + 0.2);
      mom.e -= 0.03;
    } else {
      // a big brain is costly to run: a grown human brain burns a large share of the body's energy
      const brain = a.sp === 0 ? 1 + (0.1 * (a.nh - S.nh)) / Math.max(1, S.hmax - S.nh) : 1;
      a.e -= (S.dE / DAY) * a.g.m * (0.8 + 0.2 * a.g.s + 0.04 * a.g.v) * df * brain;
      a.w -= (S.dW / DAY) * df;
    }
    const fish = a.sp === 3,
      onW = water[idx(a.x, a.y)] === 1 && (fish || !river[idx(a.x, a.y)]), // a river square is mostly bank
      inW = !fish && deep[idx(a.x, a.y)] === 1 && !iced(idx(a.x, a.y)),
      wade = !fish && onW;
    if (fish) a.w = 100;
    if (fish && !onW) {
      a.hp -= 20;
      a.painW = 1;
    }
    // Swimming. Most land mammals swim by instinct — deer, bison, wolves, bears and big cats cross rivers
    // and lakes; rabbits only poorly. People are not born able to: a baby has a diving reflex but cannot
    // swim, and swimming has to be learned, by splashing in the shallows and struggling in deep water,
    // and by watching others. Young children are too weak to keep afloat for long even when they know
    // how (drowning is still among the commonest deaths of small children). Deep water hurts and tires
    // whoever cannot swim; a good swimmer only tires.
    const swim = (a.sp === 0 ? a.swim || 0 : (a.S.swim ?? 0.8)) * (young ? clamp(0.3 + (0.7 * a.age) / S.mat, 0.3, 1) : 1);
    if (inW) {
      a.hp -= 3 * (1 - 0.92 * swim);
      a.painW = Math.min(1, a.painW + 0.35 * (1 - swim));
      a.e -= 0.15 + 0.1 * swim; // swimming is hard work
      if (!a.wasW && swim < 0.5) a.ev[1] = 'it nearly drowned on day ' + dn;
    }
    if (a.sp === 0 && (inW || wade) && !a.asleep) {
      // practice: a little in the shallows, more in deep water; children learn fastest
      const before = a.swim || 0;
      a.swim = Math.min(1, before + (inW ? 0.02 : 0.004) * (young ? 2 : 1) * (1 - before));
      if (before < 0.5 && a.swim >= 0.5 && !firsts.swim) {
        firsts.swim = 1;
        log(a.name + ' can swim now. Nobody taught them.');
      }
      // and those watching close by pick a little up
      if (inW && a.swim > 0.3)
        for (const o of ag)
          if (o !== a && o.sp === 0 && !o.asleep && Math.abs(dxw(o.x - a.x)) <= 1 && Math.abs(o.y - a.y) <= 1)
            o.swim = Math.min(1, (o.swim || 0) + 0.002 * a.swim * (o.g.im ?? 1));
    }
    a.wasW = inW;
    // cold: costs energy, hurts when freezing, and huddling with your own kind helps
    a.cold = coldOf(a, night);
    if (a.cold > 0) {
      let hud = false;
      for (let yy = -1; yy <= 1 && !hud; yy++)
        for (let xx = -1; xx <= 1 && !hud; xx++) {
          const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
          if (l && l.some((o) => o !== a && o.sp === a.sp && !o.dead)) hud = true;
        }
      if (hud) a.cold *= 0.6;
      a.e -= 0.05 * a.cold;
      if (a.cold > 0.7) a.hp -= (0.12 * (a.cold - 0.7)) / 0.3;
      if (a.cold > 0.6 && !a.wasCold) a.ev[8] = 'it was freezing on day ' + dn;
    }
    a.wasCold = a.cold > 0.6;
    // heat: sweating and panting cost water, and it is dangerous when extreme
    a.heat = heatOf(a, night);
    if (a.heat > 0) {
      a.w -= 0.05 * a.heat * (a.sp === 0 ? 1.5 : 1);
      if (a.heat > 0.7) a.hp -= (0.12 * (a.heat - 0.7)) / 0.3;
      if (a.heat > 0.6 && !a.wasHot) a.ev[8] = 'it was overheating on day ' + dn;
    }
    a.wasHot = a.heat > 0.6;
    // fire burns: standing in a burning square hurts, and can kill
    const burn = FIRE[idx(a.x, a.y)];
    if (burn > 0.03 && !fish) {
      a.hp -= 10 * burn;
      a.painA = Math.max(a.painA, 0.9 * burn + 0.2);
      ouch(a, 0.9 * burn + 0.2, 'fire');
      a.ev[0] = 'it was burned by fire on day ' + dn;
      learnSight(a, 15, 0.2);
      if (a.hp <= 0) {
        a.dead = true;
        a.cause = 'burned';
      }
    }
    // a burning stick in the hand burns down, and the rain can put it out
    if (a.hand === 4) {
      a.brand = (a.brand || 0) - 1;
      if (a.brand <= 0 || (RAIN[idx(a.x, a.y)] > 0.004 && rnd() < 0.15)) a.hand = 0;
    }
    // feelings fade: grief over days, anger within hours
    a.grief *= 0.998;
    a.rage *= 0.97;
    a.play *= 0.9;
    if (!a.asleep && a.e > 60 && a.w > 60) a.bored = Math.min(1, a.bored + 0.002);
    if (!inW && a.e > 10 && a.w > 10) a.hp = Math.min(100, a.hp + 0.05);
    a.painA *= 0.97;
    a.painW *= 0.85;
    if (care) {
      a.e = Math.max(a.e, 35);
      a.w = Math.max(a.w, 35);
      a.hp = Math.max(a.hp, 30);
    }
    a.sl = a.asleep
      ? Math.max(0, a.sl - 1 / (S.sleepH * 4))
      : Math.min(1, a.sl + (1 + 0.6 * S.circ * (night ? 1 : -1)) / ((24 - S.sleepH) * 4));
    a.lu =
      a.age >= S.smat && a.age < a.lf * S.fert
        ? clamp(a.lu + (a.cd === 0 && a.e > 45 ? 0.01 : -0.02), 0, 1)
        : 0;
    const bi = (a.y >> 2) * (W >> 2) + (a.x >> 2);
    if (!a.vis[bi]) {
      a.vis[bi] = 1;
      a.vc++;
      a.novel = tick;
      a.bored = 0;
      if (a.age > 5) {
        a.bonus[6] +=
          0.12 * a.g.c * S.cur * (young ? 1.3 : 1) * (a.cuT > tick ? a.cuX : 1) * (1 + 2 * a.bored);
        a.ev[6] = 'it found a new place on day ' + dn;
      }
    }
    if (a.wh && (a.asleep || (a.fear < 0.2 && a.painA < 0.2 && rnd() < 0.02))) deliver(a);
    a.xl.set(a.xi); // what it sensed when it made its last choice
    const lastAct = a.act;
    sense(a, a.xi, night);
    const x = a.xi,
      own = a.sp === 3 ? 8 : a.sp === 1 ? 3 : a.sp === 0 ? 4 : 5;
    if (a.sp === 0 && (tick + a.id) % 4 === 0) tally(BASE, context(a));
    let seeOwn = false;
    for (let s = 0; s < 8; s++) if (x[s * NCH + own] > 0) seeOwn = true;
    if (seeOwn) {
      if (!a.metAny) {
        a.metAny = true;
        if (a.sp === 0 && !a.mom) log(a.name + ' saw another person for the first time.');
      }
      if (a.lo > 0.5 && a.bond > 0.2) {
        a.bonus[7] += 0.1;
        a.ev[7] = 'it found others after being alone on day ' + dn;
      }
      a.bond = Math.min(1, a.bond + 0.004);
      a.lo = Math.max(0, a.lo - 0.05);
    } else {
      a.bond = Math.max(0, a.bond - 0.0002);
      a.lo = Math.min(a.bond, a.lo + 0.0015 * a.bond);
    }
    let fam = 0;
    for (let s = 0; s < 8; s++) fam = Math.max(fam, x[s * NCH + 7]);
    a.pr = a.kid && !a.kid.gone && a.kid.age < S.mat ? fam : 0;
    if (a.pr > 0.5) a.bonus[7] += a.sex ? 0.01 : 0.005;
    if (young && fam > 0.5) a.bonus[7] += 0.005;
    if (S.pair && a.age >= S.smat) pairBond(a);
    if (a.sp !== 3) feelLoss(a, young);
    const hu = 1 - a.e / 100,
      th = 1 - a.w / 100,
      D = [
        a.painA * a.g.b,
        a.painW * a.g.b,
        3 * hu * hu + (a.e < 15 ? 1 : 0),
        3 * th * th + (a.w < 15 ? 1 : 0),
        0.5 * a.sl * a.sl,
        0,
        0,
        S.social * a.g.so * a.lo + 0.8 * a.grief + 0.5 * (a.miss || 0),
        1.5 * (a.cold * a.cold + a.heat * a.heat),
      ];
    let r = 0;
    for (let k = 0; k < 9; k++) {
      a.rk[k] = a.Dp[k] - D[k] + a.bonus[k];
      r += a.rk[k];
      a.Dp[k] = D[k];
      a.bonus[k] = 0;
    }
    RF.fill(0);
    RFV.fill(0);
    // only people have hands
    if (a.sp !== 0) {
      RF[A_TAKE] = RF[A_DROP] = RF[A_STRIKE] = -40;
      RFV[0] = 40; // only people have a voice here
    } else if (!a.asleep) {
      // Two calls are inborn in every human: a baby cries when hungry, hurt or cold, and anyone
      // screams when badly hurt — while still running, since the voice is its own. And a parent is
      // drawn toward the cry of its own young child.
      if (young && (hu > 0.5 || a.painA > 0.3 || a.cold > 0.6)) RFV[1] += 4;
      if (a.painA > 0.5) RFV[2] += 3;
      // babbling: from about six months, a baby who is fed, warm and calm plays with its voice, and
      // young children keep talking to themselves and others
      if (young && a.age > S.mat * 0.04 && hu < 0.5 && a.painA < 0.2 && a.fear < 0.3)
        RFV[3] += (a.age < S.mat * 0.25 ? 2 : 1) * vocalCtl(a);
      // the hand mostly stays down; how often it points is inherited
      RFV[VG[GPT][0]] += 4 + 4 * (1 - pointUrge(a));
      const o = HEAR;
      if (x[o] > 0 && a.kid && !a.kid.gone && a.kid.age < a.kid.S.mat)
        for (let s = 0; s < 8; s++) {
          const L = Math.hypot(MV[s][0], MV[s][1]);
          RF[s] += (3 * x[o] * (MV[s][0] * x[o + 1] + MV[s][1] * x[o + 2])) / L;
        }
    }
    if (a.sp === 0) {
      // Inborn taste, as in newborns: sweet (ripe fruit) and savoury, fatty food (meat, food cooked by
      // fire) make the mouth want more. Bland grass and earthy roots give no such pull: whether they are
      // worth eating, a person has to find out.
      const h = idx(a.x, a.y),
        m = meatAt(a.x, a.y, 0),
        taste = Math.max(fruit[h], COOK[h], m && !rotten(m) ? m.meat : 0);
      RF[A_EAT] = taste > 0.05 && !water[h] ? 4 * hu : 0;
      // and hunger alone makes any primate try putting plants in its mouth: a weaker pull, which the
      // gut then rewards or not
      if (!RF[A_EAT] && hu > 0.35 && !water[h] && (food[h] > 0.1 || ROOT[h] > 0.05)) RF[A_EAT] = 2.5 * (hu - 0.35);
    } else if (a.sp !== 3 || x[HB] > 0.05) RF[A_EAT] = 4 * hu * (x[HB] > 0.05 ? 1 : 0);
    if (a.sp !== 3) RF[A_DRINK] = 5 * th * x[HB + 1];
    if (a.sp === 2) RF[A_ATK] = 5 * hu * x[HB + 2];
    // When tired, land animals instinctively look for a safe place to sleep before they drop off —
    // chimpanzees build a nest in the trees every evening. A gentle pull toward cover and toward their
    // own kind and family, away from danger, and no settling down to sleep in the water.
    if (a.sp !== 3 && !a.asleep && a.sl > 0.45) {
      const k = (a.sl - 0.45) * 3,
        own = a.sp === 1 ? 3 : a.sp === 0 ? 4 : 5,
        // in the rain or the cold, cover and company matter much more (people have no fur)
        wet = RAIN[idx(a.x, a.y)] > 0.002 ? (a.sp === 0 ? 2.5 : 1.6) : 1,
        chill = 1 + a.cold;
      for (let s = 0; s < 8; s++)
        RF[s] +=
          k *
          (1.4 * wet * x[s * NCH + 12] +
            1.2 * chill * x[s * NCH + 7] +
            0.8 * chill * x[s * NCH + own] -
            1.5 * x[s * NCH + 2]);
      const here = idx(a.x, a.y);
      let safe = cover(here) > 0.4 ? 1 : 0;
      for (let s = 0; s < 8 && !safe; s++) if (x[s * NCH + 7] > 0.6 || x[s * NCH + own] > 0.6) safe = 1;
      RF[A_SLEEP] += safe ? 2 * k : 0;
      if (water[here] && !river[here] && !iced(here)) RF[A_SLEEP] -= 6;
    }
    // Inborn in every mammal, people included: a hungry body is drawn toward food it can see, a thirsty
    // one toward fresh water, and the sight of a big hunter makes it shy away — all the more in a child,
    // or when already afraid. (What counts as food, and which way to go about getting it, still has to
    // be learned.)
    if (a.sp === 0 && !a.asleep) {
      const thr = (v) => clamp((v - 0.3) / 0.7, 0, 1),
        wary = (young ? 2.5 : 1.5) * (0.5 + a.fear);
      for (let s = 0; s < 8; s++) {
        RF[s] += 2.5 * thr(hu) * x[s * NCH + 1] + 2.5 * thr(th) * x[s * NCH];
        const p = x[s * NCH + 5];
        if (p > 0.1) {
          RF[s] -= wary * p;
          RF[(s + 4) % 8] += wary * p;
        }
      }
      // and a parent with food in its belly is moved to feed its own hungry young one close by
      if (a.e > 45 && !young)
        for (let yy = -1; yy <= 1; yy++)
          for (let xx = -1; xx <= 1; xx++) {
            const l = G[idx(wx(a.x + xx), clamp(a.y + yy, 0, H - 1))];
            if (l) for (const o of l) if (kinYoung(a, o) && o.e < 50) RF[A_GIVE] = Math.max(RF[A_GIVE], 3 * (1 - o.e / 50));
          }
    }
    // The withdrawal reflex: everyone pulls away from painful heat without having to learn it, so the
    // heat of flames close by pushes a creature away from them before it is in them.
    if (a.sp !== 3 && x[FIREIN] > 0.15)
      for (let s = 0; s < 8; s++) {
        const f = x[s * NCH + 15];
        if (f > 0.5) {
          RF[s] -= 5 * x[FIREIN];
          RF[(s + 4) % 8] += 5 * x[FIREIN];
        }
      }
    if (a.sp !== 3 && FIRE[idx(a.x, a.y)] > 0.03) RF[A_STAY] -= 4; // standing in fire: move!
    // When too hot, land animals instinctively seek shade and water.
    if (a.sp !== 3 && a.heat > 0.3)
      for (let s = 0; s < 8; s++) RF[s] += (a.heat - 0.3) * 3 * (1.5 * x[s * NCH + 12] + x[s * NCH]);
    // the brain grows through childhood, and prunes unused connections from then until fully adult
    a.nh = grownUnits(a);
    if (!a.found && a.age % DAY === a.id % DAY && a.age >= S.mat && a.age < S.mat * 1.6) a.pruned += prune(a);
    const V = forward(a.lw, x, a.h, a.z, a.nh, RF, a.zv, RFV);
    // the brain's state now becomes its short-term memory for the next step
    for (let j = 0; j < NM; j++) a.hm[j] = a.h[j];
    const pl = young
      ? S.plast
      : a.age < S.mat * 2.2
        ? S.adl + (1 - S.adl) * Math.max(0, 1 - (a.age - S.mat) / (S.mat * 0.3))
        : S.adl * 0.8;
    if (a.has && a.sp !== 3 && Math.abs(r) > 0.3) remember(a, lastAct, r, V);
    if (a.asleep && a.mem.length && tick % 2 === 0) replay(a, pl * 0.5);
    else if (!a.asleep) a.dream = null;
    // stress builds up under fear, pain, hunger and thirst, and fades when things are calm
    a.stress = a.stress * 0.99 + 0.01 * clamp(a.fear + a.painA + (a.e < 20) + (a.w < 20), 0, 2);
    if (a.has) {
      // d is the dopamine-like signal: how much better (or worse) things went than it expected
      const d = clamp(r + GAM * V - a.Vp, -2, 2);
      // Mood chemicals change how much it learns from this moment: fear makes a bad experience stick
      // (noradrenaline), something new makes it learn faster (a dopamine burst for novelty), and
      // long, heavy stress makes learning worse (cortisol).
      let mod = 1;
      if (d < 0) mod *= 1 + 0.5 * a.fear;
      if (tick - (a.novel ?? -9) < 2) mod *= 1.25;
      // a big, unexpected success — a burst of dopamine — makes that moment stick after one try
      if (d > 0.5) mod *= 1 + 3 * Math.min(1, (d - 0.5) / 1.5);
      if (a.stress > 0.5) mod *= 0.7;
      a.da = d;
      a.mod = mod;
      learnStep(a, d, pl * mod * (a.g.lr ?? 1));
      a.fear = clamp(a.fear * 0.9 + 0.4 * Math.max(0, -d), 0, 1);
      for (let k = 0; k < 9; k++) a.cz[k] = a.cz[k] * 0.995 + Math.abs(a.rk[k]) * Math.abs(d);
    }
    a.V = V;
    let act = sample(a.z);
    const chosen = act;
    // exhausted, the body falls asleep — but not while standing in a lake or the sea: it must get out first
    if (a.sl >= 1 && !wade) act = A_SLEEP;
    if (act === A_SLEEP && !a.asleep && a.sl < 0.45) act = A_STAY;
    if (a.asleep && a.sl > 0.08 && a.painA < 0.3 && a.painW < 0.3 && a.hp > 40) act = A_SLEEP;
    if (wade && act === A_SLEEP) act = A_STAY; // no sleeping standing in a lake or the sea
    if (a.whO === 'berries' && x[IB + 16] && hu > 0.4 && act !== A_EAT)
      followed(a, 'berries', 'walked past the red berries, hungry as it was');
    // the voice, alongside what the body does (asleep, it is quiet)
    const vc = a.sp === 0 && !(act === A_SLEEP || a.asleep) ? sampleV(a.zv) : null,
      voice = vc ? vc[0] : 0;
    // with poor vocal control, the mouth does not quite do what the brain meant
    if (vc && voice === 3) {
      const ctl = vocalCtl(a);
      for (let gi = 1; gi < GPT; gi++) if (rnd() > ctl) vc[gi] = (rnd() * VG[gi][1]) | 0;
    }
    a.pt = vc && vc[GPT] > 0 ? vc[GPT] - 1 : -1; // pointing this way (a direction 0 … 7), or not
    if (a.pt >= 0) {
      a.ptT = tick;
      if (!firsts.point) {
        firsts.point = 1;
        log(a.name + ' pointed, for the first time anyone has.');
      }
    }
    a.voice = voice;
    a.vc = vc;
    if (act === chosen) trace(a, act, vc);
    else fadeTraces(a);
    a.Vp = V;
    a.has = true;
    a.act = act;
    a.th = actName(a, act);
    if (a === sel) {
      a.mind = mind(a, act, chosen, RF);
      a.th = mindLine(a, a.mind);
      const tt = actName(a, act);
      if (!a.ts.length || a.ts[0].k !== tt) {
        a.ts.unshift({ k: tt, t: 'Day ' + dn + ', ' + (isNightAt(a.x) ? 'night' : 'day') + ': ' + a.th });
        if (a.ts.length > 6) a.ts.pop();
      }
    }
    if (S.imit) {
      // Whom to copy, and how much (social learning strategies, Kendal et al. 2018): it picks an elder
      // to watch, its mother first; one that inherited a "copy the successful" bias picks those who are
      // well fed and healthy, and copies a struggling one less. It copies more when it is unsure what
      // to do itself, and one that inherited a bias to follow the crowd leans toward what most of
      // those around it are doing.
      let tch = null,
        bd = 37;
      const pb = SOC.pick ? (a.g.pb ?? 0.5) : 0,
        okay = (o) => clamp((o.hp + o.e) / 200, 0, 1),
        seen = new Array(NA).fill(0);
      let nseen = 0;
      const rr = Math.round(a.g.v);
      for (let dy = -rr; dy <= rr; dy++)
        for (let dx = -rr; dx <= rr; dx++) {
          const X = a.x + dx,
            Y = a.y + dy;
          if (!inb(X, Y)) continue;
          const l = G[idx(X, Y)];
          if (!l) continue;
          for (const o of l) {
            if (
              o === a ||
              o.sp !== a.sp ||
              o.asleep ||
              !o.has ||
              (o !== a.mom && o.age < o.S.mat) ||
              o.age <= a.age
            )
              continue;
            seen[o.act]++;
            nseen++;
            const dd = dx * dx + dy * dy + (o === a.mom ? -30 : 0) - 8 * pb * okay(o); // the successful are preferred among those close enough to watch well
            if (dd < bd) {
              bd = dd;
              tch = o;
            }
          }
        }
      if (tch && tch.act !== A_SLEEP) {
        let ent = 0;
        for (let k = 0; k < NA; k++) if (a.z[k] > 1e-6) ent -= a.z[k] * Math.log(a.z[k]);
        const unsure = SOC.pick ? ent / Math.log(NA) : 0.85,
          rate =
            S.imit *
            (young ? 3 : 1) *
            (a.g.im ?? 1) *
            (1 - pb + 2 * pb * okay(tch)) *
            // most minds are fairly unsure most of the time (median 0.86 of the most unsure possible),
            // so that is the usual amount of copying: more when lost, much less when it knows what it wants
            clamp((unsure - 0.45) / 0.4, 0.2, 1.4);
        let maj = -1;
        for (let k = 0; k < NA; k++) if (seen[k] > nseen / 2 && nseen >= 3 && k !== A_SLEEP) maj = k;
        const cf = SOC.pick && maj >= 0 && maj !== tch.act ? (a.g.cf ?? 0.3) : 0;
        imitate(a, tch.act, rate * (1 - cf), tch.vc);
        if (cf) imitate(a, maj, rate * cf);
        if (!a.copied && a.sp === 0 && young) {
          a.copied = 1;
          a.ev[7] = 'it watched an elder on day ' + dn;
        }
      }
    }
    // Play: young mammals that are fed, safe and near others enjoy being active — running, chasing,
    // handling things. It is how they practise. The fun is a small reward of its own.
    if (
      young &&
      a.sp !== 3 &&
      !a.asleep &&
      a.e > 60 &&
      a.w > 60 &&
      a.fear < 0.2 &&
      a.painA < 0.1 &&
      seeOwn &&
      (act < 8 || act === A_TAKE || act === A_STRIKE)
    ) {
      a.bonus[6] += 0.02;
      a.play = 1;
    }
    if (act >= 8) a.mvv = 0; // not walking this step
    // How it responded to the loudest sound it heard: came closer, moved away, or answered. Answering
    // feels good to both — even newborns take turns "talking" with their mothers.
    // Vocal imitation, inborn in humans: hearing a word, the mouth is drawn a little toward making the
    // same sounds — strongly in babies and children, and more in those born to learn from others.
    if (a.sp === 0 && a.heardW && !a.asleep)
      imitateVoice(a, choicesFor(a.heardW), 0.02 * (young ? 3 : 1) * (a.g.im ?? 1) * x[HEAR + 6] * vocalCtl(a));
    // Shared attention: if it goes the way someone close pointed, both feel the small pleasure of
    // having shared something — as much as each was born to (sh).
    if (a.sp === 0 && a.seenPt && act === a.seenPt.dir && tick - a.seenPt.t <= 1) {
      const p = a.seenPt.who;
      a.bonus[7] += 0.01 * shareJoy(a);
      if (p && !p.gone) {
        p.bonus[7] += 0.03 * shareJoy(p);
        if (!firsts.joint) {
          firsts.joint = 1;
          log(a.name + ' went the way ' + p.name + ' pointed: attention shared, for the first time.');
        }
      }
      a.seenPt = null;
    }
    const hs = a.heardK === 2 ? WSTAT.get(a.heardWord) : SNDSTAT[a.heardK];
    if (a.sp === 0 && a.heardK >= 0 && !a.asleep && hs) {
      const S = hs,
        o = HEAR + a.heardK * 3;
      S.hear++;
      if (act < 8) {
        const L = Math.hypot(MV[act][0], MV[act][1]),
          dot = (MV[act][0] * x[o + 1] + MV[act][1] * x[o + 2]) / L;
        if (dot > 0.3) S.come++;
        else if (dot < -0.3) S.flee++;
      }
      if (voice > 0 && a.heardFrom && !a.heardFrom.gone) {
        S.answer++;
        a.bonus[7] += 0.02;
        a.heardFrom.bonus[7] += 0.02;
      }
    }
    if (a.sp === 1 || a.sp === 2) animalCalls(a, x, seeOwn);
    // making the sound
    if (voice > 0) {
      const k = voice - 1,
        w = k === 2 ? wordOf(vc) : null,
        word = w ? spell(w) : SAYN[k];
      a.said = k;
      a.saidT = tick;
      a.word = word;
      a.e -= 0.02;
      CALLS.push({ x: a.x, y: a.y, k, a, t: tick, L: SND.voice[k].L, f: SND.voice[k].f, w, word, p: pitchOf(a) });
      let st = k < 2 ? SNDSTAT[k] : WSTAT.get(word);
      if (!st) {
        st = { n: 0, pred: 0, food: 0, kin: 0, alone: 0, hungry: 0, hurt: 0, hear: 0, come: 0, flee: 0, answer: 0, who: new Set(), first: tick };
        WSTAT.set(word, st);
      }
      tally(st, context(a));
      if (st.who) st.who.add(a.id);
      // said while pointing: note what lay that way, as far as the speaker could see (for the translator)
      if (k === 2 && a.pt >= 0) {
        let bc = -1,
          bv = 0.15;
        for (const c of [1, 2, 3, 4, 5, 8, 9, 0, 12, 13, 14, 15]) if (x[a.pt * NCH + c] > bv) (bv = x[a.pt * NCH + c]), (bc = c);
        if (bc >= 0) {
          st.pts = st.pts || {};
          st.pts[bc] = (st.pts[bc] || 0) + 1;
          st.npt = (st.npt || 0) + 1;
        }
      }
      // calling out to others nearby eases loneliness a little (like grooming does for apes)
      if (seeOwn) a.bonus[7] += 0.03 * a.lo;
      if (typeof onCall === 'function') onCall(a, k, w);
      if (k === 2 && !firsts.speak) {
        firsts.speak = 1;
        log(a.name + ' said something: “' + word + '”.');
      }
      if (k === 2 && st.who && st.who.size >= 3 && st.n >= 10 && !st.shared) {
        st.shared = 1;
        if (!firsts.shared) {
          firsts.shared = 1;
          log('Three people now say “' + word + '”: the first word shared by a group.');
        }
      }
    }
    const sleepy = a.sl;
    a.asleep = act === A_SLEEP;
    if (a.asleep && sleepy > 0.8) a.ev[4] = 'it slept after being exhausted on day ' + dn;
    if (act < 8) {
      a.hd = act; // it turns to face the way it walks
      let preyS = false;
      for (let s = 0; s < 8; s++) if (x[s * NCH + 3] > 0 || x[s * NCH + 4] > 0) preyS = true;
      const fast =
        ((a.sp === 1 || fish) && (a.fear > 0.25 || a.painA > 0.2)) ||
        (a.sp === 2 && hu > 0.25 && preyS) ||
        (a.sp === 0 && a.painA > 0.2);
      const fe = 0.3 + 0.7 * clamp(a.e / 100, 0, 1),
        gr = clamp(0.25 + (0.75 * a.age) / S.mat, 0.25, 1),
        old = 1 - 0.5 * clamp((a.age / a.lf - 0.7) / 0.3, 0, 1);
      // how far it gets this step toward the next square (kept for drawing smooth, steady walking)
      // late in pregnancy the body is heavier: a little slower to walk, and much slower to run
      const late = a.preg ? clamp((1 - (a.preg.due - tick) / Math.max(1, S.gest) - 0.6) / 0.4, 0, 1) : 0;
      a.mvv = (fast ? S.run : S.walk) * a.g.s * fe * gr * old * (wade ? 0.5 : 1) * (1 - (fast ? 0.35 : 0.15) * late);
      a.mvd = act;
      a.acc += a.mvv;
      if (a.trap > 0) {
        a.trap--;
        a.acc = 0;
        a.mvv = 0;
      }
      if (a.acc >= 1) {
        a.acc -= 1;
        const X = wx(a.x + MV[act][0]),
          Y = a.y + MV[act][1];
        if (inb(X, Y) && !rock[idx(X, Y)] && (!fish || water[idx(X, Y)])) {
          // climbing is hard work, and steep slopes slow you down
          const climb = fish ? 0 : Math.max(0, alt[idx(X, Y)]) - Math.max(0, alt[idx(a.x, a.y)]);
          if (climb > 0) {
            a.e -= 1.5 * climb;
            a.acc -= Math.min(1, climb);
          }
          // thick forest is slow going
          if (!fish) a.acc -= 0.25 * cover(idx(X, Y));
          a.x = X;
          a.y = Y;
          if (pit[idx(X, Y)]) {
            a.hp -= baby ? 30 : 12;
            a.painA = Math.min(1, a.painA + 0.7);
            ouch(a, 0.7, 'fall');
            a.trap = 12;
            a.ev[0] = 'it fell into a pit on day ' + dn;
            if (a.sp === 0 && !firsts.pit) {
              firsts.pit = 1;
              log(a.name + ' fell into a pit.');
            }
          }
        }
      }
    } else if (act === A_EAT && a.sp === 3 && onW) {
      const i = idx(a.x, a.y),
        f = food[i];
      if (f > 0.05) {
        const b = Math.min(f, 0.25);
        a.e = Math.min(100, a.e + b * 25);
        food[i] -= b;
        if (hu > 0.5) a.ev[2] = 'it ate after going hungry on day ' + dn;
      }
    } else if (act === A_EAT && a.sp === 2 && !a.S.omni && !wade) {
      const m = meatAt(a.x, a.y, 2);
      if (m && a.fd < S.hcap) {
        const b = Math.min(m.meat, 0.3);
        m.meat -= b;
        a.fd += b;
        a.e = Math.min(100, a.e + b * 120);
        if (hu > 0.5) a.ev[2] = 'it ate from a carcass on day ' + dn;
      }
    } else if (act === A_EAT && (a.sp < 2 || a.S.omni) && !wade) {
      const i = idx(a.x, a.y),
        f = food[i];
      if (f > 0.3 && !poison[i]) {
        a.mf = { x: a.x, y: a.y };
        a.mfT = tick;
      }
      if ((a.sp === 0 || a.S.omni) && COOK[i] > 0.05) {
        // food cooked by fire: soft, easy to chew, and it gives more energy than raw
        const b = Math.min(COOK[i], 0.3);
        COOK[i] -= b;
        a.e = Math.min(100, a.e + b * 120);
        if (hu > 0.5) a.ev[2] = 'it ate food cooked by fire after going hungry on day ' + dn;
        if (a.sp === 0 && !firsts.cooked) {
          firsts.cooked = 1;
          log(a.name + ' ate food cooked by a fire.');
        }
      } else if (poison[i] && f > 0.05) {
        const b = Math.min(f, 0.3);
        food[i] -= b;
        a.e = Math.min(100, a.e + b * 10);
        a.hp -= 22;
        a.painA = Math.min(1, a.painA + 0.8);
        ouch(a, 0.8, 'berries');
        a.ev[0] = 'it got sick from red berries on day ' + dn;
        learnSight(a, 9, 0.15);
        if (!firsts['p' + a.sp]) {
          firsts['p' + a.sp] = 1;
          log(who(a) + ' ate red berries and got sick.');
        }
      } else if ((a.sp === 0 || a.S.omni) && meatAt(a.x, a.y, a.sp === 0 ? 0 : -1)) {
        // meat from a body: torn off slowly with bare hands and teeth, much faster cut with a sharp stone
        // (stone flakes were used to butcher carcasses 3 million years ago). Fresh, it is the richest food
        // there is; after a couple of days it is rotting, and often makes you sick.
        const m = meatAt(a.x, a.y, a.sp === 0 ? 0 : -1),
          b = Math.min(m.meat, a.sp === 0 ? (a.hand === 3 ? 0.35 : 0.12) : 0.3),
          rot = rotten(m);
        m.meat -= b;
        a.e = Math.min(100, a.e + b * 110);
        if (rot && rnd() < 0.35) {
          a.hp -= 15;
          a.painA = Math.min(1, a.painA + 0.7);
          ouch(a, 0.7, 'meat');
          a.ev[0] = 'it got sick from rotting meat on day ' + dn;
          if (a.sp === 0 && !firsts.rotten) {
            firsts.rotten = 1;
            log(a.name + ' ate rotting meat and got sick.');
          }
        } else if (hu > 0.5) a.ev[2] = 'it ate meat after going hungry on day ' + dn;
        if (a.sp === 0 && !firsts.meat) {
          firsts.meat = 1;
          log(a.name + ' ate meat from a dead ' + (m.sp === 1 ? 'animal' : 'creature') + '.');
        }
        if (a.sp === 0 && a.hand === 3 && !firsts.butcher) {
          firsts.butcher = 1;
          log(a.name + ' cut meat from a body with a sharp stone.');
        }
      } else if ((a.sp === 0 || a.S.omni) && fruit[i] > 0.05) {
        // fruit from the trees: more filling than leaves and roots
        const b = Math.min(fruit[i], 0.4);
        fruit[i] -= b;
        a.e = Math.min(100, a.e + b * 70);
        if (hu > 0.5) a.ev[2] = 'it ate fruit after going hungry on day ' + dn;
        if (a.sp === 0 && !firsts.fruit) {
          firsts.fruit = 1;
          log(a.name + ' ate fruit from the trees.');
        }
      } else if (a.sp === 0 && ROOT[i] > 0.05) {
        // digging for roots: hard with bare hands, much easier with a stick
        const pd = a.hand === 2 ? 0.55 : a.hand === 3 ? 0.4 : a.hand === 1 ? 0.3 : 0.15;
        a.e -= 0.15;
        if (rnd() < pd) {
          const b = Math.min(ROOT[i], 0.3);
          ROOT[i] -= b;
          a.e = Math.min(100, a.e + b * 80);
          if (hu > 0.5) a.ev[2] = 'it dug up roots after going hungry on day ' + dn;
          if (!firsts.root) {
            firsts.root = 1;
            log(a.name + ' dug up a root and ate it.');
          }
          if (a.hand === 2 && !firsts.dig) {
            firsts.dig = 1;
            log(a.name + ' dug for roots with a stick.');
          }
        }
      } else if (a.sp === 0 && f > 0.05) {
        // people cannot digest grass: chewing it gives almost nothing
        const b = Math.min(f, 0.2);
        a.e = Math.min(100, a.e + b * 1);
        food[i] -= b * 0.3;
      } else if (a.S.omni && f > 0.05) {
        const b = Math.min(f, 0.5);
        a.e = Math.min(100, a.e + b * 50);
        food[i] -= b;
        if (hu > 0.5) a.ev[2] = 'it ate after going hungry on day ' + dn;
        if (f > 0.4) followed(a, 'food', 'found the good food');
      } else if (a.sp === 1 && f < 0.12 && tree[i] > 0.3 && a.fd < S.hcap) {
        // where there is little grass, herbivores browse leaves and shoots: less filling, and it
        // slowly thins the trees
        const b = Math.min(S.bite / 2, S.hcap - a.fd);
        a.fd += b;
        a.e = Math.min(100, a.e + b * S.hg * 0.7);
        tree[i] = Math.max(0, tree[i] - b * 0.04);
        if (hu > 0.5) a.ev[2] = 'it ate after going hungry on day ' + dn;
      } else if (a.sp === 1 && f > 0.05 && a.fd < S.hcap) {
        const b = Math.min(f, S.bite, S.hcap - a.fd);
        a.fd += b;
        a.e = Math.min(100, a.e + b * S.hg);
        food[i] -= b;
        soil[i] = Math.min(4, soil[i] + 0.01 * b); // most of what grazers eat goes back as dung
        if (hu > 0.5) a.ev[2] = 'it ate after going hungry on day ' + dn;
      }
    } else if (act === A_DRINK && x[HB + 1]) {
      a.w = Math.min(100, a.w + 20);
      // drinking from a puddle uses it up a little
      for (let yy = -1; yy <= 1; yy++)
        for (let xx = -1; xx <= 1; xx++) {
          const j = idx(a.x + xx, clamp(a.y + yy, 0, H - 1));
          if (PUD[j] && !liquid(j)) {
            PW[j] = Math.max(0, PW[j] - 0.03);
            yy = xx = 2;
          }
        }
      if (a.mw && Math.abs(dxw(a.mw.x - a.x)) <= 2 && Math.abs(a.mw.y - a.y) <= 2)
        followed(a, 'water', 'found the water');
      if (th > 0.5) a.ev[3] = 'it drank after being very thirsty on day ' + dn;
    } else if (act === A_MATE && a.rd && popK[a.k] + kidsOf(a.k) < S.cap) {
      // of those ready close by, one it is bonded to is the one it goes to (partner preference, as in
      // pair-bonding mammals); otherwise whoever is there
      let b = null,
        bb = -1;
      for (let yy = -1; yy <= 1; yy++)
        for (let xx = -1; xx <= 1; xx++) {
          const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
          if (l)
            for (const q of l)
              if (q !== a && q.k === a.k && q.sex !== a.sex && q.rd && !q.dead && bondOf(a, q) > bb) {
                b = q;
                bb = bondOf(a, q);
              }
        }
      if (b) {
        const fem = a.sex ? a : b,
          mal = a.sex ? b : a,
          n = a.sp === 0 ? 1 + (rnd() < 0.02) : S.lit[0] + ((rnd() * (S.lit[1] - S.lit[0] + 1)) | 0),
          inh = true,
          g2 = Math.max(a.gen, b.gen) + 1;
        // she conceives: the young grow inside her for as long as the real animal carries them (see
        // gest), and are born then, wherever she is (see giveBirth)
        const room = Math.max(0, S.cap - popK[a.k] - kidsOf(a.k) - expecting(a.k)),
          gl = [];
        for (let q = 0; q < Math.min(n, room); q++) gl.push({ sex: rnd() < 0.5 ? 1 : 0, g: child(fem, mal, inh) });
        // in a wolf pack only one female breeds: the others' breeding is held back while she is
        // pregnant or nursing close by (reproductive suppression, as in wolves and wild dogs)
        if (S.pack && packMother(fem)) gl.length = 0;
        if (gl.length) fem.preg = { due: tick + Math.max(1, Math.round(S.gest)), dad: mal, gen: g2, young: gl, cost: 10 + (S.yc ?? 12) * gl.length };
        if (S.pair) {
          addBond(fem, mal, 0.3);
          addBond(mal, fem, 0.3);
        }
        mal.e -= 10;
        // he can mate again soon; she will not be ready again until after the birth and nursing
        mal.cd = Math.round(0.1 * TY);
        fem.cd = S.cd;
        a.rd = b.rd = false;
        // one already strongly bonded feels less pull toward anyone else: in bonded men, oxytocin made
        // them keep more distance from an attractive stranger (Scheele et al. 2012), and people in
        // relationships rate others as less attractive. Less pull, not a rule: it can still happen.
        const pull = (p, q) => (!p.mate || p.mate === q ? 1 : 1 - 0.7 * bondOf(p, p.mate));
        a.bonus[5] += pull(a, b);
        b.bonus[5] += pull(b, a);
        a.ev[5] = b.ev[5] = 'it mated on day ' + dn;
      }
    } else if (act === A_GIVE && a.sp === 0 && a.e > 40) {
      let t = null;
      for (let yy = -1; yy <= 1; yy++)
        for (let xx = -1; xx <= 1; xx++) {
          const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
          if (l) for (const o of l) if (kinYoung(a, o) && (!t || o.e < t.e)) t = o;
        }
      if (t) {
        const need = 1 - t.e / 100;
        a.e -= 12;
        t.e = Math.min(100, t.e + 12);
        a.bonus[7] += 0.6 * need;
        a.ev[7] = 'it fed a hungry child on day ' + dn;
        a.shared++;
        followed(a, 'share', 'fed a hungry child');
        if (!firsts.share) {
          firsts.share = 1;
          log(a.name + ' shared food with ' + t.name + '. Nobody taught this.');
        }
      }
    } else if (
      act === A_TAKE &&
      a.sp === 0 &&
      !a.asleep &&
      !a.hand &&
      FIRE[idx(a.x, a.y)] > 0.05 &&
      stick[idx(a.x, a.y)]
    ) {
      // a branch burning at one end can be picked up by the other — carefully
      stick[idx(a.x, a.y)]--;
      a.hand = 4;
      a.brand = 8;
      a.fh = (a.fh || 0) + 1;
      a.painA = Math.min(1, a.painA + 0.15);
      if (!firsts.brand) {
        firsts.brand = 1;
        log(a.name + ' grabbed a burning stick out of a fire, and was burned.');
      }
    } else if (act === A_TAKE && a.sp === 0 && !a.asleep) {
      if (pickUp(a)) {
        a.e -= 0.02;
        if (!firsts.take) {
          firsts.take = 1;
          log(a.name + ' picked up ' + HAND[a.hand] + ' for the first time.');
        }
      }
    } else if (act === A_DROP && a.sp === 0 && a.hand) {
      const i = idx(a.x, a.y),
        was = a.hand,
        burning = FIRE[i] > 0.03;
      putDown(a);
      if (was === 4 || (was === 2 && burning)) a.fh = (a.fh || 0) + 1;
      if (was === 4 && ignite(i, 0.12) && !firsts.setfire) {
        firsts.setfire = 1;
        log(a.name + ' dropped a burning stick, and fire took hold where it fell.');
      } else if (was === 2 && burning && !firsts.fed) {
        firsts.fed = 1;
        log(a.name + ' dropped a stick onto a fire, and it burned on.');
      }
      // real control: one person feeding the same fire again and again over many hours
      if (was === 2 && burning) {
        if (!a.fedT0 || tick - a.fedLast > DAY / 2) (a.fedT0 = tick), (a.fedN = 0);
        a.fedN++;
        a.fedLast = tick;
        if (a.fedN >= 6 && tick - a.fedT0 >= DAY / 4 && !firsts.kept) {
          firsts.kept = 1;
          log(a.name + ' kept a fire going for hours, feeding it again and again. Day ' + (((tick / DAY) | 0) + 1) + '.');
        }
      }
    } else if (act === A_STRIKE && a.sp === 0 && a.hand && !a.asleep) {
      // What a blow does is up to the world, not the creature: a stone breaks a nut's shell; a stone
      // struck on another stone can knock a sharp flake off it; a stick or a flake just hits the ground.
      const i = idx(a.x, a.y);
      a.e -= 0.05;
      const tinder = (food[i] > 0.1 && dryness(i) > 0.4) || (stick[i] > 0 && stickDry(i) > 0.5);
      if (a.hand === 2 && FIRE[i] > 0.05) {
        // a stick pushed into a fire catches
        a.hand = 4;
        a.brand = 8;
        a.fh = (a.fh || 0) + 1;
        if (!firsts.brand) {
          firsts.brand = 1;
          log(a.name + ' poked a stick into a fire and it caught, by accident, as far as anyone can tell.');
        }
      } else if ((a.hand === 5 && stone[i] + flake[i] > 0) || ((a.hand === 1 || a.hand === 3) && pyrite[i])) {
        // pyrite struck with a stone throws hot sparks. Catching one in dry tinder and nursing it into a
        // flame is a knack: almost never at first, quickly once learned.
        const sk = a.fsk || 0;
        a.bonus[6] += 0.02 * (1 - sk); // sparks flying are new and striking to see, until they are familiar
        if (tinder && rnd() < 0.0003 + 0.5 * sk * sk && ignite(i, 0.1)) {
          fireMade(a, 'spark');
        } else firePractice(a, tinder ? 0.012 : 0.004);
      } else if (a.hand === 2 && stick[i] > 0 && stickDry(i) > 0.5) {
        // rubbing or drilling dry wood on wood heats it: smoke, then black dust, then perhaps a glowing
        // ember that must be blown into flame. A skilled hand does it within minutes; a beginner can try
        // for days and never get there.
        a.rub = a.lastRub === tick - 1 ? (a.rub || 0) + 1 : 1;
        a.lastRub = tick;
        const sk = a.fsk || 0;
        if (sk > 0.15 && rnd() < sk) a.bonus[6] += 0.02 * (1 - sk); // smoke rising from the wood
        if (rnd() < (a.rub >= 4 ? 0.0004 : 0) + 0.6 * sk * sk && ignite(i, 0.08)) fireMade(a, 'rub');
        else if (a.rub >= 2) firePractice(a, 0.004); // only steady, sustained rubbing teaches anything
      } else if (a.hand === 1 && nut[i] > 0.05) {
        const b = Math.min(nut[i], 0.25);
        nut[i] -= b;
        a.e = Math.min(100, a.e + b * 110);
        a.nuts++;
        if (hu > 0.5) a.ev[2] = 'it cracked a nut open with a stone after going hungry on day ' + dn;
        if (!firsts.nut) {
          firsts.nut = 1;
          log(a.name + ' cracked a nut open with a stone. Nobody showed them how.');
        }
      } else if (a.hand === 1 && stone[i] > 0 && rnd() < 0.05) {
        stone[i]--;
        flake[i] = Math.min(6, flake[i] + 1);
        a.painA = Math.min(1, a.painA + 0.1);
        if (!firsts.flake) {
          firsts.flake = 1;
          log(a.name + ' knocked a sharp-edged flake off a stone by striking two stones together.');
        }
      }
    } else if (act === A_ATK && (a.sp === 2 || a.sp === 0) && a.kcd === 0 && !a.asleep) {
      let t = null;
      for (let yy = -1; yy <= 1 && !t; yy++)
        for (let xx = -1; xx <= 1 && !t; xx++) {
          const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
          if (l) t = l.find((o) => edible(a, o)) || null;
        }
      if (t) {
        a.kcd = 4;
        const T = t.S;
        // bigger prey is harder to bring down alone; hunters of the same kind close by help (a pack)
        let help = 0;
        if (a.sp === 2)
          for (let yy = -1; yy <= 1; yy++)
            for (let xx = -1; xx <= 1; xx++) {
              const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
              if (l)
                for (const o of l)
                  if (o !== a && o.k === a.k && !o.dead && !o.asleep && o.age >= o.S.mat) help++;
            }
        const odds = clamp(((a.S.size || 1) * (1 + 0.6 * help)) / (T.size || 1), 0.15, 1.3),
          pc =
            a.sp === 0
              ? 0.25 *
                (a.hand === 2 ? 1.5 : a.hand === 3 ? 1.25 : 1) *
                // a person alone is slow and weak next to a deer or a bison; a rabbit can be grabbed
                (t.sp === 3 ? 1 : (t.asleep ? 0.8 : 0.35) * Math.min(1, 0.6 / (T.size || 1)))
              : (t.asleep || t.age < T.mat * T.wn ? 0.9 : 0.6) * Math.min(1, odds);
        if (rnd() < pc) {
          t.dead = true;
          t.cause = a.sp === 0 ? 'caught by a person' : 'killed by a predator';
          if (a.sp === 2) t.eaten = 0.6;
          if (a.sp === 2) kills[t.sp]++;
          else if (t.sp === 1) {
            if (!firsts.hunt) {
              firsts.hunt = 1;
              log(a.name + ' brought down a ' + T.n.toLowerCase() + '. Nobody taught them.');
            }
          } else {
            fished++;
            a.nfish = (a.nfish || 0) + 1;
            followed(a, 'fish', 'caught a fish');
          }
          if (!(a.sp === 0 && t.sp === 1)) a.e = Math.min(
            100,
            a.e +
              (t.sp === 3
                ? a.sp === 0
                  ? 30
                  : 20
                : t.sp === 1
                  ? 70 * Math.min(1.3, T.size || 1)
                  : t.sp === 0
                    ? 70
                    : 50)
          );
          if (a.sp === 2 && t.sp !== 3)
            for (let yy = -2; yy <= 2; yy++)
              for (let xx = -2; xx <= 2; xx++) {
                const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
                if (l)
                  for (const o of l)
                    // a kill feeds the young — and, if it is big, the rest of the pack too
                    if (o !== a && o.k === a.k && !o.dead && (o.age < o.S.mat || (T.size || 1) > 1.5)) {
                      o.e = Math.min(100, o.e + 35 * Math.min(1.5, T.size || 1));
                      o.ev[2] = 'it shared a kill on day ' + dn;
                    }
              }
          a.ev[2] = (a.sp === 0 ? 'it caught a fish' : 'it caught prey') + ' after going hungry on day ' + dn;
          if (a.sp === 0 && fished === 1) log('A person caught a fish for the first time.');
          if (t.sp === 2) log('A starving predator ate another predator.');
        } else if (t.sp !== 3) {
          // big prey fights back: a bison's horns or a deer's hooves can badly hurt a hunter on foot
          if (a.sp === 0 && (T.size || 1) > 0.8 && rnd() < 0.3) {
            a.hp -= 10 * (T.size || 1);
            a.painA = Math.min(1, a.painA + 0.6);
            ouch(a, 0.6, 'prey');
            a.ev[0] = 'it was hurt by a ' + T.n.toLowerCase() + ' it attacked on day ' + dn;
          }
          t.hp -= a.sp === 0 ? 12 : 25;
          t.painA = Math.min(1, t.painA + 0.8);
          ouch(t, 0.8, 'bitten');
          t.rage = 1; // attacked, it is angry as well as afraid
          learnSight(t, 5, 0.15); // and now it knows what a hunter looks like
          t.ev[0] = 'it was bitten by a predator on day ' + dn;
          if (t.hp <= 0) {
            t.dead = true;
            t.cause = 'killed by a predator';
            kills[t.sp]++;
          }
        }
      }
    }
    if (a.age % 48 === a.id % 48 && a.age > 48) lessons(a);
  }
  ag = ag.filter((a) => {
    let c = a.dead
      ? a.cause
      : a.hp <= 0
        ? a.wasW
          ? 'drowned'
          : 'its wounds'
        : a.w <= 0
          ? 'thirst'
          : a.e <= 0
            ? 'hunger'
            : a.age > a.lf
              ? 'old age'
              : null;
    if (!c) return true;
    a.gone = true;
    if (a.hand) putDown(a);
    leaveBody(a, c);
    // an animal killed by fire is cooked where it fell
    if (c === 'burned') COOK[idx(a.x, a.y)] += 0.5 * Math.min(2, a.S.size || 1);
    // nobody is told of a death: those bonded to it find out only through their own senses (below)
    const SEEN = { 'killed by a predator': 'killed', burned: 'fire', drowned: 'drowned', 'struck by lightning': 'lightning', 'its wounds': 'wounds' };
    if (SEEN[c]) ouch(a, 1, SEEN[c], true);
    const dk = a.S.n + ': ' + c;
    deaths[dk] = (deaths[dk] || 0) + 1;
    if (a.sp === 0)
      log(
        a.name +
          ' died (' +
          (c === 'drowned' || c === 'killed by a predator' || c === 'struck by lightning' || c === 'burned'
            ? c
            : 'of ' + c) +
          ') at ' +
          (a.age / TY).toFixed(1) +
          ' years old.' +
          (a.c0 || '')
      );
    else if (c === 'drowned' && tick - (DL[a.sp] ?? -1e9) > DAY) {
      DL[a.sp] = tick;
      log('A ' + a.S.n.toLowerCase() + ' drowned.');
    }
    return false;
  });
  watchOthers();
  ag.push(...kids);
  if (!over && !ag.some((a) => a.sp === 0)) {
    over = true;
    log('The last person has died. Restart to try again.');
    if (typeof onExtinct === 'function') onExtinct();
  }
  if (tick % 144 === 0) {
    const c = [0, 0, 0, 0];
    ag.forEach((a) => c[a.sp]++);
    hist.push(c);
    if (hist.length > 220) hist.shift();
  }
}

// Making fire is a skill, not a gift. Every try is practice; someone used to handling fire learns from
// it faster, and those close by who watch pick up a little of it too — which is how, as far as we know,
// fire-making spread: learned by individuals, passed on by watching, never inborn.
function firePractice(a, gain) {
  const fam = 0.3 + 0.7 * Math.min(1, (a.fh || 0) / 10);
  a.fsk = Math.min(1, (a.fsk || 0) + gain * fam * (1 - (a.fsk || 0)));
  watchFire(a, gain * 0.4);
}
function watchFire(a, gain) {
  for (const o of ag)
    if (o !== a && o.sp === 0 && !o.dead && !o.asleep && Math.abs(dxw(o.x - a.x)) <= 2 && Math.abs(o.y - a.y) <= 2) {
      const before = o.fsk || 0;
      o.fsk = Math.min(1, before + gain * (1 - before) * (o.age < o.S.mat ? 1.5 : 1));
      if (!o.fTeach && gain > 0.02) o.fTeach = a.name;
    }
}
function fireMade(a, how) {
  a.fsk = Math.min(1, (a.fsk || 0) + 0.12 * (1 - (a.fsk || 0)));
  a.made = (a.made || 0) + 1;
  watchFire(a, 0.06);
  const key = how === 'spark' ? 'madefire' : 'rubfire';
  if (!firsts[key]) {
    firsts[key] = 1;
    log(
      a.name +
        (how === 'spark'
          ? ' struck a shiny stone and a spark caught in dry tinder: fire, made by hand.'
          : ' worked dry wood until it smoked, glowed and caught: fire, made by hand.') +
        (a.fTeach ? ' They had watched ' + a.fTeach + ' try.' : ' Nobody showed them how.') +
        ' Day ' + (((tick / DAY) | 0) + 1) + '.'
    );
  } else if (a.made === 1 && !firsts['made_' + a.id]) {
    firsts['made_' + a.id] = 1;
    log(a.name + ' made fire too' + (a.fTeach ? ', after watching ' + a.fTeach : '') + '.');
  }
}

// ---------- learning from what happens to others ----------
// People feel a share of what they see happen to someone near them. Watching another person get
// shocked makes the watcher's own fear system respond almost as if it were them, and they come to fear
// what came before it (Olsson & Phelps 2007). Here a person who sees someone close by hurt, sick or
// killed gets a weaker copy of that pain as its own learning signal, and a jolt of fear, so its brain
// links the bad outcome to what it is seeing right then. And it turns a little away from doing what it
// just saw lead to pain (the action the other was doing), applied to its own senses.
//   · How much it feels depends on who it is (Hein et al. 2010): family most, others of its band less.
//   · Children learn more from it.
//   · Some dangers are learned from others far more readily than others (monkeys learn to fear snakes,
//     not flowers, from the same fearful look: Cook & Mineka 1990): being attacked, burned, falling,
//     drowning and bad food teach strongly; other hurts much less.
//   · How much a person learns from others at all is inherited (gene im), so some are loners who learn
//     only the hard way, as about one person in five does in experiments (Molleman et al. 2014).
// What exactly it learns is left to its own brain.
const SOC = { vic: true, pick: true, sound: true, calls: true, modern: false, home: true, earth: false },
  OUCH = [],
  PREPARED = { bitten: 1, killed: 1, prey: 0.9, fire: 1, fall: 1, drowned: 1, berries: 1, meat: 1, lightning: 0.6, wounds: 0.5 },
  OUCHW = {
    bitten: 'get bitten by a predator',
    killed: 'get killed by a predator',
    prey: 'get hurt by an animal it attacked',
    fire: 'get burned',
    fall: 'fall into a pit',
    drowned: 'drown',
    berries: 'get sick from red berries',
    meat: 'get sick from rotting meat',
    lightning: 'get struck by lightning',
    wounds: 'die of its wounds',
  };
function ouch(a, amt, kind, died = false) {
  if (a.sp !== 0) return;
  OUCH.push({ a, x: a.x, y: a.y, amt, kind, act: died ? -1 : a.act });
}
function watchOthers() {
  if (!SOC.vic) return void (OUCH.length = 0);
  for (const e of OUCH) {
    const v = e.a;
    for (const o of ag) {
      if (o === v || o.sp !== 0 || o.dead || o.gone || o.asleep || !o.has) continue;
      const r = Math.min(5, Math.round(o.g.v));
      if (Math.abs(dxw(o.x - e.x)) > r || Math.abs(o.y - e.y) > r) continue;
      const fam = v === o.mom || v === o.kid || v === o.mate || (v.mom && v.mom === o.mom) || v.mom === o,
        young = o.age < o.S.mat,
        share = Math.min(0.8, 0.3 * (fam ? 1 : 0.5) * (young ? 1.5 : 1) * (PREPARED[e.kind] ?? 0.3) * (o.g.im ?? 1)),
        hurt = share * e.amt;
      if (hurt < 0.01) continue;
      o.bonus[0] -= hurt; // felt as its own pain, in its learning signal
      o.fear = clamp(o.fear + 0.6 * hurt, 0, 1);
      // and it turns away from what it saw lead there
      if (e.act >= 0) imitate(o, e.act, -0.05 * hurt);
      o.vic = (o.vic || 0) + hurt;
      if (hurt > 0.12) o.ev[0] = 'it saw ' + (v.name || 'someone') + ' ' + OUCHW[e.kind] + ' on day ' + dayN();
      if (!firsts.vicar && hurt > 0.12) {
        firsts.vicar = 1;
        log(o.name + ' saw ' + (v.name || 'someone') + ' ' + OUCHW[e.kind] + ', and was afraid.');
      }
    }
  }
  OUCH.length = 0;
}

// ---------- losing someone ----------
// The bond is inborn, as in all mammals: being apart from your partner, your mother (while young) or
// your young child hurts, the way separation distress does in infants and their mothers. What is NOT
// given is any knowledge of death. Nobody is told when someone dies. A creature only has its senses:
//   · missing them: when it has not seen them for a while the ache grows over days, then slowly fades
//     as it gets used to their absence. It feels the same whether they are alive and far off or dead;
//     it cannot tell the difference.
//   · finding them: coming across the body of one it was bonded to is a sharp distress (elephants and
//     chimpanzee mothers stay with, or carry, their dead).
// Whether it ever links bodies with the one who is missing is left to its brain.
function bondsOf(a, young) {
  const b = [];
  if (a.mate) b.push(a.mate);
  if (a.mom && young) b.push(a.mom);
  if (a.kid && a.kid.mom === a && a.kid.age < a.kid.S.mat) b.push(a.kid);
  if (a.kid && a.kid.mom !== a && a.kid.mom === a.mate && a.kid.age < a.kid.S.mat) b.push(a.kid);
  return b;
}
function feelLoss(a, young) {
  const bonds = bondsOf(a, young);
  if (!bonds.length) {
    a.miss = (a.miss || 0) * 0.99;
    return;
  }
  const r = Math.max(2, Math.round(a.g.v));
  let seen = false;
  for (const o of bonds)
    if (!o.gone && !o.dead && Math.abs(dxw(o.x - a.x)) <= r && Math.abs(o.y - a.y) <= r) seen = true;
  if (seen || a.bseen === undefined) a.bseen = tick;
  const u = (tick - a.bseen) / DAY;
  a.miss = 0.6 * clamp((u - 0.5) / 4, 0, 1) * clamp(1 - (u - 5) / 15, 0, 1);
  // coming across the body of one it was bonded to
  for (const b of BODIES) {
    if (!b.who || Math.abs(dxw(b.x - a.x)) > 1 || Math.abs(b.y - a.y) > 1 || !bonds.includes(b.who)) continue;
    if (!b.found) b.found = new Set();
    if (b.found.has(a.id)) continue;
    b.found.add(a.id);
    a.grief = 1;
    a.lost = b.who;
    a.ev[7] = 'it found the body of ' + (b.who.name || 'one it was close to') + ' on day ' + dayN();
    if (a.sp === 0) log(a.name + ' found the body of ' + b.name + ', and was distressed.');
  }
}

// ---------- pair bonds ----------
// People (and wolves) are born able to form pair bonds, not with a rule to be faithful. A bond with a
// particular one grows the more time they spend close together, and with each mating (as oxytocin and
// vasopressin bond partners in pair-bonding mammals), and fades over weeks apart. The partner is the
// one it is most strongly bonded to: it is drawn to stay near them (a small comfort), prefers them
// when mating, and misses them when apart. Nothing stops it mating with others or bonding anew; how
// they pair up — one partner for life, one after another, or more — is left to how they live. In
// real people the pair bond is universal, but most societies have allowed more than one wife and
// serial partners are common (Schacht & Kramer 2019).
function bondOf(a, o) {
  const b = a.bonds && a.bonds.find((e) => e.o === o);
  return b ? b.s : 0;
}
function addBond(a, o, k) {
  if (!a.bonds) a.bonds = [];
  let b = a.bonds.find((e) => e.o === o);
  if (!b) {
    if (a.bonds.length >= 4) a.bonds.splice(a.bonds.indexOf(a.bonds.reduce((m, e) => (e.s < m.s ? e : m))), 1);
    a.bonds.push((b = { o, s: 0 }));
  }
  b.s = Math.min(1, b.s + k * (1 - b.s));
}
function pairBond(a) {
  const near = [];
  for (let yy = -1; yy <= 1; yy++)
    for (let xx = -1; xx <= 1; xx++) {
      const l = G[idx(a.x + xx, clamp(a.y + yy, 0, H - 1))];
      if (l) for (const q of l) if (q !== a && q.k === a.k && q.sex !== a.sex && !q.dead && q.age >= q.S.smat) near.push(q);
    }
  for (const q of near) addBond(a, q, 0.0015);
  let best = null;
  if (a.bonds) {
    for (const e of a.bonds) {
      if (!near.includes(e.o)) e.s *= 0.9995; // about two weeks to halve, apart
      if (e.s >= 0.25 && (!best || e.s > best.s)) best = e;
    }
    a.bonds = a.bonds.filter((e) => e.s > 0.02);
  }
  a.mate = best ? best.o : null;
  if (best && near.includes(best.o)) a.bonus[7] += 0.01 * best.s;
}
// For checking against real life: of every two young with the same mother, how often they also share
// a father (humans about 66%, chimpanzees 4%, gibbons 64%: Dyble 2026).
let SIBS = [];
function countSibs(sp, fem, mal) {
  const s = SIBS[sp] || (SIBS[sp] = { pairs: 0, full: 0 });
  if (!fem.dads) fem.dads = new Map();
  let n = 0;
  for (const v of fem.dads.values()) n += v;
  s.pairs += n;
  s.full += fem.dads.get(mal.id) || 0;
  fem.dads.set(mal.id, (fem.dads.get(mal.id) || 0) + 1);
}

// ---------- pregnancy and birth ----------
// Young are not made in a moment. After conceiving, a mother carries them for as long as the real
// animal does (S.gest: about nine months for people, two for wolves, a month for rabbits; a year here
// is three days, so a person's pregnancy lasts a little over two days). Carrying them costs her energy
// day by day. If she starves, she can lose the pregnancy. Then she gives birth where she is — it hurts —
// and for people, as in every society before modern medicine, about one birth in a hundred costs the
// mother her life. Nursing follows: she is not ready to conceive again for a while (S.cd after birth).
function expecting(k) {
  let n = 0;
  for (const a of ag) if (a.preg && a.k === k && !a.dead) n += a.preg.young.length;
  return n;
}
function pregnancy(a, kids) {
  const P = a.preg,
    S = a.S;
  a.e -= (0.4 * P.cost) / Math.max(1, S.gest); // growing them: the smaller part of the cost
  if (a.e < 3) {
    a.preg = null;
    a.cd = Math.round(0.2 * TY);
    if (a.sp === 0) log(a.name + ' lost her pregnancy; she was starving.');
    return;
  }
  if (tick < P.due) return;
  a.preg = null;
  for (const y of P.young) {
    const c = mk(a.sp, a.x, a.y, y.sex, y.g, P.gen, 0, a.k);
    c.bond = 0.6;
    c.metAny = true;
    c.e = 60;
    c.w = 100;
    c.mom = a;
    c.dad = P.dad; // recorded for science (who the father is); nobody in the world is told
    a.kid = c;
    // fathers of pair-bonding kinds help raise the young (if he is still her partner); others leave
    if (S.pair && P.dad && !P.dad.gone && P.dad.mate === a) P.dad.kid = c;
    countSibs(a.sp, a, P.dad);
    kids.push(c);
    if (a.sp === 0) {
      maxGen = Math.max(maxGen, P.gen);
      log((c.name || 'A baby') + ' was born to ' + (a.name || 'a mother') + ' (generation ' + P.gen + ').');
    }
  }
  if (a.sp !== 3) {
    a.painA = Math.min(1, a.painA + (a.sp === 0 ? 0.6 : 0.3)); // labour hurts
    a.e -= 5;
  }
  a.cd = S.cd; // nursing: not ready to conceive again for a while
  a.milk = { cost: 0.6 * P.cost, left: S.cd }; // and feeding them milk: the larger part, paid while they live
  a.ev[7] = 'it gave birth on day ' + dayN();
  if (a.sp === 0 && rnd() < 0.01) {
    a.dead = true;
    a.cause = 'giving birth';
  }
}

function packMother(f) {
  for (const o of ag)
    if (o !== f && o.k === f.k && o.sex && !o.dead && (o.preg || o.milk) && Math.abs(dxw(o.x - f.x)) <= 4 && Math.abs(o.y - f.y) <= 4)
      return true;
  return false;
}

// ---------- animals' calls ----------
// Inborn, like a baby's cry: a wolf howls when it has lost sight of its pack, most of all at dusk and
// at night, and others of its pack who hear it often join in (a chorus); lions roar at night and at
// dawn to claim their ground; deer and bison snort an alarm when they see a hunter and are afraid.
// Hearers are told nothing about what a call means; they hear only how loud it is and from where.
function animalCalls(a, x, seeOwn) {
  if (!SOC.calls) return;
  if (a.asleep || a.age < a.S.mat * 0.5) return;
  const dusk = isNightAt(a.x) || isNightAt(wx(a.x + 3)) || isNightAt(wx(a.x - 3)),
    heardHowl = x[ACALL] > 0.05;
  let k = -1;
  if (a.sp === 2 && a.S.pack) {
    if ((!seeOwn && rnd() < (dusk ? 0.12 : 0.02)) || (heardHowl && seeOwn && rnd() < 0.3)) k = 0;
  } else if (a.sp === 2 && a.k === KINDS.findIndex((q) => q.n === 'Big cat')) {
    if (dusk && rnd() < 0.05) k = 1;
  } else if (a.sp === 1 && a.fear > 0.4) {
    let pred = 0;
    for (let s = 0; s < 8; s++) pred = Math.max(pred, x[s * NCH + 5]);
    if (pred > 0.2 && rnd() < 0.5) k = 2;
  }
  if (k < 0) return;
  const s = SND.animal[k];
  CALLS.push({ x: a.x, y: a.y, an: k, a, t: tick, L: s.L, f: s.f });
  a.callT = tick;
  a.callK = k;
}
