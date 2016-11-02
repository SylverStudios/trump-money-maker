import { connect } from 'react-redux';
import TellerSection from './TellerSection';
import createAction from '../../Redux/actions';

const mapStateToProps = state => {
  const { teller: { numTellers, tellerPrice } } = state;
  return { numTellers, tellerPrice };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseTeller: () => dispatch(createAction.purchaseTeller()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TellerSection);
