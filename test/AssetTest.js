import StateUtils from'../src/Application/Redux/StateUtils';
import { assetDefaults, HOTEL } from './../src/util/constants';
import { assert } from 'chai';

const INCREASE_RATIO = assetDefaults[HOTEL].increaseRatio;
let asset;
let identicalAsset;

describe('Asset', function () {
  beforeEach(function () {
    asset = StateUtils.defaultHotel();
    identicalAsset = StateUtils.defaultHotel();
  });

  it('should be constructed and fill in default values', function () {
    assert.equal(asset.id, assetDefaults[HOTEL].id);
  });

  describe('buy()', function () {
    it('should return a new Asset and leave the original unmodified', function () {
      const newAsset = asset.buy();

      assert.deepEqual(asset, identicalAsset);
      assert.notDeepEqual(newAsset, identicalAsset);
    });

    it('should return a new Asset and leave the original unmodified', function () {
      const newAsset = asset.buy();

      assert.deepEqual(asset, identicalAsset);
      assert.equal(newAsset.price, asset.price * INCREASE_RATIO);
      assert.equal(newAsset.numOwned, asset.numOwned + 1);
      assert.equal(newAsset.totalInvestment, asset.price);
    });
  });

  describe('unlock()', function () {
    it('should return a new Asset with unlocked = true, and leave the original unmodified', function () {
      const newAsset = asset.unlock();

      assert.deepEqual(asset, identicalAsset);
      assert.equal(asset.unlocked, false);
      assert(newAsset.unlocked);
    });
  });

  describe('addRevenue()', function () {
    it('should return a new Asset with increased Revenue, and original unmodified', function () {
      const newAsset = asset.addRevenue(50);

      assert.deepEqual(asset, identicalAsset);
      assert.equal(asset.revenue, identicalAsset.revenue);
      assert.equal(newAsset.revenue, identicalAsset.revenue + 50);
    });
  });
});
