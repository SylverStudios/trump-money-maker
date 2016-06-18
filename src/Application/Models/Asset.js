import { assetDefaults } from './../../util/constants';

class Asset {
  constructor(name, price, multiplier = 1, owned = 0, unlocked = false, totalInvestment = 0, revenue = 0) {
    this._name = name;
    this._price = price;
    this._multiplier = multiplier;
    this._numOwned = owned;
    this._unlocked = unlocked;
    this._defaults = assetDefaults[name];
    this._totalInvestment = totalInvestment;
    this._revenue = revenue;
  }

  get id() {
    return this._defaults.id;
  }
  get name() {
    return this._name;
  }
  get baseIncome() {
    return this._defaults.baseIncome;
  }
  get price() {
    return this._price;
  }
  get multiplier() {
    return this._multiplier;
  }
  get numOwned() {
    return this._numOwned;
  }
  get unlocked() {
    return this._unlocked;
  }
  get income() {
    return this._numOwned * this._defaults.baseIncome * this._multiplier;
  }
  get totalInvestment() {
    return this._totalInvestment;
  }
  get revenue() {
    return this._revenue;
  }

  buy() {
    return new Asset(
        this._name,
        this._price * this._defaults.increaseRatio,
        this._multiplier,
        this._numOwned + 1,
        this._unlocked,
        this._totalInvestment + this._price,
        this._revenue
    );
  }

  unlock() {
    return new Asset(
        this._name,
        this._price,
        this._multiplier,
        this._numOwned,
        true,
        this._totalInvestment,
        this._revenue
    );
  }

  addRevenue(recentIncome) {
    return new Asset(
        this._name,
        this._price,
        this._multiplier,
        this._numOwned,
        this._unlocked,
        this._totalInvestment,
        this._revenue + recentIncome
    );
  }
}

export default Asset;
