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
    data: [],
    currentPage: 1,
    totalPage: 0,
    loading: false,
    auth: false,
  }

  componentDidMount = () => {
    let {currentPage} = this.state
    this.loadPage(`https://reqres.in/api/users?page=${currentPage}`, currentPage);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {currentPage} = this.state
    // Популярный пример (не забудьте сравнить пропсы):
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
        return{
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
  

  render() {
    const { data, currentPage, loading, auth, totalPage } = this.state;

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
                  <Userlist 
                    userList={data} 
                    currentPage={currentPage} 
                    setCurrentPage={this.setCurrentPage} 
                    loading={loading} 
                    totalPage={totalPage} 
                  />
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