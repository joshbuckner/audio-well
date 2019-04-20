import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './Importsong.css';

class Importsong extends Component {
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

  onNameChange = (event) => {
    this.setState({songName: event.target.value});
  }

	render() {
    return (
      <div className="form-container">
        <div className="form-import">
          <h1 className="h3 mb-4">Import Audio</h1>
          <FilePond files={this.state.files} allowMultiple={false} name={'file'} server='http://192.168.0.27:3000/upload' ref={ref => this.pond = ref} onupdatefiles={(fileItems) => {this.setState({ files: fileItems.map(fileItem => fileItem.file) });}}/>
          <label className="sr-only" htmlFor="name">Song Name</label>
          <input onChange={this.onNameChange} className="form-control" placeholder="Song Name" type="text" name="song-name"  id="song-name"/>
          <button onClick={this.addSong} className="btn btn-lg btn-primary btn-block mb-3" type="submit" value="Import">Import</button>
        </div>
      </div>
    );
  }
}

export default Importsong;