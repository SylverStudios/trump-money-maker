import Asset from '../src/Application/Models/Asset';
import { expect } from 'chai';

const INCREASE_RATIO = 1.07;
let asset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);
let identicalAsset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);

describe('Asset', function () {
  beforeEach(function () {
    asset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);
    identicalAsset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);
  });

  describe('makeBuy()', function () {
    it('should return a new Asset with increased price and owned, and leave the original unmodified', function () {
      const newAsset = asset.makeBuy(INCREASE_RATIO);

      expect(asset).to.deep.equal(identicalAsset);
      expect(newAsset).to.have.property('price').that.equals(asset.price * INCREASE_RATIO);
      expect(newAsset).to.have.property('owned').that.equals(asset.owned + 1);
    });
  });

  describe('makeUnlock()', function () {
    it('should return a new Asset with unlocked = true, and leave the original unmodified', function () {
      const newAsset = asset.makeUnlock();

      expect(asset).to.deep.equal(identicalAsset);
      expect(asset).to.have.property('unlocked').that.equals(false);
      expect(newAsset).to.have.property('unlocked').that.equals(true);
    });
  });
});
