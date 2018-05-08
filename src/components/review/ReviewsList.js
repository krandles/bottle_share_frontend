import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsList = (props) => {
  const { allReviews } = props;
  return (
    <div className="ui stackable grid container">
      {allReviews.map(r => (
        <div key={r.id}>
          <ReviewCard review={r} />
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
