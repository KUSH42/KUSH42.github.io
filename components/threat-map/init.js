/**
 * Scene initialization, animation loop, teardown, and camera access for the threat-map globe.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';

import { _state, GLOBE_RADIUS } from './state.js';
import { _readCSSColors } from './utils.js';
import { HoloShader } from './shaders.js';
import { _loadGeoLines } from './geo-lines.js';
import { setActiveNode, _cancelAllAnimations } from './selection.js';
import { ANIM, easeOutCubic, easeInCubic, easeInOutCubic } from './anim-constants.js';
import { RingRevealAnimator } from '../ring-reveal/index.js';
import { easeOutExpo } from '../ring-reveal/easings.js';

// ── initThreatMap ─────────────────────────────────────────────

// ── _buildCrosshairHTML ───────────────────────────────────────

/**
 * Build the crosshair inner HTML for the given shape.
 *
 * @param {'box'|'bracket'|'diamond'} shape
 * @returns {string}
 */
function _buildCrosshairHTML(shape) {
  if (shape === 'bracket') {
    return `<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`;
  }
  if (shape === 'diamond') {
    return `<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`;
  }
  // Default: box
  return `<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`;
}

// ── initThreatMap ─────────────────────────────────────────────

/**
 * Initialise the Three.js scene, globe, orbit controls, bloom, and DOM overlay.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {{ autoRotate?: boolean, bloomStrength?: number, crosshairShape?: 'box'|'bracket'|'diamond' }} [options]
 */
export function initThreatMap(element, { autoRotate = true, bloomStrength = 1.7, crosshairShape = 'box' } = {}) {
  const ac = new AbortController();
  const { signal } = ac;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = _readCSSColors();

  // ── Renderer ─────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(element.clientWidth || 800, element.clientHeight || 600);
  renderer.domElement.classList.add('s9-threatmap__canvas');
  element.appendChild(renderer.domElement);

  // ── Scene + Camera ────────────────────────────────────────
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    (element.clientWidth || 800) / (element.clientHeight || 600),
    0.1,
    100
  );
  camera.position.set(0, 0, 3);

  // ── Globe — three-layer occlusion setup ──────────────────
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  // Occluder is fractionally smaller so its depth is strictly less than globeFront
  // on the front hemisphere (passes LEQUAL) but strictly less than globeFront on
  // the back hemisphere too — meaning back-hemisphere wireframe fragments are
  // always behind the occluder and correctly fail the depth test.
  const occluderGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 48, 48);

  // Layer 0: ghost back wires — drawn before any depth data, always faint
  const cyanColor = new THREE.Color(colors.neonCyan || '#00d4b0');

  // Shared Line2 wireframe geometry (WireframeGeometry → LineSegmentsGeometry)
  const wfPositions = new THREE.WireframeGeometry(globeGeo).getAttribute('position').array;
  const wfLineGeo = new LineSegmentsGeometry();
  wfLineGeo.setPositions(wfPositions);

  const w = element.clientWidth || 800;
  const h = element.clientHeight || 600;

  const globeBackMat = new LineMaterial({
    color: cyanColor,
    linewidth: 1,
    transparent: true,
    opacity: 0.014,
    depthTest: true,
    depthWrite: false,
  });
  globeBackMat.resolution.set(w, h);
  const globeBack = new LineSegments2(wfLineGeo, globeBackMat);
  globeBack.renderOrder = 0;
  scene.add(globeBack);

  // Layer 1: invisible occluder — writes back-surface depth unconditionally so that
  // globeFront wireframe fragments on the back hemisphere (which are deeper than the
  // occluder back surface) correctly fail LEQUAL, while front-hemisphere fragments
  // (which are shallower) still pass.
  // BackSide renders only the back-facing triangles (back hemisphere), and depthTest:false
  // ensures the write happens regardless of what is already in the buffer.
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest: true,
    depthFunc: THREE.AlwaysDepth,  // always passes → depth IS written (WebGL only writes depth when DEPTH_TEST is enabled)
    side: THREE.BackSide,          // renders back hemisphere → writes back-surface depth at all interior pixels
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 1;
  scene.add(occluder);

  // Front-hemisphere depth writer — renders the FRONT-FACING triangles of the globe
  // surface and writes depth, so nodes at radius 1.03 whose near face is closer than
  // the globe surface pass (front hemisphere), while equatorial/back nodes fail.
  // This is separate from the BackSide occluder which handles the back hemisphere.
  const frontOccluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest:  true,
    side:       THREE.FrontSide,
  });
  const frontOccluder = new THREE.Mesh(globeGeo, frontOccluderMat);
  frontOccluder.renderOrder = 1;
  scene.add(frontOccluder);

  // Layer 1.5: semi-transparent dark surface — visually fills the globe interior so
  // back-hemisphere content is not seen through it, and writes depth for front hemisphere.
  // DoubleSide: back face is automatically culled by the BackSide occluder (depth fails).
  const globeSurfaceMat = new THREE.MeshBasicMaterial({
    color:       new THREE.Color('#010e0b'),
    transparent: true,
    opacity:     0.72,
    depthTest:   true,
    depthWrite:  true,
    side:        THREE.DoubleSide,
  });
  const globeSurface = new THREE.Mesh(globeGeo, globeSurfaceMat);
  globeSurface.renderOrder = 1;
  scene.add(globeSurface);

  // Layer 2: visible front wires — depth-tested against occluder
  const globeFrontMat = new LineMaterial({
    color: cyanColor,
    linewidth: 1,
    transparent: true,
    opacity: 0.05,
    depthTest: true,
    depthWrite: false,
  });
  globeFrontMat.resolution.set(w, h);
  const globeFront = new LineSegments2(wfLineGeo, globeFrontMat);
  globeFront.renderOrder = 2;
  scene.add(globeFront);

  // Layer 3: glow wireframe — additive luminance on wireframe lines
  const globeGlowMat = new LineMaterial({
    color: cyanColor,
    linewidth: 1,
    transparent: true,
    opacity: 0.03,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
  });
  globeGlowMat.resolution.set(w, h);
  const globeGlow = new LineSegments2(wfLineGeo, globeGlowMat);
  globeGlow.renderOrder = 3;
  scene.add(globeGlow);

  // Layer 4: fresnel rim glow — bright edge halo around globe silhouette
  const rimGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  const rimMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Vector3(cyanColor.r, cyanColor.g, cyanColor.b) },
    },
    vertexShader: /* glsl */`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vec4 mv  = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim   = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float alpha = pow(rim, 3.5) * 0.75;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
    side:        THREE.FrontSide,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.renderOrder = 4;
  scene.add(rimMesh);

  // ── Orbit Controls ────────────────────────────────────────
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = autoRotate && !reducedMotion;
  controls.autoRotateSpeed = 0.4;
  controls.enablePan = false;
  controls.minDistance = 1.5;
  controls.maxDistance = 5;
  controls.minPolarAngle = Math.PI / 2 - (42.5 * Math.PI / 180);  // 42.5° above equator
  controls.maxPolarAngle = Math.PI / 2 + (42.5 * Math.PI / 180);  // 42.5° below equator

  // ── Post-processing ───────────────────────────────────────
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(element.clientWidth || 800, element.clientHeight || 600),
    bloomStrength * 2.0,  // increased multiplier for overall brightness
    0.4,                  // tight radius — prevents node glow from bleeding into globe interior
    0.30                  // lower threshold picks up dimmer wireframe layers
  );
  composer.addPass(bloomPass);

  // Holographic display effects — vignette + scanlines + chromatic aberration
  // OutputPass intentionally omitted: renderer.outputColorSpace handles sRGB conversion,
  // and OutputPass with alpha:true renderer would overwrite alpha→1 (opaque black canvas).
  const holoPass = new ShaderPass(HoloShader);
  composer.addPass(holoPass);

  // ── Overlay DOM ───────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 's9-threatmap__overlay';
  overlay.innerHTML = `
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${_buildCrosshairHTML(crosshairShape)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `;
  element.appendChild(overlay);

  // ── Auto-rotate pause on user interaction ─────────────────
  let resumeTimer = null;

  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    if (resumeTimer !== null) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
    // Cancel any in-progress camera snap and record interaction time
    const s = _state.get(element);
    if (s) {
      s.cameraLerpTarget = null;
      s.lastOrbitInteraction = Date.now();
    }
  });

  controls.addEventListener('end', () => {
    if (!reducedMotion && autoRotate) {
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
        resumeTimer = null;
      }, 6000);
    }
  });

  // ── Resize observer ───────────────────────────────────────
  const resizeObserver = new ResizeObserver(() => {
    const w = element.clientWidth;
    const h = element.clientHeight;
    if (!w || !h) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
    bloomPass.resolution.set(w, h);
    const s = _state.get(element);
    if (s) {
      s.globeBackMat.resolution.set(w, h);
      s.globeFrontMat.resolution.set(w, h);
      s.globeGlowMat.resolution.set(w, h);
      for (const mat of s.geoLineMats) mat.resolution.set(w, h);
    }
  });
  resizeObserver.observe(element);

  // ── Raycasting for node click ─────────────────────────────
  const raycaster = new THREE.Raycaster();

  renderer.domElement.addEventListener(
    'click',
    (event) => {
      const state = _state.get(element);
      if (!state) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const ndcX = ((event.clientX - rect.left) / w) * 2 - 1;
      const ndcY = -((event.clientY - rect.top)  / h) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

      const meshes = Array.from(state.nodeMap.values()).map((r) => r.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        setActiveNode(element, hit.userData.nodeId);
      } else if (state.activeNodeId !== null) {
        setActiveNode(element, null);
      }
    },
    { signal }
  );

  // ── Store state ───────────────────────────────────────────
  _state.set(element, {
    animFrameId: null,
    renderer,
    composer,
    bloomPass,
    controls,
    scene,
    camera,
    resizeObserver,
    nodeMap: new Map(),
    edgeMap: new Map(),
    abortController: ac,
    resumeTimer: null,
    reducedMotion,
    activeNodeId: null,
    colors,
    cyanColor,
    globeGeo,
    occluderGeo,
    globeBack,
    globeBackMat,
    occluder,
    frontOccluder,
    globeSurface,
    globeFront,
    globeFrontMat,
    globeGlow,
    globeGlowMat,
    rimGeo,
    rimMesh,
    geoGroup: null,
    geoLineMats: [],
    cameraLerpTarget: null,
    lastOrbitInteraction: 0,
    arcs: [],
    satelliteMode: false,
    sunAngle: Math.random() * Math.PI * 2,
    satelliteGroup: null,
    holoPass,
    nodeGeo: new THREE.SphereGeometry(0.02, 8, 8),
    // Node select animation state
    nodeTween:        null,
    deselectTween:    null,
    labelTypewriter:  null,
    coordScrambleLat: null,
    coordScrambleLng: null,
    pendingTimers:    [],
    tweenGeneration:  0,
    crosshairShape,
  });

  const state = _state.get(element);

  let _prevTime = performance.now();

  function animateLoop() {
    const s = _state.get(element);
    if (!s) return;
    s.animFrameId = requestAnimationFrame(animateLoop);

    const now = performance.now();
    const deltaMs = now - _prevTime;
    _prevTime = now;

    // Tick ring reveal animator
    if (s.revealAnim) s.revealAnim.tick(deltaMs);

    // Camera lerp to focused node — suppressed for 3 s after user orbit interaction
    if (s.cameraLerpTarget && Date.now() - s.lastOrbitInteraction >= 3000) {
      s.camera.position.lerp(s.cameraLerpTarget, 0.06);
      if (s.camera.position.distanceTo(s.cameraLerpTarget) < 0.04) {
        s.camera.position.copy(s.cameraLerpTarget);
        s.cameraLerpTarget = null;
      }
    }

    s.controls.update();

    // Tick arc particles
    for (let i = s.arcs.length - 1; i >= 0; i--) {
      const arc = s.arcs[i];
      const t = Math.min(1, (Date.now() - arc.t0) / arc.dur);
      arc.particle.position.copy(arc.curve.getPoint(t));
      if (t > 0.75) {
        const fade = 1 - (t - 0.75) / 0.25;
        arc.ptMat.opacity = 0.9 * fade;
        arc.lineMat.opacity = 0.1 * fade;
      }
      if (t >= 1) {
        s.scene.remove(arc.line);
        s.scene.remove(arc.particle);
        arc.lineGeo.dispose(); arc.lineMat.dispose();
        arc.ptGeo.dispose();   arc.ptMat.dispose();
        s.arcs.splice(i, 1);
      }
    }

    // Rotate sun direction + tick holo time when in satellite mode
    if (s.satelliteMode && s.satMat) {
      s.sunAngle += 0.00015;
      const t = performance.now() * 0.001;
      s.satMat.uniforms.sunDir.value.set(
        Math.cos(s.sunAngle), 0.22, Math.sin(s.sunAngle)
      ).normalize();
      s.satMat.uniforms.time.value = t;
      if (s.atmMat) s.atmMat.uniforms.time.value = t;
    }

    // Update holo pass time uniform for animated effects
    if (s.holoPass) s.holoPass.uniforms.time.value = performance.now() * 0.001;

    // Track crosshair to active node via 3D→2D projection
    if (s.activeNodeId !== null) {
      const nodeRecord = s.nodeMap.get(s.activeNodeId);
      const crosshair  = element.querySelector('.s9-threatmap__crosshair');
      if (nodeRecord && crosshair) {
        const w = element.clientWidth;
        const h = element.clientHeight;
        const ndc = nodeRecord.mesh.position.clone().project(s.camera);
        const x = ( ndc.x *  0.5 + 0.5) * w;
        const y = (-ndc.y *  0.5 + 0.5) * h;
        crosshair.style.left = `${x}px`;
        crosshair.style.top  = `${y}px`;
      }
    }

    // Tick node select tween (scale pulse + color flash → settle)
    if (s.nodeTween) {
      const tw      = s.nodeTween;
      const elapsed = Date.now() - tw.t0;
      const t       = Math.min(1, elapsed / tw.dur);

      // Scale: rise then fall around peak
      const scaledT = t < tw.riseFrac
        ? easeOutCubic(t / tw.riseFrac)
        : easeInCubic((t - tw.riseFrac) / (1 - tw.riseFrac));
      const scale = t < tw.riseFrac
        ? 1.0 + (tw.peakScale - 1.0) * scaledT
        : tw.peakScale - (tw.peakScale - 1.0) * scaledT;
      tw.mesh.scale.setScalar(scale);

      // Color: hold flash, then lerp to selectColor
      // lerpColors is an INSTANCE method: color.lerpColors(a, b, alpha)
      const flashFrac  = tw.flashDur  / tw.dur;
      const settleFrac = tw.settleDur / tw.dur;
      if (t < flashFrac) {
        tw.mesh.material.color.copy(tw.flashColor);
      } else if (t < flashFrac + settleFrac) {
        const ct = (t - flashFrac) / settleFrac;
        tw.mesh.material.color.lerpColors(tw.flashColor, tw.selectColor, easeInOutCubic(ct));
      } else {
        tw.mesh.material.color.copy(tw.selectColor);
      }

      if (t >= 1) {
        tw.mesh.scale.setScalar(1.0);
        tw.mesh.material.color.copy(tw.selectColor);
        s.nodeTween = null;
      }
    }

    // Tick node deselect tween (scale dip + color return to level color)
    if (s.deselectTween) {
      const tw      = s.deselectTween;
      const elapsed = Date.now() - tw.t0;
      const t       = Math.min(1, elapsed / tw.dur);

      const trough  = 0.4;
      const scaledT = t < trough
        ? easeInCubic(t / trough)
        : easeOutCubic((t - trough) / (1 - trough));
      const scale = t < trough
        ? 1.0 - (1.0 - tw.troughScale) * scaledT
        : tw.troughScale + (1.0 - tw.troughScale) * scaledT;
      tw.mesh.scale.setScalar(scale);

      // lerpColors is an INSTANCE method
      tw.mesh.material.color.lerpColors(tw.selectColor, tw.levelColor, easeInOutCubic(t));

      if (t >= 1) {
        tw.mesh.scale.setScalar(1.0);
        tw.mesh.material.color.copy(tw.levelColor);
        // Remove --animating-out class now that the tween is complete
        const crosshair = tw.element.querySelector('.s9-threatmap__crosshair');
        if (crosshair) crosshair.classList.remove('s9-threatmap__crosshair--animating-out');
        s.deselectTween = null;
      }
    }

    s.composer.render();
  }
  // ── Ring reveal load-in animation ────────────────────────
  const revealAnim = new RingRevealAnimator(scene, {
    radius:            GLOBE_RADIUS * 1.003,
    numRings:          56,
    durationMs:        2000,
    easingFn:          easeOutExpo,
    direction:         'south-to-north',
    stagger:           0.55,
    lineColor:         0x00ffcc,
    glowColor:         0x00ffcc,
    emissiveIntensity: 2.0,
    opacity:           0,
    glowOpacity:       0,
  });
  revealAnim.baseRings.renderOrder = 4;
  revealAnim.glowRings.renderOrder = 4;
  state.revealAnim = revealAnim;

  state.animFrameId = requestAnimationFrame(animateLoop);

  // Load geographic outlines async — non-blocking, failure is graceful
  _loadGeoLines(element);
}

// ── destroyThreatMap ──────────────────────────────────────────

/**
 * Tear down the Three.js scene, cancel animation, dispose geometry/materials, remove DOM.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 */
export function destroyThreatMap(element) {
  const state = _state.get(element);
  if (!state) return;

  // Cancel all pending animation timers before disposal to prevent use-after-free
  _cancelAllAnimations(element);

  cancelAnimationFrame(state.animFrameId);

  if (state.resumeTimer !== null) {
    clearTimeout(state.resumeTimer);
  }

  state.resizeObserver.disconnect();
  state.abortController.abort();

  // Dispose nodes (geometry is shared — dispose it once below, not per-mesh)
  for (const [, record] of state.nodeMap) {
    record.mesh.material.dispose();
    state.scene.remove(record.mesh);
  }
  if (state.nodeGeo) state.nodeGeo.dispose();

  // Dispose edges
  for (const [, record] of state.edgeMap) {
    record.line.geometry.dispose();
    record.line.material.dispose();
    state.scene.remove(record.line);
  }

  // Dispose ring reveal animator
  if (state.revealAnim) state.revealAnim.dispose();

  // Dispose globe layers
  if (state.globeGeo)    state.globeGeo.dispose();
  if (state.occluderGeo) state.occluderGeo.dispose();
  if (state.globeBack)  { state.scene.remove(state.globeBack);  state.globeBack.material.dispose(); }
  if (state.occluder)      { state.scene.remove(state.occluder);      state.occluder.material.dispose(); }
  if (state.frontOccluder) { state.scene.remove(state.frontOccluder); state.frontOccluder.material.dispose(); }
  if (state.globeSurface)  { state.scene.remove(state.globeSurface);  state.globeSurface.material.dispose(); }
  if (state.globeFront)    { state.scene.remove(state.globeFront);    state.globeFront.material.dispose(); }
  if (state.globeGlow)  { state.scene.remove(state.globeGlow);  state.globeGlow.material.dispose(); }
  if (state.rimMesh)    { state.scene.remove(state.rimMesh);    state.rimMesh.material.dispose(); }
  if (state.rimGeo)     state.rimGeo.dispose();

  // Dispose satellite globe
  if (state.satelliteGroup) {
    state.scene.remove(state.satelliteGroup);
    if (state.satGeo)   state.satGeo.dispose();
    if (state.atmGeo)   state.atmGeo.dispose();
    if (state.satMat)   state.satMat.dispose();
    if (state.atmMat)   state.atmMat.dispose();
    if (state.dayTex)   state.dayTex.dispose();
    if (state.nightTex) state.nightTex.dispose();
  }

  // Dispose live arcs
  for (const arc of state.arcs) {
    state.scene.remove(arc.line);
    state.scene.remove(arc.particle);
    arc.lineGeo.dispose(); arc.lineMat.dispose();
    arc.ptGeo.dispose();   arc.ptMat.dispose();
  }

  // Dispose geo lines
  if (state.geoGroup) {
    const seen = new Set();
    state.geoGroup.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material && !seen.has(obj.material)) {
        obj.material.dispose();
        seen.add(obj.material);
      }
    });
    state.scene.remove(state.geoGroup);
  }

  if (state.holoPass) state.holoPass.material.dispose();
  state.composer.dispose();
  state.renderer.dispose();

  // Remove DOM children added by initThreatMap
  const canvas = element.querySelector('.s9-threatmap__canvas');
  if (canvas) element.removeChild(canvas);

  const overlay = element.querySelector('.s9-threatmap__overlay');
  if (overlay) element.removeChild(overlay);

  _state.delete(element);
}

// ── getCamera ─────────────────────────────────────────────────

export function getCamera(element) {
  return _state.get(element)?.camera ?? null;
}

export function getRevealAnim(element) {
  return _state.get(element)?.revealAnim ?? null;
}
