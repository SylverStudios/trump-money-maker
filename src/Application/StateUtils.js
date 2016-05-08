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
      news: {
        allOfIt: ['a', 'news', 'item'],
      },
      mint: {
        upgrades: [],
      },
      map: {
        pins: {},
      },
      lastUpdate: 1462641080306
    };
  },

  calculateIncome: function(state) {
    return state.assets
        .map(function(ImmutableAsset) { return ImmutableAsset.baseIncome * ImmutableAsset.owned })
        .reduce(function(previous, current) { return previous + current; });
  },

  calculateIncomeSinceLastUpdate: function(state, currentTime) {
    const secondDiff = (currentTime - state.lastUpdate) / 1000;

    return this.calculateIncome(state) * secondDiff;
  },

  createMoneyState: function(prevMoneyState, moneyDelta) {
    return {
      cash: prevMoneyState.cash + moneyDelta,
      total: prevMoneyState.total + moneyDelta,
    }
  },
  
  // TODO: Include the mint affect
  createMoneyAfterClick: function(state) {
    const moneyDelta = this.BASE_CLICK_INCOME;
    
    return this.createMoneyState(state.money, moneyDelta);
  },
  
  buyAsset: function(immutableAsset) {
    const fieldsToChange = {
      price: immutableAsset.price * this.PRICE_INCREASE_PERCENTAGE,
      owned: immutableAsset.owned + 1
    };

    return Object.assign({}, immutableAsset, fieldsToChange);
  },

  createAssetsAfterBuy(assets, assetId) {
    const copyOfAssets = assets.slice();
    copyOfAssets[assetId] = this.buyAsset(assets[assetId]);
    return copyOfAssets;
  }

};

export default StateUtils;