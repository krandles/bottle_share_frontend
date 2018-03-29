import React from 'react'
import { Button, List } from 'semantic-ui-react'

class AttendeesList extends React.Component {
  state = { content: "confirmed" }

  setContent = (content) => {
    this.setState({...this.state, content: content})
  }
  
  render() {
    const invitations = this.props.invitations
    const confirmed = invitations.filter(i => i.status === "confirmed")
    const declined = invitations.filter(i => i.status === "declined")
    const maybe = invitations.filter(i => i.status === "maybe")
    const pending = invitations.filter(i => i.status === "pending")
    
    return (
      <div>
        <Button.Group widths="4">
          <Button color='green' className={this.state.content === "confirmed" ? 'active' : 'basic' } onClick={() => this.setContent("confirmed")}>Confirmed</Button>
          <Button color='yellow' className={this.state.content === "maybe" ? 'active' : 'basic' } onClick={() => this.setContent("maybe")}>Maybe</Button>
          <Button color='red' className={this.state.content === "declined" ? 'active' : 'basic' } onClick={() => this.setContent("declined")}>Declined</Button>
          <Button color='blue' className={this.state.content === "pending" ? 'active' : 'basic' } onClick={() => this.setContent("pending")}>Awaiting Response</Button>
        </Button.Group>
        <List>
          {/* {this.state.content === "confirmed" ? confirmed.map(i => <List.Item key={i.id}>{i.invitee}</List.Item>) : null}
          {this.state.content === "declined" ? declined.map(i => <List.Item key={i.id}>{i.invitee}</List.Item>) : null}
          {this.state.content === "maybe" ? maybe.map(i => <List.Item key={i.id}>{i.invitee}</List.Item>) : null}
          {this.state.content === "pending" ? pending.map(i => <List.Item key={i.id}>{i.invitee}</List.Item>) : null} */}
          {this.state.content === "confirmed" ?
            confirmed.map(i => {
              return (
                <List.Item key={i.id}>
                  <List.Header>{i.invitee}</List.Header>
                </List.Item>
              )
            })
            :
            null
          }
          {this.state.content === "declined" ?
            declined.map(i => {
              return (
                <List.Item key={i.id}>
                  <List.Header>{i.invitee}</List.Header>
                </List.Item>
              )
            })
            :
            null
          }
          {this.state.content === "maybe" ?
            maybe.map(i => {
              return (
                <List.Item key={i.id}>
                  <List.Header>{i.invitee}</List.Header>
                </List.Item>
              )
            })
            :
            null
          }
          {this.state.content === "pending" ?
            pending.map(i => {
              return (
                <List.Item key={i.id}>
                  <List.Header>{i.invitee}</List.Header>
                </List.Item>
              )
            })
            :
            null
          }
        </List>
      </div>
    )
  }
}

export default AttendeesList