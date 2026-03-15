/**
 * Satellite globe mode — day/night textures, atmosphere, and toggle.
 */

import * as THREE from 'three';
import { feature as topoFeature } from 'topojson-client';
import { _state, GLOBE_RADIUS, getTopoCache, setTopoCache } from './state.js';
import { _llToPx } from './utils.js';

// ── Procedural texture builders ───────────────────────────────

function _buildDayCanvas(topo = null) {
  const W = 2048, H = 1024;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // Ocean — satellite-realistic deep blue, darker at poles
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0,    '#071a2e');
  oceanGrad.addColorStop(0.15, '#082035');
  oceanGrad.addColorStop(0.5,  '#0a2a46');
  oceanGrad.addColorStop(0.85, '#082035');
  oceanGrad.addColorStop(1,    '#071a2e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  if (topo) {
    // Land polygons from TopoJSON
    const landFC = topoFeature(topo, topo.objects.land);
    const features = landFC.type === 'FeatureCollection' ? landFC.features : [landFC];
    const polygons = features.flatMap(f => {
      const g = f.geometry;
      if (!g) return [];
      return g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    });

    // Latitude-based land biome gradient (top = 90°N, bottom = 90°S)
    const landGrad = ctx.createLinearGradient(0, 0, 0, H);
    landGrad.addColorStop(0,    '#dce8dc');  // Arctic ice/snow
    landGrad.addColorStop(0.06, '#8a9c7a');  // Tundra
    landGrad.addColorStop(0.16, '#527848');  // Boreal/taiga
    landGrad.addColorStop(0.28, '#4e7040');  // Temperate
    landGrad.addColorStop(0.40, '#4a6c34');  // Subtropical
    landGrad.addColorStop(0.50, '#3a5c24');  // Tropical equator — darkest
    landGrad.addColorStop(0.60, '#4a6c34');  // Subtropical S
    landGrad.addColorStop(0.72, '#4e7040');  // Temperate S
    landGrad.addColorStop(0.84, '#7a8c6a');  // Sub-Antarctic
    landGrad.addColorStop(0.92, '#ccd8c4');  // Near Antarctica
    landGrad.addColorStop(1,    '#eaf0ea');  // Antarctic ice

    // Fill land polygons with biome gradient
    for (const polygon of polygons) {
      for (let ri = 0; ri < polygon.length; ri++) {
        const ring = polygon[ri];
        ctx.beginPath();
        for (let i = 0; i < ring.length; i++) {
          const [lng, lat] = ring[i];
          const x = (lng + 180) / 360 * W;
          const y = (90 - lat) / 180 * H;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = ri === 0 ? landGrad : '#0a2a46';
        ctx.fill();
      }
    }

    // Desert overlays — sandy/tan patches over arid regions
    // [centerLat, centerLng, latRadius, lngRadius, color]
    const deserts = [
      [22,  15,  16, 28, 'rgba(172,142, 88,0.72)'],  // Sahara
      [23,  44,   8, 12, 'rgba(178,148, 96,0.68)'],  // Arabian
      [27,  70,   5,  9, 'rgba(182,158,112,0.52)'],  // Thar
      [42, 100,   6, 16, 'rgba(152,128, 86,0.58)'],  // Gobi
      [-25, 132, 10, 17, 'rgba(168,134, 82,0.58)'],  // Australian outback
      [-22, -68,  4,  6, 'rgba(142,118, 76,0.48)'],  // Atacama
      [35, -114,  5,  8, 'rgba(158,128, 82,0.42)'],  // Mojave/SW USA
      [40,  58,   5,  8, 'rgba(158,134, 88,0.45)'],  // Central Asian steppe
    ];
    for (const [lat, lng, dlat, dlng, color] of deserts) {
      const [cx, cy] = _llToPx(lat, lng, W, H);
      const rx = dlng / 360 * W;
      const ry = dlat / 180 * H;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      const fade = color.replace(/[\d.]+\)$/, '0)');
      g.addColorStop(0,    color);
      g.addColorStop(0.55, color);
      g.addColorStop(0.88, color.replace(/[\d.]+\)$/, '0.08)'));
      g.addColorStop(1,    fade);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle coastline shimmer
    ctx.strokeStyle = 'rgba(120,175,210,0.22)';
    ctx.lineWidth = 0.8;
    for (const polygon of polygons) {
      const ring = polygon[0];
      ctx.beginPath();
      for (let i = 0; i < ring.length; i++) {
        const [lng, lat] = ring[i];
        const x = (lng + 180) / 360 * W;
        const y = (90 - lat) / 180 * H;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Barely-visible lat/lng grid
  ctx.strokeStyle = 'rgba(100,150,200,0.04)';
  ctx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 30) {
    const y = _llToPx(lat, 0, W, H)[1];
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = _llToPx(0, lng, W, H)[0];
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  return cv;
}

function _buildNightCanvas() {
  const W = 1024, H = 512;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#000810';
  ctx.fillRect(0, 0, W, H);

  // City lights: [lat, lng, intensity 1-4]
  const cities = [
    // North America
    [40.7,-74.0,4],[34.0,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],
    [19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],
    [38.9,-77.0,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],
    [37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105.0,2],[33.4,-112.1,2],
    [36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],
    // Canada corridor
    [51.0,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],
    // Central America
    [14.1,-87.2,1.5],[13.7,-89.2,1.5],
    // South America
    [-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12.0,-77.0,2],
    [4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],
    [-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30.0,-51.2,2],[-15.8,-47.9,2],
    // Europe
    [51.5,-0.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],
    [41.0,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25.0,2],
    [52.2,21.0,2.5],[50.1,14.4,2.5],[47.5,19.0,2.5],[48.2,16.4,2.5],
    [47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],
    [41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],
    [50.0,8.7,2.5],[51.0,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],
    [53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],
    [48.0,37.8,2],[46.5,30.7,2],[49.8,24.0,2],[50.4,30.5,2],
    [45.4,28.0,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],
    // Middle East / N Africa
    [30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],
    [24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],
    [32.9,13.2,2],[30.7,29.7,2],
    // Sub-Saharan Africa
    [6.5,3.4,2.5],[-26.2,28.0,3],[-33.9,18.4,2],[-1.3,36.8,2],
    [5.3,-4.0,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],
    [-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],
    // South & Central Asia
    [28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],
    [24.9,67.0,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],
    [22.6,88.4,2.5],[13.1,80.3,2.5],[23.0,72.6,2],[22.3,70.8,2],
    [26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],
    // Central Asia
    [41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],
    // Russia / Siberia
    [54.7,55.9,2],[56.8,60.6,2],[55.0,73.4,2],[56.0,92.9,2],
    [52.3,104.3,2],[53.7,87.1,2],[62.0,129.7,1.5],[43.1,131.9,2],
    [61.8,34.4,2],
    // East Asia
    [35.7,139.7,5],[37.5,127.0,4],[39.9,116.4,4.5],[31.2,121.5,4.5],
    [23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],
    [30.3,120.2,3],[36.7,117.0,2.5],[34.3,108.9,2.5],[26.0,119.3,2.5],
    [41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],
    // SE Asia
    [1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121.0,2.5],
    [3.1,101.7,2.5],[6.2,106.8,3],[21.0,105.8,2],[-6.2,106.8,2.5],
    // Australia / NZ
    [-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153.0,2],[-31.9,115.9,2],
    [-43.5,172.6,1.5],
  ];

  // Two-pass: soft halo first, sharp bright core on top
  // Pass 1 — soft halo (source-over, very low opacity)
  for (const [lat, lng, sz] of cities) {
    const [cx, cy] = _llToPx(lat, lng, W, H);
    const haloR = sz * 2.2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
    g.addColorStop(0,   `rgba(255,210,120,0.22)`);
    g.addColorStop(0.5, `rgba(255,170,60,0.08)`);
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
    ctx.fill();
  }
  // Pass 2 — tight bright core (lighter blending for natural accumulation)
  ctx.globalCompositeOperation = 'lighter';
  for (const [lat, lng, sz] of cities) {
    const [cx, cy] = _llToPx(lat, lng, W, H);
    const coreR = Math.max(1, sz * 0.9);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    g.addColorStop(0,  `rgba(255,245,200,${Math.min(0.9, 0.5 + sz * 0.1)})`);
    g.addColorStop(0.6, `rgba(255,200,100,0.15)`);
    g.addColorStop(1,  'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  return cv;
}

function _loadTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(url, resolve, undefined, reject);
  });
}

// ── _createSatelliteGlobe ─────────────────────────────────────

async function _createSatelliteGlobe(element) {
  const state = _state.get(element);
  if (!state || state.satelliteGroup) return;

  // Load real satellite textures; fall back to procedural on error
  let dayTex, nightTex, realTexFlag = 1.0;
  try {
    [dayTex, nightTex] = await Promise.all([
      _loadTexture('/textures/earth_day.jpg'),
      _loadTexture('/textures/earth_night.jpg'),
    ]);
    dayTex.colorSpace   = THREE.SRGBColorSpace;
    nightTex.colorSpace = THREE.SRGBColorSpace;
  } catch (e) {
    console.warn('[s9-threatmap] satellite textures not found, using procedural fallback', e);
    let topo = getTopoCache();
    if (!topo) {
      try {
        const res = await fetch('/data/countries-110m.json');
        if (res.ok) { topo = await res.json(); setTopoCache(topo); }
      } catch (_) {}
    }
    dayTex   = new THREE.CanvasTexture(_buildDayCanvas(topo));
    nightTex = new THREE.CanvasTexture(_buildNightCanvas());
    realTexFlag = 0.0;
  }

  // Sphere with day/night holographic shader
  const satMat = new THREE.ShaderMaterial({
    uniforms: {
      dayMap:    { value: dayTex },
      nightMap:  { value: nightTex },
      sunDir:    { value: new THREE.Vector3(
        Math.cos(state.sunAngle), 0.22, Math.sin(state.sunAngle)
      ).normalize() },
      realTex:   { value: realTexFlag },
      time:      { value: 0.0 },
    },
    vertexShader: /* glsl */`
      varying vec2  vUv;
      varying vec3  vWorldNormal;
      varying vec3  vWorldPos;
      void main() {
        vUv          = uv;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3      sunDir;
      uniform float     realTex;
      uniform float     time;
      varying vec2      vUv;
      varying vec3      vWorldNormal;
      varying vec3      vWorldPos;

      void main() {
        vec3  N    = normalize(vWorldNormal);
        vec3  V    = normalize(cameraPosition - vWorldPos);
        vec3  S    = normalize(sunDir);

        float d     = dot(N, S);
        float blend = smoothstep(-0.18, 0.22, d);

        vec4  day   = texture2D(dayMap,   vUv);
        vec4  night = texture2D(nightMap, vUv);

        // Terminator fringe — suppressed for real satellite textures
        float term   = smoothstep(-0.06, 0.0, d) * (1.0 - smoothstep(0.0, 0.07, d));
        vec3  fringe = mix(vec3(0.0), vec3(1.0, 0.65, 0.2), term * 0.28 * (1.0 - realTex));
        vec3  base   = mix(night.rgb * 1.2, day.rgb, blend) + fringe;

        // Lift shadows, compress highlights
        vec3  lifted = base * 0.82 + vec3(0.08);

        // Fresnel — view-angle rim factor
        float fresnel = pow(1.0 - max(0.0, dot(N, V)), 3.5);

        // Specular highlight from sun
        vec3  R    = reflect(-S, N);
        float spec = pow(max(0.0, dot(R, V)), 32.0) * 0.14 * blend;

        // Holographic chromatic tint — strongest at edges and on night side
        float holoFactor = fresnel * 0.5 + (1.0 - blend) * 0.10;
        vec3  holoTint   = vec3(0.55, 1.05, 1.45);
        vec3  col        = mix(lifted, lifted * holoTint, holoFactor);

        // Subtle scan lines
        float scan    = sin(vUv.y * 520.0 - time * 0.35) * 0.5 + 0.5;
        col          *= 1.0 - scan * 0.038;

        // Faint animated interference shimmer
        float shimmer = sin(time * 1.1 + vUv.x * 38.0 + vUv.y * 27.0) * 0.010 + 1.0;
        col          *= shimmer;

        gl_FragColor = vec4(col + spec, 1.0);
      }
    `,
  });

  const satGeo    = new THREE.SphereGeometry(GLOBE_RADIUS, 128, 64);
  const satSphere = new THREE.Mesh(satGeo, satMat);
  satSphere.renderOrder = 0;

  // Atmosphere shell — multi-layer Fresnel with sun-side warmth
  const atmGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.055, 64, 32);
  const atmMat = new THREE.ShaderMaterial({
    uniforms: {
      glowCol: { value: new THREE.Color(0x00c8ff) },
      sunDir:  { value: satMat.uniforms.sunDir.value },  // shared ref
      time:    { value: 0.0 },
    },
    vertexShader: /* glsl */`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vWorldNormal;
      void main() {
        vNormal      = normalize(normalMatrix * normal);
        vViewDir     = normalize(-( modelViewMatrix * vec4(position,1.0) ).xyz);
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3  glowCol;
      uniform vec3  sunDir;
      uniform float time;
      varying vec3  vNormal;
      varying vec3  vViewDir;
      varying vec3  vWorldNormal;
      void main() {
        float rim   = 1.0 - abs(dot(vNormal, vViewDir));

        // Outer wide haze
        float outer = pow(rim, 2.0) * 0.42;
        // Inner sharp limb
        float inner = pow(rim, 5.5) * 1.15;
        float intensity = outer + inner;

        // Sun-side terminates with a warm scatter tint
        float sunFace = dot(normalize(vWorldNormal), normalize(sunDir)) * 0.5 + 0.5;
        vec3  scatter = mix(glowCol, vec3(0.45, 0.72, 1.0), sunFace * 0.40);

        // Subtle breathing pulse
        float pulse = sin(time * 0.55) * 0.05 + 1.0;
        intensity  *= pulse;

        gl_FragColor = vec4(scatter * intensity, intensity * 0.68);
      }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const atmShell = new THREE.Mesh(atmGeo, atmMat);
  atmShell.renderOrder = 1;

  const group = new THREE.Group();
  group.add(satSphere);
  group.add(atmShell);
  group.visible = false;
  state.scene.add(group);

  Object.assign(state, { satelliteGroup: group, satGeo, satMat, atmGeo, atmMat, dayTex, nightTex });
}

// ── setSatelliteMode ──────────────────────────────────────────

/**
 * Toggle between holographic satellite view and wireframe globe.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {boolean} enabled
 */
export async function setSatelliteMode(element, enabled) {
  const state = _state.get(element);
  if (!state) return;

  if (enabled) {
    // Hide wireframe immediately; show satellite once the async build resolves
    if (state.globeBack)    state.globeBack.visible    = false;
    if (state.occluder)      state.occluder.visible      = false;
    if (state.frontOccluder) state.frontOccluder.visible = false;
    if (state.globeFront)    state.globeFront.visible    = false;
    if (state.globeSurface) state.globeSurface.visible  = false;
    if (state.globeGlow)    state.globeGlow.visible     = false;
    if (state.rimMesh)      state.rimMesh.visible       = false;
    if (state.geoGroup)     state.geoGroup.visible      = false;
    // Tighten bloom so node halos don't bleed over the texture
    if (state.bloomPass) {
      state._bloomPrev = { strength: state.bloomPass.strength, threshold: state.bloomPass.threshold, radius: state.bloomPass.radius };
      state.bloomPass.strength  = 0.32;
      state.bloomPass.threshold = 0.85;
      state.bloomPass.radius    = 0.35;
    }
    state.satelliteMode = true;
    await _createSatelliteGlobe(element);  // no-op if already created
    if (state.satelliteGroup) state.satelliteGroup.visible = true;
  } else {
    if (state.satelliteGroup) state.satelliteGroup.visible = false;
    if (state.globeBack)    state.globeBack.visible    = true;
    if (state.occluder)      state.occluder.visible      = true;
    if (state.frontOccluder) state.frontOccluder.visible = true;
    if (state.globeFront)    state.globeFront.visible    = true;
    if (state.globeSurface) state.globeSurface.visible  = true;
    if (state.globeGlow)    state.globeGlow.visible     = true;
    if (state.rimMesh)      state.rimMesh.visible       = true;
    if (state.geoGroup)     state.geoGroup.visible      = true;
    // Restore bloom
    if (state.bloomPass && state._bloomPrev) {
      state.bloomPass.strength  = state._bloomPrev.strength;
      state.bloomPass.threshold = state._bloomPrev.threshold;
      state.bloomPass.radius    = state._bloomPrev.radius;
    }
    state.satelliteMode = false;
  }
}
