class TellerState {
  constructor(numTellers, tellerPrice, lastCollected) {
    this._numTellers = numTellers;
    this._tellerPrice = tellerPrice;
    this._lastCollected = lastCollected;
  }
  get numTellers() { return this._numTellers; }
  get tellerPrice() { return this._tellerPrice; }
  get lastCollected() { return this._lastCollected; }

  withOneMoreTeller() {
    const { numTellers, tellerPrice, lastCollected } = this;
    return new TellerState(numTellers + 1, tellerPrice, lastCollected);
  }
}

export default TellerState;
