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
    const { areStatsVisible, asset, onClick, totalRevenueEverEarned } = this.props;
    const imgSrc = `images/${asset.name}.png`;

    let itemDetails;
    if (areStatsVisible) {
      itemDetails =
        (<ShopItemStats
          key={asset.name}
          asset={asset}
          totalRevenueEverEarned={totalRevenueEverEarned}
         />);
    }

    return (
      <div className="shop-item panel panel-default">
        <div className="shop-item-body panel-body" onClick={onClick}>
          <div className="col-md-10">
            <img className="shop-item-image" src={imgSrc}/>
            <div className="shop-item-text">
              <div className="shop-item-title">{asset.name}</div>
              <div className="shop-item-cost">${asset.price.toFixed(2)}</div>
            </div>
          </div>
          <div className="shop-item-number col-md-2">{asset.numOwned}</div>
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
