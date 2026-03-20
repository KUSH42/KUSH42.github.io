import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineSegments2 }        from 'three/addons/lines/LineSegments2.js';
import { LineMaterial }         from 'three/addons/lines/LineMaterial.js';
import { getScene, getRevealAnim } from '../../components/threat-map/index.js';

export function buildGlobeOverlay(threatEl) {
  const scene = getScene(threatEl);
  if (!scene) return;
  const WR = 1.002; // just above globe surface (GLOBE_RADIUS = 1.0)

  // ── Lat/lon grid ──────────────────────────────────────────────
  const latlonMat = new THREE.LineBasicMaterial({
    color: 0x00ffcc, transparent: true, opacity: 0.18,
    blending: THREE.AdditiveBlending, depthTest: true, depthWrite: false,
  });
  const globeLatLon = new THREE.Group();
  const LAT = 10, LON = 20, SEGS = 64;
  for (let i = 1; i < LAT; i++) {
    const phi = (i / LAT) * Math.PI;
    const y   = WR * Math.cos(phi), sr = WR * Math.sin(phi);
    const pts = [];
    for (let j = 0; j <= SEGS; j++) {
      const t = (j / SEGS) * Math.PI * 2;
      pts.push(new THREE.Vector3(sr * Math.cos(t), y, sr * Math.sin(t)));
    }
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), latlonMat);
    ring.renderOrder = 3;
    globeLatLon.add(ring);
  }
  for (let j = 0; j < LON; j++) {
    const t = (j / LON) * Math.PI * 2;
    const pts = [];
    for (let i = 0; i <= SEGS; i++) {
      const phi = (i / SEGS) * Math.PI;
      pts.push(new THREE.Vector3(WR * Math.sin(phi) * Math.cos(t), WR * Math.cos(phi), WR * Math.sin(phi) * Math.sin(t)));
    }
    const meridian = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), latlonMat);
    meridian.renderOrder = 3;
    globeLatLon.add(meridian);
  }
  globeLatLon.visible = false;
  scene.add(globeLatLon);

  // ── Geodesic wireframe ────────────────────────────────────────
  function buildGeodesicArcPositions(radius, detail, edgeSegs) {
    const geo = new THREE.IcosahedronGeometry(1, detail);
    const pos = geo.attributes.position;
    const triCount = pos.count / 3;
    const va = new THREE.Vector3(), vb = new THREE.Vector3();
    const edgeSet = new Map();
    for (let t = 0; t < triCount; t++) {
      const base = t * 3;
      for (let e = 0; e < 3; e++) {
        const ai = base + e, bi = base + (e + 1) % 3;
        va.fromBufferAttribute(pos, ai); vb.fromBufferAttribute(pos, bi);
        const key = [va, vb].map(v => `${v.x.toFixed(5)},${v.y.toFixed(5)},${v.z.toFixed(5)}`).sort().join('|');
        if (!edgeSet.has(key)) edgeSet.set(key, [va.clone(), vb.clone()]);
      }
    }
    const out = [];
    for (const [pa, pb] of edgeSet.values()) {
      for (let s = 0; s < edgeSegs; s++) {
        const p0 = new THREE.Vector3().lerpVectors(pa, pb, s / edgeSegs).normalize().multiplyScalar(radius);
        const p1 = new THREE.Vector3().lerpVectors(pa, pb, (s + 1) / edgeSegs).normalize().multiplyScalar(radius);
        out.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
    }
    return new Float32Array(out);
  }

  const icoGeo = new LineSegmentsGeometry();
  icoGeo.setPositions(buildGeodesicArcPositions(WR, 3, 4));
  const icoMat = new LineMaterial({
    color: 0x00ffcc, transparent: true, opacity: 0.22,
    blending: THREE.AdditiveBlending, depthTest: true, depthWrite: false,
    linewidth: 1.0, resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  });
  const globeWireframe = new LineSegments2(icoGeo, icoMat);
  globeWireframe.renderOrder = 3;
  globeWireframe.visible = false;
  scene.add(globeWireframe);

  window.addEventListener('resize', () => icoMat.resolution.set(window.innerWidth, window.innerHeight));

  document.getElementById('rr-globe').addEventListener('change', e => {
    const v = e.target.value;
    globeLatLon.visible   = v === 'latlon';
    globeWireframe.visible = v === 'wire';
  });
}
