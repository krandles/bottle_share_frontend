import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import BreweriesList from './BreweriesList';
import NewBreweryModal from './NewBreweryModal';

class BreweriesContainer extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="ui text container main-section">
        {this.props.loggedIn ?
          <div>
            <NewBreweryModal />
            <Divider hidden />
          </div>
          :
          null
        }
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
