import React from 'react'
import { Item } from 'semantic-ui-react'

class InvitationItem extends React.Component {
  state = {
    status: this.props.invitation.status,
    contribution: this.props.invitation.contribution,
    comment: this.props.invitation.comment
  }
  
  render() {
    return (
      <Item>
        <Item.Content>
          This Is An Invitation
        </Item.Content>
      </Item>
    )
  }
}

export default InvitationItem