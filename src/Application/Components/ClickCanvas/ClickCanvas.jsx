import React from 'react';
import { fabric } from 'fabric-webpack';
import numeral from 'numeral';

const ClickCanvas = React.createClass({
  propTypes: {
    cash: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    income: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },

  images: {
    penny: 'images/penny.gif',
  },

  getInitialState() {
    return {
      cash: 0,
      income: 0,
    };
  },

  _createText(x, y, color, text) {
    return new fabric.Text(text, {
      left: x,
      top: y,
      fill: color,
      angle: 0,
      fontSize: 20,
      selectable: false,
    });
  },

  setClickableImage() {
    fabric.Image.fromURL(this.images[this.props.image], img => {
      img.set({
        left: this.imgX,
        top: this.imgY,
        selectable: false,
      });
      if (this.clickable) {
        this.canvas.remove(this.clickable);
      }
      this.clickable = img;
      this.clickable.on('mousedown', this.props.onClick);

      this.canvas.add(this.clickable).renderAll();
    });
  },

  setupDefaults() {
    this.imgX = 250;
    this.imgY = 50;
    this.clickable = undefined;

    const x = 50;
    const y = 50;

    this.moneyLabel = this._createText(x, y, '#000', 'Cash: ');
    this.mpsLabel = this._createText(x, y + 20, '#000', 'Income: ');

    this.money = this._createText(x + 50, y, '#00b200', '$ 0.00');
    this.mps = this._createText(x + 70, y + 20, '#00b200', '$ 0.00');

    // Add it all to the canvas
    this.canvas.add(this.moneyLabel);
    this.canvas.add(this.mpsLabel);
    this.canvas.add(this.money);
    this.canvas.add(this.mps);

    this.setClickableImage();
  },

  updateText() {
    const cash = numeral(this.props.cash).format('($ 0.00 a)');
    const income = numeral(this.props.income).format('($ 0.00 a)');

    this.money.setText(cash);
    this.mps.setText(income);
    this.canvas.renderAll();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.setClickableImage();
    }
    if (prevProps.cash !== this.props.cash || prevProps.income !== this.props.income) {
      this.updateText();
    }
  },

  componentDidMount() {
    this.canvas = new fabric.Canvas('click-canvas');
    this.setupDefaults();
  },

  render() {
    return (
        <div>
          <canvas id="click-canvas" width="600" height="300"></canvas>
        </div>
    );
  },
});

export default ClickCanvas;
