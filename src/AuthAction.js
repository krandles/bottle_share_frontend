import React from 'react'
import LoginForm from './login/LoginForm'
import { Button } from 'react-router-dom'

class AuthAction extends React.Component {

  logoutWrapper = (e) => {
    e.preventDefault()
    this.props.logoutFn()
  }

  render() {
    return this.props.auth.loggedIn ?
      <Button className="item" to="/logout" onClick={ this.logoutWrapper }>Logout</Button> :
      <LoginForm login={ this.props.loginFn } />
    }
}

export default AuthAction