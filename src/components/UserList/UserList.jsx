import React from 'react';
import './UserList.sass'

import UserItem from '../UserItem/UserItem'

class List extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }
 
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
 
  onScroll = () => {
    const {currentPage, totalPage, setCurrentPage} = this.props;
    let nextPage = currentPage + 1;
    
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    
    if (currentPage >= totalPage) {
      return;
    } else {
      setCurrentPage(nextPage);
    }
  }
 
  render() {

    const userItems = Array.from(this.props.userList).map(({ id, email, first_name, last_name, avatar }) => {
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
  };
}

export default List;