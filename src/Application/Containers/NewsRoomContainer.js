import { connect } from 'react-redux'
import NewsRoom from '../Components/NewsRoom/NewsRoom';

const mapStateToProps = (state) => {
  return {
    articles: state.news
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};


const NewsRoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsRoom);

export default NewsRoomContainer

