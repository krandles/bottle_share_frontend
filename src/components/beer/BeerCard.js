import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import EditBeerModal from './EditBeerModal';

const BeerCard = (props) => {
  const { beer } = props;
  return (
    <Card>
      <div className="beer-card-image-container" style={{ backgroundImage: `url(${beer.img_url ? beer.img_url : '../../../img/beer-placeholder.jpg'})` }} >
        {/* <Image src={beer.img_url ? beer.img_url : '../../../img/beer-placeholder.jpg'} alt={beer.name} className="beer-card-image" /> */}
      </div>
      <Card.Content>
        <Card.Header>
          <Link to={`/beers/${beer.id}`}>
            {beer.name}
          </Link>
          <EditBeerModal beer={beer} breweriesArray={props.breweriesArray} />
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
          Avg. rating
        </span>
        <span>
          No. of reviews
        </span>
      </Card.Content>
    </Card>
  );
};

BeerCard.propTypes = {
  beer: PropTypes.shape({}).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default BeerCard;
