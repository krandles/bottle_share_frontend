import React from 'react';
import { connect } from 'react-redux';
import { Divider, Form } from 'semantic-ui-react';
import NewReviewModal from './NewReviewModal';

const options = [
  { text: 'None', value: 'none' },
  { text: 'Beer', value: 'beer' },
  { text: 'Brewery', value: 'brewery' },
  { text: 'Rating (High - Low)', value: 'ratingDesc' },
  { text: 'Rating (Low - High)', value: 'ratingAsc' }
];

const ReviewControls = (props) => {
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          {props.loggedIn ?
            <NewReviewModal addReviewToList={props.addReviewToList} beersArray={props.beersArray}/>
          :
            null
          }
          <Form.Input fluid label="Filter By Beer:" value={props.beerQuery} onChange={props.handleBeerChange} />
          <Form.Input fluid label="Filter By Brewery:" value={props.breweryQuery} onChange={props.handleBreweryChange} />
          <Form.Select fluid label="Sort By:" options={options} onChange={(e, { value }) => { props.handleSortChange(e, value); }} />
        </Form.Group>
      </Form>
      <Divider hidden />
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  beersArray: state.beer.beersArray
});

export default connect(mapStateToProps)(ReviewControls);
