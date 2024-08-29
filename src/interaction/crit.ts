import { Being } from '../modules/being';
import { random } from '../utils/math';

export function isCrit(being: Being) {
  const { crit_rate, base_crit_rate, agileness } = being;
  const realCritRate =
    (base_crit_rate * (1 + (crit_rate + agileness * 5) / 100)) / 100;
  return random() < realCritRate;
}
