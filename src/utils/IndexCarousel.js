export default class IndexCarousel {
  constructor(length) {
    this.length = length;
    this.cur = 0;
  }

  next() {
    this.cur = (this.length + this.cur + 1) % this.length;
    return this.cur;
  }

  get() {
    return this.cur;
  }

  set(v) {
    this.cur = v;
  }

  reset() {
    this.cur = 0;
  }
}