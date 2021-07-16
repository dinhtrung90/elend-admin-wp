import React, { useEffect, useState } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import './scss/style.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingBar from 'react-redux-loading-bar'
import keycloak from './keycloak'
import { AppRouter } from './AppRouter'
import { authenticationActions } from './actions/authentication.action'
import { useDispatch } from 'react-redux'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const AppWithRouterAccess = () => {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')

  const eventLogger = (event, error) => {}

  const tokenLogger = (tokens) => {
    if (tokens && tokens.token) {
      setToken(tokens.token)
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('/login') > -1 && token && token.length > 0) {
      dispatch(authenticationActions.accountSync())
    }
  }, [dispatch, token])

  return (
    <React.Suspense fallback={loading}>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <LoadingBar
        style={{ backgroundColor: '#636f83', height: '3px', zIndex: 1500, position: 'absolute' }}
        scope="sectionBar"
        className="loading-bar fluid"
        direction="ltr"
      />

      <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger} onTokens={tokenLogger}>
        <AppRouter />
      </ReactKeycloakProvider>
    </React.Suspense>
  )
}
export default AppWithRouterAccess
