import { Being } from '../modules/being';

export function isBlock(being: Being) {
  const { block_rate, max_block_rate } = being;
  return Math.random() < Math.min(block_rate, max_block_rate) / 100;
}

export function computeBlockDamageMulti(being: Being) {
  const { block_dmg_rate } = being;
  return block_dmg_rate / 100;
}
