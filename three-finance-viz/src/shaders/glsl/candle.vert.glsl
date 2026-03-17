/* src/shaders/glsl/candle.vert.glsl
 *
 * Three.js built-in shader chunks used here (verified against r160+):
 *   #include <instanced_pars_vertex>  — declares instanceMatrix (mat4) and
 *                                       instanceColor (vec3) attributes
 *   #include <instanced_vertex>       — multiplies position by instanceMatrix
 *
 * These chunk names are stable since Three.js r128.
 */
#include <instanced_pars_vertex>

varying vec3 vColor;

void main() {
  #include <instanced_vertex>
  vColor      = instanceColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
