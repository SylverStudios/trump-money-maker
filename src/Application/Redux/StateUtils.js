import Asset from './../Models/Asset';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';
import { TENEMENT, HOTEL, GOLF_COURSE, CASINO, TOWER, TOWN, CITY, GOV, ISS, assetDefaults } from './../../util/constants';

import { List } from 'immutable';

const StateUtils = {
  defaultTenement: function () {
    return new Asset(TENEMENT, assetDefaults[TENEMENT].basePrice, 1, 0, false, 0, 0);
  },

  defaultHotel: function () {
    return new Asset(HOTEL, assetDefaults[HOTEL].basePrice, 1, 0, false, 0, 0);
  },

  defaultGolfCourse: function () {
    return new Asset(GOLF_COURSE, assetDefaults[GOLF_COURSE].basePrice, 1, 0, false, 0, 0);
  },

  defaultCasino: function () {
    return new Asset(CASINO, assetDefaults[CASINO].basePrice, 1, 0, false, 0, 0);
  },

  defaultTower: function () {
    return new Asset(TOWER, assetDefaults[TOWER].basePrice, 1, 0, false, 0, 0);
  },

  defaultTown: function () {
    return new Asset(TOWN, assetDefaults[TOWN].basePrice, 1, 0, false, 0, 0);
  },

  defaultCity: function () {
    return new Asset(CITY, assetDefaults[CITY].basePrice, 1, 0, false, 0, 0);
  },

  defaultGov: function () {
    return new Asset(GOV, assetDefaults[GOV].basePrice, 1, 0, false, 0, 0);
  },

  defaultIss: function () {
    return new Asset(ISS, assetDefaults[ISS].basePrice, 1, 0, false, 0, 0);
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

  getInitialState: function () {
    return {
      bank: new Bank(0, 0, 0, 1462641080306),
      broker: new Broker(this.getBaseAssets()),
      news: new News([]),
      mint: [],
      map: new List(),
    };
  },
};

export default StateUtils;
