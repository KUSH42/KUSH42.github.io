// src/renderer/buildWebGPUPipeline.ts
// WebGPU-only pipeline using TSL node materials
// This file is only executed on the WebGPU path

import * as THREE from 'three';

// These imports are only valid when three/tsl and addons are present
// They are imported dynamically in PostProcessingPipeline.ts

export function buildWebGPUPipeline(
  renderer: THREE.WebGLRenderer & { renderAsync?(node: unknown): void },
  _scene: THREE.Scene,
  _camera: THREE.PerspectiveCamera,
): { finalNode: unknown; bloomNode: unknown; dofNode: unknown } {
  void renderer; // used by caller
  // Stub: real implementation requires three/tsl and TSL addons
  // In production, this would use:
  //   import { pass } from 'three/tsl';
  //   import { bloom } from 'three/addons/tsl/display/BloomNode.js';
  //   import { depthOfField } from 'three/addons/tsl/display/DepthOfFieldNode.js';
  //   import { chromaticAberration } from 'three/addons/tsl/display/ChromaticAberrationNode.js';
  // and build a node graph.
  return { finalNode: null, bloomNode: null, dofNode: null };
}
