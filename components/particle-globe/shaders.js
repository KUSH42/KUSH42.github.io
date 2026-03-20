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
  vColor      = color;
  vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
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
