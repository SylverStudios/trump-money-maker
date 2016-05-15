class Bank {
  constructor(cash, income, total, lastRentTime) {
    this._cash = cash;
    this._income = income;
    this._total = total;
    this._lastRentTime= lastRentTime;
  }

  get cash() {
    return this._cash ;
  }
  get income() {
    return this._income ;
  }
  get total() {
    return this._total ;
  }
  get lastRent() {
    return this._lastRentTime ;
  }

  makeClick(moneyDelta) {
    return new Bank(
      this._cash + moneyDelta,
        this._income,
        this._total + moneyDelta,
        this._lastRentTime
    );
  }

  makeRent(currentTime) {
    const secondDiff = (currentTime - this._lastRentTime) / 1000;

    const moneyDelta = this._income * secondDiff;

    return new Bank(
        this._cash + moneyDelta,
        this._income,
        this._total + moneyDelta,
        currentTime
    );
  }

  makeIncomeUpdate(income) {
    return new Bank(
        this._cash,
        income,
        this._total,
        this._lastRentTime
    );
  }

  makeBuy(cost, newIncome) {
    return new Bank(
        this._cash - cost,
        newIncome,
        this._total,
        this._lastRentTime
    );
  }
}

export default Bank;
