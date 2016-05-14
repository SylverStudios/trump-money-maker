import { connect } from 'react-redux';
import MapCanvas from 'MapCanvas';

const mapStateToProps = (state) => {
  return {
    pins: state.map,
  };
};

const MapCanvasContainer = connect(
    mapStateToProps
)(MapCanvas);

export default MapCanvasContainer;
