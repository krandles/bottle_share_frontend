import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import EditBeerModal from './EditBeerModal';

class BeerCard extends React.Component {
  averageRating = (reviews) => {
    if (reviews.length === 0) {
      return 'N/A';
    } else if (reviews.length === 1) {
      return reviews[0].rating;
    }
    const ratings = reviews.map(review => review.rating);
    const sum = ratings.reduce((acc, el) => acc + el);
    return sum / ratings.length;
  };

  render() {
    const { beer, reviews } = this.props;
    return (
      <Card>
        <div className="beer-card-image-container" style={{ backgroundImage: `url(${beer.img_url ? beer.img_url : '../../../img/beer-placeholder.jpg'})` }} />
        <Card.Content>
          <Card.Header>
            <Link to={`/beers/${beer.id}`}>
              {beer.name}
            </Link>
            {this.props.loggedIn ? <EditBeerModal beer={beer} breweriesArray={this.props.breweriesArray} /> : null}
          </Card.Header>
          <Card.Meta>
            <Link to={`/breweries/${beer.brewery.id}`}>{beer.brewery.name}</Link>
          </Card.Meta>
          <Card.Description>
            {beer.abv}% ABV <strong>{beer.style}</strong>
            {beer.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span className="right floated">
            Avg. rating: {`${this.averageRating(reviews)}`}
          </span>
          <span>
            {reviews.length ? reviews.length : 'No' } review{reviews.length !== 1 ? 's' : null}
          </span>
        </Card.Content>
      </Card>
    );
  }
}

BeerCard.propTypes = {
  beer: PropTypes.shape({}).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = state => ({
  return: {
    loggedIn: state.user.loggedIn,
    reviews: state.beer.reviews
  }
});

export default connect(mapStateToProps)(BeerCard);
