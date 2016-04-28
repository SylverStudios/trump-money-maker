import MapZone from 'uiElements/MapZone';
import ClickZone from 'uiElements/ClickZone';
import NewsNetwork from 'uiElements/NewsNetwork';
import Store from 'uiElements/Store';

import Bank from 'models/Bank';
import funcLog from 'util/funcLog';

const newsRoom = new NewsNetwork('news-queue');
const clickZone = new ClickZone('click-canvas');
const myMap = new MapZone('map-canvas');
const myStore = new Store();
const bank = new Bank();

// 1000ms / 60fps = 20mspf
const FRAME_RATE = 20;
const ONE_MINUTE = 1000 * 60;

const storeOnClick = function (asset) {
  if (bank.buy(asset)) {
    myStore.updateAsset(asset);
    newsRoom.add('Trump bought a brand new ' + asset.name + '!');
  } else {
    newsRoom.add('Trump can\'t even afford a ' + asset.name + '!');
  }
};

const addNextAsset = function () {
  const asset = bank.bestAsset;
  myStore.addAssetToDom(asset, function () {
    storeOnClick(asset);
  });
};

const update = function () {
  bank.update();

  if (bank.canUpgrade) {
    bank.upgrade();
    addNextAsset();
  }

  clickZone.update(bank.cash, bank.income);
};

const init = function () {
  addNextAsset();
  myMap.addPin(200, 220);

  setInterval(update, FRAME_RATE);

  const clickable = clickZone.getClickable();
  clickable.on('mousedown', () => {
    bank.addClickIncome();
  });

  setInterval(function () {
    newsRoom.addRandomQuote();
  }, ONE_MINUTE);

  funcLog('Initialized everything!');
};

init();
