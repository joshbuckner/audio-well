import React, { Component } from 'react';
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
	      		<div className="account-portal">
		        	<div onClick={() => onRouteChange('userPortal')}>Account Portal</div>
		        </div>
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