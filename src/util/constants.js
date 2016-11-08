import Denomination from '../Application/Models/Denomination';
import React from 'react';

export const TENEMENT = 'Tenement';
export const HOTEL = 'Hotel';
export const GOLF_COURSE = 'Golf Course';
export const CASINO = 'Casino';
export const TOWER = 'Trump Tower';
export const TOWN = 'Trump Town';
export const CITY = 'Trump City';
export const GOV = 'Governership';
export const ISS = 'Trump ISS';

export const assetDefaults = {
  // Return is 4%
  'Tenement': {
    id: 1,
    keyCode: '1',
    baseIncome: 0.03,
    basePrice: 0.50,
    increaseRatio: 1.07,
    flavor: 'A small stinky room in a dangerous part of town.',
    color: '#999966',
  },
  // Return is 2%
  'Hotel': {
    id: 2,
    keyCode: '2',
    baseIncome: 0.06,
    basePrice: 3.00,
    increaseRatio: 1.07,
    flavor: 'A 2 star hotel near an airport.',
    color: '#ffffff',
  },
  // Return is 5%
  'Golf Course': {
    id: 3,
    keyCode: '3',
    baseIncome: 2.5,
    basePrice: 50,
    increaseRatio: 1.07,
    flavor: 'A acceptable course with a water trap and a fake gator.',
    color: '#00cc00',
  },
  // Return is 4%
  'Casino': {
    id: 4,
    keyCode: '4',
    baseIncome: 16,
    basePrice: 400,
    increaseRatio: 1.07,
    flavor: 'A morally questionable casino on an indian reservation.',
    color: '#ffcc00',
  },
  // Return is 4%
  'Trump Tower': {
    id: 5,
    keyCode: '5',
    baseIncome: 200,
    basePrice: 5000,
    increaseRatio: 1.07,
    flavor: 'Your first classy building, rooms even have their own bidet.',
    color: '#99ccff',
  },
  // Return is 3.5%
  'Trump Town': {
    id: 6,
    keyCode: '6',
    baseIncome: 700,
    basePrice: 20000,
    increaseRatio: 1.07,
    flavor: 'The way of the future, The way of the future, The way of the future.',
    color: '#00ffcc',
  },
  // Return is 3.5%
  'Trump City': {
    id: 7,
    keyCode: '7',
    baseIncome: 3500,
    basePrice: 100000,
    increaseRatio: 1.07,
    flavor: 'They aren\'t cute, they are very profitable.',
    color: '#0000ff',
  },
  // Return is 3%
  'Governership': {
    id: 8,
    keyCode: '8',
    baseIncome: 19500,
    basePrice: 650000,
    increaseRatio: 1.07,
    flavor: 'Capitalism has defeated the political system, might as well buy it while you can.',
    color: '#ff0000',
  },
  // Return is 2%
  'Trump ISS': {
    id: 9,
    keyCode: '9',
    baseIncome: 317000,
    basePrice: 9999999,
    increaseRatio: 1.07,
    flavor: 'This will allow you to finally leave all of the pathetic \'humans\' behind!',
    color: '#000000',
  },
};


// These are still too good
export const denominations = [
  new Denomination('penny', 0.01, undefined),
  new Denomination('nickel', 0.05, 2.50),
  new Denomination('dime', 0.10, 8.99),
  new Denomination('quarter', 0.25, 24.99),
  new Denomination('dollar', 1, 75),
  new Denomination('fiveDollar', 5, 450),
  new Denomination('tenDollar', 10, 825),
  new Denomination('twentyDollar', 20, 1799.99),
  new Denomination('fiftyDollar', 50, 4500),
  new Denomination('hundredDollar', 100, 70000),
];

export const tellerConfig = {
  basePrice: 1,
  priceMultiplier: 1.2,
};

export const newsConfig = {
  maxBroadcasts: 3,
};

export const modals = {
  WELCOME: {
    title: 'Trump Money Maker',
    style: 'welcome-modal',
    body: <div>
            You are Donald Trump and you are a real estate mogul, or you will be.
            <br></br><br></br>
            Withdraw from your trust fund, Buy property, and rule the world.
          </div>,
    next: 'TRUST',
  },
  TRUST: {
    title: 'Trust Fund',
    style: 'trust-fund-modal',
    body: <div>
            Your Trust Fund is your number one source of Income.
            <br></br><br></br>
            Repeatedly request your allowance and your money will increase.
          </div>,
    next: 'CREDIT',
  },
  CREDIT: {
    title: 'Credit Union',
    style: 'credit-modal',
    body: <div>
            The Credit Union allows you to increase the amount of money you can withdraw from your trust fund.
            <br></br><br></br>
            In other words, every click will get you more money!
          </div>,
    next: 'TELLER',
  },
  TELLER: {
    title: 'Tellers',
    style: 'teller-modal',
    body: <div>
            Tellers withdraw from your Trust Fund for you.
            <br></br><br></br>
            Every Teller also benefits from your increased Credit Limit.
          </div>,
    next: 'BROKER',
  },
  BROKER: {
    title: 'Broker',
    style: 'broker-modal',
    body: <div>
            The broker is your best friend, you will need to buy properties from here to dominate the world.
            <br></br><br></br>
            Every property you buy will yield money every second. Once you buy one, it will continue to yield forever.
            As you gain more money, more properties will become available.
          </div>,
    next: null,
  },
};
