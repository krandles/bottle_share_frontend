import React from 'react';
import EventList from './EventList'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import moment from 'moment'

class EventListContainer extends React.Component {

  state = {
    eventsToShow: "mine"
  }

  // componentDidMount() {
  //   if (this.props.allEvents) {
  //     this.setState({
  //       ...this.state,
  //       publicEvents: this.props.allEvents.filter(e => e.private === false)
  //     })
  //   }  
  // }

  setEvents = (value) => {
    this.setState({...this.state, eventsToShow: value})
  }

  isFutureDate = (date) => {
    const momentToday = moment()
    const momentEvent = moment(date).endOf('day')
    return momentEvent >= momentToday
  }
  
  render() {

    // const publicEvents = this.props.allEvents.filter(e => e.private === false)
    // debugger
    return (
      <div className='main-content'>
        <Button.Group widths='3'>
          <Button onClick={() => this.setEvents("mine")}>Show My Events</Button>
          <Button onClick={() => this.setEvents("public")}>Browse Public Events</Button>
          <Button onClick={() => this.setEvents("past")}>Past Events</Button>
        </Button.Group>
        {this.state.eventsToShow === "mine" ? <EventList allEvents={this.props.allEvents.filter(e => (e.organizer_id === this.props.userID || e.invitations.map(i => i.userID ).includes(this.props.userID)) && this.isFutureDate(e.date))} /> : null }
        {this.state.eventsToShow === "public" ? <EventList allEvents={this.props.allEvents.filter(e => e.private === false)} /> : null }
        {this.state.eventsToShow === "past" ? <EventList allEvents={this.props.allEvents.filter(e => (e.organizer_id === this.props.userID || e.invitations.map(i => i.userID ).includes(this.props.userID)) && !this.isFutureDate(e.date) )} /> : null }
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