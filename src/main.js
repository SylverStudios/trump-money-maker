import MapZone from 'uiElements/MapZone';
import ClickZone from 'uiElements/ClickZone';
import NewsNetwork from 'uiElements/NewsNetwork';
import Store from 'uiElements/Store';
import funcLog from 'util/funcLog';

import Bank from 'models/Bank';
const bank = new Bank();

const newsRoom = new NewsNetwork('news-queue');
const clickZone = new ClickZone('click-canvas', () => {bank.addClickIncome();});
const myMap = new MapZone('map-canvas');
const myStore = new Store('item-menu');

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

  setInterval(function () {
    newsRoom.addRandomQuote();
  }, ONE_MINUTE);

  funcLog('Initialized everything!');
};

init();
