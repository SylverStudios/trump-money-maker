import Asset from './../Models/Asset';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';
import Mint from './../Models/Mint';
import { TENEMENT, HOTEL, GOLF_COURSE, CASINO, TOWER, TOWN, CITY, GOV, ISS, assetDefaults } from './../../util/constants';

import { List } from 'immutable';

const StateUtils = {
  defaultTenement: function () {
    const ten = new Asset(TENEMENT, assetDefaults[TENEMENT].basePrice);
    return ten.unlock();
  },

  defaultHotel: function () {
    return new Asset(HOTEL, assetDefaults[HOTEL].basePrice);
  },

  defaultGolfCourse: function () {
    return new Asset(GOLF_COURSE, assetDefaults[GOLF_COURSE].basePrice);
  },

  defaultCasino: function () {
    return new Asset(CASINO, assetDefaults[CASINO].basePrice);
  },

  defaultTower: function () {
    return new Asset(TOWER, assetDefaults[TOWER].basePrice);
  },

  defaultTown: function () {
    return new Asset(TOWN, assetDefaults[TOWN].basePrice);
  },

  defaultCity: function () {
    return new Asset(CITY, assetDefaults[CITY].basePrice);
  },

  defaultGov: function () {
    return new Asset(GOV, assetDefaults[GOV].basePrice);
  },

  defaultIss: function () {
    return new Asset(ISS, assetDefaults[ISS].basePrice);
  },

  getBaseAssets: function () {
    return [
      this.defaultTenement(),
      this.defaultHotel(),
      this.defaultCasino(),
      this.defaultGolfCourse(),
      this.defaultTower(),
      this.defaultTown(),
      this.defaultCity(),
      this.defaultGov(),
      this.defaultIss(),
    ];
  },

  getInstructions: function () {
    return [
      'Your mission: Become the Real Estate Mogul this country deserves.',
      'Click on the coin in the center to begin collecting rent!',
      'New real estate propositions will show up in the right menu.',
      'News of your achievements and failures will show up here.',
    ];
  },

  getInitialState: function () {
    return {
      bank: new Bank(0, 0, 0, 1462641080306),
      broker: new Broker(this.getBaseAssets()),
      news: new News(this.getInstructions()),
      mint: new Mint(),
      map: new List(),
    };
  },
};

export default StateUtils;
