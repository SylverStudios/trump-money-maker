import News from '../src/Application/Models/News';

import chai from 'chai';
const assert = chai.assert;

describe('News', function () {

  describe('makeWithArticle()', function () {

    it('should return a new News and leave the original unmodified', function () {
      const articles = ['an article', 'and another'];
      const news = new News(articles);
      const identitcalNews = new News(articles);

      const newNews = news.makeWithArticle('An article about cats');

      assert.equal(news.articles[0], identitcalNews.articles[0]);
      assert.equal(news.articles.length, 2);
      assert.equal(newNews.articles.length, 3);
    });

    it('should add new articles to the start of the array', function () {
      const articles = ['an article', 'and another'];
      const newArticle = 'This should come first';

      const news = new News(articles);

      const newNews = news.makeWithArticle(newArticle);

      assert.equal(newNews.articles[0], newArticle);
      assert.equal(newNews.articles.length, 3);
    });

    it('should remove the oldest article with max 10 articles', function () {
      const articles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const news = new News(articles);
      const newArticle = 'eleven';

      const newNews = news.makeWithArticle(newArticle);

      assert.equal(newNews.articles[0], newArticle);
      assert.equal(newNews.articles.length, 10);
    });
  });
});