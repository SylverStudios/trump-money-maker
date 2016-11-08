import { denominations } from '../../util/constants';

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
