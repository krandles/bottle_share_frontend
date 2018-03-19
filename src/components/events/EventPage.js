import React from 'react'
import { connect } from 'react-redux'
import EventItem from './EventItem'
import NewPostForm from '../posts/NewPostForm'
import PostList from '../posts/PostList'

class EventPage extends React.Component {
  state = {  }
  render() {
    return (
      // <div className="main-content">Event Page</div>
      <div className="main-content">
        <EventItem event={this.props.event} />
        <NewPostForm eventID={this.props.event.id} />
        <PostList allPosts={this.props.allPosts} allUsers={this.props.allUsers} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { allEvents: state.events, allPosts: state.posts, allUsers: state.users }
}

export default connect(mapStateToProps)(EventPage)
