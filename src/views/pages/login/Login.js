import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from '../../../components/signin-widget';
import { useOktaAuth } from '@okta/okta-react';
import { userService } from '../../../services/user.service';

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens).then(() => {
      userService.syncAccount().then(res => {
        console.log('synced=', res);
      });
    })
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (authState.isPending) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
};
export default Login;
