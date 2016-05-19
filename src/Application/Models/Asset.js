import { assetDefaults } from './../../util/constants';

class Asset {
  constructor(name, price, multiplier, owned, unlocked) {
    this._name = name;
    this._price = price;
    this._multiplier = multiplier;
    this._owned = owned;
    this._unlocked = unlocked;
    this._defaults = assetDefaults[name];
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
  get owned() {
    return this._owned;
  }
  get unlocked() {
    return this._unlocked;
  }
  get income() {
    return this._owned * this._defaults.baseIncome * this._multiplier;
  }

  buy() {
    return new Asset(
        this._name,
        this._price * this._defaults.increaseRatio,
        this._multiplier,
        this._owned + 1,
        this._unlocked
    );
  }

  unlock() {
    return new Asset(
        this._name,
        this._price,
        this._multiplier,
        this._owned,
        true
    );
  }
}

export default Asset;
