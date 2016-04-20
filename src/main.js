import Map from 'models/Map';
import Store from 'store/Store';
import Asset from 'models/Asset';
import NewsNetwork from 'models/NewsNetwork';
import funcLog from 'util/funcLog';
import ClickZone from 'canvas/ClickZone';

const newsRoom = new NewsNetwork('news-queue');
const clickZone = new ClickZone('click-canvas');
const myStore = new Store();

const ONE_MINUTE = 1000 * 60;
const FRAME_RATE = 20;

const money = {
  total: 0,
  current: 0,
  perSecond: 0,

  update: function(addedProfit) {
    // This expects to be called every 10 milliseconds
    this.total += addedProfit;
    this.current += addedProfit;
    this.perSecond = addedProfit*100;
  }
};

const assets = {
  tenements: new Asset('Tenement', 80, 50, 7),
  hotels: new Asset('Hotel', 7, 150, 6),
  golfCourses: new Asset('Golf Course', 50, 750, 7),
  casinos: new Asset('Casino', 200, 2000, 8),
  towers: new Asset('Trump Tower', 800, 5000, 9),
  towns: new Asset('Trump Town', 2000, 20000, 10),
  cities: new Asset('Trump City', 10000, 100000, 11),
  governs: new Asset('Governership', 200000, 4000000, 12),
  isses: new Asset('Trump ISS', 999999, 10000000, 13)
};


const attemptBuy = function(asset) {
  if (asset.price < money.current) {
    money.current -= asset.price;
    asset.buy();
    myStore.updateAsset(asset);
    // clickZone.update(money.current, money.perSecond);
    
    newsRoom.add("Trump bought a brand new "+asset.name+"!");
  } else {
    newsRoom.add("Trump can't even afford a "+asset.name+"!");
  }
};


const storeManager = {
  _tier: 0,
  _temporaryStupidArrayOfAssets: ['tenements', 'hotels', 'golfCourses', 'casinos', 'towers', 'towns', 'cities', 'governs', 'isses'],
  _next: undefined,

  unlockNextAsset: function() {
    const asset = this._next;
    myStore.addAssetToDom(asset, function() {
      attemptBuy(asset);
    });

    this._tier++;
    this._next = assets[this._temporaryStupidArrayOfAssets[this._tier]];
    funcLog('Next unlock amount is: ', this._next.unlockRequirement);
  },

  update: function() {
    if (this._next.unlockRequirement && money.current >= this._next.unlockRequirement) {
      this.unlockNextAsset();
    }
  },

  init: function() {
    this._next = assets[this._temporaryStupidArrayOfAssets[this._tier]];
    this.unlockNextAsset();
    this.unlockNextAsset();
  }
};

var getTickProfit = function() {
  var addedProfit = 0;

  for (var key in assets) {
    if (assets.hasOwnProperty(key)) {
      addedProfit += assets[key].profitPer10Milli;
    }
  }
  return addedProfit;
};

// Tally every 10 milli - Sends update to everything
var update = function() {
  var addedProfit = getTickProfit();
  money.update(addedProfit);
  storeManager.update();
  newsRoom.publish();
  clickZone.update(money.current, money.perSecond);
};


var init = function() {
  storeManager.init();
  setInterval(update, FRAME_RATE);

  setInterval(function() {
    newsRoom.addRandomQuote();
  }, ONE_MINUTE);


  setInterval(function() {
    money.current++;
  }, ONE_MINUTE/10);

  clickZone.testImage();


};

init();