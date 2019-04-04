import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('http://192.168.0.27:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange('userPortal');
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className="form-container">
			  <div className="form-signin">
		      <h1 className="h3 mb-4">Sign in</h1>
		      <label className="sr-only" htmlFor="email-address">Email Address</label>
		      <input onChange={this.onEmailChange} className="form-control" placeholder="Email" type="email" name="email-address"  id="email-address"/>
		      <label className="sr-only" htmlFor="password">Password</label>
		      <input onChange={this.onPasswordChange} className="form-control" placeholder="Password" type="password" name="password"  id="password"/>
			    <button onClick={this.onSubmitSignIn} className="btn btn-lg btn-primary btn-block mb-3" type="submit" value="Sign In">Sign in</button>
			    <div className="account-exists">Don't have an account?</div>
			    <div onClick={() => onRouteChange('register')} className="link-register">Register</div>
			  </div>
		  </div>
		);
	}
}

export default Signin;