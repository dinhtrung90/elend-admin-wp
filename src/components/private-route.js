import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authHelpers} from "../utils/auth-helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = authHelpers.isAuthenticated();

  return (
      <Route {...rest} render={
        props => {
          if (isAuthenticated) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/login',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
  )
};
export default PrivateRoute;
