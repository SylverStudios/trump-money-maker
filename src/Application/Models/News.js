import { newsConfig } from '../../util/constants';

class News {
  constructor(broadcasts) {
    this._broadcasts = broadcasts;
  }

  get broadcasts() {
    return this._broadcasts;
  }

  addBroadcast(article) {
    let copyOfBroadcasts = this.broadcasts.slice();
    copyOfBroadcasts.unshift(article);

    while (copyOfBroadcasts.length > newsConfig.maxBroadcasts) {
      copyOfBroadcasts.pop();
    }

    return new News(copyOfBroadcasts);
  }
}

export default News;
