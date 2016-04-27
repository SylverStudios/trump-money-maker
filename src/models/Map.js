import { fabric } from 'fabric-webpack';

class Map {
  constructor(canvasId) {
    this._canvas = new fabric.Canvas(canvasId);

    fabric.Image.fromURL('images/map.gif', img => {
      img.scale(1.4).set({
        left: 0,
        top: 0,
        selectable: false,
      });
      this._canvas.add(img);
    });
  }

  addPin(x, y) {
    const pin = this._getPin(x, y);

    this._canvas.add(pin).renderAll();
  }

  _getPin(x, y) {
    return new fabric.Circle({
      radius: 5,
      fill: 'blue',
      left: x,
      top: y,
      selectable: false,
    });
  }
}

export default Map;
