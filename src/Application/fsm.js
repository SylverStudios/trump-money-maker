import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY} from './actions';
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
      const income = StateUtils.calculateIncomeSinceLastUpdate(state, action.currentTime);

      return Object.assign({},
          state,
          {
            lastUpdate: action.currentTime,
            money: StateUtils.createMoneyState(state.money, income),
          },
      );
      
    case BUY_ASSET:
      const newAssets = StateUtils.createAssetsAfterBuy(state.assets, action.assetId);

      return Object.assign({}, state, { assets: newAssets });

    case UPGRADE_CURRENCY:
      // Same as above for currency
      return Object.assign({}, state);

    default:
      return state
  }
}

export default trumpMM;
