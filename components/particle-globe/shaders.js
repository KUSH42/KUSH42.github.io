/**
 * GLSL shader sources for the particle-globe particle system.
 */

/**
 * Vertex shader — perspective-correct point sizing with per-particle color.
 * @type {string}
 */
export const particleVertexShader = /* glsl */`
attribute float size;
attribute vec4  color;
varying   vec4  vColor;

void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);

  // Depth cue: back-hemisphere particles are dimmer, front stays full bright.
  // Camera at z=3, globe radius 1.  Front: -mvPos.z~2, back: -mvPos.z~4.
  // Map that range to alpha [1.0 → 0.35].
  float depth  = clamp((-mvPos.z - 1.8) / 2.4, 0.0, 1.0);
  float depthA = mix(1.0, 0.35, depth);

  vColor      = vec4(color.rgb, color.a * depthA);
  gl_PointSize = size * (3.0 / -mvPos.z);
  gl_Position  = projectionMatrix * mvPos;
}
`;

/**
 * Fragment shader — soft circular sprite with premultiplied alpha.
 * Discards fragments outside the unit circle to produce a round particle.
 * @type {string}
 */
export const particleFragmentShader = /* glsl */`
varying vec4 vColor;
void main() {
  vec2  uv   = gl_PointCoord * 2.0 - 1.0;
  float dist = dot(uv, uv);
  if (dist > 1.0) discard;
  float alpha = (1.0 - dist) * vColor.a;
  gl_FragColor = vec4(vColor.rgb * alpha, alpha);
}
`;
