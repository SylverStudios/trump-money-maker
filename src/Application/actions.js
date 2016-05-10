export const CLICK_MONEY = 'CLICK_MONEY';
export const COLLECT_INCOME = 'COLLECT_INCOME';
export const BUY_ASSET = 'BUY_ASSET';
export const UNLOCK_ASSET = 'UNLOCK_ASSET';
export const UPGRADE_CURRENCY = 'UPGRADE_CURRENCY';

const createAction = {
  clickMoney: function() {
    return { type: CLICK_MONEY }
  },

  collectIncome: function() {
    return { type: COLLECT_INCOME, currentTime: new Date().getTime() }
  },

  unlockAsset: function(assetId) {
    return { type: UNLOCK_ASSET, id: assetId };
  },

  buyAsset: function(assetId) {
    return { type: BUY_ASSET, id: assetId }
  },

  upgradeCurrency: function(currencyId) {
    return { type: UPGRADE_CURRENCY, id: currencyId }
  }
};

export default createAction;
