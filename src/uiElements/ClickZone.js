import { fabric } from 'fabric-webpack';

class ClickZone {
  constructor(canvasId, onClick) {
    this._clickable = undefined;
    this._onClick = onClick;
    this._clickerX = 200;
    this._clickerY = 50;
    const x = 50;
    const y = 50;

    this._canvas = new fabric.Canvas(canvasId);

    // Label placement
    this._moneyLabel = this._getMoneyLabel(x, y);
    this._mpsLabel = this._getMpsLabel(x, y + 20);

    this._money = this._getDefaultMoney(x + 15, y);
    this._mps = this._getDefaultMps(x + 70, y + 20);

    // Add it all to the canvas
    this._canvas.add(this._moneyLabel);
    this._canvas.add(this._mpsLabel);
    this._canvas.add(this._money);
    this._canvas.add(this._mps);

    this._setDefaultClickable();
  }

  update(money, mps) {
    this._money.setText((Math.floor(money)).toString());
    this._mps.setText((Math.floor(mps)).toString());
    this._canvas.renderAll();
  }

  setClickable(imageAddress, newOnClick) {
    // Load the new image, remove old, add listener, add to canvas
    fabric.Image.fromURL(imageAddress, img => {
      img.set({
        left: this._clickerX,
        top: this._clickerY,
        selectable: false,
      });
      this._canvas.remove(this._clickable);

      this._clickable = img;

      if (newOnClick) {
        this._onClick = newOnClick;
      }

      this._clickable.on('mousedown', this._onClick);

      this._canvas.add(this._clickable).renderAll();
    });
  }

  // Setup
  _setDefaultClickable() {
    fabric.Image.fromURL('images/penny.gif', img => {
      img.set({
        left: this._clickerX,
        top: this._clickerY,
        selectable: false,
      });
      this._clickable = img;
      this._clickable.on('mousedown', this._onClick);

      this._canvas.add(this._clickable).renderAll();
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
    return new fabric.Text('Income: ', {
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
