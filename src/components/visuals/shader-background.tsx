import { useEffect, useRef } from "react";

/**
 * Fundo animado em WebGL: um "mesh gradient" fluido feito de blobs de cor que
 * se movem e se misturam (estilo Stripe/Linear). Reage suavemente ao mouse.
 * Sem dependências externas — shader cru. Respeita prefers-reduced-motion.
 */

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// blob de cor gaussiano
vec3 blob(vec2 p, vec2 c, vec3 col, float s) {
  float d = length(p - c);
  return col * exp(-d * d * s);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
  float t = u_time * 0.12;

  vec3 col = vec3(0.0);

  // blobs flutuando
  col += blob(uv, vec2(sin(t * 0.9) * 0.6, cos(t * 0.7) * 0.4),       vec3(0.55, 0.20, 0.95), 2.2);  // violeta
  col += blob(uv, vec2(cos(t * 0.6) * 0.7, sin(t * 1.1) * 0.5 + 0.1), vec3(0.95, 0.30, 0.75), 2.6);  // fuchsia
  col += blob(uv, vec2(sin(t * 1.3 + 2.0) * 0.5, cos(t * 0.5) * 0.6 - 0.2), vec3(0.20, 0.55, 0.98), 2.4); // azul
  col += blob(uv, vec2(cos(t * 0.8 + 4.0) * 0.8, sin(t * 0.9 + 1.0) * 0.45), vec3(0.15, 0.85, 0.90), 3.0); // ciano
  col += blob(uv, vec2(sin(t * 0.4) * 0.3, cos(t * 0.6 + 3.0) * 0.7), vec3(0.45, 0.15, 0.85), 2.8); // indigo

  // blob seguindo o mouse
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0) * 2.0;
  col += blob(uv, m, vec3(0.85, 0.45, 1.0), 3.5) * 0.6;

  // tom escuro de base + leve realce
  col = col * 0.9;
  col = pow(col, vec3(0.85));

  // vinheta
  float vig = smoothstep(1.3, 0.2, length(uv));
  col *= vig;

  // grain sutil
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      const time = reduce ? 8 : (performance.now() - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full opacity-70"
    />
  );
}
