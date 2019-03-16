import React, { Component } from 'react';
import './App.css';
import Waveform from './components/Waveform/Waveform';

class App extends Component {
  render() {
    return (
      <div id="App" className="App">
        <Waveform />
      </div>
    );
  }
}

export default App;
