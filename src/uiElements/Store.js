import createItem from './../models/store/createItem';
import funcLog from '../util/funcLog';

class Store {
  constructor(domId) {
    this._domTag = domId;
    this._itemsOnSale = {};
  }

  addAssetToDom(asset, onClick) {
    const newItem = createItem(asset);
    this._itemsOnSale[asset.name] = newItem;

    newItem.addEventListener('click', onClick);

    document.getElementById(this._domTag).appendChild(newItem);
  }

  updateAsset(asset) {
    const item = this._itemsOnSale[asset.name];
    if (item) {
      const costDiv = document.getElementById(`${asset.name}-price`);
      costDiv.innerHTML = `$${Math.floor(asset.price)}`;

      const numberDiv = document.getElementById(`${asset.name}-owned`);
      numberDiv.innerHTML = asset.owned;
    } else {
      funcLog('Tried to update an asset that didn\'t exist.', asset);
    }
  }
}

export default Store;
