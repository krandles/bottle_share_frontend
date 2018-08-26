import React from 'react';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import EventList from './EventList';

class EventListContainer extends React.Component {
  state = {
    eventsToShow: 'mine'
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }

  setEvents = (value) => {
    this.setState({ ...this.state, eventsToShow: value });
  }

  isFutureDate = (date) => {
    const momentToday = moment();
    const momentEvent = moment(date).endOf('day');
    return momentEvent >= momentToday;
  }

  invitationUsers = (e) => {
    const users = e.invitations.map(i => i.user_id);
    return users;
  }

  sortEvents = (events, direction) => {
    if (direction === 'descending') {
      return events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  render() {
    if (this.state.eventsToShow) {
      return (
        <div className="ui text container main-section">
          <Button.Group widths="3">
            <Button
              color="blue"
              className={this.state.eventsToShow === 'mine' ? 'active' : 'basic'}
              onClick={() => this.setEvents('mine')}
            >
              Upcoming Events
            </Button>
            <Button
              color="blue"
              className={this.state.eventsToShow === 'public' ? 'active' : 'basic'}
              onClick={() => this.setEvents('public')}
            >
              Browse Public Events
            </Button>
            <Button
              color="blue"
              className={this.state.eventsToShow === 'past' ? 'active' : 'basic'}
              onClick={() => this.setEvents('past')}
            >
              Past Events
            </Button>
          </Button.Group>
          {this.state.eventsToShow === 'mine' ?
            <EventList
              allEvents={this.sortEvents(
                this.props.allEvents.filter(e => (
                  e.organizer_id === this.props.userID
                  || this.invitationUsers(e).includes(this.props.userID))
                  && this.isFutureDate(e.date)),
                'ascending'
              )}
            />
            :
            null
          }
          {this.state.eventsToShow === 'public' ?
            <EventList
              allEvents={this.sortEvents(
                this.props.allEvents.filter(e => (
                  e.private === false
                  && this.isFutureDate(e.date))),
                'ascending'
              )}
            />
            :
            null
          }
          {this.state.eventsToShow === 'past' ?
            <EventList
              allEvents={this.sortEvents(
                this.props.allEvents.filter(e => (
                  e.organizer_id === this.props.userID
                  || this.invitationUsers(e).includes(this.props.userID))
                  && !this.isFutureDate(e.date)),
                'descending'
              )}
            />
            :
            null
          }
        </div>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
}

const mapStateToProps = state => ({
  allEvents: state.event.events,
  userID: state.user.userID
});

export default connect(mapStateToProps)(EventListContainer);
