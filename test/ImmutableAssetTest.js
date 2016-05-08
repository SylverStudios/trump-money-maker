import ImmutableAsset from '../src/Application/Models/ImmutableAsset';

let assert = require('assert');
let mocha = require('mocha');

// End Setup

// Tests

describe('ImmutableAsset', function () {

  describe('constructor', function () {

    it('should construct an ImmutableAsset', function () {
      const tenament = new ImmutableAsset('Tenement', 0.1, 50, 1, 0);

      assert.equal('Tenement', tenament.name);
      assert.equal(0.1, tenament.baseIncome);
      assert.equal(50, tenament.price);
      assert.equal(1, tenament.multiplier);
      assert.equal(0, tenament.owned);
    });

  });

});