import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import EventItem from './EventItem'
import NewPostForm from '../posts/NewPostForm'
import PostList from '../posts/PostList'
import AttendeesList from './AttendeesList'
import { getEvent } from  '../../actions/events'
import { Link } from 'react-router-dom'
import keys from '../../keys'


class EventPage extends React.Component {

  state = {
    discussion: true,
    currentEvent: {}
   }

  setDiscussion = (content) => {
    this.setState({...this.state, discussion: content})
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.getEvent(this.props.match.params.id)
    }
  }
  
  render() {
    if (this.props.currentEvent) {
  
      const contentPane = this.state.discussion ? (
        <div>
          <NewPostForm eventID={this.props.currentEvent.id} />
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
          {this.props.userID === this.props.currentEvent.organizer_id ? 
            <Button.Group widths="2">
              <Button as={Link} to={`/events/${this.props.match.params.id}/edit`}>Edit Event Details</Button>
              <Button>Invite More Friends</Button>
            </Button.Group>
            :
            null
          }
          <iframe title="map" width="100%" height="300" frameBorder="0" style={{border:0}} src={`${this.props.currentEvent.map_url + keys.googleMapsKey}`} allowFullScreen></iframe>
          <Button.Group widths="2">
            <Button onClick={() => this.setDiscussion(true)}>Discussion</Button>
            <Button onClick={() => this.setDiscussion(false)}>See Who's Going</Button>
          </Button.Group>
          { contentPane }
        </div>
      )
    } else {
      return <h1>Loading</h1>
    }
      
    }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    currentEvent: state.currentEvent
  }
}

export default connect(mapStateToProps, { getEvent })(EventPage)
