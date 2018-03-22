import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import EventItem from './EventItem'
import NewPostForm from '../posts/NewPostForm'
import PostList from '../posts/PostList'
import AttendeesList from './AttendeesList'
import { getEvent } from  '../../actions/events'
import { Link } from 'react-router-dom'


class EventPage extends React.Component {

  state = { discussion: true }

  setDiscussion = (content) => {
    this.setState({discussion: content})
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id)
  }
  
  render() {

    const discussion = this.state.discussion

    const contentPane = discussion ? (
      <div>
        <NewPostForm eventID={this.props.event.id} />
        <PostList allPosts={this.props.allPosts} allUsers={this.props.allUsers} />
      </div>
    )
    :
    (
      <AttendeesList invitations={this.props.invitations.filter(i => i.event.id === this.props.event.id)} />
    )

    return (
      // <div className="main-content">Event Page</div>
      <div className="main-content">
        <EventItem event={this.props.event} />
        <Link to={`/events/${this.props.match.params.id}/edit`}>Edit</Link>
        <Button.Group widths="2">
          <Button onClick={() => this.setDiscussion(true)}>Discussion</Button>
          <Button onClick={() => this.setDiscussion(false)}>See Who's Going</Button>
        </Button.Group>
        { contentPane }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { allPosts: state.posts,
    allUsers: state.users,
    invitations: state.invitations,
    currentEvent: state.currentEvent
  }
}

export default connect(mapStateToProps, { getEvent })(EventPage)
