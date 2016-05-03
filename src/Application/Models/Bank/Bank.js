import BankAccount from './BankAccount';
import RealEstateBroker from './RealEstateBroker';

class Bank {
  constructor() {
    this._account = new BankAccount();
    this._broker = new RealEstateBroker();
    this._lastDepositTime = new Date().getTime();
  }

  get cash() {
    return this._account.cash;
  }

  get totalProfits() {
    return this._account.total;
  }

  get income() {
    return this._broker.income;
  }

  get canUpgrade() {
    return this._account.cash > this._broker.nextUpgradeAmount;
  }

  get bestAsset() {
    return this._broker.currentSale;
  }

  get assets() {
    return this._broker.assets;
  }

  deposit(money) {
    this._account.deposit(money);
  }

  // This will have to get upgraded as we add perks etc
  addClickIncome() {
    this._account.deposit(1);
  }

  upgrade() {
    this._broker.upgrade();
  }

  buy(asset) {
    if (this._account.cash >= asset.price) {
      this._account.withdraw(asset.price);
      asset.buy();
      asset.unlock();
      return true;
    }
    return false;
  }

  update() {
    const now = new Date().getTime();
    const secondDiff = (now - this._lastDepositTime) / 1000;

    const incomeSinceLastUpdate = this._broker.income * secondDiff;

    this._lastDepositTime = now;
    this._account.deposit(incomeSinceLastUpdate);
  }
}

export default Bank;
