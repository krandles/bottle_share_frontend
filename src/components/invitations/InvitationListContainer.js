import React from 'react'
import InvitationList from './InvitationList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { getCurrentUser } from '../../actions/users'
import { Dimmer, Loader } from 'semantic-ui-react'

class InvitationListContainer extends React.Component {
  
  render() {

    if (localStorage.getItem("token")) {
      return (
        <div className="main-content">
          {this.props.loggedIn ?
            <InvitationList invitations={this.props.currentUser.invitations} />
            :
            <Redirect to="/login" />
          }
        </div>
      )
    } 
    // else {
    //   return (
    //     <div>
    //       {this.props.loggedIn ?
    //         <Dimmer active inverted>
    //           <Loader inverted>Loading</Loader>
    //         </Dimmer>
    //         :
    //         <Redirect to="/login" />
    //       }
    //     </div>
    //   )
    // }
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