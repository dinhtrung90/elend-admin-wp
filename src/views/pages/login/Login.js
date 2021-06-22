import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const location = useLocation();
  const currentLocationState = location.state || {
    from: { pathname: '/' },
  }
  const { keycloak } = useKeycloak();
  if (keycloak?.authenticated)
    return <Redirect to={currentLocationState?.from} />;

  keycloak?.login()
  return (<div></div>)
};
export default Login;
