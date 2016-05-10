import { connect } from 'react-redux'
import Store from '../Components/Store/Store';
import createActions from '../actions';


const mapStateToProps = (state) => {
  return {
    assets: state.assets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(createActions.buyAsset(id))
    }
  }
};


const StoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Store);

export default StoreContainer;

