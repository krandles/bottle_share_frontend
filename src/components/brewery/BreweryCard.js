import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import EditBreweryModal from './EditBreweryModal';

const BreweryCard = (props) => {
  const { brewery } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {brewery.name}
          <EditBreweryModal brewery={brewery} />
        </Card.Header>
        <Card.Meta><Link to={`${brewery.url}`}>{brewery.url}</Link></Card.Meta>
        <Card.Description>
          <h4>{brewery.location}</h4>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default BreweryCard;
