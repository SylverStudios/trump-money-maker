import {
  CLICK_MONEY,
  COLLECT_INCOME,
  BUY_ASSET,
  UPGRADE_DENOMINATION,
  BROADCAST_NEWS,
  DEPOSIT,
  TOGGLE_STATS_VISIBILITY,
  START_GAME,
  SHOW_MODAL,
  PURCHASE_TELLER,
} from './actions';
import StateUtils, { TELLER_COLLECTION_INTERVAL } from './StateUtils';
import broadcastManager from '../../util/broadcastManager';
import showVictoryModal from './reducers/showVictoryModal';
import purchaseTeller from './reducers/purchaseTeller';
import TellerState from '../Models/TellerState';

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({}, state,
        { bank: state.bank.deposit(state.mint.currentDenomination.incomePerClick) }
      );

    case DEPOSIT:
      return Object.assign({}, state,
          { bank: state.bank.deposit(action.amount) }
      );

    case COLLECT_INCOME:
      let newBank = state.bank.collectIncome(action.currentTime);

      // check for possible teller income
      let newTeller = state.teller;
      if (state.teller.numTellers) {
        const timeSinceLastTellerCollected = action.currentTime - state.teller.lastCollected;
        const collectionInterval = TELLER_COLLECTION_INTERVAL / state.teller.numTellers;
        const numCollections = Math.trunc(timeSinceLastTellerCollected / collectionInterval);
        if (numCollections >= 1) {
          newBank = state.bank.deposit(state.mint.currentDenomination.incomePerClick * numCollections);
          newTeller = new TellerState(newTeller.numTellers, newTeller.tellerPrice, action.currentTime);
        }
      }

      const lastIncomeCheck = state.bank.lastRent;
      const secondDiff = (action.currentTime - lastIncomeCheck) / 1000;
      let newBroker = state.broker.updateRevenue(secondDiff);

      // Unlock if you can
      if (newBank.cash >= state.broker.unlockGoal && state.broker.hasAssetsToUnlock) {
        const assetToUnlock = state.broker.nextAssetToUnlock;
        newBroker = state.broker.unlockAsset(assetToUnlock.id);
        const unlockBroadcast = broadcastManager.unlock(assetToUnlock);

        return Object.assign({}, state,
          {
            bank: newBank,
            news: state.news.addBroadcast(unlockBroadcast),
            broker: newBroker,
            teller: newTeller,
          },
        );
      }

      // Else just update money and time
      return Object.assign({}, state, { bank: newBank, broker: newBroker, teller: newTeller });

    case BROADCAST_NEWS:
      return Object.assign({}, state, { news: state.news.addBroadcast(action.article) });

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

      if (state.bank.cash >= assetToBuy.price && assetToBuy.id === 9) {
        // you win.
        return Object.assign({}, state,
          {
            modal: {
              modalType: showVictoryModal(state),
            },
          }
        );
      }

      if (state.bank.cash >= assetToBuy.price) {
        const buyBroadcast = broadcastManager.buySuccess(assetToBuy);
        const newBuyBroker = state.broker.buyAsset(action.id);
        const bankAfterBuy = state.bank
          .withdraw(assetToBuy.price)
          .updateIncome(newBuyBroker.netIncome);
        const newMapArray = Array.from(state.map);
        newMapArray.push(assetToBuy.name);

        return Object.assign({}, state,
          {
            broker: newBuyBroker,
            bank: bankAfterBuy,
            news: state.news.addBroadcast(buyBroadcast),
            map: newMapArray,
          }
        );
      }

      const bounceBroadcast = broadcastManager.buyFail(assetToBuy);
      return Object.assign({}, state, { news: state.news.addBroadcast(bounceBroadcast) });

    case UPGRADE_DENOMINATION:
      let successfulTransactionStateDelta;
      let upgradeBroadcast;
      const priceToUnlock = state.mint.nextDenomination.priceToUnlock;
      if (state.bank.cash >= priceToUnlock) {
        successfulTransactionStateDelta = {
          mint: state.mint.toNextDenomination,
          bank: state.bank.withdraw(priceToUnlock),
        };
        upgradeBroadcast = broadcastManager.upgradeDenomSuccess();
      } else {
        upgradeBroadcast = broadcastManager.upgradeDenomFail();
      }
      return Object.assign(
        {},
        state,
        successfulTransactionStateDelta,
        { news: state.news.addBroadcast(upgradeBroadcast) }
      );

    case PURCHASE_TELLER:
      return purchaseTeller(state);

    case TOGGLE_STATS_VISIBILITY:
      return Object.assign({}, state,
          { broker: state.broker.toggleStatsVisibility() }
      );

    case SHOW_MODAL:
      return Object.assign({}, state,
        {
          modal: {
            modalType: action.modalType,
          },
        }
      );

    case START_GAME:
      return Object.assign({}, StateUtils.getInitialState(),
        {
          modal: {
            modalType: null,
          },
          startTime: new Date().getTime(),
        }

      );

    default:
      return state;
  }
}

export default trumpMM;
