class Bank {
  constructor(cash, income, total, lastRentTime) {
    this._cash = cash;
    this._income = income;
    this._total = total;
    this._lastRentTime = lastRentTime;
  }

  get cash() {
    return this._cash;
  }
  get income() {
    return this._income;
  }
  get total() {
    return this._total;
  }
  get lastRent() {
    return this._lastRentTime;
  }

  deposit(moneyDelta) {
    return new Bank(
      this._cash + moneyDelta,
        this._income,
        this._total + moneyDelta,
        this._lastRentTime
    );
  }

  withdraw(amountToWithdraw) {
    if (amountToWithdraw > this._cash) {
      console.warn(new Error(
        'amountToWithdraw high than current cash.',
        'amountToWithdraw:', amountToWithdraw,
        'this: ', this
      ));
    }
    return new Bank(
        this._cash - amountToWithdraw,
        this._income,
        this._total,
        this._lastRentTime
    );
  }

  updateIncome(newIncome) {
    return new Bank(
      this._cash,
      newIncome,
      this._total,
      this._lastRentTime
    );
  }

  collectIncome(currentTime) {
    const secondDiff = (currentTime - this._lastRentTime) / 1000;

    const moneyDelta = this._income * secondDiff;

    return new Bank(
        this._cash + moneyDelta,
        this._income,
        this._total + moneyDelta,
        currentTime
    );
  }

  updateIncome(income) {
    return new Bank(
        this._cash,
        income,
        this._total,
        this._lastRentTime
    );
  }
}

export default Bank;
