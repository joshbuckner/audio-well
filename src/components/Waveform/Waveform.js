import React, { Component } from 'react';
import './Waveform.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Waveform extends Component {
	constructor() {
		super();
		this.state = {};
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
        </Container-fluid>
      </div>
    );
  }
}

export default Waveform;
