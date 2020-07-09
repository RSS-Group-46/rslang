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

  get() {
    return this.items;
  }

  getIndex(item) {
    return this.items.indexOf(item);
  }

  getItem(index) {
    return this.items[index];
  }

  getLength() {
    return this.items.length;
  }
}

export default Queue;
