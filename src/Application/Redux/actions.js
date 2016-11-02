export const CLICK_MONEY = 'CLICK_MONEY';
export const COLLECT_INCOME = 'COLLECT_INCOME';
export const BUY_ASSET = 'BUY_ASSET';
export const UNLOCK_ASSET = 'UNLOCK_ASSET';
export const UPGRADE_DENOMINATION = 'UPGRADE_DENOMINATION';
export const BROADCAST_NEWS = 'BROADCAST_NEWS';
export const DEPOSIT = 'DEPOSIT';
export const TOGGLE_STATS_VISIBILITY = 'TOGGLE_STATS_VISIBILITY';
export const SHOW_MODAL = 'SHOW_MODAL';
export const START_GAME = 'START_GAME';
export const PURCHASE_TELLER = 'PURCHASE_TELLER';

const createAction = {
  deposit: (amount) => {
    return { type: DEPOSIT, amount: amount };
  },

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

  upgradeDenomination: () => {
    return { type: UPGRADE_DENOMINATION };
  },

  broadcastNews: (article) => {
    return { type: BROADCAST_NEWS, article: article };
  },

  toggleStatsVisibility: () => {
    return { type: TOGGLE_STATS_VISIBILITY };
  },

  startGame: () => {
    return { type: START_GAME };
  },

  showModal: (title, body) => {
    return { type: SHOW_MODAL, title: title, body: body };
  },

  purchaseTeller: () => {
    return { type: PURCHASE_TELLER };
  },

};

export default createAction;
