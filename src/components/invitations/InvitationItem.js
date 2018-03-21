import React from 'react'
import { Form, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import api from '../../api/adapter'

class InvitationItem extends React.Component {
  state = {
    status: this.props.invitation.status,
    contribution: this.props.invitation.contribution,
    comment: this.props.invitation.comment
  }

  onInputChange = (name, value) => {
    this.setState({
      ...this.state,
        [name]: value
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const invitation = {
      id: this.props.invitation.id,
      status: this.state.status,
      comment: this.state.comment,
      contribution: this.state.contribution
    }
    api.patchInvitation(invitation)
  }
  
  render() {
    const event = this.props.invitation.event
    console.log(event)
    return (
      <Item>
        <Item.Content>
          <Item.Header><Link to={`/events/${event.id}`}>{event.title}</Link></Item.Header>
          <Form onSubmit={this.handleSubmit} >
            <Form.Select
              options={[
                {key: 'pending', value: 'pending', text: 'Pending'},
                {key: 'confirmed', value: 'confirmed', text: 'Confirmed'},
                {key: 'declined', value: 'declined', text: 'Declined'},
                {key: 'maybe', value: 'maybe', text: 'Maybe'}
              ]}
              name='response'
              label='Your Response'
              defaultValue={this.state.status}
              onChange={(event, {value}) => {this.onInputChange("status", value)}}
            />
            <Form.Input fluid name='comment' label='Comment' value={this.state.comment} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Input fluid name='contribution' label='What Are You Bringing To Share?' value={this.state.contribution} onChange={(event, {value}) => {this.onInputChange(event.target.name, value)}} />
            <Form.Button type='submit'>Save Response</Form.Button>
          </Form>
        </Item.Content>
      </Item>
    )
  }
}

export default InvitationItem