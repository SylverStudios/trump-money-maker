import React from 'react';
import TypeWriter from 'react-typewriter';

class Headline extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    this.refs.typewriter.reset();
  }

  render() {
    return (
        <TypeWriter minDelay={20} maxDelay={50} ref="typewriter" typing={1}>
          <li className="news-headline">{this.props.content}</li>
        </TypeWriter>
    );
  }
}

Headline.propTypes = {
  content: React.PropTypes.string,
};

Headline.defaultProps = {
  content: 'Trump time!',
};

export default Headline;
