import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaAuthConfig, oktaSignInConfig } from './config/config';
import PrivateRoute from './components/private-route';
import './scss/style.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-redux-loading-bar';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const Login = React.lazy(() => import('./views/pages/login/Login'));

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <React.Suspense fallback={loading}>
      
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <LoadingBar  style={{ backgroundColor: '#636f83', height: '3px', zIndex: 1500, position: 'absolute' }} scope="sectionBar" className="loading-bar fluid" direction="ltr" />
      

      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route exact path="/login/callback" component={LoginCallback} />

          <PrivateRoute path="/" name="Home" component={TheLayout} />
        </Switch>
      </Security>
    </React.Suspense>
  );
};
export default AppWithRouterAccess;
