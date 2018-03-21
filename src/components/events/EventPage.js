import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import EventItem from './EventItem'
import NewPostForm from '../posts/NewPostForm'
import PostList from '../posts/PostList'

class EventPage extends React.Component {

  state = { discussion: true }

  setDiscussion = (content) => {
    this.setState({discussion: content})
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
      <h2>Attendees</h2>
    )

    return (
      // <div className="main-content">Event Page</div>
      <div className="main-content">
        <EventItem event={this.props.event} />
        <Button.Group widths="2">
          <Button onClick={() => this.setDiscussion(true)}>Discussion</Button>
          <Button onClick={() => this.setDiscussion(false)}>Attendees</Button>
        </Button.Group>
        { contentPane }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { allEvents: state.events, allPosts: state.posts, allUsers: state.users }
}

export default connect(mapStateToProps)(EventPage)
