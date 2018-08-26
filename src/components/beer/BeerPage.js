import React from 'react';
import { Dimmer, Divider, Item, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import BreweryItem from '../brewery/BreweryItem';
import ReviewChart from '../review/ReviewChart';
import ReviewsList from '../review/ReviewsList';
import { getBeer, clearCurrentBeer } from '../../actions/beers';

class BeerPage extends React.Component {
  componentDidMount() {
    this.props.getBeer(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearCurrentBeer();
  }

  render() {
    if (this.props.beer.brewery) {
      const { beer, reviews } = this.props;

      return (
        <div className="ui text container main-content">
          <Item className="beer-item">
            <Item.Content>
              <Item.Header className="beer-item-name">{beer.name}</Item.Header>
              <Item.Meta className="beer-item-style">{beer.style}</Item.Meta>
              <Item.Meta className="beer-item-abv" >{beer.abv}% ABV</Item.Meta>
              <Divider hidden />
              <BreweryItem brewery={beer.brewery} />
            </Item.Content>
            <Item.Image className="beer-image" src={beer.img_url ? beer.img_url : '../../../img/beer-placeholder.jpg'} />
          </Item>
          <Divider />
          <ReviewChart reviews={reviews} />
          <Divider hidden />
          <h3>User Ratings &amp; Reviews</h3>
          <ReviewsList reviews={reviews} />
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

const mapStateToProps = state => (
  {
    userID: state.userID,
    beer: state.currentBeer,
    reviews: state.reviews.filter(review => review.beer.id === state.currentBeer.id)
  }
);

export default connect(mapStateToProps, { getBeer, clearCurrentBeer })(BeerPage);

