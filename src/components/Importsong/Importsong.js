import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Uploader from '../Uploader/Uploader';
import './Importsong.css';

class Importsong extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
    return (
    	<div>
    		<Container > {/*style={{ padding: '0 15rem' }}*/}
          <Uploader createSong={this.createSong} loadSong={this.props.loadSong} user={this.props.user} loadUser={this.props.loadUser} onRouteChange={this.props.onRouteChange}/>
    		</Container>
    	</div>
    );
  }
}

export default Importsong;