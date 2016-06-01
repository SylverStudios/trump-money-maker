import React from 'react';
import Headline from './Headline';

const NewsRoom = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
  },

  renderNewsQueue() {
    const oldNews = this.props.articles.slice(1);

    return (
      <div id="news-queue">
        <ul>
          <Headline content={this.props.articles[0]}/>
          {oldNews.map((article, index) => {
            return (
              <li className="news-text" key={index}><hr/>{article}</li>
            );
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
