import Bank from '../src/Application/Models/Bank';
import { expect } from 'chai';

let bank;
let bankCopy;
const defaultTime = 1462641080306;

describe('Bank', function () {
  beforeEach(function () {
    bank = new Bank(50, 1, 50, defaultTime);
    bankCopy = new Bank(50, 1, 50, defaultTime);
  });

  describe('deposit()', function () {
    it('should return a new Bank (updated cash and total) and leave the original unmodified', function () {
      const newBank = bank.deposit(3);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(53);
      expect(newBank).to.have.property('total').that.equals(53);
      expect(newBank).to.have.property('income').that.equals(bank.income);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });
  });

  describe('collectRent()', function () {
    it('should return a new Bank (updated cash and total and lastRent) and leave the original unmodified', function () {
      const oneSecondLater = defaultTime + 1000;
      const newBank = bank.collectIncome(oneSecondLater);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(bank.cash + 1);
      expect(newBank).to.have.property('total').that.equals(bank.cash + 1);
      expect(newBank).to.have.property('income').that.equals(bank.income);
      expect(newBank).to.have.property('lastRent').that.equals(oneSecondLater);
    });
  });

  describe('updateIncome()', function () {
    it('should return a new Bank (updated income only) and leave the original unmodified', function () {
      const newBank = bank.updateIncome(2);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(bank.cash);
      expect(newBank).to.have.property('total').that.equals(bank.cash);
      expect(newBank).to.have.property('income').that.equals(2);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });
  });

  describe('buy()', function () {
    it('should return a new Bank (updated cash and income only) and leave the original unmodified', function () {
      const newBank = bank.withdraw(10, 4);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(bank.cash - 10);
      expect(newBank).to.have.property('total').that.equals(bank.cash);
      expect(newBank).to.have.property('income').that.equals(4);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });
  });
});
