import React from 'react';
import EventList from './EventList'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

class EventListContainer extends React.Component {

  state = {
    showPrivate: true
  }

  // componentDidMount() {
  //   if (this.props.allEvents) {
  //     this.setState({
  //       ...this.state,
  //       publicEvents: this.props.allEvents.filter(e => e.private === false)
  //     })
  //   }  
  // }

  setPrivate = (value) => {
    this.setState({...this.state, showPrivate: value})
  }
  
  render() {

    // const publicEvents = this.props.allEvents.filter(e => e.private === false)
    // debugger
    return (
      <div className='main-content'>
      <Button.Group widths='2'>
        <Button onClick={() => this.setPrivate(true)}>Show My Events</Button>
        <Button onClick={() => this.setPrivate(false)}>Browse Public Events</Button>
      </Button.Group>
      {this.state.showPrivate ?
        <EventList allEvents={this.props.allEvents.filter(e => e.organizer_id === this.props.userID || e.invitations.map(i => i.userID ).includes(this.props.userID))} />
        :
        <EventList allEvents={this.props.allEvents.filter(e => e.private === false)} />
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allEvents: state.events,
    userID: state.userID
  }
}

export default connect(mapStateToProps)(EventListContainer)