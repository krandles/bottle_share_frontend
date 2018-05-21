import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import styles from './beerStyles';
import { addBeer } from '../../actions/beers';

class NewBeerModal extends React.Component {
  state = {
    modalOpen: false,
    name: '',
    breweryID: '',
    abv: '',
    style: '',
    url: ''
  }

  onSuccess = (result) => {
    this.setState({
      url: result.filesUploaded[0].url
    });
  };

  onError = (error) => {
    console.error('error', error);
  };

  onInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  saveBeer = () => {
    const beer = {
      name: this.state.name,
      brewery_id: this.state.breweryID,
      abv: this.state.abv,
      style: this.state.style,
      img_url: this.state.url
    };

    this.props.addBeer(beer)
      .then(() => {
        this.setState({ modalOpen: false });
      });
  }

  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],

      maxSize: 1024 * 1024,
      maxFiles: 1,
    };

    return (
      <Modal
        trigger={<Button fluid color="blue" onClick={this.handleOpen}>Add A New Beer</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Add a New Beer</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="name"
                label="Name:"
                value={this.state.name}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                fluid
                search
                name="breweryID"
                label="Brewery:"
                options={this.props.breweriesArray}
                onChange={(event, { value }) => { this.onInputChange('breweryID', value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="abv"
                label="ABV:"
                value={this.state.abv}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                fluid
                search
                name="style"
                label="Style:"
                options={styles}
                onChange={(event, { value }) => { this.onInputChange('style', value); }}
              />
              <ReactFilestack
                apikey={process.env.REACT_APP_FILESTACK_KEY_BEERS}
                buttonText="Upload Image"
                buttonClass="ui medium button blue fluid no-bottom-margin"
                options={basicOptions}
                onSuccess={this.onSuccess}
                onError={this.onError}
              />
            </Form.Group>
            <Button color="red" onClick={this.handleClose}>Cancel</Button>
            <Button color="blue" floated="right" onClick={this.saveBeer}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(undefined, { addBeer })(NewBeerModal);
