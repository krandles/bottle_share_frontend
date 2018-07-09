import React from 'react';
import { Dimmer, Item, Loader } from 'semantic-ui-react';
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
          <Item className="beer-item">
            <Item.Image className="beer-image" src={beer.img_url ? beer.img_url : '../../../img/beer-placeholder.jpg'} />
            <Item.Content>
              <Item.Header>{beer.name} - {beer.brewery.name}</Item.Header>
              <Item.Meta>{beer.abv}% ABV {beer.style}</Item.Meta>
            </Item.Content>
          </Item>
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

