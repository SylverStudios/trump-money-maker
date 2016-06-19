import {
  CLICK_MONEY,
  COLLECT_INCOME,
  BUY_ASSET,
  UPGRADE_DENOMINATION,
  BROADCAST_NEWS,
  DEPOSIT,
} from './actions';
import StateUtils from './StateUtils';

const BASE_CLICK_INCOME = 1;

function trumpMM(state = StateUtils.getInitialState(), action) {
  switch (action.type) {

    case CLICK_MONEY:
      return Object.assign({}, state,
        { bank: state.bank.deposit(BASE_CLICK_INCOME) }
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
      return Object.assign({}, state, { bank: newBank, broker: newBroker });

    case BROADCAST_NEWS:
      return Object.assign({}, state, { news: state.news.addArticle(action.article) });

    case BUY_ASSET:
      const assetToBuy = state.broker.getAssetById(action.id);

      if (state.bank.cash >= assetToBuy.price) {
        const buyArticle = `Trump bought a ${assetToBuy.name} today.`;
        const newBuyBroker = state.broker.buyAsset(action.id);
        const bankAfterBuy = state.bank.withdraw(assetToBuy.price, newBuyBroker.netIncome);

        return Object.assign({}, state,
          {
            broker: newBuyBroker,
            bank: bankAfterBuy,
            news: state.news.addArticle(buyArticle),
          }
        );
      }

      const bounceArticle = `Trump bounced a check for a ${assetToBuy.name} today.`;
      return Object.assign({}, state, { news: state.news.addArticle(bounceArticle) });

    case UPGRADE_DENOMINATION:
      return Object.assign({}, state, { mint: state.mint.toNextDenomination });

    default:
      return state;
  }
}

export default trumpMM;
