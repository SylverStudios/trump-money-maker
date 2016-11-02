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
      if (newBank.cash >= state.broker.unlockGoal && state.broker.hasAssetsToUnlock) {
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

      if (state.bank.cash >= assetToBuy.price && assetToBuy.id === 9) {
        // you win.
        const now = new Date();
        const devBestTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        const gameTime = new Date().getTime() - state.startTime;

        const hours = Math.floor(gameTime / 3600000); // 1 Hour = 36000 Milliseconds
        const minutes = Math.floor((gameTime % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
        const seconds = Math.floor(((gameTime % 360000) % 60000) / 1000);
        const humanReadable = `${hours}:${minutes}:${seconds}`;
        const body = `You just completely monopolized the United States!
                      Who cares about being president when you have your own
                      fucking ISS!
                      \n\n
                      It only took you ${humanReadable}
                      \n\n
                      Think you can go faster than the devs? The time to beat is ${devBestTime}`;
        return Object.assign({}, state,
          {
            modal: {
              show: true,
              title: 'Congratulations!',
              body: body,
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
      return Object.assign({}, state,
        successfulTransactionStateDelta,
        { news: state.news.addBroadcast(upgradeBroadcast) }
      );

    case PURCHASE_TELLER:
      return Object.assign({}, state, { teller: state.teller.withOneMoreTeller() });

    case TOGGLE_STATS_VISIBILITY:
      return Object.assign({}, state,
          { broker: state.broker.toggleStatsVisibility() }
      );

    case SHOW_MODAL:
      const { title, body } = action;

      return Object.assign({}, state,
        {
          modal: {
            show: true,
            title: title,
            body: body,
          },
        }
      );

    case START_GAME:
      return Object.assign({}, StateUtils.getInitialState(),
        {
          modal: {
            show: false,
            title: null,
            body: null,
            onClose: null,
          },
          startTime: new Date().getTime(),
        }

      );

    default:
      return state;
  }
}

export default trumpMM;
