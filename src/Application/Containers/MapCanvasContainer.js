import { connect } from 'react-redux'
import MapCanvas from '../Components/MapCanvas/MapCanvas';


const mapStateToProps = (state) => {
  return {
    pins: state.map
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};


const MapCanvasContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapCanvas);

export default MapCanvasContainer;

