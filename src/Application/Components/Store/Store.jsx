import React from 'react';
import StoreItem from './StoreItem';

const Store = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  },

  render() {
    return (
        <div id="store-zone">
          <h3>Broker</h3>
          <div id="item-menu">
            {this.props.assets.map((asset, index) => {
              const onClick = () => {
                this.props.onItemClick(index);
              };
              return (
                <StoreItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  owned={asset.owned}
                  onClick={onClick}
                />
              );
            })}
          </div>
        </div>
    );
  },
});

export default Store;
