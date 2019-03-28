import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './Uploader.css';

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
      files: [
      ]
    }
	}

  addSong = () => {
    if (this.state.files[0]) {
      fetch('http://10.0.0.229:3000/addsong', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.files[0].name,
        user: this.props.user.email
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
      }
    });
    // this.props.createSong(`${this.state.files[0].name}`);
    this.setState({ files: "" });
    }
    //   }
    // })
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

	render() {
    return (
    	<div>
    		<FilePond oninit={() => this.handleInit()} files={this.state.files} allowMultiple={false} name={'file'} server='http://10.0.0.229:3000/upload' ref={ref => this.pond = ref} onupdatefiles={(fileItems) => {this.setState({ files: fileItems.map(fileItem => fileItem.file) });}}/>
	    	<button onClick={this.addSong} className="upload-btn">Upload</button>
    	</div>
    );
  }
}

export default Uploader;