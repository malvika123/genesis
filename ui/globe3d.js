// Genesis — The planet in true 3D (WebGL through three.js, vendored in vendor/three.min.js).
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// The land is a sphere whose surface is pushed outward by each place's height, so mountains really
// stand up. Heights are exaggerated (as Google Earth does), because real mountains are far too small
// to see on a whole planet. The sun lights it from the side where it is noon, clouds float on their own
// layer above the mountains, and when you zoom in the camera tilts toward the horizon so you see ranges
// from the side. Creatures are drawn on top, on the ordinary 2D canvas.
//
// If WebGL isn't available, G3D.ok stays false and the page uses the flat-shaded globe instead.

const G3D = { ok: false };
(function () {
  if (typeof THREE === 'undefined') return;
  const glc = document.getElementById('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: glc, antialias: true, alpha: true });
  } catch (e) {
    return;
  }
  if (!renderer.getContext()) return;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const EX = 0.011, // radius gained per km of height (about 70× exaggerated)
    CAPDEG = 10, // the map stops at ±80°; beyond are the polar ice caps
    TS3 = 8; // texture pixels per cell
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(40, 1, 0.0004, 12),
    globe = new THREE.Group();
  scene.add(globe);
  const sky = new THREE.Color(0, 0, 0);
  scene.fog = new THREE.Fog(0x000000, 50, 60);

  // surface pictures: the land (and sea) and, separately, the clouds
  const bandH = H * TS3,
    capH = Math.round((bandH * CAPDEG) / 160);
  const mk = () => {
    const c = document.createElement('canvas');
    c.width = W * TS3;
    c.height = bandH + 2 * capH;
    return c;
  };
  const landC = mk(),
    cloudC = mk(),
    rawC = mk(),
    rg = rawC.getContext('2d'),
    lg = landC.getContext('2d'),
    cg = cloudC.getContext('2d');
  const landTex = new THREE.CanvasTexture(landC),
    cloudTex = new THREE.CanvasTexture(cloudC);
  landTex.encoding = cloudTex.encoding = THREE.sRGBEncoding;
  landTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const geo = new THREE.SphereGeometry(1, 384, 240),
    base = Float32Array.from(geo.attributes.position.array);
  const land = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: landTex }));
  globe.add(land);
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1 + 5.5 * EX, 192, 120),
    new THREE.MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false })
  );
  globe.add(clouds);
  // a thin blue glow around the edge of the planet, like air seen edge-on
  const air = new THREE.Mesh(
    new THREE.SphereGeometry(1.07, 64, 40),
    new THREE.ShaderMaterial({
      vertexShader:
        'varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix * normal); vec4 p = modelViewMatrix * vec4(position,1.0); vP = p.xyz; gl_Position = projectionMatrix * p; }',
      fragmentShader:
        'varying vec3 vN; varying vec3 vP; void main(){ float f = dot(normalize(-vP), vN); float a = pow(clamp(1.0 + f * 1.6, 0.0, 1.0), 4.0); gl_FragColor = vec4(0.47, 0.7, 1.0, a * 0.35); }',
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  scene.add(air);
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  globe.add(sun);
  scene.add(sun.target);
  scene.add(new THREE.AmbientLight(0x8fa3c8, 0.16));

  // height at any latitude/longitude (radians), smoothly between cells; the sea surface is flat
  function heightAt(la, lo) {
    const deg = (la * 180) / Math.PI,
      // beyond ±80° the ice cap carries on smoothly from the map's last row, flattening at the pole
      fade = Math.abs(deg) <= 80 ? 1 : Math.max(0, (90 - Math.abs(deg)) / 10),
      gx = ((lo + Math.PI) / (2 * Math.PI)) * W - 0.5,
      gy = clamp(((80 - deg) / 160) * H - 0.5, 0, H - 1),
      x0 = Math.floor(gx),
      y0 = Math.floor(gy),
      tx = gx - x0,
      ty = gy - y0,
      y1 = Math.min(H - 1, y0 + 1),
      h = (x, y) => Math.max(0, alt[idx(x, y)]);
    return (
      fade *
      ((h(x0, y0) * (1 - tx) + h(x0 + 1, y0) * tx) * (1 - ty) +
        (h(x0, y1) * (1 - tx) + h(x0 + 1, y1) * tx) * ty)
    );
  }
  // lift every vertex of the sphere by the height under it
  let shapedFor = null;
  function shape() {
    const p = geo.attributes.position.array;
    for (let k = 0; k < p.length; k += 3) {
      const x = base[k],
        y = base[k + 1],
        z = base[k + 2],
        la = Math.asin(clamp(y, -1, 1)),
        lo = Math.atan2(-z, x),
        r = 1 + EX * heightAt(la, lo);
      p[k] = x * r;
      p[k + 1] = y * r;
      p[k + 2] = z * r;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    shapedFor = alt;
  }
  // Real trees, shown when you zoom in: cone-shaped pines and round-crowned broadleaf trees, a few per
  // forest cell depending on how thick the forest is. Rebuilt now and then as forests change.
  const MAXT = 16000,
    coneG = new THREE.ConeGeometry(0.0035, 0.011, 7).translate(0, 0.0072, 0),
    crownG = new THREE.IcosahedronGeometry(0.0042, 1).translate(0, 0.0085, 0),
    trunkG = new THREE.CylinderGeometry(0.0005, 0.0008, 0.0048, 5).translate(0, 0.0024, 0),
    trunks = new THREE.InstancedMesh(trunkG, new THREE.MeshLambertMaterial({ color: 0x5a3d26 }), 2 * MAXT),
    pines = new THREE.InstancedMesh(coneG, new THREE.MeshLambertMaterial({ color: 0x24493a }), MAXT),
    leafy = new THREE.InstancedMesh(crownG, new THREE.MeshLambertMaterial({ color: 0x2f6b2a }), MAXT);
  pines.count = leafy.count = trunks.count = 0;
  globe.add(trunks);
  globe.add(pines);
  globe.add(leafy);
  let treesFor = null,
    treeFrame = 0;
  const up = new THREE.Vector3(0, 1, 0),
    q = new THREE.Quaternion(),
    mtx = new THREE.Matrix4(),
    scl = new THREE.Vector3(),
    pos = new THREE.Vector3();
  function plantTrees() {
    let np = 0,
      nl = 0,
      seed = 12345;
    const r01 = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let i = 0; i < W * H && np < MAXT && nl < MAXT; i++) {
      const t = tree[i];
      if (t < 0.2 || water[i]) continue;
      const n = t > 0.65 ? 6 : t > 0.4 ? 4 : 2,
        x = i % W,
        y = (i / W) | 0;
      for (let k = 0; k < n; k++) {
        const gx = x + 0.15 + 0.7 * r01(),
          gy = y + 0.15 + 0.7 * r01(),
          lo = (gx / W) * 2 * Math.PI - Math.PI,
          la = LATMAX * (1 - (2 * gy) / H),
          r = 1 + EX * heightAt(la, lo);
        pos.copy(local(la, lo, r));
        q.setFromUnitVectors(up, pos.clone().normalize());
        const sz = (0.7 + 0.6 * r01()) * (fkind[i] === 3 ? 1.35 : 1);
        scl.set(sz, sz, sz);
        mtx.compose(pos, q, scl);
        trunks.setMatrixAt(np + nl, mtx);
        if (fkind[i] === 1) pines.setMatrixAt(np++, mtx);
        else leafy.setMatrixAt(nl++, mtx);
      }
    }
    pines.count = np;
    leafy.count = nl;
    trunks.count = np + nl;
    pines.instanceMatrix.needsUpdate =
      leafy.instanceMatrix.needsUpdate =
      trunks.instanceMatrix.needsUpdate =
        true;
    treesFor = alt;
  }
  // Caves: a rocky knoll with a hollow inside and an arched mouth. From outside you see the rock and the
  // dark opening; step into the cell and you are inside the hollow, looking at dim stone walls and the
  // bright arch of daylight you came in by. (Simplified: one chamber, no tunnels.)
  const MAXC = 600,
    CR = 0.018, // outcrop radius
    CH = 0.021, // and height
    AW = 0.0042, // half the width of the mouth
    AH = 0.0075, // and its height (a person is about 0.006 tall)
    domeG = new THREE.SphereGeometry(1, 14, 8, 0, 2 * Math.PI, 0, Math.PI / 2),
    rockG = new THREE.IcosahedronGeometry(1, 2),
    archS = new THREE.Shape();
  archS.moveTo(-AW, 0);
  archS.lineTo(-AW, AH - AW);
  archS.absarc(0, AH - AW, AW, Math.PI, 0, true);
  archS.lineTo(AW, 0);
  archS.lineTo(-AW, 0);
  // A craggy boulder: lumps outward only (so the hollow always fits inside), flat underneath (it sits
  // buried in the hillside), and smooth in front where the mouth is.
  {
    const pa = rockG.attributes.position,
      v3 = new THREE.Vector3();
    for (let k = 0; k < pa.count; k++) {
      v3.fromBufferAttribute(pa, k).normalize();
      const hsh = Math.sin(v3.x * 91.7 + v3.y * 53.3 + v3.z * 127.1) * 43758.5453,
        hs2 = Math.sin(v3.x * 17.3 + v3.y * 211.9 + v3.z * 31.7) * 24634.6345,
        lump = (hsh - Math.floor(hsh)) * 0.16 + (hs2 - Math.floor(hs2)) * 0.1,
        front = v3.z > 0.45 && v3.y < 0.62 ? 0 : 1,
        j = 1 + lump * front;
      pa.setXYZ(k, v3.x * j, Math.max(0, v3.y) * j, v3.z * j);
    }
    rockG.computeVertexNormals();
  }
  // (colours here are read as linear light, so they are chosen darker than they will look)
  const archG = new THREE.ShapeGeometry(archS),
    caveRock = new THREE.InstancedMesh(rockG, new THREE.MeshLambertMaterial({ color: 0x28221c, flatShading: true }), MAXC),
    caveHall = new THREE.InstancedMesh(
      domeG,
      new THREE.MeshBasicMaterial({ color: 0x030303, side: THREE.BackSide, fog: false }),
      MAXC
    ),
    caveMouth = new THREE.InstancedMesh(archG, new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, fog: false }), MAXC),
    caveLight = new THREE.InstancedMesh(archG, new THREE.MeshBasicMaterial({ color: 0xbcd4ee, side: THREE.DoubleSide, fog: false }), MAXC);
  for (const m of [caveRock, caveHall, caveMouth, caveLight]) {
    m.count = 0;
    globe.add(m);
  }
  let cavesFor = null;
  function plantCaves() {
    let n = 0;
    const bas = new THREE.Matrix4(),
      qq = new THREE.Quaternion(),
      tw = new THREE.Vector3(),
      f = new THREE.Vector3(),
      rt = new THREE.Vector3(),
      nn = new THREE.Vector3(),
      c0 = new THREE.Vector3(),
      one = new THREE.Vector3(1, 1, 1);
    for (let i = 0; i < W * H && n < MAXC; i++) {
      if (!cave[i] || water[i]) continue;
      const gx = (i % W) + 0.5,
        gy = ((i / W) | 0) + 0.5,
        lo = (gx / W) * 2 * Math.PI - Math.PI,
        la = LATMAX * (1 - (2 * gy) / H),
        r = 1 + EX * heightAt(la, lo);
      // sink it into the slope: down to the lowest ground under it
      let lowest = heightAt(la, lo);
      for (const [da, db] of [[0.01, 0], [-0.01, 0], [0, 0.01], [0, -0.01]])
        lowest = Math.min(lowest, heightAt(la + da, lo + db / Math.max(0.2, Math.cos(la))));
      c0.copy(local(la, lo, r));
      nn.copy(c0).normalize();
      c0.addScaledVector(nn, EX * (lowest - heightAt(la, lo)) - 0.0012);
      // the way the mouth faces: a fixed direction for each cave, along the ground
      tw.set(0, 1, 0);
      if (Math.abs(nn.y) > 0.95) tw.set(1, 0, 0);
      const t1 = tw.clone().cross(nn).normalize(),
        t2 = nn.clone().cross(t1),
        th = ((i * 2654435761) % 6283) / 1000;
      f.copy(t1).multiplyScalar(Math.cos(th)).addScaledVector(t2, Math.sin(th)).normalize();
      rt.copy(nn).cross(f).normalize();
      // the knoll stands behind the middle of the cell, so the middle of the cell is inside its hollow
      const M = c0.clone().addScaledVector(f, -0.0095);
      const place = (mesh, dist, flip, sx, sy, sz) => {
        bas.makeBasis(flip ? rt.clone().negate() : rt, nn, flip ? f.clone().negate() : f);
        qq.setFromRotationMatrix(bas);
        pos.copy(M).addScaledVector(f, dist);
        scl.set(sx, sy, sz);
        mtx.compose(pos, qq, scl);
        mesh.setMatrixAt(n, mtx);
      };
      const sz = 0.8 + 0.5 * (((i * 40503) % 997) / 997); // a different size for each cave
      place(caveRock, 0, false, CR * sz, CH * sz * 0.9, CR * sz);
      const hr = CR * sz * 0.93; // the hollow, always a little smaller than the rock round it
      place(caveHall, 0, false, hr, CH * sz * 0.9 * 0.93, hr);
      place(caveMouth, CR * sz * 1.02 + 0.0004, false, 1, 1, 1);
      place(caveLight, hr - 0.002, true, 1, 1, 1);
      n++;
    }
    for (const m of [caveRock, caveHall, caveMouth, caveLight]) {
      m.count = n;
      m.instanceMatrix.needsUpdate = true;
    }
    cavesFor = cave;
  }
  // a point on the surface (local coordinates) for a latitude/longitude
  const local = (la, lo, r) =>
    new THREE.Vector3(Math.cos(lo) * Math.cos(la) * r, Math.sin(la) * r, -Math.sin(lo) * Math.cos(la) * r);

  let frame = 0;
  function paint(v) {
    // land: the same drawing as the flat map, but without painted shading (the 3D light does that)
    lg.setTransform(1, 0, 0, 1, 0, 0);
    lg.fillStyle = v('--snow');
    lg.fillRect(0, 0, landC.width, landC.height);
    rg.setTransform(1, 0, 0, 1, 0, 0);
    rg.clearRect(0, 0, rawC.width, rawC.height);
    rg.setTransform(TS3 / C, 0, 0, TS3 / C, 0, capH);
    drawTerrain(rg, v, false);
    lg.drawImage(rawC, 0, 0);
    // clouds: drawn cell by cell, then blurred into soft shapes
    rg.setTransform(1, 0, 0, 1, 0, 0);
    rg.clearRect(0, 0, rawC.width, rawC.height);
    rg.setTransform(TS3 / C, 0, 0, TS3 / C, 0, capH);
    drawSky(rg, false);
    cg.setTransform(1, 0, 0, 1, 0, 0);
    cg.clearRect(0, 0, cloudC.width, cloudC.height);
    cg.filter = 'blur(' + TS3 * 0.9 + 'px)';
    cg.drawImage(rawC, 0, 0);
    cg.filter = 'none';
    landTex.needsUpdate = cloudTex.needsUpdate = true;
  }

  G3D.ok = true;
  G3D.repaint = () => (frame = 0);
  G3D.show = (on) => (glc.style.display = on ? 'block' : 'none');

  // place the camera from the shared view state (GL.lon0, GL.lat0, GL.zoom)
  // through a creature's eyes: stand at its place, at eye height, look the way it faces
  let eyeFilter = '';
  let lastEye = null;
  function aimEye(a) {
    const la = latOfY(a.ry),
      lo = lonOfX(a.rx);
    GL.lat0 = la;
    GL.lon0 = lo;
    GL.zoom = 25;
    globe.rotation.set(la, -Math.PI / 2 - lo, 0, 'XYZ');
    const h0 = 1 + EX * heightAt(la, lo),
      eh = a.sp === 0 ? 0.0055 : a.sp === 3 ? 0.0008 : 0.0035,
      [mx, my] = MV[a.hd],
      want = Math.atan2(-my, mx),
      tnow = performance.now(),
      dt = Math.min(0.1, (tnow - (a.eyeT || tnow)) / 1000);
    // the head turns toward where it is going over a moment, and the eyes ride smoothly over bumps,
    // instead of the whole view snapping round or jolting with every square
    a.eyeT = tnow;
    if (a.eyeA === undefined || a !== lastEye) (a.eyeA = want), (a.eyeH = h0), (a.eyeVx = a.eyeVy = 0), (a.eyeX = a.rx), (a.eyeY = a.ry);
    lastEye = a;
    // it looks the way its body is really travelling (averaged over a moment, so a brain flicking
    // between choices doesn't whip the view about), and a head turns at most about 90° a second
    let mx2 = a.rx - a.eyeX;
    if (mx2 > W / 2) mx2 -= W;
    if (mx2 < -W / 2) mx2 += W;
    const k = Math.min(1, dt * 1.5);
    a.eyeVx += (mx2 - a.eyeVx) * k;
    a.eyeVy += (a.ry - a.eyeY - a.eyeVy) * k;
    a.eyeX = a.rx;
    a.eyeY = a.ry;
    if (running && Math.hypot(a.eyeVx, a.eyeVy) > 1e-4) {
      const go = Math.atan2(-a.eyeVy, a.eyeVx),
        turn = Math.atan2(Math.sin(go - a.eyeA), Math.cos(go - a.eyeA)),
        most = dt * (Math.PI / 2);
      a.eyeA += Math.max(-most, Math.min(most, turn));
    }
    a.eyeH += (h0 - a.eyeH) * Math.min(1, dt * 4);
    const ex = Math.cos(a.eyeA),
      ey = Math.sin(a.eyeA),
      hh = Math.max(a.eyeH, h0);
    camera.position.set(0, 0, hh + eh);
    camera.up.set(0, 0, 1);
    camera.lookAt(ex * 0.05, ey * 0.05, hh + eh - 0.003);
    // a screen can show at most about 150° without bending the picture
    const hf = (Math.min(a.S.fov, 150) * Math.PI) / 180,
      fov = (2 * Math.atan(Math.tan(hf / 2) / camera.aspect) * 180) / Math.PI;
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();
    // eyes shut in sleep: almost nothing; at night, animals with good night eyes see more
    const f = a.asleep
      ? 'brightness(0.12)'
      : (a.S.col < 3 && a.sp !== 3 ? 'url(#dichro) ' : '') +
        (isNightAt(a.x) && a.S.nv > 0.8 ? 'brightness(' + (1 + a.S.nv) + ')' : '');
    if (f !== eyeFilter) glc.style.filter = eyeFilter = f;
  }
  G3D.eyeOff = () => {
    glc.style.filter = eyeFilter = '';
    camera.fov = 40;
    camera.updateProjectionMatrix();
    GL.zoom = 8;
  };
  function aim() {
    if (GL.eye && !GL.eye.gone) return aimEye(GL.eye);
    globe.rotation.set(GL.lat0, -Math.PI / 2 - GL.lon0, 0, 'XYZ');
    const z = GL.zoom,
      d = 2.25 / Math.pow(z, 1.35),
      // tilt toward the horizon as you come close; right down near the ground you look almost level
      tilt = clamp((z - 1.6) / 2.6, 0, 1) * 1.1 + clamp(Math.log(z / 5) / Math.log(40 / 5), 0, 1) * 0.36,
      h0 = 1 + EX * heightAt(GL.lat0, GL.lon0);
    camera.position.set(0, -Math.sin(tilt) * d, h0 + Math.cos(tilt) * d);
    globe.updateMatrixWorld(true);
    // never let the camera sink into a hillside
    const lp = globe.worldToLocal(camera.position.clone()),
      ground =
        1 + EX * heightAt(Math.asin(clamp(lp.y / lp.length(), -1, 1)), Math.atan2(-lp.z, lp.x)) + 0.004;
    if (lp.length() < ground) camera.position.copy(globe.localToWorld(lp.setLength(ground)));
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, h0);
    camera.updateMatrixWorld();
  }

  // where a cell appears on the canvas (device pixels), and how big one cell looks; null if out of sight
  const tmp = new THREE.Vector3(),
    nrm = new THREE.Vector3(),
    eye = new THREE.Vector3();
  function project(x, y, lift = 0.004) {
    const la = latOfY(y),
      lo = lonOfX(x),
      r = 1 + EX * heightAt(la, lo) + lift;
    tmp.copy(local(la, lo, r)).applyMatrix4(globe.matrixWorld);
    nrm.copy(tmp).normalize();
    eye.copy(camera.position).sub(tmp);
    if (nrm.dot(eye) <= 0) return null; // round the back of the planet
    const dist = eye.length();
    tmp.project(camera);
    if (tmp.z > 1) return null;
    const px = ((tmp.x + 1) / 2) * cv.width,
      py = ((1 - tmp.y) / 2) * cv.height,
      cell = ((2 * Math.PI) / W / dist) * (cv.height / 2 / Math.tan((camera.fov * Math.PI) / 360));
    return [px, py, cell];
  }
  G3D.project = project;
  G3D.aim = () => aim();
  // the latitude and longitude under a point on the canvas (CSS pixels), or null if it is space
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2(),
    ball = new THREE.Sphere(new THREE.Vector3(), 1);
  G3D.pick = (cx, cy) => {
    const r = glc.getBoundingClientRect();
    ndc.set((cx / r.width) * 2 - 1, -(cy / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    globe.updateMatrixWorld(true);
    // first against the bare planet, then again at the height of the ground found there
    ball.radius = 1;
    let p = null;
    for (let k = 0; k < 3; k++) {
      const hit = ray.ray.intersectSphere(ball, new THREE.Vector3());
      if (!hit) return p;
      p = globe.worldToLocal(hit).normalize();
      const la = Math.asin(clamp(p.y, -1, 1)),
        lo = Math.atan2(-p.z, p.x);
      p = { lat: la, lon: lo };
      ball.radius = 1 + EX * heightAt(la, lo) + 0.004;
    }
    return p;
  };

  // ---- creatures as figures in the 3D world (only when zoomed in close) ----
  const figTex = new Map(),
    pool = [],
    SZ = 128;
  function texFor(a, v) {
    const S = a.S,
      gr = Math.round(clamp(a.age / S.mat, 0.3, 1) * 10) / 10,
      pose = a.moving ? Math.round(Math.sin(a.ph || 0) * 2) : 0,
      swf = a.act === A_STRIKE && !a.asleep ? Math.round(bodySwing(a)) : 0,
      key = [
        a.k,
        a.sex,
        gr,
        a.asleep ? 1 : 0,
        pose,
        a.asleep ? 0 : a.act >= 8 ? a.act : 0, // what it is doing changes its pose
        a.hand || 0,
        swf,
        a.face || 1,
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
        asleep: a.asleep,
        moving: pose !== 0,
        pose: pose / 2,
        ph: Math.asin(clamp(pose / 2, -1, 1)), // the leg position for this picture
        hand: a.hand || 0,
        swf,
        act: a.act,
        id: 0,
      };
    // draw so that the feet touch the bottom middle of the picture
    if (a.sp === 0) {
      const k = (SZ * 0.82) / 11.5,
        h = (5.5 + 6 * gr) * k;
      if (fake.asleep) drawCreature(g, fake, SZ / 2, SZ - h * 0.2, k, v);
      else drawCreature(g, fake, SZ / 2, SZ - h * 0.16, k, v);
    } else drawCreature(g, fake, SZ / 2, SZ * 0.97 - (SZ / 18) * 3.5, SZ / 18, v); // feet near the bottom, filling most of the picture
    t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    figTex.set(key, t);
    return t;
  }
  const FISHTINT = new THREE.Color(0.6, 0.8, 1);
  function figures(on, v) {
    let n = 0;
    if (on)
      for (const a of ag) {
        if (a === GL.eye || !project(a.rx, a.ry, 0)) continue;
        let sp = pool[n];
        if (!sp) {
          sp = new THREE.Sprite(new THREE.SpriteMaterial({ alphaTest: 0.4 }));
          sp.center.set(0.5, 0);
          globe.add(sp);
          pool.push(sp);
        }
        n++;
        sp.visible = true;
        sp.material.map = texFor(a, v);
        sp.material.color.setScalar(isNightAt(a.x) ? 0.45 : 1);
        // fish swim under the surface: seen faintly, tinted by the water above them
        if (a.sp === 3) sp.material.color.multiply(FISHTINT);
        sp.material.opacity = a.sp === 3 ? 0.7 : 1;
        sp.material.transparent = a.sp === 3;
        sp.material.needsUpdate = true;
        const la = latOfY(a.ry),
          lo = lonOfX(a.rx);
        const ci = idx(Math.round(a.rx), Math.round(a.ry)),
          wading = a.sp !== 3 && water[ci] && !river[ci] && !iced(ci);
        sp.position.copy(local(la, lo, 1 + EX * heightAt(la, lo) + (wading ? -0.0025 : 0.0002)));
        // Figures are drawn 2.5 times life size so you can find them among the trees (like the
        // exaggerated mountains), all by the same factor so people and animals keep their true sizes
        // compared with each other (each kind's own size is already in its picture). Fish swim at the surface.
        const s = (a.sp === 0 ? 0.0046 : a.sp === 3 ? 0.0022 : 0.0042 * (18 / 15)) * 2.5;
        sp.scale.set(s, s, 1);
      }
    for (let k = n; k < pool.length; k++) pool[k].visible = false;
  }

  G3D.draw = function (v) {
    const w = cv.width,
      h = cv.height;
    if (renderer.domElement.width !== w || renderer.domElement.height !== h) {
      renderer.setPixelRatio(1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    if (shapedFor !== alt) shape();
    if (treesFor !== alt || treeFrame++ % 600 === 0) plantTrees();
    if (cavesFor !== cave || shapedFor !== alt) plantCaves();
    pines.visible = leafy.visible = trunks.visible = GL.zoom > 1.8;
    if (frame++ % 12 === 0) paint(v);
    spinStep();
    // gently follow a creature you asked to see
    if (GL.follow && GL.follow === sel && !GL.follow.gone && !GL.held) {
      let dl = lonOfX(sel.x) - GL.lon0;
      dl = Math.atan2(Math.sin(dl), Math.cos(dl));
      GL.lon0 += dl * 0.08;
      GL.lat0 += (latOfY(sel.y) - GL.lat0) * 0.08;
      GL.vel = 0;
    }
    aim();
    // the sun is overhead where it is local noon
    const xs = ((((0.5 - (worldT() % DAY) / DAY) * W) % W) + W) % W,
      ls = (xs / W) * 2 * Math.PI - Math.PI;
    sun.position.copy(local(0, ls, 5));
    // close to the ground, space gives way to sky — blue by day, dark at night — with haze far off
    const near = clamp(Math.log(GL.zoom / 6) / Math.log(25 / 6), 0, 1),
      light = clamp(Math.cos(GL.lon0 - ls) * Math.cos(GL.lat0) * 3 + 0.5, 0, 1);
    sky.setRGB(0.04 + 0.5 * light, 0.07 + 0.7 * light, 0.15 + 0.78 * light);
    caveLight.material.color.setRGB(0.05 + 0.7 * light, 0.08 + 0.78 * light, 0.14 + 0.82 * light); // daylight at the mouth, seen from inside
    renderer.setClearColor(sky, near);
    scene.fog.color.copy(sky);
    const dist = camera.position.length() - 1;
    scene.fog.near = near > 0 ? dist * 2 : 50;
    scene.fog.far = near > 0 ? dist * 2 + 0.25 / near : 60;
    // clouds thin out as you come close so you can see the ground; from below they hang overhead
    clouds.material.opacity = GL.zoom < 6 ? clamp(1.25 - 0.22 * GL.zoom, 0.15, 0.9) : 0.15 + 0.35 * near;
    air.visible = GL.zoom < 3;
    renderer.render(scene, camera);

    // creatures and the selection ring on the 2D canvas above
    cx.setTransform(1, 0, 0, 1, 0, 0);
    cx.clearRect(0, 0, w, h);
    // Far away, creatures are drawn as markers on top so you can find them. Close up, they become
    // figures standing on the land itself, so hills and trees can hide them like anything else.
    const close = GL.zoom >= 6;
    figures(close, v);
    if (!close)
      for (const a of ag) {
        const P = project(a.rx, a.ry);
        if (!P) continue;
        const ks = clamp((P[2] / C) * 0.9, 0.25, 9);
        drawCreature(cx, a, P[0], P[1], ks, v, isNightAt(a.x) ? 0.5 : 1);
      }
    if (!GL.eye) drawWeatherFx(cx, project, GL.zoom >= 2.5);
    drawFire(cx, project);
    drawTrails(cx, project);
    if (GL.zoom >= 5 || GL.eye) drawGroundItems(cx, project);
    drawTalk(
      cx,
      (a) => {
        const P = project(a.rx, a.ry);
        if (!P) return null;
        const ks = clamp((P[2] / C) * 0.9, 0.25, 9);
        return [P[0], P[1], close ? Math.max(14, P[2] * 0.11) : 11.5 * ks];
      },
      Math.max(1, cv.width / cv.getBoundingClientRect().width)
    );
    if (GL.eye) drawEyeHands(cx, GL.eye, w, h);
    // the places its eyes can see right now
    if (sel && sel.view && !GL.eye) {
      cx.fillStyle = 'rgba(255,255,220,.13)';
      for (const i of sel.view) {
        const Q = project(i % W, (i / W) | 0);
        if (Q) {
          cx.beginPath();
          cx.arc(Q[0], Q[1], Math.max(1.5, Q[2] * 0.3), 0, 7);
          cx.fill();
        }
      }
    }
    if (sel && !GL.eye) {
      const P = project(sel.rx, sel.ry);
      if (P) {
        cx.strokeStyle = v('--ink');
        cx.lineWidth = 2;
        cx.beginPath();
        cx.arc(P[0], P[1], Math.max(7, 0.9 * P[2]), 0, 7);
        cx.stroke();
      }
    }
  };
})();
