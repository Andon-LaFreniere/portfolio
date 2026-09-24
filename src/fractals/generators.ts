type Point = [number, number, number];

function rng(seed: number) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
}

function chaosGame(vertices: Point[], count: number, seed: number, scale = 1): Float32Array {
  const random = rng(seed);
  const output = new Float32Array(count * 3);
  let point: Point = [0, 0, 0];
  for (let index = 0; index < count; index += 1) {
    const vertex = vertices[Math.floor(random() * vertices.length)];
    point = [(point[0] + vertex[0]) / 2, (point[1] + vertex[1]) / 2, (point[2] + vertex[2]) / 2];
    output[index * 3] = point[0] * scale;
    output[index * 3 + 1] = point[1] * scale;
    output[index * 3 + 2] = point[2] * scale;
  }
  return output;
}

function cubeVertices(): Point[] {
  return [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as Point)));
}

const tetrahedronVertices = (): Point[] => [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
const octahedronVertices = (): Point[] => [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const spongeVertices = (): Point[] => cubeVertices().filter((point) => Math.abs(point[0] + point[1] + point[2]) > 0);
const jerusalemVertices = (): Point[] => cubeVertices().map(([x, y, z]) => [x * 0.92 + y * 0.18, y * 0.92 + z * 0.18, z * 0.92 + x * 0.18]);

export function generateFractals(count: number): Float32Array[] {
  return [chaosGame(tetrahedronVertices(), count, 11, 1.65), chaosGame(spongeVertices(), count, 29, 1.35), chaosGame(octahedronVertices(), count, 47, 1.9), chaosGame(jerusalemVertices(), count, 71, 1.45)];
}