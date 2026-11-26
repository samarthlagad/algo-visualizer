export function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 96) + 5);
}