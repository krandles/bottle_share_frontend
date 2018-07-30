import React from 'react';
import { Divider } from 'semantic-ui-react';
import BreweryItem from './BreweryItem';

const BreweriesList = (props) => {
  const { breweries } = props;
  return (
    <div className="breweries-list">
      {breweries.map((brewery, index, array) => ((index === array.length - 1) ?
        <div key={brewery.id}><BreweryItem brewery={brewery} /></div>
      :
        <div key={brewery.id}><BreweryItem brewery={brewery} /><Divider /></div>))}
    </div>
  );
};

export default BreweriesList;
