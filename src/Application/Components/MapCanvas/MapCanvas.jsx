import React from "react";
import { fabric } from 'fabric-webpack';

/**
 * No Pin functionality yet.
 */
const MapCanvas = React.createClass({
  propTypes: {
    pins: React.PropTypes.object,
  },

  setMap() {
    fabric.Image.fromURL('images/map.gif', img => {
      img.scale(1.4).set({
        left: 0,
        top: 0,
        selectable: false,
      });
      this.canvas.add(img).renderAll();
    });
  },

  _createPin(x, y) {
    return new fabric.Circle({
      radius: 5,
      fill: 'blue',
      left: x,
      top: y,
      selectable: false,
    });
  },

  dropPin(pin) {
    const canvasPin = this._createPin(pin.x, pin.y);
    this.canvas.add(canvasPin).renderAll();
  },

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.pins !== this.props.pins) {
  //     this.dropPins();
  //   }
  // },

  componentDidMount() {
    this.canvas = new fabric.Canvas('map-canvas');
    this.setMap();
  },

  render() {
    return (
      <div>
        <canvas id="map-canvas" width="600" height="300"></canvas>
      </div>
    );
  },
});

export default MapCanvas;
