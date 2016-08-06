import { connect } from 'react-redux';
import NewsRoom from './NewsRoom';

const mapStateToProps = (state) => {
  return {
    broadcasts: state.news.broadcasts,
  };
};

const NewsRoomContainer = connect(
    mapStateToProps
)(NewsRoom);

export default NewsRoomContainer;
