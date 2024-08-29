export function random() {
  const random = Math.random();
  if (random < 0.01) return 0;
  if (random > 0.9) return 1;
  return random;
}
