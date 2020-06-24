import React, { Component, Fragment } from 'react';

import './UserForm.sass'


class UserForm extends Component {

  state = {
    name: '',
    job: ''
  };

  componentDidMount = () => {
    
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputSubmit = (e) => {
    e.preventDefault()
    this.addUser()
  }

  addUser = async () => {
    const {name, job} = this.state
     
    const addUser = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, job})
    })
    const user = await addUser.json()

    alert(`Пользователь добавлен ${user.name} ${user.job}`)
    
    this.setState({
      name: '',
      job: ''
    })
  }

  render () {

    return (
      <Fragment>
        <form className="user-form" onSubmit={this.handleInputSubmit}>
          <label>Name
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="user-form__input"/>
          </label>
          <label>Job
          <input type="text" name="job" value={this.state.job} onChange={this.handleInputChange} className="user-form__input"/>
          </label>
          <button className="btn">Добавить</button>
        </form>
      </Fragment>
    );
  }
}

export default UserForm;