class Asset {
  constructor(id, name, baseIncome, price, multiplier, owned, unlocked) {
    this._id = id;
    this._name = name;
    this._baseIncome = baseIncome;
    this._price = price;
    this._multiplier = multiplier;
    this._owned = owned;
    this._unlocked = unlocked;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get baseIncome() {
    return this._baseIncome;
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

  buy(increaseRatio) {
    return new Asset(
        this.id,
        this.name,
        this.baseIncome,
        this.price * increaseRatio,
        this.multiplier,
        this.owned + 1,
        this.unlocked
    );
  }

  unlock() {
    return new Asset(
        this.id,
        this.name,
        this.baseIncome,
        this.price,
        this.multiplier,
        this.owned,
        true
    );
  }
}

export default Asset;
