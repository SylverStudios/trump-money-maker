import { connect } from 'react-redux';
import Store from '../Components/Store/Store';
import createActions from '../actions';

const visibleFilter = (assets) => {
  return assets.filter((asset) => { return asset.unlocked; });
};

const mapStateToProps = (state) => {
  return {
    assets: visibleFilter(state.assets),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id) => {
      dispatch(createActions.buyAsset(id));
    },
  };
};


const StoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Store);

export default StoreContainer;
