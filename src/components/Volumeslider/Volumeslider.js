import React from 'react';
import './Volumeslider.css';


const Volumeslider = (props) => {

	const slideVolume = (event) => {
		document.getElementById('audio-element').volume = event.target.value/100;
	}

  return (
  	<div id="Volumeslider">
  		<input onChange={slideVolume} id="volume" type="range" min="0" max="100"/>
			{/*<i class="fa fa-volume-down"></i>*/}
			{/*<div id="volume"></div>*/}
			{/*<i class="fa fa-volume-up"></i>*/}
		</div>
  );
}

export default Volumeslider;