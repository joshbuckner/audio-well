import React, { Component } from 'react';

import './Waveform.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const seekAudio = (event) => {
	let startTime = event.target.childNodes[0].innerHTML.slice(1,5);
	let minutes = Number(startTime.slice(0,1));
	let seconds = Number(startTime.slice(2,4));
	const audio = document.getElementById('audio-element');
	let newCurrentTime = (minutes * 60) + seconds;

	audio.currentTime = newCurrentTime;
	audio.play();
}

class Waveform extends Component {
	constructor(props) {
		super(props);

		this.state = {
			db: [
				{note: 'intro', time: '0:00', color: 'deep-ruby'},
				{note: 'guitar lead down', time: '0:49', color: 'oxford-blue'},
				{note: 'vocals up', time: '1:37', color: 'moonstone-blue'},
				{note: 'remove 2nd half of verse', time: '1:56', color: 'fuzz-wuzzy'},
				{note: 'add post production', time: '2:10', color: 'vivid-tangerine'},
				{note: 'fade out', time: '2:45', color: 'deep-ruby'},
			],
			note: ''
		};
		this.handleNoteInput = this.handleNoteInput.bind(this);
	}

	createList = () => {
		let list = [];
		for (let i = 0; i < this.state.db.length; i++) {
  		list.push(<li onClick={seekAudio} className={"list-note hvr-push " + this.state.db[i].color}><span>({this.state.db[i].time}) </span>{this.state.db[i].note}</li>);
		}
		return list;
	}

	createNote = () => {
		let audioElement = document.getElementById('audio-element');
		let timeDisplay = Math.round(audioElement.currentTime - .6);
		let minutes = Math.floor(timeDisplay / 60);
		let seconds = timeDisplay % 60;
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		let timeStamp = minutes + ":" + seconds;
		this.setState({db: this.state.db.concat({note: this.state.note, time: timeStamp, color: 'oxford-blue'})});
		document.getElementById('note-input').value = "";
		// .concat({note: 'test note', time: '0:35', color: 'oxford-blue'});
	}

	handleNoteInput(event) {
    this.setState({note: event.target.value});
  }

	render() {
    return (
      <div className="Waveform">
        <Container-fluid>
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
          <Container>
          <Row>
          	<Col className="notes-container">
          		<ul>
          			{this.createList()}
          		</ul>
          	</Col>
          </Row>
          </Container>
          <Container>
	          <Row>
		          <Col>
		      			<div className="current-time" id="current-time">0:00</div>
		      		</Col>
		      		<Col>
		      			<input id="note-input" type="text" onChange={this.handleNoteInput} />
		      		</Col>
	          	<Col>
	          		<button onClick={this.createNote} className="add-note">+</button>
	          	</Col>
	          </Row>
          </Container>
        </Container-fluid>
      </div>
    );
  }
}

export default Waveform;
