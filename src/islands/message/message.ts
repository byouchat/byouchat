export function generatePosition(): [x: number, y: number] {
  const areaWidth = globalThis.document.documentElement.clientWidth * 0.8;
  const areaHeight = globalThis.document.documentElement.clientHeight * 0.8;
  const x = areaWidth * (Math.random() + 0.05);
  const y = areaHeight * (Math.random() + 0.05);
  return [x, y];
}
