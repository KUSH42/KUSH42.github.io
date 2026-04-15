/**
 * matrix-rain-geometry.js — Scene constants, MSDF loader, Cluster class,
 * instanced buffer geometry builder, and CameraController.
 */

import * as THREE from 'three/webgpu';

// ── Scene constants ────────────────────────────────────────────────────────
export const N_ROWS  = 120;
export const CELL_W  = 0.12;
export const CELL_H  = 0.08;
export const WORLD_H = 16;

// ── MSDF atlas ────────────────────────────────────────────────────────────
export function configureDistanceFieldTexture(tex) {
  tex.flipY           = false;
  // Mipmaps must be disabled for MTSDF atlases. Standard box-filter downsampling
  // averages SDF channel values, producing invalid distance fields at lower mip levels.
  // The GPU's LOD interpolation then blends between valid and corrupted mips as the
  // camera moves, causing complex glyphs (R, K, etc.) to flicker.
  tex.minFilter       = THREE.LinearFilter;
  tex.magFilter       = THREE.LinearFilter;
  tex.colorSpace      = THREE.LinearSRGBColorSpace;
  tex.generateMipmaps = false;
  return tex;
}

export function loadMSDF(path) {
  return configureDistanceFieldTexture(new THREE.TextureLoader().load(path));
}

// Box-Muller Gaussian random — used for cluster angular jitter
function _gaussRand() {
  const u = 1 - Math.random(); // (0, 1] avoids log(0)
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ── Cluster class — owns all per-cluster state ────────────────────────────
class Cluster {
  constructor(thetaCenter, worldH) {
    this.theta      = thetaCenter;
    this.hue        = Math.random() * 2 - 1;   // per-cluster hue offset [-1, 1]
    this.brightness = Math.random() * 2 - 1;   // per-cluster brightness bias [-1, 1]
    this.speed      = Math.random() * 2 - 1;   // per-cluster speed bias [-1, 1]
    this.burstSeed  = Math.random();            // burst desync offset [0, 1]
    this.yCenter    = (Math.random() - 0.5) * worldH;  // spawn Y band center
    this.rSeed      = Math.random();            // shell depth seed [0, 1]
    this.phase      = Math.random();            // cycle phase seed [0, 1]
    this._colCount  = 0;
    this.squadPhases      = null;
    this.squadTrailBiases = null;
  }

  initSquads(maxSquadsPerCluster) {
    this.squadPhases = Array.from({ length: maxSquadsPerCluster }, () => {
      return Math.max(0, Math.min(1, this.phase + (Math.random() - 0.5) * 0.2));
    });
    this.squadTrailBiases = Array.from({ length: maxSquadsPerCluster }, () => Math.random() * 2 - 1);
  }

  nextSquadIdx(squadSize) {
    return Math.floor(this._colCount++ / squadSize);
  }
}

// ── Pure cluster-array builder (no Three.js dependency) ───────────────────
/**
 * Fills all per-instance Float32Arrays needed by the cluster/flocking system.
 * No Three.js is imported or used — safe to call from Node unit tests.
 * buildGeometry() calls this and wraps the result in THREE attributes.
 *
 * @returns {{
 *   colABuf:            Float32Array,   // (nCols*nRows)*4: wx, wz, speed, seed
 *   colBBuf:            Float32Array,   // (nCols*nRows)*4: yOff, scale, alpha, trail
 *   rawSpeedBuf:        Float32Array,   // nCols:          raw [0,1] speed seed
 *   biasedTrailBuf:     Float32Array,   // nCols:          squad-biased [0.05,0.95] trail
 *   clusterHueBuf:      Float32Array,   // nCols*nRows:    per-cluster hue [-1,1]
 *   clusterBrightBuf:   Float32Array,   // nCols*nRows:    per-cluster brightness [-1,1]
 *   clusterSpeedBuf:    Float32Array,   // nCols*nRows:    per-cluster speed [-1,1]
 *   clusterBurstSeedBuf:Float32Array,   // nCols*nRows:    burst-window phase [0,1]
 *   clusterCenterBuf:   Float32Array,   // (nCols*nRows)*2: centroid (wx,wz) per cluster
 *   squadPhaseBuf:      Float32Array,   // nCols*nRows:    squad cycle-phase seed [0,1]
 *   spawnThetaBuf:      Float32Array,   // nCols*nRows:    normalised azimuth [0,1]
 *   reserveStart:       number,
 *   reserveOrigYOff:    Float32Array,   // spawnReserves: Y restore values for reserve pool
 *   clusterThetas:      number[],       // stratified cluster center angles (radians)
 *   nClusters:          number,
 * }}
 */
export function buildClusterArrays({
  nCols           = 600,
  nRows           = N_ROWS,
  worldH          = WORLD_H,
  speedMin        = 0.8,
  speedMax        = 4.0,
  trailMin        = 0.015,
  trailMax        = 0.050,
  topology        = 'shell',
  shellInner      = 3.5,
  shellOuter      = 8.0,
  rectW           = 8.0,
  rectH           = 8.0,
  clusterCount    = 12,
  clusterSpread   = 0.017,
  radialBias      = 0.0,
  clusterUniform  = 0.0,
  clusterSpeedJitter = 0.18,
  clusterYSpread  = 3.0,
  clusterRJitter  = 0.20,
  squadSize       = 5,
  trailCohesion   = 0.7,
  spawnReserves   = 48,
} = {}) {
  const sMin  = Math.min(speedMin, speedMax);
  const sMax  = Math.max(speedMin, speedMax);
  const tMin  = Math.max(0.001, Math.min(trailMin, trailMax));
  const tMax  = Math.max(tMin, Math.max(trailMin, trailMax));
  const inner = shellInner;
  const outer = Math.max(shellOuter, inner + 0.1);

  const total           = nCols * nRows;
  const colABuf         = new Float32Array(total * 4);   // wx, wz, speed, seed
  const colBBuf         = new Float32Array(total * 4);   // yOff, scale, alpha, trail
  const rawSpeedBuf     = new Float32Array(nCols);
  const biasedTrailBuf  = new Float32Array(nCols);
  const clusterHueBuf       = new Float32Array(total);
  const clusterBrightBuf    = new Float32Array(total);
  const clusterSpeedBuf     = new Float32Array(total);
  const clusterBurstSeedBuf = new Float32Array(total);
  const squadPhaseBuf       = new Float32Array(total);
  const spawnThetaBuf       = new Float32Array(total);

  const nClusters    = Math.max(1, Math.round(clusterCount));
  const sigma        = Math.max(0.003, clusterSpread) * 2 * Math.PI;  // σ in radians
  const exp_         = Math.pow(2, -radialBias);  // bias=0→exp=1 (uniform)
  // Stratified placement: one center per arc — eliminates cluster-of-clusters bunching.
  const arcSize      = (Math.PI * 2) / nClusters;
  // Squad structure: subdivides each cluster into squads of ~squadSize columns.
  const maxColsPerCluster   = Math.ceil(nCols / nClusters);
  const maxSquadsPerCluster = Math.ceil(maxColsPerCluster / squadSize) + 1;
  const clusters = Array.from({ length: nClusters }, (_, i) =>
    new Cluster(i * arcSize + Math.random() * arcSize, worldH)
  );
  clusters.forEach(cl => cl.initSquads(maxSquadsPerCluster));

  for (let c = 0; c < nCols; c++) {
    // Round-robin cluster assignment: guarantees balanced populations so squad sizes
    // are consistent (each cluster gets exactly ceil(nCols/nClusters) columns).
    const clusterIdx    = c % nClusters;
    const cl            = clusters[clusterIdx];
    const clustered     = cl.theta + _gaussRand() * sigma;
    const colBurstSeed  = cl.burstSeed;
    const squadSubIdx   = cl.nextSquadIdx(squadSize);
    const colSquadPhase = cl.squadPhases[squadSubIdx];
    const colTrailBias  = cl.squadTrailBiases[squadSubIdx];
    const uniformTheta  = Math.random() * Math.PI * 2;
    const theta         = clustered + (uniformTheta - clustered) * clusterUniform;
    // Normalize theta to [-1, 1] for linear topologies (curtain/rectangle X axis).
    const TWO_PI    = Math.PI * 2;
    const thetaNorm = (((theta % TWO_PI) + TWO_PI) % TWO_PI) / TWO_PI * 2 - 1;  // [-1, 1]
    // Radial position: cluster-centered for shell only.
    const rSeed  = topology === 'shell'
      ? Math.max(0, Math.min(1, cl.rSeed + (Math.random() - 0.5) * 2 * clusterRJitter))
      : Math.random();
    let r = inner + Math.pow(rSeed, exp_) * (outer - inner);

    let wx, wz;
    switch (topology) {
      case 'ring': {
        const r_ring = (inner + outer) / 2;
        wx = Math.cos(theta) * r_ring;
        wz = Math.sin(theta) * r_ring;
        break;
      }
      case 'curtain':
        wx = thetaNorm * outer;
        wz = (Math.random() * 2 - 1) * inner;
        break;
      case 'rectangle':
        wx = thetaNorm * rectW;
        wz = (Math.random() * 2 - 1) * rectH;
        break;
      default: // 'shell'
        wx = Math.cos(theta) * r;
        wz = Math.sin(theta) * r;
    }

    // Normalise angular/lateral position to [0, 1] for spawn wave gate.
    let colTheta;
    if (topology === 'shell' || topology === 'ring') {
      colTheta = ((Math.atan2(wz, wx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
    } else if (topology === 'curtain') {
      colTheta = (wx / outer + 1) / 2;
    } else { // rectangle
      colTheta = (wx / rectW + 1) / 2;
    }

    // Normalise r for scale gradient
    if (topology === 'ring')      r = (inner + outer) / 2;
    if (topology === 'curtain')   r = Math.min(Math.max(inner, outer), Math.max(inner, Math.sqrt(wx * wx + wz * wz)));
    if (topology === 'rectangle') r = Math.min(Math.max(rectW, rectH), Math.max(inner, Math.sqrt(wx * wx + wz * wz)));

    // Y offset: cluster-centered so columns in the same cluster spawn in the same world-Y band.
    const yOff = Math.max(-worldH / 2, Math.min(worldH / 2,
      cl.yCenter + (Math.random() - 0.5) * 2 * clusterYSpread
    ));
    // Speed: cluster-centered so heads stay in the same vertical band over time.
    const sr    = Math.max(0, Math.min(1,
      cl.speed * 0.5 + 0.5 + (Math.random() - 0.5) * 2 * clusterSpeedJitter
    ));
    rawSpeedBuf[c] = sr;
    const speed = sMin + sr * sr * (sMax - sMin);
    const seed  = Math.random();
    const t     = (r - inner) / (outer - inner);           // 0 = inner, 1 = outer
    const scale = (1.45 - t * 0.95) + (Math.random() - 0.5) * 0.2;
    const alpha = 0.18 + Math.random() * 0.72;
    const tr    = Math.random();
    // Clamp to [0.05, 0.95] — coefficient 0.45 keeps the full bias swing within this range.
    const biasedTr = Math.max(0.05, Math.min(0.95, tr + colTrailBias * 0.45 * trailCohesion));
    biasedTrailBuf[c] = biasedTr;
    const trail = tMin + biasedTr * (tMax - tMin);

    for (let row = 0; row < nRows; row++) {
      const idx = c * nRows + row;
      const i4  = idx * 4;
      colABuf[i4]     = wx;
      colABuf[i4 + 1] = wz;
      colABuf[i4 + 2] = speed;
      colABuf[i4 + 3] = seed;
      colBBuf[i4]     = yOff;
      colBBuf[i4 + 1] = scale;
      colBBuf[i4 + 2] = alpha;
      colBBuf[i4 + 3] = trail;
      clusterHueBuf[idx]       = cl.hue;
      clusterBrightBuf[idx]    = cl.brightness;
      clusterSpeedBuf[idx]     = cl.speed;
      clusterBurstSeedBuf[idx] = colBurstSeed;
      squadPhaseBuf[idx]       = colSquadPhase;
      spawnThetaBuf[idx]       = colTheta;
    }
  }

  // ── aClusterCenter centroid computation ──────────────────────────────────
  // Regular (non-reserve) columns only; reserve entries filled in reserve loop below.
  const reserveStart  = nCols - spawnReserves;
  const clusterSumX   = new Float32Array(nClusters);
  const clusterSumZ   = new Float32Array(nClusters);
  const clusterCount2 = new Int32Array(nClusters);
  for (let c = 0; c < reserveStart; c++) {
    const ci   = c % nClusters;
    const base = c * nRows * 4;
    clusterSumX[ci]  += colABuf[base];
    clusterSumZ[ci]  += colABuf[base + 1];
    clusterCount2[ci]++;
  }
  const clusterCenterX = new Float32Array(nClusters);
  const clusterCenterZ = new Float32Array(nClusters);
  for (let ci = 0; ci < nClusters; ci++) {
    const cnt = Math.max(1, clusterCount2[ci]);
    clusterCenterX[ci] = clusterSumX[ci] / cnt;
    clusterCenterZ[ci] = clusterSumZ[ci] / cnt;
  }
  const clusterCenterBuf = new Float32Array(total * 2);
  for (let c = 0; c < reserveStart; c++) {
    const ci = c % nClusters;
    const cx = clusterCenterX[ci];
    const cz = clusterCenterZ[ci];
    for (let row = 0; row < nRows; row++) {
      const i2 = (c * nRows + row) * 2;
      clusterCenterBuf[i2]     = cx;
      clusterCenterBuf[i2 + 1] = cz;
    }
  }

  // ── Reserve pool ──────────────────────────────────────────────────────────
  // Last spawnReserves columns repositioned for predictable screen coverage.
  // Cluster attributes reassigned to nearest cluster so reserves participate in
  // correct burst timing during message reveals.
  const reserveOrigYOff = new Float32Array(spawnReserves);
  const rRing = (inner + outer) / 2;
  for (let i = 0; i < spawnReserves; i++) {
    const c     = reserveStart + i;
    const frac  = spawnReserves > 1 ? i / (spawnReserves - 1) : 0.5;
    const angle = (i / spawnReserves) * Math.PI * 2;
    let rwx, rwz;
    switch (topology) {
      case 'ring':
        rwx = Math.cos(angle) * rRing;
        rwz = Math.sin(angle) * rRing;
        break;
      case 'curtain':
        rwx = (frac * 2 - 1) * outer;
        rwz = (Math.random() * 2 - 1) * inner;
        break;
      case 'rectangle':
        rwx = (frac * 2 - 1) * rectW;
        rwz = (Math.random() * 2 - 1) * rectH;
        break;
      default: // 'shell'
        rwx = Math.cos(angle) * inner;
        rwz = Math.sin(angle) * inner;
    }

    // Find the cluster center angularly closest to this reserve column's position.
    let nearestCluster = 0, nearestDist = Infinity;
    for (let ci = 0; ci < nClusters; ci++) {
      const diff = Math.abs(((angle - clusters[ci].theta) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
      if (diff < nearestDist) { nearestDist = diff; nearestCluster = ci; }
    }
    const reserveCl = clusters[nearestCluster];
    const reserveSquadIdx   = Math.floor(reserveCl._colCount / squadSize);
    const reserveSquadPhase = reserveCl.squadPhases[Math.min(reserveSquadIdx, reserveCl.squadPhases.length - 1)];

    let reserveColTheta;
    if (topology === 'shell' || topology === 'ring') {
      reserveColTheta = ((Math.atan2(rwz, rwx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
    } else if (topology === 'curtain') {
      reserveColTheta = (rwx / outer + 1) / 2;
    } else { // rectangle
      reserveColTheta = (rwx / rectW + 1) / 2;
    }

    const reserveYOff = reserveCl.yCenter;
    const base = c * nRows;
    reserveOrigYOff[i] = reserveYOff;
    for (let r = 0; r < nRows; r++) {
      const i4  = (base + r) * 4;
      colABuf[i4]     = rwx;
      colABuf[i4 + 1] = rwz;
      colBBuf[i4]     = reserveYOff;   // overwrite stale round-robin Y with cluster Y
      const idx = base + r;
      clusterHueBuf[idx]       = reserveCl.hue;
      clusterBrightBuf[idx]    = reserveCl.brightness;
      clusterSpeedBuf[idx]     = reserveCl.speed;
      clusterBurstSeedBuf[idx] = reserveCl.burstSeed;
      squadPhaseBuf[idx]       = reserveSquadPhase;
      spawnThetaBuf[idx]       = reserveColTheta;
    }
    // aClusterCenter for reserve columns: use nearest cluster centroid
    for (let r = 0; r < nRows; r++) {
      const i2 = (c * nRows + r) * 2;
      clusterCenterBuf[i2]     = clusterCenterX[nearestCluster];
      clusterCenterBuf[i2 + 1] = clusterCenterZ[nearestCluster];
    }
  }

  return {
    colABuf,
    colBBuf,
    rawSpeedBuf,
    biasedTrailBuf,
    clusterHueBuf,
    clusterBrightBuf,
    clusterSpeedBuf,
    clusterBurstSeedBuf,
    clusterCenterBuf,
    squadPhaseBuf,
    spawnThetaBuf,
    reserveStart,
    reserveOrigYOff,
    clusterThetas: clusters.map(cl => cl.theta),
    nClusters,
  };
}

// ── Instanced buffer geometry ─────────────────────────────────────────────
export function buildGeometry({
  speedMin       = 0.8,
  speedMax       = 4.0,
  trailMin       = 0.015,
  trailMax       = 0.050,
  nCols          = 600,
  topology       = 'shell',
  shellInner     = 3.5,
  shellOuter     = 8.0,
  rectW          = 8.0,
  rectH          = 8.0,
  clusterCount   = 12,
  clusterSpread  = 0.017,
  radialBias     = 0.0,
  clusterUniform = 0.0,
  clusterSpeedJitter = 0.18,
  clusterYSpread = 3.0,
  clusterRJitter = 0.20,
  squadSize      = 5,
  trailCohesion  = 0.7,
  spawnReserves  = 48,
  webglCompat    = false,
} = {}) {
  const arrays = buildClusterArrays({
    nCols, topology, shellInner, shellOuter, rectW, rectH,
    clusterCount, clusterSpread, radialBias, clusterUniform,
    clusterSpeedJitter, clusterYSpread, clusterRJitter,
    squadSize, trailCohesion, spawnReserves,
    speedMin, speedMax, trailMin, trailMax,
  });

  const {
    colABuf, colBBuf, rawSpeedBuf, biasedTrailBuf,
    clusterHueBuf, clusterBrightBuf, clusterSpeedBuf, clusterBurstSeedBuf,
    clusterCenterBuf, squadPhaseBuf, spawnThetaBuf,
    reserveStart, reserveOrigYOff,
  } = arrays;

  const geom = new THREE.InstancedBufferGeometry();
  const base = new THREE.PlaneGeometry(1, 1);
  geom.index = base.index.clone();
  geom.setAttribute('position', base.getAttribute('position').clone());
  geom.setAttribute('uv',       base.getAttribute('uv').clone());
  base.dispose();

  const total  = nCols * N_ROWS;
  const cellMetaBuf = new Float32Array(total * 4);
  for (let c = 0; c < nCols; c++) {
    for (let row = 0; row < N_ROWS; row++) {
      const idx   = c * N_ROWS + row;
      const i4    = idx * 4;
      cellMetaBuf[i4]     = c;
      cellMetaBuf[i4 + 1] = row;
      cellMetaBuf[i4 + 2] = 1.0;                  // aFrustumVis
      cellMetaBuf[i4 + 3] = spawnThetaBuf[idx];   // aSpawnTheta
    }
  }

  // aHeadOvershoot: per-column phase for overshoot pulse [0, 1], replicated per row
  const headOvershootBuf = new Float32Array(total);
  for (let c = 0; c < nCols; c++) {
    const ov = Math.random();
    for (let row = 0; row < N_ROWS; row++) headOvershootBuf[c * N_ROWS + row] = ov;
  }

  // aLockState: per-instance (lockY, lockGlyph, lockTime, spawnActive)
  const lockStateBuf = new Float32Array(total * 4);
  for (let i = 0; i < total; i++) {
    lockStateBuf[i * 4 + 0] = -9999;
    lockStateBuf[i * 4 + 1] = -1;
    lockStateBuf[i * 4 + 2] = 0;
    lockStateBuf[i * 4 + 3] = 0;
  }

  const cellMetaIBuf = new THREE.InstancedInterleavedBuffer(cellMetaBuf, 4);
  const clusterMetaBuf = new Float32Array(total * 4);
  for (let i = 0; i < total; i++) {
    const i4 = i * 4;
    clusterMetaBuf[i4]     = clusterHueBuf[i];
    clusterMetaBuf[i4 + 1] = clusterBrightBuf[i];
    clusterMetaBuf[i4 + 2] = clusterSpeedBuf[i];
    clusterMetaBuf[i4 + 3] = clusterBurstSeedBuf[i];
  }
  const clusterMetaIBuf = new THREE.InstancedInterleavedBuffer(clusterMetaBuf, 4);

  geom.setAttribute('aColIdx',           new THREE.InterleavedBufferAttribute(cellMetaIBuf,    1, 0));
  geom.setAttribute('aRowIdx',           new THREE.InterleavedBufferAttribute(cellMetaIBuf,    1, 1));
  geom.setAttribute('aFrustumVis',       new THREE.InterleavedBufferAttribute(cellMetaIBuf,    1, 2));
  geom.setAttribute('aSpawnTheta',       new THREE.InterleavedBufferAttribute(cellMetaIBuf,    1, 3));
  geom.setAttribute('aColA',             new THREE.InstancedBufferAttribute(colABuf,             4));
  geom.setAttribute('aColB',             new THREE.InstancedBufferAttribute(colBBuf,             4));
  geom.setAttribute('aClusterHue',       new THREE.InterleavedBufferAttribute(clusterMetaIBuf, 1, 0));
  geom.setAttribute('aClusterBright',    new THREE.InterleavedBufferAttribute(clusterMetaIBuf, 1, 1));
  geom.setAttribute('aClusterSpeed',     new THREE.InterleavedBufferAttribute(clusterMetaIBuf, 1, 2));
  geom.setAttribute('aClusterBurstSeed', new THREE.InterleavedBufferAttribute(clusterMetaIBuf, 1, 3));
  if (!webglCompat) geom.setAttribute('aClusterCenter', new THREE.InstancedBufferAttribute(clusterCenterBuf, 2));
  geom.setAttribute('aSquadPhase',       new THREE.InstancedBufferAttribute(squadPhaseBuf,       1));
  if (!webglCompat) geom.setAttribute('aHeadOvershoot', new THREE.InstancedBufferAttribute(headOvershootBuf, 1));
  geom.setAttribute('aLockState',        new THREE.InstancedBufferAttribute(lockStateBuf,        4));
  if (!webglCompat) geom.setAttribute('aFreezeUntil', new THREE.InstancedBufferAttribute(new Float32Array(total), 1));
  geom.instanceCount = total;
  geom._rawSpeed    = rawSpeedBuf;
  geom._biasedTrail = biasedTrailBuf;
  geom._reservePool = {
    reserveStart,
    free:     Array.from({ length: spawnReserves }, (_, i) => reserveStart + i),
    used:     new Set(),
    origYOff: reserveOrigYOff,
  };
  return geom;
}

// ═════════════════════════════════════════════════════════════════════════
// CAMERA CONTROLLER
// ═════════════════════════════════════════════════════════════════════════

/**
 * Autonomous camera animation controller.
 * Handles orbit and Lissajous flythrough modes with optional column-follow.
 * Pre-allocates frustum/matrix/sphere to avoid per-frame GC.
 */
export class CameraController {
  constructor(camera) {
    this._cam           = camera;
    this._mode          = 'none';   // 'none' | 'orbit' | 'fly'
    this._orbitTheta    = 0;
    this._orbitRadius   = 6;
    this._orbitSpeed    = 0.015;
    this._orbitElevDeg  = 0;
    this._flyPhase      = 0;   // raw seconds; drives heading oscillation
    this._flySpeed      = 0.008;
    // _flyRadius removed — _tickFly uses only _flySpeed/_flyPhase
    this._flyYaw        = 0;   // current integrated yaw (radians)
    this._flyPitch      = 0;   // current integrated pitch (radians)
    this._flyPos        = new THREE.Vector3();  // integrated world position
    this._columnFollow  = false;
    // Pre-allocated to avoid GC pressure during updateFrustumCull
    this._frustum          = new THREE.Frustum();
    this._projScreenMatrix = new THREE.Matrix4();
    this._testSphere       = new THREE.Sphere(new THREE.Vector3(), 0);
  }

  setMode(mode) { this._mode = mode; }

  /**
   * Advance the camera by dt seconds.
   * @param {number} dt  elapsed seconds
   */
  tick(dt) {
    if (this._mode === 'orbit') this._tickOrbit(dt);
    else if (this._mode === 'fly')  this._tickFly(dt);
  }

  _tickOrbit(dt) {
    this._orbitTheta += this._orbitSpeed * Math.PI * 2 * dt;
    const elevRad = this._orbitElevDeg * (Math.PI / 180);
    const r = this._orbitRadius;
    this._cam.position.set(
      r * Math.cos(elevRad) * Math.sin(this._orbitTheta),
      r * Math.sin(elevRad),
      r * Math.cos(elevRad) * Math.cos(this._orbitTheta),
    );
    this._cam.lookAt(0, 0, 0);
    this._cam.updateProjectionMatrix();
  }

  _tickFly(dt) {
    // Phase accumulates as raw wall-clock seconds — heading oscillation is independent of speed
    this._flyPhase += dt;
    const t = this._flyPhase;

    // Target yaw/pitch: slow sinusoidal banking — gentle S-curves and vertical drift
    const targetYaw   = Math.sin(t * 0.25) * (Math.PI / 5);  // ±36°, ~25 s half-period
    const targetPitch = Math.sin(t * 0.37) * 0.18;            // ±10°, ~17 s half-period

    // Lag filter — heading changes feel like banking, not snapping
    const lag = Math.min(1.0, 2.5 * dt);
    this._flyYaw   += (targetYaw   - this._flyYaw)   * lag;
    this._flyPitch += (targetPitch - this._flyPitch) * lag;

    // Forward unit vector from yaw/pitch
    const cp = Math.cos(this._flyPitch), sp = Math.sin(this._flyPitch);
    const cy = Math.cos(this._flyYaw),   sy = Math.sin(this._flyYaw);
    const fx = sy * cp, fy = sp, fz = cy * cp;

    // Integrate position; flySpeed slider controls world-units/s directly
    const spd = this._flySpeed * 150;   // default 0.008 → 1.2 wu/s
    this._flyPos.x += fx * spd * dt;
    this._flyPos.y += fy * spd * dt;
    this._flyPos.z += fz * spd * dt;

    this._cam.position.copy(this._flyPos);
    this._cam.lookAt(
      this._flyPos.x + fx,
      this._flyPos.y + fy,
      this._flyPos.z + fz,
    );
    this._cam.updateProjectionMatrix();
  }

  /**
   * Update the aFrustumVis per-instance attribute based on the current camera frustum.
   * Columns whose representative sphere intersects the frustum get vis=1, others vis=0.
   * @param {THREE.Mesh}    mesh          the instanced glyph mesh
   * @param {THREE.Vector2} columnOffset  current XZ offset applied to column world positions
   * @param {number}        nCols         number of columns (e.g. 600)
   */
  updateFrustumCull(mesh, columnOffset, nCols) {
    this._projScreenMatrix.multiplyMatrices(
      this._cam.projectionMatrix,
      this._cam.matrixWorldInverse,
    );
    this._frustum.setFromProjectionMatrix(this._projScreenMatrix);

    const attr   = mesh.geometry.getAttribute('aFrustumVis');
    if (!attr) return;
    const colA   = mesh.geometry.getAttribute('aColA');
    if (!colA) return;
    const nRows  = attr.count / nCols;   // e.g. 72000 / 600 = 120
    const sphere = this._testSphere;
    sphere.radius = 8;  // large enough to cover a full column height and trail

    // Direct typed-array access for performance (avoids 72k getter calls)
    const colAArr = colA.array;   // Float32Array, itemSize=4: wx, wz, speed, seed per instance
    const visArr  = attr.isInterleavedBufferAttribute ? attr.data.array : attr.array;
    const visStride = attr.isInterleavedBufferAttribute ? attr.data.stride : attr.itemSize;
    const visOffset = attr.isInterleavedBufferAttribute ? attr.offset : 0;

    for (let c = 0; c < nCols; c++) {
      // aColA entries are ordered col0_row0, col0_row1, ..., col0_rowN, col1_row0, ...
      // so column c's first instance is at flat index c * nRows, offset by itemSize=4
      const flatBase = c * nRows * 4;
      const wx = colAArr[flatBase    ] + columnOffset.x;
      const wz = colAArr[flatBase + 1] + columnOffset.y;
      sphere.center.set(wx, 0, wz);
      const vis = this._frustum.intersectsSphere(sphere) ? 1.0 : 0.0;
      const start = c * nRows;
      const end = start + nRows;
      for (let i = start; i < end; i++) visArr[i * visStride + visOffset] = vis;
    }
    if (attr.isInterleavedBufferAttribute) attr.data.needsUpdate = true;
    else attr.needsUpdate = true;
  }
}
