import React from 'react';
import numeral from 'numeral';

import Asset from '../../Models/Asset';

class ShopItemStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const asset = this.props.asset;

    const revenue = this.props.totalRevenueEverEarned !== 0 ? asset.revenue / this.props.totalRevenueEverEarned : 0;
    const returnOnInvestment = asset.totalInvestment ? ((asset.revenue - asset.totalInvestment) / asset.totalInvestment) : 0;

    return (
      <div className="shop-item-stats panel-footer">
        <i>{asset.flavor}</i>
        <br />
        Income per second: {numeral(asset.baseIncome * asset.numOwned).format('($0.00 a)')}
        <br />
        Revenue: {numeral(asset.revenue).format('($0.00 a)')}
        <br />
        Investment: {numeral(asset.totalInvestment).format('($0.00 a)')}
        <br />
        Percent of total revenue: {numeral(revenue).format('0.00%')}
        <br />
        Return on investment: {numeral(returnOnInvestment).format('0,0.00%')}
      </div>
    );
  }
}

ShopItemStats.propTypes = {
  asset: React.PropTypes.instanceOf(Asset).isRequired,
  totalRevenueEverEarned: React.PropTypes.number.isRequired,
};

export default ShopItemStats;
