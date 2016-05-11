import { connect } from 'react-redux';
import MapCanvas from '../Components/MapCanvas/MapCanvas';

const mapStateToProps = (state) => {
  return {
    pins: state.map,
  };
};

const MapCanvasContainer = connect(
    mapStateToProps
)(MapCanvas);

export default MapCanvasContainer;
