import React from 'react'
import { List } from 'semantic-ui-react'

class AttendeesList extends React.Component {
  state = {  }
  
  render() {
    const invitations = this.props.invitations
    const confirmed = invitations.filter(i => i.status === "confirmed")
    const declined = invitations.filter(i => i.status === "declined")
    const maybe = invitations.filter(i => i.status === "maybe")
    const pending = invitations.filter(i => i.status === "pending")
    return (
      <div>
        AttendeesList
        <List>
          <List.Header>Confirmed</List.Header>
          {confirmed.map(i => <List.Item>{i.user.name}</List.Item>)}
        </List>
        <List>
          <List.Header>Declined</List.Header>
          {declined.map(i => <List.Item>{i.user.name}</List.Item>)}
        </List>
        <List>
          <List.Header>Maybe</List.Header>
          {maybe.map(i => <List.Item>{i.user.name}</List.Item>)}
        </List>
        <List>
          <List.Header>Pending</List.Header>
          {pending.map(i => <List.Item>{i.user.name}</List.Item>)}
        </List>
      </div>
    )
  }
}

export default AttendeesList