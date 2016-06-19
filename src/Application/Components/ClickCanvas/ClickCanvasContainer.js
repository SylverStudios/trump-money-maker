import { connect } from 'react-redux';
import ClickCanvas from './ClickCanvas';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  return {
    cash: state.bank.cash,
    imageUrl: `images/denominations/${state.mint.currentDenomination.id}.png`,
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
