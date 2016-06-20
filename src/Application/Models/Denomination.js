class Denomination {
  constructor(id, incomePerClick, priceToUnlock) {
    this._id = id;
    this._incomePerClick = incomePerClick;
    this._priceToUnlock = priceToUnlock;
  }

  get id() { return this._id; }
  get incomePerClick() { return this._incomePerClick; }
  get priceToUnlock() { return this._priceToUnlock; }
}

export default Denomination;
