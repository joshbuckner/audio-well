import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faPlus} from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Waveform from './components/Waveform/Waveform';

library.add(faAngleUp, faPlus);



const NUMBER_OF_BUCKETS = 300; // number of "bars" the waveform should have
const SPACE_BETWEEN_BARS = 0.2; // from 0 (no gaps between bars) to 1 (only gaps - bars won't be visible)

let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

const inputAudio = (event) => {
  var input = event.target.files;
  document.getElementById('lbl-file-picker').innerHTML = event.target.files[0].name;
  document.getElementById('audio-source').src = URL.createObjectURL(input[0]);
  document.getElementById('audio-element').load();

  axios({url: document.getElementById('audio-source').src, responseType: "arraybuffer"}).then(response => {
	  let audioData = response.data;

	  audioCtx.decodeAudioData(audioData, buffer => {
	    let decodedAudioData = buffer.getChannelData(0);
	    let bucketDataSize = Math.floor(decodedAudioData.length / NUMBER_OF_BUCKETS);
	    let buckets = [];
	    for (var i = 0; i < NUMBER_OF_BUCKETS; i++) {
	      let startingPoint = i * bucketDataSize;
	      let endingPoint = i * bucketDataSize + bucketDataSize;
	      let max = 0;
	      for (var j = startingPoint; j < endingPoint; j++) {
	        if (decodedAudioData[j] > max) {
	        	max = decodedAudioData[j];
	        }
	      }
	      let size = Math.abs(max);
	      buckets.push(size / 2);
	    }

	    document.getElementById('waveform-mask').innerHTML = buckets.map((bucket, i) => {
	      let bucketSVGWidth = 100.0 / buckets.length;
	      let bucketSVGHeight = bucket * 150.0;

	      return `<rect
	        x=${bucketSVGWidth * i + SPACE_BETWEEN_BARS / 2.0}
	        y=${ (100 - bucketSVGHeight) / 2.0}
	        width=${bucketSVGWidth - SPACE_BETWEEN_BARS}
	        height=${bucketSVGHeight} />`;
	    }).join('');
	    let audioElement = document.getElementById('audio-element');
	    let waveformProgress = document.getElementById('waveform-progress');
	    // every 100 milliseconds, update the waveform-progress SVG with a new width - the percentage of time elapsed on the audio file
	    setInterval(() => {
	      waveformProgress.setAttribute('width', audioElement.currentTime / audioElement.duration * 100);
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
	      document.getElementById('current-time').innerHTML = minutes + ":" + seconds;

	    }, 100);
	  }, e => {
	    // callback for any errors with decoding audio data
	    console.log('Error with decoding audio data' + e.err);
	  },);
  }).catch(err => {
    // catch any errors with fetching the audio
    console.log(err);
  });
}

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
      console.log(this.state.time);
    }, 100);
  }
	

  render() {
    return (
      <div id="App" className="App">
	      <div className="fixed-controls-top">
	      	<Row>
	      		<Col>
	        		{/* our audio element */}
	        		<label htmlFor="input" id="lbl-file-picker" className="lbl-file-picker hvr-push">Import Audio</label>
	        		<input onChange={inputAudio} type="file" id="input" className="file-picker"/>
	          </Col>
	      	</Row>
	      </div>
	        <Waveform time={this.state.time}/>
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
