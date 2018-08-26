import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import BreweriesList from './BreweriesList';
import BreweryControls from './BreweryControls';
// import NewBreweryModal from './NewBreweryModal';

class BreweriesContainer extends React.Component {
  state = {
    sort: 'none',
    nameQuery: '',
    locationQuery: ''
  }

  nameSort = breweries => (breweries.sort((a, b) => (a.name.localeCompare(b.name))));

  // TODO: add sort logic
  ratingSort = breweries => breweries

  reviewsSort = breweries => breweries

  nameFilter = (breweries, nameQuery) => {
    if (this.state.nameQuery) {
      return breweries.filter(brewery => brewery.name.toLowerCase().includes(nameQuery.toLowerCase()));
    }
    return breweries;
  }

  locationFilter = (breweries, locationQuery) => {
    if (this.state.locationQuery) {
      return breweries.filter(brewery => (
        brewery.location.toLowerCase().includes(locationQuery.toLowerCase())
      ));
    }
    return breweries;
  }

  handleSortChange = (event, value) => {
    this.setState({ sort: value });
  }

  handleNameChange = (event) => {
    this.setState({ nameQuery: event.target.value });
  }

  handleLocationChange = (event) => {
    this.setState({ locationQuery: event.target.value });
  }

  sortBreweries = (breweries) => {
    const breweriesToRender = [...this.props.breweries];
    switch (this.state.sort) {
      case 'none': return this.props.breweries;
      case 'name': return this.nameSort(breweriesToRender);
      case 'rating': return this.ratingSort(breweriesToRender);
      case 'reviews': return this.reviewsSort(breweriesToRender);
      default: return breweries;
    }
  }

  render() {
    if (this.props.breweries.length > 0) {
      const sortedBreweries = this.sortBreweries(this.props.breweries);
      const nameFilteredBreweries = this.nameFilter(sortedBreweries, this.state.nameQuery);
      const locationFilteredBreweries = this.locationFilter(nameFilteredBreweries, this.state.locationQuery);
      return (
        <div className="ui text container main-section">
          <BreweryControls
              handleSortChange={this.handleSortChange}
              nameQuery={this.state.nameQuery}
              locationQuery={this.state.locationQuery}
              handleNameChange={this.handleNameChange}
              handleLocationChange={this.handleLocationChange}
              addBreweryToList={this.props.addBrewery}
            />
          <BreweriesList breweries={locationFilteredBreweries} />
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
  breweries: state.beer.breweries,
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(BreweriesContainer);
