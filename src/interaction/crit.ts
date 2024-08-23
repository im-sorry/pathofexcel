import { Being } from '../modules/being';

export function isCrit(being: Being) {
  const { crit_rate, base_crit_rate } = being;
  const realCritRate = (base_crit_rate * (1 + crit_rate / 100)) / 100;
  return Math.random() < realCritRate;
}
