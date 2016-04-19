// Rebuild with fabric

class Map {
  constructor(canvasName) {
    console.log(createjs);
    console.log(createjs)
    this._stage = new createjs.Stage(canvasName);

    const mapImage = new createjs.Bitmap("images/map.gif");
    mapImage.x = 150;
    mapImage.y = 0;

    this._stage.addChild(mapImage);
    createjs.Ticker.addEventListener("tick", this._stage);
  }

  addPin(x, y) {
    const pin = new createjs.Shape();
    pin.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5);
    pin.x = x;
    pin.y = y;

    this._stage.addChild(pin);
    this._stage.update();
  }

  update() {
    this._stage.update();
  }
}

export default Map;