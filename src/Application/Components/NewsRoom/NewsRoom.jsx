import React from 'react';
import Headline from './Headline';

const NewsRoom = React.createClass({
  propTypes: {
    broadcasts: React.PropTypes.array.isRequired,
  },

  renderNewsQueue() {
    const oldNews = this.props.broadcasts.slice(1);

    return (
      <div className="news-queue">
        <ul>
          <Headline content={this.props.broadcasts[0].content}/>
          {oldNews.map((broadcast, index) => {
            return (
              <li className="news-text" key={index}><hr/>{broadcast.content}</li>
            );
          })}
        </ul>
      </div>
    );
  },

  render() {
    return (
      <div className="panel panel-primary">
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
