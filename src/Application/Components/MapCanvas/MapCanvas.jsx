import React from 'react';
import { fabric } from 'fabric';

import OrderedPair from './OrderedPair';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';

const MAP_IMAGE_ADDRESS = 'images/map.png';
const MAP_CANVAS_DOM_ID = 'map-canvas';
/**
 * No Pin functionality yet.
 */
const MapCanvas = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    pins: ImmutablePropTypes.listOf(React.PropTypes.instanceOf(OrderedPair)),
  },


  setMap() {
    fabric.Image.fromURL(MAP_IMAGE_ADDRESS, img => {
      img.scale(1.4).set({
        left: 50,
        top: 0,
        selectable: false,
        scaleX: 0.25,
        scaleY: 0.25,
        hasControls: false,
        hasBorders: false,
        hoverCursor: 'cursor',
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
