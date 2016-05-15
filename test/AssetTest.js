import Asset from '../src/Application/Models/Asset';
import chai from 'chai';

const expect = chai.expect;

const INCREASE_RATIO = 1.07;

describe('Asset', function () {

  describe('makeBuy()', function () {

    it('should return a new Asset with increased price and owned, and leave the original unmodified', function () {
      const asset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);
      const identicalAsset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);

      const newAsset = asset.makeBuy(INCREASE_RATIO);

      expect(asset).to.deep.equal(identicalAsset);
      expect(newAsset).to.have.property('price').that.equals(asset.price * INCREASE_RATIO);
      expect(newAsset).to.have.property('owned').that.equals(asset.owned + 1);
    });

  });

  describe('makeUnlock()', function () {

    it('should return a new Asset with unlocked = true, and leave the original unmodified', function () {
      const asset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);
      const identicalAsset = new Asset(0, 'Tenement', 0.1, 50, 1, 0, false);

      const newAsset = asset.makeUnlock();

      expect(asset).to.deep.equal(identicalAsset);
      expect(asset).to.have.property('unlocked').that.equals(false);
      expect(newAsset).to.have.property('unlocked').that.equals(true);
    });

  });
});