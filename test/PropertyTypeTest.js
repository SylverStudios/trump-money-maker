import StateUtils from'../src/Application/Redux/StateUtils';
import { propertyDefaults, TENEMENT } from './../src/util/constants';
import { assert } from 'chai';

const INCREASE_RATIO = propertyDefaults[TENEMENT].increaseRatio;
let propertyType;
let identicalPropertyType;

describe('PropertyType', function () {
  beforeEach(function () {
    propertyType = StateUtils.defaultTenement();
    identicalPropertyType = StateUtils.defaultTenement();
  });

  it('should be constructed and fill in default values', function () {
    assert.equal(propertyType.id, propertyDefaults[TENEMENT].id);
  });

  describe('buy()', function () {
    it('should return a new propertyType and leave the original unmodified', function () {
      const newPropertyType = propertyType.buy();

      assert.deepEqual(propertyType, identicalPropertyType);
      assert.notDeepEqual(newPropertyType, identicalPropertyType);
    });

    it('should return a new propertyType and leave the original unmodified', function () {
      const newpropertyType = propertyType.buy();

      assert.deepEqual(propertyType, identicalPropertyType);
      assert.equal(newpropertyType.price, propertyType.price * INCREASE_RATIO);
      assert.equal(newpropertyType.numOwned, propertyType.numOwned + 1);
      assert.equal(newpropertyType.totalInvestment, propertyType.price);
    });
  });

  describe('unlock()', function () {
    it('should return a new propertyType with unlocked = true, and leave the original unmodified', function () {
      const newPropertyType = propertyType.unlock();

      assert.deepEqual(propertyType, identicalPropertyType);
      assert.equal(propertyType.unlocked, false);
      assert(newPropertyType.unlocked);
    });
  });

  describe('addRevenue()', function () {
    it('should return a new propertyType with increased Revenue, and original unmodified', function () {
      const newPropertyType = propertyType.addRevenue(50);

      assert.deepEqual(propertyType, identicalPropertyType);
      assert.equal(propertyType.revenue, identicalPropertyType.revenue);
      assert.equal(newPropertyType.revenue, identicalPropertyType.revenue + 50);
    });
  });
});
