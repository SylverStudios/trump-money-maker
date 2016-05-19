import React from 'react';
import Mousetrap from 'mousetrap';
import { assetDefaults } from './../../../util/constants';


class KeyBoundShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.keyCode = assetDefaults[this.props.name].keyCode;
  }

  componentDidMount() {
    Mousetrap.bind([this.keyCode], this.props.onClick);
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.keyCode);
  }

  render() {
    const imgSrc = `images/${this.props.name}.png`;

    return (
      <div className="shop-item panel panel-default" onClick={this.props.onClick}>
        <div className="panel-body">
          <img className="col-md-2" src={imgSrc}/>
          <div className="shop-item-content col-md-8">
            <div className="shop-item-title">{this.props.name}</div>
            <div className="shop-item-cost">${this.props.price.toFixed(2)}</div>
          </div>
          <div className="shop-item-number col-md-2">{this.props.owned}</div>
        </div>
      </div>
    );
  }
}

KeyBoundShopItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  owned: React.PropTypes.number.isRequired,
  price: React.PropTypes.number.isRequired,
};

export default KeyBoundShopItem;
