import React, { Component } from 'react';
import './css/App.css';
import LoginForm from './components/login/LoginForm'
import SignupForm from './components/signup/SignupForm'
import api from './api/adapter'

class App extends Component {

  state = {
    auth: {
      loggedIn: false
    }
  }

  componentDidMount() {

    const token = localStorage.getItem('token')
    if (token) {
      this.setState({
        auth: {
          loggedIn: true,
          token: token
        }
      })
    }
  }

  login = (email, password) => {
    api.login(email, password).then(j => {
      if(j.error) {
        alert(j.error)
      } else {
        localStorage.setItem('token', j.token)
        this.setState({
          auth: {
            loggedIn: true,
            token: j.token
          }
        })
      }
    })
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({
      auth: {
        loggedIn: false,
        token: undefined
      }
    })
  }

  


  render() {
    return (
      <div className="App">
        <LoginForm loginFn={this.login} logoutFn={this.logout} auth={this.state.auth}/>
        <SignupForm />
      </div>
    );
  }
}

export default App;
