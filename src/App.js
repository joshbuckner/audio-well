import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import Filepicker from './components/Filepicker/Filepicker';
import Waveform from './components/Waveform/Waveform';
import Notelist from './components/Notelist/Notelist';

library.add(faAngleDown, faPlus, faTrash, faEdit);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: '0:00'
		};
	}

	componentDidMount() {
    setInterval(() => {
    	let audioElement = document.getElementById('audio-element');
    	let timeDisplay = Math.round(audioElement.currentTime - .6);
      let minutes = Math.floor(timeDisplay / 60);
      let seconds = timeDisplay % 60;
      if (seconds < 10) {
      	seconds = "0" + seconds;
      }
      if (seconds === "0-1") {
      	minutes = "0";
      	seconds = "00";
      }
      this.setState({time: minutes + ":" + seconds});
    }, 100);
  }
	
  render() {
    return (
      <div id="App" className="App">
	      	<Filepicker />
	        <Waveform />
	        <Notelist time={this.state.time}/>
      		{/*create audio player component*/}
	        <div className="audio-player">
        		<audio id="audio-element" className="audio-element"controls="controls">
              <source src="" id="audio-source" />
            </audio>
		      </div>
      </div>
    );
  }
}

export default App;
