import StateUtils from'../src/Application/Redux/StateUtils';
import { assetDefaults, TENEMENT } from './../src/util/constants';
import { expect } from 'chai';

const INCREASE_RATIO = assetDefaults[TENEMENT].increaseRatio;
let asset;
let identicalAsset;

describe('Asset', function () {
  beforeEach(function () {
    asset = StateUtils.defaultTenement();
    identicalAsset = StateUtils.defaultTenement();
  });

  it('should be constructed and fill in default values', function () {
    expect(asset.id).to.equal(assetDefaults[TENEMENT].id);
  });

  describe('buy()', function () {
    it('should return a new Asset and leave the original unmodified', function () {
      const newAsset = asset.buy();

      expect(asset).to.deep.equal(identicalAsset);
      expect(newAsset).to.not.deep.equal(identicalAsset);
    });

    it('should return a new Asset and leave the original unmodified', function () {
      const newAsset = asset.buy();

      expect(asset).to.deep.equal(identicalAsset);
      expect(newAsset).to.have.property('price').that.equals(asset.price * INCREASE_RATIO);
      expect(newAsset).to.have.property('owned').that.equals(asset.owned + 1);
      expect(newAsset).to.have.property('investment').that.equals(asset.price);
    });
  });

  describe('unlock()', function () {
    it('should return a new Asset with unlocked = true, and leave the original unmodified', function () {
      const newAsset = asset.unlock();

      expect(asset).to.deep.equal(identicalAsset);
      expect(asset).to.have.property('unlocked').that.equals(false);
      expect(newAsset).to.have.property('unlocked').that.equals(true);
    });
  });

  describe('addRevenue()', function () {
    it('should return a new Asset with increased Revenue, and original unmodified', function () {
      const newAsset = asset.addRevenue(50);

      expect(asset).to.deep.equal(identicalAsset);
      expect(asset).to.have.property('revenue').that.equals(identicalAsset.revenue);
      expect(newAsset).to.have.property('revenue').that.equals(identicalAsset.revenue + 50);
    });
  });
});
