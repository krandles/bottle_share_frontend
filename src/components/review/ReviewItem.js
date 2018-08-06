import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

const ReviewItem = (props) => {
  const { review } = props;
  return (
    <Item>
      <Item.Content>
        {props.isBeerSelected ? null : `${review.brewery.name} - ${review.beer.name}`}{props.isBeerSelected ? null : <br />}
        {review.rating ? `${review.rating} / 5` : null}{review.rating ? <br /> : null}
        {review.content ? `Tasting notes: ${review.content}` : null}{review.content ? <br /> : null}
        Reviewed by {review.user.name} on
      </Item.Content>
    </Item>
  );
};

const mapStateToProps = state => (
  { isBeerSelected: state.currentBeer }
);

export default connect(mapStateToProps)(ReviewItem);
