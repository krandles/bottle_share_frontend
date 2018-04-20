import React from 'react';
import BreweryCard from './BreweryCard';

const BreweriesList = (props) => {
  const { breweries } = props;
  return (
    <div className="ui four column stackable grid container">
      {breweries.map((b) => {
        return <div key={b.id}><BreweryCard brewery={b} /></div>;
      })}
    </div>
  );
};

export default BreweriesList;
