import React from 'react';
import KeyBoundShopItem from './KeyBoundShopItem';
import _ from 'underscore';
import { propertyDefaults } from './../../../util/constants';

const Shop = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  },

  render() {
    return (
        <div className="panel panel-primary">

          <div className="panel-heading">
            <h3 className="panel-title broker-title text-center">Real Estate</h3>
          </div>

          <div className="panel-body">
            {this.props.assets.map((asset) => {
              return (
                <KeyBoundShopItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  numOwned={asset.numOwned}
                  keyCode={propertyDefaults[asset.name].keyCode}
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
