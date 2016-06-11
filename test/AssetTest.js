import Asset from '../src/Application/Models/Asset';
import { assetDefaults, TENEMENT } from './../src/util/constants';
import { expect } from 'chai';

const INCREASE_RATIO = assetDefaults[TENEMENT].increaseRatio;
let asset;
let identicalAsset;

describe('Asset', function () {
  beforeEach(function () {
    asset = new Asset(TENEMENT, assetDefaults[TENEMENT].basePrice, 1, 0, false);
    identicalAsset = new Asset(TENEMENT, assetDefaults[TENEMENT].basePrice, 1, 0, false);
  });

  it('should be constructed and fill in default values', function () {
    expect(asset.id).to.equal(assetDefaults[TENEMENT].id);
  });

  describe('buy()', function () {
    it('should return a new Asset with increased price and owned, and leave the original unmodified', function () {
      const newAsset = asset.buy();

      expect(asset).to.deep.equal(identicalAsset);
      expect(newAsset).to.have.property('price').that.equals(asset.price * INCREASE_RATIO);
      expect(newAsset).to.have.property('owned').that.equals(asset.owned + 1);
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
});
