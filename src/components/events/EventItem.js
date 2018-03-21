import React from 'react';
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventItem = (props) => {
  return (
    <Item className="ui">
      <Item.Content>
        <Item.Header><Link to={`/events/${props.event.id}`}>{props.event.title}</Link></Item.Header>
        <Item.Meta>
          at {props.event.location} on {props.event.date}
        </Item.Meta>
        <Item.Description>{props.event.description}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default EventItem