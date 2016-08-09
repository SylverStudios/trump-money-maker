import React from 'react';

const img = 'images/SylverBar100.png';

const Logo = () => (
  <div className="logo-container">
    <img className="shop-item-image" src={img}/>
        <span className="studio-name">
          Sylver Studios
        </span>
  </div>
);

export default Logo;
