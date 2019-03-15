import React, { Component } from 'react';
import axios from 'axios';
import './Waveform.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tape from '../../Tape.mp4';
import Seoul from '../../Seoul.mp4';
import Ink from '../../Ink.mp4';
import Aerial from '../../Aerial.mp4';
import Neon from '../../Neon.mp4';

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

function handlePlay() {
	var vid = document.getElementById('myVideo');
	vid.play();
}

function handlePause() {
	var vid = document.getElementById('myVideo');
	vid.pause();
}

function setVideoTape() {
	var vid = document.getElementById('myVideo');
	vid.src = Tape;
	vid.play();
}

function setVideoSeoul() {
	var vid = document.getElementById('myVideo');
	vid.src = Seoul;
	vid.play();
}

function setVideoInk() {
	var vid = document.getElementById('myVideo');
	vid.src = Ink;
	vid.play();
}

function setVideoAerial() {
	var vid = document.getElementById('myVideo');
	vid.src = Aerial;
	vid.play();
}

function setVideoNeon() {
	var vid = document.getElementById('myVideo');
	vid.src = Neon;
	vid.play();
}

class Waveform extends Component {
	render() {
    return (
      <div className="Waveform">
        <Container-fluid>
          <Row>
            <Col>
          		{/* our audio element */}
          		<label htmlFor="input" id="lbl-file-picker" className="lbl-file-picker">Import Audio</label>
          		<input onChange={inputAudio} type="file" id="input" className="file-picker"/>
            </Col>
          </Row>
        	<Row>
        		<Col>
        			{/* this SVG is the "background" and progress bar */}
          		<svg viewBox="0 0 100 100" className="waveform-container" preserveAspectRatio="none">
              	<rect className="waveform-bg" x="0" y="0" height="100" width="100"/>
              	<rect id="waveform-progress" className="waveform-progress" x="0" y="0" height="100" width="0"/>
          		</svg>
          		{/* this SVG is the "clipping mask" - the waveform bars */}
          		<svg height="0" width="0">
              	<defs>
                  <clipPath id="waveform-mask"></clipPath>
              	</defs>
          		</svg>
        		</Col>
        	</Row>
        	<Row>
        		<Col>
          		<audio onPlay={handlePlay} onPause={handlePause} id="audio-element" className="audio-element"controls="controls">
                <source src="" id="audio-source" />
              </audio>
            </Col>
          </Row>
          <Row>
        		<Col>
        			<button onClick={setVideoTape} className="video-picker">Tape</button>
        			<button onClick={setVideoSeoul} className="video-picker">Seoul</button>
        			<button onClick={setVideoInk} className="video-picker">Ink</button>
        			<button onClick={setVideoAerial} className="video-picker">Aerial</button>
        			<button onClick={setVideoNeon} className="video-picker">Neon</button>
        		</Col>
        	</Row>
        </Container-fluid>
      </div>
    );
  }
}

export default Waveform;
