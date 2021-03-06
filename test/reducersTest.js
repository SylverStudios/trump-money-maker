import trumpMM from '../src/Application/Redux/reducers';
import StateUtils, { TELLER_COLLECTION_INTERVAL } from '../src/Application/Redux/StateUtils';
import createAction from '../src/Application/Redux/actions';
import { COLLECT_INCOME } from '../src/Application/Redux/actions';
import Bank from '../src/Application/Models/Bank';
import { assert } from 'chai';
import { modals } from '../src/util/constants';

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

    assert.deepEqual(returnedState.bank, initialState.bank);
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
    describe('collecting teller income', function () {
      const currentTime = Date.now();
      const collectIncomeAction = { type: COLLECT_INCOME, currentTime };
      beforeEach(function () {
        initialState.teller._numTellers = 1;
        initialState.bank._income = 0; // in order to isolate teller income gains
      });
      describe('when insufficient time has passed', function () {
        let returnedState;
        beforeEach(function () {
          initialState.teller._lastCollected = currentTime - TELLER_COLLECTION_INTERVAL + 5;
          returnedState = trumpMM(initialState, collectIncomeAction);
        });
        it('does not add teller income to bank', function () {
          assert.equal(returnedState.bank.cash, initialState.bank.cash);
        });
        it('does not reset teller lastCollected', function () {
          assert.equal(returnedState.teller.lastCollected, initialState.teller.lastCollected);
        });
      });
      describe('when one collection period has passed', function () {
        let returnedState;
        beforeEach(function () {
          initialState.teller._lastCollected = currentTime - TELLER_COLLECTION_INTERVAL - 5;
          returnedState = trumpMM(initialState, collectIncomeAction);
        });
        it('adds current click amount times numTellers to cash', function () {
          const newCash = initialState.bank.cash
                        + initialState.mint.currentDenomination.incomePerClick
                        * initialState.teller.numTellers;
          assert.equal(returnedState.bank.cash, newCash);
        });
        it('resets lastCollected', function () {
          assert.equal(returnedState.teller.lastCollected, currentTime);
        });
      });
      describe('when 2 collection periods have passed', function () {
        let returnedState;
        beforeEach(function () {
          initialState.teller._lastCollected = currentTime - TELLER_COLLECTION_INTERVAL * 2 - 5;
          returnedState = trumpMM(initialState, collectIncomeAction);
        });
        it('adds current click amount times numTellers to cash, twice', function () {
          const newCash = initialState.bank.cash
                        + initialState.mint.currentDenomination.incomePerClick
                        * initialState.teller.numTellers
                        * 2;
          assert.equal(returnedState.bank.cash, newCash);
        });
        it('resets lastCollected', function () {
          assert.equal(returnedState.teller.lastCollected, currentTime);
        });
      });
    });
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
      const maxBroadcasts = 4;
      const expectedBroadcasts = initialState.news.broadcasts.length + 1 >= maxBroadcasts ? maxBroadcasts : initialState.news.broadcasts.length + 1;
      assert.equal(returnedState.news.broadcasts.length, expectedBroadcasts);
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

  describe('Action: PURCHASE_TELLER', function () {
    describe('with insufficient cash', function () {
      it('returns an equal state', function () {
        assert.isBelow(initialState.bank.cash, initialState.teller.tellerPrice);
        const returnedState = trumpMM(initialState, createAction.purchaseTeller());
        assert.deepEqual(returnedState, initialState);
      });
    });
    describe('with sufficient cash', function () {
      let returnedState;
      beforeEach(function () {
        initialState.bank._cash = initialState.teller.tellerPrice + 10;
        returnedState = trumpMM(initialState, createAction.purchaseTeller());
      });
      it('should increase the number of tellers by one', function () {
        assert.equal(returnedState.teller.numTellers, initialState.teller.numTellers + 1);
      });
      it('should reduce the amount of cash by the purchase price', function () {
        assert.equal(returnedState.bank.cash, initialState.bank.cash - initialState.teller.tellerPrice);
      });
    });
  });

  describe('Action: SHOW_MODAL', function () {
    it('should return a new state with modal show set to yes and fields set appropriately', function () {
      const returnedState = trumpMM(initialState, createAction.showModal(modals.WELCOME));

      assert.deepEqual(returnedState.modal.modalType, modals.WELCOME);
    });
  });

  describe('Action: START_GAME', function () {
    it('should return a new state with closed modal and new start time', function () {
      const now = new Date().getTime();
      const returnedState = trumpMM(initialState, createAction.startGame());

      assert.equal(returnedState.modal.modalType, null);
      assert.isAtLeast(returnedState.startTime, now, 'Starttime is atleast 1 second ago.');
    });
  });
});
