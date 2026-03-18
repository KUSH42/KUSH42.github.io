/**
 * Geographic outline rendering (TopoJSON coastlines + borders) for the threat-map globe.
 */

import * as THREE from 'three';
import { mesh as topoMesh } from 'topojson-client';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { _state, setTopoCache } from './state.js';
import { latLngToVec3 } from './utils.js';

// ── _ringsToSegments ──────────────────────────────────────────
// Convert an array of polygon rings (each a [[lng,lat]...] array) into a
// single merged LineSegmentsGeometry for use with LineSegments2.
// Each consecutive pair of ring vertices becomes one segment.

function _ringsToSegments(coordsList, radius) {
  const verts = [];
  for (const coords of coordsList) {
    for (let i = 0; i < coords.length - 1; i++) {
      const [lng0, lat0] = coords[i];
      const [lng1, lat1] = coords[i + 1];
      const p0 = latLngToVec3(lat0, lng0, radius);
      const p1 = latLngToVec3(lat1, lng1, radius);
      verts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
    }
  }
  const geo = new LineSegmentsGeometry();
  geo.setPositions(new Float32Array(verts));
  return geo;
}

// ── _loadGeoLines ─────────────────────────────────────────────

/**
 * Fetch countries-110m.json and draw land outline + country border lines on the globe.
 * Called async after initThreatMap — failure is non-fatal (warns to console).
 */
export async function _loadGeoLines(element) {
  let topo;
  try {
    const res = await fetch('/data/countries-110m.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    topo = await res.json();
    setTopoCache(topo);
  } catch (err) {
    console.warn('[s9-threatmap] geo lines: failed to load /data/countries-110m.json', err);
    return;
  }

  const state = _state.get(element);
  if (!state) return; // destroyed during fetch

  const w = element.clientWidth || 800;
  const h = element.clientHeight || 600;

  const geoGroup = new THREE.Group();
  const lineColor = state.cyanColor;

  // ── Coastlines / land outline ─────────────────────────────
  const landBorders = topoMesh(topo, topo.objects.land);

  const coastMat = new LineMaterial({
    color: lineColor, linewidth: 1,
    transparent: true, opacity: 1.0, depthWrite: true,
  });
  coastMat.resolution.set(w, h);

  const coastGlowMat = new LineMaterial({
    color: lineColor, linewidth: 1,
    transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: true,
  });
  coastGlowMat.resolution.set(w, h);

  const coastGlowWideMat = new LineMaterial({
    color: lineColor, linewidth: 1.5,
    transparent: true, opacity: 0.70,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  coastGlowWideMat.resolution.set(w, h);

  const coastLine     = new LineSegments2(_ringsToSegments(landBorders.coordinates, 1.002), coastMat);
  const coastGlow     = new LineSegments2(_ringsToSegments(landBorders.coordinates, 1.006), coastGlowMat);
  const coastWideGlow = new LineSegments2(_ringsToSegments(landBorders.coordinates, 1.011), coastGlowWideMat);
  coastLine.userData.geoType = coastGlow.userData.geoType = coastWideGlow.userData.geoType = 'coast';
  geoGroup.add(coastWideGlow, coastGlow, coastLine);

  // ── Interior country borders (dimmer) ─────────────────────
  const countryBorders = topoMesh(topo, topo.objects.countries, (a, b) => a !== b);

  const borderMat = new LineMaterial({
    color: lineColor, linewidth: 1,
    transparent: true, opacity: 0.55, depthWrite: true,
  });
  borderMat.resolution.set(w, h);

  const borderGlowMat = new LineMaterial({
    color: lineColor, linewidth: 1,
    transparent: true, opacity: 0.30,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  borderGlowMat.resolution.set(w, h);

  const borderLine = new LineSegments2(_ringsToSegments(countryBorders.coordinates, 1.012), borderMat);
  const borderGlow = new LineSegments2(_ringsToSegments(countryBorders.coordinates, 1.022), borderGlowMat);
  borderLine.userData.geoType = borderGlow.userData.geoType = 'border';
  geoGroup.add(borderGlow, borderLine);

  state.scene.add(geoGroup);
  // If satellite mode was enabled before geo lines finished loading, keep them hidden
  if (state.satelliteMode) geoGroup.visible = false;
  state.geoGroup = geoGroup;
  state.geoLineMats = [coastMat, coastGlowMat, coastGlowWideMat, borderMat, borderGlowMat];
}
