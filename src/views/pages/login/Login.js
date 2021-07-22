import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

const Login = () => {
  const location = useLocation()
  const currentLocationState = location.state || {
    from: { pathname: '/' },
  }
  const { keycloak } = useKeycloak()
  if (keycloak?.authenticated) return <Redirect to={currentLocationState?.from} />

  const subdomain = window.location.hostname.split('.')[0]
  if (subdomain === 'quatang') {
    return (
      <Redirect
        to={{
          pathname: 'register',
        }}
      />
    )
  }

  keycloak?.login()
  return <div></div>
}
export default Login
