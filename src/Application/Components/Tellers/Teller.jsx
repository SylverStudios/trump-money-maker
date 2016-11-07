import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// these constants need to be synced with spritesheet
const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 24;

class Teller extends Component {

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    canvas.width = SPRITE_WIDTH;
    canvas.height = SPRITE_HEIGHT;
    const context = canvas.getContext('2d');
    this.context = context;
    const spritesheet = new Image();
    spritesheet.src = 'images/BankTellerSpritesheet.png';
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
