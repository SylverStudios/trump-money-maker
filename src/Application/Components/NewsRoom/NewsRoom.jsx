import React from 'react';

const NewsRoom = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
  },

  render() {
    let count = 0;
    return (
      <div id="news-zone">
        <h3>News Room</h3>
        <div id="news-queue">
          <ul>
            {this.props.articles.map(function (article) {
              count++;
              return <li key={count}>{article}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  },
});

export default NewsRoom;
