import React from 'react';
import LaunchList from "./components/LaunchList/LaunchList";
import Roadster from "./components/Roadster/Roadster";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div className="app">
      <Logo />
      <LaunchList/>
      <Roadster />
    </div>
  );
}

export default App;
