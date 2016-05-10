import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY, UNLOCK_ASSET } from './actions';
import StateUtils from './StateUtils';

function trumpMM(state = StateUtils.initialState(), action) {
  switch (action.type) {
    
    case CLICK_MONEY:
      return Object.assign({},
          state,
          {
            money: StateUtils.createMoneyAfterClick(state),
          }
      );
    
    case COLLECT_INCOME:
      return Object.assign({},
          state,
          {
            lastUpdate: action.currentTime,
            money: StateUtils.createMoneyAfterIncome(state, action.currentTime),
          },
      );

    case UNLOCK_ASSET:
      const newAssets = StateUtils.createAssetsAfterUnlock(state.assets, action.id);

      return Object.assign({}, state, { assets: newAssets } );

      
    case BUY_ASSET:
      const newAssets = StateUtils.createAssetsAfterBuy(state.assets, action.id);

      return Object.assign({}, state, { assets: newAssets });

    // TODO: Actually make this work
    case UPGRADE_CURRENCY:
      // Same as above for currency
      return Object.assign({}, state);

    default:
      return state
  }
}

export default trumpMM;
