import _ from 'underscore';

const UNLOCK_RATIO = 0.77;

class Broker {
  constructor(assets, areStatsVisible = false) {
    this._assets = assets;
    this._unlockGoal = this._calculateUnlock();
    this._areStatsVisible = areStatsVisible;
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

  get areStatsVisible() {
    return this._areStatsVisible;
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
    return new Broker(arrayCopy, this._areStatsVisible);
  }

  buyAsset(assetId) {
    const index = _.findIndex(this._assets, { id: assetId });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return this;
    }
    const newAsset = this._assets[index].buy();

    return this._insertIntoNewBroker(newAsset, index);
  }

  buyAssetByName(name) {
    const index = _.findIndex(this._assets, { name: name });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return this;
    }
    const newAsset = this._assets[index].buy();

    return this._insertIntoNewBroker(newAsset, index);
  }

  unlockAsset(assetId) {
    const index = _.findIndex(this._assets, { id: assetId });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return this;
    }
    const newAsset = this._assets[index].unlock();

    return this._insertIntoNewBroker(newAsset, index);
  }

  unlockAssetByName(name) {
    const index = _.findIndex(this._assets, { name: name });
    if (index === -1) {
      // Return the original broker, but this is not good.
      return this;
    }
    const newAsset = this._assets[index].unlock();

    return this._insertIntoNewBroker(newAsset, index);
  }

  updateRevenue(timeDifferenceInSeconds) {
    const newAssets = this._assets.map(asset => {
      const income = asset.income * timeDifferenceInSeconds;
      return asset.addRevenue(income);
    });
    return new Broker(newAssets, this._areStatsVisible);
  }

  toggleStatsVisibility() {
    const areStatsVisible = !this._areStatsVisible;
    return new Broker(this._assets, areStatsVisible);
  }
}

export default Broker;
