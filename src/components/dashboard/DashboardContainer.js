import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { findUser, getCurrentUser } from '../../actions/users';
import { getEvents } from '../../actions/events';
import Dashboard from './Dashboard';

class DashboardContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.findUser(localStorage.getItem('token'))
        .then(res => this.props.getCurrentUser(res.payload.user.id));
      this.props.getEvents();
    }
  }

  render() {
    return (
      <div className="app">
        {this.props.loggedIn ?
          <Dashboard />
          :
          <Redirect to="/login" />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userID: state.userID
});

export default connect(mapStateToProps, {
  findUser,
  getEvents,
  getCurrentUser
})(DashboardContainer);
