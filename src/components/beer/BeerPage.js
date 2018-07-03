import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getBeer } from '../../actions/beers';

class BeerPage extends React.Component {
  componentDidMount() {
    this.props.getBeer(this.props.match.params.id);
  }

  render() {
    if (this.props.beer.brewery) {
      const { beer } = this.props;

      return (
        <div className="ui text container main-section">
          <h1>{beer.name} - {beer.brewery.name}</h1>
          <h2>{beer.abv}% ABV {beer.style}</h2>
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

const mapStateToProps = state => (
  {
    userID: state.userID,
    beer: state.currentBeer
  }
);

export default connect(mapStateToProps, { getBeer })(BeerPage);

