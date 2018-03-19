import React from 'react';
import { Item } from 'semantic-ui-react'

const EventItem = (props) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header as='a' href={`/events/${props.event.id}`}>{props.event.title}</Item.Header>
        <Item.Meta>
          at {props.event.location} on {props.event.date}
        </Item.Meta>
        <Item.Description>{props.event.description}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default EventItem