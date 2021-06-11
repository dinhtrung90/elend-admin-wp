import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PrivateRoute from './components/private-route';
import { useKeycloak } from '@react-keycloak/web';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const Login = React.lazy(() => import('./views/pages/login/Login'));

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div></div>
  }

  return (
      <Router>
        <Redirect from="/" to="/dashboard" />
        <PrivateRoute path="/dashboard" component={TheLayout} />
        <Route path="/login" component={Login} />
      </Router>
  )
}