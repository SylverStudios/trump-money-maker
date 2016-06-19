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
    const toggleText = this.props.areStatsVisible ? 'Collapse Property Stats' : 'Expand Property Stats';

    return (
        <div className="panel panel-primary">

          <div className="panel-heading text-center">
            <h3 className="panel-title broker-title">Real Estate</h3>
            <br />
            <button className="btn btn-default" onClick={this.props.onToggle}>{toggleText}</button>
          </div>

          <div className="panel-body">
            {this.props.assets.map((asset) => {
              return (
                <KeyBoundShopItem
                  areStatsVisible={this.props.areStatsVisible}
                  key={asset.name}
                  keyCode={assetDefaults[asset.name].keyCode}
                  name={asset.name}
                  numOwned={asset.numOwned}
                  onClick={_.partial(this.props.onItemClick, asset.id)}
                  price={asset.price}
                  revenue={asset.revenue}
                  totalInvestment={asset.totalInvestment}
                />
              );
            })}
          </div>

        </div>
    );
  },
});

export default Shop;
