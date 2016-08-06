class News {
  constructor(broadcasts) {
    this._broadcasts = broadcasts;
  }

  get broadcasts() {
    return this._broadcasts;
  }

  addBroadcast(article) {
    const copyOfBroadcasts = this.broadcasts.slice();
    copyOfBroadcasts.unshift(article);

    if (copyOfBroadcasts.length > 10) {
      copyOfBroadcasts.pop();
    }
    return new News(copyOfBroadcasts);
  }
}

export default News;
