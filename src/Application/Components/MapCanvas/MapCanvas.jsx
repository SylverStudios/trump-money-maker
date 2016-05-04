import React from 'react';
import { fabric } from 'fabric-webpack';

const MAP_IMAGE_ADDRESS = 'images/map.gif';
const MAP_CANVAS_DOM_ID = 'map-canvas';
/**
 * No Pin functionality yet.
 */
const MapCanvas = React.createClass({
  propTypes: {
    pins: React.PropTypes.object,
  },

  setMap() {
    fabric.Image.fromURL(MAP_IMAGE_ADDRESS, img => {
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

  componentDidMount() {
    this.canvas = new fabric.Canvas(MAP_CANVAS_DOM_ID);
    this.setMap();
  },

  render() {
    return (
        <canvas id="map-canvas" width="600" height="300"/>
    );
  },
});

export default MapCanvas;
