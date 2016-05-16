import { CLICK_MONEY, COLLECT_INCOME, BUY_ASSET, UPGRADE_CURRENCY, BROADCAST_NEWS } from './actions';
import StateUtils from './StateUtils';

const BASE_CLICK_INCOME = 1;

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({}, state,
        { bank: state.bank.deposit(BASE_CLICK_INCOME) }
      );

    case COLLECT_INCOME:
      const newBank = state.bank.collectIncome(action.currentTime);

      // Unlock if you can
      if (newBank.cash >= state.broker.unlockGoal) {
        const assetToUnlock = state.broker.nextAssetToUnlock;
        const newBroker = state.broker.unlockAsset(assetToUnlock.id);
        const unlockArticle = `Trump rumored to be interested in the ${assetToUnlock.name} market.`;

        return Object.assign({}, state,
          {
            bank: newBank,
            news: state.news.addArticle(unlockArticle),
            broker: newBroker,
          },
        );
      }

      // Else just update money and time
      return Object.assign({}, state, { bank: newBank });

    case BROADCAST_NEWS:
      return Object.assign({}, state, { news: state.news.addArticle(action.article) });

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

      if (state.bank.cash >= assetToBuy.price) {
        const buyArticle = `Trump bought a ${assetToBuy.name} today.`;
        const newBroker = state.broker.buyAsset(action.id);
        const bankAfterBuy = state.bank.withdraw(assetToBuy.price, newBroker.netIncome);

        return Object.assign({}, state,
          {
            broker: newBroker,
            bank: bankAfterBuy,
            news: state.news.addArticle(buyArticle),
          }
        );
      }

      const bounceArticle = `Trump bounced a check for a ${assetToBuy.name} today.`;
      return Object.assign({}, state, { news: state.news.addArticle(bounceArticle) });

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
