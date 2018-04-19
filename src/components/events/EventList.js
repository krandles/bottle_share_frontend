import React from 'react';
import { Dimmer, Item, Loader } from 'semantic-ui-react';
import EventItem from './EventItem';

const EventList = (props) => {
  if (props.allEvents) {
    return (
      <Item.Group >
        {props.allEvents.map(e => <EventItem key={e.id} event={e} />)}
      </Item.Group>);
  }
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};

export default EventList;
