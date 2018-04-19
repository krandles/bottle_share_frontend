import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Form, Modal, Button } from 'semantic-ui-react';
import { login } from '../../actions/users';

class LoginForm extends React.Component {
  state = { email: '', password: '' }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return !this.props.loggedIn ? (
      <Modal
        trigger={
          <Button
            fluid
            color="blue"
            to="#"
            className="item"
            onClick={this.handleOpen}
          >
            Log In
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content className="login-form">
          <Form onSubmit={(event) => { this.onFormSubmit(event); }}>
            <Form.Input
              label="Email:"
              name="email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Password:"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
            <Form.Button
              fluid
              color="blue"
              type="submit"
            >
              Submit
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
      :
      <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default connect(mapStateToProps, { login })(LoginForm);
