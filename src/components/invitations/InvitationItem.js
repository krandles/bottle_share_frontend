import React from 'react'
import { Button, Form, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import api from '../../api/adapter'

class InvitationItem extends React.Component {
  state = {
    editing: false,
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
    this.setState({
      ...this.state,
      editing: false
    })
  }

  handleEdit = () => {
    this.setState({
      ...this.state,
      editing: true
    })
  }
  
  render() {
    const i = this.props.invitation
    return (
      <Item>
        <Item.Content>
          <Item.Header>{i.organizer} invited you to <Link to={`/events/${i.event_id}`}>{i.event}</Link> on {i.date}</Item.Header>
          <Button floated='right' onClick={this.handleEdit} >
            {this.state.status === 'pending' ? 'Respond' : 'Edit Response'}
          </Button>
          {i.status === 'pending' ? null : <Item.Meta>Your Response: {i.status.charAt(0).toUpperCase() + i.status.slice(1)}</Item.Meta>}
          { this.state.editing ? 
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
            :
            ''
          }
        </Item.Content>
      </Item>
    )
  }
}

export default InvitationItem