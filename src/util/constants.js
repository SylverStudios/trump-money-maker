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
  'Tenement': {
    id: 1,
    keyCode: '1',
    baseIncome: 0.1,
    basePrice: 50,
    increaseRatio: 1.07,
  },
  'Hotel': {
    id: 2,
    keyCode: '2',
    baseIncome: 1,
    basePrice: 150,
    increaseRatio: 1.07,
  },
  'Golf Course': {
    id: 3,
    keyCode: '3',
    baseIncome: 9,
    basePrice: 750,
    increaseRatio: 1.07,
  },
  'Casino': {
    id: 4,
    keyCode: '4',
    baseIncome: 200,
    basePrice: 2000,
    increaseRatio: 1.07,
  },
  'Trump Tower': {
    id: 5,
    keyCode: '5',
    baseIncome: 800,
    basePrice: 5000,
    increaseRatio: 1.07,
  },
  'Trump Town': {
    id: 6,
    keyCode: '6',
    baseIncome: 2000,
    basePrice: 20000,
    increaseRatio: 1.07,
  },
  'Trump City': {
    id: 7,
    keyCode: '7',
    baseIncome: 10000,
    basePrice: 100000,
    increaseRatio: 1.07,
  },
  'Governership': {
    id: 8,
    keyCode: '8',
    baseIncome: 200000,
    basePrice: 400000,
    increaseRatio: 1.07,
  },
  'Trump ISS': {
    id: 9,
    keyCode: '9',
    baseIncome: 999999,
    basePrice: 9999999,
    increaseRatio: 1.07,
  },
};
