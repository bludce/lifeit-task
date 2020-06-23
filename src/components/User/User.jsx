import React, { Component } from 'react';

import './User.sass'

import Loading from '../Loading/Loading'

class User extends Component {

  state = {
    user: {},
    loading: false
  };

  componentDidMount = async () => {
    try {
      this.setState({
        loading: true
      })
      const { id } = this.props

      const response = await fetch(`https://reqres.in/api/users/${id}`);
      let user = await response.json();

      this.setState({
        user,
        loading: false
      })
    }
    catch(e) {
      alert("Превышен лимит запросов, обновите через минуту")
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { user, loading } = this.state
    const { data = []} = user
    const { email, first_name, last_name, avatar} = data

    return (
      <div className="user">
        {loading &&
          <Loading />
        }
        <div className="user__image">
          <img src={avatar} alt=""/>
        </div>
        <div className="user__content">
          <div className="user__name">
            {first_name} {last_name}
          </div>
          <div className="user__email">
            <a href={`mailto:${email}`} className="user__link">{email}</a>  
          </div>
        </div>
      </div>
    );
  }
}

export default User;