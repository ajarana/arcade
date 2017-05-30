import React from 'react';
import './css/App.css';
import AsyncApp from './containers/Filter';

function App() {
  return (
    <div className="App">
      <div id="contentWrapper">
      <AsyncApp />
      </div>
    </div>
  )
}

export default App;
