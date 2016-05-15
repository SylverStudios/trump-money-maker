import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY, BROADCAST_NEWS } from './actions';
import StateUtils from './StateUtils';

const BASE_CLICK_INCOME = 1;

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({},
        state,
        {
          bank: state.bank.makeClick(BASE_CLICK_INCOME),
        }
      );

    // Decide if you should unlock anything
    case COLLECT_INCOME:
      const newBank = state.bank.makeRent(action.currentTime);

      // Unlock if you can
      if (newBank.cash >= state.broker.unlockGoal) {
        const assetToUnlock = state.broker.nextAssetToUnlock;
        const newBroker = state.broker.makeUnlock(assetToUnlock.id);

        return Object.assign({},
          state,
          {
            bank: newBank,
            news: StateUtils.createNewsAfterUnlock(state.news, assetToUnlock),
            broker: newBroker,
          },
        );
      }

      // Else just update money and time
      return Object.assign({},
        state,
        {
          bank: newBank,
        },
      );

    case BROADCAST_NEWS:
      return Object.assign({},
        state,
        {
          news: StateUtils.createNewsAfterBroadcast(state.news, action.article),
        }
      );

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

      if (StateUtils.canBuy(state, action.id)) {
        const newBroker = state.broker.makeBuy(action.id);
        const bankAfterBuy = state.bank.makeBuy(assetToBuy.price, newBroker.netIncome);

        return Object.assign({},
          state,
          {
            broker: newBroker,
            bank: bankAfterBuy,
            news: StateUtils.createNewsAfterBuy(state.news, assetToBuy),
          }
        );
      }
      return Object.assign({},
        state,
        {
          news: StateUtils.createNewsAfterFailedBuy(state.news, assetToBuy),
        }
      );

    // TODO: Actually make this work
    case UPGRADE_CURRENCY:
      // Same as above for currency
      return Object.assign({},
          state
      );

    default:
      return state;
  }
}

export default trumpMM;
