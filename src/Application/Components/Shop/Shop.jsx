import React from 'react';
import KeyBoundShopItem from './KeyBoundShopItem';
import _ from 'underscore';
import { assetDefaults } from './../../../util/constants';

const Shop = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  },

  render() {
    return (
        <div id="store-zone" className="panel panel-primary">

          <div className="panel-heading">
            <h3 className="panel-title broker-title text-center">Real Estate</h3>
          </div>

          <div id="item-menu" className="panel-body">
            {this.props.assets.map((asset) => {
              return (
                <KeyBoundShopItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  owned={asset.owned}
                  keyCode={assetDefaults[asset.name].keyCode}
                  onClick={_.partial(this.props.onItemClick, asset.id)}
                />
              );
            })}
          </div>
        </div>
    );
  },
});

export default Shop;
