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




// OLD ASSET
//
// var Asset = function(name, moneyPer10Milli, baseCost, costIncreasePercentage) {
//   var type = name;
//   var per10Milli = moneyPer10Milli;
//
//   var baseCost = baseCost;
//   var currentCost = baseCost;
//   var costIncrease = costIncreasePercentage;
//   var multiplier = 1;
//
//   var owned = 0;
//
//   this.addMultiplier = function(additionalM) {
//     multiplier += additionalM;
//   };
//
//   this.getNumber = function() {
//     return owned;
//   };
//
//   this.getType = function() {
//     return type;
//   };
//
//   this.canBuy = function(money) {
//     return money > currentCost;
//   };
//
//   this.buy = function() {
//     owned++;
//     currentCost += (currentCost*costIncrease/100);
//   };
//
//   this.getCost = function() {
//     return currentCost;
//   };
//
//   this.getProfitPer10Milli = function() {
//     return per10Milli*owned*multiplier/100;
//   };
//
//
// };
//
// module.exports = Asset;
