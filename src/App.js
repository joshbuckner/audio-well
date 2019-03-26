import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Filepicker from './components/Filepicker/Filepicker';
import Waveform from './components/Waveform/Waveform';
import Notelist from './components/Notelist/Notelist';
import Audioplayer from './components/Audioplayer/Audioplayer';
import Songlist from './components/Songlist/Songlist';

library.add(faAngleDown, faPlus, faTrash, faEdit);

const initialState = {
	time: '0:00',
	route: 'signIn',
	isSignedIn: false
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'userPortal') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
  	const { route } = this.state;
    return (
      <div>
	      { route === 'userPortal' ?
	      	<div> 
	          <Filepicker onRouteChange={this.onRouteChange}/>
	          <Songlist onRouteChange={this.onRouteChange}/>

          </div>
          : 
          ( route === 'songView' ?
          	<div>
		          <Filepicker onRouteChange={this.onRouteChange}/>
			        <Waveform />
			        <Notelist time={this.state.time}/>
			        <Audioplayer />
	          </div>
          	:
          	( route === 'signIn' ? 
            <Signin onRouteChange={this.onRouteChange}/> 
            : 
            <Register onRouteChange={this.onRouteChange}/> 
          	)
          )
        }
      </div>
    );
  }
}

export default App;
