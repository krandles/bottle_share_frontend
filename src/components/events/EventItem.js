import React from 'react';
import { Item, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventItem = props => {

  const eventDate = new Date(props.event.date)
  const dateOptions = { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  
  return (
    <Item className="ui">
      <Item.Content>
        <Item.Header className='event-title'><Link to={`/events/${props.event.id}`}>{props.event.title.toUpperCase()}</Link></Item.Header>
        <Divider />
        <Item.Meta>
          Hosted by <span className="location-subheader">{props.event.host}</span><br/><br/>
          at <span className="location-subheader">{props.event.location}</span> on {eventDate.toLocaleDateString('en-US', dateOptions)}
        </Item.Meta>
        <Divider hidden />
        <Item.Description>{props.event.description}</Item.Description>
        <Divider hidden />
      </Item.Content>
    </Item>
  )
}

export default EventItem