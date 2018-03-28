import React from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Dimmer, Form, Icon, Loader } from 'semantic-ui-react'
import EventItem from './EventItem'
import NewPostForm from '../posts/NewPostForm'
import PostList from '../posts/PostList'
import AttendeesList from './AttendeesList'
import { getEvent } from  '../../actions/events'
import { getAllUsers } from '../../actions/users'
import { Link } from 'react-router-dom'
import keys from '../../keys'
import api from '../../api/adapter'


class EventPage extends React.Component {

  state = {
    discussion: true,
    addInvites: false,
    invitees: [],
    notInvited: []
  }

  setDiscussion = (content) => {
    this.setState({...this.state, discussion: content})
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.getEvent(this.props.match.params.id)
      this.props.getAllUsers()
    }
  }

  showInviteForm = () => {
    this.setState({...this.state, addInvites: !this.state.addInvites})
  }

  postInvitations = (e) => {
    e.preventDefault()
    this.state.invitees.forEach(invitee => {
      api.postNewInvitation({user_id: invitee, event_id: this.props.currentEvent.id, status: 'pending'})
    })
    this.setState({ ...this.state, addInvites: false })
  }

  handleInviteesChange = (value) => {
    this.setState({
      ...this.state,
      invitees: value
    })
  }

  filterInvites = (users) => {
    const currentAttendees = this.props.currentEvent.invitations.map(i => i.user_id)
    return users.filter(u => !currentAttendees.includes(u.value) && !(u.value === this.props.userID))
  }
    
  
  
  render() {

    
    if (this.props.currentEvent && this.props.usersArray) {

      const uninvitedUsers = this.filterInvites(this.props.usersArray)
      
      const contentPane = this.state.discussion ? (
        <div>
          <NewPostForm eventID={this.props.currentEvent.id} />
          <Divider clearing hidden/>
          <PostList allPosts={this.props.currentEvent.posts} />
        </div>
      )
      :
      (
        <AttendeesList invitations={this.props.currentEvent.invitations} />
      )

      return (
        <div className="main-content">
          <EventItem event={this.props.currentEvent} />
          <Divider section hidden />
          {this.props.userID === this.props.currentEvent.organizer_id ?
            <div>
              <Button.Group widths="2">
                <Button basic color='blue' as={Link} to={`/events/${this.props.match.params.id}/edit`}><Icon name='edit'/>Edit Event Details</Button>
                <Button basic color='blue' onClick={this.showInviteForm} ><Icon name='add user'/>Invite More Friends</Button>
              </Button.Group>
              <Divider hidden />
            </div>
            :
            null
          }
          {this.state.addInvites ?
            <Form onSubmit={this.postInvitations} >
              <Form.Select fluid multiple search selection options={uninvitedUsers} label="Who's Invited?" value={this.state.invitees} onChange={(event, {value}) => {this.handleInviteesChange(value)}} />
              <Form.Button fluid type='submit'>Save Invitations</Form.Button>
            </Form>
            :
            null
          }
          <iframe title="map" width="100%" height="300" frameBorder="0" style={{border:0}} src={`${this.props.currentEvent.map_url + keys.googleMapsKey}`} allowFullScreen></iframe>
          <Divider hidden />
          <Button.Group widths="2">
            <Button color='blue' className={this.state.discussion ? 'active' : 'basic'} onClick={() => this.setDiscussion(true)}><Icon name='talk outline'/>DISCUSSION</Button>
            <Button color='blue' className={this.state.discussion ? 'basic' : 'active'} onClick={() => this.setDiscussion(false)}><Icon name='users'/>SEE WHO'S GOING</Button>
          </Button.Group>
          <Divider hidden />
          { contentPane }
        </div>
      )
    } else {
      return <Dimmer active inverted>
               <Loader inverted>Loading</Loader>
             </Dimmer>
    }    
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    currentEvent: state.currentEvent,
    usersArray: state.users.map(user => {
      return { key: user.id, text: user.name, value: user.id }
    })
  }
}

export default connect(mapStateToProps, { getEvent, getAllUsers })(EventPage)
