import React from 'react';
import StoreContainer from './Containers/StoreContainer';
import NewsRoomContainer from './Containers/NewsRoomContainer';
import MapCanvasContainer from './Containers/MapCanvasContainer';
import ClickCanvasContainer from './Containers/ClickCanvasContainer';

const App = () => (
    <div>
      <div className="col-md-3">
          <NewsRoomContainer />
      </div>

      <div className="col-md-6">
          <ClickCanvasContainer />
          <MapCanvasContainer />
      </div>

      <div className="col-md-3">
          <StoreContainer />
      </div>
    </div>
);

export default App;
