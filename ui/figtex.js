// Genesis — the picture of each creature as a figure standing in a 3D world (the globe and the 3D valley).
// Copyright (c) 2026 Malvika Sen. MIT License.
// Drawn once per look (kind, age, pose, stride, what it is doing ...) with the same drawCreature as the maps,
// and kept, so a figure is a picture that turns to face the camera.
const figTex = new Map(),
  SZ = 128;
function figTexFor(a, v) {
  const S = a.S,
    bm = SOC.bodyModel && a.sp === 0 && a.gp !== undefined, // the body model: the figure shows how far food has let it grow, its inherited size, muscle and how well fed it is
    gr = Math.round(clamp((bm ? Math.min(a.gp, a.age) : a.age) / S.mat, 0.3, 1) * 10) / 10,
    bmKey = bm ? [Math.round((a.g.sz ?? 1) * 20), Math.round((a.msc ?? 1) * 10), Math.round(clamp(((a.eAvg ?? a.e) - 20) / 50, 0, 1) * 4), Math.round((a.g.st ?? 1) * 10)].join('/') : '',
    pose = a.moving ? Math.round(Math.sin(a.ph || 0) * 4) / 2 : 0, // leg positions in a stride
    phq = a.moving ? Math.round(((((a.ph || 0) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / ((2 * Math.PI) / 12)) % 12 : 0, // the stride in twelfths: the picture for each part of a stride (animals' legs follow the whole cycle, not just its sine)
    fastv = (a.mvv || 0) > (a.S.walk || 0.1) * 1.8 ? 1 : 0, // a faster gait (trot): diagonal pairs of legs
    swf = a.act === A_STRIKE && !a.asleep ? Math.round(bodySwing(a)) : 0,
    heldv = typeof carried === 'function' && a.sp === 0 && carried(a) ? 1 : 0, // a carried infant clings to its mother
    stkv = a.stkT !== undefined && tick - a.stkT <= 1 ? a.stk : null, // what its blow lands on, and whether it did what it was for
    okv = a.stkOk !== undefined && tick - a.stkOk <= 1 ? 1 : 0,
    wetv = wetOf(a), // in water: the arms stroke (five steps of the stroke, so only a few pictures are made)
    swimv = (a.swim || 0) >= 0.5 ? 1 : 0, // can it swim (learned): only swimmers stroke
    swv = wetv && swimv ? Math.round(strokeNow() * 2) / 2 : 0,
    key = [
      a.k,
      a.sex,
      gr,
      a.asleep ? 1 : 0,
      pose,
      phq,
      fastv,
      a.asleep ? 0 : a.act >= 8 ? a.act : 0, // what it is doing changes its pose
      a.hand || 0,
      swf,
      wetv,
      swv,
      swimv,
      heldv,
      stkv,
      okv,
      a.face || 1,
      a.preg ? Math.round(clamp(1 - (a.preg.due - tick) / Math.max(1, a.S.gest), 0, 1) * 3) : 0, // how far along a pregnancy is
      a.ptT !== undefined && tick - a.ptT <= 1 ? a.pt : -1, // pointing
      a.sp === 0 ? Math.round(skinOf(a) * 8) : 0, // skin shade
      a.sp === 0 ? ERA : '', // early hominin or modern person
      bmKey,
    ].join();
  let t = figTex.get(key);
  if (t) return t;
  const c = document.createElement('canvas');
  c.width = c.height = SZ;
  const g = c.getContext('2d'),
    fake = {
      sp: a.sp,
      k: a.k,
      S: a.S,
      face: a.face || 1,
      sex: a.sex,
      age: gr * S.mat,
      gp: bm ? gr * S.mat : undefined,
      g: a.sp === 0 ? { sz: bm ? Math.round((a.g.sz ?? 1) * 20) / 20 : 1, st: bm ? Math.round((a.g.st ?? 1) * 10) / 10 : 1 } : undefined,
      msc: bm ? Math.round((a.msc ?? 1) * 10) / 10 : undefined,
      eAvg: bm ? 20 + Math.round(clamp(((a.eAvg ?? a.e) - 20) / 50, 0, 1) * 4) * 12.5 : undefined,
      asleep: a.asleep,
      moving: pose !== 0,
      pose: pose / 2,
      ph: a.sp === 0 ? Math.asin(clamp(pose / 2, -1, 1)) : phq * ((2 * Math.PI) / 12), // the leg position for this picture (animals: the whole stride)
      fast: !!fastv,
      hand: a.hand || 0,
      swf,
      wetv,
      swv,
      swimv,
      heldv,
      stkv,
      okv,
      act: a.act,
      id: 0,
      ptv: a.ptT !== undefined && tick - a.ptT <= 1 ? a.pt : -1,
      skv: a.sp === 0 ? Math.round(skinOf(a) * 8) / 8 : 0,
      pgv: a.preg ? Math.round(clamp(1 - (a.preg.due - tick) / Math.max(1, a.S.gest), 0, 1) * 3) / 3 : 0,
    };
  // draw so that the feet touch the bottom middle of the picture
  if (a.sp === 0) {
    const k = (SZ * 0.82) / 11.5 / (SOC.bodyModel ? 1.12 : 1), // a little room above for the taller ones (body model)
      h = (5.5 + 6 * gr) * k;
    if (fake.asleep) drawCreature(g, fake, SZ / 2, SZ - h * 0.2, k, v);
    else drawCreature(g, fake, SZ / 2, SZ - h * 0.16, k, v);
  } else drawCreature(g, fake, SZ / 2, SZ * 0.97 - (SZ / 18) * 3.5, SZ / 18, v); // feet near the bottom, filling most of the picture
  t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  figTex.set(key, t);
  return t;
}
