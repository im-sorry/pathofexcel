import { Being } from '../modules/being';

export class Timeline {
  startTime: number;
  nowTime: number;
  beings: Being[];
  timer?: NodeJS.Timer;
  constructor(beings: Being[]) {
    this.startTime = Date.now();
    this.nowTime = this.startTime;
    this.beings = beings;
    this.beings.forEach((being) => {
      being.setTimeline(this);
    });
  }
  add(being: Being) {
    this.beings.push(being);
    being.setTimeline(this);
  }
  remove(being: Being) {
    this.beings = this.beings.filter((b) => b !== being);
  }
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  init() {
    this.startTime = Date.now();
    this.beings.forEach((being) => {
      being.init(this.startTime);
    });
  }
  run() {
    this.init();
    this.timer = setInterval(() => {
      this.nowTime = Date.now();
      this.beings.forEach((being) => {
        being.tick(this.startTime, this.nowTime);
      });
    }, 1000 / 60);
  }
}
