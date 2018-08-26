import React from 'react';
import { connect } from 'react-redux';
import { Divider, Form } from 'semantic-ui-react';
import NewBreweryModal from './NewBreweryModal';
import { addBrewery } from '../../actions/breweries';

const options = [
  { text: 'None', value: 'none' },
  { text: 'Name', value: 'name' },
  { text: 'Avg. Rating', value: 'rating' },
  { text: 'No. of Reviews', value: 'reviews' }
];

const BreweryControls = props => (
  <div>
    <Form>
      {props.loggedIn ?
        <NewBreweryModal
          addBreweryToList={props.addBrewery}
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
          label="Filter By Location:"
          value={props.locationQuery}
          onChange={props.handleLocationChange}
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

export default connect(mapStateToProps, { addBrewery })(BreweryControls);
