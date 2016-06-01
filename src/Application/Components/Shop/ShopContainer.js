import { connect } from 'react-redux';
import Store from './Shop';
import createActions from '../../Redux/actions';

const mapStateToProps = (state) => {
  return {
    assets: state.broker.unlockedAssets,
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
