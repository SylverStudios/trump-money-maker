import React from 'react';

const img = 'images/SylverBar100.png';

const Logo = () => (
  <div className="logo-container">
    <img className="shop-item-image" src={img}/>
        <span className="studio-name">
          Sylver Studios
        </span>
        <div className="vert-stack">
          <span>
            Real friends send constructive criticism
          </span>
        </div>
        <div className="vert-stack">
            <span className="email-link">
              sylverstudiosdev@gmail.com
            </span>
        </div>
  </div>
);

export default Logo;
