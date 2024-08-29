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
  run() {
    if (!this.scene) return;
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      this.nowTime = Date.now();
      this.scene?.tick(this.startTime, this.nowTime);
    }, 1000 / 60);
  }
}
