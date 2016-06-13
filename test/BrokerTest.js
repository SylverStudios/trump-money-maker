import Broker from '../src/Application/Models/Broker';
import StateUtils from '../src/Application/Redux/StateUtils';
import { TENEMENT, TOWER } from './../src/util/constants';
import { expect, assert } from 'chai';

const propertyTypes = StateUtils.getBasePropertyTypes();

let broker;
let brokerCopy;

describe('Broker', function () {
  beforeEach(function () {
    broker = new Broker(propertyTypes);
    brokerCopy = new Broker(propertyTypes);
  });

  describe('netIncome', function () {
    it('should return zero income for zero propertyTypes', function () {
      assert(broker.netIncome === 0);
    });

    it('should return income based on propertyTypes', function () {
      const modifiedAssets = propertyTypes.slice();
      modifiedAssets[2] = modifiedAssets[2].buy();
      broker = new Broker(modifiedAssets);

      assert(broker.netIncome === modifiedAssets[2].income);
    });
  });

  describe('nextAssetToUnlock', function () {
    it('should return the first asset if none are unlocked', function () {
      assert(broker.nextAssetToUnlock.id === 1);
    });

    it('should return the second asset if the first is unlocked', function () {
      const modifiedAssets = propertyTypes.slice();
      modifiedAssets[0] = modifiedAssets[0].unlock();
      broker = new Broker(modifiedAssets);

      assert(broker.nextAssetToUnlock.id === 2);
    });
  });

  describe('unlockGoal', function () {
    it('should return the unlock target for next asset', function () {
      const expected = propertyTypes[0].price * 0.77;
      assert.equal(broker.unlockGoal, expected);
    });

    it('should return the unlock target for different propertyTypes', function () {
      const modifiedAssets = propertyTypes.slice();
      modifiedAssets[0] = modifiedAssets[0].unlock();
      broker = new Broker(modifiedAssets);

      const expected = modifiedAssets[1].price * 0.77;
      assert.equal(broker.unlockGoal, expected);
    });
  });

  describe('getAsset', function () {
    it('should return the asset with the corresponding id', function () {
      assert(broker.getAssetById(1).id === 1);
      assert(broker.getAssetById(2).id === 2);
    });

    it('should return the asset with the corresponding name', function () {
      assert(broker.getAssetByName(TENEMENT).id === 1);
      assert(broker.getAssetByName(TOWER).id === 5);
    });
  });

  describe('unlockedAssets', function () {
    it('should return only the unlocked propertyTypes', function () {
      const modifiedAssets = propertyTypes.slice();
      modifiedAssets[0] = modifiedAssets[0].unlock();
      modifiedAssets[1] = modifiedAssets[1].unlock();
      broker = new Broker(modifiedAssets);

      assert(broker.unlockedAssets.length === 2);
      assert(broker.unlockedAssets[0].id === 1);
      assert(broker.unlockedAssets[1].id === 2);
    });
  });

  describe('buyAsset()', function () {
    it('should return a new Broker with 1 owned asset, original is unmodifed', function () {
      const newBroker = broker.buyAsset(1);

      assert.deepEqual(broker, brokerCopy);
      assert.equal(broker.getAssetById(1).numOwned, 0);
      assert.equal(newBroker.getAssetById(1).numOwned, 1);
    });
  });

  describe('unlockAsset()', function () {
    it('should return a new Broker with updated Asset, original is unmodifed', function () {
      const newBroker = broker.unlockAsset(1);

      expect(broker).to.deep.equal(brokerCopy);
      expect(broker.getAssetById(1)).to.have.deep.property('unlocked').that.equals(false);
      expect(newBroker.getAssetById(1)).to.have.deep.property('unlocked').that.equals(true);
    });
  });

  describe('updateRevenue()', function () {
    it('should return a new Broker with updated Assets, original is unmodifed', function () {
      let newBroker = broker.buyAsset(1);
      newBroker = broker.updateRevenue(2);

      expect(broker).to.deep.equal(brokerCopy);

      const oldAsset = broker.getAssetById(1);
      const asset = newBroker.getAssetById(1);
      expect(asset).to.have.deep.property('revenue').that.equals(asset.income * 2);
      expect(oldAsset).to.have.deep.property('revenue').that.equals(0);
    });
  });
});
