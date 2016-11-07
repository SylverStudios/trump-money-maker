import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';

const plusIcon = 'images/plus_icon.svg';

import Teller from './Teller';

class TellerSection extends Component {

  componentWillMount() {
    this.lastAnimatedIndex = 0;
  }

  componentDidUpdate(prevProps) {
    const { numTellers } = this.props;
    if (numTellers > 0 && this.props.lastCollected > prevProps.lastCollected) {
      // increase last animated index
      const indexToAnimate = (this.lastAnimatedIndex + 1) % numTellers;
      this.refs[`teller${indexToAnimate}`].animate();
      this.lastAnimatedIndex = indexToAnimate;
    }
  }

  renderTellers() {
    const tellers = Array(this.props.numTellers).fill().map((undef, i) => (
      <Teller key={`teller${i}`} ref={`teller${i}`} />
    ));
    return <div>{tellers}</div>;
  }

  render() {
    const { numTellers, purchaseTeller, tellerPrice } = this.props;
    const currentPrice = numeral(tellerPrice).format('($ 0.00 a)');
    return (
      <div className="TellerSection">
        <div className="control-section">
          <button className="btn btn-success teller-add-button" onClick={purchaseTeller} >
            <img src={plusIcon}/>
            Buy Teller
          </button>
          
          <div className="teller-info">
            <div>Number of tellers: {numTellers}</div>
            <div>Price of new Teller: {currentPrice}</div>
          </div>
        </div>
        <div className="display-section">
          {this.renderTellers()}
        </div>
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
