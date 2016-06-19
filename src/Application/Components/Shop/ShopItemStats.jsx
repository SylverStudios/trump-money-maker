import React from 'react';
import numeral from 'numeral';

class ShopItemStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel-footer">
        Revenue Earned: {numeral(this.props.revenue).format('($0.00 a)')}
        <br />
        Total Investment: {numeral(this.props.totalInvestment).format('($0.00 a)')}
      </div>
    );
  }
}

ShopItemStats.propTypes = {
  name: React.PropTypes.string.isRequired,
  revenue: React.PropTypes.number.isRequired,
  totalInvestment: React.PropTypes.number.isRequired,
};

export default ShopItemStats;
