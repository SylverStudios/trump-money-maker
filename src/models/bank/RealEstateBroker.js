import Asset from './Asset';

class RealEstateBroker {
  constructor() {
    this._tier = 0;
    this._assets = [
      new Asset('Tenement', 5, 50, 7),
      new Asset('Hotel', 7, 150, 6),
      new Asset('Golf Course', 50, 750, 7),
      new Asset('Casino', 200, 2000, 8),
      new Asset('Trump Tower', 800, 5000, 9),
      new Asset('Trump Town', 2000, 20000, 10),
      new Asset('Trump City', 10000, 100000, 11),
      new Asset('Governership', 200000, 4000000, 12),
      new Asset('Trump ISS', 999999, 10000000, 13),
    ];
  }

  get income() {
    let income = 0;
    for (const asset of this._assets) {
      income += asset.incomePerSecond;
    }
    return income;
  }

  get nextUpgradeAmount() {
    return this._assets[this._tier + 1].unlockRequirement;
  }

  get currentSale() {
    return this._assets[this._tier];
  }

  upgrade() {
    this._tier++;
  }
}

export default RealEstateBroker;
