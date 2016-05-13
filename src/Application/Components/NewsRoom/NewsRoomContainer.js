import { connect } from 'react-redux';
import NewsRoom from 'NewsRoom';

const mapStateToProps = (state) => {
  return {
    articles: state.news,
  };
};

const NewsRoomContainer = connect(
    mapStateToProps
)(NewsRoom);

export default NewsRoomContainer;
