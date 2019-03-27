import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Uploader from '../Uploader/Uploader';
import './Songlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Songlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			db: [
				'Song 1', 'Song 2', 'Song 3'
			],
		}
	}

	createList = () => {
		const { onRouteChange } = this.props;
		let list = [];
		for (let i = 0; i < this.state.db.length; i++) {
  		list.push(
  			<Row key={i}>
	  			<Col>
		  			<li className="list-song">
		  				<Row>
		  					<Col onClick={() => onRouteChange('songView')}>
			  					{this.state.db[i]}
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
		return list;
	}

	createSong = (name) => {
		this.setState({db: this.state.db.concat(name)});
	}

	render() {
    return (
    	<div className="Songlist">
    		<Container>
    			<Row>
          	<Col className="songs-container">
          		<ul>
          			{this.createList()}
          		</ul>
          		<Uploader createSong={this.createSong} loadSong={this.props.loadSong}/>
          	</Col>
          </Row>
    		</Container>
    	</div>
    );
  }
}

export default Songlist;