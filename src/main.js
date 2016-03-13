var newsRoom = require('./newsManager');
var mapZone = require('./mapCanvasUtility');
var clickZone = require('./clickCanvasUtility');


var score = 0;

var assets = {
  tenaments: 0,
  hotels: 0,
  golfCourses: 0,
  casinos: 0,
  towers: 0,
  towns: 0,
  cities: 0,
  governs: 0,
  isses: 0
};

var tenament = {
  perSecond: 10,
  cost: 100,
  costIncrease: 5,
  modify: 1,
}


var buy = {
  tenament: function() {

  },

}

var buy = function() {
  newsRoom.add("First button clicked.");
}

var secondBtnAction = function() {
  newsRoom.add("Second button clicked.");
}

document.getElementById("btn-1").addEventListener("click", firstBtnAction);
document.getElementById("btn-2").addEventListener("click", secondBtnAction);




var handleClick = function() {
  score++;
  clickZone.shakeClickable();
  clickZone.updateScore(score);
}

var tallyScore = function() {

}


var init = function() {
  createjs.Ticker.setFPS(60);

  newsRoom.init();

  mapZone.init();

  clickZone.init();
  clickZone.clickable.addEventListener("click", handleClick);
}

init();