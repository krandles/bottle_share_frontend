import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
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
    url: '',
    nameError: false,
    abvError: false,
    styleError: false,
    urlError: false,
    breweryError: false,
    formError: false,
    createBeerError: false
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
    let error = false;

    if (this.state.name === '') {
      this.setState({ nameError: true });
      error = true;
    } else {
      this.setState({ nameError: false });
      error = false;
    }

    if (this.state.style === '') {
      this.setState({ styleError: true });
      error = true;
    } else {
      this.setState({ styleError: false });
      error = false;
    }

    if (parseFloat(this.state.abv) < 1 || parseFloat(this.state.abv) > 50) {
      this.setState({ abvError: true });
      error = true;
    } else {
      this.setState({ abvError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }

    this.setState({ formError: false });

    const beer = {
      name: this.state.name,
      brewery_id: this.state.breweryID,
      abv: this.state.abv,
      style: this.state.style,
      img_url: this.state.url
    };

    this.props.addBeer(beer)
      .then((res) => {
        console.log(res);
        if (!res.payload) {
          this.setState({ createBeerError: true });
        } else {
          this.setState({
            modalOpen: false,
            name: '',
            abv: '',
            style: '',
            breweryID: '',
            url: ''
          });
        }
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
          <Form error={this.state.createBeerError || this.state.formError}>
            {this.state.createBeerError
            ?
              <Message
                error
                header="Beer Already Exists"
                content="A beer with this name already exists for the selected brewery"
              />
            :
            null
            }
            <Form.Group widths="equal">
              <Form.Input
                fluid
                error={this.state.nameError}
                name="name"
                label="Name:"
                value={this.state.name}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                fluid
                error={this.state.breweryError}
                search
                name="breweryID"
                label="Brewery:"
                defaultValue=""
                options={this.props.breweriesArray}
                onChange={(event, { value }) => { this.onInputChange('breweryID', value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.state.abvError}
                fluid
                name="abv"
                label="ABV:"
                value={this.state.abv}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                error={this.state.styleError}
                fluid
                search
                name="style"
                label="Style:"
                options={styles}
                defaultValue=""
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
            <Button
              color="blue"
              disabled={!this.state.name || !this.state.abv || !this.state.breweryID || !this.state.style}
              floated="right"
              onClick={this.saveBeer}
            >
              Save
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(undefined, { addBeer })(NewBeerModal);
