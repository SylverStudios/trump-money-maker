import React from 'react';
import Mousetrap from 'mousetrap';

import Asset from '../../Models/Asset';

import ShopItemStats from './ShopItemStats';

class KeyBoundShopItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Mousetrap.bind([this.props.keyCode], this.props.onClick);
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.keyCode);
  }

  render() {
    const imgSrc = `images/${this.props.asset.name}.png`;
    let itemDetails = false;
    if (this.props.areStatsVisible) {
      itemDetails =
        (<ShopItemStats
          key={this.props.asset.name}
          asset={this.props.asset}
          totalRevenueEverEarned={this.props.totalRevenueEverEarned}
         />);
    }

    return (
      <div className="shop-item panel panel-default">
        <div className="shop-item-body panel-body" onClick={this.props.onClick}>
          <div className="col-md-10">
            <img className="shop-item-image" src={imgSrc}/>
            <div className="shop-item-text">
              <div className="shop-item-title">{this.props.asset.name}</div>
              <div className="shop-item-cost">${this.props.asset.price.toFixed(2)}</div>
            </div>
          </div>
          <div className="shop-item-number col-md-2">{this.props.asset.numOwned}</div>
        </div>

        {itemDetails}
      </div>
    );
  }
}

KeyBoundShopItem.propTypes = {
  areStatsVisible: React.PropTypes.bool.isRequired,
  asset: React.PropTypes.instanceOf(Asset).isRequired,
  keyCode: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  totalRevenueEverEarned: React.PropTypes.number.isRequired,
};

export default KeyBoundShopItem;
