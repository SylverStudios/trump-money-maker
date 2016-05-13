import ImmutableAsset from './../Models/Asset';
import { List } from 'immutable';
import _ from 'underscore';

const PRICE_INCREASE_PERCENTAGE = 7;
const BASE_CLICK_INCOME = 1;

const createNews = (news, newArticle) => {
  const copyOfNews = news.slice();
  copyOfNews.push(newArticle);
  if (copyOfNews.length > 10) copyOfNews.shift();
  return copyOfNews;
};

const unlockAsset = (asset) => {
  return Object.assign({},
    asset,
    {
      unlocked: true,
    }
  );
};

const buyAsset = (asset) => {
  return Object.assign({},
    asset,
    {
      price: asset.price + (asset.price * PRICE_INCREASE_PERCENTAGE / 100),
      owned: asset.owned + 1,
    }
  );
};

const calculateIncome = (state) => {
  return state.assets
    .map((asset) => { return asset.baseIncome * asset.owned; })
    .reduce((previous, current) => { return previous + current; });
};

const calculateIncomeSinceLastUpdate = (income, lastUpdate, currentTime) => {
  const secondDiff = (currentTime - lastUpdate) / 1000;

  return income * secondDiff;
};

const StateUtils = {

  // TODO: fix this structure
  getInitialState: function () {
    return {
      money: {
        cash: 44,
        income: 0,
        total: 44,
      },
      assets: [
        new ImmutableAsset(0, 'Tenement', 0.1, 50, 1, 0, false),
        new ImmutableAsset(1, 'Hotel', 1, 150, 1, 0, false),
        new ImmutableAsset(2, 'Golf Course', 9, 750, 1, 0, false),
        new ImmutableAsset(3, 'Casino', 200, 2000, 1, 0, false),
        new ImmutableAsset(4, 'Trump Tower', 800, 5000, 1, 0, false),
        new ImmutableAsset(5, 'Trump Town', 2000, 20000, 1, 0, false),
        new ImmutableAsset(6, 'Trump City', 10000, 100000, 1, 0, false),
        new ImmutableAsset(7, 'Governership', 200000, 400000, 1, 0, false),
        new ImmutableAsset(8, 'Trump ISS', 999999, 9999999, 1, 0, false),
      ],
      news: [],
      mint: [],
      map: new List(),
      lastUpdate: 1462641080306,
      nextUnlockAmount: 50 * 0.77,
    };
  },

  nextAssetIdToUnlock: function (state) {
    const lockedAssets = state.assets.filter((asset) => { return !asset.unlocked; });
    const sortedById = _.sortBy(lockedAssets, 'id');
    return sortedById[0].id;
  },

  canBuy: function (state, assetId) {
    const assetToBuy = state.assets.filter((asset) => { return asset.id === assetId; })[0];
    return state.money.cash >= assetToBuy.price;
  },

  createMoneyAfterIncome: function (state, currentTime) {
    const income = calculateIncome(state);
    const moneyDelta = calculateIncomeSinceLastUpdate(income, state.lastUpdate, currentTime);

    return {
      cash: state.money.cash + moneyDelta,
      income: income,
      total: state.money.total + Math.abs(moneyDelta),
    };
  },

  // TODO: Include the mint affect
  createMoneyAfterClick: function (state) {
    const clickMoney = BASE_CLICK_INCOME;

    return Object.assign({},
      state.money,
      {
        cash: state.money.cash + clickMoney,
        total: state.money.total + Math.abs(clickMoney),
      }
    );
  },

  createMoneyAfterBuy: function (state, assetId) {
    const assetToBuy = state.assets.filter((asset) => { return asset.id === assetId; })[0];

    return Object.assign({},
      state.money,
      {
        cash: state.money.cash - assetToBuy.price,
      }
    );
  },

  // I chose to use filter instead of _.findwhere because
  // filters returns a new array, and IDK about findwhere
  createAssetsAfterBuy: function (assets, assetId) {
    const copyOfAssets = assets.slice();
    const assetToBuy = assets.filter((asset) => { return asset.id === assetId; })[0];
    copyOfAssets[assetId] = buyAsset(assetToBuy);
    return copyOfAssets;
  },

  createAssetsAfterUnlock: function (assets, assetId) {
    const copyOfAssets = assets.slice();
    const assetToUnlock = assets.filter((asset) => { return asset.id === assetId; })[0];
    copyOfAssets[assetId] = unlockAsset(assetToUnlock);
    return copyOfAssets;
  },

  createNewsAfterBuy: function (state, assetId) {
    const article = `Trump bought a ${state.assets[assetId].name} today.`;
    return createNews(state.news, article);
  },

  createNewsAfterFailedBuy: function (state, assetId) {
    const article = `Trump bounced a check for a ${state.assets[assetId].name} today.`;
    return createNews(state.news, article);
  },

  createNewsAfterUnlock: function (state, assetId) {
    const article = `Trump rumored to be interested in the ${state.assets[assetId].name} market.`;
    return createNews(state.news, article);
  },

  createNewsAfterBroadcast: function (news, article) {
    return createNews(news, article);
  },
};

export default StateUtils;
