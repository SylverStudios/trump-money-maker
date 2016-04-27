import createItem from './createItem';
import funcLog from '../util/funcLog';

class Store {
  constructor() {
    this._itemsOnSale = {};
  }

  addAssetToDom(asset, onClick) {
    const newItem = createItem(asset);
    this._itemsOnSale[asset.name] = newItem;

    newItem.addEventListener('click', onClick);

    document.getElementById('item-menu').appendChild(newItem);
  }

  updateAsset(asset) {
    const item = this._itemsOnSale[asset.name];
    if (item) {
      const costDiv = document.getElementById(asset.name + '-price');
      costDiv.innerHTML = Math.round(asset.price);

      const numberDiv = document.getElementById(asset.name + '-owned');
      numberDiv.innerHTML = asset.owned;
    } else {
      funcLog('Tried to update and asset that didn\t exist.', asset);
    }
  }
}

export default Store;
