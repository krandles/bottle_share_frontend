import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { findUser, getCurrentUser } from '../../actions/users';
import InvitationList from './InvitationList';

class InvitationListContainer extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }

  render() {
    if (this.props.currentUser.invitations) {
      return (
        <div className="ui text container main-section">
          <InvitationList invitations={this.props.currentUser.invitations} />
        </div>
      );
    }

    return (
      <div>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userID: state.userID,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getCurrentUser, findUser })(InvitationListContainer);
