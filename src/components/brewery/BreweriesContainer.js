import React from 'react'
import BreweriesList from './BreweriesList'
import NewBreweryModal from './NewBreweryModal'

class BreweriesContainer extends React.Component {
  state = {

  }

  render () {
    return (
      <div className="ui text container main-section">
        {this.props.loggedIn ? 
            <NewBreweryModal addBreweryToList={this.props.addBreweryToList}/>
          : null
          }
        <h1>Breweries</h1>
        <BreweriesList breweries={this.props.breweries}/>
      </div>
    )
  }
}

export default BreweriesContainer;
