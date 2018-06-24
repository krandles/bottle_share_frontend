import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { createUser } from '../../actions/users';

class SignupForm extends React.Component {
  state = {
    modalOpen: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    zipCode: '',
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    passwordMatchError: false,
    locationError: false,
    zipCodeError: false,
    formError: false,
    createUserError: false
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

    if (this.state.password.length < 8) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
      error = false;
    }

    if (this.state.confirmPassword.length < 8) {
      this.setState({ confirmPasswordError: true });
      error = true;
    } else {
      this.setState({ confirmPasswordError: false });
      error = false;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordMatchError: true });
      error = true;
    } else {
      this.setState({ passwordMatchError: false });
      error = false;
    }

    if (this.state.location === '') {
      this.setState({ locationError: true });
      error = true;
    } else {
      this.setState({ locationError: false });
      error = false;
    }

    if (this.state.zipCode === '' || (parseInt(this.state.zipCode, 10) < 9999) || (parseInt(this.state.zipCode, 10) > 99999)) {
      this.setState({ zipCodeError: true });
      error = true;
    } else {
      this.setState({ zipCodeError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }

    this.setState({ formError: false });

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.confirmPassword,
      zip_code: this.state.zipCode,
      location: this.state.location
    };
    this.props.createUser(user)
      .then((res) => {
        if (!res.payload) {
          this.setState({
            createUserError: true
          });
        }
      });
    if (this.state.loggedIn) {
      this.setState({ modalOpen: false });
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return !this.props.loggedIn ? (
      <Modal
        trigger={
          <Button
            fluid
            basic
            color="blue"
            to="#"
            className="item"
            onClick={this.handleOpen}
          >
            Sign Up
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={(event) => { this.onFormSubmit(event); }}
            error={this.state.createUserError || this.state.formError}
          >
            {this.state.createUserError
            ?
              <Message
                error
                header="Account Already Exists"
                content="An account already exists for this email address, please log in or confirm your email address is correct"
              />
            :
            null
            }
            <Form.Input
              label="Name:"
              name="name"
              value={this.state.name}
              onChange={this.onInputChange}
              error={this.state.nameError}
            />
            <Form.Input
              label="Email:"
              name="email"
              value={this.state.email}
              onChange={this.onInputChange}
              error={this.state.emailError}
            />
            <Form.Input
              label="Password:"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
              error={this.state.passwordError || this.state.passwordMatchError}
            />
            <Form.Input
              label="Confirm Password:"
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onInputChange}
              error={this.state.confirmPasswordError || this.state.passwordMatchError}
            />
            <Form.Input
              label="Location:"
              name="location"
              value={this.state.location}
              onChange={this.onInputChange}
              error={this.state.locationError}
            />
            <Form.Input
              label="ZIP Code:"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.onInputChange}
              error={this.state.zipCodeError}
            />
            <Form.Button
              fluid
              color="blue"
              type="submit"
              disabled={!this.state.email
                || !this.state.name
                || !this.state.password
                || !this.state.confirmPassword
                || !this.state.location
                || !this.state.zipCode
              }
            >
              Create Account
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

export default connect(mapStateToProps, { createUser })(SignupForm);
