import React from 'react';
import EventList from './EventList'
import { connect } from 'react-redux'

class EventListContainer extends React.Component {

  render() {
    return (
      <div className='main-content'>
        <EventList allEvents={this.props.allEvents} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { allEvents: state.events }
}

export default connect(mapStateToProps)(EventListContainer)