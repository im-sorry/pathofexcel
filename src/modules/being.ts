import { computeBlockDamageMulti, isBlock } from '../interaction/block';
import {
  computeDamage,
  computeEffectiveDamage,
  EffectiveDamage,
} from '../interaction/damage';
import { Timeline } from '../interaction/timeline';
import { Scene } from './scene';

export interface IBeing {
  life: number;
  energy_shield?: number;

  // 物理伤害
  physical_damage: [number, number, number];
  // 闪电伤害
  electric_damage?: [number, number, number];
  // 火焰伤害
  fire_damage?: [number, number, number];
  // 冰霜伤害
  frost_damage?: [number, number, number];
  // 毒素伤害
  poison_damage?: [number, number, number];

  strength: number;
  agileness: number;
  intelligence: number;

  level: number;
  exp: number;

  name: string;

  base_crit_rate: number;

  attack_speed: number;
  action_duration: number;

  block_rate: number;

  dodge_value: number;
  hit_value: number;
}

export class Being {
  life: number;
  max_life: number;
  add_life: number;
  init_life: number;
  life_increase_rate: number;

  energy_shield: number;

  strength: number;
  agileness: number;
  intelligence: number;

  physical_damage: [number, number, number];
  electric_damage: [number, number, number];
  fire_damage: [number, number, number];
  frost_damage: [number, number, number];
  poison_damage: [number, number, number];

  damage_increase_rate: number;

  level: number;
  exp: number;

  name: string;

  base_crit_rate: number;
  crit_rate: number;
  crit_dmg_increase: number;

  attack_speed: number;
  action_duration: number;

  max_block_rate: number;
  block_rate: number;
  block_dmg_rate: number;

  dodge_value: number;
  hit_value: number;

  act_end: number;

  enemy: Being | undefined;

  scene: Scene | null = null;

  isPlayer: boolean = false;

  constructor(being: IBeing, isPlayer = false) {
    this.life = 0;
    this.init_life = being.life;
    this.max_life = 0;
    this.add_life = 0;
    this.life_increase_rate = 0;

    this.energy_shield = being.energy_shield || 0;

    this.strength = being.strength;
    this.agileness = being.agileness;
    this.intelligence = being.intelligence;

    this.physical_damage = being.physical_damage;
    this.electric_damage = being.electric_damage || [0, 0, 0];
    this.fire_damage = being.fire_damage || [0, 0, 0];
    this.frost_damage = being.frost_damage || [0, 0, 0];
    this.poison_damage = being.poison_damage || [0, 0, 0];
    this.damage_increase_rate = 0;

    this.level = being.level;
    this.exp = being.exp;

    this.name = being.name;

    this.base_crit_rate = being.base_crit_rate;
    this.crit_rate = 0;
    this.crit_dmg_increase = 150;

    this.attack_speed = being.attack_speed;
    this.action_duration = being.action_duration;

    this.max_block_rate = 90;
    this.block_rate = being.block_rate || 0;
    this.block_dmg_rate = 90;

    this.dodge_value = being.dodge_value;
    this.hit_value = being.hit_value;

    this.act_end = 0;
    this.isPlayer = isPlayer;
  }

  get isFullLife() {
    return this.life === this.max_life;
  }

  initActTime(now: number) {
    const { action_duration, attack_speed } = this;
    this.act_end = now + action_duration / (1 + attack_speed / 100);
  }

  computeLife() {
    const { life_increase_rate, add_life, init_life, level, strength } = this;
    const isFullLife = this.isFullLife;
    this.max_life = Math.floor(
      (init_life + add_life) * life_increase_rate + strength / 2 + level * 15
    );
    if (isFullLife) {
      this.life = this.max_life;
    }
  }

  init(now: number) {
    this.initActTime(now);
    this.computeLife();
  }

  // 受到伤害
  takeDamage(dmg: EffectiveDamage) {
    const { physical, electric, fire, frost, poison } = dmg;
    const blocked = isBlock(this);
    let damage = physical + electric + fire + frost + poison;
    if (blocked) {
      damage *= computeBlockDamageMulti(this);
    }
    this.life -= damage;
  }

  // set
  setScene(scene: Scene) {
    this.scene = scene;
  }

  tick(start: number, now: number) {
    console.log('tick', start, now);

    if (now >= this.act_end) {
      console.log('act');
      this.act();
      this.initActTime(now);
    }
  }

  isDeath() {
    return this.life <= 0;
  }

  attack() {
    const enemy = this.scene?.findEnemy(this.isPlayer);
    if (!enemy || enemy.isDeath()) return;
    const damage = computeDamage(this);
    enemy.takeDamage(damage);
  }

  act() {
    this.attack();
  }
}

// y=1.5\sqrt{x}
