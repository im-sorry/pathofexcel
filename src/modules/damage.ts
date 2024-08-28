export interface EffectiveDamage {
  physical: number;
  electric: number;
  fire: number;
  frost: number;
  poison: number;
}

export function computeEffectiveDamage(
  damage: [number, number, number]
): number {
  const [min, max, rate] = damage;
  return Math.floor(Math.random() * (max - min + 1) + min) * rate;
}
