import News from '../src/Application/Models/News';
import { assert } from 'chai';

describe('News', function () {
  const articles = ['an article', 'and another'];
  let news;
  let NewsCopy;

  beforeEach(function () {
    news = new News(articles);
    NewsCopy = new News(articles);
  });

  describe('makeWithArticle()', function () {
    it('should return a new News and leave the original unmodified', function () {
      const newArticle = 'An article about cats';
      const newNews = news.makeWithArticle(newArticle);

      assert.equal(news.articles[0], NewsCopy.articles[0]);
      assert.equal(news.articles.length, 2);
      assert.equal(newNews.articles.length, 3);
    });

    it('should add new articles to the start of the array', function () {
      const newArticle = 'This should come first';
      const newNews = news.makeWithArticle(newArticle);

      assert.equal(newNews.articles[0], newArticle);
      assert.equal(newNews.articles.length, 3);
    });

    it('should remove the oldest article with max 10 articles', function () {
      const myArticles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const newArticle = 'eleven';

      news = new News(myArticles);
      const newNews = news.makeWithArticle(newArticle);

      assert.equal(newNews.articles[0], newArticle);
      assert.equal(newNews.articles.length, 10);
    });
  });
});
