import React from 'react';
import LaunchList from "./components/LaunchList/LaunchList";
import Roadster from "./components/Roadster/Roadster";

function App() {
  return (
    <div className="app">
      <img
        className={'logo'}
        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SpaceX_logo_black.svg/2560px-SpaceX_logo_black.svg.png'}
        alt={''}/>
      <LaunchList/>
      <Roadster />
    </div>
  );
}

export default App;
