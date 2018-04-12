import React from 'react'
import ReviewControls from './ReviewControls'
import ReviewsList from './ReviewsList'

class ReviewsContainer extends React.Component {


  render () {
    return (
      <div className="ui text container main-section">
        <ReviewControls
          beersArray={this.props.beersArray}
          addReviewToList={this.props.addReviewToList}
          loggedIn={this.props.loggedIn}
        />
        <ReviewsList reviews={this.props.reviews} />
      </div>
    )
  }
}

export default ReviewsContainer;