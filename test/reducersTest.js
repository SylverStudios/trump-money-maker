import trumpMM from '../src/Application/Redux/reducers';
import StateUtils from '../src/Application/Redux/StateUtils';
import createAction from '../src/Application/Redux/actions';
import { COLLECT_INCOME } from '../src/Application/Redux/actions';
import Bank from '../src/Application/Models/Bank';

import chai from 'chai';
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
      expect(initialState).to.have.deep.property('bank.cash').that.equals(copyOfOriginalState.bank.cash);
    });

    it('should return a state with 1 more money after a CLICK_MONEY action', function () {
      const initialState = StateUtils.getInitialState();

      const returnedState = trumpMM(initialState, createAction.clickMoney());

      expect(returnedState).to.have.deep.property('bank.cash').that.equals(initialState.bank.cash + 1);
    });

  });

  describe('Action: COLLECT_INCOME', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.getInitialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      const oneSecondLater = initialState.bank.lastRent + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      trumpMM(initialState, collectIncomeAction);

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState).to.have.deep.property('bank.cash').that.equals(copyOfOriginalState.bank.cash);
    });

    it('should return a state with updated bank.lastRent field', function () {
      const initialState = StateUtils.getInitialState();

      const oneSecondLater = initialState.bank.lastRent + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      const returnedState = trumpMM(initialState, collectIncomeAction);

      expect(returnedState).to.have.deep.property('bank.cash').that.equals(initialState.bank.cash);
      expect(returnedState).to.have.deep.property('bank.lastRent').that.equals(oneSecondLater);
    });

    it('should return a state updated cash and total fields', function () {
      const initialState = StateUtils.getInitialState();
      initialState.bank = new Bank(
          initialState.bank.cash,
          initialState.bank.income + 1,
          initialState.bank.total,
          initialState.bank.lastRent
      );

      const expectedIncome = initialState.bank.income;

      const oneSecondLater = initialState.bank.lastRent + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      const returnedState = trumpMM(initialState, collectIncomeAction);

      expect(returnedState).to.have.deep.property('bank.cash', initialState.bank.cash + expectedIncome);
      expect(returnedState).to.have.deep.property('bank.total', initialState.bank.total + expectedIncome);
    });

  });

  describe('Action: BUY_ASSET', function () {

    it('should leave the original state unmodified', function () {
      const initialState = StateUtils.getInitialState();
      const copyOfOriginalState = Object.assign({}, initialState);

      trumpMM(initialState, createAction.buyAsset(2));

      expect(initialState).to.deep.equal(copyOfOriginalState);
      expect(initialState.broker.getAssetById(2)).to.have.deep.property('owned').that.equals(0);
    });

    it('should return a new state with updated asset list', function () {
      const initialState = StateUtils.getInitialState();
      initialState.bank = new Bank(1000 * 100, 0, 0, initialState.bank.lastRent);

      const returnedState = trumpMM(initialState, createAction.buyAsset(2));

      // const asset = returnedState.broker.getAssetById(2);

      expect(returnedState.broker.getAssetById(2)).to.have.property('owned').that.equals(1);
    });

  });

});