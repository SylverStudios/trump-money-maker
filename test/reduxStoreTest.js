import createAction from '../src/Application/actions';

import { createStore } from 'redux'
import trumpMM from '../src/Application/reducers'
let reduxStore = createStore(trumpMM);


import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;


describe('reduxStore', function () {

  beforeEach(function() {
    reduxStore = createStore(trumpMM);
  });

  describe('Action: clickMoney ', function () {

    it('should increase the money after click act', function () {

      reduxStore.dispatch(createAction.clickMoney());
      reduxStore.dispatch(createAction.clickMoney());

      assert.equal(2, reduxStore.getState().money.cash);
    });

  });

  describe('Action: collectIncome ', function () {

    it('should update time field even if there is no income', function () {

      const originalState = reduxStore.getState();

      reduxStore.dispatch(createAction.collectIncome());
      reduxStore.dispatch(createAction.collectIncome());

      expect(originalState.lastUpdate).to.not.equal(reduxStore.getState().lastUpdate);
    });

    it('should update cash if there is income', function () {

      const originalState = reduxStore.getState();

      reduxStore.dispatch(createAction.buyAsset(2));
      reduxStore.dispatch(createAction.collectIncome());
      reduxStore.dispatch(createAction.collectIncome());
      reduxStore.dispatch(createAction.collectIncome());
      reduxStore.dispatch(createAction.collectIncome());
      reduxStore.dispatch(createAction.collectIncome());

      expect(originalState.money.cash).to.not.equal(reduxStore.getState().money.cash);
    });

  });

  describe('Action: buyAsset ', function () {
    
    it('should update the number of owned assets', function () {
      reduxStore.dispatch(createAction.buyAsset(2));
      reduxStore.dispatch(createAction.buyAsset(3));
      reduxStore.dispatch(createAction.buyAsset(3));
      reduxStore.dispatch(createAction.buyAsset(0));

      const state = reduxStore.getState();

      assert.equal(state.assets[0].owned, 1);
      assert.equal(state.assets[1].owned, 0);
      assert.equal(state.assets[2].owned, 1);
      assert.equal(state.assets[3].owned, 2);
      assert.equal(state.assets[4].owned, 0);
    });

  });

});
