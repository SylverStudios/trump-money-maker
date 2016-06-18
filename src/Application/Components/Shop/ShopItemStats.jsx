import React from 'react';

class ShopItemStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel-footer">
        <div>All this info about {this.props.name}!</div>
      </div>
    );
  }
}

ShopItemStats.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default ShopItemStats;
