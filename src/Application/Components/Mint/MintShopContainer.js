import { connect } from 'react-redux';
import MintShop from './MintShop';
import createActions from '../../Redux/actions';

const mapStateToProps = (state) => {
  return {
    nextDenomination: state.mint.nextDenomination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpgrade: () => {
      dispatch(createActions.upgradeDenomination());
    },
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MintShop);
