import { Being } from './being';

export class Scene {
  player: Being | null = null;
  enemies: Being[] = [];

  addPlayer(player: Being) {
    this.player = player;
  }

  addEnemy(enemy: Being) {
    this.enemies.push(enemy);
  }

  findEnemy(isPlayer: boolean): Being {
    if (!isPlayer) {
      return this.player as Being;
    } else {
      return this.enemies[0];
    }
  }

  init(now: number) {
    this.player?.init(now);
    this.enemies.forEach((enemy) => {
      enemy.init(now);
    });
  }
  tick(start: number, now: number) {
    this.player?.tick(start, now);
    this.enemies.forEach((enemy) => {
      enemy.tick(start, now);
    });
  }
}
