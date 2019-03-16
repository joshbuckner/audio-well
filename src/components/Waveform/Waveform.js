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
          	<Col>
          		<div className="notes-container">
	          		<ul>
	          			<li onClick={seekAudio} className="list-note oxford-blue">
	          			<span>(0:49) </span>guitar lead down
	          			</li>
	          			<li onClick={seekAudio} className="list-note moonstone-blue">
	          			<span>(1:37) </span>vocals up
	          			</li>
	          			<li onClick={seekAudio} className="list-note fuzz-wuzzy">
	          			<span>(1:56) </span>remove 2nd half of verse
	          			</li>
	          			<li onClick={seekAudio} className="list-note vivid-tangerine">
	          			<span>(2:10) </span>add post production
	          			</li>
	          			<li onClick={seekAudio} className="list-note deep-ruby">
	          			<span>(2:45) </span>fade out
	          			</li>
	          		</ul>
          		</div>
          	</Col>
          </Row>
          </Container>
          <Container>
          <Row>
	          <Col>
	      			<div className="current-time" id="current-time">0:00</div>
	      		</Col>
          	<Col>
          		<button className="add-note">+</button>
          	</Col>
          </Row>
          </Container>
        </Container-fluid>
        
      </div>
    );
  }
}

export default Waveform;
