import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import './scss/style.scss';
import AppWithRouterAccess from './AppWithRouterAccess';
import {toast, ToastContainer} from "react-toastify";
import LoadingBar from "react-redux-loading-bar";
import PrivateRoute from './components/private-route';

// // Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// // Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

class App extends Component {
  render() {
    return (
        <HashRouter>
          <React.Suspense fallback={loading}>
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                className="toastify-container"
                toastClassName="toastify-toast"
            />
            <LoadingBar  style={{ backgroundColor: '#636f83', height: '3px', zIndex: 1500, position: 'absolute' }} scope="sectionBar" className="loading-bar fluid" direction="ltr" />
            <Switch>
              <Route exact={true} path="/" name="Home" render={() => <Redirect to={"/dashboard"}/>} />
              <PrivateRoute exact path={"/dashboard"} component={TheLayout} />
              <Route path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/login" name="Login Page" render={props => <Login {...props}/>} />
            </Switch>
          </React.Suspense>
        </HashRouter>
    );
  }
}

export default App;
