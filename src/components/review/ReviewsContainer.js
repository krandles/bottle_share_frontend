import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader} from 'semantic-ui-react';
import ReviewControls from './ReviewControls';
import ReviewsList from './ReviewsList';

class ReviewsContainer extends React.Component {
  state = {
    sort: 'none',
    beerQuery: '',
    breweryQuery: ''
  }

  beerSort = reviews => reviews.sort((a, b) => (a.beer.name.localeCompare(b.beer.name)));

  brewerySort = reviews => reviews.sort((a, b) => (a.brewery.name.localeCompare(b.brewery.name)));

  // TODO: add sort logic
  ratingSortDescending = reviews => reviews.sort((a, b) => (b.rating - a.rating));

  ratingSortAscending = reviews => reviews.sort((a, b) => (a.rating - b.rating));

  beerFilter = (reviews, beerQuery) => {
    if (this.state.beerQuery) {
      return reviews.filter(review => review.beer.name.toLowerCase().includes(beerQuery.toLowerCase()));
    }
    return reviews;
  }

  breweryFilter = (reviews, breweryQuery) => {
    if (this.state.breweryQuery) {
      return reviews.filter(review => (
        review.brewery.name.toLowerCase().includes(breweryQuery.toLowerCase())
      ));
    }
    return reviews;
  }

  handleSortChange = (event, value) => {
    this.setState({ sort: value });
  }

  handleBeerChange = (event) => {
    this.setState({ beerQuery: event.target.value });
  }

  handleBreweryChange = (event) => {
    this.setState({ breweryQuery: event.target.value });
  }

  sortReviews = (reviews) => {
    const reviewsToRender = [...this.props.reviews];
    switch (this.state.sort) {
      case 'none': return this.props.reviews;
      case 'beer': return this.beerSort(reviewsToRender);
      case 'brewery': return this.brewerySort(reviewsToRender);
      case 'ratingAsc': return this.ratingSortAscending(reviewsToRender);
      case 'ratingDesc': return this.ratingSortDescending(reviewsToRender);
      default: return reviews;
    }
  }

  render() {
    if (this.props.reviews.length > 0) {
      const sortedReviews = this.sortReviews(this.props.reviews);
      const beerFilteredReviews = this.beerFilter(sortedReviews, this.state.beerQuery);
      const breweryFilteredReviews = this.breweryFilter(beerFilteredReviews, this.state.breweryQuery);

      return (
        <div className="ui text container main-section">
          <ReviewControls
            beerQuery={this.state.beerQuery}
            breweryQuery={this.state.breweryQuery}
            beersArray={this.props.beersArray}
            handleBeerChange={this.handleBeerChange}
            handleBreweryChange={this.handleBreweryChange}
            handleSortChange={this.handleSortChange}
          />
          <ReviewsList reviews={breweryFilteredReviews} />
        </div>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.beer.reviews
});

export default connect(mapStateToProps)(ReviewsContainer);
