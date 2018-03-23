import React from 'react'
import Dashboard from './Dashboard'
import { findUser, getCurrentUser } from '../../actions/users'
import { getEvents } from  '../../actions/events'
import { getAllPosts } from  '../../actions/posts'
import { getAllInvitations } from  '../../actions/invitations'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class DashboardContainer extends React.Component {
  
  componentDidMount() {

    if (localStorage.getItem("token")) {
      this.props.findUser(localStorage.getItem("token"))
      this.props.getEvents()
      //move to
      // this.props.getCurrentUser(this.props.userID)
      // this.props.getAllPosts()
      // this.props.getAllInvitations()
      // .then(()=>this.props.history.push("/"))
    }
  }

  render() {
    return  (
      <div>
        {this.props.loggedIn ?
          <Dashboard />
          :
          <Redirect to="/login" />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userID: state.userID
  }
}

export default connect(mapStateToProps, { findUser, getEvents, getCurrentUser })(DashboardContainer)