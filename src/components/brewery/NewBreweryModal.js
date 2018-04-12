import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'

import api from '../../api/adapter'

class NewBreweryModal extends React.Component {
  state = {
    modalOpen: false,
    name: '',
    location: '',
    url: ''
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
      name: this.state.name,
      location: this.state.location,
      url: this.state.url
    }

    api.postNewBrewery(brewery).then(res => {
      this.props.addBreweryToList(res)
      this.setState({modalOpen: false})
    })
  }

  render() {

    return (
      <Modal
        trigger={<Button fluid onClick={this.handleOpen}>Add New Brewery</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add a New Brewery</Modal.Header>
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



export default NewBreweryModal