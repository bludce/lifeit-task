import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.sass';

class Login extends Component {

  state = {
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  authWithEmailPassword = async(e) => {
    try {
      e.preventDefault()
      const {email, password} = this.state
     
      const loginRequest = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      })
     
      if (loginRequest.status >= 400) {
        const registerRequest = await fetch('https://reqres.in/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password})
        })
        const register = await registerRequest.json();
        if (registerRequest.status >= 400) {
          throw new Error(register.error);
        }
        
      } else {
        this.props.setAuth()
      }
    }
    catch(e) {
      alert(`${e}, please use default login/password: eve.holt@reqres.in cityslicka`)
    }
  }
  
  render () {

   const { auth } = this.props

    if (auth) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="login">
        <h1 className="login__title">Присоединяйтесь!</h1>
        <div className="login__notice">Если у вас еще нет учетной записи, эта форма создаст ее для вас.</div>

        <form className="login-form" onSubmit={(event) => this.authWithEmailPassword(event)}>
          <div className="login-form-content">
            <label className="" htmlFor="email">
              Email
            </label>
            <input className="" id="email" name="email" type="email" placeholder="Email" onChange={this.handleInputChange} required></input>
            <label className="" htmlFor="password">
              Password
            </label>
            <input className="" id="password" name="password" type="password"  placeholder="Password" onChange={this.handleInputChange} required></input>
            <input type="submit" className="button login-form-submit" value="Войти"></input>
          </div>
        </form>          
      </div>
    );
  }
}

export default Login;