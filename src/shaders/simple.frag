precision mediump float; 
uniform float time;

void main() {
  gl_FragColor = vec4(abs(sin(time)), 0.0, 0.0, 1.0);
}
