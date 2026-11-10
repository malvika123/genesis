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

  // ---- the realistic view (the "Realistic" button): real water and a real sky, drawn only when asked
  // for, because they cost more to draw. Both change only the picture, never the world. ----
  const REAL = { on: false };
  // where the water is, painted in the same places as the land picture: red = open water (and rivers),
  // green = how deep it is
  const maskC = mk(),
    mg = maskC.getContext('2d'),
    maskB = mk(),
    mbg = maskB.getContext('2d'),
    maskTex = new THREE.CanvasTexture(maskB);
  const waterMat = new THREE.ShaderMaterial({
    uniforms: {
      mask: { value: maskTex },
      time: { value: 0 },
      sunV: { value: new THREE.Vector3(0, 0, 1) },
      fogC: { value: new THREE.Color() },
      fogN: { value: 50 },
      fogF: { value: 60 },
      nrmM: { value: new THREE.Matrix3() },
    },
    vertexShader: `
      varying vec2 vUv; varying vec3 vN; varying vec3 vP; varying vec3 vO;
      void main() {
        vUv = uv;
        vO = normalize(position);
        vN = normalize(normalMatrix * vO); // still water lies level, whatever the ground under it does
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        vP = p.xyz;
        gl_Position = projectionMatrix * p;
      }`,
    fragmentShader: `
      uniform sampler2D mask; uniform float time; uniform vec3 sunV; uniform mat3 nrmM; uniform vec3 fogC; uniform float fogN; uniform float fogF;
      varying vec2 vUv; varying vec3 vN; varying vec3 vP; varying vec3 vO;
      // the slope of the water: a few trains of small waves running different ways
      vec3 wave(vec3 o, vec3 d, float k, float sp, float a) {
        float ph = dot(o, d) * k;
        // fade a train of waves out where its crests come closer together on screen than a few pixels
        // (seen from far off they blur into the water's colour, instead of shimmering in a pattern)
        float aa = 1.0 - smoothstep(0.35, 1.2, fwidth(ph));
        return d * a * aa * cos(ph + time * sp);
      }
      void main() {
        vec4 m = texture2D(mask, vUv);
        if (m.r < 0.03) discard;
        float dist = length(vP);
        float near = 1.0 - smoothstep(0.03, 0.5, dist), fine = 1.0 - smoothstep(0.01, 0.12, dist);
        vec3 g = wave(vO, normalize(vec3(0.8, 0.1, 0.6)), 1900.0, 1.3, 0.10 * near)
               + wave(vO, normalize(vec3(-0.3, 0.7, 0.65)), 2600.0, 1.7, 0.08 * near)
               + wave(vO, normalize(vec3(0.5, -0.6, 0.2)), 6100.0, 2.9, 0.05 * fine)
               + wave(vO, normalize(vec3(-0.7, -0.2, -0.6)), 8300.0, 3.7, 0.04 * fine);
        g -= dot(g, vO) * vO;
        vec3 Nf = normalize(vN), N = normalize(Nf - nrmM * g), V = normalize(-vP), L = normalize(sunV);
        // daylight here: the sun above this place's horizon (the light fades through dusk)
        float day = smoothstep(-0.12, 0.2, dot(Nf, L)), sunUp = smoothstep(-0.02, 0.06, dot(Nf, L));
        float depth = m.g;
        // the water's own colour: light from the bed in the shallows, dark blue where it is deep
        vec3 body = mix(vec3(0.06, 0.30, 0.30), vec3(0.008, 0.05, 0.13), depth);
        body *= 0.05 + 0.95 * day;
        // the sky mirrored in it, most of all when seen at a low angle (Fresnel)
        float cosV = max(dot(N, V), 0.0), fr = 0.02 + 0.98 * pow(1.0 - cosV, 5.0);
        vec3 R = reflect(-V, N);
        float up = clamp(dot(R, Nf), 0.0, 1.0);
        vec3 sky = mix(vec3(0.5, 0.65, 0.85), vec3(0.08, 0.22, 0.6), up) * day + vec3(0.003, 0.004, 0.012);
        // and the sun's glint off the waves
        float spec = pow(max(dot(R, L), 0.0), 400.0) * 3.0 * sunUp + pow(max(dot(R, L), 0.0), 40.0) * 0.12 * sunUp;
        vec3 col = mix(body, sky, fr) + vec3(1.0, 0.92, 0.8) * spec;
        col = mix(col, fogC, smoothstep(fogN, fogF, dist));
        // shallow water is clear enough to see the bed (and fish) through, deep water is not
        float a = m.r * mix(0.55 + 0.4 * depth, 1.0, fr);
        gl_FragColor = linearToOutputTexel(vec4(col, a));
      }`,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -8,
  });
  const waterSkin = new THREE.Mesh(geo, waterMat);
  waterSkin.renderOrder = 1;
  waterSkin.visible = false;
  globe.add(waterSkin);
  // the sky seen from near the ground: blue overhead, pale at the horizon, red toward a low sun (light
  // scattered by the air, as on Earth), the sun's disc, and stars at night
  const skyMat = new THREE.ShaderMaterial({
    uniforms: { sunW: { value: new THREE.Vector3() }, upW: { value: new THREE.Vector3(0, 1, 0) }, op: { value: 0 } },
    vertexShader: `
      varying vec3 vD;
      void main() { vD = (modelMatrix * vec4(position, 1.0)).xyz - cameraPosition; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform vec3 sunW; uniform vec3 upW; uniform float op; varying vec3 vD;
      float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
      void main() {
        vec3 d = normalize(vD), s = normalize(sunW), u = normalize(upW);
        float e = dot(d, u), sa = dot(s, u), day = smoothstep(-0.18, 0.12, sa), twi = smoothstep(-0.3, 0.0, sa);
        vec3 zen = mix(vec3(0.003, 0.005, 0.018), vec3(0.05, 0.18, 0.6), day);
        vec3 hor = mix(vec3(0.008, 0.012, 0.035), vec3(0.5, 0.66, 0.88), day);
        float t = pow(1.0 - clamp(e, 0.0, 1.0), 4.0);
        vec3 col = mix(zen, hor, t);
        float cs = max(dot(d, s), 0.0), low = 1.0 - smoothstep(0.0, 0.45, sa);
        col += vec3(1.0, 0.38, 0.1) * pow(cs, 5.0) * t * low * twi * 0.9;
        col += vec3(0.9, 0.5, 0.3) * t * low * twi * 0.12;
        col += vec3(1.0, 0.75, 0.45) * pow(cs, 90.0) * 0.6 * twi;
        col += vec3(6.0, 5.6, 5.0) * smoothstep(0.99955, 0.9997, cs) * step(-0.03, sa);
        if (e > 0.0 && day < 0.6) {
          vec3 c = floor(d * 420.0);
          float h = hash(c);
          if (h > 0.9965) col += vec3(0.9, 0.92, 1.0) * (h - 0.9965) * 300.0 * (1.0 - day / 0.6) * smoothstep(0.0, 0.1, e);
        }
        gl_FragColor = linearToOutputTexel(vec4(col, op));
      }`,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    fog: false,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(5, 48, 24), skyMat);
  skyDome.renderOrder = -1;
  skyDome.frustumCulled = false;
  skyDome.visible = false;
  const skyScene = new THREE.Scene(); // drawn first, behind everything
  skyScene.add(skyDome);
  function paintWater(v) {
    mg.setTransform(1, 0, 0, 1, 0, 0);
    mg.fillStyle = '#000';
    mg.fillRect(0, 0, maskC.width, maskC.height);
    mg.setTransform(TS3 / C, 0, 0, TS3 / C, 0, capH);
    for (let i = 0; i < W * H; i++) {
      if (!water[i] || river[i] || iced(i)) continue;
      const dp = salt[i] ? 0.25 + 0.75 * Math.min(1, -alt[i] / 2) : deep[i] ? 0.55 : 0.15;
      mg.fillStyle = 'rgb(255,' + Math.round(dp * 255) + ',0)';
      mg.fillRect((i % W) * C - 0.5, ((i / W) | 0) * C - 0.5, C + 1, C + 1);
    }
    drawRivers(mg, v, 'rgb(255,25,0)', 0.32);
    // soften the shores a little, as the land picture is softened
    mbg.setTransform(1, 0, 0, 1, 0, 0);
    mbg.clearRect(0, 0, maskB.width, maskB.height);
    mbg.filter = 'blur(' + TS3 * 0.45 + 'px)';
    mbg.drawImage(maskC, 0, 0);
    mbg.filter = 'none';
    maskTex.needsUpdate = true;
  }
  const sunW = new THREE.Vector3(),
    camUp = new THREE.Vector3(),
    WARM = new THREE.Color(1, 0.62, 0.38),
    WHITE = new THREE.Color(1, 1, 1),
    MV4 = new THREE.Matrix4();
  G3D.setReal = (on) => {
    REAL.on = !!on;
    waterSkin.visible = REAL.on;
    if (!REAL.on) {
      skyDome.visible = false;
      sun.color.setRGB(1, 1, 1);
    }
    frame = 0; // repaint the land (rivers are drawn more clearly in the realistic view)
  };

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
    // each square's trees come from that square's own numbers, so when a forest grows or thins in one
    // place the trees everywhere else stay exactly where they stood (they used to all shift together)
    for (let i = 0; i < W * H && np < MAXT && nl < MAXT; i++) {
      const t = tree[i];
      if (t < 0.2 || water[i]) continue;
      const n = t > 0.65 ? 6 : t > 0.4 ? 4 : 2,
        x = i % W,
        y = (i / W) | 0;
      seed = (i * 2654435761 + 977) & 0x7fffffff;
      r01();
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


  // Things lying on the ground — stones, sharp flakes, pyrite, fallen branches, nuts — as real objects on
  // the land, so trees and hills hide them like anything else (they were painted on top of the picture,
  // and showed on the treetops). Drawn 2.5 times life size, like the creatures, and only when close.
  const MAXI = 9000,
    pebG = new THREE.IcosahedronGeometry(1, 0).scale(1, 0.55, 1),
    stickG = new THREE.CylinderGeometry(1, 1.3, 1, 5).rotateZ(Math.PI / 2),
    nutG = new THREE.SphereGeometry(1, 6, 4),
    mkI = (g, c, n) => {
      const m = new THREE.InstancedMesh(g, new THREE.MeshLambertMaterial({ color: c }), n);
      m.count = 0;
      m.frustumCulled = false;
      globe.add(m);
      return m;
    },
    stonesI = mkI(pebG, 0x6f6d66, MAXI),
    flakesI = mkI(pebG, 0xb7bcba, MAXI),
    pyriteI = mkI(pebG, 0xa8862a, 2000),
    sticksI = mkI(stickG, 0x4e3420, MAXI),
    nutsI = mkI(nutG, 0x5a3f22, MAXI),
    // a heap of branches someone carried together, leaned into a rough dome: a brush shelter
    hutG = new THREE.ConeGeometry(1, 1, 9, 1, true).translate(0, 0.5, 0),
    hutsI = (() => {
      const m = new THREE.InstancedMesh(hutG, new THREE.MeshLambertMaterial({ color: 0x5b4128, side: THREE.DoubleSide }), 600);
      m.count = 0;
      m.frustumCulled = false;
      globe.add(m);
      return m;
    })();
  const IQ = new THREE.Quaternion(),
    IQ2 = new THREE.Quaternion(),
    IM = new THREE.Matrix4(),
    IS = new THREE.Vector3(),
    IP = new THREE.Vector3(),
    IUP = new THREE.Vector3(0, 1, 0);
  let itemsFrame = 0;
  function plantItems() {
    const k = 2.5,
      n = { s: 0, f: 0, p: 0, b: 0, u: 0, h: 0 };
    const put = (mesh, key, gx, gy, sx, sy, sz, turn) => {
      if (n[key] >= (key === 'p' ? 2000 : key === 'h' ? 600 : MAXI)) return;
      const la = latOfY(gy),
        lo = lonOfX(gx),
        r = 1 + EX * heightAt(la, lo);
      IP.copy(local(la, lo, r));
      IQ.setFromUnitVectors(IUP, IP.clone().normalize());
      IQ2.setFromAxisAngle(IUP, turn);
      IQ.multiply(IQ2);
      IS.set(sx, sy, sz);
      IM.compose(IP, IQ, IS);
      mesh.setMatrixAt(n[key]++, IM);
    };
    for (let i = 0; i < W * H; i++) {
      const nn = nut[i] > 0.05 ? Math.min(6, Math.ceil(nut[i] * 8)) : 0;
      if (!lying(i) && !nn) continue;
      const x = i % W,
        y = (i / W) | 0;
      let c = 0;
      // the same scattered places every time, as on the flat map
      const spot = () => {
        const a = (i * 7919 + c * 104729) % 1000,
          b = (i * 6271 + c * 15485863) % 1000;
        c++;
        return [x + (a / 1000 - 0.5) * 0.7, y + (b / 1000 - 0.5) * 0.7, (a % 360) * (Math.PI / 180)];
      };
      for (let j = 0; j < stone[i]; j++) {
        const [gx, gy, t] = spot();
        put(stonesI, 's', gx, gy, 0.0006 * k, 0.0006 * k, 0.0007 * k, t);
      }
      for (let j = 0; j < flake[i]; j++) {
        const [gx, gy, t] = spot();
        put(flakesI, 'f', gx, gy, 0.0004 * k, 0.00015 * k, 0.0003 * k, t);
      }
      for (let j = 0; j < pyrite[i]; j++) {
        const [gx, gy, t] = spot();
        put(pyriteI, 'p', gx, gy, 0.0004 * k, 0.0004 * k, 0.0004 * k, t);
      }
      if (stick[i] >= 7) {
        // about as tall as a person and two or three paces across
        const sz = 0.0016 + 0.0001 * stick[i];
        put(hutsI, 'h', x, y, sz * k, sz * 1.3 * k, sz * k, (i % 360) * (Math.PI / 180));
      } else
      for (let j = 0; j < stick[i]; j++) {
        const [gx, gy, t] = spot();
        // a fallen branch lying along the ground, about as long as a person is tall
        put(sticksI, 'b', gx, gy, 0.0055 * k, 0.00012 * k, 0.00012 * k, t);
      }
      for (let j = 0; j < nn; j++) {
        const [gx, gy, t] = spot();
        put(nutsI, 'u', gx, gy, 0.00018 * k, 0.00018 * k, 0.00018 * k, t);
      }
    }
    stonesI.count = n.s;
    flakesI.count = n.f;
    pyriteI.count = n.p;
    sticksI.count = n.b;
    nutsI.count = n.u;
    hutsI.count = n.h;
    for (const m of [stonesI, flakesI, pyriteI, sticksI, nutsI, hutsI]) m.instanceMatrix.needsUpdate = true;
  }

  let frame = 0;
  // Blend the land so each square's colour flows smoothly into its neighbours' (shrunk to one pixel a
  // square, then stretched back with smoothing: a gradient, at any zoom), with the detailed picture
  // laid lightly over it so rivers and trees still show.
  const tinyC = document.createElement('canvas'),
    tg = tinyC.getContext('2d');
  function smoothInto(g, src, per) {
    tinyC.width = Math.round(src.width / per);
    tinyC.height = Math.round(src.height / per);
    tg.imageSmoothingEnabled = true;
    tg.imageSmoothingQuality = 'high';
    tg.drawImage(src, 0, 0, tinyC.width, tinyC.height);
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';
    g.drawImage(tinyC, 0, 0, src.width, src.height);
    g.globalAlpha = 0.12;
    g.drawImage(src, 0, 0);
    g.globalAlpha = 1;
  }
  function paint(v) {
    // land: the same drawing as the flat map, but without painted shading (the 3D light does that)
    lg.setTransform(1, 0, 0, 1, 0, 0);
    lg.fillStyle = v('--snow');
    lg.fillRect(0, 0, landC.width, landC.height);
    rg.setTransform(1, 0, 0, 1, 0, 0);
    rg.clearRect(0, 0, rawC.width, rawC.height);
    rg.setTransform(TS3 / C, 0, 0, TS3 / C, 0, capH);
    drawTerrain(rg, v, false);
    // the land is softened so neighbouring kinds of ground blend into each other instead of meeting in
    // hard squares (the world underneath is still a grid of 3 km squares): a blurred layer, then the
    // sharp picture half see-through on top, so rivers and trees still show
    smoothInto(lg, rawC, TS3);
    if (REAL.on) {
      // rivers drawn clearly over the softened land, then where the water is for the water's surface
      lg.setTransform(TS3 / C, 0, 0, TS3 / C, 0, capH);
      drawRivers(lg, v, v('--water'), 0.32);
      lg.setTransform(1, 0, 0, 1, 0, 0);
      paintWater(v);
    }
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
        a.preg ? Math.round(clamp(1 - (a.preg.due - tick) / Math.max(1, a.S.gest), 0, 1) * 3) : 0, // how far along a pregnancy is
        a.ptT !== undefined && tick - a.ptT <= 1 ? a.pt : -1, // pointing
        a.sp === 0 ? Math.round(skinOf(a) * 8) : 0, // skin shade
        a.sp === 0 ? ERA : '', // early hominin or modern person
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
        ptv: a.ptT !== undefined && tick - a.ptT <= 1 ? a.pt : -1,
        skv: a.sp === 0 ? Math.round(skinOf(a) * 8) / 8 : 0,
        pgv: a.preg ? Math.round(clamp(1 - (a.preg.due - tick) / Math.max(1, a.S.gest), 0, 1) * 3) / 3 : 0,
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
  // Fish are not figures standing up: a fish lies in the water, seen from above as a dark, slim shape
  // (its back is darker than the river bed, as real fish are), turned the way it swims. Like real water,
  // the surface hides it when seen at a low angle (it mirrors the sky instead), so from the bank you only
  // see fish close by and below you.
  const fishPool = [],
    fishG = new THREE.PlaneGeometry(1, 1),
    fishWay = new WeakMap(), // each fish's smoothed swimming direction (east, north)
    fishTex = [],
    FX = new THREE.Vector3(),
    FY = new THREE.Vector3(),
    FZ = new THREE.Vector3(),
    FM = new THREE.Matrix4(),
    FC = new THREE.Vector3();
  for (let ph = 0; ph < 4; ph++) {
    // a fish from above, head to the right, its tail at four points of its sway
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 32;
    const g = c.getContext('2d'),
      sw = Math.sin((ph / 4) * Math.PI * 2) * 3;
    g.translate(32, 16);
    const grad = g.createRadialGradient(4, 0, 1, 0, 0, 24);
    grad.addColorStop(0, '#2c3a33');
    grad.addColorStop(1, '#4a5a50');
    g.fillStyle = grad;
    g.beginPath(); // the body: a spindle, widest behind the head
    g.moveTo(26, 0);
    g.bezierCurveTo(20, -6, 4, -7, -14, -2);
    g.quadraticCurveTo(-18, 0, -14, 2);
    g.bezierCurveTo(4, 7, 20, 6, 26, 0);
    g.fill();
    g.fillStyle = 'rgba(60,75,66,0.85)';
    g.beginPath(); // the tail
    g.moveTo(-14, 0);
    g.lineTo(-26, -7 + sw);
    g.lineTo(-22, sw);
    g.lineTo(-26, 7 + sw);
    g.closePath();
    g.fill();
    g.beginPath(); // the two side fins
    g.moveTo(12, -4);
    g.lineTo(6, -10);
    g.lineTo(5, -5);
    g.moveTo(12, 4);
    g.lineTo(6, 10);
    g.lineTo(5, 5);
    g.fill();
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    fishTex.push(t);
  }
  function fishAt(i, a) {
    let m = fishPool[i];
    if (!m) {
      m = new THREE.Mesh(fishG, new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      m.matrixAutoUpdate = false;
      globe.add(m);
      fishPool.push(m);
    }
    const la = latOfY(a.ry),
      lo = lonOfX(a.rx);
    // which way it swims: from how it has moved lately (grid x is east, grid y is south)
    let w = fishWay.get(a);
    if (!w) fishWay.set(a, (w = { x: a.rx, y: a.ry, e: a.face === -1 ? -1 : 1, n: 0 }));
    let dx = a.rx - w.x;
    if (dx > W / 2) dx -= W;
    if (dx < -W / 2) dx += W;
    const dy = a.ry - w.y;
    if (Math.abs(dx) + Math.abs(dy) > 1e-4) {
      w.e = w.e * 0.85 + dx * 0.15 * 40;
      w.n = w.n * 0.85 - dy * 0.15 * 40;
    }
    w.x = a.rx;
    w.y = a.ry;
    const up = FZ.set(Math.cos(lo) * Math.cos(la), Math.sin(la), -Math.sin(lo) * Math.cos(la)),
      east = FC.set(-Math.sin(lo), 0, -Math.cos(lo)),
      north = FY.set(-Math.cos(lo) * Math.sin(la), Math.cos(la), Math.sin(lo) * Math.sin(la));
    const len = Math.hypot(w.e, w.n) || 1;
    FX.copy(east).multiplyScalar(w.e / len).addScaledVector(north, w.n / len).normalize();
    FY.crossVectors(up, FX);
    // just under the surface of a river or lake, or the sea (whose surface is flat)
    const r = 1 + EX * Math.max(0, heightAt(la, lo)) + 0.00008,
      size = (0.0016 + 0.0016 * clamp(a.age / a.S.mat, 0.3, 1)) * 2.5;
    FM.makeBasis(FX, FY, up);
    FM.scale(FC.set(size, size * 0.5, 1));
    FM.setPosition(up.x * r, up.y * r, up.z * r);
    m.matrix.copy(FM);
    m.matrixWorldNeedsUpdate = true;
    // how steeply we look down at it: at a low angle the water's surface hides what is under it
    const wp = FC.setFromMatrixPosition(FM).applyMatrix4(globe.matrixWorld),
      down = up.clone().transformDirection(globe.matrixWorld).dot(FX.copy(camera.position).sub(wp).normalize()),
      see = clamp((down - 0.15) / 0.45, 0, 1);
    m.visible = see > 0.02;
    m.material.map = fishTex[a.asleep ? 0 : Math.floor(performance.now() / 120 + (a.id || 0)) & 3];
    m.material.opacity = 0.8 * see * (a.asleep ? 0.8 : 1);
    m.material.color.setScalar(isNightAt(a.x) ? 0.35 : 0.9);
    m.material.needsUpdate = true;
  }
  function figures(on, v) {
    let n = 0,
      nf = 0;
    if (on)
      for (const a of ag) {
        if (a === GL.eye || !project(a.rx, a.ry, 0)) continue;
        if (a.sp === 3) {
          fishAt(nf++, a);
          continue;
        }
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
        sp.material.transparent = false; // solid: only the empty background of the picture is cut away
        sp.material.needsUpdate = true;
        const la = latOfY(a.ry),
          lo = lonOfX(a.rx);
        // Figures are drawn 2.5 times life size so you can find them among the trees (like the
        // exaggerated mountains), all by the same factor so people and animals keep their true sizes
        // compared with each other (each kind's own size is already in its picture).
        const s = (a.sp === 0 ? 0.0046 : 0.0042 * (18 / 15)) * 2.5;
        // In water, the body is in it, not standing on it: knee- to thigh-deep in the shallows, only the head
        // out where it is swimming in deep water. The water surface (flat for the sea, the lake's own level
        // otherwise) hides what is below it.
        const ci = idx(Math.round(a.rx), Math.round(a.ry)),
          inW = water[ci] && !river[ci] && !iced(ci),
          ground = 1 + EX * heightAt(la, lo);
        if (inW) {
          const surface = salt[ci] ? 1 : ground,
            sink = deep[ci] ? 0.78 : 0.3;
          sp.position.copy(local(la, lo, surface - sink * s * 0.82));
        } else sp.position.copy(local(la, lo, ground + 0.0002));
        sp.scale.set(s, s, 1);
      }
    for (let k = n; k < pool.length; k++) pool[k].visible = false;
    for (let k = nf; k < fishPool.length; k++) fishPool[k].visible = false;
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
    // things lying on the ground, close up (picked up and put down often, so refreshed every second or so)
    const itemsOn = GL.zoom >= 5 || !!GL.eye;
    stonesI.visible = flakesI.visible = pyriteI.visible = sticksI.visible = nutsI.visible = itemsOn;
    hutsI.visible = GL.zoom >= 3 || !!GL.eye;
    if (!itemsOn && hutsI.visible && itemsFrame++ % 30 === 0) plantItems();
    if (itemsOn && itemsFrame++ % 30 === 0) plantItems();
    if (frame++ % 12 === 0) paint(v);
    spinStep();
    // gently follow a creature you asked to see
    if (GL.follow && GL.follow === sel && !GL.follow.gone && !GL.held) {
      // follow where it is drawn (its smooth walk), not the square it has just stepped into, so the
      // land doesn't lurch a whole square past you every time it crosses into the next one
      let dl = lonOfX(sel.rx) - GL.lon0;
      dl = Math.atan2(Math.sin(dl), Math.cos(dl));
      GL.lon0 += dl * 0.08;
      GL.lat0 += (latOfY(sel.ry) - GL.lat0) * 0.08;
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
    if (REAL.on) {
      globe.updateMatrixWorld(true);
      sun.getWorldPosition(sunW).normalize();
      camUp.copy(camera.position).normalize();
      const sa = sunW.dot(camUp),
        dayR = clamp((sa + 0.18) / 0.3, 0, 1);
      skyDome.visible = near > 0;
      skyDome.position.copy(camera.position);
      skyMat.uniforms.sunW.value.copy(sunW);
      skyMat.uniforms.upW.value.copy(camUp);
      skyMat.uniforms.op.value = near;
      // the haze far off takes the colour of the sky at the horizon, and a low sun's light is warm
      scene.fog.color.setRGB(0.008 + 0.49 * dayR, 0.012 + 0.65 * dayR, 0.035 + 0.85 * dayR);
      if (near > 0) scene.fog.far = scene.fog.near + 0.18 / near;
      sun.color.copy(WARM).lerp(WHITE, clamp(sa / 0.35, 0, 1));
      waterMat.uniforms.time.value = performance.now() / 1000;
      waterMat.uniforms.nrmM.value.getNormalMatrix(MV4.multiplyMatrices(camera.matrixWorldInverse, waterSkin.matrixWorld));
      waterMat.uniforms.sunV.value.copy(sunW).transformDirection(camera.matrixWorldInverse);
      waterMat.uniforms.fogC.value.copy(scene.fog.color);
      waterMat.uniforms.fogN.value = scene.fog.near;
      waterMat.uniforms.fogF.value = scene.fog.far;
    }
    if (REAL.on && skyDome.visible) {
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(skyScene, camera);
      renderer.render(scene, camera);
      renderer.autoClear = true;
    } else renderer.render(scene, camera);

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
    if (GL.zoom >= 2.5 || GL.eye) drawCarrion(cx, project);
    if (GL.zoom >= 2.5 || GL.eye) drawSounds(cx, project);
    drawTrails(cx, project);
    if (GL.zoom >= 2 || GL.eye) drawBodies(cx, project); // the dead lie where they fell, seen from fairly far
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
