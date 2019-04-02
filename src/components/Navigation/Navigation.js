import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Navigation.css';


class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { onRouteChange } = this.props;
    return (
    	<div className="fixed-controls-top">
      	<Row>
          <Col>
            <div className="brand-logo" onClick={() => onRouteChange('userPortal')}>Audi<FontAwesomeIcon className="headphones-icon" icon="headphones" />well</div>
          </Col>
          <Col>
          	<div className="sign-out">
		        	<div onClick={() => onRouteChange('signIn')}>Sign Out</div>
		        </div>
          </Col>
      	</Row>
      </div>
    );
  }
}

export default Navigation;