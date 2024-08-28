import { EffectiveDamage } from './damage';
import { Timeline } from '../interaction/timeline';

export interface IBeing {
  life: number;
  energy_shield: number;

  // 物理伤害
  physical_damage: [number, number, number];
  // 闪电伤害
  electric_damage: [number, number, number];
  // 火焰伤害
  fire_damage: [number, number, number];
  // 冰霜伤害
  frost_damage: [number, number, number];
  // 毒素伤害
  poison_damage: [number, number, number];

  strength: number;
  agileness: number;
  intelligence: number;

  level: number;
  exp: number;

  name: string;

  base_crit_rate: number;
  crit_rate: number;
  crit_dmg: number;

  attack_speed: number;
  action_duration: number;

  block_rate: number;
  block_dmg: number;

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
  crit_dmg: number;

  attack_speed: number;
  action_duration: number;

  block_rate: number;
  block_dmg: number;

  dodge_value: number;
  hit_value: number;

  act_end: number;

  enemy: Being | undefined;

  timeline: Timeline = new Timeline([]);

  constructor(being: IBeing) {
    this.life = 0;
    this.init_life = being.life;
    this.max_life = 0;
    this.add_life = 0;
    this.life_increase_rate = 0;

    this.energy_shield = being.energy_shield;

    this.strength = being.strength;
    this.agileness = being.agileness;
    this.intelligence = being.intelligence;

    this.physical_damage = being.physical_damage;
    this.electric_damage = being.electric_damage;
    this.fire_damage = being.fire_damage;
    this.frost_damage = being.frost_damage;
    this.poison_damage = being.poison_damage;
    this.damage_increase_rate = 0;

    this.level = being.level;
    this.exp = being.exp;

    this.name = being.name;

    this.base_crit_rate = being.base_crit_rate;
    this.crit_rate = being.crit_rate;
    this.crit_dmg = being.crit_dmg;

    this.attack_speed = being.attack_speed;
    this.action_duration = being.action_duration;

    this.block_rate = being.block_rate;
    this.block_dmg = being.block_dmg;

    this.dodge_value = being.dodge_value;
    this.hit_value = being.hit_value;

    this.act_end = 0;
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
  takeDamage(dmg: number) {
    this.life -= dmg;
  }

  // set
  setTimeline(timeline: Timeline) {
    this.timeline = timeline;
  }

  tick(start: number, now: number) {
    if (now >= this.act_end) {
      this.act();
      this.initActTime(now);
    }
  }

  isDeath() {
    return this.life <= 0;
  }

  findEnemy() {
    // 先找第0个敌人
    if (this.enemy) {
      return this.enemy;
    }
    this.enemy = this.timeline.beings.find((b) => b !== this);
    return this.enemy;
  }

  attack(): EffectiveDamage {
    const {
      physical_damage,
      fire_damage,
      frost_damage,
      poison_damage,
      electric_damage,
      damage_increase_rate,
    } = this;
  }

  act() {
    const enemy = this.findEnemy();
    if (!enemy || enemy.isDeath()) return;
  }
}

// y=1.5\sqrt{x}
