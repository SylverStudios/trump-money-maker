import _ from 'underscore';

const PRICE_INCREASE_PERCENTAGE = 1.07;
const UNLOCK_RATIO = 0.77;

class Broker {
  constructor(assets) {
    this._assets = assets;
    this._unlockGoal = this._calculateUnlock();
  }
  
  get netIncome() {
    return this._assets
        .map((asset) => { return asset.baseIncome * asset.owned; })
        .reduce((previous, current) => { return previous + current; });
  }

  get unlockGoal() {
    return this._unlockGoal;
  }

  get nextAssetToUnlock() {
    const lockedAssets = this._assets.filter((asset) => { return !asset.unlocked; });
    const sortedById = _.sortBy(lockedAssets, 'id');
    return sortedById[0];
  }
  
  _calculateUnlock() {
    return this.nextAssetToUnlock.price * UNLOCK_RATIO;
  }

// By name or id since I think i'm going to move to id'd by name
  getAssetById(id) {
    return _.findWhere(this._assets, { id: id });
  }

  getAssetByName(name) {
    return _.findWhere(this._assets, { name: name });
  }

  get unlockedAssets() {
    return this._assets.filter((asset) => { return asset.unlocked });
  }

  makeBuy(assetId) {
    const asset = _.findWhere(this._assets, { id: assetId });
    const newAsset = asset.makeBuy(PRICE_INCREASE_PERCENTAGE);

    const arrayCopy = this._assets.slice();
    arrayCopy[asset.id] = newAsset;
    return new Broker(arrayCopy);
  }

  makeBuyName(name) {
    const asset = _.findWhere(this._assets, { name: name });
    const newAsset = asset.makeBuy(PRICE_INCREASE_PERCENTAGE);

    const arrayCopy = this._assets.slice();
    arrayCopy[asset.id] = newAsset;
    return new Broker(arrayCopy);
  }

  makeUnlock(assetId) {
    const asset = _.findWhere(this._assets, { id: assetId });
    const newAsset = asset.makeUnlock();

    const arrayCopy = this._assets.slice();
    arrayCopy[asset.id] = newAsset;
    return new Broker(arrayCopy);
  }

  makeUnlockName(name) {
    const asset = _.findWhere(this._assets, { name: name });
    const newAsset = asset.makeUnlock();

    const arrayCopy = this._assets.slice();
    arrayCopy[asset.id] = newAsset;
    return new Broker(arrayCopy);
  }
}

export default Broker;
