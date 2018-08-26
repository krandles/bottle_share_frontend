import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import stateOptions from './stateOptions';
import { getAllUsers } from '../../actions/users';
import { addEvent } from '../../actions/events';
import api from '../../api/adapter';

class NewEventForm extends React.Component {
  state = {
    eventDetails: {
      title: '',
      location: '',
      date: '',
      address: '',
      address2: '',
      city: '',
      stateAbbr: '',
      zipCode: '',
      description: '',
      isPrivate: true,
      invitees: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getAllUsers();
    }
  }

  onInputChange = (name, value) => {
    this.setState({
      ...this.state,
      eventDetails: {
        ...this.state.eventDetails,
        [name]: value
      }
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const details = this.state.eventDetails;
    const eventDetails = {
      organizer_id: this.props.organizer,
      title: details.title,
      location: details.location,
      date: details.date,
      address: details.address,
      address2: details.address2,
      city: details.city,
      state: details.stateAbbr,
      zip: details.zipCode,
      description: details.description,
      private: details.isPrivate
    };
    this.props.addEvent(eventDetails)
      .then((res) => {
        details.invitees.forEach((invitee) => {
          api.postNewInvitation({
            user_id: invitee,
            event_id: res.payload.id,
            status: 'pending'
          });
        });
        this.props.history.push(`/events/${res.payload.id}`);
      });
  }

  render() {
    const { eventDetails } = this.state;
    return (
      <div className="ui text container main-section">
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            name="title"
            label="Title"
            value={eventDetails.title}
            onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
          />
          <Form.TextArea
            rows={4}
            name="description"
            label="Description"
            value={eventDetails.description}
            onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="location"
              label="Location"
              value={eventDetails.location}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
            <Form.Input
              fluid
              name="date"
              label="Date"
              type="date"
              value={eventDetails.date}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="address"
              label="Address"
              value={eventDetails.address}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
            <Form.Input
              fluid
              name="address2"
              label="Apt./Suite #"
              value={eventDetails.address2}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="city"
              label="City"
              value={eventDetails.city}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
            <Form.Select
              fluid
              search
              selection
              options={stateOptions}
              name="stateAbbr"
              label="State"
              onChange={(event, { value }) => { this.onInputChange('stateAbbr', value); }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="zipCode"
              label="ZIP Code"
              value={eventDetails.zipCode}
              onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
            />
            <Form.Select
              fluid
              options={[{
                key: 'private',
                value: true,
                text: 'Private'
                },
              {
                key: 'public',
                value: false,
                text: 'Public'
              }]}
              name="isPrivate"
              label="Event Type"
              value={eventDetails.isPrivate}
              onChange={(event, { value }) => { this.onInputChange('isPrivate', value); }}
            />
          </Form.Group>
          <Form.Select
            fluid
            multiple
            search
            selection
            options={this.props.usersArray.filter(u => u.value !== this.props.organizer)}
            label="Who's Invited?"
            value={eventDetails.invitees}
            onChange={(event, { value }) => { this.onInputChange('invitees', value); }}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organizer: parseInt(state.user.userID, 10),
  usersArray: state.user.users.map(user => ({ key: user.id, text: user.name, value: user.id }))
});

NewEventForm.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  usersArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  organizer: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps, { getAllUsers, addEvent })(NewEventForm);
