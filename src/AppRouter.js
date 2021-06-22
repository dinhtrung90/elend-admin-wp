import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import PrivateRoute from './components/private-route';
import { useKeycloak } from '@react-keycloak/web';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));

const Page403 = React.lazy(() => import('./views/pages/page403/Page403'));

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div></div>
  }

  return (
      <Switch>
        <Route
            exact
            path="/login"
            render={() => <Login />}
        />
        <Route
            exact
            path="/403"
            render={() => <Page403 />}
        />
        <PrivateRoute path="/" name="Home" component={TheLayout} />
      </Switch>
  )
}