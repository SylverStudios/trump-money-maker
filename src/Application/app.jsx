import React from 'react';
import ShopContainer from './Components/Shop/ShopContainer';
import NewsRoomContainer from './Components/NewsRoom/NewsRoomContainer';
import RealEstateMapContainer from './Components/RealEstateMap/RealEstateMapContainer';
import TellerSection from './Components/Tellers/TellerSectionContainer';
import SimpleClickCanvasContainer from './Components/SimpleClickCanvas/SimpleClickCanvasContainer';
import MintShopContainer from './Components/Mint/MintShopContainer';
import ScoreRollupContainer from './Components/ScoreRollup/ScoreRollupContainer';
import Logo from './Components/Logo/Logo';
import ModalContainer from './Components/Modal/ModalContainer';

const App = () => (
  <div className="app-container">

    <ModalContainer />

    <div className="header-row col-md-12">
      <div className="col-md-3">
        <ScoreRollupContainer />
      </div>

      <div className="col-md-2">
        <TellerSection />
      </div>

      <div className="col-md-2">
        <SimpleClickCanvasContainer />
      </div>

      <div className="col-md-2">
        <MintShopContainer />
      </div>

      <div className="col-md-3">
        <Logo />
      </div>
    </div>

    <div className="body-row col-md-12">
      <div className="col-md-9">
        <div className="feedback-zone">

          <div className="map-zone">
            <RealEstateMapContainer />
          </div>

          <div className="news-zoom">
            <NewsRoomContainer />
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <ShopContainer />
      </div>
    </div>

  </div>
);


export default App;
