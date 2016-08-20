import React from 'react';
import { fabric } from 'fabric';
const MAP_IMAGE_ADDRESS = 'images/map.png';
const MAP_CANVAS_DOM_ID = 'map-canvas';

class RealEstateMap extends React.Component {
  constructor(props) {
    super(props);
    this.setMap = this.setMap.bind(this);
    this.addPin = this.addPin.bind(this);
    this.randomPointWithinMap = this.randomPointWithinMap.bind(this);
  }

  addPin(pin) {
    console.log(pin);
    const fabricPin = new fabric.Circle({
      radius: 3,
      left: pin.x,
      top: pin.y,
      selectable: false,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      fill: 'blue',
    });

    this.canvas.add(fabricPin).renderAll();
  }

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
      img.perPixelTargetFind = true;
      img.targetFindTolerance = 4;

      this.canvas.add(img).renderAll();
      this.map = img;
      this.mapBorder = this.map.getBoundingRect();
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentpins = this.props.pins.length || 0;
    if (nextProps.pins.length > currentpins) {
      this.addPin(this.randomPointWithinMap());
    }
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(MAP_CANVAS_DOM_ID);
    this.setMap();
  }

  // min (inclusive) and max (exclusive)
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomPointWithinMap() {
    const randX = this.getRandom(this.mapBorder.left, this.mapBorder.left + this.mapBorder.width);
    const randY = this.getRandom(this.mapBorder.top, this.mapBorder.top + this.mapBorder.height);
    const point = new fabric.Point(randX, randY);

    if (this.canvas.isTargetTransparent(this.map, randX, randY)) {
      return this.randomPointWithinMap();
    }
    return point;
  }


  render() {
    return (
      <canvas id="map-canvas" className="map-canvas" width="600" height="300"/>
    );
  }
}

// Currently different types are all the same, and the only thing that matters is the number
RealEstateMap.propTypes = {
  pins: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default RealEstateMap;
