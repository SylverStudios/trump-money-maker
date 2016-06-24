import React from 'react';
import ShopContainer from './Components/Shop/ShopContainer';
import NewsRoomContainer from './Components/NewsRoom/NewsRoomContainer';
import MapCanvasContainer from './Components/MapCanvas/MapCanvasContainer';
import ClickCanvasContainer from './Components/ClickCanvas/ClickCanvasContainer';
import MintShopContainer from './Components/Mint/MintShopContainer';

const App = () => (
    <div>
      <div className="side-panel col-md-3">
          <NewsRoomContainer />
      </div>

      <div className="center-panel col-md-6">
          <ClickCanvasContainer />
          <MintShopContainer />
          <MapCanvasContainer />
      </div>

      <div className="side-panel col-md-3">
          <ShopContainer />
      </div>
    </div>
);

export default App;
