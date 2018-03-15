import React, { Component } from 'react';
// import { connect } from 'react-redux'
import './css/App.css';
import { Route, Switch } from 'react-router-dom'
// import { findUser } from './actions/users'

import LoginForm from './components/login/LoginForm'
import SignupForm from './components/signup/SignupForm'
import DashboardContainer from './components/dashboard/DashboardContainer'
// import api from './api/adapter'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={(routerProps) => {
            return <div className="App">
              <DashboardContainer {...routerProps}/>
            </div>}
          }
        />
        <Route exact path="/login"
          render={(routerProps) => {
            return <div className="login">
              <LoginForm {...routerProps}/>
              <SignupForm {...routerProps}/>
            </div>}
          }
        />
      </Switch>
      // <div className="App">
      //   <LoginForm logoutFn={this.logout}/>
      //   <SignupForm />
      // </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { loggedIn: state.loggedIn}
// }

// export default connect(mapStateToProps, { findUser })(App)
export default App