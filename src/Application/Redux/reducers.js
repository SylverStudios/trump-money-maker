import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY, BROADCAST_NEWS } from './actions';
import StateUtils from './StateUtils';

const BASE_CLICK_INCOME = 1;

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({}, state,
        { bank: state.bank.makeClick(BASE_CLICK_INCOME) }
      );

    case COLLECT_INCOME:
      const newBank = state.bank.makeRent(action.currentTime);

      // Unlock if you can
      if (newBank.cash >= state.broker.unlockGoal) {
        const assetToUnlock = state.broker.nextAssetToUnlock;
        const newBroker = state.broker.makeUnlock(assetToUnlock.id);
        const unlockArticle = `Trump rumored to be interested in the ${assetToUnlock.name} market.`;

        return Object.assign({}, state,
          {
            bank: newBank,
            news: state.news.makeWithArticle(unlockArticle),
            broker: newBroker,
          },
        );
      }

      // Else just update money and time
      return Object.assign({}, state, { bank: newBank });

    case BROADCAST_NEWS:
      return Object.assign({}, state, { news: state.news.makeWithArticle(action.article) });

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

      if (state.bank.cash >= assetToBuy.price) {
        const buyArticle = `Trump bought a ${assetToBuy.name} today.`;
        const newBroker = state.broker.makeBuy(action.id);
        const bankAfterBuy = state.bank.makeBuy(assetToBuy.price, newBroker.netIncome);

        return Object.assign({}, state,
          {
            broker: newBroker,
            bank: bankAfterBuy,
            news: state.news.makeWithArticle(buyArticle),
          }
        );
      }

      const bounceArticle = `Trump bounced a check for a ${assetToBuy.name} today.`;
      return Object.assign({}, state, { news: state.news.makeWithArticle(bounceArticle) });

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
