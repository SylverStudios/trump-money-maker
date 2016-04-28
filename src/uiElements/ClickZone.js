import { fabric } from 'fabric-webpack';

class ClickZone {
  constructor(canvasId) {
    const x = 50;
    const y = 50;
    const clickX = 300;
    const clickY = 150;

    this._canvas = new fabric.Canvas(canvasId);
    this._clickable = this._getDefaultClickable(clickX, clickY);

    // Label placement
    this._moneyLabel = this._getMoneyLabel(x, y);
    this._mpsLabel = this._getMpsLabel(x, y + 20);

    this._money = this._getDefaultMoney(x + 15, y);
    this._mps = this._getDefaultMps(x + 115, y + 20);

    // Add it all to the canvas
    this._canvas.add(this._clickable);

    this._canvas.add(this._moneyLabel);
    this._canvas.add(this._mpsLabel);
    this._canvas.add(this._money);
    this._canvas.add(this._mps);
  }

  update(money, mps) {
    this._money.setText((Math.floor(money)).toString());
    this._mps.setText((Math.floor(mps)).toString());
    this._canvas.renderAll();
  }

  getClickable() {
    return this._clickable;
  }

  // Setup
  _getDefaultClickable() {
    return new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: 100,
      top: 100,
      selectable: false,
    });
  }

  _getDefaultMoney(x, y) {
    return new fabric.Text('0', {
      left: x,
      top: y,
      fill: '#00b200',
      angle: 0,
      fontSize: 20,
      selectable: false,
    });
  }

  _getDefaultMps(x, y) {
    return new fabric.Text('0', {
      left: x,
      top: y,
      fill: '#00b200',
      angle: 0,
      fontSize: 20,
      selectable: false,
    });
  }

  _getMpsLabel(x, y) {
    return new fabric.Text('Per Second: ', {
      left: x,
      top: y,
      fill: '#000',
      angle: 0,
      fontSize: 20,
      selectable: false,
    });
  }

  _getMoneyLabel(x, y) {
    return new fabric.Text('$', {
      left: x,
      top: y,
      fill: '#000',
      angle: 0,
      fontSize: 20,
      selectable: false,
    });
  }
}

export default ClickZone;
