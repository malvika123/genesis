// Genesis — the valley in 3D, at true size (plan item 37; docs/design/valley-3d.md).
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// The owner (24 Nov 2026): "i can't zoom into valley, its like a static page ... why is it not like google earth?"
// On the valley page (?valley) this takes the place of the globe's 3D view: the same page controls (drag, scroll,
// pinch, the creature's eyes) work on a flat piece of land 50 x 60 km at its real size. One unit is one square
// (250 m); heights are true, not exaggerated (1 km of height is 4 squares). Close to the camera the land is filled
// with trees, bushes, grass clumps and boulders at their real sizes, in the numbers the square's cover gives; farther
// off they are only the colour of the map. Creatures stand on the land at true size; when one is too small to see,
// a marker is drawn instead.
//
// It fills the same G3D object as the globe (ui/globe3d.js stays empty on the valley page), so app.js needs few changes.

(function () {
  if (typeof THREE === 'undefined' || !/[?&]valley/.test(location.search)) return;
  const glc = document.getElementById('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: glc, antialias: true, logarithmicDepthBuffer: true });
  } catch (e) {
    return;
  }
  if (!renderer.getContext()) return;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const KM = 4, // squares per km: heights at true scale
    M = 1 / 250, // squares per metre
    TS = 8, // ground picture: pixels per square
    LAT = (11 * Math.PI) / 180; // Hadar and Awash, about 11 °N (for the sun's path)
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(40, 1, 0.0004, 4000),
    skyC = new THREE.Color(0x9cc4e8);
  scene.background = skyC;
  scene.fog = new THREE.Fog(skyC, 100, 1000);
  const hemi = new THREE.HemisphereLight(0xdfeeff, 0x6a5a40, 0.55),
    sun = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(hemi, sun, sun.target);

  // ---------- the land ----------
  // one vertex in the middle of each square, at that square's height; the picture is the flat map's drawing
  let gW = 0,
    gH = 0,
    geo = null,
    land = null;
  const landC = document.createElement('canvas'),
    rawC = document.createElement('canvas'),
    tinyC = document.createElement('canvas'),
    lg = landC.getContext('2d'),
    rg = rawC.getContext('2d'),
    tg = tinyC.getContext('2d'),
    landTex = new THREE.CanvasTexture(landC);
  landTex.encoding = THREE.sRGBEncoding;
  landTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // fine detail laid over the map's colours so the ground close up is not one smooth smear: soil grain and
  // grass speckle repeating every 20 m (a drawing aid, not data)
  const detC = document.createElement('canvas');
  detC.width = detC.height = 256;
  {
    const g = detC.getContext('2d'),
      im = g.createImageData(256, 256);
    let s = 99;
    const r = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const base = new Float32Array(256 * 256);
    for (let k = 0; k < base.length; k++) base[k] = r();
    for (let y = 0; y < 256; y++)
      for (let x = 0; x < 256; x++) {
        // a little blur so it is grain, not static
        let t = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) t += base[((y + dy + 256) & 255) * 256 + ((x + dx + 256) & 255)];
        const v = 0.5 + (t / 9 - 0.5) * 0.55 + (base[y * 256 + x] - 0.5) * 0.18,
          k = (y * 256 + x) * 4;
        im.data[k] = im.data[k + 1] = im.data[k + 2] = Math.round(clamp(v, 0, 1) * 255);
        im.data[k + 3] = 255;
      }
    g.putImageData(im, 0, 0);
  }
  const detTex = new THREE.CanvasTexture(detC);
  detTex.wrapS = detTex.wrapT = THREE.RepeatWrapping;
  const landMat = new THREE.MeshLambertMaterial({ map: landTex });
  landMat.onBeforeCompile = (sh) => {
    sh.uniforms.detailMap = { value: detTex };
    sh.uniforms.detailRep = { value: new THREE.Vector2(1, 1) };
    sh.uniforms.detailAmt = { value: 1 };
    landMat.userData.sh = sh;
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D detailMap;\nuniform vec2 detailRep;\nuniform float detailAmt;')
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb *= mix(1.0, 0.55 + 0.9 * texture2D(detailMap, vUv * detailRep).r, detailAmt);');
  };
  function build() {
    gW = W;
    gH = H;
    if (land) {
      scene.remove(land);
      geo.dispose();
    }
    geo = new THREE.BufferGeometry();
    const pos = new Float32Array(W * H * 3),
      uv = new Float32Array(W * H * 2),
      ix = new Uint32Array((W - 1) * (H - 1) * 6);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const k = y * W + x;
        pos[k * 3] = x + 0.5;
        pos[k * 3 + 2] = y + 0.5;
        uv[k * 2] = (x + 0.5) / W;
        uv[k * 2 + 1] = 1 - (y + 0.5) / H;
      }
    let o = 0;
    for (let y = 0; y < H - 1; y++)
      for (let x = 0; x < W - 1; x++) {
        const a = y * W + x;
        ix.set([a, a + W, a + 1, a + 1, a + W, a + W + 1], o);
        o += 6;
      }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(new THREE.BufferAttribute(ix, 1));
    land = new THREE.Mesh(geo, landMat);
    scene.add(land);
    landC.width = rawC.width = W * TS;
    landC.height = rawC.height = H * TS;
    if (landMat.userData.sh) landMat.userData.sh.uniforms.detailRep.value.set(W * 12.5, H * 12.5);
    shapedFor = null;
  }
  let shapedFor = null;
  function shape() {
    const p = geo.attributes.position.array;
    for (let i = 0; i < W * H; i++) p[i * 3 + 1] = Math.max(0, alt[i]) * KM;
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    shapedFor = alt;
  }
  // the ground's height (in squares) at a place in the scene, smoothly between square middles
  function ground(X, Z) {
    const gx = clamp(X - 0.5, 0, W - 1.001),
      gz = clamp(Z - 0.5, 0, H - 1.001),
      x0 = Math.floor(gx),
      z0 = Math.floor(gz),
      tx = gx - x0,
      tz = gz - z0,
      h = (x, z) => Math.max(0, alt[z * W + x]) * KM;
    return (h(x0, z0) * (1 - tx) + h(x0 + 1, z0) * tx) * (1 - tz) + (h(x0, z0 + 1) * (1 - tx) + h(x0 + 1, z0 + 1) * tx) * tz;
  }
  function paint(v) {
    rg.setTransform(1, 0, 0, 1, 0, 0);
    rg.clearRect(0, 0, rawC.width, rawC.height);
    rg.setTransform(TS / C, 0, 0, TS / C, 0, 0);
    drawTerrain(rg, v, false);
    // soften the squares into each other (the world is still a grid of 250 m squares underneath), with the sharp picture lightly on top
    tinyC.width = W;
    tinyC.height = H;
    tg.imageSmoothingEnabled = true;
    tg.imageSmoothingQuality = 'high';
    tg.drawImage(rawC, 0, 0, W, H);
    lg.setTransform(1, 0, 0, 1, 0, 0);
    lg.imageSmoothingEnabled = true;
    lg.imageSmoothingQuality = 'high';
    lg.drawImage(tinyC, 0, 0, landC.width, landC.height);
    lg.globalAlpha = 0.3;
    lg.drawImage(rawC, 0, 0);
    lg.globalAlpha = 1;
    lg.setTransform(TS / C, 0, 0, TS / C, 0, 0);
    drawRivers(lg, v, v('--water'), 0.32);
    lg.setTransform(1, 0, 0, 1, 0, 0);
    landTex.needsUpdate = true;
    // the window's average land colour, for the land beyond it
    const d = tg.getImageData(0, 0, W, H).data;
    let r = 0,
      gg = 0,
      b = 0,
      n = 0;
    for (let i = 0; i < W * H; i++) if (!water[i]) ((r += d[i * 4]), (gg += d[i * 4 + 1]), (b += d[i * 4 + 2]), n++);
    if (n) skirtCol.setRGB(r / n / 255, gg / n / 255, b / n / 255).convertSRGBToLinear();
    skirtMat.color.copy(skirtCol);
  }

  // ---------- the land beyond the window ----------
  // The simulation runs only in the 50 x 60 km window around the band, but the open valley's land is a rule of position (src/openvalley.js openAltAt), so the land carries on
  // around it: the same hills, river and plateau, 75 km out on every side. Nothing lives or grows there in the simulation, so it is drawn plain, in the window's average colour,
  // without plants or animals; when the band walks that way, the window moves and that land comes alive.
  const SK = 2, // squares between the skirt's points
    SKR = 300; // how far it reaches beyond the window (squares: 75 km)
  let skirt = null,
    skirtFor = null;
  const skirtCol = new THREE.Color(0x5f7f3a),
    skirtMat = new THREE.MeshLambertMaterial({ vertexColors: true, color: skirtCol }); // its colour is the window's average land colour (set after each repaint)
  function buildSkirt(v) {
    if (typeof openAltAt !== 'function' || !SOC.openValley) return;
    if (skirt) (scene.remove(skirt), skirt.geometry.dispose());
    const nx = Math.round((W + 2 * SKR) / SK) + 1,
      nz = Math.round((H + 2 * SKR) / SK) + 1,
      pos = new Float32Array(nx * nz * 3),
      col = new Float32Array(nx * nz * 3),
      ix = [],
      wc = new THREE.Color(0.55, 0.95, 2.6), // times the land colour below: water blue
      base = new THREE.Color(1, 1, 1),
      hill = new THREE.Color(0.78, 0.78, 0.78),
      c = new THREE.Color();
    for (let k = 0; k < nz; k++)
      for (let j = 0; j < nx; j++) {
        const X = -SKR + j * SK,
          Z = -SKR + k * SK,
          aX = OX + X - 0.5,
          aZ = OY + Z - 0.5,
          a = Math.max(0, openAltAt(aX, aZ)),
          inside = X > 0.5 && X < W - 0.5 && Z > 0.5 && Z < H - 0.5,
          q = k * nx + j;
        pos[q * 3] = X;
        pos[q * 3 + 1] = a * KM - (inside ? 0.05 : 0.004);
        pos[q * 3 + 2] = Z;
        const wet = Math.abs(aX - openRiverX(aZ)) < 1.2;
        c.copy(base).lerp(hill, clamp((a - 0.6) / 0.8, 0, 1)); // the plateau's montane bush is darker
        if (wet) c.copy(wc);
        col[q * 3] = c.r;
        col[q * 3 + 1] = c.g;
        col[q * 3 + 2] = c.b;
      }
    for (let k = 0; k < nz - 1; k++)
      for (let j = 0; j < nx - 1; j++) {
        const X0 = -SKR + j * SK,
          Z0 = -SKR + k * SK;
        if (X0 >= 0 && X0 + SK <= W && Z0 >= 0 && Z0 + SK <= H) continue; // the window itself is drawn in full detail
        const a = k * nx + j;
        ix.push(a, a + nx, a + 1, a + 1, a + nx, a + nx + 1);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(ix);
    g.computeVertexNormals();
    skirt = new THREE.Mesh(g, skirtMat);
    scene.add(skirt);
    skirtFor = OX + ',' + OY + ',' + OVSEED;
  }

  // ---------- plants and stones at true size, near the camera ----------
  // Built of simple parts in metres; each kind is one mesh with its colours in it, drawn many times.
  function merge(parts) {
    const gs = parts.map(([g, c]) => [g.index ? g.toNonIndexed() : g, new THREE.Color(c).convertSRGBToLinear()]); // colours as seen, in the light's linear space
    let n = 0;
    for (const [g] of gs) n += g.attributes.position.count;
    const pos = new Float32Array(n * 3),
      col = new Float32Array(n * 3);
    let o = 0;
    for (const [g, c] of gs) {
      pos.set(g.attributes.position.array, o * 3);
      for (let k = 0; k < g.attributes.position.count; k++) ((col[(o + k) * 3] = c.r), (col[(o + k) * 3 + 1] = c.g), (col[(o + k) * 3 + 2] = c.b));
      o += g.attributes.position.count;
    }
    const m = new THREE.BufferGeometry();
    m.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    m.setAttribute('color', new THREE.BufferAttribute(col, 3));
    m.computeVertexNormals();
    return m;
  }
  const BARK = 0x5a4430,
    // The flat-topped acacia (umbrella thorn today 5-20 m, usually 5-10 m, crown wider than tall; Acacia is in the Hadar pollen, Bonnefille et al. 2004):
    // a trunk, three limbs forking outward and a flat crown of four lobes. About 6 m tall and 8 m wide before the size of each tree is drawn (0.8-1.6 times).
    acaciaG = (() => {
      const p = [[new THREE.CylinderGeometry(0.13, 0.2, 2.6, 6).translate(0, 1.3, 0), BARK]];
      for (let b = 0; b < 3; b++) {
        const az = (b * 2 * Math.PI) / 3;
        p.push([new THREE.CylinderGeometry(0.06, 0.1, 3, 5).translate(0, 1.5, 0).rotateZ(0.6).rotateY(az).translate(0, 2.4, 0), BARK]);
        const tx = -Math.sin(0.6) * 3 * Math.cos(az),
          tz = Math.sin(0.6) * 3 * Math.sin(az);
        p.push([new THREE.IcosahedronGeometry(2.1, 1).scale(1, 0.32, 1).translate(tx, 2.4 + Math.cos(0.6) * 3 + 0.3, tz), 0x4c7330]);
      }
      p.push([new THREE.IcosahedronGeometry(2.3, 1).scale(1, 0.3, 1).translate(0, 5.3, 0), 0x557a35]);
      return merge(p);
    })(),
    // a round-crowned tree (riverine trees such as Combretaceae and Tamarix in the Hadar pollen; montane trees on the plateau): about 8 m
    roundG = merge([
      [new THREE.CylinderGeometry(0.16, 0.26, 3.4, 6).translate(0, 1.7, 0), BARK],
      [new THREE.IcosahedronGeometry(2.6, 1).scale(1, 0.85, 1).translate(0, 5.2, 0), 0x3b6a2c],
      [new THREE.IcosahedronGeometry(1.9, 1).translate(1.3, 4.4, 0.6), 0x356326],
      [new THREE.IcosahedronGeometry(1.7, 1).translate(-1.1, 4.6, -0.8), 0x3f7030],
    ]),
    // a bush (Grewia, Acacia, Psiadia shrubs of Awash today): about 1.6 m
    shrubG = merge([
      [new THREE.IcosahedronGeometry(0.9, 1).scale(1.2, 0.9, 1.1).translate(0, 0.75, 0), 0x4a6a2c],
      [new THREE.IcosahedronGeometry(0.7, 1).translate(0.6, 0.6, 0.3), 0x55733a],
      [new THREE.IcosahedronGeometry(0.6, 0).translate(-0.5, 0.5, -0.4), 0x435f28],
    ]),
    // a clump of grass blades, 0.6 to 1 m (needle grasses such as Aristida)
    tuftG = (() => {
      const p = [];
      for (let b = 0; b < 9; b++) {
        const az = (b * 2.399) % 6.283,
          h = 0.6 + 0.2 * (b % 3);
        p.push([
          new THREE.ConeGeometry(0.025, h, 3)
            .translate(0, h / 2, 0)
            .rotateZ(0.2 + 0.12 * (b % 2))
            .rotateY(az)
            .translate(Math.cos(az) * 0.08, 0, Math.sin(az) * 0.08),
          b % 3 ? 0xa8a452 : 0x8c9440,
        ]);
      }
      return merge(p);
    })(),
    // basalt boulders (the Afar rift floor is basalt flows 1-10 m thick; Gona geology): about 1 m
    boulderG = merge([[new THREE.DodecahedronGeometry(0.6, 0).scale(1.2, 0.7, 1).translate(0, 0.25, 0), 0x6e6862]]);
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true }),
    mk = (g, n) => {
      const m = new THREE.InstancedMesh(g, mat, n);
      m.count = 0;
      m.frustumCulled = false;
      m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3).fill(1), 3);
      scene.add(m);
      return m;
    },
    acacias = mk(acaciaG, 14000),
    rounds = mk(roundG, 14000),
    shrubs = mk(shrubG, 16000),
    tufts = mk(tuftG, 24000),
    boulders = mk(boulderG, 5000);

  // A place's own random numbers, from its absolute position in the open valley (OX, OY), so plants stay where they stand when
  // the window moves or the view is rebuilt.
  const fh = (a, b, s) => {
    let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(s, 1274126177);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
  const ox = () => (typeof OX !== 'undefined' ? OX : 0),
    oy = () => (typeof OY !== 'undefined' ? OY : 0);
  // Tree cover is the share of ground under crowns. A crown here covers about 60 m2 (8 to 9 m across), so a 10 x 10 m patch holds a tree
  // with chance cover x 1.6: the number of trees follows the square's cover. (Crown size: a drawing assumption from the shapes above.)
  const NT = 25; // tree patches per square side (10 m)
  function treeIn(i, gxA, gzA) {
    const t = tree[i];
    if (t < 0.02) return 0;
    const p = Math.min(0.95, t * 1.6),
      u = fh(gxA, gzA, 1);
    return u < p ? clamp((p - u) / 0.06, 0.35, 1) : 0; // a tree just at the edge of the cover is young and small, so cover that changes grows or loses trees one at a time
  }
  // the order squares are visited: nearest first
  const RINGS = [];
  for (let dy = -8; dy <= 8; dy++) for (let dx = -8; dx <= 8; dx++) if (Math.hypot(dx, dy) <= 8.5) RINGS.push([dx, dy, Math.hypot(dx, dy)]);
  RINGS.sort((a, b) => a[2] - b[2]);
  const mtx = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    pv = new THREE.Vector3(),
    sv = new THREE.Vector3(),
    Y = new THREE.Vector3(0, 1, 0);
  const put = (mesh, k, X, Z, size, yaw, tint) => {
    pv.set(X, ground(X, Z) - 0.04 * M * size, Z);
    q.setFromAxisAngle(Y, yaw);
    sv.set(size * M, size * M, size * M);
    mtx.compose(pv, q, sv);
    mesh.setMatrixAt(k, mtx);
    mesh.instanceColor.setXYZ(k, tint, tint, tint);
  };
  let plantedAt = null,
    plantFrame = 0;
  function plant(cX, cZ, d) {
    const rTree = clamp(d * 2.5, 1.2, 8),
      rBush = clamp(d * 1.8, 0.8, 4),
      rGrass = clamp(d * 1.2, 0.3, 1.6),
      far = d > 30; // from high up they are smaller than a pixel: only the map's colour
    let na = 0,
      nr = 0,
      ns = 0,
      ng = 0,
      nb = 0;
    const sx0 = Math.floor(cX - 0.5 + 0.5),
      sz0 = Math.floor(cZ - 0.5 + 0.5),
      X0 = ox(),
      Z0 = oy();
    if (!far)
      for (const [dx, dy, r] of RINGS) {
        if (r > rTree + 1) break;
        const x = sx0 + dx,
          y = sz0 + dy;
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        const i = y * W + x;
        if (water[i]) continue;
        const ax = X0 + x,
          az = Z0 + y,
          plateau = alt[i] > 1.2,
          nearRiver = river[i] || (x > 0 && river[i - 1]) || (x < W - 1 && river[i + 1]),
          cell = (u, v) => Math.hypot(x + (u + 0.5) / NT - cX, y + (v + 0.5) / NT - cZ);
        // trees: acacias on the open floor; round-crowned trees by the river and on the plateau, and one in four elsewhere (Commiphora, Grewia ...). Which tree is which: a drawing choice.
        if (r <= rTree + 1)
          for (let v = 0; v < NT; v++)
            for (let u = 0; u < NT; u++) {
              const gxA = ax * NT + u,
                gzA = az * NT + v,
                grow = treeIn(i, gxA, gzA);
              if (!grow || cell(u, v) > rTree) continue;
              const X = x + (u + 0.2 + 0.6 * fh(gxA, gzA, 2)) / NT,
                Z = y + (v + 0.2 + 0.6 * fh(gxA, gzA, 3)) / NT,
                size = (0.8 + 0.8 * fh(gxA, gzA, 4)) * grow,
                yaw = fh(gxA, gzA, 5) * 6.283,
                tint = 0.85 + 0.3 * fh(gxA, gzA, 6);
              if (!nearRiver && !plateau && fh(gxA, gzA, 7) < 0.75) {
                if (na < acacias.instanceMatrix.count) put(acacias, na++, X, Z, size, yaw, tint);
              } else if (nr < rounds.instanceMatrix.count) put(rounds, nr++, X, Z, size * (nearRiver ? 1.25 : 1), yaw, tint);
            }
        // bushes (10 m patches): most in thin cover, an understory under woodland; grass clumps (5 m patches) where the grass is thick (30% of squares, the Hadar C4 grass share);
        // boulders on bare rock and stony ground. How many: drawing choices (no densities found).
        if (r <= rBush + 1) {
          const t = tree[i],
            pB = t < 0.04 ? 0 : t < 0.15 ? 0.1 : t < 0.35 ? 0.16 : t < 0.55 ? 0.1 : 0.05,
            pR = rock[i] ? 0.05 : ter[i] === 2 ? 0.012 : 0.001;
          for (let v = 0; v < NT; v++)
            for (let u = 0; u < NT; u++) {
              if (cell(u, v) > rBush) continue;
              const gxA = ax * NT + u,
                gzA = az * NT + v,
                X = x + (u + fh(gxA, gzA, 12)) / NT,
                Z = y + (v + fh(gxA, gzA, 13)) / NT;
              if (fh(gxA, gzA, 11) < pB && ns < shrubs.instanceMatrix.count) put(shrubs, ns++, X, Z, 0.7 + 0.8 * fh(gxA, gzA, 14), fh(gxA, gzA, 15) * 6.283, 0.85 + 0.3 * fh(gxA, gzA, 16));
              if (fh(gxA, gzA, 17) < pR && nb < boulders.instanceMatrix.count) put(boulders, nb++, X, Z, 0.5 + 1.6 * fh(gxA, gzA, 18) ** 2, fh(gxA, gzA, 19) * 6.283, 0.8 + 0.3 * fh(gxA, gzA, 20));
            }
        }
        if (r <= rGrass + 1 && tree[i] < 0.8 && ter[i] !== 1 && fh(ax, az, 30) < 0.3) {
          const NG = 50,
            pG = food[i] > 0.7 ? 0.45 : food[i] > 0.45 ? 0.3 : food[i] > 0.2 ? 0.15 : 0.05;
          for (let v = 0; v < NG; v++)
            for (let u = 0; u < NG; u++) {
              const gxA = ax * NG + u,
                gzA = az * NG + v;
              if (fh(gxA, gzA, 21) >= pG || ng >= tufts.instanceMatrix.count) continue;
              const X = x + (u + fh(gxA, gzA, 22)) / NG,
                Z = y + (v + fh(gxA, gzA, 23)) / NG;
              if (Math.hypot(X - cX, Z - cZ) > rGrass) continue;
              put(tufts, ng++, X, Z, (0.6 + 0.8 * food[i]) * (0.8 + 0.5 * fh(gxA, gzA, 24)), fh(gxA, gzA, 25) * 6.283, 0.85 + 0.3 * fh(gxA, gzA, 26));
            }
        }
      }
    acacias.count = na;
    rounds.count = nr;
    shrubs.count = ns;
    tufts.count = ng;
    boulders.count = nb;
    for (const m of [acacias, rounds, shrubs, tufts, boulders]) ((m.instanceMatrix.needsUpdate = true), (m.instanceColor.needsUpdate = true));
    plantedAt = { X: cX, Z: cZ, d, ox: X0, oy: Z0, alt };
  }
  // a walking figure passes beside a trunk, not through it (drawing only): pushed out of the trees drawn near it
  function pushFromTrees(X, Z) {
    const X0 = ox(),
      Z0 = oy();
    for (let pass = 0; pass < 2; pass++) {
      const fx = Math.floor(X * NT),
        fz = Math.floor(Z * NT);
      for (let a = -1; a <= 1; a++)
        for (let b = -1; b <= 1; b++) {
          const gx = fx + a,
            gz = fz + b,
            x = Math.floor(gx / NT),
            y = Math.floor(gz / NT);
          if (x < 0 || y < 0 || x >= W || y >= H) continue;
          const i = y * W + x,
            u = gx - x * NT,
            v = gz - y * NT,
            gxA = (X0 + x) * NT + u,
            gzA = (Z0 + y) * NT + v,
            grow = water[i] ? 0 : treeIn(i, gxA, gzA);
          if (!grow) continue;
          const tx = x + (u + 0.2 + 0.6 * fh(gxA, gzA, 2)) / NT,
            tz = y + (v + 0.2 + 0.6 * fh(gxA, gzA, 3)) / NT,
            rad = 0.7 * M * (0.8 + 0.8 * fh(gxA, gzA, 4)) * grow,
            dd = Math.hypot(X - tx, Z - tz);
          if (dd < rad && dd > 1e-7) ((X = tx + ((X - tx) / dd) * rad), (Z = tz + ((Z - tz) / dd) * rad));
        }
    }
    return [X, Z];
  }

  // ---------- the camera ----------
  // The page keeps the view as a longitude and latitude (GL.lon0, GL.lat0, as on the globe); here they name a square of the valley.
  const VW = { yaw: 0, tilt: 0 }; // turned (around the vertical) and tilted by the viewer (right-drag or shift-drag)
  const sqX = () => ((GL.lon0 + Math.PI) / (2 * Math.PI)) * W,
    sqZ = () => (1 - GL.lat0 / LATMAX) * (H / 2),
    setSq = (X, Z) => {
      X = clamp(X, 0, W);
      Z = clamp(Z, 0, H);
      GL.lon0 = (X / W) * 2 * Math.PI - Math.PI;
      GL.lat0 = LATMAX * (1 - (2 * Z) / H);
    };
  const dist = () => 340 / Math.pow(clamp(GL.zoom, 1, 40), 2.6), // from 85 km up (the whole valley) to about 6 m from the ground
    autoTilt = () => clamp(Math.log(GL.zoom / 2) / Math.log(28 / 2), 0, 1) * 1.3; // look straight down from high up; toward the horizon close to the ground
  let lastEye = null;
  function aimEye(a) {
    const X0 = a.rx + 0.5,
      Z0 = a.ry + 0.5,
      h0 = ground(X0, Z0),
      eh = (a.sp === 0 ? 1.2 * clamp(a.age / a.S.mat, 0.45, 1) : 0.9) * M, // eye height: about 1.2 m for a grown hominin standing, lower for a child (other kinds: 0.9 m, a simplification)
      tnow = performance.now(),
      dt = Math.min(0.1, (tnow - (a.eyeT || tnow)) / 1000);
    a.eyeT = tnow;
    if (a.eyeA === undefined || a !== lastEye) {
      const [mx, my] = MV[a.hd] || [1, 0];
      a.eyeA = Math.atan2(-my, mx);
      a.eyeH = h0;
      a.eyeVx = a.eyeVy = 0;
      a.eyeX = a.rx;
      a.eyeY = a.ry;
    }
    lastEye = a;
    // it looks the way its body is travelling (averaged over a moment), turning its head at most about 90° a second
    const k = Math.min(1, dt * 1.5);
    a.eyeVx += (a.rx - a.eyeX - a.eyeVx) * k;
    a.eyeVy += (a.ry - a.eyeY - a.eyeVy) * k;
    a.eyeX = a.rx;
    a.eyeY = a.ry;
    if (running && Math.hypot(a.eyeVx, a.eyeVy) > 1e-5) {
      const go = Math.atan2(-a.eyeVy, a.eyeVx),
        turn = Math.atan2(Math.sin(go - a.eyeA), Math.cos(go - a.eyeA)),
        most = dt * (Math.PI / 2);
      a.eyeA += Math.max(-most, Math.min(most, turn));
    }
    a.eyeH += (h0 - a.eyeH) * Math.min(1, dt * 4);
    const hh = Math.max(a.eyeH, h0) + eh;
    camera.position.set(X0, hh, Z0);
    camera.up.set(0, 1, 0);
    camera.lookAt(X0 + Math.cos(a.eyeA), hh - 0.012, Z0 - Math.sin(a.eyeA));
    const hf = (Math.min(a.S.fov, 150) * Math.PI) / 180,
      fov = (2 * Math.atan(Math.tan(hf / 2) / camera.aspect) * 180) / Math.PI;
    if (camera.fov !== fov) ((camera.fov = fov), camera.updateProjectionMatrix());
    camera.updateMatrixWorld();
    const f = a.asleep ? 'brightness(0.12)' : (a.S.col < 3 ? 'url(#dichro) ' : '') + (isNightAt(a.x) && a.S.nv > 0.8 ? 'brightness(' + (1 + a.S.nv) + ')' : '');
    if (f !== eyeFilter) glc.style.filter = eyeFilter = f;
  }
  let eyeFilter = '';
  function aim() {
    if (GL.eye && !GL.eye.gone) return aimEye(GL.eye);
    setSq(sqX(), sqZ());
    const X = sqX(),
      Z = sqZ(),
      d = dist(),
      tilt = clamp(autoTilt() + VW.tilt, 0.02, 1.45),
      h0 = ground(X, Z),
      bx = Math.sin(VW.yaw),
      bz = Math.cos(VW.yaw);
    camera.position.set(X + bx * Math.sin(tilt) * d, h0 + Math.cos(tilt) * d, Z + bz * Math.sin(tilt) * d);
    // never into a hillside
    const g = ground(camera.position.x, camera.position.z) + 0.6 * M;
    if (camera.position.y < g) camera.position.y = g;
    camera.up.set(0, 1, 0);
    camera.lookAt(X, h0, Z);
    camera.updateMatrixWorld();
  }

  // where a square's place appears on the canvas (device pixels), and how big one square looks there; null if out of sight
  const tmp = new THREE.Vector3();
  function project(x, y, lift = 0) {
    const X = x + 0.5,
      Z = y + 0.5;
    tmp.set(X, ground(X, Z) + lift, Z);
    const d = tmp.distanceTo(camera.position);
    tmp.project(camera);
    if (tmp.z > 1 || tmp.z < -1 || Math.abs(tmp.x) > 1.3 || Math.abs(tmp.y) > 1.3) return null;
    return [((tmp.x + 1) / 2) * cv.width, ((1 - tmp.y) / 2) * cv.height, cv.height / 2 / Math.tan((camera.fov * Math.PI) / 360) / Math.max(d, 1e-6)];
  }
  // the place on the ground under a point on the canvas (CSS pixels): walk along the line of sight until it meets the land
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2();
  function pickXZ(cx0, cy0) {
    const r = glc.getBoundingClientRect();
    ndc.set((cx0 / r.width) * 2 - 1, -(cy0 / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const o = ray.ray.origin,
      dir = ray.ray.direction;
    let t = 0,
      tPrev = 0;
    for (let k = 0; k < 400; k++) {
      const X = o.x + dir.x * t,
        Yy = o.y + dir.y * t,
        Z = o.z + dir.z * t,
        above = Yy - ground(X, Z);
      if (above <= 0) {
        let lo = tPrev,
          hi = t;
        for (let j = 0; j < 20; j++) {
          const m = (lo + hi) / 2;
          if (o.y + dir.y * m - ground(o.x + dir.x * m, o.z + dir.z * m) > 0) lo = m;
          else hi = m;
        }
        return [o.x + dir.x * hi, o.z + dir.z * hi];
      }
      if (dir.y >= 0 && above > 50) return null; // looking up into the sky
      tPrev = t;
      t += Math.max(0.0005, above * 0.5);
      if (t > 3000) return null;
    }
    return null;
  }

  // ---------- creatures ----------
  const pool = [],
    HOM = 1.6 * M, // the picture's height: an adult hominin fills about 0.82 of it, so about 1.3 m tall (australopiths about 1.0-1.5 m)
    ANI = HOM * 1.096; // other kinds: the same ratio as on the globe; each kind's own size is in its picture
  const figH = (a) => (a.sp === 0 ? HOM : ANI) * 0.82;
  function figures(v) {
    let n = 0;
    const markers = [];
    camera.updateMatrixWorld();
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    for (const a of ag) {
      if (a === GL.eye || a.sp === 3) continue; // fish live under water: not drawn here yet
      const P = project(a.rx, a.ry);
      if (!P) continue;
      if (figH(a) * P[2] < 14) {
        markers.push([a, P]);
        continue;
      }
      let sp = pool[n];
      if (!sp) {
        sp = new THREE.Sprite(new THREE.SpriteMaterial({ alphaTest: 0.4 }));
        sp.center.set(0.5, 0);
        scene.add(sp);
        pool.push(sp);
      }
      n++;
      sp.visible = true;
      // which way it faces on screen (see globe3d): the way it walks as the viewer sees it
      const savedFace = a.face;
      if (a.fdx !== undefined) {
        const d = a.fdx * right.x + a.fdy * right.z;
        if (Math.abs(d) > 0.25 * Math.hypot(a.fdx, a.fdy)) a.faceS = d > 0 ? 1 : -1;
        if (a.faceS !== undefined) a.face = a.faceS;
      }
      sp.material.map = figTexFor(a, v);
      a.face = savedFace;
      sp.material.color.setScalar(isNightAt(a.x) ? 0.45 : 1);
      sp.material.needsUpdate = true;
      const s = a.sp === 0 ? HOM : ANI;
      let [X, Z] = a.asleep || a.up ? [a.rx + 0.5, a.ry + 0.5] : pushFromTrees(a.rx + 0.5, a.ry + 0.5);
      let y = ground(X, Z);
      const ci = idx(Math.round(a.rx), Math.round(a.ry));
      if (water[ci])
        y -= (deep[ci] ? 0.78 : 0.3) * s * 0.82; // in water the body is in it, not on it
      else if (a.up)
        y += 4 * M; // asleep up a tree: in the crown (about 4 m up)
      else {
        const lift = a.sp === 0 && typeof carried === 'function' && carried(a) ? (a.asleep ? 0.06 : 0.27) * s * 0.7 : 0,
          bob = a.moving && !a.asleep && a.sp === 0 ? Math.abs(Math.sin(a.ph || 0)) * 0.02 * s : 0;
        y += lift + bob;
      }
      sp.position.set(X, y, Z);
      sp.scale.set(s, s, 1);
    }
    for (let k = n; k < pool.length; k++) pool[k].visible = false;
    return markers;
  }

  G3D.ok = true;
  G3D.valley = true;
  G3D.repaint = () => (paintFrame = 0);
  G3D.show = (on) => (glc.style.display = on ? 'block' : 'none');
  G3D.eyeOff = () => {
    glc.style.filter = eyeFilter = '';
    camera.fov = 40;
    camera.updateProjectionMatrix();
  };
  G3D.project = project;
  G3D.aim = () => aim();
  G3D.pick = (cx0, cy0) => {
    const p = pickXZ(cx0, cy0);
    return p ? { lon: (p[0] / W) * 2 * Math.PI - Math.PI, lat: LATMAX * (1 - (2 * p[1]) / H) } : null;
  };
  // drag: the ground under the pointer follows it (grab and move, as in a map); with the right button or Shift held, turn and tilt the view
  G3D.drag = (cx0, cy0, dx, dy, turn) => {
    if (turn) {
      VW.yaw -= dx * 0.006;
      VW.tilt = clamp(VW.tilt - dy * 0.004, -1.4, 1.4);
      return;
    }
    aim();
    const a = pickXZ(cx0 - dx, cy0 - dy),
      b = pickXZ(cx0, cy0);
    if (a && b) setSq(sqX() + a[0] - b[0], sqZ() + a[1] - b[1]);
  };
  // how tall a creature looks on screen (CSS pixels), for picking it with a click
  G3D.tallOf = (a, P) => Math.max(14, figH(a) * P[2]);

  let paintFrame = 0,
    lastOX = null,
    lastOY = null;
  G3D.draw = function (v) {
    const w = cv.width,
      h = cv.height;
    if (renderer.domElement.width !== w || renderer.domElement.height !== h) {
      renderer.setPixelRatio(1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    if (gW !== W || gH !== H || !geo) build();
    // the open valley's window moved (src/openvalley.js): the land under the view is the same, at new square numbers
    if (typeof OX !== 'undefined' && lastOX !== null && (OX !== lastOX || OY !== lastOY)) {
      setSq(sqX() - (OX - lastOX), sqZ() - (OY - lastOY));
      for (const a of ag) if (a.eyeX !== undefined) ((a.eyeX -= OX - lastOX), (a.eyeY -= OY - lastOY));
      shapedFor = null;
      paintFrame = 0;
      plantedAt = null;
    }
    lastOX = typeof OX !== 'undefined' ? OX : 0;
    lastOY = typeof OY !== 'undefined' ? OY : 0;
    if (shapedFor !== alt) shape();
    if (typeof OX !== 'undefined' && skirtFor !== OX + ',' + OY + ',' + OVSEED) buildSkirt(v);
    if (paintFrame++ % 90 === 0) paint(v);
    // gently follow a creature you asked to see
    if (GL.follow && GL.follow === sel && !GL.follow.gone && !GL.held) setSq(sqX() + (sel.rx + 0.5 - sqX()) * 0.08, sqZ() + (sel.ry + 0.5 - sqZ()) * 0.08);
    aim();
    // plants near what you are looking at (or around the creature whose eyes you see through)
    const cX = GL.eye ? GL.eye.rx + 0.5 : sqX(),
      cZ = GL.eye ? GL.eye.ry + 0.5 : sqZ(),
      d = GL.eye ? 0.3 : dist();
    if (!plantedAt || plantedAt.alt !== alt || Math.hypot(cX - plantedAt.X, cZ - plantedAt.Z) > clamp(d * 0.6, 0.15, 3) || d / plantedAt.d > 1.6 || plantedAt.d / d > 1.6 || plantFrame++ > 600) {
      plant(cX, cZ, d);
      plantFrame = 0;
    }
    if (landMat.userData.sh) landMat.userData.sh.uniforms.detailRep.value.set(W * 12.5, H * 12.5);
    // the sun's path at about 11 °N (no seasons yet: as at an equinox); the page's local time runs 0 to 1 with noon at 0.5
    const p = (((worldT() % DAY) / DAY + 0.5) % 1) - 0.5,
      ha = p * 2 * Math.PI,
      up = Math.cos(LAT) * Math.cos(ha),
      east = -Math.sin(ha),
      north = -Math.sin(LAT) * Math.cos(ha),
      day = clamp((up + 0.1) / 0.35, 0, 1);
    sun.position.set(cX + east * 100, ground(cX, cZ) + up * 100, cZ - north * 100);
    sun.target.position.set(cX, ground(cX, cZ), cZ);
    sun.intensity = 0.95 * day;
    sun.color.setRGB(1, 0.75 + 0.25 * clamp(up / 0.4, 0, 1), 0.55 + 0.45 * clamp(up / 0.4, 0, 1)); // a low sun is warm
    hemi.intensity = 0.12 + 0.48 * day;
    skyC.setRGB(0.03 + 0.58 * day, 0.05 + 0.72 * day, 0.12 + 0.8 * day);
    scene.background = skyC;
    scene.fog.color.copy(skyC);
    // haze far off: about 20 km seen from the ground; none when looking down from high up
    const hc = camera.position.y - ground(camera.position.x, camera.position.z);
    scene.fog.near = 20 + hc * 3;
    scene.fog.far = 90 + hc * 8;
    if (landMat.userData.sh) landMat.userData.sh.uniforms.detailAmt.value = clamp(1.3 - hc / 3, 0, 1); // the grain only close to the ground (from high up it would shimmer)
    const far = !GL.eye && dist() > 30;
    acacias.visible = rounds.visible = shrubs.visible = tufts.visible = boulders.visible = !far;
    cx.setTransform(1, 0, 0, 1, 0, 0);
    cx.clearRect(0, 0, w, h);
    const markers = figures(v);
    renderer.render(scene, camera);

    // the 2D layer above: markers for creatures too small to see, and the page's usual overlays
    const sizeP = (k, lo, hi) => (x, y) => {
      const P = project(x, y);
      return P ? [P[0], P[1], clamp(P[2] * k, lo, hi)] : null;
    };
    if (typeof drawBodies === 'function') drawBodies(cx, sizeP(1, 0, 600), 0, 0);
    for (const [a, P] of markers) drawCreature(cx, a, P[0], P[1], clamp((P[2] / C) * 3, 0.45, 1.1), v, isNightAt(a.x) ? 0.5 : 1);
    if (!GL.eye) drawWeatherFx(cx, sizeP(1, 0, 80), true);
    drawFire(cx, sizeP(1, 0, 400));
    drawCarrion(cx, sizeP(1, 0, 200));
    drawSounds(cx, sizeP(12, 0, 1e5)); // a sound's reach is drawn in units of 3 km squares (the globe's): 12 of these squares
    drawTrails(cx, sizeP(1, 0, 30));
    drawTalk(
      cx,
      (a) => {
        const P = project(a.rx, a.ry);
        return P ? [P[0], P[1], Math.max(14, figH(a) * P[2])] : null;
      },
      Math.max(1, cv.width / cv.getBoundingClientRect().width)
    );
    if (GL.eye) drawEyeHands(cx, GL.eye, w, h);
    if (sel && sel.view && !GL.eye) {
      cx.fillStyle = 'rgba(255,255,220,.13)';
      for (const i of sel.view) {
        const Q = project(i % W, (i / W) | 0);
        if (Q) {
          cx.beginPath();
          cx.arc(Q[0], Q[1], clamp(Q[2] * 0.3, 1.5, 40), 0, 7);
          cx.fill();
        }
      }
    }
    if (sel && !GL.eye) {
      const P = project(sel.rx, sel.ry);
      if (P) {
        const r = Math.max(9, 0.7 * figH(sel) * P[2]);
        cx.lineWidth = 5;
        cx.strokeStyle = 'rgba(0,0,0,.45)';
        cx.beginPath();
        cx.arc(P[0], P[1], r, 0, 7);
        cx.stroke();
        cx.lineWidth = 2.5;
        cx.strokeStyle = '#ffd84a';
        cx.beginPath();
        cx.arc(P[0], P[1], r, 0, 7);
        cx.stroke();
      }
    }
  };
})();
