import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY, BROADCAST_NEWS } from './actions';
import StateUtils from './StateUtils';

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({},
        state,
        {
          money: StateUtils.createMoneyAfterClick(state),
        }
      );

    // Decide if you should unlock anything
    case COLLECT_INCOME:
      const newMoney = StateUtils.createMoneyAfterIncome(state, action.currentTime);

      if (newMoney.cash >= state.nextUnlockAmount) {
        const idToUnlock = StateUtils.nextAssetIdToUnlock(state);
        const newUnlockAmount = state.assets[idToUnlock + 1].price * 0.77;

        return Object.assign({},
          state,
          {
            lastUpdate: action.currentTime,
            money: StateUtils.createMoneyAfterIncome(state, action.currentTime),
            news: StateUtils.createNewsAfterUnlock(state, idToUnlock),
            assets: StateUtils.createAssetsAfterUnlock(state.assets, idToUnlock),
            nextUnlockAmount: newUnlockAmount,
          },
        );
      }
      return Object.assign({},
        state,
        {
          lastUpdate: action.currentTime,
          money: newMoney,
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
      if (StateUtils.canBuy(state, action.id)) {
        return Object.assign({},
          state,
          {
            assets: StateUtils.createAssetsAfterBuy(state.assets, action.id),
            money: StateUtils.createMoneyAfterBuy(state, action.id),
            news: StateUtils.createNewsAfterBuy(state, action.id),
          }
        );
      }
      return Object.assign({},
        state,
        {
          news: StateUtils.createNewsAfterFailedBuy(state, action.id),
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
