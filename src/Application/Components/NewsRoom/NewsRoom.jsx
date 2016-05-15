import React from 'react';

const NewsRoom = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
  },

  renderNewsQueue() {

    const maxSize = 20;
    const increment = 1;
    const articlesByAge = this.props.articles.slice();
    articlesByAge.reverse();

    return (
      <div id="news-queue">
        <ul>
          {articlesByAge.map((article, index) => {
              const style = {
                fontSize: maxSize - increment*index
              };
              return (
                <li className="news-text" style={style} key={index}>{article} <hr/></li>
              )
          })}
        </ul>
      </div>
    );
  },

  render() {
    return (
      <div id="news-zone" className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title news-title text-center">Breaking News</h3>
        </div>
        <div className="panel-body">
          {this.renderNewsQueue()}
        </div>
      </div>
    );
  },
});

export default NewsRoom;
