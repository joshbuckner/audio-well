import React, { Component } from 'react';

import './Waveform.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const seekAudio = (event) => {
	let startTime = event.target.parentNode.childNodes[0].innerHTML.slice(1,5)
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
				{note: 'Start', time: '0:00', color: 'vivid-tangerine'},
			],
			note: '',
			counter: 0
		};
		this.handleNoteInput = this.handleNoteInput.bind(this);
	}

	createList = () => {
		let list = [];
		for (let i = 0; i < this.state.db.length; i++) {
  		list.push(
  			<Row key={i}>
	  			<Col>
		  			<li className={"list-note hvr-push " + this.state.db[i].color}>
							<div className="note-time" onClick={this.consoleLog}>({this.state.db[i].time}) </div>
							<div className="note-title" onClick={seekAudio}>{this.state.db[i].note}</div>
		  			</li>
	  				<button onClick={this.deleteNote} className="delete-note">X</button>
	  			</Col>
	  		</Row>
  		);
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
		let colorPallete = ['deep-ruby', 'oxford-blue', 'moonstone-blue', 'fuzz-wuzzy', 'vivid-tangerine'];
		
		if (this.state.counter < 4) {
			this.setState({counter: this.state.counter + 1});
		} else {
			this.setState({counter: 0});
		}

		this.setState({db: this.state.db.concat({note: this.state.note, time: timeStamp, color: colorPallete[this.state.counter]})});
		document.getElementById('note-input').value = "";
		this.setState({note: ''});
		// .concat({note: 'test note', time: '0:35', color: 'oxford-blue'});
	}

	deleteNote = (event) => {
		event.target.parentNode.remove()
	}

	handleNoteInput(event) {
    this.setState({note: event.target.value});
  }

  consoleLog = () => {
  	console.log('hi');
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
		          <Col className="new-note">
			          <div className="current-time" id="current-time">0:00</div>
			      		<input id="note-input" type="text" onChange={this.handleNoteInput} />
		          	<button onClick={this.createNote} className="add-note">+</button>
		          </Col>
	          </Row>
          </Container>
        </Container-fluid>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Waveform;
