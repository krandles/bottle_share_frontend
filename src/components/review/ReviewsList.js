import React from 'react';
import { Divider } from 'semantic-ui-react';
import ReviewItem from './ReviewItem';

const ReviewsList = (props) => {
  const { reviews } = props;
  return (
    <div className="reviews-list">
      {reviews.map((review, index, array) => ((index === array.length - 1) ?
        <div key={review.id}><ReviewItem review={review} /></div>
      :
        <div key={review.id}><ReviewItem review={review} /><Divider /></div>))}
    </div>
  );
};

export default ReviewsList;
