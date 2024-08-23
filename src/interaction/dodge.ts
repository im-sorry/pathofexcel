import { Being } from '../modules/being';

// 当命中值超过4000时，理论命中率是100%，当闪避值在0-10000时，

export function isDodge(from: Being, to: Being) {
  const { dodge_value } = to;
  const dodgeValue = (100 + dodge_value * (1 + from.agileness / 100)) / 100;
  return Math.random() < dodgeValue / 100;
}
