/**
 * components/pulse-radar.js
 * Proximity Scan Radar — Three.js tactical radar with rotating sweep arm,
 * range rings, azimuth ticks, InstancedMesh contact system, and HTML overlay labels.
 *
 * Usage:
 *   import { initRadar, destroyRadar, refreshRadarTheme } from './components/pulse-radar.js';
 *   const { setRadarThreatLevel, injectContact } = initRadar(element, opts);
 */

import * as THREE from 'three';

const TAU       = Math.PI * 2;
const POOL_SIZE = 64;
let   _contactCounter = 0;

// ── State registry ──────────────────────────────────────────────
const _state = new WeakMap();

// ── Helpers ─────────────────────────────────────────────────────
function _css(prop) {
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}

function _c3(cssColor) {
  const c = new THREE.Color().setStyle(cssColor || '#000000');
  return [c.r, c.g, c.b];
}

function _lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function _angleDiff(a, b) {
  const d = ((a - b) % TAU + TAU) % TAU;
  return d > Math.PI ? d - TAU : d;
}

// ── Theme reading ────────────────────────────────────────────────
function _readTheme() {
  return {
    neonCyan:    _css('--neon-cyan')    || '#00f0ff',
    neonGreen:   _css('--neon-green')   || '#00ff9d',
    neonMagenta: _css('--neon-magenta') || '#ff00cc',
    neonAmber:   _css('--neon-amber')   || '#ffb300',
    voidColor:   _css('--void')         || '#05080f',
  };
}

function _ringHz(type) {
  if (type === 'friendly') return 0.6;
  if (type === 'hostile')  return 1.5;
  return 1.0;
}

function _randomType(t) {
  const hp = _lerp(0.10, 0.85, t);
  const fp = _lerp(0.30, 0.05, t);
  const r  = Math.random();
  if (r < hp) return 'hostile';
  if (r < hp + fp) return 'friendly';
  return 'neutral';
}

function _typeFloat(type) {
  if (type === 'friendly') return 0.0;
  if (type === 'neutral')  return 1.0;
  if (type === 'hostile')  return 2.0;
  return 3.0;
}

// ── Sonar ping (MP3 sample) ──────────────────────────────────────
let _sonarAudio = null;
function _playSonarPing(volume = 0.08) {
  try {
    if (!_sonarAudio) {
      _sonarAudio = new Audio('./assets/sonar-ping.mp3');
    }
    _sonarAudio.volume = Math.min(1, Math.max(0, volume));
    _sonarAudio.currentTime = 0;
    _sonarAudio.play().catch(() => {});
  } catch (_) { /* audio not available */ }
}

// ── Shaders ──────────────────────────────────────────────────────

const _bgVert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const _bgFrag = /* glsl */`
varying vec2 vUv;
uniform vec3  uVoidColor;
uniform float uTime;

float h2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * (h2(p) * 2.0 - 1.0);
    p  = p * 2.0 + vec2(0.5);
    a *= 0.5;
  }
  return v;
}
void main() {
  float r     = length(vUv - 0.5) * 2.0;
  vec3  base  = mix(uVoidColor * 1.6, uVoidColor, r * r);
  float noise = fbm(vUv * 3.0 + uTime * 0.04) * 0.04;
  float bnd   = 0.48 + sin(uTime * 1.3) * 0.003;
  float disc  = 1.0 - smoothstep(bnd, bnd + 0.02, r * 0.5);
  gl_FragColor = vec4(base + noise, disc);
}`;

const _sweepVert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const _sweepFrag = /* glsl */`
varying vec2 vUv;
uniform float uAngle;
uniform float uArcWidth;
uniform vec3  uColor;
uniform float uStaticAmt;
#define TWO_PI 6.28318530718
void main() {
  vec2  p    = vUv - 0.5;
  float r    = length(p);
  if (r > 0.499) discard;
  float a    = atan(p.x, p.y);
  float diff = mod(uAngle - a + TWO_PI, TWO_PI);
  if (diff > uArcWidth) discard;
  float t         = diff / uArcWidth;
  float intensity = pow(1.0 - t, 2.0)
                  * max(0.0, 1.0 - r * 1.9)
                  * smoothstep(0.0, 0.04, r);
  gl_FragColor = vec4(uColor * intensity * 0.9 * uStaticAmt, intensity * 0.8);
}`;

const _contactVert = /* glsl */`
attribute float a_type;
attribute float a_age;
attribute float a_phase;
attribute float a_sweepFade;
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
void main() {
  vType      = a_type;
  vAge       = a_age;
  vPhase     = a_phase;
  vSweepFade = a_sweepFade;
  vUv        = uv;
  #ifdef USE_INSTANCING
    vec4 wp = instanceMatrix * vec4(position, 1.0);
  #else
    vec4 wp = vec4(position, 1.0);
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * wp;
}`;

const _dotFrag = /* glsl */`
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
void main() {
  vec2  p = vUv - 0.5;
  float r = length(p);
  if (r > 0.5) discard;

  float core  = 1.0 - smoothstep(0.10, 0.40, r);
  float rim   = smoothstep(0.35, 0.43, r) * (1.0 - smoothstep(0.43, 0.50, r));
  float shape = core + rim * 0.6;

  vec3  color;
  float baseAlpha;
  if      (vType < 0.5) { color = uC0; baseAlpha = 1.0; }
  else if (vType < 1.5) { color = uC1; baseAlpha = 1.0; }
  else if (vType < 2.5) { color = uC2; baseAlpha = 1.0; }
  else                  { color = uC3; baseAlpha = 0.15; }

  // Sweep fade: contacts dim between sweep passes (5-15% floor)
  float sweepAlpha = vType > 2.5 ? 0.15 : vSweepFade;

  float detect = vAge < 0.08 ? mix(1.6, 1.0, vAge / 0.08) : 1.0;
  float alpha  = shape * sweepAlpha * baseAlpha * detect;
  gl_FragColor = vec4(color * shape * detect, alpha);
}`;

const _ringFrag = /* glsl */`
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
void main() {
  if (vType > 2.5) discard;
  if (vAge  > 0.85) discard;

  vec2  p = vUv - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;

  float phase = fract(vPhase);
  float ringR = 0.05 + phase * 0.90;
  float ringW = max(0.004, 0.07 * (1.0 - phase * 0.5));
  float ring  = max(0.0, 1.0 - abs(r - ringR) / ringW);

  if (vType > 1.5) {
    float ph2   = fract(vPhase + 0.4);
    float r2    = 0.05 + ph2 * 0.90;
    float w2    = max(0.004, 0.07 * (1.0 - ph2 * 0.5));
    float ring2 = max(0.0, 1.0 - abs(r - r2) / w2);
    ring = max(ring, ring2 * (1.0 - ph2));
  }

  if (ring < 0.02) discard;

  vec3 color;
  if      (vType < 0.5) color = uC0;
  else if (vType < 1.5) color = uC1;
  else                  color = uC2;

  float phaseAlpha = 1.0 - phase;
  gl_FragColor     = vec4(color, ring * vSweepFade * phaseAlpha * 0.75);
}`;

const _centerGlowFrag = /* glsl */`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`;

// ── Geometry builders ────────────────────────────────────────────

function _buildRingGeo(R) {
  const N   = 64;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const a = (i / N) * TAU;
    pos[i * 3]     = Math.sin(a) * R;
    pos[i * 3 + 1] = Math.cos(a) * R;
    pos[i * 3 + 2] = 0;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return geo;
}

function _buildTickGeo(R) {
  const N   = 32;
  const pos = new Float32Array(N * 2 * 3);
  for (let i = 0; i < N; i++) {
    const a  = (i / N) * TAU;
    const r0 = (i % 8 === 0) ? R * 0.92 : R * 0.96;
    const si = i * 6;
    pos[si]     = Math.sin(a) * r0;
    pos[si + 1] = Math.cos(a) * r0;
    pos[si + 2] = 0;
    pos[si + 3] = Math.sin(a) * R;
    pos[si + 4] = Math.cos(a) * R;
    pos[si + 5] = 0;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return geo;
}

// ── Scene element builders ────────────────────────────────────────

function _buildBackground(state) {
  const { scene, R, theme } = state;
  if (state.backgroundMesh) {
    state.backgroundMesh.geometry.dispose();
    state.backgroundMesh.material.dispose();
    scene.remove(state.backgroundMesh);
  }
  const vc  = new THREE.Color(theme.voidColor);
  const geo = new THREE.PlaneGeometry(R * 2, R * 2);
  const mat = new THREE.ShaderMaterial({
    vertexShader:   _bgVert,
    fragmentShader: _bgFrag,
    uniforms: {
      uVoidColor: { value: new THREE.Vector3(vc.r, vc.g, vc.b) },
      uTime:      { value: 0 },
    },
    transparent: true,
    depthWrite:  true,
    blending:    THREE.NormalBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 0;
  scene.add(mesh);
  state.backgroundMesh = mesh;
}

function _buildCenterGlow(state) {
  const { scene, R, theme } = state;
  if (state.centerGlowMesh) {
    state.centerGlowMesh.geometry.dispose();
    state.centerGlowMesh.material.dispose();
    scene.remove(state.centerGlowMesh);
  }
  const cc = new THREE.Color(theme.neonCyan);
  const size = R * 0.5;
  const geo = new THREE.PlaneGeometry(size, size);
  const mat = new THREE.ShaderMaterial({
    vertexShader:   _bgVert,
    fragmentShader: _centerGlowFrag,
    uniforms: {
      uColor:     { value: new THREE.Vector3(cc.r, cc.g, cc.b) },
      uIntensity: { value: 0 },
    },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 6;
  scene.add(mesh);
  state.centerGlowMesh = mesh;
}

function _buildRingsAndTicks(state) {
  const { scene, R, theme } = state;
  if (state.ringMeshes) {
    state.ringMeshes.forEach(m => { m.geometry.dispose(); scene.remove(m); });
    if (state.matRingInner) state.matRingInner.dispose();
    if (state.matRingOuter) state.matRingOuter.dispose();
  }
  if (state.ticksMesh) {
    state.ticksMesh.geometry.dispose();
    if (state.matRingTicks) state.matRingTicks.dispose();
    scene.remove(state.ticksMesh);
  }

  const matInner = new THREE.LineBasicMaterial({
    color: new THREE.Color(theme.neonCyan),
    opacity: 0.18, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const matOuter = new THREE.LineBasicMaterial({
    color: new THREE.Color(theme.neonCyan),
    opacity: 0.28, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const matTicks = new THREE.LineBasicMaterial({
    color: new THREE.Color(theme.neonCyan),
    opacity: 0.22, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });

  const RADII = [0.2, 0.4, 0.6, 0.8, 1.0];
  state.ringMeshes = RADII.map((r, i) => {
    const mesh = new THREE.LineLoop(_buildRingGeo(r * R), i < 4 ? matInner : matOuter);
    mesh.renderOrder = 1;
    scene.add(mesh);
    return mesh;
  });

  const ticksMesh = new THREE.LineSegments(_buildTickGeo(R), matTicks);
  ticksMesh.renderOrder = 1;
  scene.add(ticksMesh);

  state.ticksMesh    = ticksMesh;
  state.matRingInner = matInner;
  state.matRingOuter = matOuter;
  state.matRingTicks = matTicks;
}

function _buildSweep(state) {
  const { scene, R, theme } = state;
  if (state.sweepTrailMesh) {
    state.sweepTrailMesh.geometry.dispose();
    state.sweepTrailMesh.material.dispose();
    scene.remove(state.sweepTrailMesh);
  }
  if (state.sweepArmLine) {
    state.sweepArmLine.geometry.dispose();
    state.sweepArmLine.material.dispose();
    scene.remove(state.sweepArmLine);
  }

  const cc = new THREE.Color(theme.neonCyan);
  const cv = new THREE.Vector3(cc.r, cc.g, cc.b);

  const trailGeo = new THREE.PlaneGeometry(R * 2, R * 2);
  const trailMat = new THREE.ShaderMaterial({
    vertexShader:   _sweepVert,
    fragmentShader: _sweepFrag,
    uniforms: {
      uAngle:     { value: state.sweepAngle },
      uArcWidth:  { value: Math.PI * 0.6 },
      uColor:     { value: cv.clone() },
      uStaticAmt: { value: 1.0 },
    },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  });
  const trailMesh = new THREE.Mesh(trailGeo, trailMat);
  trailMesh.renderOrder = 2;
  scene.add(trailMesh);
  state.sweepTrailMesh = trailMesh;

  const armPos = new Float32Array([
    0, 0, 0,
    Math.sin(state.sweepAngle) * R, Math.cos(state.sweepAngle) * R, 0,
  ]);
  const armGeo = new THREE.BufferGeometry();
  armGeo.setAttribute('position', new THREE.BufferAttribute(armPos, 3));
  const armMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(theme.neonCyan),
    opacity: 0.9, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const armLine = new THREE.Line(armGeo, armMat);
  armLine.renderOrder = 3;
  scene.add(armLine);
  state.sweepArmLine = armLine;
}

function _buildContactMeshes(state) {
  const { scene, theme } = state;
  if (state.contactDotsMesh) {
    state.contactDotsMesh.geometry.dispose();
    state.contactDotsMesh.material.dispose();
    scene.remove(state.contactDotsMesh);
  }
  if (state.contactRingsMesh) {
    state.contactRingsMesh.geometry.dispose();
    state.contactRingsMesh.material.dispose();
    scene.remove(state.contactRingsMesh);
  }

  const c0 = _c3(theme.neonGreen);
  const c1 = _c3(theme.neonAmber);
  const c2 = _c3(theme.neonMagenta);
  const c3 = _c3(theme.neonCyan);

  function _makeInstMesh(fragShader, uniforms, renderOrder) {
    const geo = new THREE.PlaneGeometry(1, 1);
    const aType      = new THREE.InstancedBufferAttribute(new Float32Array(POOL_SIZE).fill(0),   1);
    const aAge       = new THREE.InstancedBufferAttribute(new Float32Array(POOL_SIZE).fill(1.0), 1);
    const aPhase     = new THREE.InstancedBufferAttribute(new Float32Array(POOL_SIZE).map(() => Math.random()), 1);
    const aSweepFade = new THREE.InstancedBufferAttribute(new Float32Array(POOL_SIZE).fill(0.0), 1);
    aType.setUsage(THREE.DynamicDrawUsage);
    aAge.setUsage(THREE.DynamicDrawUsage);
    aPhase.setUsage(THREE.DynamicDrawUsage);
    aSweepFade.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('a_type',      aType);
    geo.setAttribute('a_age',       aAge);
    geo.setAttribute('a_phase',     aPhase);
    geo.setAttribute('a_sweepFade', aSweepFade);

    const mat = new THREE.ShaderMaterial({
      vertexShader:   _contactVert,
      fragmentShader: fragShader,
      uniforms,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    const mesh = new THREE.InstancedMesh(geo, mat, POOL_SIZE);
    mesh.renderOrder = renderOrder;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Initialise all instances invisible
    const d = new THREE.Object3D();
    d.scale.setScalar(0);
    d.updateMatrix();
    for (let i = 0; i < POOL_SIZE; i++) mesh.setMatrixAt(i, d.matrix);
    mesh.instanceMatrix.needsUpdate = true;

    scene.add(mesh);
    return mesh;
  }

  const dotUniforms = {
    uC0: { value: new THREE.Vector3(...c0) },
    uC1: { value: new THREE.Vector3(...c1) },
    uC2: { value: new THREE.Vector3(...c2) },
    uC3: { value: new THREE.Vector3(...c3) },
  };
  const ringUniforms = {
    uC0: { value: new THREE.Vector3(...c0) },
    uC1: { value: new THREE.Vector3(...c1) },
    uC2: { value: new THREE.Vector3(...c2) },
  };

  state.contactDotsMesh  = _makeInstMesh(_dotFrag,  dotUniforms,  5);
  state.contactRingsMesh = _makeInstMesh(_ringFrag, ringUniforms, 4);
}

// ── Static label helpers ──────────────────────────────────────────

function _repositionStaticLabels(state) {
  const { element, overlay, R } = state;
  const cx = element.clientWidth  / 2;
  const cy = element.clientHeight / 2;

  state.staticLabelEls.forEach(el => el.remove());
  state.staticLabelEls = [];

  // Range labels at 3 o'clock of each ring
  const KM     = [2, 4, 6, 8, 10];
  const RADII  = [0.2, 0.4, 0.6, 0.8, 1.0];
  RADII.forEach((r, i) => {
    const sp          = document.createElement('span');
    sp.className      = 's9-radar__ring-label';
    sp.textContent    = `${KM[i]}km`;
    sp.style.left     = `${cx + r * R + 4}px`;
    sp.style.top      = `${cy}px`;
    sp.style.transform = 'translateY(-50%)';
    overlay.appendChild(sp);
    state.staticLabelEls.push(sp);
  });

  // Cardinal and intercardinal labels
  const CARDS = [
    ['N',  0],            ['NE', TAU * 0.125],
    ['E',  TAU * 0.25],   ['SE', TAU * 0.375],
    ['S',  TAU * 0.5],    ['SW', TAU * 0.625],
    ['W',  TAU * 0.75],   ['NW', TAU * 0.875],
  ];
  const labelR = R * 1.05;
  CARDS.forEach(([label, angle]) => {
    const sp          = document.createElement('span');
    sp.className      = 's9-radar__cardinal-label';
    sp.textContent    = label;
    sp.style.left     = `${cx + Math.sin(angle) * labelR}px`;
    sp.style.top      = `${cy - Math.cos(angle) * labelR}px`;
    sp.style.transform = 'translate(-50%, -50%)';
    overlay.appendChild(sp);
    state.staticLabelEls.push(sp);
  });
}

// ── Full geometry rebuild (called on resize) ──────────────────────

function _rebuildGeometry(state) {
  _buildBackground(state);
  _buildCenterGlow(state);
  _buildRingsAndTicks(state);
  _buildSweep(state);
  _repositionStaticLabels(state);
  if (!state.contactDotsMesh) _buildContactMeshes(state);
  else _recomputeContactPositions(state);
}

function _recomputeContactPositions(state) {
  const { contacts, dummy, contactDotsMesh, contactRingsMesh, R } = state;
  if (!contactDotsMesh || !contactRingsMesh) return;
  contacts.forEach((c, i) => {
    if (!c) {
      dummy.scale.setScalar(0);
      dummy.position.set(0, 0, 0);
    } else {
      const s = c.age < 0.08 ? _lerp(0, 8, c.age / 0.08) : 8;
      dummy.position.set(Math.sin(c.angle) * c.range * R, Math.cos(c.angle) * c.range * R, 0);
      dummy.scale.setScalar(s);
    }
    dummy.updateMatrix();
    contactDotsMesh.setMatrixAt(i, dummy.matrix);
    contactRingsMesh.setMatrixAt(i, dummy.matrix);
  });
  contactDotsMesh.instanceMatrix.needsUpdate  = true;
  contactRingsMesh.instanceMatrix.needsUpdate = true;
}

// ── Contact pool management ───────────────────────────────────────

function _freeSlot(state, idx) {
  const c = state.contacts[idx];
  if (!c) return;
  if (c.labelEl) { c.labelEl.remove(); c.labelEl = null; }
  if (state.contactDotsMesh && state.contactRingsMesh) {
    state.dummy.scale.setScalar(0);
    state.dummy.position.set(0, 0, 0);
    state.dummy.updateMatrix();
    state.contactDotsMesh.setMatrixAt(idx, state.dummy.matrix);
    state.contactRingsMesh.setMatrixAt(idx, state.dummy.matrix);
    state.contactDotsMesh.instanceMatrix.needsUpdate  = true;
    state.contactRingsMesh.instanceMatrix.needsUpdate = true;
  }
  state.contacts[idx] = null;
}

function _addContact(state, angle, range, type, id) {
  const maxC   = state.opts.maxContacts;
  const active = state.contacts.filter(Boolean).length;

  if (active >= maxC) {
    // Evict oldest ghost
    let oldest = -1, oldestAge = -1;
    for (let i = 0; i < POOL_SIZE; i++) {
      if (state.contacts[i]?.type === 'ghost' && state.contacts[i].age > oldestAge) {
        oldest = i; oldestAge = state.contacts[i].age;
      }
    }
    if (oldest >= 0) _freeSlot(state, oldest);
    else { console.warn('[pulse-radar] contact pool full'); return null; }
  }

  let slot = -1;
  for (let i = 0; i < POOL_SIZE; i++) { if (!state.contacts[i]) { slot = i; break; } }
  if (slot < 0) return null;

  const isGhost = type === 'ghost';
  const contact = {
    id:           id || `T-${String(++_contactCounter).padStart(2, '0')}`,
    angle:        ((angle % TAU) + TAU) % TAU,
    range:        Math.max(0, Math.min(1, range)),
    type,
    age:          isGhost ? 0.85 : 0.0,
    maxAge:       isGhost ? 3000 : 8000 + Math.random() * 10000,
    bornAt:       performance.now(),
    phase:        isGhost ? Math.random() * 0.3 : 0.0,
    lastSweep:    -Infinity,
    ghostAngle:   null,
    ghostRange:   null,
    ghostSpawned: false,
    instIdx:      slot,
    labelEl:      null,
    sweepAlpha:   isGhost ? 0.15 : 1.0,  // fades between sweep passes
    fadeTimeMs:   4200 * (0.88 + Math.random() * 0.24),  // 3696–4704ms
    // Sweep-reveal: contacts are invisible until the sweep arm paints them
    revealed:     isGhost,   // ghost echoes appear immediately (created by the sweep event)
    revealTime:   isGhost ? performance.now() : null,
  };

  if (!isGhost) {
    const span = document.createElement('span');
    span.className = `s9-radar__label s9-radar__label--${type}`;
    span.textContent = type === 'hostile'
      ? `${contact.id} ⚠HC`
      : contact.id;
    state.labelsDiv.appendChild(span);
    contact.labelEl = span;
  }

  state.contacts[slot] = contact;
  return contact;
}

// ── Spawn system ──────────────────────────────────────────────────

function _scheduleNextSpawn(state) {
  if (state.destroyed || state.reducedMotion) return;
  const density  = Math.max(0.05, state.opts.contactDensity);
  const base     = _lerp(3000, 600, state.threatLevel) / density;
  const jitter   = (Math.random() - 0.5) * base * 0.4;
  const delay    = Math.max(200, base + jitter);
  state.spawnTimer = setTimeout(() => {
    if (!state.destroyed && !state.reducedMotion) {
      _spawnAutoContact(state);
      _scheduleNextSpawn(state);
    }
  }, delay);
}

function _spawnAutoContact(state) {
  const existing = state.contacts.filter(c => c && c.type !== 'ghost');
  const cluster  = existing.length > 0 && Math.random() < 0.3;
  const base     = cluster ? existing[Math.floor(Math.random() * existing.length)] : null;
  const angle    = base ? base.angle + (Math.random() - 0.5) * 0.4 : Math.random() * TAU;
  const range    = 0.15 + Math.random() * 0.82;
  _addContact(state, angle, range, _randomType(state.threatLevel));
}

// ── Per-frame update functions ────────────────────────────────────

function _updateSweep(state, dt) {
  if (state.reducedMotion) return;
  const prevAngle = state.sweepAngle;
  state.sweepAngle = (state.sweepAngle + state.sweepSpeed * dt / 1000) % TAU;

  // Detect full revolution (angle wraps past TAU)
  if (state.sweepAngle < prevAngle) {
    _playSonarPing(0.06);
    state.centerGlowIntensity = 1.0;
  }
  // Decay center glow
  if (state.centerGlowIntensity > 0) {
    state.centerGlowIntensity *= Math.pow(0.001, dt / 600);  // fade over ~600ms
    if (state.centerGlowIntensity < 0.005) state.centerGlowIntensity = 0;
    if (state.centerGlowMesh) {
      state.centerGlowMesh.material.uniforms.uIntensity.value = state.centerGlowIntensity;
    }
  }

  const now = performance.now();
  if (state.staticNextAt === null) state.staticNextAt = now + 7000 + Math.random() * 5000;
  if (now >= state.staticNextAt && !state.staticActive) {
    state.staticActive  = true;
    state.staticEndAt   = now + 60 + Math.random() * 40;
    state.staticNextAt  = state.staticEndAt + 6000 + Math.random() * 4000;
  }
  if (state.staticActive) {
    state.sweepTrailMesh.material.uniforms.uStaticAmt.value = 0.5 + Math.random() * 0.5;
    if (now >= state.staticEndAt) {
      state.staticActive = false;
      state.sweepTrailMesh.material.uniforms.uStaticAmt.value = 1.0;
    }
  }

  if (state.sweepTrailMesh) state.sweepTrailMesh.material.uniforms.uAngle.value = state.sweepAngle;

  if (state.sweepArmLine) {
    const { R } = state;
    const pos = state.sweepArmLine.geometry.attributes.position;
    pos.setXYZ(0, 0, 0, 0);
    pos.setXYZ(1, Math.sin(state.sweepAngle) * R, Math.cos(state.sweepAngle) * R, 0);
    pos.needsUpdate = true;
  }
}

function _updateContacts(state, dt) {
  const { contacts, sweepAngle } = state;
  const now = performance.now();

  const nowMs = performance.now();

  contacts.forEach((c, i) => {
    if (!c) return;
    c.age += dt / c.maxAge;

    // Per-contact fade: 3000ms ±12%
    if (c.type !== 'ghost' && c.revealed) {
      const floor = 0.05 + 0.10 * (c.range);
      const elapsed = nowMs - c.lastSweep;
      const t = Math.min(1, elapsed / c.fadeTimeMs);
      c.sweepAlpha = floor + (1.0 - floor) * Math.pow(1.0 - t, 1.025);
    }

    if (c.type !== 'ghost') {
      const inFading = c.age > 0.65 && c.age < 0.85;
      c.phase += _ringHz(c.type) * (inFading ? 0.5 : 1.0) * dt / 1000;
    } else {
      c.phase += _ringHz('neutral') * dt / 1000;
    }

    // Sweep-reveal: contacts are invisible until the sweep arm paints them
    if (c.type !== 'ghost' && !state.reducedMotion) {
      const diff = Math.abs(_angleDiff(sweepAngle, c.angle));
      if (diff < 0.12 && now - c.lastSweep > 800) {
        c.phase      = 0;
        c.lastSweep  = now;
        c.sweepAlpha = 1.0;  // full brightness on sweep refresh
        if (!c.revealed) {
          c.revealed    = true;
          c.revealTime  = now;
        }
      }
    }

    // Ghost spawn at FADING transition (only for revealed contacts)
    if (c.type !== 'ghost' && !c.ghostSpawned && c.age >= 0.65 && c.revealed) {
      c.ghostAngle   = c.angle;
      c.ghostRange   = c.range;
      c.ghostSpawned = true;
      _addContact(state, c.ghostAngle, c.ghostRange, 'ghost');
    }

    if (c.age >= 1.0) _freeSlot(state, i);
  });
}

function _updateInstances(state) {
  const { contacts, dummy, contactDotsMesh, contactRingsMesh, R } = state;
  if (!contactDotsMesh || !contactRingsMesh) return;
  let dirty = false;

  contacts.forEach((c, i) => {
    if (!c) return;
    dirty = true;
    // Unrevealed contacts stay invisible; revealed contacts scale up over 300ms
    let scale;
    if (!c.revealed) {
      scale = 0;
    } else {
      const revealProgress = Math.min(1, (state.now - c.revealTime) / 300);
      scale = revealProgress * 8;
    }
    dummy.position.set(Math.sin(c.angle) * c.range * R, Math.cos(c.angle) * c.range * R, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    contactDotsMesh.setMatrixAt(i, dummy.matrix);
    contactRingsMesh.setMatrixAt(i, dummy.matrix);

    const tf = _typeFloat(c.type);
    contactDotsMesh.geometry.attributes.a_type.setX(i, tf);
    contactDotsMesh.geometry.attributes.a_age.setX(i, c.age);
    contactDotsMesh.geometry.attributes.a_phase.setX(i, c.phase);
    contactDotsMesh.geometry.attributes.a_sweepFade.setX(i, c.sweepAlpha);
    contactRingsMesh.geometry.attributes.a_type.setX(i, tf);
    contactRingsMesh.geometry.attributes.a_age.setX(i, c.age);
    contactRingsMesh.geometry.attributes.a_phase.setX(i, c.phase);
    contactRingsMesh.geometry.attributes.a_sweepFade.setX(i, c.sweepAlpha);
  });

  if (dirty) {
    contactDotsMesh.instanceMatrix.needsUpdate                   = true;
    contactRingsMesh.instanceMatrix.needsUpdate                  = true;
    contactDotsMesh.geometry.attributes.a_type.needsUpdate       = true;
    contactDotsMesh.geometry.attributes.a_age.needsUpdate        = true;
    contactDotsMesh.geometry.attributes.a_phase.needsUpdate      = true;
    contactDotsMesh.geometry.attributes.a_sweepFade.needsUpdate  = true;
    contactRingsMesh.geometry.attributes.a_type.needsUpdate      = true;
    contactRingsMesh.geometry.attributes.a_age.needsUpdate       = true;
    contactRingsMesh.geometry.attributes.a_phase.needsUpdate     = true;
    contactRingsMesh.geometry.attributes.a_sweepFade.needsUpdate = true;
  }
}

function _updateLabels(state) {
  const { contacts, element, R } = state;
  const cx = element.clientWidth  / 2;
  const cy = element.clientHeight / 2;
  contacts.forEach(c => {
    if (!c?.labelEl) return;
    if (!c.revealed) { c.labelEl.style.opacity = '0'; return; }
    const x = cx + Math.sin(c.angle) * c.range * R;
    const y = cy - Math.cos(c.angle) * c.range * R;
    c.labelEl.style.left    = `${x + 7}px`;
    c.labelEl.style.top     = `${y - 6}px`;
    c.labelEl.style.opacity = String(c.sweepAlpha);
  });
}

function _updateFooter(state) {
  if (!state.footerEl) return;
  const count  = state.contacts.filter(c => c && c.type !== 'ghost').length;
  const period = (TAU / state.sweepSpeed).toFixed(1);
  state.footerEl.textContent = `CONTACTS: ${count} | SWEEP: ${period}s`;
}

// ── RAF tick ──────────────────────────────────────────────────────

function _tick(state, ts) {
  if (state.destroyed || !state.rafRunning) {
    state.rafId = null;
    return;
  }
  const dt    = Math.min(ts - (state.lastTs ?? ts), 100);
  state.lastTs = ts;
  state.now    = ts;

  if (state.R > 0) {
    if (state.backgroundMesh) state.backgroundMesh.material.uniforms.uTime.value = ts / 1000;
    _updateSweep(state, dt);
    _updateContacts(state, dt);
    _updateInstances(state);
    _updateLabels(state);
    _updateFooter(state);
    state.renderer.render(state.scene, state.camera);
  }

  state.rafId = requestAnimationFrame(ts2 => _tick(state, ts2));
}

// ── Public API ────────────────────────────────────────────────────

/**
 * @param {HTMLElement} element
 * @param {object}  [opts]
 * @param {number}  [opts.sweepPeriod=4000]     ms per revolution
 * @param {number}  [opts.contactDensity=0.5]   0–1 scales base spawn interval
 * @param {number}  [opts.threatLevel=0]        initial 0–1
 * @param {string}  [opts.primaryColor]         CSS color override (null = read --neon-cyan)
 * @param {number}  [opts.maxContacts=48]       pool ceiling [4, 64]
 * @returns {{ setRadarThreatLevel: Function, injectContact: Function }}
 */
export function initRadar(element, opts = {}) {
  if (_state.has(element)) {
    console.warn('[pulse-radar] already initialised');
    const s = _state.get(element);
    return { setRadarThreatLevel: s.setRadarThreatLevel, injectContact: s.injectContact };
  }

  const options = {
    sweepPeriod:    2690,
    contactDensity: Math.max(0,    Math.min(1,     opts.contactDensity ?? 0.5)),
    threatLevel:    Math.max(0,    Math.min(1,     opts.threatLevel    ?? 0)),
    primaryColor:   opts.primaryColor ?? null,
    maxContacts:    Math.max(4,    Math.min(64,    opts.maxContacts    ?? 28)),
  };

  const theme = _readTheme();

  // ── DOM ──
  const canvas    = document.createElement('canvas');
  canvas.className = 's9-radar__canvas';
  const overlay   = document.createElement('div');
  overlay.className = 's9-radar__overlay';
  const labelsDiv = document.createElement('div');
  labelsDiv.className = 's9-radar__labels';
  overlay.appendChild(labelsDiv);
  element.appendChild(canvas);
  element.appendChild(overlay);

  // ── Renderer ──
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, premultipliedAlpha: false });
  } catch (e) {
    console.error('[pulse-radar] WebGL context creation failed', e);
    canvas.remove(); overlay.remove();
    const noop = () => {};
    return { setRadarThreatLevel: noop, injectContact: () => '' };
  }
  renderer.setClearColor(new THREE.Color(theme.voidColor), 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.debug.checkShaderErrors = true;

  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  const state = {
    element,  canvas,  overlay,  labelsDiv,
    renderer, scene,   camera,
    opts:            options,
    theme,
    R:               0,
    sweepAngle:      Math.random() * TAU,
    sweepSpeed:      TAU / (options.sweepPeriod / 1000),
    threatLevel:     options.threatLevel,
    contacts:        new Array(POOL_SIZE).fill(null),
    dummy:           new THREE.Object3D(),
    footerEl:        document.getElementById('radar-contacts'),
    staticLabelEls:  [],
    staticActive:    false,
    staticNextAt:    null,
    staticEndAt:     null,
    rafId:           null,
    rafRunning:      false,
    destroyed:       false,
    reducedMotion:   matchMedia('(prefers-reduced-motion: reduce)').matches,
    centerGlowIntensity: 0,
    centerGlowMesh:  null,
    backgroundMesh:  null,  ringMeshes:      null,  ticksMesh:       null,
    sweepTrailMesh:  null,  sweepArmLine:    null,
    contactDotsMesh: null,  contactRingsMesh: null,
    matRingInner:    null,  matRingOuter:    null,  matRingTicks: null,
    spawnTimer:      null,
    lastTs:          null,
    now:             performance.now(),
    resizeObserver:  null,  intersectionObserver: null,
    _motionMq:       null,  _motionHandler:  null,
    setRadarThreatLevel: null,
    injectContact:       null,
  };

  _state.set(element, state);

  // ── Boot animation ──
  const panel = element.closest('.s9-panel');
  if (panel) {
    panel.classList.add('s9-panel--booting');
    panel.addEventListener('animationend', () => panel.classList.remove('s9-panel--booting'), { once: true });
  }

  // ── ResizeObserver ──
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width: w, height: h } = entry.contentRect;
      if (w === 0 || h === 0) return;
      const R = Math.floor(Math.min(w, h) / 2) - 8;
      if (R <= 0) return;
      state.R = R;
      camera.left   = -R; camera.right  =  R;
      camera.top    =  R; camera.bottom = -R;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      _rebuildGeometry(state);
    }
  });
  ro.observe(element);
  state.resizeObserver = ro;

  // ── IntersectionObserver (pause RAF when off-screen) ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      state.rafRunning = entry.isIntersecting;
      if (state.rafRunning && !state.rafId) {
        state.rafId = requestAnimationFrame(ts => _tick(state, ts));
      }
    });
  }, { threshold: 0 });
  io.observe(element);
  state.intersectionObserver = io;

  // ── prefers-reduced-motion ──
  const motionMq      = matchMedia('(prefers-reduced-motion: reduce)');
  const motionHandler = () => {
    state.reducedMotion = motionMq.matches;
    if (state.reducedMotion) {
      state.sweepAngle = Math.PI * 0.15;
      clearTimeout(state.spawnTimer);
    } else {
      _scheduleNextSpawn(state);
    }
  };
  motionMq.addEventListener('change', motionHandler);
  state._motionMq      = motionMq;
  state._motionHandler = motionHandler;

  // ── Start ──
  state.rafRunning = true;
  state.rafId = requestAnimationFrame(ts => _tick(state, ts));
  if (!state.reducedMotion) _scheduleNextSpawn(state);

  // ── Control surface ──
  function setRadarThreatLevel(level) {
    const t = Math.max(0, Math.min(1, level));
    state.threatLevel = t;
    const basePeriod = state.opts.sweepPeriod / 1000;
    state.sweepSpeed  = TAU / _lerp(basePeriod, basePeriod * 0.4, t);
    clearTimeout(state.spawnTimer);
    _scheduleNextSpawn(state);
  }

  function injectContact(angle, range, type) {
    const validType = ['friendly', 'neutral', 'hostile'].includes(type) ? type : 'neutral';
    const c = _addContact(state, angle, Math.max(0, Math.min(1, range)), validType);
    return c ? c.id : '';
  }

  state.setRadarThreatLevel = setRadarThreatLevel;
  state.injectContact       = injectContact;

  return { setRadarThreatLevel, injectContact };
}

/** Tear down renderer, RAF, timers, observers. Removes canvas + overlay from DOM. */
export function destroyRadar(element) {
  const state = _state.get(element);
  if (!state) { console.warn('[pulse-radar] not initialised or already destroyed'); return; }

  state.destroyed = true;
  if (state.rafId) cancelAnimationFrame(state.rafId);
  clearTimeout(state.spawnTimer);
  state.resizeObserver?.disconnect();
  state.intersectionObserver?.disconnect();
  state._motionMq?.removeEventListener('change', state._motionHandler);

  // Free all contacts (removes label spans)
  for (let i = 0; i < POOL_SIZE; i++) { if (state.contacts[i]) _freeSlot(state, i); }
  state.staticLabelEls.forEach(el => el.remove());

  // Dispose Three.js scene
  state.scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  });
  state.renderer.dispose();
  state.canvas.remove();
  state.overlay.remove();
  _state.delete(element);
}

/** Re-read CSS vars → update material uniforms. Call after applyTheme(). */
export function refreshRadarTheme(element) {
  const state = _state.get(element);
  if (!state) return;
  const theme = _readTheme();
  state.theme = theme;

  const c0 = _c3(theme.neonGreen);
  const c1 = _c3(theme.neonAmber);
  const c2 = _c3(theme.neonMagenta);
  const c3 = _c3(theme.neonCyan);
  const cc = new THREE.Color(theme.neonCyan);

  if (state.backgroundMesh) {
    const vc = new THREE.Color(theme.voidColor);
    state.backgroundMesh.material.uniforms.uVoidColor.value.set(vc.r, vc.g, vc.b);
    state.renderer.setClearColor(new THREE.Color(theme.voidColor), 1);
  }
  if (state.matRingInner) state.matRingInner.color.set(theme.neonCyan);
  if (state.matRingOuter) state.matRingOuter.color.set(theme.neonCyan);
  if (state.matRingTicks) state.matRingTicks.color.set(theme.neonCyan);
  if (state.sweepTrailMesh) {
    const u = state.sweepTrailMesh.material.uniforms.uColor.value;
    u.set(cc.r, cc.g, cc.b);
  }
  if (state.sweepArmLine) state.sweepArmLine.material.color.set(theme.neonCyan);
  if (state.contactDotsMesh) {
    const u = state.contactDotsMesh.material.uniforms;
    u.uC0.value.set(...c0); u.uC1.value.set(...c1);
    u.uC2.value.set(...c2); u.uC3.value.set(...c3);
  }
  if (state.contactRingsMesh) {
    const u = state.contactRingsMesh.material.uniforms;
    u.uC0.value.set(...c0); u.uC1.value.set(...c1); u.uC2.value.set(...c2);
  }
}
