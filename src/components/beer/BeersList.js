import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import BeerCard from './BeerCard';

const BeersList = (props) => {
  const { beers } = props;
  return (
    <Grid columns={3} stackable centered >
      {beers.map(b => (
        <Grid.Column key={b.id} >
          <BeerCard
            beer={b}
            key={b.id}
            breweriesArray={props.breweriesArray}
            reviews={props.reviews.filter(review => review.beer.id === b.id)}
          />
        </Grid.Column>
      ))}
    </Grid>
  );
};

BeersList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default BeersList;
