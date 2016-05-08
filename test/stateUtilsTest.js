import StateUtils from '../src/Application/StateUtils';

import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

// let assert = require('assert');
// let mocha = require('mocha');

const modifiedState = StateUtils.initialState();
modifiedState.money.cash++;
modifiedState.money.total++;
modifiedState.assets = StateUtils.createAssetsAfterBuy(modifiedState.assets, 2);


// End Setup

// Tests

describe('StateUtils', function () {

  describe('calculateIncome()', function () {

    it('should calculate the expected income based off of the initial state', function () {
      const state = StateUtils.initialState();
      assert.equal(0, StateUtils.calculateIncome(state));
    });

    it('should calculate the expected income based off of a modified state', function () {
      assert.equal(9, StateUtils.calculateIncome(modifiedState));
    });
  });



  describe('calculateIncomeSinceLastUpdate()', function () {

    it('should not change if there is no income', function () {
      const state = StateUtils.initialState();
      const updateAfter10ms = state.lastUpdate + 10;

      assert.equal(0, StateUtils.calculateIncomeSinceLastUpdate(state, updateAfter10ms));
    });

    it('should calculate different amounts after different amounts of time', function () {
      const updateAfter1s = modifiedState.lastUpdate + 1000;
      const updateAfter2s = modifiedState.lastUpdate + 2000;

      assert.equal(9, StateUtils.calculateIncomeSinceLastUpdate(modifiedState, updateAfter1s));
      assert.equal(18, StateUtils.calculateIncomeSinceLastUpdate(modifiedState, updateAfter2s));
    });

  });



  describe('createMoney()', function () {

    it('should not change if there is no delta', function () {
      const state = StateUtils.initialState();
      const income = 0;
      const moneyState = StateUtils.createMoneyState(state.money, income);

      expect(state.money).to.deep.equal(moneyState);
    });

    it('should change if there is positive delta', function () {
      const state = StateUtils.initialState();
      const income = 50;
      const moneyState = StateUtils.createMoneyState(state.money, income);

      assert.equal(income, moneyState.cash);
    });

    it('should change if there is negative delta', function () {
      const state = StateUtils.initialState();
      const income = -50;
      const moneyState = StateUtils.createMoneyState(state.money, income);

      assert.equal(income, moneyState.cash);
    });

  });


  describe('createAssetsAfterBuy(assets, assetId)', function () {

    it('should return a new object and leave the initial unmodified', function () {
      const state = StateUtils.initialState();
      const copyOfOriginalAssets = state.assets.slice();

      const newAssets = StateUtils.createAssetsAfterBuy(state.assets, 2);

      assert.equal(state.assets[2].owned, 0);
      assert.equal(newAssets[2].owned, 1);
      expect(state.assets[2]).to.deep.equal(copyOfOriginalAssets[2]);
    });

  });


});