export const CLICK_MONEY = 'CLICK_MONEY';
export const COLLECT_INCOME = 'COLLECT_INCOME';
export const BUY_ASSET = 'BUY_ASSET';
export const UPGRADE_CURRENCY = 'UPGRADE_CURRENCY';

const createAction = {
  clickMoney: function() {
    return { type: CLICK_MONEY }
  },

  collectIncome: function() {
    return { type: COLLECT_INCOME, currentTime: new Date().getTime() }
  },

  buyAsset: function(assetId) {
    return { type: BUY_ASSET, id: assetId }
  },

  upgradeCurrency: function(currencyId) {
    return { type: UPGRADE_CURRENCY, id: currencyId }
  }
};

export default createAction;
