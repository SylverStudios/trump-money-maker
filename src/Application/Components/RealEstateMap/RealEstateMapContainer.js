import { connect } from 'react-redux';
import RealEstateMap from './RealEstateMap';

const mapStateToProps = (state) => {
  return {
    pins: state.map,
  };
};

const RealEstateMapContainer = connect(
  mapStateToProps
)(RealEstateMap);

export default RealEstateMapContainer;
