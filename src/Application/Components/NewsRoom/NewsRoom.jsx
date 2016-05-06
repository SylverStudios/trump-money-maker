import React from 'react';

const NewsRoom = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
  },

  renderNewsQueue() {
    return (
      <div id="news-queue">
        <ul>
          {this.props.articles.map((article, index) => <li key={index}>{article}</li>)}
        </ul>
      </div>
    );
  },

  render() {
    return (
      <div id="news-zone">
        <h3>News Room</h3>
        {this.renderNewsQueue()}
      </div>
    );
  },
});

export default NewsRoom;
