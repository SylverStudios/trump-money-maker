import Asset from '../src/models/Asset';

let assert = require('assert');
let mocha = require('mocha');

const tenament = new Asset('Tenement', 80, 50, 7);

// End Setup

// Tests

describe('Asset', function() {

  describe('constructor', function() {

    it('should construct an asset', function() {
      assert.equal('number', typeof tenament.basePrice);
      assert.equal('number', typeof tenament.price);
      assert.equal('string', typeof tenament.name);
      assert.equal('number', typeof tenament.unlockRequirement);
      assert.equal('number', typeof tenament.profitPer10Milli);
      assert.equal('number', typeof tenament.owned);
      assert.equal('function', typeof tenament.buy);
      assert.equal('function', typeof tenament.addMultiplier);
    });
    
  });

});