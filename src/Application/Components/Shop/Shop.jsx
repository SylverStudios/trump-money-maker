import React from 'react';
import _ from 'underscore';
import { assetDefaults } from './../../../util/constants';

import KeyBoundShopItem from './KeyBoundShopItem';

const Shop = React.createClass({
  propTypes: {
    areStatsVisible: React.PropTypes.bool.isRequired,
    assets: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
  },

  render() {
    return (
        <div className="panel panel-primary">

          <div className="panel-heading text-center">
            <h3 className="panel-title broker-title">Real Estate</h3>
            <br />
            <button className="btn btn-default" onClick={this.props.onToggle}>View Property Stats</button>
          </div>

          <div className="panel-body">
            {this.props.assets.map((asset) => {
              return (
                <KeyBoundShopItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  numOwned={asset.numOwned}
                  keyCode={assetDefaults[asset.name].keyCode}
                  onClick={_.partial(this.props.onItemClick, asset.id)}
                  areStatsVisible={this.props.areStatsVisible}
                />
              );
            })}
          </div>

        </div>
    );
  },
});

export default Shop;
