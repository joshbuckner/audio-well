import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Waveform from './components/Waveform/Waveform';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="revize">Revize</h1>
        <Waveform />
      </div>
    );
  }
}

export default App;
