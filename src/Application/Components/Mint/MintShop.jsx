import React from 'react';
import numeral from 'numeral';
import Denomination from '../../Models/Denomination';

const upgradeImage = 'images/up_arrow.svg';

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
      message = `Price of limit increase: ${numeral(nextDenomination.priceToUnlock).format('($ 0.00 a)')}`;
      onUpgrade = this.props.onUpgrade;
    } else {
      message = 'Credit Limit maxed!';
    }
    return (
      <div className="mint-shop">
        {message}

        <button className="btn btn-success mint-upgrade-button" onClick={onUpgrade} disabled={!nextDenomination}>
          <img className="mint-upgrade-svg" src={upgradeImage}/>
          Increase Credit Limit
        </button>
      </div>
    );
  },
});

export default MintShop;
