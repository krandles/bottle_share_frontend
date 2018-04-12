import React from 'react'
import { Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import EventList from '../events/EventList'
import InvitationList from '../invitations/InvitationList'
import moment from 'moment'


class Dashboard extends React.Component {

  isThisWeek = (date) => {
    const momentToday = moment()
    const momentNextWeek = moment().add(7, 'days')
    const momentEvent = moment(date).endOf('day')
    return momentEvent >= momentToday && momentEvent <= momentNextWeek
  }

  invitationUsers = (e) => {
    const users = e.invitations.map(i => i.user_id)
    return users
  }

  render() {
    const featuredEvents = this.props.events.filter(e => this.isThisWeek(e.date) && (this.invitationUsers(e).includes(this.props.userID) || e.organizer_id === this.props.userID))
    const pendingInvites = this.props.currentUser.invitations ? this.props.currentUser.invitations.filter(i => i.status === 'pending') : []
    return (
      <div className='main-content'>
        <Button as={Link} to="/events/new" fluid color='blue'>Create a New Bottle Share</Button>
        <Divider hidden />
        <h3 className='section-header' >Pending Invitations</h3>
        {pendingInvites.length > 0 ? 
          <InvitationList invitations={pendingInvites} />
          :
          <h4>You have no pending invitations</h4>
        }
        <Divider section hidden />
        <h3 className='section-header' >Events This Week</h3>
        {featuredEvents.length > 0 ?
          <EventList allEvents={featuredEvents} />
          :
          <h4>You have no events scheduled this week</h4> 
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userID: state.userID,
    events: state.events,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard)