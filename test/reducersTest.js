import trumpMM from '../src/Application/Redux/reducers';
import StateUtils from '../src/Application/Redux/StateUtils';
import createAction from '../src/Application/Redux/actions';
import { COLLECT_INCOME } from '../src/Application/Redux/actions';
import Bank from '../src/Application/Models/Bank';
import { assert } from 'chai';

describe('reducers', function () {
  let initialState;
  let copyOfOriginalState;

  // Refresh the initial state and copy (happens before each even inside other describes)
  beforeEach(function () {
    initialState = StateUtils.getInitialState();
    copyOfOriginalState = Object.assign({}, initialState);
  });

  it('should return the initial state given no input state and no action', function () {
    const returnedState = trumpMM(undefined, '');
    assert.deepEqual(returnedState, initialState);
  });

  describe('Action: CLICK_MONEY', function () {
    it('should leave the original state unmodified', function () {
      trumpMM(initialState, createAction.clickMoney());

      assert.deepEqual(initialState, copyOfOriginalState);
      assert.equal(initialState.bank.cash, copyOfOriginalState.bank.cash);
    });

    it('should return a state with correctly increased cash after a CLICK_MONEY action', function () {
      const returnedState = trumpMM(initialState, createAction.clickMoney());

      assert.equal(returnedState.bank.cash,
        initialState.bank.cash + initialState.mint.currentDenomination.incomePerClick);
    });
  });

  describe('Action: COLLECT_INCOME', function () {
    it('should leave the original state unmodified', function () {
      const oneSecondLater = initialState.bank.lastRent + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      trumpMM(initialState, collectIncomeAction);

      assert.deepEqual(initialState, copyOfOriginalState);
      assert.equal(initialState.bank.cash, copyOfOriginalState.bank.cash);
    });

    it('should return a state with updated bank.lastRent field', function () {
      const oneSecondLater = initialState.bank.lastRent + 1000;
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime: oneSecondLater };

      const returnedState = trumpMM(initialState, collectIncomeAction);

      assert.equal(returnedState.bank.cash, initialState.bank.cash);
      assert.equal(returnedState.bank.lastRent, oneSecondLater);
    });

    it('should return a state with updated cash and total fields', function () {
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

      assert(returnedState.bank.cash, initialState.bank.cash + expectedIncome);
      assert(returnedState.bank.total, initialState.bank.total + expectedIncome);
    });
  });

  describe('Action: BUY_ASSET', function () {
    it('should leave the original state unmodified', function () {
      trumpMM(initialState, createAction.buyAsset(2));

      assert.deepEqual(initialState, copyOfOriginalState);
      assert.equal(initialState.broker.getAssetById(2).numOwned, 0);
    });

    it('should return a new state with updated asset list', function () {
      initialState.bank = new Bank(1000 * 100, 0, 0, initialState.bank.lastRent);

      const returnedState = trumpMM(initialState, createAction.buyAsset(2));

      assert.equal(returnedState.broker.getAssetById(2).numOwned, 1);
    });
  });

  describe('Action: UPGRADE_DENOMINATION', function () {
    it('adds a news article', function () {
      const returnedState = trumpMM(initialState, createAction.upgradeDenomination());
      assert.equal(returnedState.news.articles.length, initialState.news.articles.length + 1);
    });
    describe('if there is insufficient cash', function () {
      it('leaves original mint and bank in place', function () {
        initialState.bank._cash = 0;
        const returnedState = trumpMM(initialState, createAction.upgradeDenomination());
        assert.equal(returnedState.bank, initialState.bank);
        assert.equal(returnedState.mint, initialState.mint);
      });
    });
    describe('if there is enough cash', function () {
      let returnedState;
      beforeEach(function () {
        initialState.bank._cash = 10;
        returnedState = trumpMM(initialState, createAction.upgradeDenomination());
      });
      it('removes the cost of mint next denomination from bank cash', function () {
        assert.equal(returnedState.bank.cash, 10 - initialState.mint.nextDenomination.priceToUnlock);
      });
      it('updates the mint current denomination to next denomination', function () {
        assert.equal(returnedState.mint.currentDenomination, initialState.mint.nextDenomination);
      });
    });
  });

  describe('Action: TOGGLE_STATS_VISIBILITY', function () {
    it('should return a new state with areStatsVisible bool reversed', function () {
      // areStatsVisible is initially set to false
      const returnedState = trumpMM(initialState, createAction.toggleStatsVisibility());

      assert.equal(returnedState.broker.areStatsVisible, true);
    });
  });
});
