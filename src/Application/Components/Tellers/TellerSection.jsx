import React, { Component, PropTypes } from 'react';

class TellerSection extends Component {
  render() {
    const { numTellers, purchaseTeller, tellerPrice } = this.props;
    return (
      <div className="TellerSection">
        <div>Number of tellers: {numTellers}</div>
        <button onClick={purchaseTeller} >Buy a teller ${tellerPrice}</button>
      </div>
    );
  }
}
TellerSection.propTypes = {
  numTellers: PropTypes.number.isRequired,
  purchaseTeller: PropTypes.func.isRequired,
  tellerPrice: PropTypes.number.isRequired,
};

export default TellerSection;
