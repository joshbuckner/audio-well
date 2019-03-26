import React, { Component } from 'react';
import './Audioplayer.css';


class Audioplayer extends Component {
	constructor() {
		super();
		this.state = {};
	}

  componentDidMount() {
    this.audioTimer = setInterval(() => {
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

  componentWillUnmount() {
    clearInterval(this.audioTimer);
  }

	render() {
    return (
    	<div className="audio-player">
    		<audio id="audio-element" className="audio-element"controls="controls">
          <source src="" id="audio-source" />
        </audio>
      </div>
    );
  }
}

export default Audioplayer;