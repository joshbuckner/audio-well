import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Userportal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Userportal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			db: [
				'Song 1', 'Song 2', 'Song 3'
			],
			currentSong: ""
		}
	}

	handleSongClick = (event) => {
		this.props.loadSong(event.target.innerText);
		this.props.onRouteChange('songView');
	}

	handleAddSong = () => {
		this.props.onRouteChange('addSongView');
	}

	createList = () => {
		let list = [];
		for (let i = 0; i < this.props.user.songs.length; i++) {
  		list.push(
  			<Row key={i}>
	  			<Col>
		  			<li className="list-song">
		  				<Row>
		  					<Col onClick={this.handleSongClick}>
			  					{this.props.user.songs[i].name}
			  				</Col>
			  				<Col xs="2" sm="2" md="1" lg="1" xl="1">
			  					<FontAwesomeIcon className="song-options-icon" icon="ellipsis-h" />
			  				</Col>
			  			</Row>
		  			</li>
	  			</Col>
	  		</Row>
  		);
		}
		if (list.length !== 0) {
			return list;
		}
	}

	render() {
    return (
    	<div className="Userportal">
    		<Container>
    			<Row className="songs-container">
        		<Col>
          		<div className="list-container">
	          		<h6>Member</h6>
	          		<ul>
	          			{/*this.createList()*/}
	          			<p style={{ textAlign: 'center', fontSize: '1rem', color: 'gray' }}>Accept a song request to view songs you don't own.</p>
	          		</ul>
	          	</div>
	          	<div className="list-container">
	          		<h6>Owned</h6>
	          		<ul>
	          			{this.createList()}
	          		</ul>
	          		<div onClick={this.handleAddSong} className="add-song">
		  						<FontAwesomeIcon className="add-song-icon" icon="plus" />
								</div>
          		</div>
          	</Col>
          </Row>
    		</Container>
    	</div>
    );
  }
}

export default Userportal;