import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal, Icon } from 'semantic-ui-react';
import { patchBrewery } from '../../actions/breweries';

class EditBreweryModal extends React.Component {
  state = {
    modalOpen: false,
    breweryID: this.props.brewery.id,
    name: this.props.brewery.name,
    location: this.props.brewery.location,
    url: this.props.brewery.url || ''
  }

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  saveBrewery = () => {
    const brewery = {
      id: this.state.breweryID,
      name: this.state.name,
      location: this.state.location,
      url: this.state.url
    };

    this.props.patchBrewery(brewery).then(() => {
      this.setState({ modalOpen: false });
    });
  }

  render() {
    return (
      <Modal
        trigger={<Icon name="edit" className="right floated" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Name:"
                name="name"
                value={this.state.name}
                onChange={(event, { value }) => { this.onInputChange(event, value); }}
              />
              <Form.Input
                fluid
                label="Location:"
                name="location"
                value={this.state.location}
                onChange={(event, { value }) => { this.onInputChange(event, value); }}
              />
            </Form.Group>
            <Form.Input
              fluid
              label="Website:"
              name="url"
              value={this.state.url}
              onChange={(event, { value }) => { this.onInputChange(event, value); }}
            />
            <Button onClick={this.saveBrewery}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breweries: state.beer.breweries
  };
};

export default connect(mapStateToProps, { patchBrewery })(EditBreweryModal);
