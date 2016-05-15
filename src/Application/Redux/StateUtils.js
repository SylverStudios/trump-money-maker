import Asset from './../Models/Asset';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';

import { List } from 'immutable';

const StateUtils = {
  getInitialState: function () {
    return {
      bank: new Bank(44, 0, 44, 1462641080306),
      broker: new Broker([
        new Asset(0, 'Tenement', 0.1, 50, 1, 0, false),
        new Asset(1, 'Hotel', 1, 150, 1, 0, false),
        new Asset(2, 'Golf Course', 9, 750, 1, 0, false),
        new Asset(3, 'Casino', 200, 2000, 1, 0, false),
        new Asset(4, 'Trump Tower', 800, 5000, 1, 0, false),
        new Asset(5, 'Trump Town', 2000, 20000, 1, 0, false),
        new Asset(6, 'Trump City', 10000, 100000, 1, 0, false),
        new Asset(7, 'Governership', 200000, 400000, 1, 0, false),
        new Asset(8, 'Trump ISS', 999999, 9999999, 1, 0, false),
      ]),
      news: new News([]),
      mint: [],
      map: new List(),
    };
  },
};

export default StateUtils;
