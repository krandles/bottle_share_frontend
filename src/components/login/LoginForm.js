import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Form, Modal, Button, Message } from 'semantic-ui-react';
import { login } from '../../actions/users';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    loginError: false,
    emailError: false,
    passwordError: false,
    formError: false
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (this.state.email === '') {
      this.setState({ emailError: true });
      error = true;
    } else {
      this.setState({ emailError: false });
      error = false;
    }

    if (this.state.password === '') {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }

    this.setState({ formError: false });

    this.props.login(this.state.email, this.state.password)
      .then((res) => {
        if (res.payload.error) {
          console.log(res.payload);
          this.setState({
            loginError: true
          });
        }
      });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  validateEmail = () => (
    this.state.email
      ?
      this.setState({ emailError: false, formError: false })
      :
      this.setState({ emailError: true, formError: true })
  )

  validatePassword = () => (
    this.state.password
      ?
      this.setState({ passwordError: false, formError: false })
      :
      this.setState({ passwordError: true, formError: true })
  )

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
          <Form
            error={this.state.loginError || this.state.formError}
            onSubmit={(event) => { this.onFormSubmit(event); }}
          >
            {this.state.loginError
            ?
              <Message error header="Invalid Credentials" content="Your username or password is incorrect, please try again" />
            :
              null
            }
            {this.state.formError
            ?
              <Message error header="Missing Fields" content="All highlighted fields must be completed" />
            :
              null
            }
            <Form.Input
              error={this.state.emailError}
              label="Email:"
              name="email"
              onBlur={this.validateEmail}
              onChange={this.onInputChange}
              value={this.state.email}
            />
            <Form.Input
              error={this.state.passwordError}
              label="Password:"
              onBlur={this.validatePassword}
              onChange={this.onInputChange}
              name="password"
              type="password"
              value={this.state.password}
            />
            <Form.Button
              fluid
              color="blue"
              type="submit"
              disabled={!this.state.email || !this.state.password}
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
