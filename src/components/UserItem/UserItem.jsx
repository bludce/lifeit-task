import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import './UserItem.sass'

const UserItem = ({ id, email, first_name, last_name, avatar, deleteUser, editUser }) => {
  const fullName = `${first_name} ${last_name}`
  return (
    <div className="user-list__item item">
      <div className="item__avatar">
        <img src={avatar} alt=""/>
      </div>
      
      <div className="item__content">
        <div className="item__title">
          <Link className="item__link" to={`/user/${id}`}>{first_name} {last_name}</Link>
        </div>
        <div className="email">{email}</div>
        <button className="btn" onClick={() => editUser(id, fullName)}>Изменить</button>
        <button className="btn" onClick={() => deleteUser(id)} >Удалить</button>
      </div>
      
    </div>
  );
}

UserItem.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
}

UserItem.defaultProps = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
}

export default UserItem