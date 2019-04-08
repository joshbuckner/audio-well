import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import Form from 'react-bootstrap/Form';
import './Uploader.css';

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
      files: [
      ],
      songName: "",
      members: []
    }
	}

  addSong = () => {
    if (this.state.files[0]) {
      fetch('http://192.168.0.27:3000/addsong', {
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
    this.setState({ files: "" });
    this.props.onRouteChange('userPortal');
    }
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  onEmailsChange = (event) => {
    this.setState({members: event.target.value.split(', ')});
  }

  onNameChange = (event) => {
    this.setState({songName: event.target.value});
  }

	render() {
    return (
    	<div>
    		<FilePond oninit={() => this.handleInit()} files={this.state.files} allowMultiple={false} name={'file'} server='http://192.168.0.27:3000/upload' ref={ref => this.pond = ref} onupdatefiles={(fileItems) => {this.setState({ files: fileItems.map(fileItem => fileItem.file) });}}/>
	    	<div className="list-container">
          <Form autoComplete="off">
            <Form.Group controlId="formGroupName">
              <Form.Label>Song Name</Form.Label>
              <Form.Control onChange={this.onNameChange} type="text" placeholder="Enter song name" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Members</Form.Label>
              <Form.Control onChange={this.onEmailsChange} type="email" placeholder="Enter member email addresses" allowmultiple="true"/>
            </Form.Group>
            <button onClick={this.addSong} className="upload-btn">Add Song</button>
          </Form>
        </div>
        
    	</div>
    );
  }
}

export default Uploader;