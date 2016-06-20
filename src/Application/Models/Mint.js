import Denomination from './Denomination';

const denominations = [
  new Denomination('penny', 0.01, undefined),
  new Denomination('nickel', 0.05, 1),
  new Denomination('dime', 0.10, 2),
  new Denomination('quarter', 0.25, 5),
  new Denomination('dollar', 1, 20),
  new Denomination('fiveDollar', 5, 100),
  new Denomination('tenDollar', 10, 200),
  new Denomination('twentyDollar', 20, 400),
  new Denomination('fiftyDollar', 50, 1000),
  new Denomination('hundredDollar', 100, 2000),
];

class Mint {
  constructor(currentDenominationIndex = 0) {
    this._currentDenominationIndex = currentDenominationIndex;
  }

  get currentDenomination() {
    return denominations[this._currentDenominationIndex];
  }
  get canUpgrade() {
    return this._currentDenominationIndex < denominations.length - 1;
  }
  get nextDenomination() {
    if (this.canUpgrade) {
      return denominations[this._currentDenominationIndex + 1];
    }
    return undefined; // understood to signify no more denominations
  }
  get toNextDenomination() {
    if (this.canUpgrade) {
      return new Mint(this._currentDenominationIndex + 1);
    }
    console.warn( // warn so program doesn't crash, but useful for debugging
      new Error('attempting to upgrade mint to next denomination, have reached end already')
    );
    return this;
  }
}

export default Mint;
