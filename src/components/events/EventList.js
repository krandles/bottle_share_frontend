import React from 'react';
import { Item } from 'semantic-ui-react'
import EventItem from './EventItem'

const EventList = (props) => {
  return <Item.Group divided>
    {props.allEvents.map(e => {
      return <EventItem key={e.id} event={e} />
    })}
  </Item.Group>
}

export default EventList