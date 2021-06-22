import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APP_TOKEN } from 'src/constants/constants';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { keycloak, initialized } = useKeycloak();
  if (initialized && keycloak.token) {
    localStorage.setItem(APP_TOKEN, keycloak.token);
  } else {
    localStorage.setItem(APP_TOKEN, null);
  }

  const renderRedirect = (props) => {
    if (initialized && keycloak.authenticated) {

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

  return <Route {...rest} render={renderRedirect}/>
};
export default PrivateRoute;
