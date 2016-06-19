import React from 'react';
import Denomination from '../../Models/Denomination';

const MintShop = React.createClass({
  propTypes: {
    nextDenomination: React.PropTypes.instanceOf(Denomination),
    onUpgrade: React.PropTypes.func.isRequired,
  },
  render() {
    const { nextDenomination } = this.props;
    let message;
    let onUpgrade;
    if (nextDenomination) {
      message =
        `next denomination: ${nextDenomination.id}, ` +
        `income per click: ${nextDenomination.incomePerClick}, ` +
        `price to unlock: ${nextDenomination.priceToUnlock}`;
      onUpgrade = this.props.onUpgrade;
    } else {
      message = 'Nein more upgrades';
    }
    return (
      <div className="mint-shop" onClick={onUpgrade}>
        {message}
      </div>
    );
  },
});

export default MintShop;
