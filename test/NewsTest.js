import News from '../src/Application/Models/News';
import broadcastManager from '../src/util/broadcastManager';
import { assert } from 'chai';

describe('News', function () {
  const broadcasts = broadcastManager.getInstructions();
  const newBroadcast = broadcastManager.upgradeDenomFail();
  let news;
  let NewsCopy;

  beforeEach(function () {
    news = new News(broadcasts);
    NewsCopy = new News(broadcasts);
  });

  describe('addBroadcast()', function () {
    it('should return a new News and leave the original unmodified', function () {
      const newNews = news.addBroadcast(newBroadcast);

      assert.equal(news.broadcasts[0], NewsCopy.broadcasts[0]);
      assert.equal(news.broadcasts.length, 4);
      assert.equal(newNews.broadcasts.length, 5);
    });

    it('should add new articles to the start of the array', function () {
      const newNews = news.addBroadcast(newBroadcast);

      assert.equal(newNews.broadcasts[0], newBroadcast);
      assert.equal(newNews.broadcasts.length, 5);
    });

    it('should remove the oldest article with max 10 articles', function () {
      const myBroadcasts = [];
      for (const i of Array(9).keys()) {
        myBroadcasts.push(broadcastManager.createFlavor(i));
      }
      news = new News(myBroadcasts);
      const newNews = news.addBroadcast(newBroadcast);

      assert.equal(newNews.broadcasts[0], newBroadcast);
      assert.equal(newNews.broadcasts.length, 10);
    });
  });
});
