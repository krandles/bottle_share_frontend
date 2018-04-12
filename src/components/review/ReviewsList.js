import React from 'react';
import ReviewCard from './ReviewCard'

const ReviewsList = (props) => {
  let allReviews = props.reviews
  return (
    <div className={"ui stackable grid container"}>
      {allReviews.map(r => {
        return <div key={r.id}><ReviewCard review={r}/></div>
      })}
    </div>
  )
}

export default ReviewsList