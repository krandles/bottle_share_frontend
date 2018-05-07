import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { findUser, getCurrentUser } from './actions/users';
import { getEvents } from './actions/events';
import { getBeers } from './actions/beers';
import { getBreweries } from './actions/breweries';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginContainer from './components/login/LoginContainer';
import NewEventForm from './components/events/NewEventForm';
import EditEventForm from './components/events/EditEventForm';
import DashboardContainer from './components/dashboard/DashboardContainer';
import EventListContainer from './components/events/EventListContainer';
import EventPage from './components/events/EventPage';
import InvitationListContainer from './components/invitations/InvitationListContainer';
import BeersContainer from './components/beer/BeersContainer';
import BreweriesContainer from './components/brewery/BreweriesContainer';
import './css/App.css';

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.findUser(localStorage.getItem('token'))
        .then((res) => {
          this.props.getCurrentUser(res.payload.user.id);
          this.props.getEvents();
          this.props.getBeers();
          this.props.getBreweries();
        });
    }
  }

  render() {
    return (
      <div className="site">
        <Navigation history={this.props.history} />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => <DashboardContainer {...routerProps} />}
          />
          <Route
            exact
            path="/login"
            render={routerProps => <LoginContainer {...routerProps} />}
          />
          <Route
            exact
            path="/events/new"
            render={routerProps => <NewEventForm {...routerProps} />}
          />
          <Route
            exact
            path="/events"
            render={routerProps => <EventListContainer {...routerProps} />}
          />
          <Route
            exact
            path="/events/:id"
            render={
              routerProps => <EventPage {...routerProps} event={this.props.currentEvent} />
            }
          />
          <Route
            path="/events/:id/edit"
            render={
              routerProps => <EditEventForm {...routerProps} event={this.props.currentEvent} />
            }
          />
          <Route
            exact
            path="/invitations"
            render={routerProps => <InvitationListContainer {...routerProps} />}
          />
          <Route
            exact
            path="/beers"
            render={routerProps => <BeersContainer {...routerProps} />}
          />
          <Route
            exact
            path="/breweries"
            render={routerProps => <BreweriesContainer {...routerProps} />}
          />
        </Switch>
        <Footer className="sticky-footer" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  return: {
    loggedIn: state.loggedIn,
    userID: state.userID,
    events: state.events,
    currentEvent: state.currentEvent,
    currentUser: state.currentUser
  }
});

App.propTypes = {
  findUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  getBeers: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  getBreweries: PropTypes.func.isRequired,
  currentEvent: PropTypes.shape({}),
  history: PropTypes.shape({})
};

App.defaultProps = {
  currentEvent: {},
  history: {}
};

export default withRouter(connect(mapStateToProps, {
  findUser,
  getCurrentUser,
  getEvents,
  getBeers,
  getBreweries,
})(App));
