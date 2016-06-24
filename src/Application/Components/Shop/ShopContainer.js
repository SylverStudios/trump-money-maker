import { connect } from 'react-redux';
import Shop from './Shop';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  return {
    areStatsVisible: state.broker.areStatsVisible,
    assets: state.broker.unlockedAssets,
    totalRevenueEverEarned: state.bank.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id) => {
      dispatch(createAction.buyAsset(id));
    },
    onToggle: () => {
      dispatch(createAction.toggleStatsVisibility());
    },
  };
};

const ShopContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Shop);

export default ShopContainer;
