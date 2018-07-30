import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import BreweriesList from './BreweriesList';
import BreweryControls from './BreweryControls';
import NewBreweryModal from './NewBreweryModal';

class BreweriesContainer extends React.Component {
  state = {
    sort: 'none',
    nameQuery: '',
    locationQuery: ''
  }

  nameSort = breweries => (breweries.sort((a, b) => (a.name.localeCompare(b.name))));

  // TODO: add sort logic
  ratingSort = beers => beers

  reviewsSort = beers => beers

  nameFilter = (breweries, nameQuery) => {
    if (this.state.nameQuery) {
      return breweries.filter(brewery => brewery.name.toLowerCase().includes(nameQuery.toLowerCase()));
    }
    return breweries;
  }

  locationFilter = (breweries, locationQuery) => {
    if (this.state.locationQuery) {
      return breweries.filter(brewery => (
        brewery.name.toLowerCase().includes(locationQuery.toLowerCase())
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
        <BreweriesList breweries={this.props.breweries} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breweries: state.breweries,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(BreweriesContainer);
