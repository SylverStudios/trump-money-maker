import React, { Component, PropTypes } from 'react';

import Teller from './Teller';

class TellerSection extends Component {

  renderTellers() {
    const tellers = Array(this.props.numTellers).fill().map((undef, i) => (
      <Teller key={`teller${i}`} ref={`teller${i}`} />
    ));
    return <div>{tellers}</div>;
  }

  render() {
    const { numTellers, purchaseTeller, tellerPrice } = this.props;
    return (
      <div className="TellerSection">
        <div>Number of tellers: {numTellers}</div>
        <button onClick={purchaseTeller} >Buy a teller ${tellerPrice}</button>
        {this.renderTellers()}
      </div>
    );
  }
}
TellerSection.propTypes = {
  lastCollected: PropTypes.number.isRequired,
  numTellers: PropTypes.number.isRequired,
  purchaseTeller: PropTypes.func.isRequired,
  tellerPrice: PropTypes.number.isRequired,
};

export default TellerSection;
