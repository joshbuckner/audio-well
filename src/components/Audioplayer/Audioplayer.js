import React, { Component } from 'react';
import axios from 'axios';
import './Audioplayer.css';
import Scrubber from '../Scrubber/Scrubber';
import Controls from '../Controls/Controls';
// import Waveform from '../Waveform/Waveform';
import Timestamps from '../Timestamps/Timestamps';


class Audioplayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
      rawTime: 0,
      currentTime: '0:00',
      duration: 0,
      playStatus: 'play'
    };
	}

  componentDidMount() {
    let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    const NUMBER_OF_BUCKETS = 400; // number of "bars" the waveform should have
    const SPACE_BETWEEN_BARS = 0.2; // from 0 (no gaps between bars) to 1 (only gaps - bars won't be visible)

    document.getElementById('audio-source').src = `http://192.168.0.27:3000/public/files/${this.props.song}`;
    document.getElementById('audio-element').load();
    document.getElementById('audio-element').controls = false;

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
        // every 100 milliseconds, update the waveform-progress SVG with a new width - the percentage of time elapsed on the audio file
        this.waveformUpdater = setInterval(() => {
          let audioElement = document.getElementById('audio-element');
          let waveformProgress = document.getElementById('waveform-progress');
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
        this.audioTimer = setInterval(() => {
          let audioElement = document.getElementById('audio-element');
          let timeDisplay = Math.round(audioElement.currentTime - .6);
          let minutes = Math.floor(timeDisplay / 60);
          let seconds = timeDisplay % 60;
          // let duration = this.state.duration;
          // calculate percent of song
          // let percent = (timeDisplay / duration) * 100 + '%';
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          if (seconds === "0-1") {
            minutes = "0";
            seconds = "00";
          }
          
          // this.updateScrubber(percent);
          this.props.updateTime(minutes + ":" + seconds);
          this.setState({ rawTime: audioElement.currentTime, currentTime: minutes + ":" + seconds, duration: audioElement.duration });
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

  componentWillUnmount() {
    clearInterval(this.waveformUpdater);
    clearInterval(this.audioTimer);
  }

  togglePlay = () => {
    let status = this.state.playStatus;
    let audio = document.getElementById('audio-element');
    if(status === 'play') {
      status = 'pause';
      audio.play();
    } else {
      status = 'play';
      audio.pause();
    }
    this.setState({ playStatus: status });
  }

  // updateScrubber = (percent) => {
  //   // Set scrubber width
  //   let innerScrubber = document.querySelector('.Scrubber-Progress');
  //   innerScrubber.style['width'] = percent;
  // }

  handleSeekAudio = (event) => {
    // console.log(this.state.rawTime, this.state.duration);
    let audio = document.getElementById('audio-element');
    let percent = event.clientX / window.screen.width;

    audio.currentTime = percent * this.state.duration;
    // this.setState({ playStatus: 'pause'});
    // audio.play();
  }

	render() {
    return (
    	<div className="audio-player">
        <Scrubber handleSeekAudio={this.handleSeekAudio} />
        {/*<Waveform />*/}
        <Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
        <Timestamps duration={this.state.duration} currentTime={this.state.currentTime} />
    		<audio id="audio-element" className="audio-element"controls="controls">
          <source src="" id="audio-source" />
        </audio>
      </div>
    );
  }
}

export default Audioplayer;