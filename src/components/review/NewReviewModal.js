import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

import api from '../../api/adapter'

class NewReviewModal extends React.Component {
  state = {
    modalOpen: false,
    userID: 1,
    beerID: '',
    content: '',
    rating: ''
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  handleBeerChange = (value) => {
    this.setState({beerID: value})
  }

  saveReview = (state) => {
    const review = {
      user_id: this.state.userID,
      beer_id: this.state.beerID,
      content: this.state.content,
      rating: this.state.rating
    }

    api.postNewReview(review).then(res => {
      this.props.addReviewToList(res)
      this.setState({modalOpen: false})
    })
  }

  onSuccess = (result) => {
    this.setState({
      url: result.filesUploaded[0].url
    })
  }; // works

  onError = error => {
    console.error('error', error);
  };

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
            <Form.Group widths='equal'>
              <Form.Select fluid search label='Beer:' name="beerID" value={this.state.beerID} options={this.props.beersArray} onChange={(event, {value}) => {this.handleBeerChange(value)}}/>
              <Form.Input fluid label='Your Rating:' name="rating" value={this.state.rating} onChange={(event, {value}) => {this.onInputChange(event, value)}}/>
            </Form.Group>
            <Form.Input fluid label='Your Review:' name="content" value={this.state.content} onChange={(event, {value}) => {this.onInputChange(event, value)}} />
            <Button onClick={this.saveReview}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}

export default NewReviewModal