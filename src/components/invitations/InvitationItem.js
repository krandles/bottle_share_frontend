import React from 'react'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class InvitationItem extends React.Component {
  state = {
    status: this.props.invitation.status,
    contribution: this.props.invitation.contribution,
    comment: this.props.invitation.comment
  }
  
  render() {
    const event = this.props.invitation.event
    console.log(event)
    return (
      <Item>
        <Item.Content>
          {/* <Item.Header><Link to={`/events/${event.id}`}>{event.name}</Link></Item.Header> */}
          <Item.Header>{event.title}</Item.Header>
          This Is An Invitation
        </Item.Content>
      </Item>
    )
  }
}

export default InvitationItem