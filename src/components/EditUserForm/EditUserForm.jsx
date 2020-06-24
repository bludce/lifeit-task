import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class EditUserForm extends Component {

  state = {
    name: '',
    job: ''
  };

  componentDidMount = () => {
    this.setState({
      name: this.props.user.name,
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        name: props.user.name,
      };
    }
  
    return null;
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputSubmit = async (e) => {
    try {
      e.preventDefault()
      const {id} = this.props.user
      const {name, job} = this.state
      const deleteUser = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, job})
      })

      if (deleteUser.status === 200) {
        alert('Пользователь успешно обновлен')
      }
      
    } catch (error) {
      alert(error)
    }
  }

  render () {
    const {setIsEditing} = this.props
    return (
      <Fragment>
        <form className="user-form" onSubmit={this.handleInputSubmit}>
          <label>Name
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="user-form__input"/>
          </label>
          <label>Job
          <input type="text" name="job" value={this.state.job} onChange={this.handleInputChange} className="user-form__input"/>
          </label>
          <button className="btn">Изменить</button>
          <button className="btn" onClick={setIsEditing}>Отмена</button>
        </form>
      </Fragment>
    );
  }
}

EditUserForm.propTypes = {
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  user: PropTypes.obj,
}

EditUserForm.defaultProps = {
  isEditing: false,
  setIsEditing: () => {},
  user: {},
}

export default EditUserForm;