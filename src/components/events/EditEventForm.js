import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { getEvent, patchEvent } from '../../actions/events';
import stateOptions from './stateOptions';

class EditEventForm extends React.Component {
  state = { currentEvent: {} };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getEvent(this.props.match.params.id)
        .then(() => {
          const e = this.props.currentEvent;
          this.setState({
            ...this.state,
            currentEvent: {
              id: e.id,
              title: e.title,
              location: e.location,
              date: e.date,
              address: e.address,
              address2: e.address2,
              city: e.city,
              stateAbbr: e.state,
              zipCode: e.zip,
              description: e.description,
              isPrivate: e.private
            }
          });
        });
    }
  }

  onInputChange = (name, value) => {
    this.setState({
      ...this.state,
      currentEvent: {
        ...this.state.currentEvent,
        [name]: value
      }
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const details = this.state.currentEvent;
    const eventDetails = {
      id: details.id,
      organizer_id: details.organizer_id,
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
    this.props.patchEvent(eventDetails)
      .then(this.props.history.push(`/events/${eventDetails.id}`));
  }

  render() {
    const eventDetails = this.state.currentEvent;

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
              name="stateAbbr"
              label="State"
              options={stateOptions}
              value={eventDetails.stateAbbr}
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
              name="isPrivate"
              label="Event Type"
              options={[
                {
                  key: 'private',
                  value: true,
                  text: 'Private'
                },
                {
                  key: 'public',
                  value: false,
                  text: 'Public'
                }
              ]}
              value={eventDetails.isPrivate}
              onChange={(event, { value }) => { this.onInputChange('isPrivate', value); }}
            />
          </Form.Group>
          <Form.Button color="blue" floated="right" type="submit">
            Save Changes
          </Form.Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organizer: state.userID,
  currentEvent: state.currentEvent
});


export default connect(mapStateToProps, { getEvent, patchEvent })(EditEventForm);
