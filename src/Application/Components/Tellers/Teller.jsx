import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// these constants need to be synced with spritesheet
const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 24;
const SPRITESHEET_NUM_SPRITES_PER_ROW = 4;

const FPS = 14;
const MILLIS_PER_FRAME = 1000 / FPS;
const NUM_FRAMES = 13;

class Teller extends Component {

  animate() {
    if (this.animating === true) {
      return;
    }
    this.animating = true;

    let frameIndex = 1;

    const animateNextFrame = () => {
      const spritesheetX = frameIndex % SPRITESHEET_NUM_SPRITES_PER_ROW;
      const spritesheetY = Math.trunc(frameIndex / SPRITESHEET_NUM_SPRITES_PER_ROW);
      this.context.clearRect(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
      this.context.drawImage(
        this.spritesheet,
        spritesheetX * SPRITE_WIDTH,
        spritesheetY * SPRITE_HEIGHT,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        0,
        0,
        SPRITE_WIDTH,
        SPRITE_HEIGHT
      );
      frameIndex++;
      if (frameIndex < NUM_FRAMES) {
        setTimeout(animateNextFrame, MILLIS_PER_FRAME);
      } else {
        this.animating = false;
      }
    };

    animateNextFrame();
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    canvas.width = SPRITE_WIDTH;
    canvas.height = SPRITE_HEIGHT;

    const context = canvas.getContext('2d');
    this.context = context;

    const spritesheet = new Image();
    spritesheet.src = 'images/BankTellerSpritesheet.png';
    this.spritesheet = spritesheet;

    context.drawImage(
      spritesheet,
      0,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      0,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
    );
  }

  render() {
    return (
      <canvas ref="canvas"/>
    );
  }
}

export default Teller;
