import {
  CLICK_MONEY,
  COLLECT_INCOME,
  BUY_ASSET,
  UPGRADE_DENOMINATION,
  BROADCAST_NEWS,
  DEPOSIT,
  TOGGLE_STATS_VISIBILITY,
  SHOW_MODAL,
  HIDE_MODAL,
} from './actions';
import StateUtils from './StateUtils';
import broadcastManager from '../../util/broadcastManager';

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
      const newBank = state.bank.collectIncome(action.currentTime);

      const lastIncomeCheck = state.bank.lastRent;
      const secondDiff = (action.currentTime - lastIncomeCheck) / 1000;
      let newBroker = state.broker.updateRevenue(secondDiff);

      // Unlock if you can
      if (newBank.cash >= state.broker.unlockGoal) {
        const assetToUnlock = state.broker.nextAssetToUnlock;
        newBroker = state.broker.unlockAsset(assetToUnlock.id);
        const unlockBroadcast = broadcastManager.unlock(assetToUnlock);

        return Object.assign({}, state,
          {
            bank: newBank,
            news: state.news.addBroadcast(unlockBroadcast),
            broker: newBroker,
          },
        );
      }

      // Else just update money and time
      return Object.assign({}, state, { bank: newBank, broker: newBroker });

    case BROADCAST_NEWS:
      return Object.assign({}, state, { news: state.news.addBroadcast(action.article) });

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

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
      return Object.assign({}, state,
        successfulTransactionStateDelta,
        { news: state.news.addBroadcast(upgradeBroadcast) }
      );

    case TOGGLE_STATS_VISIBILITY:
      return Object.assign({}, state,
          { broker: state.broker.toggleStatsVisibility() }
      );

    case SHOW_MODAL:
      // show, title, body, onClose
      const { title, body, onClose } = action;

      return Object.assign({}, state,
        {
          modal: {
            show: true,
            title: title,
            body: body,
            onClose: onClose,
          },
        }
      );

    case HIDE_MODAL:
      return Object.assign({}, state,
        {
          modal: {
            show: false,
            title: null,
            body: null,
            onClose: null,
          },
        }
      );


    default:
      return state;
  }
}

export default trumpMM;
