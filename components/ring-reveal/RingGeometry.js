/**
 * Builds a single BufferGeometry containing all latitude rings packed into one draw call.
 */

import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';

/**
 * @param {object} opts
 * @param {number} opts.radius
 * @param {number} opts.numRings
 * @param {number} opts.samplesPerRing
 * @param {number} opts.latitudeMin  - radians
 * @param {number} opts.latitudeMax  - radians
 * @param {'y'|'z'} opts.upAxis
 * @returns {THREE.BufferGeometry}
 */
export function buildRingGeometry({ radius, numRings, samplesPerRing, latitudeMin, latitudeMax, upAxis }) {
  const totalVerts = numRings * samplesPerRing;

  const positions   = new Float32Array(totalVerts * 3);
  const ringIndices = new Float32Array(totalVerts);
  const arcPositions = new Float32Array(totalVerts);
  // Each ring: samplesPerRing segments, each segment = 2 indices → close the loop
  const indexCount = numRings * samplesPerRing * 2;
  const indices    = new Uint32Array(indexCount);

  let pIdx = 0;
  let iIdx = 0;

  const _sinMin = Math.sin(latitudeMin);
  const _sinMax = Math.sin(latitudeMax);
  for (let r = 0; r < numRings; r++) {
    const sinPhi = _sinMin + (r / numRings) * (_sinMax - _sinMin);
    const cosPhi = Math.sqrt(Math.max(0, 1 - sinPhi * sinPhi));

    const baseVert = r * samplesPerRing;

    for (let s = 0; s < samplesPerRing; s++) {
      const lambda = (s / samplesPerRing) * 2 * Math.PI;
      positions[pIdx++] = radius * cosPhi * Math.cos(lambda); // x
      positions[pIdx++] = radius * sinPhi;                     // y
      positions[pIdx++] = radius * cosPhi * Math.sin(lambda); // z

      ringIndices[baseVert + s]  = r;
      arcPositions[baseVert + s] = s / samplesPerRing;

      // Segment: vertex s → vertex (s+1) % samplesPerRing (closed loop)
      indices[iIdx++] = baseVert + s;
      indices[iIdx++] = baseVert + (s + 1) % samplesPerRing;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position',    new THREE.BufferAttribute(positions,   3));
  geo.setAttribute('ringIndex',   new THREE.BufferAttribute(ringIndices, 1));
  geo.setAttribute('arcPosition', new THREE.BufferAttribute(arcPositions, 1));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));

  if (upAxis === 'z') {
    geo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  }

  return geo;
}

/**
 * Build a LineSegmentsGeometry for use with LineSegments2 / LineMaterial.
 * Each ring segment is stored as an independent start→end pair in the instance buffer.
 * @param {object} opts
 * @param {number} opts.radius
 * @param {number} opts.numRings
 * @param {number} opts.samplesPerRing
 * @param {number} opts.latitudeMin  - radians
 * @param {number} opts.latitudeMax  - radians
 * @param {'y'|'z'} opts.upAxis
 * @param {'latitude'|'longitude'} [opts.mode]  - ring orientation
 * @returns {LineSegmentsGeometry}
 */
export function buildLine2RingGeometry({ radius, numRings, samplesPerRing, latitudeMin, latitudeMax, upAxis, mode = 'latitude' }) {
  const totalSegments = numRings * samplesPerRing;
  // LineSegmentsGeometry.setPositions expects [startX,startY,startZ, endX,endY,endZ, ...]
  const positions    = new Float32Array(totalSegments * 6);
  const ringIndices  = new Float32Array(totalSegments);
  const arcPositions = new Float32Array(totalSegments);

  let pIdx = 0;
  let rIdx = 0;

  if (mode === 'longitude') {
    // Parallel vertical circles in planes X=const, evenly spaced across the sphere.
    // Space rings linearly in X (i.e. sin(theta)) for equal on-screen separation.
    const sinMin = Math.sin(latitudeMin);
    const sinMax = Math.sin(latitudeMax);
    for (let r = 0; r < numRings; r++) {
      const sinT = sinMin + (r / numRings) * (sinMax - sinMin);
      const cosT = Math.sqrt(Math.max(0, 1 - sinT * sinT));

      for (let s = 0; s < samplesPerRing; s++) {
        const psiA = (s / samplesPerRing) * 2 * Math.PI;
        const psiB = ((s + 1) / samplesPerRing) * 2 * Math.PI;

        // Circle in the YZ plane, offset to x = radius * sinT
        positions[pIdx++] = radius * sinT;
        positions[pIdx++] = radius * cosT * Math.cos(psiA);
        positions[pIdx++] = radius * cosT * Math.sin(psiA);

        positions[pIdx++] = radius * sinT;
        positions[pIdx++] = radius * cosT * Math.cos(psiB);
        positions[pIdx++] = radius * cosT * Math.sin(psiB);

        ringIndices[rIdx]  = r;
        arcPositions[rIdx] = s / samplesPerRing;
        rIdx++;
      }
    }
  } else {
    // Default: latitude rings — horizontal circles, spaced linearly in Y (sin phi)
    // for equal on-screen separation. Evenly-spaced angles bunch near the poles.
    const sinMin = Math.sin(latitudeMin);
    const sinMax = Math.sin(latitudeMax);
    for (let r = 0; r < numRings; r++) {
      const sinPhi = sinMin + (r / numRings) * (sinMax - sinMin);
      const cosPhi = Math.sqrt(Math.max(0, 1 - sinPhi * sinPhi));

      for (let s = 0; s < samplesPerRing; s++) {
        const lambdaA = (s / samplesPerRing) * 2 * Math.PI;
        const lambdaB = ((s + 1) / samplesPerRing) * 2 * Math.PI; // closed loop wraps

        positions[pIdx++] = radius * cosPhi * Math.cos(lambdaA);
        positions[pIdx++] = radius * sinPhi;
        positions[pIdx++] = radius * cosPhi * Math.sin(lambdaA);

        positions[pIdx++] = radius * cosPhi * Math.cos(lambdaB);
        positions[pIdx++] = radius * sinPhi;
        positions[pIdx++] = radius * cosPhi * Math.sin(lambdaB);

        ringIndices[rIdx]  = r;
        arcPositions[rIdx] = s / samplesPerRing;
        rIdx++;
      }
    }
  }

  const geo = new LineSegmentsGeometry();
  geo.setPositions(positions);
  // Per-segment (instanced) attributes — stepped once per instance, not per vertex
  geo.setAttribute('ringIndex',   new THREE.InstancedBufferAttribute(ringIndices,  1));
  geo.setAttribute('arcPosition', new THREE.InstancedBufferAttribute(arcPositions, 1));

  if (upAxis === 'z') {
    geo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  }

  return geo;
}
