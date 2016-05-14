import trumpMM from '../src/Application/Redux/reducers';
import StateUtils from '../src/Application/Redux/StateUtils';
import createAction from '../src/Application/Redux/actions';
import { COLLECT_INCOME } from '../src/Application/Redux/actions';
import _ from 'underscore';

import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

describe('reducers', function () {

  describe('general', function () {

    it('should return the initial state given no input state and no action', function () {
      const initialState = StateUtils.getInitialState();
      const returnedState = trumpMM(undefined, "");
      expect(returnedState).to.deep.equal(initialState);
    });

  });

  describe('Action: CLICK_MONEY', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.getInitialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.clickMoney());

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('money.cash').that.equals(copyOfOriginalState.money.cash);
    });

    it('should return a state with 1 more money after a CLICK_MONEY action', function () {
      const initialState = StateUtils.getInitialState();

      const returnedState = trumpMM(initialState, createAction.clickMoney());

      expect(returnedState).to.have.deep.property('money.cash').that.equals(initialState.money.cash + 1);
    });

  });

  describe('Action: COLLECT_INCOME', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.getInitialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      const oneSecondLater = initialState.lastUpdate + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      trumpMM(initialState, collectIncomeAction);

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('money.cash').that.equals(copyOfOriginalState.money.cash);
    });

    it('should return a state updated lastUpdate field', function () {
      const initialState = StateUtils.getInitialState();

      const oneSecondLater = initialState.lastUpdate + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      const returnedState = trumpMM(initialState, collectIncomeAction);

      expect(returnedState).to.have.deep.property('money.cash').that.equals(initialState.money.cash);
      expect(returnedState).to.have.property('lastUpdate').that.equals(oneSecondLater);
    });

    it('should return a state updated cash and total fields', function () {
      const initialState = StateUtils.getInitialState();
      initialState.assets[1].owned = 1;
      const expectedIncome = initialState.assets[1].baseIncome;

      const oneSecondLater = initialState.lastUpdate + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      const returnedState = trumpMM(initialState, collectIncomeAction);

      expect(returnedState).to.have.deep.property('money.cash', initialState.money.cash + expectedIncome);
      expect(returnedState).to.have.deep.property('money.total', initialState.money.cash + expectedIncome);
    });

  });

  describe('Action: BUY_ASSET', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.getInitialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.buyAsset(2));

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('assets[2].owned').that.equals(0);
    });

    it('should return a new state with updated asset list', function () {
      const initialState = StateUtils.getInitialState();
      initialState.money.cash = 1000 * 100;

      const returnedState = trumpMM(initialState, createAction.buyAsset(2));

      console.log(returnedState);

      const asset = _.findWhere(returnedState.assets, { id: 2 });

      expect(asset).to.have.property('owned').that.equals(1);
    });

  });

});