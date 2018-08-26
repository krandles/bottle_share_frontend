import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import { addPost } from '../../actions/posts';

class NewPostForm extends React.Component {
  state = {
    body: '',
    url: ''
  }

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  }

  onSuccess = (result) => {
    this.setState({
      url: result.filesUploaded[0].url
    });
  }

  onError = (error) => {
    console.error('error', error);
  }

  handleSubmit = () => {
    const newPost = {
      event_id: this.props.eventID,
      user_id: this.props.currentUser,
      body: this.state.body,
      image_url: this.state.url
    };
    this.props.addPost(newPost);
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
          onChange={(event, { value }) => { this.onInputChange(event, value); }}
        />
        <ReactFilestack
          apikey={process.env.REACT_APP_FILESTACK_KEY}
          buttonClass="ui fluid medium button basic blue"
          options={basicOptions}
          onSuccess={this.onSuccess}
          onError={this.onError}
        >
          <Icon name="photo" />Add A Photo
        </ReactFilestack>
        <Form.Button
          color="blue"
          floated="right"
          type="submit"
        >
          Submit Post
        </Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({ currentUser: state.user.userID });

export default connect(mapStateToProps, { addPost })(NewPostForm);
