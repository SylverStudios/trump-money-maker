class Asset {
  constructor(name, baseIncomePer10Milli, basePrice, costIncreasePercentage) {
    this._name = name;
    this._baseIncomePer10Milli = baseIncomePer10Milli;
    this._basePrice = basePrice;
    this._currentPrice = basePrice;

    this._costIncreasePercentage = costIncreasePercentage;
    this._multiplier = 1;
    this._owned = 0;
    this._unlockCost = basePrice * .75;
  }

  get basePrice() {
    return this._basePrice;
  }
  get price() {
    return this._currentPrice;
  }
  get name() {
    return this._name;
  }
  get unlockRequirement() {
    return this._unlockCost
  }
  get profitPer10Milli() {
    return this._baseIncomePer10Milli * this._owned * this._multiplier/100
  }
  get owned() {
    return this._owned
  }

  buy() {
    this._owned++;
    this._currentPrice += (this._currentPrice * this._costIncreasePercentage/100);
  }

  addMultiplier(additionalPercentage) {
    this._multiplier += additionalPercentage;
  }

}

export default Asset;