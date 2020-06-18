import IndexCarousel from './IndexCarousel';

export default class WordsIterator {
  constructor(totalGroups, totalPages, totalWords) {
    this.group = new IndexCarousel(totalGroups);
    this.page = new IndexCarousel(totalPages);
    this.word = new IndexCarousel(totalWords);
  }

  getCurrent() {
    return { word: this.word.get(), page: this.page.get(), group: this.group.get() };
  }

  getNext() {
    if (!this.word.next()) { // false if end reached
      if (!this.page.next()) {
        this.group.next();
      }
    }

    return this.getCurrent();
  }

  async setGroup(n) {
    this.group.set(n);
    this.page.reset();
    this.word.reset();
  }
}