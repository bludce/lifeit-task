import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.sass';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Userlist from './components/UserList/UserList'
import User from './components/User/User'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import UserForm from './components/UserForm/UserForm'
import EditUserForm from './components/EditUserForm/EditUserForm'

class App extends PureComponent {

  state = {
    data: [],
    currentPage: 1,
    totalPage: 0,
    loading: false,
    auth: false,
    isEditing: false,
    user: {
      id: 0,
      name: '',
      job: ''
    }
  }

  componentDidMount = () => {
    let {currentPage} = this.state
    this.loadPage(`https://reqres.in/api/users?page=${currentPage}`, currentPage);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {currentPage} = this.state

    if (this.state.currentPage !== prevState.currentPage) {
      this.loadPage(`https://reqres.in/api/users?page=${currentPage}`);
    }
  }

  setAuth = () => {
    const {auth} = this.state
    this.setState({
      auth: !auth
    })
  }

  setCurrentPage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  loadPage = async (url) => {
    try {
      this.setState({
        loading: true
      })

      let response = await fetch(url);
      let userList = await response.json();

      this.setState(prevState =>{
        return {
          data: prevState.data.concat(userList.data),
          totalPage: userList.total_pages,
          loading: false,
        }
     })
    }
    catch(e) {
      alert("Возникла ошибка")
      this.setState({
        loading: false
      })
    }
  }

  deleteUser = async(id) => {
    try {
      const deleteUser = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
      })

      if (deleteUser.status === 204) {
        alert('Пользователь успешно удален')
      }
      
    } catch (error) {
      alert(error)
    }
  }

  editUser = (id, fullName) => {
    this.setState({
      isEditing: true,
      user: {
        id: id,
        name: fullName,
        job: ''
      }
    })
  }

  setIsEditing = () => {
    const {isEditing} = this.state
    this.setState({
      isEditing: !isEditing
    })
  }

  render() {
    const { data, currentPage, loading, auth, totalPage, isEditing, user, } = this.state;

    return (

      <BrowserRouter>
        <div className="app">
          <Header auth={auth} setAuth={this.setAuth}/>
          <div className="container">
            {loading &&
              <Loading />
            }

            {!auth ? 
              <Login setAuth={this.setAuth} auth={auth}/> 
            :
              <Fragment>
                <Route exact path="/">
                  <div className="content">
                    <Userlist 
                      userList={data} 
                      currentPage={currentPage} 
                      setCurrentPage={this.setCurrentPage} 
                      loading={loading} 
                      totalPage={totalPage} 
                      deleteUser={this.deleteUser}
                      editUser={this.editUser}
                    />
                     {isEditing ? (
                        <EditUserForm
                          isEditing={isEditing}
                          user={user}
                          setIsEditing={this.setIsEditing}
                        />
                      ) : (
                        <UserForm />
                      )}
                  </div>
                  
                </Route>
                <Route 
                  exact
                  path="/user/:id"
                  render={props => (
                    <User {...props}
                      id={props.match.params.id}
                      />
                    )}
                />
              </Fragment>
            }

            
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;