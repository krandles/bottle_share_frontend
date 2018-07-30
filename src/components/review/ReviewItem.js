import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

const ReviewItem = (props) => {
  const { review } = props;
  return (
    <Item>
      <Item.Content>
        {review.brewery.name} - {review.beer.name}<br />
        Rating: {review.rating} - {review.content}
      </Item.Content>
    </Item>
  );
};

export default ReviewItem;
