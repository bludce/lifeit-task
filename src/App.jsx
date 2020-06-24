import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.sass';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Userlist from './components/UserList/UserList'
import User from './components/User/User'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'

class App extends PureComponent {

  state = {
    userList: {},
    currentPage: 1,
    loading: false,
    auth: false,
  }

  componentDidMount = () => {
    const {currentPage} = this.state
    this.loadPage(`https://reqres.in/api/users?page=${currentPage}`);
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.auth !== prevState.auth ) {
  //     this.loadPage(`https://reqres.in/api/users?page=${currentPage}`);
  //   }
  // }

  setAuth = () => {
    const {auth} = this.state
    this.setState({
      auth: !auth
    })
  }

  loadPage = async (url) => {
    try {
      this.setState({
        loading: true
      })
      let response = await fetch(url);
      let userList = await response.json();
      this.setState({
        userList: userList,
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
  

  render() {
    const { userList, currentPage, loading, auth } = this.state;

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
                  <Userlist userList={userList} />
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