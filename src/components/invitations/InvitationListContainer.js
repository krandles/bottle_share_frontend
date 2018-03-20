import React from 'react'
import InvitationList from './InvitationList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class InvitationListContainer extends React.Component {
  state = {  }
  render() {
    return (
      <div className="main-content">
        {this.props.loggedIn ?
          <InvitationList invitations={this.props.invitations} />
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
    userID: state.userID,
    invitations: state.invitations.filter(i => i.user_id === state.userID)
  }
}

export default connect(mapStateToProps)(InvitationListContainer)