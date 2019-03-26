import React, { Component } from 'react';
import './Songlist.css';

class Songlist extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { onRouteChange } = this.props;
    return (
    	<div className="Songlist" onClick={() => onRouteChange('songView')}>Songlist</div>
    );
  }
}

export default Songlist;