import React from 'react';
import PropTypes from 'prop-types';
import BeerCard from './BeerCard';

const BeersList = (props) => {
  const { beers } = props;
  return (
    <div className="ui four column stackable grid container">
      {beers.map(b => (
        <div key={b.id}>
          <BeerCard beer={b} breweriesArray={props.breweriesArray} />
        </div>
      ))}
    </div>
  );
};

BeersList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default BeersList;
