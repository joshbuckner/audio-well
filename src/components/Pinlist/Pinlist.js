import React, { Component } from 'react';
import './Pinlist.css';


class Pinlist extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

  createPins = () => {
    // this.handlePinPosition();
    let list = [];
    for (let i = 0; i < this.props.user.songs.length; i++) {
      if (this.props.user.songs[i].name === this.props.song) {
        for (let z = 0; z < this.props.user.songs[i].notes.length; z++) {
          list.push(
            <div key={z}>
              <div className={"Pinlist " + this.props.user.songs[i].notes[z].color + "__pin"} style={{ left: this.handlePinPosition(this.props.user.songs[i].notes[z].time) + "vw" }}>
                <div style={{ color: 'white', fontSize: '14px' }}>
                  {this.props.user.songs[i].notes[z].title}
                </div>
                <i className="fas fa-map-marker-alt"></i>
              </div>
             
            </div>
          );
        }
      }
    }
    return list;
  }

  handlePinPosition = (noteTime) => {
    let minutes = noteTime.substring(0, 1);
    let seconds = noteTime.substring(2, 4);
    let pinTime = (Number(minutes) * 60) + Number(seconds);
    let pinPos = (pinTime / this.props.duration) * 100;
    if (pinPos) {
      return pinPos;
    }
    
  }
//{this.props.user.songs[i].notes[z].time}
//<i className="fas fa-map-marker-alt"></i>
	render() {
    return (
    	<div>
      {this.createPins()}
      </div>
    );
  }
}

export default Pinlist;