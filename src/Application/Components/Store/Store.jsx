import React from 'react';
import StoreItem from './StoreItem';
import _ from 'underscore';

const Store = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    createOnClick: React.PropTypes.func.isRequired,
  },

  render() {
    const buyFxn = this.props.createOnClick;
    const unlockedAssets = _.where(this.props.assets, { unlocked: true });

    return (
        <div id="store-zone">
          <h3>Broker</h3>
          <div id="item-menu">
            {unlockedAssets.map(function (asset) {
              return (
                <StoreItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  owned={asset.owned}
                  onClick={buyFxn(asset)}
                />
              );
            })}
          </div>
        </div>
    );
  },
});

export default Store;
