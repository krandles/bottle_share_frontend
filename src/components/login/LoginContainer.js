import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginContainer = props => (
  <Grid className="main-content">
    <Grid.Column width={10} className="login-content">
      <h2 className="login-title">Welcome to Tapped Events</h2>
      <p>The event manager for beer lovers.</p>
      <p>Plan and discuss your next bottle share, or explore public events to meet others who share your love for the only beverage that matters.</p>
    </Grid.Column>
    <Grid.Column width={6} textAlign="center" className="login-signup">
      <LoginForm {...props.routerProps} />
      <Divider hidden />
      <p>or</p>
      <Divider hidden />
      <SignupForm {...props.routerProps} />
    </Grid.Column>
  </Grid>
);

export default LoginContainer;
