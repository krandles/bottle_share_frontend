import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const ReviewCard = (props) => {
  let review = props.review
  return (
    <Card fluid>
      <Card.Content>
        {review.beer.brewery.name} - {review.beer.name}<br/>
        Rating: {review.rating} - {review.content}
      </Card.Content>
    </Card>
  )
}


export default ReviewCard