var clickCanvas = {
  stage: undefined,
  clickable: getDefaultClickable(300, 150),
  scoreboard: getDefaultScoreboard(50, 50),

  init: function() {
    this.stage = new createjs.Stage("click-canvas");

    this.stage.addChild(this.clickable);
    this.stage.addChild(this.scoreboard);

    createjs.Ticker.addEventListener("tick", this.stage);
  },

  setClickable: function(createjsShape) {
    this.clickable = createjsShape;
    this.stage.update();
  },

  updateScore: function(score) {
    this.scoreboard.text = score;
    this.stage.update();
  },

  shakeClickable: function() {
    shake(this.clickable);
  }

}

function getDefaultClickable(x, y) {
  var toClick = new createjs.Shape();
  toClick.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  toClick.x = x;
  toClick.y = y;
  return toClick;
}

function getDefaultScoreboard(x, y) {
   var text = new createjs.Text("0", "20px Arial", "#ff7700");
   text.x = x;
   text.y = y;
   text.textBaseline = "alphabetic";
   return text;
}

function shake(createjsShape) {

  createjs.Tween.get(createjsShape, { loop: false })
    .to({ x: createjsShape.x+2 }, 50, createjs.Ease.getPowInOut(2))
    .to({ x: createjsShape.x-2 }, 50, createjs.Ease.getPowInOut(2))
    .to({ x: createjsShape.x }, 50, createjs.Ease.getPowInOut(2));
}

module.exports = clickCanvas;