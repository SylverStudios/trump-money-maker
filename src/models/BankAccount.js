class BankAccount {
  constructor() {
    this._total = 0;
    this._current = 0;
    this._perSecond = 0;
    this._lastDepositTime = new Date().getTime();
  }

  get total() {
    return this._total;
  }

  get cash() {
    return this._current;
  }

  get income() {
    return this._perSecond;
  }

  deposit(deposit) {
    this._total += deposit;
    this._current += deposit;
  }

  directDeposit(deposit) {
    this._total += deposit;
    this._current += deposit;
    this._calculatePerSecond();
  }

  withdraw(cost) {
    this._current -= cost;
  }

  _calculatePerSecond(deposit) {
    if (typeof deposit !== 'number' || deposit === 0) {
      return;
    }

    const nowMilli = new Date().getTime();
    const milliSinceLastDeposit = this._lastDepositTime - nowMilli;

    this._perSecond = deposit / milliSinceLastDeposit * 1000;
  }

}

export default BankAccount;
