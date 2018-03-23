import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import { findUser, getCurrentUser } from './actions/users'
import { getEvents } from  './actions/events'

import Navigation from './components/Navigation'
import LoginForm from './components/login/LoginForm'
import SignupForm from './components/signup/SignupForm'
import NewEventForm from './components/events/NewEventForm'
import EditEventForm from './components/events/EditEventForm'
import DashboardContainer from './components/dashboard/DashboardContainer'
import EventListContainer from './components/events/EventListContainer'
import EventPage from './components/events/EventPage'
import InvitationListContainer from './components/invitations/InvitationListContainer'
// import api from './api/adapter'

class App extends Component {

  componentDidMount() {

    if (localStorage.getItem("token")) {
      this.props.findUser(localStorage.getItem("token"))
        .then(res => {
          this.props.getCurrentUser(res.payload.user.id)
          this.props.getEvents()
        }
      )
    }
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
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
              return <div className="login main-content">
                <LoginForm {...routerProps}/>
                <SignupForm {...routerProps}/>
              </div>}
            }
          />
          <Route exact path="/events/new" render={(routerProps) => <NewEventForm {...routerProps} />} />
          <Route exact path="/events" render={(routerProps) => <EventListContainer {...routerProps} />} />
          <Route exact path="/events/:id" render={(routerProps) => <EventPage {...routerProps} event={this.props.currentEvent} />} />
          <Route path="/events/:id/edit" render={(routerProps) => <EditEventForm {...routerProps} event={this.props.currentEvent}/>} />
          <Route exact path="/invitations" render={(routerProps) => <InvitationListContainer {...routerProps} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn, userID: state.userID, events: state.events, currentEvent: state.currentEvent, currentUser: state.currentUser }
}

export default withRouter(connect(mapStateToProps, { findUser, getCurrentUser, getEvents })(App))
