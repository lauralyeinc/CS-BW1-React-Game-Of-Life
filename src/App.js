import React from 'react';
import './App.css';

import Game from './components/game.js';

function App() {
  return (
    <main>
      <h1>Conway's Game of Life By Laura Theimer</h1>
      {/* <h2> Game coming soon ... </h2> */}
      <Game />
    </main>
  );
}

export default App;
