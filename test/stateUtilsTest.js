import StateUtils from '../src/Application/Redux/StateUtils';

import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

// let assert = require('assert');
// let mocha = require('mocha');

const modifiedState = StateUtils.getInitialState();
modifiedState.money.cash++;
modifiedState.money.total++;
modifiedState.assets = StateUtils.createAssetsAfterBuy(modifiedState.assets, 2);


// End Setup

// Tests
describe('StateUtils', function () {

// UTILS
  describe('nextAssetIdToUnlock()', function () {

    it('should the ID the locked asset with the lowest ID', function () {
      const state = StateUtils.getInitialState();
      state.assets[0].unlocked = true;
      assert.equal(1, StateUtils.nextAssetIdToUnlock(state));
    });

    it('should the ID the locked asset with the lowest ID even if array is out of order', function () {
      const state = StateUtils.getInitialState();
      state.assets[0].unlocked = true;
      state.assets[1].unlocked = true;
      state.assets[3].unlocked = true;

      assert.equal(2, StateUtils.nextAssetIdToUnlock(state));
    });
  });

  describe('canBuy()', function () {

    it('should return true if you can afford to buy the asset', function () {
      const state = StateUtils.getInitialState();
      state.money.cash = 100;
      assert(StateUtils.canBuy(state, 0), 'can afford a tenement');
    });

    it('should return false if you can\'t afford to buy the asset', function () {
      const state = StateUtils.getInitialState();
      state.money.cash = 100;
      assert(!StateUtils.canBuy(state, 4), 'can\t afford something more expensive');
    });

  });

// MONEY
  describe('createMoneyAfterIncome()', function () {

    it('should create a new identical money object if no income', function () {
      const state = StateUtils.getInitialState();
      assert.equal(state.money.cash, StateUtils.createMoneyAfterIncome(state, new Date().getTime()).cash);
    });

    // TODO: Change calc income to use income on state, and only recalculate it when something is bought
    it('should add 1 cash after 1 second of 1 income', function () {
      const state = StateUtils.getInitialState();
      state.assets[1].owned = 1;
      const oneSecondLater = state.lastUpdate + 1000;
      const newMoney = StateUtils.createMoneyAfterIncome(state, oneSecondLater);

      assert.equal(state.money.cash + 1, newMoney.cash);
    });

    it('should leave the original state unchanged', function () {
      const state = StateUtils.getInitialState();
      const copyOfState = Object.assign({}, state);

      state.assets[1].owned = 10;
      const oneSecondLater = state.lastUpdate + 1000;
      const newMoney = StateUtils.createMoneyAfterIncome(state, oneSecondLater);

      assert(state.money.cash !== newMoney.cash, 'cash has changed');
      assert(state.money.cash === copyOfState.money.cash, 'original has not');
    });
  });

  describe('createMoneyAfterClick()', function () {

    it('should create a new  money object with more cash and total, but same income', function () {
      const state = StateUtils.getInitialState();
      const newMoney = StateUtils.createMoneyAfterClick(state);

      assert.equal(state.money.cash + 1, newMoney.cash);
      assert.equal(state.money.total + 1, newMoney.total);
      assert.equal(state.money.income, newMoney.income);
    });

    it('should leave the original state unchanged', function () {
      const state = StateUtils.getInitialState();
      const copyOfState = Object.assign({}, state);
      const newMoney = StateUtils.createMoneyAfterClick(state);

      assert(state.money.cash !== newMoney.cash, 'cash has changed');
      assert(state.money.cash === copyOfState.money.cash, 'original has not');
    });
  });

  describe('createMoneyAfterBuy()', function () {
    it('should decrease cash, but not total', function () {
      const state = StateUtils.getInitialState();
      state.money.cash =1000 * 5;
      const newMoney = StateUtils.createMoneyAfterBuy(state, 0);

      const priceOfAsset = state.assets[0].price;

      assert.equal(state.money.cash - priceOfAsset, newMoney.cash);
      assert.equal(state.money.total, newMoney.total);
    });
  });

// ASSETS
  describe('createAssetsAfterBuy()', function () {

    it('should update the asset\'s owned and price fields, but not the original state', function () {
      const state = StateUtils.getInitialState();
      const copyOfState = Object.assign({}, state);

      state.money.cash =1000 * 5;
      const newAssets = StateUtils.createAssetsAfterBuy(state.assets, 0);


      assert(state.assets[0].owned === copyOfState.assets[0].owned, 'number of owned has not changed');
      assert(state.assets[0].price === copyOfState.assets[0].price, 'original state has not changed');
      assert(newAssets[0].owned !== copyOfState.assets[0].owned, 'number of owned has increased');
      assert(newAssets[0].owned !== copyOfState.assets[0].price, 'number of owned has increased');
    });
  });

  describe('createAssetsAfterUnlock()', function () {
    it('should update the asset\'s owned and price fields, but not the original state', function () {
      const state = StateUtils.getInitialState();
      const copyOfState = Object.assign({}, state);
      const newAssets = StateUtils.createAssetsAfterUnlock(state.assets, 0);

      assert(state.assets[0].unlocked === copyOfState.assets[0].unlocked, 'original state has not changed');
      assert(newAssets[0].unlocked !== copyOfState.assets[0].unlocked, 'new state has unlocked asset');
    });
  });

// NEWS
  describe('createNewsAfterBroadcast()', function () {
    it('should add a new article without altering original state', function () {
      const state = StateUtils.getInitialState();
      const copyOfState = Object.assign({}, state);

      const article = 'fake news';
      const newNews = StateUtils.createNewsAfterBroadcast(state.news, article);

      assert.deepEqual(state.news, copyOfState.news);
      assert(newNews.length === 1);
      assert(newNews[0] === article);
    });

    it('should work like queue with a max of 10', function () {
      let state = StateUtils.getInitialState();

      for (let i of new Array(13).keys()) {
        state = Object.assign({},
            state,
            {
              news: StateUtils.createNewsAfterBroadcast(state.news, i),
            },
        );
      }

      const finalNews = StateUtils.createNewsAfterBroadcast(state.news, 'last one');

      assert(finalNews.length === 10);
      assert(finalNews[9] === 'last one');
    });
  });
});