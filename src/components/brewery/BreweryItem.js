import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import EditBreweryModal from './EditBreweryModal';

const BreweryItem = (props) => {
  const { brewery } = props;
  let urlText = '';
  if (props.brewery.url) {
    urlText = props.brewery.url.split('//')[1];
  }

  return (
    <Item>
      <Item.Header>
        <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
        {props.loggedIn ? <EditBreweryModal brewery={brewery} /> : null}
      </Item.Header>
      <Item.Description>
        <h4>{brewery.location}</h4>
      </Item.Description>
      <Item.Meta><Link target="_blank" to={`${brewery.url}`}>{urlText}</Link></Item.Meta>
    </Item>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(BreweryItem);
