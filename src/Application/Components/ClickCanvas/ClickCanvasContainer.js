import { connect } from 'react-redux';
import ClickCanvas from './ClickCanvas';
import createAction from '../../Redux/actions';

// TODO: Make the image change
const mapStateToProps = (state) => {
  return {
    cash: state.bank.cash,
    image: 'penny',
    income: state.bank.income,
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
