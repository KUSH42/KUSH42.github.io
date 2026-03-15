/**
 * components/pulse-radar/geometry.js
 * Three.js geometry builders, scene element builders, label helpers,
 * and the full geometry rebuild triggered on resize.
 */

import * as THREE from 'three';
import {
  _bgVert, _bgFrag, _sweepVert, _sweepFrag,
  _contactVert, _dotFrag, _ringFrag, _centerGlowFrag,
} from './shaders.js';
import { TAU, POOL_SIZE, _c3, _lerp } from './utils.js';

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

export function _buildBackground(state) {
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

export function _buildCenterGlow(state) {
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

export function _buildRingsAndTicks(state) {
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

export function _buildSweep(state) {
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

export function _buildContactMeshes(state) {
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
  const c1 = _c3(theme.neonWarn);
  const c2 = _c3(theme.neonAlert);
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

export function _repositionStaticLabels(state) {
  const { element, overlay, R } = state;
  const cx = element.clientWidth  / 2;
  const cy = element.clientHeight / 2;

  state.staticLabelEls.forEach(el => el.remove());
  state.staticLabelEls = [];

  // Range labels at 3 o'clock of each ring
  const KM     = [2, 4, 6, 8];
  const RADII  = [0.2, 0.4, 0.6, 0.8];
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

export function _rebuildGeometry(state) {
  _buildBackground(state);
  _buildCenterGlow(state);
  _buildRingsAndTicks(state);
  _buildSweep(state);
  _repositionStaticLabels(state);
  if (!state.contactDotsMesh) _buildContactMeshes(state);
  else _recomputeContactPositions(state);
}

export function _recomputeContactPositions(state) {
  const { contacts, dummy, contactDotsMesh, contactRingsMesh, R } = state;
  if (!contactDotsMesh || !contactRingsMesh) return;
  contacts.forEach((c, i) => {
    if (!c) {
      dummy.scale.setScalar(0);
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      contactDotsMesh.setMatrixAt(i, dummy.matrix);
      contactRingsMesh.setMatrixAt(i, dummy.matrix);
    } else {
      const s = c.age < 0.08 ? _lerp(0, 8, c.age / 0.08) : 8;
      dummy.position.set(Math.sin(c.angle) * c.range * R, Math.cos(c.angle) * c.range * R, 0);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      contactDotsMesh.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(s > 0 ? R * 1.5 : 0);
      dummy.updateMatrix();
      contactRingsMesh.setMatrixAt(i, dummy.matrix);
    }
  });
  contactDotsMesh.instanceMatrix.needsUpdate  = true;
  contactRingsMesh.instanceMatrix.needsUpdate = true;
}
