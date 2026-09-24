import * as THREE from "three";
import { generateFractals } from "./fractals/generators";

const vertexShader = `
  uniform float uMorph;
  uniform float uTime;
  attribute vec3 aPositionA;
  attribute vec3 aPositionB;
  varying float vDepth;
  void main() {
    vec3 position = mix(aPositionA, aPositionB, smoothstep(0.0, 1.0, uMorph));
    float x = position.x * cos(uTime * 0.045) - position.z * sin(uTime * 0.045);
    float z = position.x * sin(uTime * 0.045) + position.z * cos(uTime * 0.045);
    position.x = x;
    position.z = z;
    position.y += sin(uTime * 0.16) * 0.05;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = max(1.1, 3.0 * (1.0 / -mvPosition.z));
    vDepth = clamp(1.25 + mvPosition.z * 0.08, 0.18, 1.0);
  }
`;

const fragmentShader = `
  varying float vDepth;
  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.08, distanceFromCenter) * vDepth;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(0.302, 0.882, 1.0, alpha * 0.72);
  }
`;

export function createScene(canvas: HTMLCanvasElement, fallback: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch { fallback.hidden = false; canvas.hidden = true; return () => undefined; }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 7.2;
  const count = window.innerWidth < 600 ? 15000 : 40000;
  const shapes = generateFractals(count);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));
  geometry.setAttribute("aPositionA", new THREE.BufferAttribute(shapes[0], 3));
  geometry.setAttribute("aPositionB", new THREE.BufferAttribute(shapes[1], 3));
  const material = new THREE.ShaderMaterial({ uniforms: { uMorph: { value: 0 }, uTime: { value: 0 } }, vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  const resize = () => { renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(window.innerWidth, window.innerHeight, false); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); };
  resize();
  window.addEventListener("resize", resize);
  let animation = 0;
  let activeShape = 0;
  const render = (now: number) => {
    if (!document.hidden) {
      const cycle = (reducedMotion ? 0 : now / 1000) % 8.5;
      const shapeIndex = Math.floor((now / 1000) / 8.5) % shapes.length;
      material.uniforms.uTime.value = reducedMotion ? 0 : now / 1000;
      material.uniforms.uMorph.value = reducedMotion ? 0 : Math.min(1, Math.max(0, (cycle - 6) / 2.5));
      if (!reducedMotion && shapeIndex !== activeShape) {
        activeShape = shapeIndex;
        const next = (shapeIndex + 1) % shapes.length;
        geometry.setAttribute("aPositionA", new THREE.BufferAttribute(shapes[shapeIndex], 3));
        geometry.setAttribute("aPositionB", new THREE.BufferAttribute(shapes[next], 3));
      }
      camera.position.x += ((Math.sin(now * 0.00013) * 0.28) - camera.position.x) * 0.01;
      camera.position.y += ((Math.cos(now * 0.00017) * 0.16) - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animation = requestAnimationFrame(render);
  };
  animation = requestAnimationFrame(render);
  return () => { cancelAnimationFrame(animation); window.removeEventListener("resize", resize); geometry.dispose(); material.dispose(); renderer.dispose(); };
}