import React from 'react';
import { Button, Form, Modal, Icon } from 'semantic-ui-react'

import api from '../../api/adapter'

class EditBreweryModal extends React.Component {
  state = {
    modalOpen: false,
    breweryID: this.props.brewery.id,
    name: this.props.brewery.name,
    location: this.props.brewery.location,
    url: this.props.brewery.url
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  saveBrewery = (state) => {
    const brewery = {
      id: this.state.breweryID,
      name: this.state.name,
      location: this.state.location,
      url: this.state.url
    }

    api.patchBrewery(brewery).then(res => {
      this.setState({modalOpen: false})
    })
  }

  render() {

    return (
      <Modal
        trigger={<Icon name="edit" className="float right" onClick={this.handleOpen}></Icon>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name:' name="name" value={this.state.name} onChange={(event, {value}) => {this.onInputChange(event, value)}}/>
              <Form.Input fluid label='Location:' name="location" value={this.state.location} onChange={(event, {value}) => {this.onInputChange(event, value)}}/>
            </Form.Group>
            <Form.Input fluid label='Website:' name="url" value={this.state.url} onChange={(event, {value}) => {this.onInputChange(event, value)}} />
            <Button onClick={this.saveBrewery}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}



export default EditBreweryModal