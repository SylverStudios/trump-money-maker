import Asset from './../Models/Asset';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';
import { TENEMENT, HOTEL, GOLF_COURSE, CASINO, TOWER, TOWN, CITY, GOV, ISS, assetDefaults } from './../../util/constants';

import { List } from 'immutable';

const StateUtils = {
  getBaseAssets: function () {
    return [
      new Asset(TENEMENT, assetDefaults[TENEMENT].basePrice, 1, 0, false),
      new Asset(HOTEL, assetDefaults[HOTEL].basePrice, 1, 0, false),
      new Asset(GOLF_COURSE, assetDefaults[GOLF_COURSE].basePrice, 1, 0, false),
      new Asset(CASINO, assetDefaults[CASINO].basePrice, 1, 0, false),
      new Asset(TOWER, assetDefaults[TOWER].basePrice, 1, 0, false),
      new Asset(TOWN, assetDefaults[TOWN].basePrice, 1, 0, false),
      new Asset(CITY, assetDefaults[CITY].basePrice, 1, 0, false),
      new Asset(GOV, assetDefaults[GOV].basePrice, 1, 0, false),
      new Asset(ISS, assetDefaults[ISS].basePrice, 1, 0, false),
    ];
  },

  getInitialState: function () {
    return {
      bank: new Bank(44, 0, 44, 1462641080306),
      broker: new Broker(this.getBaseAssets()),
      news: new News([]),
      mint: [],
      map: new List(),
    };
  },
};

export default StateUtils;
