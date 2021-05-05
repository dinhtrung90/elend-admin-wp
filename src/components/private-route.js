import React from 'react';
import { Redirect } from 'react-router-dom';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';
import { APP_TOKEN } from 'src/constants/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useOktaAuth();

  // if (authState.isPending) return null;

  if (authState.isAuthenticated) {
    localStorage.setItem(APP_TOKEN, authState.idToken.idToken);
  } else {
    localStorage.setItem(APP_TOKEN, null);
  }

  const renderRedirect = (props) => {
    if (authState.isAuthenticated) {

      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  };

  if (!Component)
    throw new Error(
      `A component needs to be specified for private route for path}`
    );

  return <SecureRoute {...rest} render={renderRedirect} />;
};
export default PrivateRoute;
