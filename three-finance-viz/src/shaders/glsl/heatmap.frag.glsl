/* src/shaders/glsl/heatmap.frag.glsl */
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
varying float vNormValue;

void main() {
  vec3 color = mix(uColorLow, uColorHigh, vNormValue);
  gl_FragColor = vec4(color, 0.8);
}
