import Map from 'models/Map';
import Store from 'store/Store';
import Asset from 'models/Asset';
import NewsNetwork from 'models/NewsNetwork';
import funcLog from 'util/funcLog';
import ClickZone from 'canvas/ClickZone';
import BankAccount from 'models/BankAccount';

const newsRoom = new NewsNetwork('news-queue');
const clickZone = new ClickZone('click-canvas');
const myMap = new Map('map-canvas');
const myStore = new Store();

const ONE_MINUTE = 1000 * 60;
const FRAME_RATE = 20;

const account = new BankAccount();

const assets = {
  tenements: new Asset('Tenement', 80, 50, 7),
  hotels: new Asset('Hotel', 7, 150, 6),
  golfCourses: new Asset('Golf Course', 50, 750, 7),
  casinos: new Asset('Casino', 200, 2000, 8),
  towers: new Asset('Trump Tower', 800, 5000, 9),
  towns: new Asset('Trump Town', 2000, 20000, 10),
  cities: new Asset('Trump City', 10000, 100000, 11),
  governs: new Asset('Governership', 200000, 4000000, 12),
  isses: new Asset('Trump ISS', 999999, 10000000, 13),
};


const attemptBuy = function(asset) {
  if (account.cash > asset.price) {
    account.withdraw(asset.price);
    asset.buy();
    myStore.updateAsset(asset);
    // clickZone.update(money.current, money.perSecond);

    newsRoom.add('Trump bought a brand new ' + asset.name + '!');
  } else {
    newsRoom.add('Trump can\'t even afford a ' + asset.name + '!');
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
    if (this._next.unlockRequirement && account.cash >= this._next.unlockRequirement) {
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
  account.directDeposit(addedProfit);
  storeManager.update();
  clickZone.update(account.cash, account.income);
};


var init = function() {
  storeManager.init();
  setInterval(update, FRAME_RATE);

  const clickable = clickZone.getClickable();
  clickable.on('mousedown', () => {
    console.log('yay');
  });

  setInterval(function() {
    newsRoom.addRandomQuote();
  }, ONE_MINUTE);

  setInterval(function() {
    account.deposit(1);
    myMap.addPin(10, 12);
  }, ONE_MINUTE / 10);
};

init();