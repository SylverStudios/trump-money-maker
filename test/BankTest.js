import Bank from '../src/Application/Models/Bank';

import chai from 'chai';
const expect = chai.expect;

describe('Bank', function () {

  describe('makeClick()', function () {

    it('should return a new Bank (updated cash and total) and leave the original unmodified', function () {
      const time = new Date().getTime();

      const bank = new Bank(50, 1, 50, time);
      const bankCopy = new Bank(50, 1, 50, time);

      const newBank = bank.makeClick(3);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(53);
      expect(newBank).to.have.property('total').that.equals(53);
      expect(newBank).to.have.property('income').that.equals(bank.income);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });

  });

  describe('makeRent()', function () {

    it('should return a new Bank (updated cash and total and lastRent) and leave the original unmodified', function () {
      const time = new Date().getTime();

      const bank = new Bank(50, 1, 50, time);
      const bankCopy = new Bank(50, 1, 50, time);

      const newBank = bank.makeRent(time + 1000);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(51);
      expect(newBank).to.have.property('total').that.equals(51);
      expect(newBank).to.have.property('income').that.equals(bank.income);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent + 1000);
    });

  });

  describe('makeIncomeUpdate()', function () {

    it('should return a new Bank (updated income only) and leave the original unmodified', function () {
      const time = new Date().getTime();

      const bank = new Bank(50, 1, 50, time);
      const bankCopy = new Bank(50, 1, 50, time);

      const newBank = bank.makeIncomeUpdate(2);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(50);
      expect(newBank).to.have.property('total').that.equals(50);
      expect(newBank).to.have.property('income').that.equals(2);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });

  });

  describe('makeBuy()', function () {

    it('should return a new Bank (updated cash and income only) and leave the original unmodified', function () {
      const time = new Date().getTime();

      const bank = new Bank(50, 1, 50, time);
      const bankCopy = new Bank(50, 1, 50, time);

      const newBank = bank.makeBuy(10, 4);

      expect(bank).to.deep.equal(bankCopy);

      expect(newBank).to.have.property('cash').that.equals(bank.cash - 10);
      expect(newBank).to.have.property('total').that.equals(bank.cash);
      expect(newBank).to.have.property('income').that.equals(4);
      expect(newBank).to.have.property('lastRent').that.equals(bank.lastRent);
    });

  });
});