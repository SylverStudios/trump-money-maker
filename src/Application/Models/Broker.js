import _ from 'underscore';

const UNLOCK_RATIO = 0.77;

class Broker {
  constructor(assets) {
    this._assets = assets;
    this._unlockGoal = this._calculateUnlock();
  }

  get netIncome() {
    return this._assets
        .map((asset) => asset.income)
        .reduce((previous, current) => previous + current);
  }

  get unlockGoal() {
    return this._unlockGoal;
  }

  get nextAssetToUnlock() {
    const lockedAssets = this._assets.filter((asset) => !asset.unlocked);
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
    return this._assets.filter((asset) => asset.unlocked);
  }

  _insertIntoNewBroker(newAsset, index) {
    const arrayCopy = this._assets.slice();
    arrayCopy[index] = newAsset;
    return new Broker(arrayCopy);
  }

  buyAsset(assetId) {
    const index = _.findIndex(this._assets, { id: assetId });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return new Broker(this._assets);
    }
    const newAsset = this._assets[index].buy();

    return this._insertIntoNewBroker(newAsset, index);
  }

  buyAssetByName(name) {
    const index = _.findIndex(this._assets, { name: name });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return new Broker(this._assets);
    }
    const newAsset = this._assets[index].buy();

    return this._insertIntoNewBroker(newAsset, index);
  }

  unlockAsset(assetId) {
    const index = _.findIndex(this._assets, { id: assetId });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return new Broker(this._assets);
    }
    const newAsset = this._assets[index].unlock();

    return this._insertIntoNewBroker(newAsset, index);
  }

  unlockAssetByName(name) {
    const index = _.findIndex(this._assets, { name: name });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return new Broker(this._assets);
    }
    const newAsset = this._assets[index].unlock();

    return this._insertIntoNewBroker(newAsset, index);
  }
}

export default Broker;
