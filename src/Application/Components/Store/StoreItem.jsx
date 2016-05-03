import React from "react";

const StoreItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    owned: React.PropTypes.number.isRequired,
    price: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      name: 'unknown',
      price: 0,
      owned: 0,
    };
  },

  render() {
    const imgSrc = `images/${this.props.name}.png`;

    return (

        <div className="store-item panel panel-default" onClick={this.props.onClick}>
          <div className="panel-body">
            <img className="col-md-2" src={imgSrc}/>
            <div className="item-content col-md-8">
              <div className="item-title">{this.props.name}</div>
              <div className="item-cost">${this.props.price.toFixed(2)}</div>
            </div>
            <div className="item-number col-md-2">{this.props.owned}</div>
          </div>
        </div>
    );
  },

});

export default StoreItem;