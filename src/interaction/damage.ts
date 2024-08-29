import { random } from '../utils/math';
import { Being } from '../modules/being';
import { isCrit } from './crit';

export interface EffectiveDamage {
  physical: number;
  electric: number;
  fire: number;
  frost: number;
  poison: number;
}

export function computeEffectiveDamage(
  damage: [number, number, number],
  damage_increase_rate: number
): number {
  let [min, max, rate] = damage;
  min = min || 0;
  max = max || 0;
  rate = rate || 0;
  return Math.floor(
    (random() * (max - min) + min) * (1 + (rate + damage_increase_rate) / 100)
  );
}

export function computeDamage(being: Being): EffectiveDamage {
  const isCritted = isCrit(being);
  let muti = 1;
  if (isCritted) {
    const { crit_dmg_increase } = being;
    muti = crit_dmg_increase / 100;
  }
  const { damage_increase_rate } = being;
  const physical_damage = computeEffectiveDamage(
    being.physical_damage,
    damage_increase_rate
  );
  const electric_damage = computeEffectiveDamage(
    being.electric_damage,
    damage_increase_rate
  );
  const fire_damage = computeEffectiveDamage(
    being.fire_damage,
    damage_increase_rate
  );
  const frost_damage = computeEffectiveDamage(
    being.frost_damage,
    damage_increase_rate
  );
  const poison_damage = computeEffectiveDamage(
    being.poison_damage,
    damage_increase_rate
  );
  return {
    physical: physical_damage * muti,
    electric: electric_damage * muti,
    fire: fire_damage * muti,
    frost: frost_damage * muti,
    poison: poison_damage * muti,
  };
}
