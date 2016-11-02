import { connect } from 'react-redux';
import TellerSection from './TellerSection';

const mapStateToProps = () => {
  return {
    numTellers: 2,
    tellerPrice: 4,
  };
};

const mapDispatchToProps = () => {
  return {
    purchaseTeller: () => console.log('purchase clicked!'),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TellerSection);
