import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import './scss/style.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-redux-loading-bar';
import keycloak from './keycloak';
import { AppRouter } from './AppRouter';
import { userService } from './services/user.service';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const AppWithRouterAccess = () => {

  const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error);
  }

  const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens')
    if (tokens && tokens.token) {
      userService.syncAccount().then(res => {
        console.log('synced=', res);
      });
    }
  }

  return (
    <React.Suspense fallback={loading}>
      
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <LoadingBar  style={{ backgroundColor: '#636f83', height: '3px', zIndex: 1500, position: 'absolute' }} scope="sectionBar" className="loading-bar fluid" direction="ltr" />

      <ReactKeycloakProvider
          authClient={keycloak}
          onEvent={eventLogger}
          onTokens={tokenLogger}
      >
        <AppRouter />
      </ReactKeycloakProvider>
    </React.Suspense>
  );
};
export default AppWithRouterAccess;
