import React from 'react';
import { fabric } from 'fabric';
import numeral from 'numeral';

const GREEN = '#00b200';
const BLACK = '#000';

const ClickCanvas = React.createClass({
  propTypes: {
    cash: React.PropTypes.number.isRequired,
    imageUrl: React.PropTypes.string.isRequired,
    income: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
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
    fabric.Image.fromURL(this.props.imageUrl, img => {
      img.set({
        left: this.imgPosX,
        top: this.imgPosY,
        selectable: false,
        hoverCursor: 'pointer',
        perPixelTargetFind: true,
        targetFindTolerance: 4,
        hasControls: false,
        hasBorders: false,
      });
      if (this.clickable) {
        this.canvas.remove(this.clickable);
      }
      this.clickable = img;
      this.clickable.on('mousedown', () => {
        this.clickSound.play();
        this.props.onClick();
      });

      this.canvas.add(this.clickable).renderAll();
    });
  },

  setupDefaults() {
    this.imgPosX = 250;
    this.imgPosY = 50;
    this.clickable = undefined;

    const textPosX = 50;
    const textPosY = 50;

    this.moneyLabel = this._createText(textPosX, textPosY, BLACK, 'Cash: ');
    this.incomeLabel = this._createText(textPosX, textPosY + 20, BLACK, 'Income: ');

    this.money = this._createText(textPosX + 50, textPosY, GREEN, '$ 0.00');
    this.mps = this._createText(textPosX + 70, textPosY + 20, GREEN, '$ 0.00');

    // Add it all to the canvas
    this.canvas.add(this.moneyLabel);
    this.canvas.add(this.incomeLabel);
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
    if (prevProps.imageUrl !== this.props.imageUrl) {
      this.setClickableImage();
    }
    if (prevProps.cash !== this.props.cash || prevProps.income !== this.props.income) {
      this.updateText();
    }
  },

  componentDidMount() {
    this.canvas = new fabric.Canvas('click-canvas');
    this.clickSound = new Audio('sounds/clink.mp3');
    this.setupDefaults();
  },

  render() {
    return (
          <canvas id="click-canvas" width="600" height="300" />
    );
  },
});

export default ClickCanvas;
