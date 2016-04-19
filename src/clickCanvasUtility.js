var clickCanvas = {
  stage: undefined,
  clickable: undefined,
  money: undefined,
  mps: undefined,

  init: function() {
    this.stage = new createjs.Stage("click-canvas");
    this.clickable = getDefaultClickable(300, 150);

    // Scoreboard (50,50)
    var x = 50;
    var y = 50;

    var moneyLabel = getMoneyLabel(x, y);
    this.money = getMoney(x+15, y);

    var mpsLabel = getMpsLabel(x, y+20);
    this.mps = getMps(x+115, y+20);

    this.stage.addChild(this.clickable);
    
    this.stage.addChild(moneyLabel);
    this.stage.addChild(this.money);
    
    this.stage.addChild(mpsLabel);
    this.stage.addChild(this.mps);

    createjs.Ticker.addEventListener("tick", this.stage);
  },

  setClickable: function(createjsShape) {
    this.clickable = createjsShape;
    this.stage.update();
  },

  update: function(money, mps) {
    this.money.text = Math.round(money);
    this.mps.text = Math.round(mps);
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

function getMoney(x, y) {
  var text = new createjs.Text("0", "20px Arial", "#00b200");
  text.x = x;
  text.y = y;
  text.textBaseline = "alphabetic";
  return text;
}

function getMps(x, y) {
  var text = new createjs.Text("0", "20px Arial", "#00b200");
  text.x = x;
  text.y = y;
  text.textBaseline = "alphabetic";
  return text;
}


function getMoneyLabel(x, y) {
  var text = new createjs.Text("$", "20px Arial", "#000");
  text.x = x;
  text.y = y;
  text.textBaseline = "alphabetic";
  return text;
}

function getMpsLabel(x, y) {
  var text = new createjs.Text("Per Second: ", "20px Arial", "#000");
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