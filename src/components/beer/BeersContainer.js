import React from 'react'
import BeersList from './BeersList'
import BeerControls from './BeerControls'

class BeersContainer extends React.Component {
  state = {
    sort: 'none',
    nameQuery: '',
    breweryQuery: ''
  }

  nameSort = (beers) => {
    return beers.sort(function(a, b){
      return a.name.localeCompare(b.name)
    })
  }

  // TODO: add sort logic
  ratingSort = (beers) => {
    return beers
  }

  reviewsSort = (beers) => {
    return beers
  }

  nameFilter = (beers, nameQuery) => {
    if (this.state.nameQuery) {
      return beers.filter(function(beer) {
        return beer.name.toLowerCase().includes(nameQuery.toLowerCase())
      })
    } else {
      return beers
    }
  }

  breweryFilter = (beers, breweryQuery) => {
    if (this.state.breweryQuery) {
      return beers.filter(function(beer) {
        return beer.brewery.name.toLowerCase().includes(breweryQuery.toLowerCase())
      })
    } else {
      return beers
    }
  }

  handleSortChange = (event, value) => {
    this.setState({sort: value})
  }

  handleNameChange = (event) => {
    this.setState({nameQuery: event.target.value})
  }

  handleBreweryChange = (event) => {
    this.setState({breweryQuery: event.target.value})
  }

  sortBeers = (beers) => {
    const beersToRender = [...this.props.beers]
    switch(this.state.sort) {
      case "none": return this.props.beers
      case "name": return this.nameSort(beersToRender)
      case "rating": return this.ratingSort(beersToRender)
      case "reviews": return this.reviewsSort(beersToRender)
      default: return beers
    }
  }

  render () {
    const sortedBeers = this.sortBeers(this.props.beers)
    const nameFilteredBeers = this.nameFilter(sortedBeers, this.state.nameQuery)
    const breweryFilteredBeers = this.breweryFilter(nameFilteredBeers, this.state.breweryQuery)
    return (
      <div className="ui text container main-section">
        <BeerControls
          handleSortChange={this.handleSortChange}
          nameQuery={this.state.nameQuery}
          breweryQuery={this.state.breweryQuery}
          handleNameChange={this.handleNameChange}
          handleBreweryChange={this.handleBreweryChange}
          breweriesArray={this.props.breweriesArray}
          addBeerToList={this.props.addBeerToList}
          loggedIn={this.props.loggedIn}
        />
        <BeersList beers={breweryFilteredBeers} breweriesArray={this.props.breweriesArray}/>
      </div>
    )
  }
}

export default BeersContainer;
