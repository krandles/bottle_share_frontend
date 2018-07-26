import React from 'react';
import { connect } from 'react-redux';
import ReviewControls from './ReviewControls';
import ReviewsList from './ReviewsList';

class ReviewsContainer extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="ui text container main-section">
        <ReviewControls
          beersArray={this.props.beersArray}
          addReviewToList={this.props.addReviewToList}
          loggedIn={this.props.loggedIn}
        />
        <ReviewsList reviews={this.props.reviews} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps)(ReviewsContainer);
