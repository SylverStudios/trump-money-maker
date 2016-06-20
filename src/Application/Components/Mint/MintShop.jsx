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
      message = `Upgrade Denomination for $${nextDenomination.priceToUnlock}`;
      onUpgrade = this.props.onUpgrade;
    } else {
      message = 'Nein more upgrades';
    }
    return (
      <button className="btn mint-shop" onClick={onUpgrade} disabled={!nextDenomination}>
        {message}
      </button>
    );
  },
});

export default MintShop;
