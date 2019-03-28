import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onSubmitRegister = () => {
		fetch('http://10.0.0.229:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user) {
				this.props.loadUser(user);
				this.props.onRouteChange('userPortal');
			}
		})
	}

	render() {
		// console.log(this.state);
		const { onRouteChange } = this.props;
		return (
			<div className="form-container">
			  <div className="form-register">
		      <h1 className="h3 mb-4">Register</h1>
		      <label className="sr-only" htmlFor="name">Name</label>
		      <input onChange={this.onNameChange} className="form-control" placeholder="Name" type="text" name="name"  id="name"/>
		      <label className="sr-only" htmlFor="email-address">Email Address</label>
		      <input onChange={this.onEmailChange} className="form-control" placeholder="Email" type="email" name="email-address"  id="email-address"/>
		      <label className="sr-only" htmlFor="password">Password</label>
		      <input onChange={this.onPasswordChange} className="form-control" placeholder="Password" type="password" name="password"  id="password"/>
			    <button onClick={this.onSubmitRegister} className="btn btn-lg btn-primary btn-block mb-3" type="submit" value="Register">Register</button>
			    <div className="account-exists">Already have an account?</div>
			    <div onClick={() => onRouteChange('signIn')} className="link-signin">Sign in</div>
			  </div>
		  </div>
		);
	}
}

export default Register;