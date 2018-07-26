import React from 'react';
import { Divider } from 'semantic-ui-react';
import BreweryItem from './BreweryItem';

const BreweriesList = (props) => {
  const { breweries } = props;
  return (
    <div className="ui container main-content">
      {breweries.map((b, index, array) => {
        return (index === array.length - 1) ?
          <div key={b.id}><BreweryItem brewery={b} /></div>
          :
          <div key={b.id}><BreweryItem brewery={b} /><Divider /></div>;
      })}
    </div>
  );
};

export default BreweriesList;
