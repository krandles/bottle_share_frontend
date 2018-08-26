import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import { addReview } from '../../actions/reviews';

class NewReviewModal extends React.Component {
  state = {
    modalOpen: false,
    userID: this.props.userID,
    beerID: '',
    content: '',
    rating: ''
  }

  handleInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleBeerChange = (value) => {
    this.setState({ beerID: value });
  }

  saveReview = () => {
    const review = {
      user_id: this.state.userID,
      beer_id: this.state.beerID,
      content: this.state.content,
      rating: this.state.rating
    };

    this.props.addReview(review).then((res) => {
      // this.props.addReviewToList(res);
      this.setState({ modalOpen: false });
    });
  }

  render() {
    return (
      <Modal
        trigger={<Button fluid onClick={this.handleOpen}>Add New Review</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add a New Review</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Select fluid search label="Beer:" name="beerID" value={this.state.beerID} options={this.props.beersArray} onChange={(event, { value }) => { this.handleBeerChange(value); }} />
              <Form.Input fluid label="Your Rating (1-5):" name="rating" value={this.state.rating} onChange={(event, { value }) => { this.handleInputChange(event, value); }} />
            </Form.Group>
            <Form.Input fluid label="Your Review:" name="content" value={this.state.content} onChange={(event, { value }) => { this.handleInputChange(event, value); }} />
            <Button onClick={this.saveReview}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.user.userID,
  beersArray: state.beer.beersArray
});

export default connect(mapStateToProps, { addReview })(NewReviewModal);
