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
    totalRevenueEverEarned: React.PropTypes.number.isRequired,
  },

  componentDidMount() {
    this.upgradeSound = new Audio('sounds/voice-really-rich.mp3');
    this.upgradeSound.volume = 0.7;
  },

  playUpgradeSound() {
    this.upgradeSound.currentTime = 0;
    this.upgradeSound.play();
  },

  renderShopHeader() {
    const toggleText = this.props.areStatsVisible ? 'Collapse Property Stats' : 'Expand Property Stats';

    return (
      <div className="panel-heading text-center">
        <h3 className="panel-title broker-title">Real Estate</h3>
        <br />
        <button className="btn btn-default" onClick={this.props.onToggle}>{toggleText}</button>
      </div>
    );
  },

  renderShopBody() {
    return (
      <div className="panel-body broker-body">
        {this.props.assets.map((asset) => {
          return (
            <KeyBoundShopItem
              areStatsVisible={this.props.areStatsVisible}
              asset={asset}
              key={asset.name}
              keyCode={assetDefaults[asset.name].keyCode}
              onClick={_.partial(this.props.onItemClick, asset.id)}
              totalRevenueEverEarned={this.props.totalRevenueEverEarned}
            />
          );
        })}
      </div>
    );
  },

  componentDidUpdate(prevProps) {
    if (prevProps.assets.length !== this.props.assets.length) {
      this.playUpgradeSound();
    }
  },

  render() {
    return (
      <div className="panel panel-primary">
        {this.renderShopHeader()}
        {this.renderShopBody()}
      </div>
    );
  },
});

export default Shop;
