import News from '../src/Application/Models/News';
import broadcastManager from '../src/util/broadcastManager';
import { newsConfig } from '../src/util/constants';
import { assert } from 'chai';

describe('News', function () {
  const broadcasts = [broadcastManager.getQuote()];
  const newBroadcast = broadcastManager.upgradeDenomFail();
  let news;
  let NewsCopy;

  beforeEach(function () {
    news = new News(broadcasts);
    NewsCopy = new News(broadcasts);
  });

  describe('addBroadcast()', function () {
    it('should return a new News and leave the original unmodified', function () {
      news.addBroadcast(newBroadcast);

      assert.equal(news.broadcasts[0], NewsCopy.broadcasts[0]);
      assert.equal(news.broadcasts.length, NewsCopy.broadcasts.length);
    });

    it('should add new articles to the start of the array', function () {
      const newNews = news.addBroadcast(newBroadcast);

      assert.equal(newNews.broadcasts[0], newBroadcast);
    });

    it('should remove the oldest article when the news limit is reached', function () {
      for (const i of Array(newsConfig.maxBroadcasts + 1).keys()) {
        news = news.addBroadcast(broadcastManager.createFlavor(i));
      }
      const newNews = news.addBroadcast(newBroadcast);

      assert.equal(newNews.broadcasts[0], newBroadcast);
      assert.equal(newNews.broadcasts.length, newsConfig.maxBroadcasts);
    });
  });
});
