import React from 'react';
import BeerCard from './BeerCard';

const BeersList = (props) => {
  let { beers } = props;
  return (
    <div className="ui four column stackable grid container">
      {beers.map((b) => {
        return <div key={b.id}><BeerCard beer={b} breweriesArray={props.breweriesArray}/></div>
      })}
    </div>
  );
};

export default BeersList;
