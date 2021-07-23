import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { APP_TOKEN } from 'src/constants/constants'
import { useKeycloak } from '@react-keycloak/web'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { keycloak, initialized } = useKeycloak()
  if (initialized && keycloak.token) {
    localStorage.setItem(APP_TOKEN, keycloak.token)
  } else {
    localStorage.setItem(APP_TOKEN, null)
  }

  const renderRedirect = (props) => {
    let defaultUrl = '/login'
    if (initialized && keycloak.authenticated) {
      return <Component {...props} />
    }

    const subdomain = window.location.hostname.split('.')[0]
    if (subdomain === 'quatang') {
      defaultUrl = window.location.hash.replace('#', '')
    }
    return (
      <Redirect
        to={{
          pathname: defaultUrl,
        }}
      />
    )
  }

  if (!Component) throw new Error(`A component needs to be specified for private route for path}`)

  return <Route {...rest} render={renderRedirect} />
}
PrivateRoute.propTypes = {
  component: PropTypes.object,
}
export default PrivateRoute
