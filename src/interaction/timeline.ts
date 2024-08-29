import { Scene } from '../modules/scene';

export class Timeline {
  startTime: number;
  nowTime: number;
  timer?: NodeJS.Timer;
  scene: Scene | null = null;
  constructor() {
    this.startTime = Date.now();
    this.nowTime = this.startTime;
  }
  addScene(scene: Scene) {
    this.scene = scene;
  }
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  init(now: number) {
    if (!this.scene) return;
    this.scene.init(now);
  }
  run() {
    if (!this.scene) return;
    this.startTime = Date.now();
    this.init(this.startTime);
    this.timer = setInterval(() => {
      console.log('------------------tick---------start');
      this.nowTime = Date.now();
      this.scene?.tick(this.startTime, this.nowTime);
      console.log('------------------tick---------end');
    }, 1000 / 2);
  }
}
