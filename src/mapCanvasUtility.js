var mapUtil = {
  stage: undefined,

  init: function() {
    this.stage = new createjs.Stage("map-canvas");
    
    var mapImage = new createjs.Bitmap("assets/map.gif");
    mapImage.x = 150;
    mapImage.y = 0;

    this.stage.addChild(mapImage);
    createjs.Ticker.addEventListener("tick", this.stage);
  },

  addPin: function(x, y) {
    var pin = new createjs.Shape();
    pin.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5);
    pin.x = x;
    pin.y = y;

    this.stage.addChild(pin);
    this.stage.update();
  }
}

module.exports = mapUtil;