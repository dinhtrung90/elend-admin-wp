import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import PrivateRoute from './components/private-route'
import { useKeycloak } from '@react-keycloak/web'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page403 = React.lazy(() => import('./views/pages/page403/Page403'))

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div></div>
  }

  return (
    <Switch>
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/403" render={() => <Page403 />} />
      <PrivateRoute path="/" name="Home" component={DefaultLayout} />
    </Switch>
  )
}
