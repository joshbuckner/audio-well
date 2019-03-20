import React, { Component } from 'react';

import './Waveform.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Waveform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			db: [
				{note: 'Start', time: '0:00', color: 'vivid-tangerine'}
			],
			note: 'New Note',
			counter: 0
		};
		this.handleNoteInput = this.handleNoteInput.bind(this);
	}

	seekAudio = (event) => {
		let startTime = event.target.parentNode.childNodes[0].innerHTML;
		let minutes = Number(startTime.slice(0,1));
		let seconds = Number(startTime.slice(2,4));
		const audio = document.getElementById('audio-element');
		let newCurrentTime = (minutes * 60) + seconds;

		audio.currentTime = newCurrentTime;
		audio.play();
	}

	expandNote = (event) => {
	  const toggle = event.currentTarget.parentNode.parentNode.parentNode;
	  const angleIcon = event.currentTarget;
	  angleIcon.classList.toggle('rotate');
	  toggle.classList.toggle('open');
	}

	createList = () => {
		let list = [];
		for (let i = 0; i < this.state.db.length; i++) {
  		list.push(
  			<Row key={i}>
	  			<Col>
		  			<li className={"list-note " + this.state.db[i].color}>
			  			<Row>
			  				<Col style={{textAlign: 'left', overflow: 'hidden'}}>
									<div className="note-time">{this.state.db[i].time}</div>
									<div onClick={this.seekAudio} className="note-title">{this.state.db[i].note}</div>
								</Col>
								<Col xs="2" sm="2" md="1" lg="1" xl="1" style={{paddingLeft: 0}}>
			  					<FontAwesomeIcon onClick={this.expandNote} className="note-expand-icon note-expand" icon="angle-down" />
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="note-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex nulla, sagittis ac lacinia ut, semper a lorem. Sed et condimentum velit, quis lobortis erat. Nulla facilisi. Donec nec lorem sed elit porta rhoncus a quis orci. Donec dignissim ex et faucibus aliquam. </div>
								</Col>
								<Col xs="2" sm="2" md="1" lg="1" xl="1" style={{paddingLeft: 0}}>
									<Row>
										<Col style={{paddingLeft: '.7rem'}}>
											<FontAwesomeIcon onClick={this.editNote} className="note-edit-icon" icon="edit" />
										</Col>
									</Row>
									<Row>
										<Col style={{paddingLeft: '.45rem'}}>
											<FontAwesomeIcon onClick={this.deleteNote} className="trash-icon" icon="trash"/>
										</Col>
									</Row>
								</Col>
							</Row>
		  			</li>
	  			</Col>
	  		</Row>
  		);
		}
		return list;
	}

	createNote = () => {
		let timeStamp = this.props.time;
		let colorPallete = ['deep-ruby', 'oxford-blue', 'moonstone-blue', 'fuzz-wuzzy', 'vivid-tangerine'];
		
		if (this.state.counter < 4) {
			this.setState({counter: this.state.counter + 1});
		} else {
			this.setState({counter: 0});
		}

		this.setState({db: this.state.db.concat({note: this.state.note, time: timeStamp, color: colorPallete[this.state.counter]})});
		document.getElementById('note-input').value = "";
		this.setState({note: 'New Note'});
	}

	deleteNote = (event) => {
		event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
	}
	editNote = (event) => {
		console.log(event.currentTarget);
		// event.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
	}

	handleNoteInput(event) {
    this.setState({note: event.target.value});
  }

  handleKeyPress(event) {
  	if (event.key === 'Enter') {
  		this.createNote();
  	}
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
		          			<Row>
							  			<Col>
								  			<li className="list-add-note dark-theme">
								  			<Row>
								  				<Col style={{textAlign: 'left'}}>
														<div className="current-time" id="current-time">{this.props.time}</div>
														<input placeholder="New Note" id="note-input" type="text" onChange={this.handleNoteInput} onKeyPress={this.handleKeyPress.bind(this)}/>
													</Col>
													<Col xs="2" sm="2" md="1" lg="1" xl="1" style={{paddingLeft: 0}}>
														<div onClick={this.createNote} className="add-note">
								  						<FontAwesomeIcon className="note-add-icon" icon="plus" />
														</div>
													</Col>
												</Row>
								  			</li>
							  			</Col>
							  		</Row>
	          		</ul>
	          	</Col>
	          </Row>
          </Container>
          {/*<Container>
          	          <Row>
          		          <Col className="new-note">
          			          <div className="current-time" id="current-time">0:00</div>
          			      		<input id="note-input" type="text" onChange={this.handleNoteInput} />
          		          	<button onClick={this.createNote} className="add-note">+</button>
          		          </Col>
          	          </Row>
                    </Container>*/}

        </Container-fluid>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Waveform;
