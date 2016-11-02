class TellerState {
  constructor(numTellers, tellerPrice) {
    this._numTellers = numTellers;
    this._tellerPrice = tellerPrice;
  }
  get numTellers() { return this._numTellers; }
  get tellerPrice() { return this._tellerPrice; }

  withOneMoreTeller() {
    const { numTellers, tellerPrice } = this;
    return new TellerState(numTellers + 1, tellerPrice);
  }
}

export default TellerState;
