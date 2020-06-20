class Queue {
  constructor(items) {
    this.items = items;
  }

  add(item) {
    this.items.push(item);
  }

  remove() {
    this.items.shift();
  }

  next() {
    return this.items.shift();
  }

  getItem(index = 0) {
    return this.items[index];
  }

  get() {
    return this.items;
  }
}

export default Queue;
