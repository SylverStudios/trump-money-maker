import { connect } from 'react-redux';
import ClickCanvas from '../Components/ClickCanvas/ClickCanvas';
import createAction from '../actions';

// TODO: Make the image change
const mapStateToProps = (state) => {
  return {
    cash: state.money.cash,
    image: 'penny',
    income: state.money.income,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(createAction.clickMoney());
    },
  };
};

const ClickCanvasContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClickCanvas);

export default ClickCanvasContainer;
