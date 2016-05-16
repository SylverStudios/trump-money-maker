class News {
  constructor(articles) {
    this._articles = articles;
  }

  get articles() {
    return this._articles;
  }

  addArticle(article) {
    const copyOfArticles = this.articles.slice();
    copyOfArticles.unshift(article);

    if (copyOfArticles.length > 10) {
      copyOfArticles.pop();
    }
    return new News(copyOfArticles);
  }
}

export default News;
