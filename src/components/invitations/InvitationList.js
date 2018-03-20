import React from 'react'
import { Item } from 'semantic-ui-react'
import InvitationItem from './InvitationItem'

const InvitationList = (props) => {
  return <Item.Group>
    {props.invitations.map(i => {
      return <InvitationItem invitation={i} />
    })}
    </Item.Group>
}

export default InvitationList