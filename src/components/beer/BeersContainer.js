import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import BeersList from './BeersList';
import BeerControls from './BeerControls';
import { addBeer } from '../../actions/beers';

class BeersContainer extends React.Component {
  state = {
    sort: 'none',
    nameQuery: '',
    breweryQuery: ''
  }

  nameSort = beers => (beers.sort((a, b) => (a.name.localeCompare(b.name))));

  // TODO: add sort logic
  ratingSort = beers => beers

  reviewsSort = beers => beers

  nameFilter = (beers, nameQuery) => {
    if (this.state.nameQuery) {
      return beers.filter(beer => beer.name.toLowerCase().includes(nameQuery.toLowerCase()));
    }
    return beers;
  }

  breweryFilter = (beers, breweryQuery) => {
    if (this.state.breweryQuery) {
      return beers.filter(beer => (
        beer.brewery.name.toLowerCase().includes(breweryQuery.toLowerCase())
      ));
    }
    return beers;
  }

  handleSortChange = (event, value) => {
    this.setState({ sort: value });
  }

  handleNameChange = (event) => {
    this.setState({ nameQuery: event.target.value });
  }

  handleBreweryChange = (event) => {
    this.setState({ breweryQuery: event.target.value });
  }

  sortBeers = (beers) => {
    const beersToRender = [...this.props.beers];
    switch (this.state.sort) {
      case 'none': return this.props.beers;
      case 'name': return this.nameSort(beersToRender);
      case 'rating': return this.ratingSort(beersToRender);
      case 'reviews': return this.reviewsSort(beersToRender);
      default: return beers;
    }
  }

  render() {
    if (this.props.beers.length > 0) {
      const sortedBeers = this.sortBeers(this.props.beers);
      const nameFilteredBeers = this.nameFilter(sortedBeers, this.state.nameQuery);
      const breweryFilteredBeers = this.breweryFilter(nameFilteredBeers, this.state.breweryQuery);
      return (
        <div className="ui text container main-section">
          <BeerControls
            handleSortChange={this.handleSortChange}
            nameQuery={this.state.nameQuery}
            breweryQuery={this.state.breweryQuery}
            handleNameChange={this.handleNameChange}
            handleBreweryChange={this.handleBreweryChange}
            breweriesArray={this.props.breweriesArray}
            addBeerToList={this.props.addBeer}
          />
          <BeersList beers={breweryFilteredBeers} breweriesArray={this.props.breweriesArray} />
        </div>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
}

const mapStateToProps = state => ({
  beers: state.beers,
  breweries: state.breweries,
  breweriesArray: state.breweriesArray,
  reviews: state.reviews
});

BeersContainer.propTypes = {
  addBeer: PropTypes.func.isRequired,
  beers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breweries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default connect(mapStateToProps, { addBeer })(BeersContainer);
