import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Notelist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Notelist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [
				{note: 'Start', time: '0:00', color: 'vivid-tangerine'}
			],
			note: 'New Note',
			counter: 0,
			currentNote: "",
		};
		this.handleNoteInput = this.handleNoteInput.bind(this);
	}

	componentDidMount() {
		console.log(this.props.user);
	}

	seekAudio = (event) => {
		let startTime = event.target.parentNode.childNodes[0].innerHTML;
		let minutes = Number(startTime.slice(0,1));
		let seconds = Number(startTime.slice(2,4));
		const audio = document.getElementById('audio-element');
		let newCurrentTime = (minutes * 60) + seconds;

		audio.currentTime = newCurrentTime;
		// audio.play();
		this.props.notePlay();
	}

	expandNote = (event) => {
	  const toggle = event.currentTarget.parentNode.parentNode.parentNode;
	  const angleIcon = event.currentTarget;
	  angleIcon.classList.toggle('rotate');
	  toggle.classList.toggle('open');
	}

	createList = () => {
		let list = [];
		for (let i = 0; i < this.props.user.songs.length; i++) {
			if (this.props.user.songs[i].name === this.props.song) {
				for (let z = 0; z < this.props.user.songs[i].notes.length; z++) {
					list.push(
		  			<Row key={z}>
			  			<Col>
				  			<li className={"list-note " + this.props.user.songs[i].notes[z].color}>
					  			<Row>
					  				<Col style={{textAlign: 'left', overflow: 'hidden'}}>
											<div className="note-time">{this.props.user.songs[i].notes[z].time}</div>
											<div onClick={this.seekAudio} className="note-title">{this.props.user.songs[i].notes[z].title}</div>
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
			}
		}
		return list;
	}

	// createNote = () => {
	// 	let timeStamp = this.props.time;
	// 	let colorPallete = ['deep-ruby', 'oxford-blue', 'moonstone-blue', 'fuzz-wuzzy', 'vivid-tangerine'];
		
	// 	if (this.state.counter < 4) {
	// 		this.setState({counter: this.state.counter + 1});
	// 	} else {
	// 		this.setState({counter: 0});
	// 	}

	// 	this.setState({notes: this.state.notes.concat({note: this.state.note, time: timeStamp, color: colorPallete[this.state.counter]})});
	// 	document.getElementById('note-input').value = "";
	// 	this.setState({note: 'New Note'});
	// }

	createNote = () => {
		let timeStamp = this.props.time;
		let colorPallete = ['deep-ruby', 'oxford-blue', 'moonstone-blue', 'fuzz-wuzzy', 'vivid-tangerine'];
		
		if (this.state.counter < 4) {
			this.setState({counter: this.state.counter + 1});
		} else {
			this.setState({counter: 0});
		}

	  fetch('http://localhost:3000/addnote', {
	    method: 'post',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({
	      note: {
	      	title: this.state.note, 
	      	time: timeStamp, 
	      	color: colorPallete[this.state.counter]
	      },
	      user: this.props.user.email,
	      song: this.props.song
	    })
	  })
	  .then(response => response.json())
	  .then(user => {
	    if (user.id) {
	      this.props.loadUser(user);
	    }
	  document.getElementById('note-input').value = "";
	  });
	  // this.setState({ files: "" });
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
    	<div className="Notelist">
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
												<input autoComplete="off" placeholder="New Note" id="note-input" type="text" onChange={this.handleNoteInput} onKeyPress={this.handleKeyPress.bind(this)}/>
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
      </div>
    );
  }
}

export default Notelist;
