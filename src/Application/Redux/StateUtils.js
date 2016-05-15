import Asset from './../Models/Asset';
import Broker from '../Models/Broker';
import News from '../Models/News';
import Bank from '../Models/Bank';

import { List } from 'immutable';

const StateUtils = {

  // TODO: fix this structure
  getInitialState: function () {

    return {
      bank: new Bank(44, 0, 44, 1462641080306),
      broker: new Broker([
        new Asset(0, 'Tenement', 0.1, 50, 1, 0, false),
        new Asset(1, 'Hotel', 1, 150, 1, 0, false),
        new Asset(2, 'Golf Course', 9, 750, 1, 0, false),
        new Asset(3, 'Casino', 200, 2000, 1, 0, false),
        new Asset(4, 'Trump Tower', 800, 5000, 1, 0, false),
        new Asset(5, 'Trump Town', 2000, 20000, 1, 0, false),
        new Asset(6, 'Trump City', 10000, 100000, 1, 0, false),
        new Asset(7, 'Governership', 200000, 400000, 1, 0, false),
        new Asset(8, 'Trump ISS', 999999, 9999999, 1, 0, false),
      ]),
      news: new News([]),
      mint: [],
      map: new List(),
    };
  },

  canBuy: function (state, assetId) {
    const assetToBuy = state.broker.getAssetById(assetId);
    return state.bank.cash >= assetToBuy.price;
  },

  
// TODO: Make the news stuff simple, because it should be
  createNewsAfterBuy: function (news, asset) {
    const article = `Trump bought a ${asset.name} today.`;
    return news.makeWithArticle(article);
  },

  createNewsAfterFailedBuy: function (news, asset) {
    const article = `Trump bounced a check for a ${asset.name} today.`;
    return news.makeWithArticle(article);
  },

  createNewsAfterUnlock: function (news, asset) {
    const article = `Trump rumored to be interested in the ${asset.name} market.`;
    return news.makeWithArticle(article);
  },

  createNewsAfterBroadcast: function (news, article) {
    return news.makeWithArticle(article);
  },
};

export default StateUtils;
