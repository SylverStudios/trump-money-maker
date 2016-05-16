import Asset from '../src/Application/Models/Asset';
import Broker from '../src/Application/Models/Broker';
import { expect, assert } from 'chai';

const assets = [
  new Asset(0, 'Tenement', 0.1, 50, 1, 0, false),
  new Asset(1, 'Hotel', 1, 150, 1, 0, false),
  new Asset(2, 'Golf Course', 9, 750, 1, 0, false),
  new Asset(3, 'Casino', 200, 2000, 1, 0, false),
  new Asset(4, 'Trump Tower', 800, 5000, 1, 0, false),
  new Asset(5, 'Trump Town', 2000, 20000, 1, 0, false),
  new Asset(6, 'Trump City', 10000, 100000, 1, 0, false),
  new Asset(7, 'Governership', 200000, 400000, 1, 0, false),
  new Asset(8, 'Trump ISS', 999999, 9999999, 1, 0, false),
];
let broker;
let brokerCopy;

describe('Broker', function () {
  beforeEach(function () {
    broker = new Broker(assets);
    brokerCopy = new Broker(assets);
  });

  describe('netIncome', function () {
    it('should return zero income for zero assets', function () {
      assert(broker.netIncome === 0);
    });

    it('should return income based on assets', function () {
      const modifiedAssets = assets.slice();
      modifiedAssets[2] = new Asset(2, 'Golf Course', 9, 750, 1, 1, false);
      broker = new Broker(modifiedAssets);

      assert(broker.netIncome === 9);
    });
  });

  describe('nextAssetToUnlock', function () {
    it('should return the first asset if none are unlocked', function () {
      assert(broker.nextAssetToUnlock.id === 0);
    });

    it('should return the second asset if the first is unlocked', function () {
      const modifiedAssets = assets.slice();
      modifiedAssets[0] = new Asset(0, 'Tenement', 0.1, 50, 1, 0, true);
      broker = new Broker(modifiedAssets);

      assert(broker.nextAssetToUnlock.id === 1);
    });
  });

  describe('unlockGoal', function () {
    it('should return the unlock target for next asset', function () {
      const expected = assets[0].price * 0.77;
      assert.equal(broker.unlockGoal, expected);
    });

    it('should return the unlock target for different assets', function () {
      const modifiedAssets = assets.slice();
      modifiedAssets[0] = new Asset(0, 'Tenement', 0.1, 50, 1, 0, true);
      broker = new Broker(modifiedAssets);

      const expected = modifiedAssets[1].price * 0.77;
      assert.equal(broker.unlockGoal, expected);
    });
  });

  describe('getAsset', function () {
    it('should return the asset with the corresponding id', function () {
      assert(broker.getAssetById(0).id === 0);
      assert(broker.getAssetById(2).id === 2);
    });

    it('should return the asset with the corresponding name', function () {
      assert(broker.getAssetByName('Tenement').id === 0);
      assert(broker.getAssetByName('Trump Tower').id === 4);
    });
  });

  describe('unlockedAssets', function () {
    it('should return only the unlocked assets', function () {
      const modifiedAssets = assets.slice();
      modifiedAssets[0] = new Asset(0, 'Tenement', 0.1, 50, 1, 0, true);
      modifiedAssets[1] = new Asset(1, 'Hotel', 1, 150, 1, 0, true);
      broker = new Broker(modifiedAssets);

      assert(broker.unlockedAssets.length === 2);
      assert(broker.unlockedAssets[0].id === 0);
      assert(broker.unlockedAssets[1].id === 1);
    });
  });

  describe('buyAsset()', function () {
    it('should return a new Broker with updated Asset, original is unmodifed', function () {
      const newBroker = broker.buyAsset(0);

      expect(broker).to.deep.equal(brokerCopy);
      expect(broker.getAssetById(0)).to.have.deep.property('owned').that.equals(0);
      expect(newBroker.getAssetById(0)).to.have.deep.property('owned').that.equals(1);
    });
  });

  describe('unlockAsset()', function () {
    it('should return a new Broker with updated Asset, original is unmodifed', function () {
      const newBroker = broker.unlockAsset(0);

      expect(broker).to.deep.equal(brokerCopy);
      expect(broker.getAssetById(0)).to.have.deep.property('unlocked').that.equals(false);
      expect(newBroker.getAssetById(0)).to.have.deep.property('unlocked').that.equals(true);
    });
  });
});
