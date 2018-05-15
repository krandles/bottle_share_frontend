import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginContainer = props => (
  <Grid className="ui text container main-section">
    <Grid.Column width={10} className="login-content">
      <h2 className="login-title">Welcome to Tapped</h2>
      <p>The destination for craft beer enthusiasts.</p>
      <p>Browse our beer and brewery listings, or log in to&nbsp;
        plan and discuss your next bottle share,&nbsp;
        or explore public events to meet others who share&nbsp;
        your love for the only beverage that matters.
      </p>
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

LoginContainer.propTypes = {
  routerProps: PropTypes.shape({})
};

LoginContainer.defaultProps = {
  routerProps: {}
};

export default LoginContainer;
