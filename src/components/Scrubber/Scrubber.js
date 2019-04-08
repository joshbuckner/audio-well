import React from 'react';
import './Scrubber.css';
import Waveform from '../Waveform/Waveform';


const Scrubber = (props) => {
  return (
  	<div onClick={props.handleSeekAudio} className="Scrubber">
  		<Waveform />
			{/*<div className="Scrubber-Progress"></div>*/}
		</div>
  );
}

export default Scrubber;