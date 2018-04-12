import React from 'react'
import InvitationList from './InvitationList'
import { connect } from 'react-redux'
import { findUser, getCurrentUser } from '../../actions/users'
import { Dimmer, Loader } from 'semantic-ui-react'

class InvitationListContainer extends React.Component {
  
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push('/login')
    }
  }

  render() {
    
    if (this.props.currentUser.invitations) {
      return (
        <div className="main-content">
            <InvitationList invitations={this.props.currentUser.invitations} />
        </div>
      )
    } else {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
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

export default connect(mapStateToProps, { getCurrentUser, findUser })(InvitationListContainer)