class BankAccount {
  constructor() {
    this._total = 0;
    this._current = 0;
  }

  get total() {
    return this._total;
  }

  get cash() {
    return this._current;
  }

  deposit(deposit) {
    this._total += deposit;
    this._current += deposit;
  }

  withdraw(cost) {
    this._current -= cost;
  }
}

export default BankAccount;
