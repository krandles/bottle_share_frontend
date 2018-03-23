import React from 'react'
import InvitationList from './InvitationList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { getCurrentUser } from '../../actions/users'

class InvitationListContainer extends React.Component {
  
  render() {

    if (this.props.currentUser) {
      return (
        <div className="main-content">
          {this.props.loggedIn ?
            <InvitationList invitations={this.props.currentUser.invitations} />
            :
            <Redirect to="/login" />
          }
        </div>
      )
    } else {
      return (
        <div>
          {this.props.loggedIn ?
            <h1>Loading</h1>
            :
            <Redirect to="/login" />
          }
        </div>
      )
      
      
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userID: state.userID,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { getCurrentUser })(InvitationListContainer)