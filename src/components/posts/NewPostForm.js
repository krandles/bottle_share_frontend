import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import api from '../../api/adapter'

class NewPostForm extends React.Component {
  state = { body: '' }

  handleSubmit = () => {
    const newPost = {
      event_id: this.props.eventID,
      user_id: this.props.currentUser,
      body: this.state.body
    }
    api.postNewPost(newPost)
      .then(res => console.log(res))
  }

  onInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.TextArea
          rows={4}
          name="body"
          label="Join the conversation"
          value={this.state.body}
          onChange={(event, {value}) => {this.onInputChange(event, value)}}
        />
        <Form.Button type='submit'>Submit</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.userID }
}

export default connect(mapStateToProps)(NewPostForm)