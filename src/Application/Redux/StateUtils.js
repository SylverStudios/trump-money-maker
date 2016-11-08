import React from 'react';
import Asset from './../Models/Asset';
import Broker from './../Models/Broker';
import News from './../Models/News';
import Bank from './../Models/Bank';
import Mint from './../Models/Mint';
import TellerState from '../Models/TellerState';
import { TENEMENT, HOTEL, GOLF_COURSE, CASINO, TOWER, TOWN, CITY, GOV, ISS, assetDefaults } from './../../util/constants';
import { tellerConfig } from './../../util/constants';
import broadcastManager from '../../util/broadcastManager';

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

  getInitialModal: function () {
    return {
      title: 'Welcome to Trump Money Maker',
      body: <div>
      You are Donald Trump and you are a real estate mogul, or you will be.
      <br></br><br></br>
      <b>Click the Penny</b> above to withdraw from your trust fund.<br></br>
      You can <b>buy properties in the menu on the right</b> (Open the details stats with the 'Expand Property Stats' Button)
      <br></br><br></br>
      This isn't just a something to do with your parent's money, it's a race for the election.
      </div>,
    };
  },

  getInitialState: function () {
    return {
      bank: new Bank(0, 0, 0, 1462641080306),
      broker: new Broker(this.getBaseAssets()),
      news: new News(broadcastManager.getInstructions()),
      mint: new Mint(),
      map: [],
      modal: this.getInitialModal(),
      startTime: 1462641080306,
      teller: new TellerState(0, tellerConfig.basePrice, Date.now()),
    };
  },
};

export const TELLER_COLLECTION_INTERVAL = 4000; // every teller collects every 4 seconds

export default StateUtils;
