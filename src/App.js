import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import { findUser, getAllUsers } from './actions/users'
import { getEvents } from  './actions/events'
import { getAllPosts } from  './actions/posts'
import { getAllInvitations } from  './actions/invitations'

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
      // this.props.getEvents()
      // this.props.getAllUsers()
      // this.props.getAllPosts()
      // this.props.getAllInvitations()
        // .then(()=>this.props.history.push("/"))
    } 
    // else {
    //   this.props.history.push("/login")
    // }
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
          {/* <Route path="/events/:id" render={(routerProps) =>  <EventPage {...routerProps} />} /> */}
          <Route exact path="/events/:id" render={(routerProps) => <EventPage {...routerProps} event={this.props.currentEvent} />} />
            {/* if (this.props.currentEvent) 
             return <EventPage {...routerProps} event={this.props.currentEvent} />
             } else {
               return <h1>Loading</h1>
             }}}
             /> */}
          <Route path="/events/:id/edit" render={(routerProps) => <EditEventForm {...routerProps} event={this.props.currentEvent}/>} />
          <Route exact path="/invitations" render={(routerProps) => <InvitationListContainer {...routerProps} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn, users: state.users, events: state.events, currentEvent: state.currentEvent }
}

export default withRouter(connect(mapStateToProps, { findUser, getAllUsers, getEvents, getAllPosts, getAllInvitations })(App))
