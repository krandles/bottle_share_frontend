import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import api from '../../api/adapter'
import ReactFilestack from 'filestack-react';
import keys from '../../keys'

class NewPostForm extends React.Component {
  state = {
    body: '',
    url: ''
  }

  handleSubmit = () => {
    const newPost = {
      event_id: this.props.eventID,
      user_id: this.props.currentUser,
      body: this.state.body,
      image_url: this.state.url
    }
    api.postNewPost(newPost)
      .then(res => console.log(res))
  }

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  onSuccess = (result) => {
    this.setState({
      url: result.filesUploaded[0].url
    })
  }

  onError = (error) => {
    console.error('error', error);
  }

  render() {

    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
    };

    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.TextArea
          rows={4}
          name="body"
          placeholder="Join the conversation..."
          value={this.state.body}
          onChange={(event, {value}) => {this.onInputChange(event, value)}}
        />
        <ReactFilestack
          apikey={keys.filestackKey}
          buttonText="Add A Photo"
          buttonClass="ui fluid medium button gray"
          options={basicOptions}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
        <Form.Button floated='right' type='submit'>Submit Post</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.userID }
}

export default connect(mapStateToProps)(NewPostForm)