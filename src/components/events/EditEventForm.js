import React from 'react'
import { connect } from 'react-redux'
import { getEvent } from  '../../actions/events'
import { getAllUsers } from  '../../actions/users'
import { Form } from 'semantic-ui-react'
import { stateOptions } from './stateOptions'
import api from '../../api/adapter'

class EditEventForm extends React.Component {
  state = { currentEvent: {}}
  // state = {
  //   eventDetails: {
  //     title: this.props.currentEvent.title,
  //     location: this.props.currentEvent.location,
  //     date: this.props.currentEvent.date,
  //     address: this.props.currentEvent.address,
  //     address2: this.props.currentEvent.address2,
  //     city: this.props.currentEvent.city,
  //     stateAbbr: this.props.currentEvent.state,
  //     zipCode: this.props.currentEvent.zip,
  //     description: this.props.currentEvent.description,
  //     isPrivate: this.props.currentEvent.private,
  //     invitees: this.props.currentEvent.invitees
  //   }
  // }

  // makeUsersList = () => this.setState({
  //   usersArray:
  //     this.props.users.map(user => {
  //       return { key: user.id, text: user.name, value: user.id }
  //   })
  // })

  onInputChange = (name, value) => {
    this.setState({
      ...this.state,
      currentEvent: {
        ...this.state.currentEvent,
        [name]: value
      }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const details = this.state.currentEvent
    const eventDetails = {
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
    }
    api.patchEvent(eventDetails)
      .then(res => {
        details.invitees.forEach(invitee => {
          api.postNewInvitation({user_id: invitee, event_id: res.id, status: 'pending'})
        })
      })
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      // this.props.findUser(localStorage.getItem("token"))
      this.props.getEvent(this.props.match.params.id)
        .then(res => {
          this.setState({
          ...this.state,
          currentEvent: {
            title: this.props.currentEvent.title,
            location: this.props.currentEvent.location,
            date: this.props.currentEvent.date,
            address: this.props.currentEvent.address,
            address2: this.props.currentEvent.address2,
            city: this.props.currentEvent.city,
            stateAbbr: this.props.currentEvent.state,
            zipCode: this.props.currentEvent.zip,
            description: this.props.currentEvent.description,
            isPrivate: this.props.currentEvent.private,
            // currentInvitees: this.props.currentEvent.invitations.map(i => i.user_id)
          } })})
      // this.props.getAllUsers()
      // .then(()=>this.props.history.push("/"))
    }
    
  }
  
  render() {
    const eventDetails = this.state.currentEvent
    
    return (
      <div className='main-content'>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input name='title' label='Title' value={eventDetails.title} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
          <Form.TextArea rows={4} name='description' label='Description' value={eventDetails.description} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
          <Form.Group widths='equal'>
            <Form.Input fluid name='location' label='Location' value={eventDetails.location} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Input fluid name='date' label='Date' type='date' value={eventDetails.date} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid name='address' label='Address' value={eventDetails.address} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Input fluid name='address2' label='Apt./Suite #' value={eventDetails.address2} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid name='city' label='City' value={eventDetails.city} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Select fluid search selection options={stateOptions} name='stateAbbr' label='State' value={eventDetails.stateAbbr} onChange={(event, {value}) => {this.onInputChange("stateAbbr", value)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid name='zipCode' label='ZIP Code' value={eventDetails.zipCode} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Select fluid value={eventDetails.isPrivate} options={[{key: 'private', value: true, text: 'Private'}, {key: 'public', value: false, text: 'Public'}]} name='isPrivate' label='Event Type' onChange={(event, {value}) => {this.onInputChange("eventType", value)}} />
          </Form.Group>
          <Form.Button type='submit'>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    organizer: state.userID,
    currentEvent: state.currentEvent,
    usersArray: state.users.map(user => {
      return { key: user.id, text: user.name, value: user.id }
    })
  }
}

export default connect(mapStateToProps, { getEvent, getAllUsers })(EditEventForm)