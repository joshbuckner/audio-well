import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './Uploader.css';


class Uploader extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { loadSong } = this.props;
    return (
    	<div className="file-pond">
    		<FilePond 
    			ref={ref => this.pond = ref}
    			allowMultiple={false} 
    			maxFiles={1} 
    			server='/' 
    			onupdatefiles={(file) => {
            // Set current file objects to this.state
            loadSong(file);
          }}/>
	    	{/*<button onClick={() => createSong(this.state.song.name)} className="upload-btn">Upload</button>*/}
    	</div>
    );
  }
}

export default Uploader;