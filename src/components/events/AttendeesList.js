import React from 'react';
import { Button, List } from 'semantic-ui-react';

class AttendeesList extends React.Component {
  state = { content: 'confirmed' }

  setContent = (content) => {
    this.setState({ ...this.state, content });
  }

  render() {
    const { invitations } = this.props;
    const confirmed = invitations.filter(i => i.status === 'confirmed');
    const declined = invitations.filter(i => i.status === 'declined');
    const maybe = invitations.filter(i => i.status === 'maybe');
    const pending = invitations.filter(i => i.status === 'pending');
    let content = [];

    switch (this.state.content) {
      case 'confirmed':
        content = confirmed;
        break;
      case 'declined':
        content = declined;
        break;
      case 'maybe':
        content = maybe;
        break;
      case 'pending':
        content = pending;
        break;
      default:
        content = confirmed;
    }

    return (
      <div>
        <Button.Group widths="4">
          <Button
            color="green"
            className={this.state.content === 'confirmed' ? 'active' : 'basic'}
            onClick={() => this.setContent('confirmed')}
          >
            Confirmed
          </Button>
          <Button
            color="yellow"
            className={this.state.content === 'maybe' ? 'active' : 'basic'}
            onClick={() => this.setContent('maybe')}
          >
            Maybe
          </Button>
          <Button
            color="red"
            className={this.state.content === 'declined' ? 'active' : 'basic'}
            onClick={() => this.setContent('declined')}
          >
            Declined
          </Button>
          <Button
            color="blue"
            className={this.state.content === 'pending' ? 'active' : 'basic'}
            onClick={() => this.setContent('pending')}
          >
            Awaiting Response
          </Button>
        </Button.Group>
        <List>
          {content.map((i) => {
            return (
              <List.Item key={i.id}>
                <List.Header>{i.invitee}</List.Header>
                <List.List bulleted="true">
                  {i.comment ? <List.Item>Replied {`"${i.comment}"`}</List.Item> : null }
                  {i.contribution ? <List.Item>Is bringing {`${i.contribution}`}</List.Item> : null }
                </List.List>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default AttendeesList;
