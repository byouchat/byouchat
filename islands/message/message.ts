export function generatePosition(): [x: number, y: number] {
  const areaWidth = globalThis.innerWidth;
  const areaHeight = globalThis.innerHeight * 0.88;
  const pixel = Math.random() * areaHeight * areaWidth - 1;
  const x = (pixel % areaWidth) + globalThis.innerWidth * 0.025;
  const y = pixel / areaWidth;
  return [x, y];
}
