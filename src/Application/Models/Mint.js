import Denomination from './Denomination';

const denominations = [
  new Denomination('penny', 0.01, undefined), //
  new Denomination('nickel', 0.05, 0.5),         // 10%
  new Denomination('dime', 0.10, 1.5),          // 6.7%
  new Denomination('quarter', 0.25, 5),         // 5%
  new Denomination('dollar', 1, 30),            // 3.33%
  new Denomination('fiveDollar', 5, 200),       // 2.5%
  new Denomination('tenDollar', 10, 400),       // 2.5%
  new Denomination('twentyDollar', 20, 800),    // 2.5%
  new Denomination('fiftyDollar', 50, 1500),    // 3.3%
  new Denomination('hundredDollar', 100, 2000), // 5%
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
