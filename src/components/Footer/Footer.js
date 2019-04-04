import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';


class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
    return (
    	<div className="Footer">
      	<p className="footer-link"><FontAwesomeIcon icon={['fab', 'twitter']} /></p>
        <p className="footer-link"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></p>
        <p className="footer-link"><FontAwesomeIcon icon={['fab', 'instagram']} /></p>
        <p className="footer-link"><FontAwesomeIcon icon={'envelope'} /></p>
      </div>
    );
  }
}

export default Footer;