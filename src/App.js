import React, { Component } from 'react';
import './App.css';
import Waveform from './components/Waveform/Waveform';

class App extends Component {
  render() {
    return (
      <div id="App" className="App">
	      <video muted loop id="myVideo">
			  	<source id="video-source" type="video/mp4"/>
				</video>
        <Waveform />
      </div>
    );
  }
}

export default App;
