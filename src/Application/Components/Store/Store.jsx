import React from 'react';
import StoreItem from './StoreItem';
import _ from 'underscore';

const Store = React.createClass({
  propTypes: {
    assets: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  },

  render() {
    return (
        <div id="store-zone" className="panel panel-primary">

          <div className="panel-heading">
            <h3 className="panel-title">Broker</h3>
          </div>

          <div id="item-menu" className="panel-body">
            {this.props.assets.map((asset) => {
              return (
                <StoreItem
                  key={asset.name}
                  name={asset.name}
                  price={asset.price}
                  owned={asset.owned}
                  onClick={_.partial(this.props.onItemClick, asset.id)}
                />
              );
            })}
          </div>
        </div>
    );
  },
});

export default Store;
