import PropertyType from './../Models/PropertyType';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';
import { TENEMENT, HOTEL, GOLF_COURSE, CASINO, TOWER, TOWN, CITY, GOV, ISS, propertyDefaults } from './../../util/constants';

import { List } from 'immutable';

const StateUtils = {
  defaultTenement: function () {
    return new PropertyType(TENEMENT, propertyDefaults[TENEMENT].basePrice);
  },

  defaultHotel: function () {
    return new PropertyType(HOTEL, propertyDefaults[HOTEL].basePrice);
  },

  defaultGolfCourse: function () {
    return new PropertyType(GOLF_COURSE, propertyDefaults[GOLF_COURSE].basePrice);
  },

  defaultCasino: function () {
    return new PropertyType(CASINO, propertyDefaults[CASINO].basePrice);
  },

  defaultTower: function () {
    return new PropertyType(TOWER, propertyDefaults[TOWER].basePrice);
  },

  defaultTown: function () {
    return new PropertyType(TOWN, propertyDefaults[TOWN].basePrice);
  },

  defaultCity: function () {
    return new PropertyType(CITY, propertyDefaults[CITY].basePrice);
  },

  defaultGov: function () {
    return new PropertyType(GOV, propertyDefaults[GOV].basePrice);
  },

  defaultIss: function () {
    return new PropertyType(ISS, propertyDefaults[ISS].basePrice);
  },

  getBasePropertyTypes: function () {
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
      broker: new Broker(this.getBasePropertyTypes()),
      news: new News([]),
      mint: [],
      map: new List(),
    };
  },
};

export default StateUtils;
