import React from 'react';
import { Item, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EventItem extends React.Component {

  
  render() {

    const eventDate = new Date(this.props.event.date)
    const dateOptions = { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    
    return (
      <Item className="ui">
        <Item.Content>
          <Item.Header className='event-title'><Link to={`/events/${this.props.event.id}`}>{this.props.event.title.toUpperCase()}</Link></Item.Header>
          <Divider hidden />
          <Item.Meta>
            at <strong>{this.props.event.location}</strong> on {eventDate.toLocaleDateString('en-US', dateOptions)}
          </Item.Meta>
          <Divider hidden />
          <Item.Description>{this.props.event.description}</Item.Description>
          
        </Item.Content>
      </Item>
    )
  }
}

export default EventItem