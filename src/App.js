import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/App.css';
import { Route, Switch } from 'react-router-dom'
import { findUser, getAllUsers } from './actions/users'
import { getEvents } from  './actions/events'

import Navigation from './components/Navigation'
import LoginForm from './components/login/LoginForm'
import SignupForm from './components/signup/SignupForm'
import NewEventForm from './components/events/NewEventForm'
import DashboardContainer from './components/dashboard/DashboardContainer'
import EventListContainer from './components/events/EventListContainer'
// import api from './api/adapter'

class App extends Component {

  componentDidMount() {

    if (localStorage.getItem("token")) {
      this.props.findUser(localStorage.getItem("token"))
      this.props.getAllUsers()
      this.props.getEvents()
      // .then(()=>this.props.history.push("/"))
    }
  }

  render() {
    return (
      <div>
        <Navigation />
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
          <Route exact path="/events/new" render={(routerProps) => <NewEventForm />} />
          <Route exact path="/events" render={(routerProps) => <EventListContainer />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn, users: state.users }
}

export default connect(mapStateToProps, { findUser, getAllUsers, getEvents })(App)
