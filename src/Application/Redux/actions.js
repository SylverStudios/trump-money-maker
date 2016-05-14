export const CLICK_MONEY = 'CLICK_MONEY';
export const COLLECT_INCOME = 'COLLECT_INCOME';
export const BUY_ASSET = 'BUY_ASSET';
export const UNLOCK_ASSET = 'UNLOCK_ASSET';
export const UPGRADE_CURRENCY = 'UPGRADE_CURRENCY';
export const BROADCAST_NEWS = 'BROADCAST_NEWS';

const createAction = {
  clickMoney: () => {
    return { type: CLICK_MONEY };
  },

  collectIncome: () => {
    return { type: COLLECT_INCOME, currentTime: new Date().getTime() };
  },

  unlockAsset: (assetId) => {
    return { type: UNLOCK_ASSET, id: assetId };
  },

  buyAsset: (assetId) => {
    return { type: BUY_ASSET, id: assetId };
  },

  upgradeCurrency: (currencyId) => {
    return { type: UPGRADE_CURRENCY, id: currencyId };
  },

  broadcastNews: (article) => {
    return { type: BROADCAST_NEWS, article: article };
  },
};

export default createAction;
