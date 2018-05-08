import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const ReviewCard = (props) => {
  const { review } = props;
  return (
    <Card fluid>
      <Card.Content>
        {review.brewery.name} - {review.beer.name}<br />
        Rating: {review.rating} - {review.content}
      </Card.Content>
    </Card>
  );
};

export default ReviewCard;
