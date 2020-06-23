import React from 'react';
import './UserList.sass'
import PropTypes from 'prop-types';

import UserItem from '../UserItem/UserItem'

const List = ({ userList }) => {
  
  const {data = []} = userList

  const userItems = data.map(({ id, email, first_name, last_name, avatar }) => {
    return (
      <UserItem
        key={id}
        id={id}
        email={email}
        first_name={first_name}
        last_name={last_name}
        avatar={avatar}
      />
    )
  });

  return (
    <div className="user-list">{userItems}</div>
  );

}

List.propTypes = {
  userList: PropTypes.object,
}

List.defaultProps = {
  repositories: {}
}

export default List;