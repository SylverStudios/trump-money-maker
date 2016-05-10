import ImmutableAsset from './Models/ImmutableAsset';

const StateUtils = {
  PRICE_INCREASE_PERCENTAGE: 7,
  BASE_CLICK_INCOME: 1,

  initialState: function () {
    return {
      money: {
        cash: 0,
        total: 0,
      },
      assets: [
        new ImmutableAsset('Tenement', 0.1, 50, 1, 0),
        new ImmutableAsset('Hotel', 1, 150, 1, 0),
        new ImmutableAsset('Golf Course', 9, 750, 1, 0),
        new ImmutableAsset('Casino', 200, 2000, 1, 0),
        new ImmutableAsset('Trump Tower', 800, 5000, 1, 0),
        new ImmutableAsset('Trump Town', 2000, 20000, 1, 0),
        new ImmutableAsset('Trump City', 10000, 100000, 1, 0),
        new ImmutableAsset('Governership', 200000, 400000, 1, 0),
        new ImmutableAsset('Trump ISS', 999999, 9999999, 1, 0),
      ],
      news: [
        'a',
        'news',
        'item',
      ],
      mint: [],
      map: [],
      lastUpdate: 1462641080306
    };
  },
  
  createMoneyAfterIncome: function(state, currentTime) {
    const income = calculateIncomeSinceLastUpdate(state, currentTime);

    return updateMoney(state.money, income);
  },
  
  // TODO: Include the mint affect
  createMoneyAfterClick: function(state) {
    const moneyDelta = this.BASE_CLICK_INCOME;
    
    return updateMoney(state.money, moneyDelta);
  },

  createAssetsAfterBuy(assets, assetId) {
    const copyOfAssets = assets.slice();
    copyOfAssets[assetId] = buyAsset(assets[assetId]);
    return copyOfAssets;
  },

  createAssetsAfterUnlock(assets, assetId) {
    const copyOfAssets = assets.slice();
    copyOfAssets[assetId] = unlockAsset(assets[assetId]);
    return copyOfAssets;
  }
};

function unlockAsset (asset) {
  const fieldsToChange = { unlocked: true };
  return Object.assign({}, asset, fieldsToChange);
};

function buyAsset (asset) {
  const fieldsToChange = {
    price: asset.price * this.PRICE_INCREASE_PERCENTAGE,
    owned: asset.owned + 1
  };

  return Object.assign({}, asset, fieldsToChange);
};

function updateMoney (prevMoneyState, moneyDelta) {
  return {
    cash: prevMoneyState.cash + moneyDelta,
    total: prevMoneyState.total + moneyDelta,
  }
};

function calculateIncome (state) {
  return state.assets
      .map(function(asset) { return asset.baseIncome * asset.owned })
      .reduce(function(previous, current) { return previous + current; });
};

function calculateIncomeSinceLastUpdate (state, currentTime) {
  const secondDiff = (currentTime - state.lastUpdate) / 1000;

  return calculateIncome(state) * secondDiff;
};

export default StateUtils;