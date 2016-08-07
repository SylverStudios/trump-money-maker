import React from 'react';
import Headline from './Headline';
import Broadcast from '../../Models/Broadcast';

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
          {oldNews.map(this.renderBroadcast)}
        </ul>
      </div>
    );
  },

  renderBroadcast(broadcast, index) {
    switch (broadcast.type) {
      case Broadcast.TYPES.INSTRUCTION:
        return (
          <li className="news-text broadcast-instruction" key={index}><hr/>{broadcast.content}</li>
        );

      case Broadcast.TYPES.FLAVOR:
        return (
          <li className="news-text broadcast-flavor" key={index}><hr/>{broadcast.content}</li>
        );

      case Broadcast.TYPES.NEWS:
        return (
          <li className="news-text broadcast-news" key={index}><hr/>{'Latest: ' + broadcast.content}</li>
        );

      default:
        return (
          <li className="news-text" key={index}><hr/>{broadcast.content}</li>
        );
    }
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
