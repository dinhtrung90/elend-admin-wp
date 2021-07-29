import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/private-route'
import { useKeycloak } from '@react-keycloak/web'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))

const HomeQRCode = React.lazy(() => import('./views/pages/register/HomeQRCode'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const RewardConfirm = React.lazy(() => import('./views/pages/register/RewardConfirm'))
const Thanks = React.lazy(() => import('./views/pages/register/Thanks'))
const RewardEligibilities = React.lazy(() => import('./views/pages/register/Eligibilities'))

const Page403 = React.lazy(() => import('./views/pages/page403/Page403'))

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div></div>
  }

  return (
    <Switch>
      <Route exact path="/danhsach" component={RewardEligibilities} />
      <Route exact path="/qrcode" component={HomeQRCode} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/thanks" component={Thanks} />
      <Route exact path="/thanks/:id" component={Thanks} />
      <Route exact path="/confirm-reward" render={() => <RewardConfirm />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/403" render={() => <Page403 />} />
      <PrivateRoute path="/" name="Home" component={DefaultLayout} />
    </Switch>
  )
}
