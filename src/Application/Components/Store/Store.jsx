import React from 'react';
import StoreItem from './StoreItem';

const Store = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    createOnClick: React.PropTypes.func.isRequired,
  },

  render() {
    const unlockedAssets = [];
    for (const asset of this.props.assets) {
      if (asset.unlocked) {
        unlockedAssets.push(asset);
      }
    }

    const buyFxn = this.props.createOnClick;

    return (
        <div id="store-zone">
          <h3>Broker</h3>
          <div id="item-menu">
            {unlockedAssets.map(function (asset) {
              return <StoreItem key={asset.name} name={asset.name} price={asset.price} owned={asset.owned} onClick={buyFxn(asset)} />;
            })}
          </div>
        </div>
    );
  },
});

export default Store;
