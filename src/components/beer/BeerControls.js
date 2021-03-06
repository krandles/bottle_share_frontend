import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Form } from 'semantic-ui-react';
import NewBeerModal from './NewBeerModal';
import { addBeer } from '../../actions/beers';

const options = [
  { text: 'None', value: 'none' },
  { text: 'Name', value: 'name' },
  { text: 'Avg. Rating', value: 'rating' },
  { text: 'No. of Reviews', value: 'reviews' }
];

const BeerControls = props => (
  <div>
    <Form>
      {props.loggedIn ?
        <NewBeerModal
          breweriesArray={props.breweriesArray}
          addBeerToList={props.addBeer}
        />
        :
        null
      }
      <Divider hidden />
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Filter By Name:"
          value={props.nameQuery}
          onChange={props.handleNameChange}
        />
        <Form.Input
          fluid
          label="Filter By Brewery:"
          value={props.breweryQuery}
          onChange={props.handleBreweryChange}
        />
        <Form.Select
          fluid
          label="Sort By:"
          options={options}
          onChange={(e, { value }) => { props.handleSortChange(e, value); }}
        />
      </Form.Group>
    </Form>
  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

BeerControls.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  addBeer: PropTypes.func.isRequired,
  breweryQuery: PropTypes.string.isRequired,
  nameQuery: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleBreweryChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default connect(mapStateToProps, { addBeer })(BeerControls);
