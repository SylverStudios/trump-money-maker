import trumpMM from '../src/Application/reducers';
import StateUtils from '../src/Application/StateUtils';
import createAction from '../src/Application/actions';

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

describe('fsm', function () {

  describe('general', function () {

    it('should return the initial state given no input state and no action', function () {
      const initialState = StateUtils.initialState();
      const returnedState = trumpMM(undefined, "");
      expect(returnedState).to.deep.equal(initialState);
    });

  });

  describe('Action: CLICK_MONEY', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.initialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.clickMoney());

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('money.cash').that.equals(0);
    });

    it('should return a state with 1 more money after a CLICK_MONEY action', function () {
      const initialState = StateUtils.initialState();

      const returnedState = trumpMM(initialState, createAction.clickMoney());

      expect(returnedState).to.have.deep.property('money.cash').that.equals(1);
    });

  });

  describe('Action: COLLECT_INCOME', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.initialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.collectIncome());

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('money.cash', 0);
    });

    it('should return a state updated lastUpdate field', function () {
      const initialState = StateUtils.initialState();

      const returnedState = trumpMM(initialState, createAction.collectIncome());

      expect(returnedState).to.have.deep.property('money.cash', 0);
      expect(returnedState).to.have.property('lastUpdate').that.not.equals(1462641080306);
    });

    it('should return a state updated cash and total fields', function () {

      // Overwrite the time by adding 1 sec to the initial time
      const collectAction = createAction.collectIncome();
      collectAction.currentTime = modifiedState.lastUpdate + 1000;

      const expectedMoney = modifiedState.money.cash + StateUtils.calculateIncome(modifiedState);

      const returnedState = trumpMM(modifiedState, collectAction);

      expect(returnedState).to.have.deep.property('money.cash', expectedMoney);
      expect(returnedState).to.have.deep.property('money.total', expectedMoney);
    });

  });

  describe('Action: BUY_ASSET', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.initialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.buyAsset(2));

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('assets[2].owned').that.equals(0);
    });

    it('should return a new state with updated asset list', function () {
      const initialState = StateUtils.initialState();

      const returnedState = trumpMM(initialState, createAction.buyAsset(2));

      expect(returnedState).to.have.deep.property('assets[2].owned').that.equals(1);
    });

  });

});