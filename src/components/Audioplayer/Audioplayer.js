import React, { Component } from 'react';
import './Audioplayer.css';


class Audioplayer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

  componentDidMount() {
    document.getElementById('audio-source').src = `http://10.0.0.229:3000/public/files/${this.props.song}`;
    document.getElementById('audio-element').load();
    console.log(document.getElementById('audio-source').src);
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
      this.props.updateTime(minutes + ":" + seconds);
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