import { Being } from '../modules/being';

export function isBlock(being: Being) {
  const { block_rate } = being;
  return Math.random() < block_rate / 100;
}
