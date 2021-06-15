import React from 'react';
import {Route, useHistory, Switch, Redirect} from 'react-router-dom';
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


const AppWithRouterAccess = () => {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  return (
      <React.Suspense fallback={loading}>

        <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            className="toastify-container"
            toastClassName="toastify-toast"
        />
        <LoadingBar  style={{ backgroundColor: '#636f83', height: '3px', zIndex: 1500, position: 'absolute' }} scope="sectionBar" className="loading-bar fluid" direction="ltr" />

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
  );
};
export default AppWithRouterAccess;