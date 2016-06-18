import React from 'react';
import Mousetrap from 'mousetrap';

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
    const imgSrc = `images/${this.props.name}.png`;

    return (
      <div className="shop-item panel panel-default" onClick={this.props.onClick}>
        <div className="panel-body">
          <img className="col-md-2" src={imgSrc}/>
          <div className="shop-item-content col-md-8">
            <div className="shop-item-title">{this.props.name}</div>
            <div className="shop-item-cost">${this.props.price.toFixed(2)}</div>
          </div>
          <div className="shop-item-number col-md-2">{this.props.numOwned}</div>
        </div>
      </div>
    );
  }
}

KeyBoundShopItem.propTypes = {
  keyCode: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  numOwned: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
  price: React.PropTypes.number.isRequired,
};

export default KeyBoundShopItem;
