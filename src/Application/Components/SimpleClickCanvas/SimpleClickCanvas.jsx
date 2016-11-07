import React from 'react';
import { fabric } from 'fabric';

class SimpleClickCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.setClickableImage = this.setClickableImage.bind(this);
    this.setupDefaults = this.setupDefaults.bind(this);
  }

  setClickableImage() {
    fabric.Image.fromURL(this.props.imageUrl, img => {
      img.set({
        left: this.imgPosX,
        top: this.imgPosY,
        originX: 'center',
        originY: 'center',
        selectable: false,
        hoverCursor: 'pointer',
        perPixelTargetFind: true,
        targetFindTolerance: 4,
        hasControls: false,
        hasBorders: false,
      }).scale(0.8);
      if (this.clickable) {
        this.canvas.remove(this.clickable);
      }
      this.clickable = img;
      this.clickable.on('mousedown', () => {
        this.clickSound.currentTime = 0;
        this.clickSound.play();

        const startWidth = this.clickable.width;
        this.clickable.animate('width', startWidth + 10, {
          onChange: this.canvas.renderAll.bind(this.canvas),
          duration: 25,
          easing: fabric.util.ease.easeOutElastic,

          onComplete: () => {
            this.clickable.animate('width', startWidth, {
              onChange: this.canvas.renderAll.bind(this.canvas),
              duration: 25,
              easing: fabric.util.ease.easeOutElastic,
            });
          },
        });

        this.props.onClick();
      });

      this.canvas.add(this.clickable).renderAll();
    });
  }


  setupDefaults() {
    this.imgPosX = 80;
    this.imgPosY = 80;
    this.clickable = undefined;

    this.setClickableImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageUrl !== this.props.imageUrl) {
      this.setClickableImage();

      this.upgradeSound.currentTime = 0;
      this.upgradeSound.play();
    }
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas('click-canvas');

    this.clickSound = new Audio('sounds/clink.mp3');
    this.clickSound.volume = 0.3;

    this.upgradeSound = new Audio('sounds/voice-ka-ching.mp3');
    this.upgradeSound.volume = 0.7;

    this.setupDefaults();
  }

  render() {
    return (
      <canvas id="click-canvas" width="200" height="160" />
    );
  }
}

SimpleClickCanvas.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default SimpleClickCanvas;
