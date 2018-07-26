import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Item } from 'semantic-ui-react';
import EditBreweryModal from './EditBreweryModal';

const BreweryItem = (props) => {
  const { brewery } = props;
  let urlText = '';
  if (props.brewery.url) {
    urlText = props.brewery.url.split('//')[1];
  }

  return (
    <React.Fragment>
      <Item>
        <Item.Header>
          {brewery.name}
          {props.loggedIn ? <EditBreweryModal brewery={brewery} /> : null}
        </Item.Header>
        <Item.Meta><Link target="_blank" to={`${brewery.url}`}>{urlText}</Link></Item.Meta>
        <Item.Description>
          <h4>{brewery.location}</h4>
        </Item.Description>
      </Item>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(BreweryItem);
