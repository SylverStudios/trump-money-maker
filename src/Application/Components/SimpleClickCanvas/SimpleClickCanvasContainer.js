import { connect } from 'react-redux';
import SimpleClickCanvas from './SimpleClickCanvas';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  return {
    imageUrl: `images/denominations/${state.mint.currentDenomination.id}.png`,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(createAction.clickMoney());
    },
  };
};

const SimpleClickCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleClickCanvas);

export default SimpleClickCanvasContainer;
